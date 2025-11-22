

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeToggle } from "@/components/ThemeToggle";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio - Full-Stack Developer",
  description: "Portfolio website menampilkan proyek-proyek web development, skills, dan pengalaman sebagai Full-Stack Developer",
  keywords: ["portfolio", "web developer", "full-stack", "react", "next.js", "typescript"],
  authors: [{ name: "Nama Anda" }],
  openGraph: {
    title: "Portfolio - Full-Stack Developer",
    description: "Portfolio website menampilkan proyek-proyek web development, skills, dan pengalaman",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
