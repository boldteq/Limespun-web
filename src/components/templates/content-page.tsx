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
  type PageIntroProps,
  type RelatedItem,
  type TocItem,
} from "@/components/system";
import { PageShell } from "./page-shell";

export type InkBandProps = React.ComponentProps<typeof InkBand>;

/** The reading frame shared with LegalPage: title and text sit in one centred 1040px column. */
export const READING_FRAME = "max-w-[1040px]";

export interface ContentPageProps {
  crumbs: Crumb[];
  /** A string renders as the dotted eyebrow; pass a node for anything else (a PlanChip, a date). */
  eyebrow?: React.ReactNode;
  title: string;
  /** One word of the H1 in the ember italic (the only italic word on the page besides the band). */
  italicWord?: string;
  lead: React.ReactNode;
  /** A quiet line under the lead, e.g. "Effective September 1, 2026" or "Updated weekly". */
  meta?: React.ReactNode;
  /** CTA pair under the lead. Most content pages leave these off; the closing band carries the ask. */
  primary?: PageIntroProps["primary"];
  secondary?: PageIntroProps["secondary"];
  /** A screen or figure under the intro (full frame width). */
  visual?: React.ReactNode;
  /**
   * "prose" (default): children are long-form HTML (h2 with ids matching `toc`, p, ul, table,
   * figure, <Callout>), set at a 68ch measure in the 1040px reading frame with an optional
   * "On this page" list beside it from lg.
   * "sections": children are the page's own <Section>s (about, press, careers, contact,
   * changelog, roadmap); the shell adds only the intro, the related mesh and the band.
   */
  layout?: "prose" | "sections";
  /** "On this page" (prose layout). Sticky beside the text from lg, a disclosure above it below. */
  toc?: TocItem[];
  /** A card after the text (contact, mailbox, download). Prose layout. */
  aside?: React.ReactNode;
  /** Surface of the text band (prose layout). The intro is canvas; white sets the text apart. */
  tone?: "white" | "canvas";
  related?: { heading?: string; items: RelatedItem[] };
  /** Closing band copy; null leaves the band off (rare: only pages that end in a form). */
  inkBand?: InkBandProps | null;
  jsonLd?: Record<string, unknown>[];
  children: React.ReactNode;
}

/**
 * Content page shell (about, press, careers, contact, changelog, roadmap, REACH, policies):
 * PageIntro with the breadcrumb (it emits the BreadcrumbList) → the body → RelatedGrid
 * mesh → InkBand. The body is either long-form text (`layout="prose"`) or the page's own
 * sections (`layout="sections"`).
 */
export function ContentPage({
  crumbs,
  eyebrow,
  title,
  italicWord,
  lead,
  meta,
  primary,
  secondary,
  visual,
  layout = "prose",
  toc,
  aside,
  tone = "white",
  related,
  inkBand,
  jsonLd,
  children,
}: ContentPageProps) {
  const prose = layout === "prose";
  const hasToc = prose && Boolean(toc && toc.length > 0);

  const intro = (
    <PageIntro
      crumbs={crumbs}
      eyebrow={eyebrow}
      title={title}
      italicWord={italicWord}
      lead={lead}
      primary={primary}
      secondary={secondary}
      visual={visual}
    >
      {meta && <div className="mt-5 text-[14px] leading-[1.5] text-mute">{meta}</div>}
    </PageIntro>
  );

  return (
    <PageShell jsonLd={jsonLd}>
      {/* PageIntro sets its own 1280 container; the frame keeps the title over the text column */}
      {prose ? <div className={cn("mx-auto", READING_FRAME)}>{intro}</div> : intro}

      {prose ? (
        <section
          aria-label={title}
          className={cn(
            "border-t border-hair py-section-y-tight",
            tone === "white" ? "bg-white" : "bg-canvas",
          )}
        >
          <Container className={cn(READING_FRAME, hasToc && "grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16")}>
            {hasToc && toc && <TOC items={toc} />}
            {/* 68ch at the prose size (17px), so the aside card lines up with the text's edge */}
            <div className="min-w-0 max-w-[68ch] text-[17px]">
              <Prose>{children}</Prose>
              {aside && <div className="mt-12 text-[16px] sm:mt-14">{aside}</div>}
            </div>
          </Container>
        </section>
      ) : (
        children
      )}

      {related && related.items.length > 0 && (
        <RelatedGrid
          heading={related.heading}
          items={related.items}
          tone={prose && tone === "canvas" ? "white" : "canvas"}
          containerClassName={prose ? READING_FRAME : undefined}
        />
      )}
      {inkBand !== null && <InkBand {...inkBand} />}
    </PageShell>
  );
}
