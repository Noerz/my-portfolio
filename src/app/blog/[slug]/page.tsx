import { getPortfolioData } from "@/lib/portfolioService";
import { markdownToHtml } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  const data = await getPortfolioData();
  return data.blogs?.map((post) => ({
    slug: post.slug,
  })) || [];
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const data = await getPortfolioData();
  const post = data.blogs?.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const contentHtml = markdownToHtml(post.content);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link 
            href="/#blog" 
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <span>←</span> Kembali ke Blog
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-12 md:py-20">
        {/* Meta Info */}
        <div className="mb-8 opacity-0 animate-fade-in-up">
          <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400 mb-4">
            <time>
              {new Date(post.date).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            {post.readTime && (
              <>
                <span>•</span>
                <span>⏱️ {post.readTime}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text leading-tight">
            {post.title}
          </h1>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none opacity-0 animate-fade-in-up delay-100">
          <div className="bg-gradient-to-br from-zinc-50 to-slate-50 dark:from-zinc-900 dark:to-slate-900 p-8 md:p-12 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <p className="lead text-xl text-zinc-700 dark:text-zinc-300 mb-8">
              {post.excerpt}
            </p>
            <div
              className="space-y-6 text-zinc-700 dark:text-zinc-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>
        </article>

        {/* Back to Blog */}
        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center opacity-0 animate-fade-in delay-200">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg font-semibold hover:scale-105 transition-transform"
          >
            ← Kembali ke Blog
          </Link>
        </div>
      </main>
    </div>
  );
}
