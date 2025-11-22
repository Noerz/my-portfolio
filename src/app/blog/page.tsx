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
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-zinc-950 dark:via-blue-950 dark:to-purple-950">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
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
