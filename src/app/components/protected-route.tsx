"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth-context';
import { useRouter } from 'next/navigation';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Tambahkan penanganan untuk memastikan status autentikasi diperiksa dengan benar
    const checkAuthStatus = () => {
      if (isAuthenticated === true) {
        // Pengguna terautentikasi, tampilkan konten
        setIsChecking(false);
      } else if (isAuthenticated === false) {
        // Pengguna tidak terautentikasi, arahkan ke halaman login
        router.push('/login?redirect=/admin');
      } else {
        // Status autentikasi masih belum ditentukan, tunggu sampai diperbarui
        // Komponen ini akan dirender ulang ketika isAuthenticated berubah
      }
    };

    checkAuthStatus();
  }, [isAuthenticated, router]);

  // Tampilkan loading atau null saat memeriksa status autentikasi
  if (isChecking || isAuthenticated === null || isAuthenticated === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Memeriksa status autentikasi...</p>
      </div>
    );
  }

  // Jika pengguna terautentikasi, tampilkan children
  // Jika tidak, tampilkan null (karena pengguna sudah diarahkan ke halaman login)
 return isAuthenticated ? <>{children}</> : null;
}