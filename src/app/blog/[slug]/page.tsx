"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ThemeToggle } from '../../components/theme-toggle';
import { supabase } from '../../../lib/supabaseClient';

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

export default function BlogPostPage() {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const { slug } = params;

  const fetchPost = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) throw error;
      
      if (data) {
        setPost(data);
      } else {
        // Jika tidak ada data, arahkan ke halaman blog utama
        router.push('/blog');
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
      router.push('/blog');
    } finally {
      setLoading(false);
    }
  }, [router, slug]);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug, fetchPost]);

  if (loading) {
    return (
      <div className="min-h-screen font-sans relative">
        {/* Tombol toggle tema di pojok kanan atas */}
        <div className="absolute top-4 right-4 z-20">
          <ThemeToggle />
        </div>
        
        <main className="container mx-auto px-4 py-12 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-8">
              <p style={{ fontFamily: "'Kalam', cursive", fontWeight: 'bold' }}>Memuat artikel...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen font-sans relative">
        {/* Tombol toggle tema di pojok kanan atas */}
        <div className="absolute top-4 right-4 z-20">
          <ThemeToggle />
        </div>
        
        <main className="container mx-auto px-4 py-12 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-8">
              <p style={{ fontFamily: "'Kalam', cursive", fontWeight: 'bold' }}>Artikel tidak ditemukan.</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans relative">
      {/* Tombol toggle tema di pojok kanan atas */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>
      
      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <article className="hand-drawn-border rounded-2xl p-8">
            <header className="mb-8">
              <h1 className="text-4xl font-bold mb-4 sketch-heading" style={{ fontFamily: "'Kalam', cursive", fontWeight: 'bold' }}>
                {post.title}
              </h1>
              <div className="flex items-center text-sm mb-4">
                <span style={{ fontFamily: "'Kalam', cursive", fontWeight: 'bold' }}>
                  {post.author && `Oleh ${post.author} • `}
                  {new Date(post.created_at).toLocaleDateString('id-ID')}
                </span>
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm sketch-heading"
                      style={{ fontFamily: "'Kalam', cursive", fontWeight: 'bold' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>
            
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
          
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-block bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg sketch-line"
              style={{ fontFamily: "'Kalam', cursive", fontWeight: 'bold' }}
            >
              ← Kembali ke Blog
            </Link>
          </div>
        </div>
      </main>
      
      <div className="text-center my-4">
        <Link
          href="/"
          className="inline-block bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg sketch-line transition duration-300 ease-in-out transform hover:scale-105"
          style={{ fontFamily: "'Kalam', cursive", fontWeight: 'bold' }}
        >
          Kembali ke Beranda
        </Link>
      </div>
      
      <footer className="w-full text-center py-6">
        <p className="sketch-line" style={{ fontFamily: "'Kalam', cursive", fontWeight: 'bold' }}>&copy; 2025 UNIQUESTUFF. All rights reserved.</p>
      </footer>
    </div>
  );
}