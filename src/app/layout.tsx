import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-context";
import { AuthProvider } from "./auth-context";
import { DebugNav } from "./components/debug-nav";
import { SupabaseDebugInfo } from "./components/supabase-debug-info";

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
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ fontFamily: "'Kalam', cursive" }}
      >
        <ThemeProvider>
          <AuthProvider>
            {children}
            {/* <DebugNav /> */}
            {/* <SupabaseDebugInfo /> */}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
