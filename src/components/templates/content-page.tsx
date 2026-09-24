import React from "react";
import {
  Container,
  InkBand,
  PageIntro,
  Prose,
  RelatedGrid,
  TOC,
  cn,
  type Crumb,
  type RelatedItem,
  type TocItem,
} from "@/components/system";
import { PageShell } from "./page-shell";

export type InkBandProps = React.ComponentProps<typeof InkBand>;

/**
 * Long-form page (legal, security, REACH notes, policies): PageIntro, then the text at a
 * 68ch measure with an optional "On this page" list beside it from lg, then the closing band.
 * Children are plain HTML (h2 with ids matching `toc`, p, ul, table); Prose styles them.
 */
export function ContentPage({
  crumbs,
  eyebrow,
  title,
  italicWord,
  lead,
  meta,
  toc,
  aside,
  related,
  inkBand,
  jsonLd,
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: React.ReactNode;
  title: string;
  italicWord?: string;
  lead: React.ReactNode;
  /** One quiet line under the lead, e.g. "Effective September 1, 2026". */
  meta?: React.ReactNode;
  toc?: TocItem[];
  /** A card after the text (contact, mailbox, download). */
  aside?: React.ReactNode;
  related?: { heading?: string; items: RelatedItem[] };
  /** Closing band copy; null leaves the band off (rare: only pages that end in a form). */
  inkBand?: InkBandProps | null;
  jsonLd?: Record<string, unknown>[];
  children: React.ReactNode;
}) {
  const hasToc = Boolean(toc && toc.length > 0);
  return (
    <PageShell jsonLd={jsonLd}>
      <PageIntro crumbs={crumbs} eyebrow={eyebrow} title={title} italicWord={italicWord} lead={lead}>
        {meta && <p className="mt-5 text-[14px] text-mute">{meta}</p>}
      </PageIntro>

      <section className="border-t border-hair bg-white py-section-y-tight">
        <Container className={cn(hasToc && "grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16")}>
          {hasToc && toc && <TOC items={toc} />}
          <div className="min-w-0">
            <Prose className="max-w-[68ch]">{children}</Prose>
            {aside && <div className="mt-12 max-w-[68ch]">{aside}</div>}
          </div>
        </Container>
      </section>

      {related && related.items.length > 0 && <RelatedGrid heading={related.heading} items={related.items} />}
      {inkBand !== null && <InkBand {...inkBand} />}
    </PageShell>
  );
}
