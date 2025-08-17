"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '../../../components/theme-toggle';
import { ProtectedRoute } from '../../../components/protected-route';
import { supabase } from '../../../../lib/supabaseClient';
import { useAuth } from '../../../auth-context';
import EditorToolbar from '../../../components/editor-toolbar';

export default function CreateBlogPostPage() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [published, setPublished] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [links, setLinks] = useState([{ text: '', url: '' }]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

  const convertMarkdownToHtml = (text: string) => {
    // Convert headings (# Heading)
    text = text.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    text = text.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    text = text.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Convert blockquotes
    text = text.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
    
    // Convert unordered lists
    text = text.replace(/^- (.*$)/gim, '<li>$1</li>');
    // Simple approach for lists - wrap consecutive <li> elements
    text = text.replace(/(<li>.*?<\/li>\s*)+/g, (match) => `<ul>${match}</ul>`);
    
    // Convert ordered lists
    text = text.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');
    // Simple approach for lists - wrap consecutive <li> elements
    text = text.replace(/(<li>.*?<\/li>\s*)+/g, (match) => `<ol>${match}</ol>`);
    
    // Convert bold (**text**)
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert italic (*text*)
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Convert underline (_text_)
    text = text.replace(/_(.*?)_/g, '<u>$1</u>');
    
    // Convert strikethrough (~~text~~)
    text = text.replace(/~~(.*?)~~/g, '<del>$1</del>');
    
    return text;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Buat slug dari judul
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      // Konversi tags ke array
      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

      // Format content dengan video, foto, dan link
      let formattedContent = content;
      
      // Tambahkan foto jika ada
      if (imageUrl) {
        formattedContent = `<img src="${imageUrl}" alt="Gambar artikel" class="w-full h-auto my-4 rounded-lg" />\n${formattedContent}`;
      }
      
      // Tambahkan video jika ada
      if (videoUrl) {
        formattedContent = `<div class="my-4"><iframe width="100%" height="315" src="${videoUrl}" frameborder="0" allowfullscreen></iframe></div>\n${formattedContent}`;
      }
      
      // Tambahkan link jika ada
      if (links.length > 0 && links.some(link => link.text && link.url)) {
        formattedContent += '\n<div class="mt-6">';
        links.forEach((link, index) => {
          if (link.text && link.url) {
            formattedContent += `<p><a href="${link.url}" target="_blank" class="text-blue-500 hover:underline">${link.text}</a></p>`;
          }
        });
        formattedContent += '</div>';
      }

      // Konversi markdown ke HTML
      formattedContent = convertMarkdownToHtml(formattedContent);

      const { data, error } = await supabase
        .from('blog_posts')
        .insert([
          {
            title,
            excerpt,
            content: formattedContent,
            author,
            tags: tagsArray,
            published,
            slug
          }
        ])
        .select();

      if (error) throw error;

      alert('Artikel berhasil dibuat!');
      router.push('/admin/blog');
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert('Gagal membuat artikel. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const addLink = () => {
    setLinks([...links, { text: '', url: '' }]);
  };

  const removeLink = (index: number) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
  };

  const updateLink = (index: number, field: 'text' | 'url', value: string) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

 // Tampilkan loading jika status autentikasi belum ditentukan
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen font-sans relative flex items-center justify-center">
        <p>Memeriksa status autentikasi...</p>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen font-sans relative">
        {/* Tombol toggle tema di pojok kanan atas */}
        <div className="absolute top-4 right-4 z-20">
          <ThemeToggle />
        </div>
        
        <main className="container mx-auto px-4 py-12 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 sketch-heading" style={{ fontFamily: "'Kalam', cursive" }}>
              Buat Artikel Baru
            </h1>
            <p className="text-xl max-w-2xl mx-auto sketch-paragraph" style={{ fontFamily: "'Kalam', cursive" }}>
              Tambahkan artikel blog baru
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="hand-drawn-border rounded-2xl p-8">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="title" className="block text-lg font-medium mb-2 sketch-line" style={{ fontFamily: "'Kalam', cursive" }}>
                    Judul Artikel
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    style={{ fontFamily: "'Kalam', cursive" }}
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="excerpt" className="block text-lg font-medium mb-2 sketch-line" style={{ fontFamily: "'Kalam', cursive" }}>
                    Keterangan (Excerpt)
                  </label>
                  <textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    style={{ fontFamily: "'Kalam', cursive" }}
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="author" className="block text-lg font-medium mb-2 sketch-line" style={{ fontFamily: "'Kalam', cursive" }}>
                    Penulis
                  </label>
                  <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    style={{ fontFamily: "'Kalam', cursive" }}
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="tags" className="block text-lg font-medium mb-2 sketch-line" style={{ fontFamily: "'Kalam', cursive" }}>
                    Tags (pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    style={{ fontFamily: "'Kalam', cursive" }}
                    placeholder="teknologi, gaya hidup, unik"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="imageUrl" className="block text-lg font-medium mb-2 sketch-line" style={{ fontFamily: "'Kalam', cursive" }}>
                    URL Gambar
                  </label>
                  <input
                    type="text"
                    id="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    style={{ fontFamily: "'Kalam', cursive" }}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="videoUrl" className="block text-lg font-medium mb-2 sketch-line" style={{ fontFamily: "'Kalam', cursive" }}>
                    URL Video (YouTube, Vimeo, dll)
                  </label>
                  <input
                    type="text"
                    id="videoUrl"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    style={{ fontFamily: "'Kalam', cursive" }}
                    placeholder="https://www.youtube.com/embed/VIDEO_ID"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-lg font-medium mb-2 sketch-line" style={{ fontFamily: "'Kalam', cursive" }}>
                    Tautan Tambahan
                  </label>
                  {links.map((link, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                      <input
                        type="text"
                        placeholder="Teks tautan"
                        value={link.text}
                        onChange={(e) => updateLink(index, 'text', e.target.value)}
                        className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        style={{ fontFamily: "'Kalam', cursive" }}
                      />
                      <input
                        type="text"
                        placeholder="URL"
                        value={link.url}
                        onChange={(e) => updateLink(index, 'url', e.target.value)}
                        className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        style={{ fontFamily: "'Kalam', cursive" }}
                      />
                      <button
                        type="button"
                        onClick={() => removeLink(index)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        style={{ fontFamily: "'Kalam', cursive" }}
                      >
                        Hapus
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addLink}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    style={{ fontFamily: "'Kalam', cursive" }}
                  >
                    Tambah Tautan
                  </button>
                </div>
                
                <div className="mb-6">
                  <label className="block text-lg font-medium mb-2 sketch-line" style={{ fontFamily: "'Kalam', cursive" }}>
                    Status Publikasi
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="published"
                      checked={published}
                      onChange={(e) => setPublished(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="published" className="ml-2 block text-sm sketch-line" style={{ fontFamily: "'Kalam', cursive" }}>
                      Publikasikan artikel ini
                    </label>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="content" className="block text-lg font-medium mb-2 sketch-line" style={{ fontFamily: "'Kalam', cursive" }}>
                    Konten Artikel
                  </label>
                  <EditorToolbar 
                    content={content} 
                    setContent={setContent} 
                    textareaRef={contentTextareaRef} 
                  />
                  <textarea
                    ref={contentTextareaRef}
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={15}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    style={{ fontFamily: "'Kalam', cursive" }}
                    required
                  />
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => router.push('/admin/blog')}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    style={{ fontFamily: "'Kalam', cursive" }}
                    disabled={loading}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    style={{ fontFamily: "'Kalam', cursive" }}
                    disabled={loading}
                  >
                    {loading ? 'Menyimpan...' : 'Simpan Artikel'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
        
        <div className="text-center my-4">
          <a
            href="/admin/blog"
            className="inline-block bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg sketch-line"
            style={{ fontFamily: "'Kalam', cursive" }}
          >
            Kembali ke Kelola Artikel
          </a>
        </div>
        
        <footer className="text-center py-6 relative z-10">
          <p className="sketch-line" style={{ fontFamily: "'Kalam', cursive" }}>&copy; 2025 UNIQUESTUFF. All rights reserved.</p>
        </footer>
      </div>
    </ProtectedRoute>
 );
}