import type { Metadata } from "next";
import config from "@/site.config.json";

const { seo, person } = config;

interface BuildMetaOptions {
  title?: string;
  description?: string;
  ogImage?: string;
  path?: string; // e.g. "/about"
}

export function buildMetadata(opts: BuildMetaOptions = {}): Metadata {
  const title = opts.title
    ? `${opts.title} – ${person.name}`
    : seo.defaultTitle;
  const description = opts.description ?? seo.defaultDescription;
  const url = opts.path ? `${seo.siteUrl}${opts.path}` : seo.siteUrl;
  const image = opts.ogImage ?? seo.defaultOgImage;

  return {
    title,
    description,
    robots: seo.robots,
    metadataBase: new URL(seo.siteUrl),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: person.name,
      locale: seo.locale,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: seo.twitterHandle,
      creator: seo.twitterHandle,
      images: [image],
    },
    other: {
      "theme-color": seo.themeColor,
    },
  };
}
