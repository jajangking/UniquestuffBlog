"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function DebugNav() {
  const pathname = usePathname();
  
  // Hanya tampilkan di development environment
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Link 
        href="/debug" 
        className={`px-4 py-2 rounded-lg text-white font-bold ${
          pathname === '/debug' 
            ? 'bg-red-600 hover:bg-red-700' 
            : 'bg-gray-800 hover:bg-gray-900'
        }`}
      >
        Debug
      </Link>
    </div>
  );
}