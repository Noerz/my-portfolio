import { Section } from "@/components/Section";
import { BlogPost } from "@/types/portfolio";

interface BlogSectionProps {
  posts: BlogPost[];
}

export function BlogSection({ posts }: BlogSectionProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <Section id="blog" title="Blog & Catatan Teknis">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <article
            key={post.id}
            className="group bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 opacity-0 animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <time className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {new Date(post.date).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </time>
              {post.readTime && (
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  ⏱️ {post.readTime}
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold mb-2 text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
              {post.title}
            </h3>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-md font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <a
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:gap-2 transition-all"
            >
              Baca selengkapnya
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </article>
        ))}
      </div>
    </Section>
  );
}
