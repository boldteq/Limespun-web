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
import { SEGMENTS, segmentHref, type Segment, type SegmentJob, type SegmentSlug } from "@/lib/data/segments";
import { COMPARE_INDEX } from "@/lib/site-links";
import { PageShell } from "./page-shell";
import {
  BeforeAfterStage,
  RelatedLinks,
  SectionHeader,
  SwitchingBand,
  type BeforeAfterVisual,
  type SwitchingCopy,
  type TemplateInkBand,
} from "./parts";

export interface SegmentVisuals {
  /** The screen this studio buys for (segment.heroScreen), in the striped frame. */
  hero: React.ReactNode;
  /**
   * Phones only: cut the hero this many px below its top and let it run off the frame's
   * foot. Phone mockups are the same size at every width, so pick a height that lands in
   * empty space on the screen and no line of text is cut.
   */
  heroCropAt?: number;
  /** One per job in "Your week", same order as segment.jobs. A job without a screen is left out. */
  week: React.ReactNode[];
}

/** The before/after band: one screen twice with different props, and the copy that names the change. */
export interface SegmentBeforeAfter {
  title: string;
  /** @deprecated Section headings never carry the ember italic (only the H1 and InkBand). Ignored. */
  italicWord?: string;
  lead: string;
  visual: BeforeAfterVisual;
}

/** Overrides for section headings; the defaults come from the segment's data. */
export interface SegmentHeadings {
  week?: string;
  /** @deprecated Ignored: section headings never carry the ember italic. */
  weekItalicWord?: string;
  weekLead?: string;
  faq?: string;
}

/**
 * The switching band, per segment: the tools this studio is most likely leaving (its two
 * comparisons first) and what matters to it in the move. Facts only from the /migrate story:
 * our team moves clients, bookings, deposits and signed forms on every plan, and the old
 * tool runs alongside until the counts match. A page can override with `switching`.
 */
const SEGMENT_SWITCHING: Record<SegmentSlug, SwitchingCopy> = {
  "solo-artists": {
    title: "Your book comes across while you keep tattooing",
    line: "Coming from Square, GlossGenius or a paper book? We move your clients, bookings, deposits and signed forms on Solo too, and the old tool runs alongside until you switch.",
    sources: ["Square", "GlossGenius", "Vagaro", "Fresha", "Spreadsheets", "Paper book"],
  },
  "small-studios": {
    title: "Every chair’s bookings come across",
    line: "Coming from Vagaro, Fresha or a shared spreadsheet? Our team moves each artist’s upcoming bookings onto their own column, with the clients, deposits and signed forms behind them.",
    moves: ["Each artist’s bookings", "Clients and their notes", "Deposits you hold", "Signed consent forms"],
    sources: ["Vagaro", "Fresha", "Square", "DaySmart", "Spreadsheets", "Paper book"],
  },
  "multi-chair": {
    title: "The whole shop’s book comes across, artist by artist",
    line: "Coming from TattooGenda or DaySmart? Upcoming bookings land on the right artist’s calendar at the same time, with the deposits held against them, and the old tool runs alongside until the counts match.",
    moves: ["Every artist’s bookings", "Deposits you hold", "Clients and their notes", "Signed consent forms"],
    sources: ["TattooGenda", "DaySmart", "Vagaro", "Fresha", "Square", "Spreadsheets"],
  },
  "multi-location": {
    title: "Every shop’s book comes across",
    line: "Coming from Vagaro or Mangomint? Our team moves the clients, bookings, deposits and signed forms from every location, and the old tool runs alongside until the counts match.",
    sources: ["Vagaro", "Mangomint", "Fresha", "DaySmart", "Square", "Spreadsheets"],
  },
};

/* Jobs per row at lg: three across, two across for two or four (phone mockups need ~250px). */
const JOB_COLS: Record<number, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-2",
};

const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

/** "a, b, and c" (US serial comma, so "commission and booth-rent splits" stays one item) */
function joinAnd(items: string[]): string {
  if (items.length < 3) return items.join(" and ");
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

/** The three job features, then the neighbouring segment (the next plan up, or the one below for the top plan). */
export function segmentRelated(segment: Pick<Segment, "slug"> & { jobs: readonly SegmentJob[] }): RelatedItem[] {
  const slugs = [...new Set(segment.jobs.map((j) => j.feature))];
  const jobs: RelatedItem[] = slugs.map((slug) => {
    const f = getFeature(slug);
    return { eyebrow: "Feature", title: f.name, body: f.card, href: featureHref(slug) };
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
  /* "Multi-Location" doesn't fit beside its price (or in the button) on 320 phones */
  const long = plan.name.length > 10;
  return (
    <article className="flex flex-col rounded-card bg-white p-5 shadow-[var(--shadow-warm)] ring-2 ring-ember sm:p-8">
      {/* No fit line under the name: the section heading beside the card already says it.
          A long name ("Multi-Location") keeps one line; on the narrowest phones the price
          goes under it, on one line with "a month", instead of splitting the name at its hyphen. */}
      <div className={cn("flex items-start justify-between gap-4", long && "max-[359px]:flex-col max-[359px]:gap-3")}>
        <div className="min-w-0 pt-1">
          <Title as="h3" size="md" className="whitespace-nowrap">
            {plan.name}
          </Title>
          <p className="mt-1 text-[13px] text-mute tabular-nums">
            {formatPrice(Math.round(plan.annualCents / 12))}/mo billed{"\u00a0"}yearly
          </p>
        </div>
        <p
          className={cn(
            "shrink-0 text-right",
            long && "max-[359px]:flex max-[359px]:items-baseline max-[359px]:gap-2 max-[359px]:text-left",
          )}
        >
          <span className="block text-[40px] leading-none font-semibold tracking-[-0.03em] text-graphite tabular-nums">
            {formatPrice(plan.monthlyCents)}
          </span>
          <span className={cn("mt-1 block text-[13px] text-mute", long && "max-[359px]:mt-0")}>a month</span>
        </p>
      </div>

      <p className="mt-5 text-[13px] font-semibold text-graphite sm:mt-6">
        {lower ? `Everything in ${lower.name}, plus` : plan.listIntro}
      </p>
      <ul className="mt-3 flex flex-col gap-2 sm:gap-2.5">
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

      {/* The caps as a 2×2 grid: value over label */}
      <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-field bg-hair ring-1 ring-hair sm:mt-6">
        {PLAN_CAPS.map((c) => (
          <div key={c.label} className="flex flex-col-reverse gap-0.5 bg-canvas px-3.5 py-2.5 sm:px-4 sm:py-3">
            <dt className="text-[13px] text-mute">{c.label}</dt>
            <dd className="text-[17px] font-semibold text-graphite tabular-nums">{c.values[tier]}</dd>
          </div>
        ))}
      </dl>

      {/* One line at every width: below 360px a long plan name ("Multi-Location") would wrap
          inside the pill, and the card above already names the plan */}
      <Button
        href={`${ACCOUNT.signUpHref}?plan=${tier}&billing=monthly`}
        arrow
        className="mt-6 w-full whitespace-nowrap sm:mt-7"
      >
        <span>
          Choose <span className={cn(long && "max-[359px]:hidden")}>{plan.name}</span>
          {long && <span className="min-[360px]:hidden">plan</span>}
        </span>
      </Button>
      <p className="mt-3 text-center text-[13px] text-balance text-mute">{MONEY_BACK_DAYS}-day money-back guarantee. No free trial.</p>
    </article>
  );
}

/**
 * Segment template: the screen this studio buys for → their week in three jobs → the one
 * plan, with the kinds of shop it suits → one screen before and after → switching with two
 * comparisons → questions → related → closing band. Copy comes from src/lib/data/segments.ts;
 * the page passes the screens and the before/after copy. Only the H1 and the closing band
 * carry an italic word.
 */
export function SegmentPage({
  segment,
  visuals,
  beforeAfter,
  headings,
  jobOverrides,
  inkBand,
  switching,
  jsonLd,
}: {
  segment: Segment;
  visuals: SegmentVisuals;
  beforeAfter: SegmentBeforeAfter;
  headings?: SegmentHeadings;
  /**
   * Per-job copy overrides, by index into segment.jobs (title, body or the linked feature),
   * for a page whose screens say it better than the data. Leave a slot undefined to keep it.
   */
  jobOverrides?: (Partial<SegmentJob> | undefined)[];
  /** Closing band: a segment-specific headline with one italic word, and an optional contextual second link. */
  inkBand?: TemplateInkBand;
  /** The switching band's copy; defaults to the segment's entry above. */
  switching?: SwitchingCopy;
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
  // Read the data's fixed-length tuples as plain lists so a shorter list still renders.
  const jobCopy: readonly SegmentJob[] = s.jobs.map((j, i) => ({ ...j, ...jobOverrides?.[i] }));
  const jobs = jobCopy.flatMap((j, i) => {
    const visual = visuals.week[i];
    return visual === null || visual === undefined || visual === false ? [] : [{ ...j, visual }];
  });
  const swipe = jobs.length > 1;
  const subSegments: readonly string[] = s.subSegments;

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

      {jobs.length > 0 && (
        <Section tone="white" labelledBy="week-heading">
          <Container>
            <SectionHeader
              id="week-heading"
              title={headings?.week ?? s.week.title}
              lead={headings?.weekLead ?? s.week.lead}
            />
            {/* Jobs, not a sequence, so no numerals. Phones swipe (the next one peeks in); from
                sm each job is a row, screen beside its copy, like the feature template's
                moments; at lg they sit three across. */}
            <div
              role={swipe ? "region" : undefined}
              aria-label={swipe ? "Jobs in your week" : undefined}
              className={cn(
                "mt-block-gap",
                swipe &&
                  "-mx-5 snap-x snap-mandatory scroll-px-5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:snap-none sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden",
              )}
            >
              {/* The trailing spacer keeps the phone gutter after the last card when swiped to the end */}
              <ul
                className={cn(
                  "flex gap-4 sm:flex-col sm:gap-12",
                  swipe && "max-sm:after:block max-sm:after:w-1 max-sm:after:shrink-0 max-sm:after:content-['']",
                  JOB_COLS[jobs.length] && ["lg:grid lg:gap-8", JOB_COLS[jobs.length]],
                )}
              >
                {jobs.map((j, n) => (
                  <li
                    key={j.title}
                    className={cn(
                      "flex shrink-0 snap-start flex-col sm:grid sm:w-auto sm:max-w-none sm:items-center sm:gap-10",
                      swipe ? "w-[calc(100vw-4.75rem)] max-w-[360px]" : "w-full",
                      JOB_COLS[jobs.length] && "lg:flex lg:items-stretch lg:gap-0",
                      // Tablet rows zigzag: the middle job puts its screen on the right
                      n % 2 === 1 ? "sm:grid-cols-[minmax(0,1fr)_300px]" : "sm:grid-cols-[300px_minmax(0,1fr)]",
                    )}
                  >
                    <div
                      className={cn(
                        "@container flex min-h-[300px] min-w-0 items-center justify-center rounded-tile bg-canvas-deep p-3 sm:p-5",
                        n % 2 === 1 && "sm:order-last lg:order-none",
                      )}
                    >
                      {j.visual}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <Title as="h3" size="sm" className="mt-5 sm:mt-0 lg:mt-6">
                        {j.title}
                      </Title>
                      <p className="mt-2 max-w-[440px] text-[16px] leading-[1.6] text-pretty text-mute">{j.body}</p>
                      {/* Pinned to the card's foot at lg so the links line up whatever the body length */}
                      <div className="mt-auto pt-3 sm:pt-4">
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
      )}

      <Section tone="canvas" labelledBy="plan-heading">
        <Container className="grid gap-8 sm:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:items-center lg:gap-20">
          <div>
            <Eyebrow>The plan</Eyebrow>
            <Display id="plan-heading" className="mt-4 max-w-[560px]">
              {`${plan.fit}.`}
            </Display>
            {/* The card carries the price; the copy says where this plan ends and what it never charges */}
            <Lead className="mt-4 max-w-[560px] text-mute sm:mt-5">
              {`${s.outgrow ? `${s.outgrow} ` : ""}Change plans any time; annual billing takes ${ANNUAL_DISCOUNT_PERCENT}% off.`}
            </Lead>
            <p className="mt-5 max-w-[560px] border-t border-hair-strong pt-4 text-[15px] leading-[1.6] text-pretty text-graphite-soft sm:mt-8 sm:pt-6 sm:text-[16px]">
              No Limespun fee on bookings or deposits; card payments carry the provider’s standard fee.
            </p>
            {/* The kinds of shop this page speaks to */}
            {subSegments.length > 0 && (
              <div className="mt-6 sm:mt-8">
                <Title as="h3" size="sm">
                  {s.subSegmentsHeading}
                </Title>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {subSegments.map((c) => (
                    <li
                      key={c}
                      className="rounded-full bg-white px-2.5 py-1 text-[13px] text-graphite-soft ring-1 ring-hair sm:px-3.5 sm:py-1.5 sm:text-[15px]"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* Tablets keep the card to a readable width under the copy; lg sets it beside it */}
          <Reveal className="max-w-[560px] lg:max-w-none">
            <PlanCard tier={s.plan} />
          </Reveal>
        </Container>
      </Section>

      <Section tone="white" labelledBy="change-heading">
        <Container className="grid gap-8 sm:gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16 xl:gap-20">
          <div>
            <Display id="change-heading" className="max-w-[560px]">
              {beforeAfter.title}
            </Display>
            <Lead className="mt-4 max-w-[520px] text-mute sm:mt-5">{beforeAfter.lead}</Lead>
          </div>
          <BeforeAfterStage visual={beforeAfter.visual} />
        </Container>
      </Section>

      <SwitchingBand compare={compare} {...(switching ?? SEGMENT_SWITCHING[s.slug])} />

      <FAQ items={s.faqs} title={headings?.faq ?? "Questions studio owners ask"} tone="white" compact />

      <RelatedLinks heading="Related" items={segmentRelated({ slug: s.slug, jobs: jobCopy })} />

      <InkBand {...(inkBand ?? {})} />
    </PageShell>
  );
}
