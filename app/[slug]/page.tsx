import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSlugs, getPageBySlug } from "@/lib/markdown";
import { buildMetadata } from "@/lib/seo";
import PageLayout from "@/components/PageLayout";
import MarkdownBody from "@/components/MarkdownBody";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  if (!page) return {};
  return buildMetadata({
    title: page.meta.title,
    description: page.meta.description,
    ogImage: page.meta.ogImage as string | undefined,
    path: `/${slug}`,
  });
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  if (!page) notFound();

  return (
    <PageLayout showBack>
      {page.meta.title && (
        <h1 className="slug-title">{page.meta.title}</h1>
      )}
      {page.meta.date && (
        <p className="slug-date">{page.meta.date}</p>
      )}
      <MarkdownBody content={page.content} />
    </PageLayout>
  );
}
