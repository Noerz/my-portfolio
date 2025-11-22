"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  tags?: string[];
  readTime?: string;
}

interface BlogPageClientProps {
  posts: BlogPost[];
}

export function BlogPageClient({ posts }: BlogPageClientProps) {
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => {
      post.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Filter by tag
      const matchesTag = selectedTag === "all" || post.tags?.includes(selectedTag);
      
      // Filter by search query
      const matchesSearch = searchQuery === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesTag && matchesSearch;
    });
  }, [posts, selectedTag, searchQuery]);

  // Group by month/year
  const postsByMonth = useMemo(() => {
    const grouped = filteredPosts.reduce((acc, post) => {
      const date = new Date(post.date);
      const monthYear = date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long' });
      
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(post);
      return acc;
    }, {} as Record<string, BlogPost[]>);

    return Object.entries(grouped).sort((a, b) => {
      const dateA = new Date(a[1][0].date);
      const dateB = new Date(b[1][0].date);
      return dateB.getTime() - dateA.getTime();
    });
  }, [filteredPosts]);

  return (
    <>
      {/* Filters */}
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Cari artikel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedTag === "all"
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            Semua ({posts.length})
          </button>
          {allTags.map((tag) => {
            const count = posts.filter(p => p.tags?.includes(tag)).length;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTag === tag
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                {tag} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Posts */}
      <main className="max-w-6xl mx-auto px-4 pb-12">
        {postsByMonth.length > 0 ? (
          postsByMonth.map(([monthYear, monthPosts]) => (
            <section key={monthYear} className="mb-12">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
                {monthYear}
              </h2>
              
              <div className="space-y-6">
                {monthPosts.map((post, index) => (
                  <article
                    key={post.id}
                    className="opacity-0 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block group bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-lg"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {post.title}
                        </h3>
                        <svg
                          className="w-5 h-5 text-zinc-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      
                      <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <time className="text-zinc-500 dark:text-zinc-500">
                          {new Date(post.date).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </time>
                        {post.readTime && (
                          <span className="text-zinc-500 dark:text-zinc-500">
                            {post.readTime}
                          </span>
                        )}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map(tag => (
                              <span
                                key={tag}
                                className="px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-zinc-500 dark:text-zinc-400">
              Tidak ada artikel yang ditemukan.
            </p>
          </div>
        )}
      </main>
    </>
  );
}
