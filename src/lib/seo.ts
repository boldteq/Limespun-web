import type { Metadata } from "next";
import { SITE_URL } from "@/lib/brand";

/**
 * Page metadata and JSON-LD for every inner page. Pages export `metadata = pageMetadata(…)`
 * from page.tsx; per-route layout.tsx wrappers that only held metadata go away.
 *
 * Budgets (checked by .design-audit/page-audit.mjs): the full <title> ≤ 60 characters,
 * description 120–160.
 */

const SITE_NAME = "Limespun";
const TITLE_SUFFIX = ` | ${SITE_NAME}`;

/** "/product/calendar" → "https://limespun.com/product/calendar"; "/" → the bare origin. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return clean === "/" ? SITE_URL : `${SITE_URL}${clean}`;
}

export interface PageMetadataInput {
  /** The page's own title, without the brand: "Tattoo studio calendar". " | Limespun" is added. */
  title: string;
  description: string;
  /** Route path, e.g. "/product/calendar". Becomes the canonical and og:url. */
  path: string;
  /**
   * Share-card key for the single /og route (`/og?p=<key>`, Wave 5). Leave it unset until
   * src/app/og/route.tsx exists; without it the page uses `ogImage`.
   */
  ogKey?: string;
  /**
   * Share card when there's no ogKey. Defaults to the site card (src/app/opengraph-image.tsx).
   * It has to be named: a page that sets openGraph drops the card it would otherwise inherit.
   */
  ogImage?: string;
  /** og:type. Posts pass "article". */
  type?: "website" | "article";
}

const DEFAULT_OG_IMAGE = "/opengraph-image";

export function pageMetadata({
  title,
  description,
  path,
  ogKey,
  ogImage = DEFAULT_OG_IMAGE,
  type = "website",
}: PageMetadataInput): Metadata {
  const fullTitle = title.endsWith(TITLE_SUFFIX) || title === SITE_NAME ? title : `${title}${TITLE_SUFFIX}`;
  const url = absoluteUrl(path);
  const images = [{ url: ogKey ? `/og?p=${encodeURIComponent(ogKey)}` : ogImage, width: 1200, height: 630, alt: title }];
  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale: "en_US",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((i) => i.url),
    },
  };
}

export interface JsonLdCrumb {
  label: string;
  /** Omit on the current page (the last crumb). */
  href?: string;
}

/** BreadcrumbList for a trail such as Home › Product › Calendar. Breadcrumb in the system renders this itself. */
export function breadcrumbJsonLd(crumbs: JsonLdCrumb[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: absoluteUrl(c.href) } : {}),
    })),
  };
}

/** Article for a blog post. Dates are ISO (2026-09-12); the author is a real, named person or omitted. */
export function articleJsonLd({
  title,
  description,
  path,
  datePublished,
  dateModified,
  author,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: absoluteUrl(path),
    datePublished,
    dateModified: dateModified ?? datePublished,
    ...(author ? { author: { "@type": "Person", name: author } } : {}),
    publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: absoluteUrl("/icon.svg") } },
  };
}

/** FAQPage for the questions a page renders. Only pass questions that are visible on the page. */
export function faqJsonLd(items: { q: string; a: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
