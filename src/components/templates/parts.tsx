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
  InkBand,
  Lead,
  PlanChip,
  RelatedGrid,
  Section,
  Title,
  cn,
  lastSpansTwo,
  lgRowSpan,
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

/* ─── Closing band copy ────────────────────────────────────────────────────── */

/**
 * What a template page may set on its closing band: a page-specific headline with one italic
 * word, the reassurance line, an eyebrow, and the contextual second link (null hides it).
 * The primary is always Create account.
 */
export type TemplateInkBand = Pick<
  React.ComponentProps<typeof InkBand>,
  "headline" | "italicWord" | "sub" | "eyebrow" | "secondary"
>;

/* ─── Section header ───────────────────────────────────────────────────────── */

/**
 * Serif h2 + optional lead, left-aligned with the lead beside it from lg (the homepage's
 * section header). Without a lead the heading keeps the full row.
 */
export function SectionHeader({
  id,
  title,
  lead,
  className,
}: {
  id: string;
  title: string;
  /** @deprecated Section headings never carry the ember italic (only the page H1 and InkBand). Ignored. */
  italicWord?: string;
  lead?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-4 sm:gap-5",
        lead && "lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16",
        className,
      )}
    >
      <Display id={id} className="max-w-[640px]">
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
 * visuals sit side by side once the stage is @xl (36rem) wide, each under a small state
 * label; narrower stages stack them. The stage is the named container `stage`, so a pair's
 * screens can compact themselves while stacked with `@max-xl/stage:` variants (a shorter
 * list, a hidden secondary row) and keep their full form side by side.
 */
export function ProductStage({ visual, className }: { visual: MomentVisual; className?: string }) {
  return (
    <div className={cn("@container/stage min-w-0 rounded-tile bg-canvas-deep p-3 sm:p-5 lg:p-6", className)}>
      {isBeforeAfter(visual) ? (
        <div className="grid gap-3.5 @xl/stage:grid-cols-2 @xl/stage:gap-5">
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
 * The details, each headed by the app label it lives behind. No icons: the label is the
 * proof that the thing exists on a screen. From sm a hairline grid whose rows always fill
 * (any count from one to eight: an odd last detail spans two columns at sm, a short last row
 * shares the width at lg); phones get a row of cards that swipes (the next one peeks in), so
 * six details cost one card of height. A single detail is one full-width card.
 */
export function MiniGrid({ items, label, className }: { items: MiniFeature[]; label: string; className?: string }) {
  const n = items.length;
  if (n === 0) return null;
  const swipes = n > 1;
  return (
    <ul
      aria-label={label}
      tabIndex={swipes ? 0 : undefined}
      className={cn(
        "flex gap-3 sm:grid sm:gap-px sm:overflow-hidden sm:rounded-card sm:bg-hair-strong/60 sm:ring-1 sm:ring-hair-strong/60 [&::-webkit-scrollbar]:hidden",
        swipes &&
          "-mx-5 snap-x snap-mandatory scroll-px-5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite sm:mx-0 sm:snap-none sm:px-0 sm:pb-0",
        n > 1 && "sm:grid-cols-2 lg:grid-cols-12",
        className,
      )}
    >
      {items.map((m, i) => (
        <li
          key={m.title}
          className={cn(
            "flex shrink-0 snap-start flex-col rounded-card bg-white p-5 ring-1 ring-hair sm:w-auto sm:rounded-none sm:bg-canvas sm:p-7 sm:ring-0",
            swipes ? "w-[min(calc(100%-3.5rem),18.5rem)]" : "w-full",
            n > 1 && [lastSpansTwo(n, i, "sm:"), lgRowSpan(n, i)],
          )}
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
 * The neighbouring features (one or two): heading and lead, then one row each saying how
 * the two connect. Renders nothing without a neighbour.
 */
export function WorksWith({
  title,
  lead,
  items,
  tone = "white",
}: {
  /** @deprecated The joined-up node diagram is gone; the rows say how the features connect. Ignored. */
  current?: string;
  title: string;
  /** @deprecated Section headings never carry the ember italic. Ignored. */
  italicWord?: string;
  lead: React.ReactNode;
  items: NeighbourLink[];
  tone?: SectionTone;
}) {
  const rows = items.slice(0, 2);
  if (rows.length === 0) return null;
  return (
    <Section tone={tone} labelledBy="works-with-heading">
      <Container className="grid gap-9 sm:gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div>
          <Display id="works-with-heading" className="max-w-[520px]">
            {title}
          </Display>
          {/* Phones go straight from the heading to the rows, which say the same thing in detail */}
          <Lead className="mt-5 hidden max-w-[480px] text-mute sm:block">{lead}</Lead>
        </div>
        <ul className="border-t border-hair-strong lg:self-center">
          {rows.map((it) => (
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
const SWITCH_MOVES = ["Clients and their notes", "Upcoming bookings", "Deposits you hold", "Signed consent forms"];
const SWITCH_TITLE = "We move your studio over for you";
const SWITCH_LINE =
  "Coming from Vagaro, Fresha or a spreadsheet? We move your clients, bookings, deposits and signed forms on every plan.";

/**
 * Page-specific copy for the switching band. What moves is fixed by the migration (clients
 * and their notes, upcoming bookings, deposits held, signed consent PDFs, project notes and
 * photos); a page says which of those its readers care about. No italic in the heading.
 */
export interface SwitchingCopy {
  /** The h2. Defaults to "We move your studio over for you". */
  title?: string;
  /** One or two sentences under the heading, about what this page's reader brings across. */
  line?: string;
  /** The card's checklist, the page's own item first (it is set bold). Up to four read best. */
  moves?: string[];
  /** The source chips on the card: the tools this reader is most likely leaving. */
  sources?: string[];
}

/**
 * Proof band: we move the studio over, on every plan. Pages pass their own heading, line and
 * checklist (SwitchingCopy) so the band never repeats word for word; with none it keeps the
 * general copy (/compare). `compare` adds comparison links under the copy.
 */
export function SwitchingBand({
  tone = "deep",
  compare,
  title,
  line,
  moves,
  sources,
}: SwitchingCopy & {
  tone?: SectionTone;
  compare?: { label: string; href: string }[];
}) {
  const moveList = moves && moves.length > 0 ? moves : SWITCH_MOVES;
  const lead = Boolean(moves && moves.length > 0);
  return (
    <Section tone={tone} density="proof" labelledBy="switching-heading">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center lg:gap-20">
        <div>
          <Eyebrow>Switching</Eyebrow>
          <Title as="h2" size="lg" id="switching-heading" className="mt-3 max-w-[560px] text-balance">
            {title ?? SWITCH_TITLE}
          </Title>
          <p className="mt-4 max-w-[560px] text-[16px] leading-[1.6] text-pretty text-graphite-soft sm:text-[17px]">
            {line ?? SWITCH_LINE}
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
            {(sources && sources.length > 0 ? sources : SWITCH_SOURCES).map((s) => (
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
            {moveList.map((m, i) => (
              <li
                key={m}
                className={cn(
                  "flex items-center gap-2 text-[15px]",
                  !lead ? "text-graphite" : i === 0 ? "font-semibold text-graphite" : "text-graphite-soft",
                )}
              >
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
 * The same on every plan it's on: the rows once, then the four plans with their prices and
 * a tick (or "Not on {plan}" below the first plan). Used when no higher plan adds anything,
 * where a four-column ladder would be three columns of "Everything in …".
 */
function FlatPlans({
  title,
  lead,
  rows,
  start,
  tone,
}: {
  title: string;
  lead?: React.ReactNode;
  rows: PlanRow[];
  start: PlanTier;
  tone: SectionTone;
}) {
  const compare = (
    <Button href="/pricing" variant="ghost" arrow>
      Compare every plan
    </Button>
  );
  return (
    <Section tone={tone} density="proof" labelledBy="plan-heading">
      <Container className="grid gap-7 sm:gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-20">
        <div>
          <Display id="plan-heading" className="max-w-[520px]">
            {title}
          </Display>
          {lead && <p className="mt-4 max-w-[520px] text-[17px] leading-[1.6] text-pretty text-mute">{lead}</p>}
          <div className="mt-3 max-lg:hidden">{compare}</div>
        </div>
        <div>
          <div className="overflow-hidden rounded-card bg-white ring-1 ring-hair">
            <ul
              aria-label="What you get"
              className={cn("grid gap-x-8 gap-y-2.5 p-5 sm:p-7", rows.length % 2 === 0 && "sm:grid-cols-2")}
            >
              {rows.map((r) => (
                <li key={r.label} className="flex gap-2.5 text-[15px] leading-snug text-pretty text-graphite sm:text-[16px]">
                  <Check size={16} strokeWidth={2.6} className="mt-0.5 shrink-0 text-ember" aria-hidden="true" />
                  {r.label}
                </li>
              ))}
            </ul>
            {/* Four across wherever a cell fits "Multi-Location" on one line; two by two on
                phones and while the card sits beside the heading at lg */}
            <ol
              aria-label="Plans"
              className="grid grid-cols-2 gap-px border-t border-hair bg-hair sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4"
            >
              {TIER_ORDER.map((tier) => {
                const plan = planOf(tier);
                const on = tierIndex(tier) >= tierIndex(start);
                return (
                  <li key={tier} className={cn("flex min-w-0 flex-col px-4 py-3.5 sm:py-4 lg:px-5", on ? "bg-white" : "bg-canvas")}>
                    <span className="text-[15px] font-semibold whitespace-nowrap text-graphite">{plan.name}</span>
                    <span className="text-[13px] whitespace-nowrap text-mute tabular-nums">
                      {formatPrice(plan.monthlyCents)}/mo
                    </span>
                    {on ? (
                      <span className="mt-2 flex items-center gap-1.5 text-[13px] font-medium text-graphite">
                        <Check size={15} strokeWidth={2.6} className="shrink-0 text-ember" aria-hidden="true" />
                        Included
                      </span>
                    ) : (
                      <span className="mt-2 text-[13px] text-mute">Not on {plan.name}</span>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
          <div className="mt-3 lg:hidden">{compare}</div>
        </div>
      </Container>
    </Section>
  );
}

/**
 * What this feature gives you on each plan, left to right: caps from PLAN_CAPS, then the
 * rows that start on that plan. Plans below the feature's first plan read "Not on {plan}".
 * When every row starts on the first plan (no higher plan adds anything), it renders the
 * compact FlatPlans instead.
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
  if (rows.length > 0 && rows.every((r) => r.from === start)) {
    return <FlatPlans title={title} lead={lead} rows={rows} start={start} tone={tone} />;
  }
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
 * The link mesh before the closing band. Kept for the templates' callers; it is the system
 * RelatedGrid (two across on phones with eyebrow and title only, rows that always fill).
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
  return <RelatedGrid heading={heading} items={items} tone={tone} />;
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
