import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { buildMetadata } from "@/lib/seo";
import PageLayout from "@/components/PageLayout";
import MarkdownBody from "@/components/MarkdownBody";
import config from "@/site.config.json";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata();

function parseBlocks(md: string): string[] {
  return md.replace(/\r\n/g, "\n").trim().split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
}

export default function Home() {
  const mdPath = path.join(process.cwd(), "content", "home.md");
  const raw = fs.readFileSync(mdPath, "utf-8");
  const { content } = matter(raw);
  const paragraphs = parseBlocks(content);

  const { person, works } = config;

  // Ensure "Some of my work:" is always its own block
  const blocks: string[] = [];
  for (const para of paragraphs) {
    const marker = "Some of my work:";
    const idx = para.indexOf(marker);
    if (idx !== -1) {
      if (idx > 0) blocks.push(para.slice(0, idx).trim());
      blocks.push(marker);
      const after = para.slice(idx + marker.length).trim();
      if (after) blocks.push(after);
    } else {
      blocks.push(para);
    }
  }

  return (
    <PageLayout>
      <header className="home-header">
        {person.avatar && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={person.avatar}
            alt={person.name}
            className="home-avatar"
          />
        )}
        <div>
          <div className="home-name">{person.name}</div>
          <div className="home-role">{person.role}</div>
        </div>
      </header>

      <article className="home-article">
        {blocks.map((para, i) => {
          if (para === "Some of my work:") {
            return (
              <div key={i}>
                <p style={{ fontSize: "0.75rem", letterSpacing: "0.10em", textTransform: "uppercase", fontWeight: 600, color: "var(--text-muted)", marginBottom: "12px" }}>
                  Some of my work
                </p>
                <ul className="home-list">
                  {works.map((work) => (
                    <li key={work.name}>
                      <a href={work.url} target="_blank" rel="noopener noreferrer" className="work-link">
                        {work.name}
                      </a>
                      <span className="work-desc">{work.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }

          return <MarkdownBody key={i} content={para} />;
        })}
      </article>
    </PageLayout>
  );
}
