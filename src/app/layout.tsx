import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-context";
import { AuthProvider } from "./auth-context";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UNIQUESTUFF",
  description: "Tempatnya hal-hal unik dan lucu yang nggak ada di tempat lain!",
};

export default function RootLayout({
  children,
}: Readonly<{
 children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <Head>
        {/* 
          Font "Kalam" digunakan untuk seluruh aplikasi sebagai font utama.
          Meskipun ada warning dari ESLint tentang custom fonts, penggunaan ini memang dimaksudkan 
          untuk memberikan tampilan yang konsisten di seluruh aplikasi.
        */}
        <link href="https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap" rel="stylesheet" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ fontFamily: "'Kalam', cursive" }}
      >
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
