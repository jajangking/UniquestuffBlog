"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '../components/theme-toggle';

export default function MakaninPage() {
  const [activeTab, setActiveTab] = useState('home');
  
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
              Makan.in
            </h1>
            <p className="text-xl sketch-paragraph" style={{ fontFamily: "'Kalam', cursive" }}>
              Temukan rekomendasi makanan terbaik di sekitarmu
            </p>
          </div>
          
          <div className="hand-drawn-border rounded-2xl p-8 mb-12">
            <div className="flex border-b mb-6">
              <button
                className={`py-2 px-4 font-medium ${activeTab === 'home' ? 'border-b-2 border-blue-500' : ''}`}
                onClick={() => setActiveTab('home')}
                style={{ fontFamily: "'Kalam', cursive" }}
              >
                Beranda
              </button>
              <button
                className={`py-2 px-4 font-medium ${activeTab === 'restaurants' ? 'border-b-2 border-blue-500' : ''}`}
                onClick={() => setActiveTab('restaurants')}
                style={{ fontFamily: "'Kalam', cursive" }}
              >
                Restoran
              </button>
              <button
                className={`py-2 px-4 font-medium ${activeTab === 'reviews' ? 'border-b-2 border-blue-500' : ''}`}
                onClick={() => setActiveTab('reviews')}
                style={{ fontFamily: "'Kalam', cursive" }}
              >
                Ulasan
              </button>
            </div>
            
            {activeTab === 'home' && (
              <div>
                <h2 className="text-2xl font-bold mb-4 sketch-heading" style={{ fontFamily: "'Kalam', cursive" }}>Selamat Datang di Makan.in</h2>
                <p className="mb-4 sketch-paragraph" style={{ fontFamily: "'Kalam', cursive" }}>
                  Temukan berbagai rekomendasi makanan dan restoran terbaik di sekitarmu.
                  Kami menyediakan informasi lengkap tentang tempat makan terbaik dengan ulasan dari pengguna.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="hand-drawn-border rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-2 sketch-heading" style={{ fontFamily: "'Kalam', cursive" }}>Restoran Terbaik</h3>
                    <p className="sketch-paragraph" style={{ fontFamily: "'Kalam', cursive" }}>Temukan restoran dengan rating tertinggi</p>
                  </div>
                  <div className="hand-drawn-border rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-2 sketch-heading" style={{ fontFamily: "'Kalam', cursive" }}>Ulasan Pengguna</h3>
                    <p className="sketch-paragraph" style={{ fontFamily: "'Kalam', cursive" }}>Baca ulasan jujur dari pengguna lain</p>
                  </div>
                  <div className="hand-drawn-border rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-2 sketch-heading" style={{ fontFamily: "'Kalam', cursive" }}>Rekomendasi</h3>
                    <p className="sketch-paragraph" style={{ fontFamily: "'Kalam', cursive" }}>Dapatkan rekomendasi makanan terbaik</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'restaurants' && (
              <div>
                <h2 className="text-2xl font-bold mb-4 sketch-heading" style={{ fontFamily: "'Kalam', cursive" }}>Daftar Restoran</h2>
                <p className="sketch-paragraph" style={{ fontFamily: "'Kalam', cursive" }}>Temukan berbagai restoran terbaik di sekitarmu</p>
                {/* Daftar restoran akan ditampilkan di sini */}
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-2xl font-bold mb-4 sketch-heading" style={{ fontFamily: "'Kalam', cursive" }}>Ulasan Pengguna</h2>
                <p className="sketch-paragraph" style={{ fontFamily: "'Kalam', cursive" }}>Baca ulasan terbaru dari pengguna kami</p>
                {/* Ulasan pengguna akan ditampilkan di sini */}
              </div>
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