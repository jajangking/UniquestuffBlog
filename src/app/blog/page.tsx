"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '../components/theme-toggle';
import { supabase } from '../../lib/supabaseClient';

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

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const postsPerPage = 3; // Diubah menjadi 3 artikel per halaman

  // Fungsi untuk mengambil data dengan query yang sangat sederhana
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Hitung offset untuk pagination
      const from = (currentPage - 1) * postsPerPage;
      const to = from + postsPerPage - 1;
      
      console.log('Fetching posts with simple query');
      
      // Query yang sangat sederhana
      const { data, error, count } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact' })
        .eq('published', true)
        .order('created_at', { ascending: false })
        .range(from, to);
      
      // Cek error
      if (error) {
        console.error('Query error:', error);
        console.error('Query error JSON:', JSON.stringify(error, null, 2));
        setError(`Gagal mengambil artikel: ${error.message || 'Error tidak diketahui'}`);
        return;
      }
      
      // Filter data berdasarkan searchQuery jika ada
      let filteredData = data || [];
      if (searchQuery) {
        filteredData = filteredData.filter(post => 
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Set data
      setPosts(filteredData);
      setTotalPosts(count || 0);
    } catch (err) {
      console.error('Unexpected error:', err);
      console.error('Unexpected error JSON:', JSON.stringify(err, null, 2));
      setError(`Error tidak terduga: ${err instanceof Error ? err.message : 'Error tidak diketahui'}`);
    } finally {
      setLoading(false);
    }
  };
  
  // useEffect untuk mengambil data ketika currentPage atau searchQuery berubah
  useEffect(() => {
    fetchPosts();
}, [currentPage, searchQuery]);
  
  // useEffect untuk mengambil histori pencarian dari localStorage
  useEffect(() => {
    const history = localStorage.getItem('blogSearchHistory');
    if (history) {
      try {
        setSearchHistory(JSON.parse(history));
      } catch (e) {
        console.error('Failed to parse search history', e);
      }
    }
  }, []);
  
  // useEffect untuk menyimpan histori pencarian ke localStorage
  useEffect(() => {
    if (searchQuery && !searchHistory.includes(searchQuery)) {
      const newHistory = [searchQuery, ...searchHistory].slice(0, 10); // Simpan maksimal 10 histori
      setSearchHistory(newHistory);
      localStorage.setItem('blogSearchHistory', JSON.stringify(newHistory));
    }
  }, [searchQuery, searchHistory]);
  
  // useEffect untuk mengambil suggest berdasarkan input
  useEffect(() => {
    if (searchQuery.length > 1) {
      // Filter histori yang cocok dengan input
      const filteredHistory = searchHistory.filter(item => 
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      // Ambil judul artikel dari state posts yang cocok dengan input
      const articleTitles = posts
        .filter(post => 
          post.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map(post => post.title);
      
      // Gabungkan dan hapus duplikat
      const allSuggestions = [...new Set([...filteredHistory, ...articleTitles])].slice(0, 5);
      setSuggestions(allSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, searchHistory, posts]);
  
  // Fungsi untuk menangani pencarian
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Reset ke halaman pertama saat pencarian
    setCurrentPage(1);
    setShowSuggestions(false);
  };
  
  // Fungsi untuk menghapus text pencarian
  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };
  
  // Fungsi untuk memilih suggest
  const selectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setCurrentPage(1);
  };
  
  // Fungsi untuk menangani perubahan halaman
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll ke bagian atas daftar artikel
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <div className="min-h-screen relative">
      {/* Tombol toggle tema di pojok kanan atas */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>
      
      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 sketch-heading" style={{ fontFamily: "'Kalam', cursive" }}>
              UNIQUESTUFF Blog
            </h1>
            <p className="text-xl sketch-paragraph" style={{ fontFamily: "'Kalam', cursive" }}>
              Temukan artikel menarik seputar teknologi, gaya hidup, dan hal-hal unik
            </p>
          </div>
          
          {/* Form pencarian dengan fitur pintar */}
          <form onSubmit={handleSearch} className="mb-8 relative">
            <div className="hand-drawn-border rounded-xl p-4">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
                  placeholder="Cari artikel..."
                  className="w-full px-4 py-2 sketch-paragraph"
                  style={{ fontFamily: "'Kalam', cursive" }}
                />
                {searchQuery && (
                  <button 
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-foreground hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200"
                    style={{ 
                      fontFamily: "'Kalam', cursive",
                      border: "1px solid var(--foreground)",
                      fontSize: "14px",
                      fontWeight: "bold"
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
              <button 
                type="submit"
                className="mt-2 w-full text-foreground font-bold py-2 px-4 rounded-lg sketch-line transition duration-300 ease-in-out transform hover:scale-105"
                style={{ 
                  fontFamily: "'Kalam', cursive",
                  border: "2px solid var(--foreground)" // Border dinamis mengikuti tema
                }}
              >
                Cari
              </button>
            </div>
            
            {/* Suggest pencarian */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="hand-drawn-border rounded-xl p-2 mt-1 absolute left-0 right-0 bg-white z-10">
                <ul>
                  {suggestions.map((suggestion, index) => (
                    <li 
                      key={index}
                      onClick={() => selectSuggestion(suggestion)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer sketch-paragraph"
                      style={{ fontFamily: "'Kalam', cursive" }}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </form>
          
          <div className="hand-drawn-border rounded-2xl p-8 mb-12" style={{ backgroundColor: "transparent" }}>
            {loading ? (
              <div className="text-center py-8">
                <p style={{ fontFamily: "'Kalam', cursive" }}>Memuat artikel...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <div className="sketch-heading inline-block p-4 mb-4" style={{ fontFamily: "'Kalam', cursive" }}>
                  <p className="text-xl font-bold">Waduh, ada yang nggak beres nih! 🫠</p>
                </div>
                <p className="sketch-paragraph mb-6" style={{ fontFamily: "'Kalam', cursive" }}>
                  Kayaknya sistem lagi bermasalah deh, coba deh pencet tombol &quot;Cari Artikel&quot; di bawah ini biar bisa ketemu artikelnya! 
                  Jangan lupa berdoa ya biar cepat ketemu! 😅
                </p>
                <button 
                  onClick={() => {
                    setError(null);
                    fetchPosts();
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-full sketch-line transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                  style={{ fontFamily: "'Kalam', cursive" }}
                >
                  🔍 Cari Artikel
                </button>
                <p className="mt-4 text-sm sketch-paragraph" style={{ fontFamily: "'Kalam', cursive" }}>
                  Kalau masih error juga, coba deh cari artikel lain aja ya! 😊
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-8">
                  {posts.length > 0 ? (
                    posts.map((post) => (
                      <article key={post.id} className="hand-drawn-border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:border-blue-300">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <h2 className="text-2xl font-bold mb-2 sketch-heading text-center" style={{ fontFamily: "'Kalam', cursive" }}>{post.title}</h2>
                          <span className="text-sm text-gray-500" style={{ fontFamily: "'Kalam', cursive" }}>
                            {new Date(post.created_at).toLocaleDateString('id-ID')}
                          </span>
                        </div>
                        
                        <div className="flex items-center mb-4">
                          <span className="text-sm font-medium" style={{ fontFamily: "'Kalam', cursive" }}>
                            Oleh: {post.author || 'Anonim'}
                          </span>
                        </div>
                        
                        <p className="sketch-paragraph mb-4" style={{ fontFamily: "'Kalam', cursive" }}>{post.excerpt || post.content.substring(0, 200) + '...'}</p>
                        
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, index) => (
                              <span 
                                key={index} 
                                className="px-3 py-1 text-sm font-medium rounded-full sketch-line transition duration-300 ease-in-out transform hover:scale-105"
                                style={{ 
                                  fontFamily: "'Kalam', cursive",
                                  border: "2px solid var(--foreground)",
                                  color: "var(--foreground)"
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <Link 
                          href={`/blog/${post.slug}`}
                          className="inline-block sketch-line font-bold underline transition duration-300 ease-in-out hover:text-gray-50"
                          style={{ fontFamily: "'Kalam', cursive", color: "var(--foreground)" }}
                        >
                          Baca Selengkapnya
                        </Link>
                      </article>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <p className="sketch-paragraph" style={{ fontFamily: "'Kalam', cursive" }}>
                        Artikel tidak ditemukan, coba cari di halaman lain
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Navigasi halaman */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <nav className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg sketch-line transition duration-300 ease-in-out transform hover:scale-105 ${
                          currentPage === 1 
                            ? 'bg-gray-300 text-gray-50 cursor-not-allowed' 
                            : 'text-foreground border-2 border-foreground'
                        }`}
                        style={{ 
                          fontFamily: "'Kalam', cursive",
                          border: currentPage === 1 ? '2px solid var(--foreground)' : '2px solid var(--foreground)'
                        }}
                      >
                        Sebelumnya
                      </button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`w-10 h-10 rounded-full sketch-line transition duration-300 ease-in-out transform hover:scale-105 ${
                            currentPage === page
                              ? 'bg-blue-500 text-white border-2 border-blue-500'
                              : 'text-foreground border-2 border-foreground'
                          }`}
                          style={{ fontFamily: "'Kalam', cursive" }}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg sketch-line transition duration-300 ease-in-out transform hover:scale-105 ${
                          currentPage === totalPages
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'text-foreground border-2 border-foreground'
                        }`}
                        style={{ 
                          fontFamily: "'Kalam', cursive",
                          border: currentPage === totalPages ? '2px solid var(--foreground)' : '2px solid var(--foreground)'
                        }}
                      >
                        Selanjutnya
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      
      <div className="text-center my-8">
        <Link
          href="/"
          className="inline-block text-foreground font-bold py-3 px-6 rounded-lg sketch-line transition duration-300 ease-in-out transform hover:scale-105"
          style={{ 
            fontFamily: "'Kalam', cursive",
            border: "2px solid var(--foreground)"
          }}
        >
          Kembali ke Beranda
        </Link>
      </div>
      
      <footer className="w-full text-center py-6">
        <p className="sketch-line" style={{ fontFamily: "'Kalam', cursive" }}>&copy; 2025 UNIQUESTUFF. All rights reserved.</p>
      </footer>
    </div>
  );
}