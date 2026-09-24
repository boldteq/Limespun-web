import React from "react";
import {
  Container,
  FAQ,
  FeatureRow,
  InkBand,
  PageIntro,
  PlanChip,
  Reveal,
  Section,
  StripedFrame,
  cn,
  type ChipTone,
  type RelatedItem,
} from "@/components/system";
import { ACCOUNT } from "@/lib/brand";
import { featureHref, getFeature, type Feature } from "@/lib/data/features";
import { PLANS, formatPrice } from "@/lib/data/plans";
import { getSegment, segmentHref } from "@/lib/data/segments";
import { TOOLS_INDEX } from "@/lib/site-links";
import { PageShell } from "./page-shell";
import {
  MiniGrid,
  PlanLadder,
  ProductStage,
  RelatedLinks,
  SectionHeader,
  SwitchingBand,
  WorksWith,
  type MomentVisual,
  type PlanRow,
} from "./parts";

export interface FeatureVisuals {
  /** The feature's home screen, full width in the striped frame. */
  hero: React.ReactNode;
  /**
   * Phones only: show the top of a tall hero screen and fade it out into the frame's foot,
   * so a long list costs one screen of scroll and no row is cut mid-line. Leave off for
   * phone mockups.
   */
  heroCrop?: boolean;
  /** One per moment, in order. Pass { before, after } for a state change. */
  moments: [MomentVisual, MomentVisual, MomentVisual];
  /**
   * The app label each of the six details lives behind (a button, tab or status as the
   * app prints it), shown as a chip over the detail. Same order as feature.miniFeatures.
   */
  detailLabels?: { label: string; tone?: ChipTone }[];
}

/** Section headings a page may set; the defaults are plain and safe for any feature. */
export interface FeatureHeadings {
  moments?: string;
  momentsLead?: string;
  details?: string;
  worksWith?: string;
  worksWithLead?: string;
}

/**
 * One row of four link cards: the related features not already linked under "Works with",
 * the page's free tool in place of the last of those, then the two segments. The comparisons
 * sit in the switching band instead, so the grid never leaves an orphan card.
 */
export function featureRelated(feature: Feature): RelatedItem[] {
  const neighbours = new Set<string>(feature.worksWith.map((w) => w.slug));
  const features: RelatedItem[] = feature.related
    .filter((slug) => !neighbours.has(slug))
    .map((slug) => {
      const r = getFeature(slug);
      return { eyebrow: "Feature", title: r.name, body: r.card, href: featureHref(slug) };
    });
  const tool = feature.tool ? TOOLS_INDEX.find((t) => t.slug === feature.tool) : undefined;
  if (tool) features.splice(Math.max(features.length - 1, 0), 1, { eyebrow: "Free tool", title: tool.name, body: tool.blurb, href: `/tools/${tool.slug}` });
  const segments: RelatedItem[] = feature.segments.map((slug) => {
    const s = getSegment(slug);
    return { eyebrow: "Who it's for", title: s.name, body: s.card, href: segmentHref(slug) };
  });
  return [...features.slice(0, 2), ...segments, ...features.slice(2)].slice(0, 4);
}

/** Comparisons named in the switching band: the two tools studios most often leave, then all of them. */
const FEATURE_COMPARE = [
  { label: "Vagaro", href: "/compare/vagaro" },
  { label: "Fresha", href: "/compare/fresha" },
  { label: "every comparison", href: "/compare" },
];

/**
 * Feature template: the screen → three moments → six details → the two features it feeds →
 * switching → what each plan gets → questions → related → closing band.
 * Copy comes from src/lib/data/features.ts; the page passes the screens.
 */
export function FeaturePage({
  feature,
  visuals,
  headings,
  planRows,
  inkBand,
  jsonLd,
}: {
  feature: Feature;
  visuals: FeatureVisuals;
  headings?: FeatureHeadings;
  /** What the feature adds on each plan, from the app's feature gate. Defaults to the feature on its first plan. */
  planRows?: PlanRow[];
  /** Closing band: a feature-specific headline with one italic word. */
  inkBand?: { headline: string; italicWord?: string; sub?: string };
  jsonLd?: Record<string, unknown>[];
}) {
  const f = feature;
  const plan = PLANS.find((p) => p.tier === f.plan.min) ?? PLANS[0];
  const price = formatPrice(plan.monthlyCents);
  const [a, b] = f.worksWith.map((w) => ({ ...w, feature: getFeature(w.slug) }));

  return (
    <PageShell jsonLd={jsonLd}>
      <PageIntro
        crumbs={[{ label: "Home", href: "/" }, { label: "Product", href: "/product" }, { label: f.name }]}
        eyebrow={<PlanChip plan={f.plan.min} andUp price />}
        title={f.h1}
        italicWord={f.italicWord}
        lead={f.sub}
        primary={{ label: ACCOUNT.signUpLabel, href: ACCOUNT.signUpHref }}
        secondary={{ label: "See pricing", href: "/pricing" }}
        visual={
          <StripedFrame inset="md" className={cn("max-sm:px-2.5 max-sm:py-6", visuals.heroCrop && "max-sm:pb-0")}>
            <div
              className={cn(
                "mx-auto max-w-[1040px]",
                visuals.heroCrop &&
                  "max-sm:max-h-[400px] max-sm:overflow-hidden max-sm:[mask-image:linear-gradient(to_bottom,#000_calc(100%-120px),transparent_calc(100%-8px))]",
              )}
            >
              {visuals.hero}
            </div>
          </StripedFrame>
        }
      />

      <Section tone="white" labelledBy="moments-heading">
        <Container>
          <SectionHeader
            id="moments-heading"
            title={headings?.moments ?? `${f.name}, in use`}
            lead={headings?.momentsLead}
          />
          {/* Phones: the three moments sit side by side and swipe (the next one peeks in), which keeps
              the page inside its mobile height budget. From sm they stack as alternating rows. */}
          <div
            role="region"
            aria-label={`${f.name} in three moments`}
            tabIndex={0}
            className="mt-block-gap -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-1 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite sm:mx-0 sm:snap-none sm:flex-col sm:gap-16 sm:overflow-visible sm:px-0 sm:pb-0 lg:gap-24 [&::-webkit-scrollbar]:hidden"
          >
            {f.moments.map((m, i) => (
              <div key={m.title} className="w-[calc(100%-2.25rem)] shrink-0 snap-start sm:w-auto">
                <FeatureRow
                  title={m.title}
                  body={m.body}
                  flip={i % 2 === 1}
                  className={cn(
                    // The screen gets the wider share (app frames carry a sidebar); flipped rows mirror it.
                    "gap-6 sm:gap-10 lg:gap-12 xl:gap-16",
                    i % 2 === 1
                      ? "lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]"
                      : "lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]",
                  )}
                  visual={<ProductStage visual={visuals.moments[i]} />}
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="canvas" labelledBy="details-heading">
        <Container>
          <SectionHeader id="details-heading" title={headings?.details ?? `More in ${f.name}`} />
          <Reveal className="mt-block-gap">
            <MiniGrid
              label={`More in ${f.name}`}
              items={f.miniFeatures.map((m, i) => ({
                ...m,
                label: visuals.detailLabels?.[i]?.label,
                tone: visuals.detailLabels?.[i]?.tone,
              }))}
            />
          </Reveal>
        </Container>
      </Section>

      <WorksWith
        current={f.name}
        title={headings?.worksWith ?? `Works with ${a.feature.name} and ${b.feature.name}`}
        lead={headings?.worksWithLead ?? "They read the same bookings and client records, so nothing is typed twice."}
        items={[
          { name: a.feature.name, href: featureHref(a.slug), body: a.line },
          { name: b.feature.name, href: featureHref(b.slug), body: b.line },
        ]}
      />

      <SwitchingBand compare={FEATURE_COMPARE} />

      <PlanLadder
        title={f.plan.min === "solo" ? `On every plan, from ${price} a month` : `From ${plan.name}, ${price} a month`}
        lead={f.plan.note}
        rows={planRows ?? [{ label: f.name, from: f.plan.min }]}
        start={f.plan.min}
      />

      <FAQ items={f.faqs} title={`${f.name} questions`} tone="white" />

      <RelatedLinks heading="Related" items={featureRelated(f)} />

      <InkBand {...(inkBand ?? {})} />
    </PageShell>
  );
}
