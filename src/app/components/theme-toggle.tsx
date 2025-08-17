"use client";

import React from 'react';
import { useTheme } from '../theme-context';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="hand-drawn-border p-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow flex items-center"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        // Icon matahari untuk mode terang dengan gaya handraw
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="3.5" strokeWidth="1.5"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3L12 5M12 19L12 21M3 12L5 12M19 12L21 12M5.64 5.64L7.05 7.05M16.95 16.95L18.36 18.36M5.64 18.36L7.05 16.95M16.95 7.05L18.36 5.64"/>
        </svg>
      ) : (
        // Icon bulan untuk mode gelap
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.03 0 0012 21a9.003 9.003 0 08.354-5.646z" />
        </svg>
      )}
    </button>
  );
}