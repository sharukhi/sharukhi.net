import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export interface PageMeta {
  title?: string;
  description?: string;
  ogImage?: string;
  date?: string;
  [key: string]: unknown;
}

export interface MarkdownPage {
  slug: string;
  meta: PageMeta;
  content: string; // raw markdown (without frontmatter)
}

/** Return all slugs from content/*.md (excluding home.md) */
export function getAllSlugs(): string[] {
  const files = fs.readdirSync(contentDir);
  return files
    .filter((f) => f.endsWith(".md") && f !== "home.md")
    .map((f) => f.replace(/\.md$/, ""));
}

/** Read a single markdown file by slug */
export function getPageBySlug(slug: string): MarkdownPage | null {
  const filePath = path.join(contentDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    meta: data as PageMeta,
    content,
  };
}
