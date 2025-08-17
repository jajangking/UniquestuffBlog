"use client";

import { ThemeToggle } from '../components/theme-toggle';
import Link from 'next/link';

export default function GamePage() {
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
              UNIQUESTUFF Games
            </h1>
            <p className="text-xl sketch-paragraph" style={{ fontFamily: "'Kalam', cursive" }}>
              Mainkan game seru dan unik yang nggak ada di tempat lain!
            </p>
          </div>
          
          <div className="hand-drawn-border rounded-2xl p-8 mb-12" style={{ backgroundColor: "transparent" }}>
            <div className="text-center py-12">
              <div className="sketch-heading inline-block p-4 mb-4" style={{ fontFamily: "'Kalam', cursive" }}>
                <p className="text-2xl font-bold">🎮 Game Zone 🎮</p>
              </div>
              <p className="sketch-paragraph mb-6 text-lg" style={{ fontFamily: "'Kalam', cursive" }}>
                Tempat kumpulnya game-game seru dan unik! Tantang dirimu dengan berbagai permainan menarik.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <div className="hand-drawn-border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:border-blue-300">
                  <h2 className="text-2xl font-bold mb-4 sketch-heading" style={{ fontFamily: "'Kalam', cursive" }}>Tebak Gambar</h2>
                  <p className="sketch-paragraph mb-4" style={{ fontFamily: "'Kalam', cursive" }}>
                    Uji kemampuanmu menebak gambar yang unik dan lucu!
                  </p>
                  <button 
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-full sketch-line transition duration-300 ease-in-out transform hover:scale-105"
                    style={{ fontFamily: "'Kalam', cursive" }}
                  >
                    Main Sekarang
                  </button>
                </div>
                
                <div className="hand-drawn-border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:border-blue-300">
                  <h2 className="text-2xl font-bold mb-4 sketch-heading" style={{ fontFamily: "'Kalam', cursive" }}>Teka-Teki Silang</h2>
                  <p className="sketch-paragraph mb-4" style={{ fontFamily: "'Kalam', cursive" }}>
                    Asah otakmu dengan teka-teki silang yang seru dan menantang!
                  </p>
                  <button 
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-full sketch-line transition duration-300 ease-in-out transform hover:scale-105"
                    style={{ fontFamily: "'Kalam', cursive" }}
                  >
                    Main Sekarang
                  </button>
                </div>
                
                <div className="hand-drawn-border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:border-blue-300">
                  <h2 className="text-2xl font-bold mb-4 sketch-heading" style={{ fontFamily: "'Kalam', cursive" }}>Memory Match</h2>
                  <p className="sketch-paragraph mb-4" style={{ fontFamily: "'Kalam', cursive" }}>
                    Uji daya ingatmu dengan permainan mencocokan kartu yang menyenangkan!
                  </p>
                  <button 
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-full sketch-line transition duration-300 ease-in-out transform hover:scale-105"
                    style={{ fontFamily: "'Kalam', cursive" }}
                  >
                    Main Sekarang
                  </button>
                </div>
              
              </div>
              <div className="mt-12">
                <p className="sketch-paragraph" style={{ fontFamily: "'Kalam', cursive" }}>
                  Game-game baru akan terus ditambahkan! Pantau terus halaman ini untuk update terbaru.
                </p>
              </div>
            </div>
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