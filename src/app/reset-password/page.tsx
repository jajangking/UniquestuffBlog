"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '../components/theme-toggle';
import { useAuth } from '../auth-context';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);
  const router = useRouter();
  const { updatePassword } = useAuth();

  useEffect(() => {
    // Dengan Supabase, kita tidak perlu memeriksa token secara manual
    // Supabase akan menangani verifikasi token secara otomatis
    setTokenValid(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsSubmitting(true);

    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok');
      setIsSubmitting(false);
      return;
    }

    if (password.length < 6) {
      setError('Password minimal 6 karakter');
      setIsSubmitting(false);
      return;
    }

    try {
      // Gunakan fungsi updatePassword dari auth-context
      const urlParams = new URLSearchParams(window.location.search);
      const email = urlParams.get('email');
      
      const success = await updatePassword(password);
      if (success) {
        setMessage('Password berhasil diubah. Anda akan dialihkan ke halaman login.');
        
        // Redirect ke halaman login setelah 3 detik
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        setError('Terjadi kesalahan. Silakan coba lagi.');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!tokenValid) {
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
                Reset Password
              </h1>
              <p className="text-xl sketch-paragraph" style={{ fontFamily: "'Kalam', cursive" }}>
                Reset password akun Anda
              </p>
            </div>
            
            <div className="hand-drawn-border rounded-2xl p-8">
              {error && (
                <div className="mb-6 p-3 bg-red-100 border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              
              <div className="mt-8 text-center">
                <a 
                  href="/login" 
                  className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mr-4 sketch-line"
                  style={{ fontFamily: "'Kalam', cursive" }}
                >
                  Kembali ke Login
                </a>
              </div>
              
              <div className="mt-4 text-center">
                <a
                  href="/"
                  className="inline-block bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg sketch-line"
                  style={{ fontFamily: "'Kalam', cursive" }}
                >
                  Kembali ke Beranda
                </a>
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
              Reset Password
            </h1>
            <p className="text-xl sketch-paragraph" style={{ fontFamily: "'Kalam', cursive" }}>
              Masukkan password baru Anda
            </p>
          </div>
          
          <div className="hand-drawn-border rounded-2xl p-8">
            {error && (
              <div className="mb-6 p-3 bg-red-100 border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
            
            {message && (
              <div className="mb-6 p-3 bg-green-100 border-green-400 text-green-700 rounded">
                {message}
              </div>
            )}
            
            {!message && (
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="password" className="block text-lg font-bold mb-2 sketch-line" style={{ fontFamily: "'Kalam', cursive" }}>
                    Password Baru
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan password baru Anda"
                    style={{ fontFamily: "'Kalam', cursive" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-lg font-bold mb-2 sketch-line" style={{ fontFamily: "'Kalam', cursive" }}>
                    Konfirmasi Password Baru
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="w-full px-4 py-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Konfirmasi password baru Anda"
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Memproses...' : 'Reset Password'}
                </button>
              </form>
            )}
            
            <div className="mt-8 text-center">
              <a 
                href="/login" 
                className="inline-block bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg mr-4 sketch-line"
                style={{ fontFamily: "'Kalam', cursive" }}
              >
                Kembali ke Login
              </a>
            </div>
            
            <div className="mt-4 text-center">
              <a
                href="/"
                className="inline-block bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg sketch-line"
                style={{ fontFamily: "'Kalam', cursive" }}
              >
                Kembali ke Beranda
              </a>
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