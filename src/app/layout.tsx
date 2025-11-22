

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeToggle } from "@/components/ThemeToggle";
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
    <html lang="id" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                if (!theme) {
                  document.documentElement.classList.add('dark');
                  localStorage.setItem('theme', 'dark');
                } else if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
                
                // Scroll to top on page load/refresh
                if ('scrollRestoration' in history) {
                  history.scrollRestoration = 'manual';
                }
                window.scrollTo(0, 0);
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
