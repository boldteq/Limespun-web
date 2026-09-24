import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Container,
  Eyebrow,
  InkBand,
  PageIntro,
  Prose,
  RelatedGrid,
  TOC,
  Title,
  type Crumb,
  type RelatedItem,
  type TocItem,
} from "@/components/system";
import type { InkBandProps } from "./content-page";
import { PageShell } from "./page-shell";

export interface ArticleMeta {
  /** Display date, e.g. "September 12, 2026". */
  date: string;
  /** Machine date for <time>, e.g. "2026-09-12". */
  dateTime: string;
  readTime?: string;
  author?: string;
}

/**
 * Blog post shell: breadcrumb, category, serif title, dek and a meta line; then the post at
 * ~65ch with a sticky "On this page" from lg; then one product link, three related posts and
 * the closing band. Posts pass their Article JSON-LD (seo.ts articleJsonLd) in `jsonLd`.
 */
export function ArticlePage({
  crumbs,
  category,
  title,
  italicWord,
  dek,
  meta,
  toc,
  feature,
  related,
  inkBand,
  jsonLd,
  children,
}: {
  crumbs: Crumb[];
  category?: string;
  title: string;
  italicWord?: string;
  dek: React.ReactNode;
  meta: ArticleMeta;
  toc?: TocItem[];
  /** The one screen in the app this post is about. */
  feature?: { eyebrow?: string; title: string; body: string; href: string };
  related?: RelatedItem[];
  inkBand?: InkBandProps | null;
  jsonLd?: Record<string, unknown>[];
  children: React.ReactNode;
}) {
  const hasToc = Boolean(toc && toc.length > 0);
  return (
    <PageShell jsonLd={jsonLd}>
      <PageIntro crumbs={crumbs} eyebrow={category} title={title} italicWord={italicWord} lead={dek}>
        <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-mute">
          {meta.author && (
            <>
              <span className="font-medium text-graphite">{meta.author}</span>
              <span aria-hidden="true">·</span>
            </>
          )}
          <time dateTime={meta.dateTime}>{meta.date}</time>
          {meta.readTime && (
            <>
              <span aria-hidden="true">·</span>
              <span>{meta.readTime}</span>
            </>
          )}
        </p>
      </PageIntro>

      <article className="border-t border-hair bg-white py-section-y-tight">
        <Container className={hasToc ? "grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16" : undefined}>
          {hasToc && toc && <TOC items={toc} />}
          <div className="min-w-0">
            <Prose className="max-w-[65ch]">{children}</Prose>

            {feature && (
              <Link
                href={feature.href}
                className="group mt-14 flex max-w-[65ch] items-center justify-between gap-6 rounded-card bg-canvas-deep p-6 ring-1 ring-hair transition-shadow duration-200 hover:shadow-[var(--shadow-lift)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite sm:p-7"
              >
                <span className="min-w-0">
                  <Eyebrow>{feature.eyebrow ?? "In Limespun"}</Eyebrow>
                  <Title as="p" size="sm" className="mt-2">
                    {feature.title}
                  </Title>
                  <span className="mt-1 block text-[15px] leading-[1.55] text-pretty text-mute">{feature.body}</span>
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-graphite ring-1 ring-hair transition-colors duration-200 group-hover:bg-graphite group-hover:text-white">
                  <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
                </span>
              </Link>
            )}
          </div>
        </Container>
      </article>

      {related && related.length > 0 && <RelatedGrid heading="Keep reading" items={related} />}
      {inkBand !== null && <InkBand {...inkBand} />}
    </PageShell>
  );
}
