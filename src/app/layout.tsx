import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./theme-context";
import { AuthProvider } from "./auth-context";

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
      <body
        className="antialiased"
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
