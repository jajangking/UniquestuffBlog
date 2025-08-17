"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '../../components/theme-toggle';
import { ProtectedRoute } from '../../components/protected-route';
import { supabase } from '../../../lib/supabaseClient';
import { useAuth } from '../../auth-context';

// Definisikan tipe untuk blog post
type BlogPost = {
  id: string;
  title: string;
  content: string;
 excerpt: string;
  author: string;
  created_at: string;
  updated_at: string;
  published: boolean;
  slug: string;
  tags: string[];
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Hanya fetch posts jika pengguna terautentikasi
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      alert('Gagal memuat artikel. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/blog/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus artikel ini?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      alert('Artikel berhasil dihapus.');
      fetchPosts(); // Refresh the list
    } catch (error) {
      console.error('Error deleting blog post:', error);
      alert('Gagal menghapus artikel. Silakan coba lagi.');
    }
  };

  const handleCreate = () => {
    router.push('/admin/blog/create');
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
              Kelola Artikel Blog
            </h1>
            <p className="text-xl max-w-2xl mx-auto sketch-paragraph" style={{ fontFamily: "'Kalam', cursive" }}>
              Tambah, edit, atau hapus artikel blog
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 text-right">
              <button
                onClick={handleCreate}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                style={{ fontFamily: "'Kalam', cursive" }}
              >
                Tambah Artikel Baru
              </button>
            </div>
            
            {loading ? (
              <div className="text-center py-8">
                <p style={{ fontFamily: "'Kalam', cursive" }}>Memuat artikel...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.length === 0 ? (
                  <div className="text-center py-8">
                    <p style={{ fontFamily: "'Kalam', cursive" }}>Belum ada artikel. Buat artikel pertama Anda!</p>
                  </div>
                ) : (
                  posts.map((post) => (
                    <div key={post.id} className="hand-drawn-border rounded-xl p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-2xl font-bold mb-2 sketch-heading" style={{ fontFamily: "'Kalam', cursive" }}>
                            {post.title}
                          </h2>
                          <p className="mb-4" style={{ fontFamily: "'Kalam', cursive" }}>
                            {post.excerpt || 'Tidak ada deskripsi'}
                          </p>
                          <div className="flex items-center text-sm">
                            <span style={{ fontFamily: "'Kalam', cursive" }}>
                              {new Date(post.created_at).toLocaleDateString('id-ID')}
                            </span>
                            {post.published ? (
                              <span className="ml-4 px-2 py-1 bg-green-100 text-green-800 rounded" style={{ fontFamily: "'Kalam', cursive" }}>
                                Dipublikasikan
                              </span>
                            ) : (
                              <span className="ml-4 px-2 py-1 bg-yellow-100 text-yellow-800 rounded" style={{ fontFamily: "'Kalam', cursive" }}>
                                Draft
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(post.id)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            style={{ fontFamily: "'Kalam', cursive" }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            style={{ fontFamily: "'Kalam', cursive" }}
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </main>
        
        <div className="text-center my-4">
          <a
            href="/admin"
            className="inline-block bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg sketch-line"
            style={{ fontFamily: "'Kalam', cursive" }}
          >
            Kembali ke Admin Panel
          </a>
        </div>
        
        <footer className="text-center py-6 relative z-10">
          <p className="sketch-line" style={{ fontFamily: "'Kalam', cursive" }}>&copy; 2025 UNIQUESTUFF. All rights reserved.</p>
        </footer>
      </div>
    </ProtectedRoute>
 );
}