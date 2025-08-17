import { ThemeToggle } from './components/theme-toggle';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen font-sans relative">
      {/* Tombol toggle tema di pojok kanan atas */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>
      
      {/* Doodle elements */}
      <div className="doodle-star doodle-element" style={{ top: '10%', left: '5%' }}></div>
      <div className="doodle-circle doodle-element" style={{ top: '20%', right: '10%' }}></div>
      <div className="doodle-star doodle-element" style={{ bottom: '30%', left: '15%' }}></div>
      <div className="doodle-circle doodle-element" style={{ bottom: '20%', right: '20%' }}></div>
      <div className="doodle-squiggle doodle-element" style={{ top: '15%', right: '15%' }}></div>
      
      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 sketch-heading" style={{ fontFamily: "'Kalam', cursive" }}>
            UNIQUESTUFF
          </h1>
          <p className="text-xl max-w-2xl mx-auto sketch-paragraph" style={{ fontFamily: "'Kalam', cursive" }}>
            Tempatnya hal-hal unik dan lucu yang nggak ada di tempat lain!
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <nav className="hand-drawn-border rounded-2xl p-6 mb-12">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <li className="hand-drawn-border rounded-xl p-4 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <Link 
                  href="/makanin" 
                  className="block text-center"
                  style={{ fontFamily: "'Kalam', cursive" }}
                >
                  <h2 className="text-2xl font-bold mb-2 sketch-line" style={{ fontFamily: "'Kalam', cursive" }}>Makanin</h2>
                  <p style={{ fontFamily: "'Kalam', cursive" }}>Temukan resep makanan unik</p>
                </Link>
              </li>
              <li className="hand-drawn-border rounded-xl p-4 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <Link 
                  href="/store" 
                  className="block text-center"
                  style={{ fontFamily: "'Kalam', cursive" }}
                >
                  <h2 className="text-2xl font-bold mb-2 sketch-line" style={{ fontFamily: "'Kalam', cursive" }}>Store</h2>
                  <p style={{ fontFamily: "'Kalam', cursive" }}>Beli barang lucu dan unik</p>
                </Link>
              </li>
              <li className="hand-drawn-border rounded-xl p-4 transform rotate-2 hover:rotate-0 transition-transform duration-30">
                <Link 
                  href="/blog" 
                  className="block text-center"
                  style={{ fontFamily: "'Kalam', cursive" }}
                >
                  <h2 className="text-2xl font-bold mb-2 sketch-line" style={{ fontFamily: "'Kalam', cursive" }}>Blog</h2>
                  <p style={{ fontFamily: "'Kalam', cursive" }}>Baca artikel menarik</p>
                </Link>
              </li>
              <li className="hand-drawn-border rounded-xl p-4 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                <Link 
                  href="/admin" 
                  className="block text-center"
                  style={{ fontFamily: "'Kalam', cursive" }}
                >
                  <h2 className="text-2xl font-bold mb-2 sketch-line" style={{ fontFamily: "'Kalam', cursive" }}>Admin Panel</h2>
                  <p style={{ fontFamily: "'Kalam', cursive" }}>Kelola konten situs</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </main>
      
      <footer className="text-center py-6 relative z-10">
        <p className="sketch-line" style={{ fontFamily: "'Kalam', cursive" }}>&copy; 2025 UNIQUESTUFF. All rights reserved.</p>
      </footer>
    </div>
  );
}
