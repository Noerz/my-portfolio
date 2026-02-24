import { promises as fs } from "fs";
import path from "path";
import { cache } from "react";
import { BlogPost } from "@/types/portfolio";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

interface Frontmatter {
  id?: string;
  title?: string;
  date?: string;
  excerpt?: string;
  tags?: string[];
  readTime?: string;
  slug?: string;
}

const parseTags = (value: string): string[] => {
  const cleaned = value.replace(/^\[/, "").replace(/\]$/, "");
  return cleaned
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
};

const parseFrontmatter = (raw: string): { frontmatter: Frontmatter; content: string } => {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, content: raw.trim() };
  }

  const [, fmBlock, content] = match;
  const frontmatter: Frontmatter = {};

  fmBlock.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    const separatorIndex = trimmed.indexOf(":");
    if (separatorIndex === -1) return;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();

    if (key === "tags") {
      frontmatter.tags = parseTags(value);
      return;
    }

    // Only assign string values to string fields
    if (
      key === "id" ||
      key === "title" ||
      key === "date" ||
      key === "excerpt" ||
      key === "readTime" ||
      key === "slug"
    ) {
      (frontmatter as any)[key] = value;
    }
  });

  return { frontmatter, content: content.trim() };
};

export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  const files = await fs.readdir(BLOG_DIR);
  const markdownFiles = files.filter((file) => file.endsWith(".md"));

  const posts = await Promise.all(
    markdownFiles.map(async (file, index) => {
      const filePath = path.join(BLOG_DIR, file);
      const raw = await fs.readFile(filePath, "utf8");
      const { frontmatter, content } = parseFrontmatter(raw);

      const slug = frontmatter.slug || file.replace(/\.md$/, "");
      const id = frontmatter.id || `blog-${index + 1}`;

      return {
        id,
        title: frontmatter.title || slug,
        excerpt: frontmatter.excerpt || "",
        date: frontmatter.date || "1970-01-01",
        slug,
        content,
        tags: frontmatter.tags || [],
        readTime: frontmatter.readTime || "",
      };
    })
  );

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});
