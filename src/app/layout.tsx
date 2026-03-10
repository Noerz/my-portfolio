

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

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
        <LanguageProvider>
          <CustomCursor />
          {children}
          <section className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 p-3 pb-1  rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 group dark:border-white dark:border">
            <AnimatedThemeToggler />
          </section>
          {/* Language toggle above theme toggle */}
          <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-8 z-[60]">
            <LanguageToggle />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
