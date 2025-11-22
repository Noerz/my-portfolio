import { getPortfolioData } from "@/lib/portfolioService";
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

            <div className="space-y-6 text-zinc-700 dark:text-zinc-300 leading-relaxed">
              <p>
                Ini adalah konten blog post. Dalam implementasi nyata, Anda bisa:
              </p>
              
              <ul className="space-y-2">
                <li>Menggunakan MDX untuk menulis blog dengan Markdown + React components</li>
                <li>Fetch content dari CMS seperti Contentful atau Sanity</li>
                <li>Gunakan file markdown di folder <code>content/blog/</code></li>
                <li>Atau gunakan database untuk menyimpan artikel</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-zinc-900 dark:text-zinc-100">
                Contoh Section
              </h2>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris.
              </p>

              <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-600 p-6 rounded-r-lg my-8">
                <p className="text-blue-900 dark:text-blue-100 font-medium">
                  💡 <strong>Pro Tip:</strong> Ini adalah contoh callout box yang bisa digunakan 
                  untuk highlight informasi penting.
                </p>
              </div>

              <h3 className="text-xl font-bold mt-6 mb-3 text-zinc-900 dark:text-zinc-100">
                Code Example
              </h3>

              <pre className="bg-zinc-900 dark:bg-zinc-950 text-zinc-100 p-4 rounded-lg overflow-x-auto">
                <code>{`function greet(name: string) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));`}</code>
              </pre>

              <p>
                Untuk blog yang lebih lengkap, saya rekomendasikan menggunakan library seperti:
              </p>

              <ul>
                <li><strong>next-mdx-remote</strong> - Untuk MDX support</li>
                <li><strong>gray-matter</strong> - Untuk parsing frontmatter</li>
                <li><strong>rehype/remark plugins</strong> - Untuk syntax highlighting</li>
              </ul>
            </div>
          </div>
        </article>

        {/* Back to Blog */}
        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center opacity-0 animate-fade-in delay-200">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg font-semibold hover:scale-105 transition-transform"
          >
            ← Kembali ke Blog
          </Link>
        </div>
      </main>
    </div>
  );
}
