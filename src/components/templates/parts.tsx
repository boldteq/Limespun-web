import React from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import { LimespunMark } from "@/components/brand/limespun-mark";
import {
  Button,
  Chip,
  Container,
  Display,
  Eyebrow,
  Lead,
  PlanChip,
  Section,
  Title,
  cn,
  type ChipTone,
  type RelatedItem,
  type SectionTone,
} from "@/components/system";
import { MONEY_BACK_DAYS, PLAN_CAPS, PLANS, formatPrice, type PlanTier } from "@/lib/data/plans";

/* Shared sections for the Feature and Segment templates. Server components; copy comes in as props. */

const TIER_ORDER: PlanTier[] = PLANS.map((p) => p.tier);
const tierIndex = (t: PlanTier) => TIER_ORDER.indexOf(t);
const planOf = (t: PlanTier) => PLANS.find((p) => p.tier === t) ?? PLANS[0];

const linkClass =
  "font-semibold text-graphite underline decoration-ember decoration-2 underline-offset-4 hover:text-ember-deep focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite";

/* ─── Section header ───────────────────────────────────────────────────────── */

/** Serif h2 + optional lead, left-aligned with the lead beside it from lg (the homepage's section header). */
export function SectionHeader({
  id,
  title,
  italicWord,
  lead,
  className,
}: {
  id: string;
  title: string;
  italicWord?: string;
  lead?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16", className)}>
      <Display id={id} italicWord={italicWord} className="max-w-[640px]">
        {title}
      </Display>
      {lead && <Lead className="text-mute lg:justify-self-end lg:pb-1 lg:text-[18px]">{lead}</Lead>}
    </div>
  );
}

/* ─── Product stage ────────────────────────────────────────────────────────── */

export interface BeforeAfterVisual {
  before: React.ReactNode;
  after: React.ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
}

export type MomentVisual = React.ReactNode | BeforeAfterVisual;

export function isBeforeAfter(v: MomentVisual): v is BeforeAfterVisual {
  return typeof v === "object" && v !== null && !React.isValidElement(v) && "before" in v && "after" in v;
}

/**
 * The sand stage a cropped app screen sits on (the homepage's detail tiles). Before/after
 * visuals sit side by side from sm, each under a small state label.
 */
export function ProductStage({ visual, className }: { visual: MomentVisual; className?: string }) {
  return (
    <div className={cn("@container min-w-0 rounded-tile bg-canvas-deep p-3 sm:p-5 lg:p-6", className)}>
      {isBeforeAfter(visual) ? (
        <div className="grid gap-3.5 @xl:grid-cols-2 @xl:gap-5">
          {(
            [
              { label: visual.beforeLabel ?? "Before", tone: "quiet" as ChipTone, node: visual.before, chip: "bg-white" },
              { label: visual.afterLabel ?? "After", tone: "success" as ChipTone, node: visual.after, chip: "" },
            ] as const
          ).map((s) => (
            <div key={s.label} className="flex min-w-0 flex-col gap-2">
              <Chip tone={s.tone} className={cn("self-start px-2.5 py-1 text-[12px]", s.chip)}>
                {s.label}
              </Chip>
              <div className="min-w-0">{s.node}</div>
            </div>
          ))}
        </div>
      ) : (
        visual
      )}
    </div>
  );
}

/* ─── Mini-features ────────────────────────────────────────────────────────── */

export interface MiniFeature {
  /** A label as the app prints it: a button, tab or status ("Block time", "Pending"). */
  label?: string;
  tone?: ChipTone;
  title: string;
  body: string;
  /** Only when this detail needs a higher plan than the page's feature. */
  plan?: PlanTier;
}

/**
 * Six details, each headed by the app label it lives behind. No icons: the label is the
 * proof that the thing exists on a screen. From sm a hairline grid; phones get a row of
 * cards that swipes (the next one peeks in), so six details cost one card of height.
 */
export function MiniGrid({ items, label, className }: { items: MiniFeature[]; label: string; className?: string }) {
  return (
    <ul
      aria-label={label}
      tabIndex={0}
      className={cn(
        "-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-px sm:overflow-hidden sm:rounded-card sm:bg-hair-strong/60 sm:px-0 sm:pb-0 sm:ring-1 sm:ring-hair-strong/60 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {items.map((m) => (
        <li
          key={m.title}
          className="flex w-[min(calc(100%-3.5rem),18.5rem)] shrink-0 snap-start flex-col rounded-card bg-white p-5 ring-1 ring-hair sm:w-auto sm:rounded-none sm:bg-canvas sm:p-7 sm:ring-0"
        >
          {(m.label || m.plan) && (
            <div
              className="mb-3.5 flex flex-wrap items-center gap-2 sm:mb-4"
              aria-hidden={m.label && !m.plan ? true : undefined}
            >
              {m.label && (
                <Chip tone={m.tone ?? "quiet"} className="px-2.5 py-1 text-[12px]">
                  {m.label}
                </Chip>
              )}
              {m.plan && <PlanChip plan={m.plan} andUp className="px-2.5 py-0.5 text-[12px]" />}
            </div>
          )}
          <Title as="h3" size="sm">
            {m.title}
          </Title>
          <p className="mt-1.5 text-[15px] leading-[1.55] text-pretty text-mute">{m.body}</p>
        </li>
      ))}
    </ul>
  );
}

/* ─── Works with ───────────────────────────────────────────────────────────── */

export interface NeighbourLink {
  name: string;
  href: string;
  /** How the two connect, in one sentence. */
  body: string;
}

/**
 * The three features as nodes on one hairline: a diagram, not controls. Neighbours are
 * hollow nodes with muted labels; this page's feature is the ember node.
 */
function JoinDiagram({ nodes }: { nodes: [string, string, string] }) {
  return (
    <div aria-hidden="true" className="relative mt-12 hidden max-w-[460px] sm:block">
      <span className="absolute inset-x-[16.67%] top-[6px] h-px bg-hair-strong" />
      <div className="relative grid grid-cols-3">
        {nodes.map((n, i) => (
          <div key={n} className="flex min-w-0 flex-col items-center gap-3 px-2 text-center">
            {i === 1 ? (
              <span className="h-[13px] w-[13px] rounded-full bg-ember ring-4 ring-ember-soft" />
            ) : (
              <span className="h-[13px] w-[13px] rounded-full bg-canvas ring-1 ring-hair-strong ring-inset" />
            )}
            <span className={cn("text-[13px] leading-snug text-balance", i === 1 ? "font-semibold text-graphite" : "text-mute")}>
              {n}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Two neighbouring features: a line drawing of the three joined up, then one row each. */
export function WorksWith({
  current,
  title,
  italicWord,
  lead,
  items,
  tone = "white",
}: {
  current: string;
  title: string;
  italicWord?: string;
  lead: React.ReactNode;
  items: [NeighbourLink, NeighbourLink];
  tone?: SectionTone;
}) {
  const [a, b] = items;
  return (
    <Section tone={tone} labelledBy="works-with-heading">
      <Container className="grid gap-9 sm:gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div>
          <Display id="works-with-heading" italicWord={italicWord} className="max-w-[520px]">
            {title}
          </Display>
          {/* Phones go straight from the heading to the two rows, which say the same thing in detail */}
          <Lead className="mt-5 hidden max-w-[480px] text-mute sm:block">{lead}</Lead>
          <JoinDiagram nodes={[a.name, current, b.name]} />
        </div>
        <ul className="border-t border-hair-strong lg:self-center">
          {items.map((it) => (
            <li key={it.href} className="border-b border-hair-strong">
              <Link
                href={it.href}
                className="group flex items-center justify-between gap-5 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite sm:py-7"
              >
                <span className="min-w-0">
                  <span className="block text-title-md text-graphite">{it.name}</span>
                  <span className="mt-1 block max-w-[520px] text-[15px] leading-[1.55] text-pretty text-mute sm:mt-1.5 sm:text-[16px]">
                    {it.body}
                  </span>
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-canvas text-graphite ring-1 ring-hair transition-[background-color,color] duration-200 group-hover:bg-graphite group-hover:text-white">
                  <ArrowRight
                    size={17}
                    strokeWidth={2.2}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ─── Switching band ───────────────────────────────────────────────────────── */

/** The tools studios most often move from (the homepage's "We move you over" tile). */
const SWITCH_SOURCES = ["Vagaro", "Fresha", "Square", "DaySmart", "TattooGenda", "Spreadsheets"];
const SWITCH_MOVES = ["Clients and their history", "Upcoming bookings", "Deposits you hold", "Signed consent forms"];

/**
 * Proof band: we move the studio over, on every plan. `compare` adds up to two comparison
 * links under the copy (segment pages).
 */
export function SwitchingBand({
  tone = "deep",
  compare,
}: {
  tone?: SectionTone;
  compare?: { label: string; href: string }[];
}) {
  return (
    <Section tone={tone} density="proof" labelledBy="switching-heading">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center lg:gap-20">
        <div>
          <Eyebrow>Switching</Eyebrow>
          <Title as="h2" size="lg" id="switching-heading" className="mt-3 max-w-[560px]">
            We move your studio over for you
          </Title>
          <p className="mt-4 max-w-[560px] text-[16px] leading-[1.6] text-pretty text-graphite-soft sm:text-[17px]">
            Coming from Vagaro, Fresha or a spreadsheet? We move your clients, bookings, deposits and signed forms on
            every plan.
          </p>
          <div className="mt-7 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
            <Button href="/migrate" variant="secondary" arrow>
              How switching works
            </Button>
            {compare && compare.length > 0 && (
              <p className="text-[15px] text-mute">
                Compare:{" "}
                {compare.map((c, i) => (
                  <React.Fragment key={c.href}>
                    {i > 0 && " · "}
                    <Link href={c.href} className={linkClass}>
                      {c.label}
                    </Link>
                  </React.Fragment>
                ))}
              </p>
            )}
          </div>
        </div>

        {/* What moves: decorative restatement of the copy, so phones skip it */}
        <div aria-hidden="true" className="hidden rounded-card bg-white p-5 ring-1 ring-hair sm:block sm:p-7">
          <div className="flex flex-wrap gap-1.5">
            {SWITCH_SOURCES.map((s) => (
              <span key={s} className="rounded-full bg-canvas px-3 py-1 text-[13px] font-medium text-graphite-soft ring-1 ring-hair">
                {s}
              </span>
            ))}
          </div>
          <div className="my-4 flex items-center gap-3">
            <ArrowDown size={16} strokeWidth={2.2} className="text-ember" />
            <span className="h-px flex-1 bg-hair" />
            <LimespunMark size={28} />
          </div>
          <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {SWITCH_MOVES.map((m) => (
              <li key={m} className="flex items-center gap-2 text-[15px] text-graphite">
                <Check size={16} strokeWidth={2.6} className="shrink-0 text-ember" />
                {m}
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-hair pt-4 text-[13px] text-mute">
            Migration on every plan · {MONEY_BACK_DAYS}-day money-back guarantee
          </p>
        </div>
      </Container>
    </Section>
  );
}

/* ─── Plan ladder ──────────────────────────────────────────────────────────── */

export interface PlanRow {
  label: string;
  /** The first plan that has it (the app's feature gate). */
  from: PlanTier;
}

/** "Up to 5 artists · 1 location", each half kept whole so narrow cells break at the dot. */
function CapsLine({ tier }: { tier: PlanTier }) {
  const artists = PLAN_CAPS.find((c) => c.label === "Artists")?.values[tier] ?? "";
  const locations = PLAN_CAPS.find((c) => c.label === "Locations")?.values[tier] ?? "";
  if (artists === "Unlimited" && locations === "Unlimited") return <>Unlimited artists and locations</>;
  return (
    <>
      <span className="whitespace-nowrap">{artists === "1" ? "1 artist" : `${artists} artists`}</span>
      {" · "}
      <span className="whitespace-nowrap">{locations === "1" ? "1 location" : `${locations} locations`}</span>
    </>
  );
}

/**
 * What this feature gives you on each plan, left to right: caps from PLAN_CAPS, then the
 * rows that start on that plan. Plans below the feature's first plan read "Not on {plan}".
 */
export function PlanLadder({
  title,
  lead,
  rows,
  start,
  tone = "canvas",
}: {
  title: string;
  lead?: React.ReactNode;
  rows: PlanRow[];
  start: PlanTier;
  tone?: SectionTone;
}) {
  return (
    <Section tone={tone} density="proof" labelledBy="plan-heading">
      <Container>
        <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <Display id="plan-heading" className="max-w-[640px]">
              {title}
            </Display>
            {lead && <p className="mt-4 max-w-[560px] text-[17px] leading-[1.6] text-pretty text-mute">{lead}</p>}
          </div>
          <Button href="/pricing" variant="ghost" arrow className="self-start lg:self-end">
            Compare every plan
          </Button>
        </div>

        <ol className="mt-8 grid gap-px overflow-hidden rounded-card bg-hair ring-1 ring-hair min-[360px]:grid-cols-2 sm:mt-10 lg:grid-cols-4">
          {TIER_ORDER.map((tier) => {
            const plan = planOf(tier);
            const available = tierIndex(tier) >= tierIndex(start);
            const gains = rows.filter((r) => r.from === tier);
            const isStart = tier === start;
            const prev = tierIndex(tier) > 0 ? planOf(TIER_ORDER[tierIndex(tier) - 1]) : null;
            return (
              <li key={tier} className={cn("flex min-w-0 flex-col bg-white p-4 sm:p-6", !available && "bg-canvas")}>
                {/* The price sits under the name wherever the cells are narrow: two across on
                    phones, four across below xl ("Multi-Location" and its price need ~200px) */}
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3 lg:flex-col lg:items-start lg:gap-0.5 xl:flex-row xl:items-baseline xl:gap-3">
                  <span className="inline-flex items-center gap-2 text-[16px] font-semibold text-graphite sm:text-[17px]">
                    {isStart && <span className="h-2 w-2 shrink-0 rounded-full bg-ember" aria-hidden="true" />}
                    {plan.name}
                  </span>
                  <span className="text-[14px] font-medium whitespace-nowrap text-mute tabular-nums sm:text-[15px]">
                    {formatPrice(plan.monthlyCents)}/mo
                  </span>
                </div>
                <p className="mt-1 text-[13px] leading-snug text-mute sm:text-[14px]">
                  <CapsLine tier={tier} />
                </p>
                {available ? (
                  <ul className="mt-3 flex flex-col gap-2 border-t border-hair pt-3 sm:mt-4 sm:pt-4">
                    {gains.length > 0 ? (
                      gains.map((g) => (
                        <li key={g.label} className="flex gap-2 text-[14px] leading-snug text-graphite sm:text-[15px]">
                          <Check size={16} strokeWidth={2.6} className="mt-0.5 shrink-0 text-ember" aria-hidden="true" />
                          {g.label}
                        </li>
                      ))
                    ) : (
                      /* A tier that adds nothing here still reads as complete: it carries the one below. */
                      <li className="flex gap-2 text-[14px] leading-snug text-graphite-soft sm:text-[15px]">
                        <Check size={16} strokeWidth={2.6} className="mt-0.5 shrink-0 text-ember" aria-hidden="true" />
                        {prev ? `Everything in ${prev.name}` : "Included"}
                      </li>
                    )}
                  </ul>
                ) : (
                  <p className="mt-3 border-t border-hair pt-3 text-[14px] text-mute sm:mt-4 sm:pt-4 sm:text-[15px]">Not on {plan.name}</p>
                )}
                {isStart && <span className="sr-only">This feature starts on {plan.name}.</span>}
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}


/* ─── Related ──────────────────────────────────────────────────────────────── */

/**
 * The link mesh before the closing band: the system RelatedGrid's cards. Phones get them
 * two across, eyebrow and title only (the one-line summaries join from sm, where the cards
 * have room), so four links cost two short rows.
 */
export function RelatedLinks({
  heading = "Related",
  items,
  tone = "canvas",
}: {
  heading?: string;
  items: RelatedItem[];
  tone?: "canvas" | "white";
}) {
  return (
    <section aria-labelledby="related-heading" className={cn("py-section-y-tight", tone === "white" ? "bg-white" : "bg-canvas")}>
      <Container>
        <Title as="h2" size="lg" id="related-heading">
          {heading}
        </Title>
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-4">
          {items.map((it) => (
            <li key={it.href} className="min-w-0">
              <Link
                href={it.href}
                className={cn(
                  "group flex h-full flex-col rounded-card p-4 ring-1 ring-hair transition-[box-shadow] duration-200 hover:shadow-[var(--shadow-lift)] hover:ring-hair-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite sm:p-6",
                  tone === "white" ? "bg-canvas" : "bg-white",
                )}
              >
                <span className="flex min-w-0 flex-1 flex-col">
                  {it.eyebrow && <span className="text-label text-mute uppercase">{it.eyebrow}</span>}
                  <span className={cn("text-title-sm text-balance text-graphite", it.eyebrow && "mt-1.5 sm:mt-2")}>{it.title}</span>
                  <span className="mt-2 hidden text-[15px] leading-[1.55] text-pretty text-mute sm:block">{it.body}</span>
                </span>
                <ArrowRight
                  size={17}
                  strokeWidth={2.2}
                  aria-hidden="true"
                  className="mt-3 text-graphite transition-transform duration-200 group-hover:translate-x-1 sm:mt-5"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ─── Before / after ───────────────────────────────────────────────────────── */

/**
 * One screen in two states, side by side on a sand stage, each under its state label.
 * Phone screens stay phone-sized: below sm the pair sits in a row that swipes, and the
 * second phone peeks in.
 */
export function BeforeAfterStage({ visual, className }: { visual: BeforeAfterVisual; className?: string }) {
  const states = [
    { label: visual.beforeLabel ?? "Before", tone: "quiet" as ChipTone, node: visual.before, chip: "bg-white" },
    { label: visual.afterLabel ?? "After", tone: "success" as ChipTone, node: visual.after, chip: "" },
  ];
  return (
    <div className={cn("min-w-0 rounded-tile bg-canvas-deep py-4 sm:p-8", className)}>
      <div
        role="region"
        aria-label={`${states[0].label}, then ${states[1].label}`}
        tabIndex={0}
        className="flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite sm:snap-none sm:justify-center sm:gap-8 sm:overflow-visible sm:px-0 lg:gap-10 [&::-webkit-scrollbar]:hidden"
      >
        {states.map((s) => (
          <div key={s.label} className="flex shrink-0 snap-start flex-col items-center gap-3">
            <Chip tone={s.tone} className={cn("px-2.5 py-1 text-[12px]", s.chip)}>
              {s.label}
            </Chip>
            {s.node}
          </div>
        ))}
      </div>
    </div>
  );
}
