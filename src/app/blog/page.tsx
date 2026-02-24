import { getPortfolioData } from "@/lib/portfolioService";
import { BlogPageClient } from "./BlogPageClient";
import Link from "next/link";

export const metadata = {
  title: "Blog & Artikel - Portfolio",
  description: "Kumpulan artikel, tutorial, dan pemikiran seputar web development dan teknologi",
};

export default async function BlogPage() {
  const data = await getPortfolioData();
  const posts = data.blogs || [];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Header */}
      <header className="relative border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
        {/* Mesh gradient blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-blue-400 to-cyan-300 dark:from-blue-600 dark:to-cyan-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 dark:opacity-20 animate-blob"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-br from-purple-400 to-pink-300 dark:from-purple-600 dark:to-pink-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 dark:opacity-20 animate-blob animation-delay-2000"></div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Beranda
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Blog & Artikel
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Kumpulan {posts.length} artikel tentang web development, tips & trik, 
            dan berbagi pengalaman dalam dunia teknologi.
          </p>
        </div>
      </header>

      <BlogPageClient posts={posts} />
    </div>
  );
}
