"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ThemeToggle } from '../components/theme-toggle';
import { useAuth } from '../auth-context';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const auth = useAuth();
  const register = auth?.register;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok');
      return;
    }

    if (password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }

    try {
      const success = await register(email, password);
      if (success) {
        router.push('/login?registered=true');
      } else {
        setError('Gagal mendaftar. Email mungkin sudah terdaftar.');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen font-sans relative flex items-center justify-center">
      {/* Tombol toggle tema di pojok kanan atas */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>
      
      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 sketch-heading" style={{ fontFamily: "'Kalam', cursive" }}>
              Daftar Admin
            </h1>
            <p className="text-xl sketch-paragraph" style={{ fontFamily: "'Kalam', cursive" }}>
              Buat akun baru untuk panel administrasi UNIQUESTUFF
            </p>
          </div>
          
          <div className="hand-drawn-border rounded-2xl p-8">
            {error && (
              <div className="mb-6 p-3 bg-red-100 border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-lg font-bold mb-2 sketch-line" style={{ fontFamily: "'Kalam', cursive" }}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan email Anda"
                  style={{ fontFamily: "'Kalam', cursive" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-lg font-bold mb-2 sketch-line" style={{ fontFamily: "'Kalam', cursive" }}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan password Anda"
                  style={{ fontFamily: "'Kalam', cursive" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-lg font-bold mb-2 sketch-line" style={{ fontFamily: "'Kalam', cursive" }}>
                  Konfirmasi Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full px-4 py-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-50"
                  placeholder="Konfirmasi password Anda"
                  style={{ fontFamily: "'Kalam', cursive" }}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-50 focus:ring-offset-2"
                style={{ fontFamily: "'Kalam', cursive" }}
              >
                Daftar
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="sketch-line" style={{ fontFamily: "'Kalam', cursive" }}>
                Sudah punya akun?{' '}
                <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 sketch-line" style={{ fontFamily: "'Kalam', cursive" }}>
                  Masuk sekarang
                </Link>
              </p>
            </div>
            
            <div className="mt-8 text-center">
              <Link 
                href="/" 
                className="inline-block bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg mr-4 sketch-line"
                style={{ fontFamily: "'Kalam', cursive" }}
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="absolute bottom-0 w-full text-center py-6">
        <p className="sketch-line" style={{ fontFamily: "'Kalam', cursive" }}>&copy; 2025 UNIQUESTUFF. All rights reserved.</p>
      </footer>
    </div>
  );
}