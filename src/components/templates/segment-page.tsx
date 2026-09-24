import React from "react";
import { Check } from "lucide-react";
import {
  Button,
  Container,
  Display,
  Eyebrow,
  FAQ,
  InkBand,
  Lead,
  PageIntro,
  PlanChip,
  Reveal,
  Section,
  StripedFrame,
  Title,
  cn,
  type RelatedItem,
} from "@/components/system";
import { ACCOUNT } from "@/lib/brand";
import { featureHref, getFeature } from "@/lib/data/features";
import {
  ALWAYS_INCLUDED,
  ANNUAL_DISCOUNT_PERCENT,
  MONEY_BACK_DAYS,
  PLAN_CAPS,
  PLANS,
  formatPrice,
  type PlanTier,
} from "@/lib/data/plans";
import { SEGMENTS, segmentHref, type Segment } from "@/lib/data/segments";
import { COMPARE_INDEX } from "@/lib/site-links";
import { PageShell } from "./page-shell";
import { BeforeAfterStage, RelatedLinks, SectionHeader, SwitchingBand, type BeforeAfterVisual } from "./parts";

export interface SegmentVisuals {
  /** The screen this studio buys for (segment.heroScreen), in the striped frame. */
  hero: React.ReactNode;
  /**
   * Phones only: cut the hero this many px below its top and let it run off the frame's
   * foot. Phone mockups are the same size at every width, so pick a height that lands in
   * empty space on the screen and no line of text is cut.
   */
  heroCropAt?: number;
  /** One per job in "Your week", same order as segment.jobs. */
  week: [React.ReactNode, React.ReactNode, React.ReactNode];
}

/** The before/after band: one screen twice with different props, and the copy that names the change. */
export interface SegmentBeforeAfter {
  title: string;
  italicWord?: string;
  lead: string;
  visual: BeforeAfterVisual;
}

/** Overrides for section headings; the defaults come from the segment's data. */
export interface SegmentHeadings {
  week?: string;
  weekItalicWord?: string;
  weekLead?: string;
  faq?: string;
}

const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

/** "a, b, and c" (US serial comma, so "commission and booth-rent splits" stays one item) */
function joinAnd(items: string[]): string {
  if (items.length < 3) return items.join(" and ");
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

/** The three job features, then the neighbouring segment (the next plan up, or the one below for the top plan). */
export function segmentRelated(segment: Segment): RelatedItem[] {
  const jobs: RelatedItem[] = segment.jobs.map((j) => {
    const f = getFeature(j.feature);
    return { eyebrow: "Feature", title: f.name, body: f.card, href: featureHref(j.feature) };
  });
  const at = SEGMENTS.findIndex((s) => s.slug === segment.slug);
  const neighbour = SEGMENTS[at + 1] ?? SEGMENTS[at - 1];
  return neighbour
    ? [...jobs, { eyebrow: "Who it's for", title: neighbour.name, body: neighbour.card, href: segmentHref(neighbour.slug) }]
    : jobs;
}

/** The one plan a segment buys: price, what it adds over the plan below, the caps, then the button. */
function PlanCard({ tier }: { tier: PlanTier }) {
  const at = Math.max(
    PLANS.findIndex((p) => p.tier === tier),
    0,
  );
  const plan = PLANS[at];
  const lower = at > 0 ? PLANS[at - 1] : null;
  return (
    <article className="flex flex-col rounded-card bg-white p-6 shadow-[var(--shadow-warm)] ring-2 ring-ember sm:p-8">
      {/* No fit line under the name: the section heading beside the card already says it */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 pt-1">
          <Title as="h3" size="md">
            {plan.name}
          </Title>
          <p className="mt-1 text-[13px] text-mute tabular-nums">
            {formatPrice(Math.round(plan.annualCents / 12))}/mo billed{"\u00a0"}yearly
          </p>
        </div>
        <p className="shrink-0 text-right">
          <span className="block text-[40px] leading-none font-semibold tracking-[-0.03em] text-graphite tabular-nums">
            {formatPrice(plan.monthlyCents)}
          </span>
          <span className="mt-1 block text-[13px] text-mute">a month</span>
        </p>
      </div>

      <p className="mt-6 text-[13px] font-semibold text-graphite">
        {lower ? `Everything in ${lower.name}, plus` : plan.listIntro}
      </p>
      <ul className="mt-3 flex flex-col gap-2.5">
        {plan.lines.map((l) => (
          <li key={l} className="flex gap-2.5 text-[15px] leading-snug text-graphite-soft">
            <Check size={16} strokeWidth={2.6} className="mt-0.5 shrink-0 text-ember" aria-hidden="true" />
            {l}
          </li>
        ))}
      </ul>
      {!lower && (
        <p className="mt-4 text-[14px] leading-[1.55] text-pretty text-mute">
          And what every plan has: {joinAnd(ALWAYS_INCLUDED.map(lowerFirst))}.
        </p>
      )}

      <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-field bg-hair ring-1 ring-hair">
        {PLAN_CAPS.map((c) => (
          <div key={c.label} className="flex flex-col-reverse gap-0.5 bg-canvas px-4 py-3">
            <dt className="text-[13px] text-mute">{c.label}</dt>
            <dd className="text-[17px] font-semibold text-graphite tabular-nums">{c.values[tier]}</dd>
          </div>
        ))}
      </dl>

      <Button href={`${ACCOUNT.signUpHref}?plan=${tier}&billing=monthly`} arrow className="mt-7 w-full">
        Choose {plan.name}
      </Button>
      <p className="mt-3 text-center text-[13px] text-balance text-mute">{MONEY_BACK_DAYS}-day money-back guarantee. No free trial.</p>
    </article>
  );
}

/**
 * Segment template: the screen this studio buys for → their week in three jobs → the one
 * plan → one screen before and after → the kinds of shop it suits → switching with two
 * comparisons → questions → related → closing band. Copy comes from src/lib/data/segments.ts;
 * the page passes the screens and the before/after copy.
 */
export function SegmentPage({
  segment,
  visuals,
  beforeAfter,
  headings,
  inkBand,
  jsonLd,
}: {
  segment: Segment;
  visuals: SegmentVisuals;
  beforeAfter: SegmentBeforeAfter;
  headings?: SegmentHeadings;
  /** Closing band: a segment-specific headline with one italic word. */
  inkBand?: { headline: string; italicWord?: string; sub?: string };
  jsonLd?: Record<string, unknown>[];
}) {
  const s = segment;
  const at = Math.max(
    PLANS.findIndex((p) => p.tier === s.plan),
    0,
  );
  const plan = PLANS[at];
  const compare = s.compare.map((slug) => ({
    label: COMPARE_INDEX.find((c) => c.slug === slug)?.name ?? slug,
    href: `/compare/${slug}`,
  }));

  return (
    <PageShell jsonLd={jsonLd}>
      <PageIntro
        crumbs={[{ label: "Home", href: "/" }, { label: s.name }]}
        eyebrow={
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Eyebrow>{s.eyebrow}</Eyebrow>
            <PlanChip plan={s.plan} price />
          </div>
        }
        title={s.h1}
        italicWord={s.italicWord}
        lead={s.sub}
        primary={{ label: ACCOUNT.signUpLabel, href: ACCOUNT.signUpHref }}
        secondary={{ label: "See pricing", href: "/pricing" }}
        visual={
          <StripedFrame inset="md" className={visuals.heroCropAt ? "max-sm:pb-0" : undefined}>
            <div
              className={visuals.heroCropAt ? "max-sm:max-h-(--hero-crop) max-sm:overflow-hidden" : undefined}
              style={visuals.heroCropAt ? ({ "--hero-crop": `${visuals.heroCropAt}px` } as React.CSSProperties) : undefined}
            >
              {visuals.hero}
            </div>
          </StripedFrame>
        }
      />

      <Section tone="white" labelledBy="week-heading">
        <Container>
          <SectionHeader
            id="week-heading"
            title={headings?.week ?? s.week.title}
            italicWord={headings?.week ? headings.weekItalicWord : s.week.italicWord}
            lead={headings?.weekLead ?? s.week.lead}
          />
          {/* Three jobs, not a sequence, so no numerals. Phones swipe (the next one peeks in);
              from sm each job is a row, screen beside its copy, like the feature template's
              moments; at lg they sit three across. */}
          <div
            role="region"
            aria-label="Three jobs in your week"
            className="mt-block-gap -mx-5 snap-x snap-mandatory scroll-px-5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:snap-none sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            {/* The trailing spacer keeps the phone gutter after the last card when swiped to the end */}
            <ul className="flex gap-4 max-sm:after:block max-sm:after:w-1 max-sm:after:shrink-0 max-sm:after:content-[''] sm:flex-col sm:gap-12 lg:grid lg:grid-cols-3 lg:gap-8">
              {s.jobs.map((j, n) => (
                <li
                  key={j.title}
                  className={cn(
                    "flex w-[calc(100vw-4.75rem)] max-w-[360px] shrink-0 snap-start flex-col sm:grid sm:w-auto sm:max-w-none sm:items-center sm:gap-10 lg:flex lg:items-stretch lg:gap-0",
                    // Tablet rows zigzag: the middle job puts its screen on the right
                    n === 1 ? "sm:grid-cols-[minmax(0,1fr)_300px]" : "sm:grid-cols-[300px_minmax(0,1fr)]",
                  )}
                >
                  <div
                    className={cn(
                      "@container flex min-h-[300px] min-w-0 items-center justify-center rounded-tile bg-canvas-deep p-3 sm:p-5",
                      n === 1 && "sm:order-last lg:order-none",
                    )}
                  >
                    {visuals.week[n]}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Title as="h3" size="sm" className="mt-6 sm:mt-0 lg:mt-6">
                      {j.title}
                    </Title>
                    <p className="mt-2 max-w-[440px] text-[16px] leading-[1.6] text-pretty text-mute">{j.body}</p>
                    {/* Pinned to the card's foot at lg so the three links line up whatever the body length */}
                    <div className="mt-auto pt-4">
                      <Button href={featureHref(j.feature)} variant="ghost" arrow>
                        {getFeature(j.feature).name}
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tone="canvas" labelledBy="plan-heading">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:items-center lg:gap-20">
          <div>
            <Eyebrow>The plan</Eyebrow>
            <Display id="plan-heading" className="mt-4 max-w-[560px]">
              {`${plan.fit}.`}
            </Display>
            {/* The card carries the price; the copy says where this plan ends and what it never charges */}
            <Lead className="mt-5 max-w-[560px] text-mute">
              {`${s.outgrow ? `${s.outgrow} ` : ""}Change plans any time; annual billing takes ${ANNUAL_DISCOUNT_PERCENT}% off.`}
            </Lead>
            <p className="mt-6 max-w-[560px] border-t border-hair-strong pt-5 text-[15px] leading-[1.6] text-pretty text-graphite-soft sm:mt-8 sm:pt-6 sm:text-[16px]">
              No Limespun fee on bookings or deposits; card payments carry the provider’s standard fee.
            </p>
          </div>
          <Reveal>
            <PlanCard tier={s.plan} />
          </Reveal>
        </Container>
      </Section>

      <Section tone="white" labelledBy="change-heading">
        <Container>
          <div className="grid gap-9 sm:gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16 xl:gap-20">
            <div>
              <Display id="change-heading" italicWord={beforeAfter.italicWord} className="max-w-[560px]">
                {beforeAfter.title}
              </Display>
              <Lead className="mt-5 max-w-[520px] text-mute">{beforeAfter.lead}</Lead>
            </div>
            <BeforeAfterStage visual={beforeAfter.visual} />
          </div>

          {/* The kinds of shop this page speaks to */}
          <div className="mt-10 flex flex-col gap-3.5 border-t border-hair-strong pt-6 sm:mt-16 sm:gap-4 sm:pt-7 lg:flex-row lg:items-center lg:gap-10">
            <Title as="h3" size="sm" className="shrink-0">
              {s.subSegmentsHeading}
            </Title>
            <ul className="flex flex-wrap gap-2">
              {s.subSegments.map((c) => (
                <li key={c} className="rounded-full bg-canvas px-3 py-1 text-[14px] text-graphite-soft ring-1 ring-hair sm:px-3.5 sm:py-1.5 sm:text-[15px]">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <SwitchingBand compare={compare} />

      <FAQ items={s.faqs} title={headings?.faq ?? "Questions studio owners ask"} tone="white" />

      <RelatedLinks heading="Related" items={segmentRelated(s)} />

      <InkBand {...(inkBand ?? {})} />
    </PageShell>
  );
}
