"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '../components/theme-toggle';

export default function StorePage() {
  const [activeTab, setActiveTab] = useState('products');
  
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
              UNIQUESTUFF Store
            </h1>
            <p className="text-xl sketch-paragraph" style={{ fontFamily: "'Kalam', cursive" }}>
              Belanja merchandise dan produk unik dari UNIQUESTUFF
            </p>
          </div>
          
          <div className="hand-drawn-border rounded-2xl p-8 mb-12">
            <div className="flex border-b mb-6">
              <button
                className={`py-2 px-4 font-medium ${activeTab === 'products' ? 'border-b-2 border-blue-500' : ''}`}
                onClick={() => setActiveTab('products')}
                style={{ fontFamily: "'Kalam', cursive" }}
              >
                Produk
              </button>
              <button
                className={`py-2 px-4 font-medium ${activeTab === 'categories' ? 'border-b-2 border-blue-500' : ''}`}
                onClick={() => setActiveTab('categories')}
                style={{ fontFamily: "'Kalam', cursive" }}
              >
                Kategori
              </button>
              <button
                className={`py-2 px-4 font-medium ${activeTab === 'cart' ? 'border-b-2 border-blue-500' : ''}`}
                onClick={() => setActiveTab('cart')}
                style={{ fontFamily: "'Kalam', cursive" }}
              >
                Keranjang
              </button>
            </div>
            
            {activeTab === 'products' && (
              <div>
                <h2 className="text-2xl font-bold mb-4 sketch-heading" style={{ fontFamily: "'Kalam', cursive" }}>Produk Terbaru</h2>
                <p className="mb-4 sketch-paragraph" style={{ fontFamily: "'Kalam', cursive" }}>
                  Temukan berbagai merchandise dan produk unik dari UNIQUESTUFF.
                  Semua produk dibuat dengan kualitas terbaik dan desain yang menarik.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="hand-drawn-border rounded-xl p-6">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
                    <h3 className="text-xl font-bold mb-2 sketch-heading" style={{ fontFamily: "'Kalam', cursive" }}>T-Shirt UNIQUESTUFF</h3>
                    <p className="sketch-paragraph" style={{ fontFamily: "'Kalam', cursive" }}>T-Shirt berkualitas dengan desain khas UNIQUESTUFF</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="font-bold">Rp 150.000</span>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Beli
                      </button>
                    </div>
                  </div>
                  <div className="hand-drawn-border rounded-xl p-6">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
                    <h3 className="text-xl font-bold mb-2 sketch-heading" style={{ fontFamily: "'Kalam', cursive" }}>Mug UNIQUESTUFF</h3>
                    <p className="sketch-paragraph" style={{ fontFamily: "'Kalam', cursive" }}>Mug menarik dengan logo UNIQUESTUFF</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="font-bold">Rp 75.000</span>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Beli
                      </button>
                    </div>
                  </div>
                  <div className="hand-drawn-border rounded-xl p-6">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
                    <h3 className="text-xl font-bold mb-2 sketch-heading" style={{ fontFamily: "'Kalam', cursive" }}>Stiker UNIQUESTUFF</h3>
                    <p className="sketch-paragraph" style={{ fontFamily: "'Kalam', cursive" }}>Stiker berkualitas tinggi dengan desain unik</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="font-bold">Rp 25.000</span>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Beli
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'categories' && (
              <div>
                <h2 className="text-2xl font-bold mb-4 sketch-heading" style={{ fontFamily: "'Kalam', cursive" }}>Kategori Produk</h2>
                <p className="sketch-paragraph" style={{ fontFamily: "'Kalam', cursive" }}>Jelajahi produk berdasarkan kategori</p>
                {/* Daftar kategori akan ditampilkan di sini */}
              </div>
            )}
            
            {activeTab === 'cart' && (
              <div>
                <h2 className="text-2xl font-bold mb-4 sketch-heading" style={{ fontFamily: "'Kalam', cursive" }}>Keranjang Belanja</h2>
                <p className="sketch-paragraph" style={{ fontFamily: "'Kalam', cursive" }}>Produk yang telah Anda tambahkan ke keranjang</p>
                {/* Isi keranjang akan ditampilkan di sini */}
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