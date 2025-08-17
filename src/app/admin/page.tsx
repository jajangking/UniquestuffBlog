"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ThemeToggle } from '../components/theme-toggle';
import { ProtectedRoute } from '../components/protected-route';
import { useAuth } from '../auth-context';

export default function AdminPanel() {
  const { logout, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Periksa apakah pengguna baru saja mendaftar
    const urlParams = new URLSearchParams(window.location.search);
    const registered = urlParams.get('registered');
    
    if (registered === 'true') {
      // Tampilkan pesan sukses registrasi
      alert('Registrasi berhasil! Silakan login dengan akun Anda.');
      
      // Hapus parameter dari URL
      router.replace('/admin');
    }
  }, [router]);

  const handleLogout = () => {
    logout();
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
              Admin Panel
            </h1>
            <p className="text-xl max-w-2xl mx-auto sketch-paragraph" style={{ fontFamily: "'Kalam', cursive" }}>
              Kelola konten situs UNIQUESTUFF
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="hand-drawn-border rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-4 sketch-line" style={{ fontFamily: "'Kalam', cursive" }}>Kelola Artikel</h2>
                <p className="mb-4" style={{ fontFamily: "'Kalam', cursive" }}>Tambah, edit, atau hapus artikel blog</p>
                <Link
                  href="/admin/blog"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  style={{ fontFamily: "'Kalam', cursive" }}
                >
                  Buka
                </Link>
              </div>
              
              <div className="hand-drawn-border rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-4 sketch-line" style={{ fontFamily: "'Kalam', cursive" }}>Kelola Produk</h2>
                <p className="mb-4" style={{ fontFamily: "'Kalam', cursive" }}>Tambah, edit, atau hapus produk di toko</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Buka
                </button>
              </div>
              
              <div className="hand-drawn-border rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-4 sketch-line" style={{ fontFamily: "'Kalam', cursive" }}>Kelola Resep</h2>
                <p className="mb-4" style={{ fontFamily: "'Kalam', cursive" }}>Tambah, edit, atau hapus resep makanan</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Buka
                </button>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded sketch-line"
                style={{ fontFamily: "'Kalam', cursive" }}
              >
                Keluar dari Admin Panel
              </button>
            </div>
          </div>
        </main>
        
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-block bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg sketch-line"
            style={{ fontFamily: "'Kalam', cursive" }}
          >
            Kembali ke Beranda
          </Link>
        </div>
        
        <footer className="text-center py-6 relative z-10">
          <p className="sketch-line" style={{ fontFamily: "'Kalam', cursive" }}>&copy; 2025 UNIQUESTUFF. All rights reserved.</p>
        </footer>
      </div>
    </ProtectedRoute>
  );
}