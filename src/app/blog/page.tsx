"use client";

import { useState, useEffect } from 'react';
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
  const [activeTab, setActiveTab] = useState('latest');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter posts based on active tab
  const latestPosts = posts;
  const popularPosts = posts.slice(0, 3); // For demo purposes, showing first 3 posts
  const categories = [...new Set(posts.flatMap(post => post.tags))]; // Get unique tags

  return (
    <div className="min-h-screen font-sans relative">
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
          
          <div className="hand-drawn-border rounded-2xl p-8 mb-12">
            <div className="flex border-b mb-6">
              <button 
                className={`py-2 px-4 font-medium ${activeTab === 'latest' ? 'border-b-2 border-blue-500' : ''}`}
                onClick={() => setActiveTab('latest')}
                style={{ fontFamily: "'Kalam', cursive" }}
              >
                Terbaru
              </button>
              <button 
                className={`py-2 px-4 font-medium ${activeTab === 'popular' ? 'border-b-2 border-blue-500' : ''}`}
                onClick={() => setActiveTab('popular')}
                style={{ fontFamily: "'Kalam', cursive" }}
              >
                Populer
              </button>
              <button 
                className={`py-2 px-4 font-medium ${activeTab === 'categories' ? 'border-b-2 border-blue-500' : ''}`}
                onClick={() => setActiveTab('categories')}
                style={{ fontFamily: "'Kalam', cursive" }}
              >
                Kategori
              </button>
            </div>
            
            {loading ? (
              <div className="text-center py-8">
                <p style={{ fontFamily: "'Kalam', cursive" }}>Memuat artikel...</p>
              </div>
            ) : (
              <>
                {activeTab === 'latest' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4 sketch-heading" style={{ fontFamily: "'Kalam', cursive" }}>Artikel Terbaru</h2>
                    <p className="mb-4 sketch-paragraph" style={{ fontFamily: "'Kalam', cursive" }}>
                      Temukan artikel-artikel menarik dan terbaru seputar teknologi, gaya hidup, dan hal-hal unik dari UNIQUESTUFF.
                    </p>
                    <div className="space-y-6 mt-8">
                      {latestPosts.length > 0 ? (
                        latestPosts.map((post) => (
                          <div key={post.id} className="hand-drawn-border rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-2 sketch-heading" style={{ fontFamily: "'Kalam', cursive" }}>{post.title}</h3>
                            <p className="sketch-paragraph mb-4" style={{ fontFamily: "'Kalam', cursive" }}>{post.excerpt || post.content.substring(0, 150) + '...'}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-sm" style={{ fontFamily: "'Kalam', cursive" }}>
                                {new Date(post.created_at).toLocaleDateString('id-ID')}
                              </span>
                              <Link 
                                href={`/blog/${post.slug}`}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                style={{ fontFamily: "'Kalam', cursive" }}
                              >
                                Baca Selengkapnya
                              </Link>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p style={{ fontFamily: "'Kalam', cursive" }}>Belum ada artikel yang dipublikasikan.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {activeTab === 'popular' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4 sketch-heading" style={{ fontFamily: "'Kalam', cursive" }}>Artikel Populer</h2>
                    <p className="sketch-paragraph" style={{ fontFamily: "'Kalam', cursive" }}>Artikel-artikel paling populer yang paling banyak dibaca oleh pengunjung kami.</p>
                    <div className="space-y-6 mt-8">
                      {popularPosts.length > 0 ? (
                        popularPosts.map((post) => (
                          <div key={post.id} className="hand-drawn-border rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-2 sketch-heading" style={{ fontFamily: "'Kalam', cursive" }}>{post.title}</h3>
                            <p className="sketch-paragraph mb-4" style={{ fontFamily: "'Kalam', cursive" }}>{post.excerpt || post.content.substring(0, 150) + '...'}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-sm" style={{ fontFamily: "'Kalam', cursive" }}>
                                {new Date(post.created_at).toLocaleDateString('id-ID')}
                              </span>
                              <Link 
                                href={`/blog/${post.slug}`}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                style={{ fontFamily: "'Kalam', cursive" }}
                              >
                                Baca Selengkapnya
                              </Link>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p style={{ fontFamily: "'Kalam', cursive" }}>Belum ada artikel yang populer.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {activeTab === 'categories' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4 sketch-heading" style={{ fontFamily: "'Kalam', cursive" }}>Kategori Artikel</h2>
                    <p className="sketch-paragraph" style={{ fontFamily: "'Kalam', cursive" }}>Jelajahi artikel berdasarkan kategori yang Anda minati.</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                      {categories.length > 0 ? (
                        categories.map((category, index) => (
                          <div key={index} className="hand-drawn-border rounded-xl p-4 text-center">
                            <h3 className="text-lg font-bold sketch-heading" style={{ fontFamily: "'Kalam', cursive" }}>{category}</h3>
                            <p className="text-sm mt-2" style={{ fontFamily: "'Kalam', cursive" }}>
                              {posts.filter(post => post.tags.includes(category)).length} artikel
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 col-span-3">
                          <p style={{ fontFamily: "'Kalam', cursive" }}>Belum ada kategori yang tersedia.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      
      <div className="text-center my-4">
        <Link
          href="/"
          className="inline-block bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg sketch-line transition duration-300 ease-in-out transform hover:scale-105"
          style={{ fontFamily: "'Kalam', cursive" }}
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