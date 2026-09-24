import type React from "react";
import { ArrowRight, Download } from "lucide-react";
import { cn } from "@/components/system/cn";
import { AppFrame } from "./app-frame";
import { AppAvatar, AppButton, AppCard, AppKpiStrip, AppTable, AppTabs, type AppKpiItem } from "./app-parts";
import { PAYMENTS_LEDGER, PAYROLL_TIPS_CENTS } from "./payments";
import { ToolbarSegmented } from "./projects";
import {
  ARTIST_ORDER,
  ARTISTS,
  CLIENTS,
  SEGMENTS,
  SESSIONS_BY_WEEKDAY,
  TODAY_BOOKINGS,
  usd,
  WEEKLY_REVENUE,
  type ArtistId,
} from "./sample-data";

export type AnalyticsTab = "revenue" | "artists" | "clients" | "bookings";

const TAB_LABEL: Record<AnalyticsTab, string> = {
  revenue: "Revenue",
  artists: "Artists",
  clients: "Clients",
  bookings: "Bookings",
};

/* ─── The window: the app's default range, last 30 days ───────────────────── */

/*
 * The hub's range is a 7 / 30 / 90 day segmented control (analytics/_proto
 * data.ts RANGE_*), defaulting to 30: today plus the 29 days before it, so
 * Wed, Sep 9 – Thu, Oct 8. Every figure below reads that window.
 */
const RANGE_WORD = "last 30 days";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function dayLabel(d: Date): string {
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`;
}

/** Monday-first weekday weights: the studio's usual split of a week's work (sample-data). */
const WEEKDAY_WEIGHT = SESSIONS_BY_WEEKDAY.map((d) => d.sessions);

/**
 * A week's takings spread over the days each artist worked, in $10 steps, the
 * last working day taking the remainder so the week sums exactly. Rio's guest
 * spot began Fri, Oct 2, so Rio's week is Fri–Sun.
 */
function splitWeek(id: ArtistId, weekCents: number): number[] {
  const worked = id === "rio" ? [4, 5, 6] : [0, 1, 2, 3, 4, 5, 6];
  const weight = worked.reduce((total, d) => total + (WEEKDAY_WEIGHT[d] ?? 0), 0);
  const days = [0, 0, 0, 0, 0, 0, 0];
  let left = weekCents;
  worked.forEach((d, i) => {
    const cents = i === worked.length - 1 ? left : Math.round((weekCents * (WEEKDAY_WEIGHT[d] ?? 0)) / weight / 1000) * 1000;
    days[d] = cents;
    left -= cents;
  });
  return days;
}

export interface RevenueDay {
  /** "Sep 9" style. */
  label: string;
  cents: Record<ArtistId, number>;
}

/*
 * Daily revenue. Through Sun, Oct 4 it is the weekly takings (sample-data
 * WEEKLY_REVENUE; the Sep 28 week is the $7,630 payout week) spread by weekday.
 * From Mon, Oct 5 it is the Payments ledger itself: Leo B.'s deposit, Tuesday's
 * $1,480, Bea L.'s $500 yesterday and today's $250, as Today reports them.
 */
export const DAILY_REVENUE: RevenueDay[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(Date.UTC(2026, 8, 9 + i));
  const label = dayLabel(date);
  const dow = (date.getUTCDay() + 6) % 7;
  const monday = dayLabel(new Date(Date.UTC(2026, 8, 9 + i - dow)));
  const week = WEEKLY_REVENUE.find((w) => w.week === monday);
  const cents = { dev: 0, mara: 0, rio: 0 } as Record<ArtistId, number>;
  for (const id of ARTIST_ORDER) {
    cents[id] = week
      ? (splitWeek(id, week.cents[id])[dow] ?? 0)
      : PAYMENTS_LEDGER.filter((t) => t.day === label && t.artist === id).reduce((total, t) => total + t.cents, 0);
  }
  return { label, cents };
});
const DAYS = DAILY_REVENUE;

const DAY_TOTALS = DAYS.map((d) => ARTIST_ORDER.reduce((total, id) => total + d.cents[id], 0));
const REVENUE_CENTS = DAY_TOTALS.reduce((total, c) => total + c, 0);
const REVENUE_BY_ARTIST = ARTIST_ORDER.map((id) => ({ id, cents: DAYS.reduce((total, d) => total + d.cents[id], 0) }));
const artistRevenue = (id: ArtistId) => REVENUE_BY_ARTIST.find((r) => r.id === id)?.cents ?? 0;
const TOP_EARNER = REVENUE_BY_ARTIST.reduce((a, b) => (b.cents > a.cents ? b : a));

/*
 * Completed sittings in the window: the payout week's 5 / 7 / 9 (Payments ›
 * Commissions), five each for Dev in the Sep 14 and Sep 21 weeks and seven for
 * Mara, four and five on Sep 9–13, then this week Tomás V. and Bea L. for Dev
 * and Rio's four walk-ins (13 for Rio, as on Guest artists). Today's five are
 * still open: Asha M. is in the chair and four are confirmed.
 */
const SESSIONS: Record<ArtistId, number> = { dev: 21, mara: 26, rio: 13 };
const NO_SHOWS: Record<ArtistId, number> = { dev: 0, mara: 1, rio: 0 };
const CANCELLED: Record<ArtistId, number> = { dev: 1, mara: 2, rio: 0 };
const OPEN_TODAY: Record<ArtistId, number> = {
  dev: TODAY_BOOKINGS.filter((b) => b.artist === "dev").length,
  mara: TODAY_BOOKINGS.filter((b) => b.artist === "mara").length,
  rio: TODAY_BOOKINGS.filter((b) => b.artist === "rio").length,
};
const bookingsFor = (id: ArtistId) => SESSIONS[id] + NO_SHOWS[id] + CANCELLED[id] + OPEN_TODAY[id];
const total = (r: Record<ArtistId, number>) => ARTIST_ORDER.reduce((t, id) => t + r[id], 0);

const SESSIONS_30D = total(SESSIONS);
const NO_SHOWS_30D = total(NO_SHOWS);
const CANCELLED_30D = total(CANCELLED);
const BOOKINGS_30D = ARTIST_ORDER.reduce((t, id) => t + bookingsFor(id), 0);
/** Fill rate as the app defines it: completed ÷ all bookings in the range. */
const FILL_PCT = Math.round((SESSIONS_30D / BOOKINGS_30D) * 100);
const BOOKING_STATUS = [
  { key: "completed", label: "Completed", count: SESSIONS_30D, fill: "bg-app-text" },
  { key: "confirmed", label: "Confirmed", count: TODAY_BOOKINGS.filter((b) => b.status === "confirmed").length, fill: "bg-graphite/25" },
  { key: "in-progress", label: "In progress", count: TODAY_BOOKINGS.filter((b) => b.status === "in_progress").length, fill: "bg-graphite/50" },
  { key: "no-show", label: "No-show", count: NO_SHOWS_30D, fill: "bg-app-active-fg" },
  { key: "cancelled", label: "Cancelled", count: CANCELLED_30D, fill: "bg-app-active-fg/45" },
] as const;
/** Bookings in the window by weekday, Mon–Sun (69; Thursday holds today's five). */
const BOOKINGS_BY_WEEKDAY: { day: string; bookings: number }[] = [
  { day: "Mon", bookings: 4 },
  { day: "Tue", bookings: 8 },
  { day: "Wed", bookings: 10 },
  { day: "Thu", bookings: 14 },
  { day: "Fri", bookings: 12 },
  { day: "Sat", bookings: 15 },
  { day: "Sun", bookings: 6 },
];

/*
 * Tips: the Sep 28 – Oct 4 payroll run's (Payments › Payroll, Rio's $180 among
 * them) plus the rest of the window, Sep 9–27 and Oct 5 – today.
 */
const OTHER_TIPS_CENTS: Record<ArtistId, number> = { dev: 129000, mara: 99500, rio: 6000 };
const TIPS_CENTS = Object.fromEntries(
  ARTIST_ORDER.map((id) => [id, PAYROLL_TIPS_CENTS[id] + OTHER_TIPS_CENTS[id]]),
) as Record<ArtistId, number>;
const TIPS_TOTAL_CENTS = total(TIPS_CENTS);
const DEPOSITS_COLLECTED = { count: 19, cents: 245000 } as const;
const AVG_SALE_CENTS = Math.round(REVENUE_CENTS / SESSIONS_30D);

/** Top five services by revenue in the window (the hub's "By service"); Rio's walk-ins are all flash. */
const BY_SERVICE: { name: string; cents: number }[] = [
  { name: "Sleeve session", cents: 965000 },
  { name: "Fine-line", cents: 618000 },
  { name: "Custom piece", cents: 442000 },
  { name: "Script & lettering", cents: 231000 },
  { name: "Walk-in flash", cents: artistRevenue("rio") },
];

/*
 * Clients: the app scopes only "New clients" to the range; Returning, Avg. LTV,
 * Lapsed and both cards read every client on file (412, sample-data SEGMENTS).
 * Referral (9) sits outside the top five, matching the referral program's 9.
 */
const ALL_CLIENTS = SEGMENTS.find((s) => s.label === "All clients")?.clients ?? 0;
const NEW_CLIENTS_30D = 17;
const RETURNING = 256;
const RETURNING_PCT = Math.round((RETURNING / ALL_CLIENTS) * 100);
const AVG_LTV_CENTS = Math.round(CLIENTS.reduce((t, c) => t + c.spendCents, 0) / CLIENTS.length);
const LAPSED = SEGMENTS.find((s) => s.label === "Inactive 90 days")?.clients ?? 0;
const ACQUISITION: { source: string; clients: number }[] = [
  { source: "Instagram", clients: 171 },
  { source: "Walk-in", clients: 94 },
  { source: "Google", clients: 68 },
  { source: "Website", clients: 43 },
  { source: "Other", clients: 27 },
];

/** App ratePct: two decimals, or a whole number when it is one ("1.45", "0"). */
function ratePct(numerator: number, denominator: number): string {
  if (denominator <= 0) return "0";
  const rounded = Math.round((numerator / denominator) * 10000) / 100;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2);
}

/* ─── Chart pieces: HTML text, SVG only for the line (text stays legible at any width) ── */

/** "$1.5k" / "$500" style tick. */
function tickUsd(cents: number): string {
  const dollars = cents / 100;
  return dollars < 1000 ? `$${dollars}` : `$${Number((dollars / 1000).toFixed(1))}k`;
}

/** Days that carry an x-axis label: every week, or first, middle and last when narrow. */
const X_TICKS = [0, 7, 14, 21, DAYS.length - 1];
const X_TICKS_NARROW = [0, 14, DAYS.length - 1];

/** Daily revenue as a single-series line: 2px line, 10% wash, today's dot, its value called out above. */
function RevenueLine() {
  const step = 50000;
  const max = Math.ceil(Math.max(...DAY_TOTALS) / step) * step;
  const ticks = Array.from({ length: max / step + 1 }, (_, i) => i * step);
  const n = DAY_TOTALS.length;
  const pts = DAY_TOTALS.map((c, i) => ({ x: (i / (n - 1)) * 100, y: 100 - (c / max) * 100 }));
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
  const area = `${line} L100,100 L0,100 Z`;
  const last = pts[n - 1] ?? { x: 100, y: 100 };

  return (
    <div>
      {/* Today's point is called out above the plot, where it can't sit on the line. */}
      <div className="mb-2 flex items-center justify-end gap-1.5 text-ui-xs text-app-mute">
        <span className="h-2 w-2 rounded-full bg-app-active-fg" />
        Today, {DAYS[n - 1]?.label}
        <span className="font-bold text-app-text tabular-nums">{usd(DAY_TOTALS[n - 1] ?? 0)}</span>
      </div>
      <div className="flex items-start gap-2">
        <div className="relative h-[168px] w-9 shrink-0">
          {ticks.map((t) => (
            <span
              key={t}
              className="absolute right-0 -translate-y-1/2 text-[10.5px] text-app-mute tabular-nums"
              style={{ top: `${100 - (t / max) * 100}%` }}
            >
              {tickUsd(t)}
            </span>
          ))}
        </div>
        <div className="min-w-0 flex-1">
          <div className="relative h-[168px]">
            {ticks.map((t) => (
              <span key={t} className="absolute inset-x-0 h-px bg-app-border" style={{ top: `${100 - (t / max) * 100}%` }} />
            ))}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
              <path d={area} fill="var(--color-app-active-fg)" fillOpacity={0.1} />
              <path
                d={line}
                fill="none"
                stroke="var(--color-app-active-fg)"
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <span
              className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-app-active-fg ring-2 ring-white"
              style={{ left: `${last.x}%`, top: `${last.y}%` }}
            />
          </div>
          <div className="relative mt-2 h-4">
            {X_TICKS.map((i) => (
              <span
                key={i}
                className={cn(
                  "absolute top-0 text-[10.5px] whitespace-nowrap text-app-mute tabular-nums",
                  i === 0 ? "translate-x-0" : i === n - 1 ? "-translate-x-full" : "-translate-x-1/2",
                  !X_TICKS_NARROW.includes(i) && "hidden @2xl:inline",
                )}
                style={{ left: `${pts[i]?.x ?? 0}%` }}
              >
                {DAYS[i]?.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * The app's BarsCard rows (analytics/_proto ScrAnalytics.tsx): name and value on
 * one line, a 6px bar under it; the first bar rust when it leads, the rest onyx.
 */
function BarsList({
  rows,
  format,
  accentFirst = false,
}: {
  rows: { key: string; label: React.ReactNode; value: number }[];
  format: (v: number) => string;
  accentFirst?: boolean;
}) {
  const max = Math.max(...rows.map((r) => r.value), 1);
  return (
    <div className="flex flex-col gap-3">
      {rows.map((r, i) => (
        <div key={r.key}>
          <div className="mb-1.5 flex items-center justify-between gap-3 text-ui-sm">
            <span className="min-w-0 truncate text-app-text">{r.label}</span>
            <span className="shrink-0 font-bold text-app-text tabular-nums">{format(r.value)}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-graphite/[0.07]">
            <div
              className={cn("h-full", accentFirst && i === 0 ? "bg-app-active-fg" : "bg-app-text")}
              style={{ width: `${(r.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Columns from a zero baseline, 2px apart, value on the tallest cap. */
function Columns({ rows }: { rows: { key: string; value: number }[] }) {
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <div>
      <div className="relative flex h-[148px] items-end gap-[2px] border-b border-app-border">
        {rows.map((r) => (
          <span key={r.key} className="relative flex h-full flex-1 items-end justify-center">
            <span
              className={cn("w-full max-w-6 rounded-t-[4px]", r.value === max ? "bg-app-active-fg" : "bg-app-active-fg/45")}
              style={{ height: `${(r.value / max) * 86}%` }}
            />
            {r.value === max && (
              <span
                className="absolute pb-1 text-ui-sm font-bold text-app-text tabular-nums"
                style={{ bottom: `${(r.value / max) * 86}%` }}
              >
                {r.value}
              </span>
            )}
          </span>
        ))}
      </div>
      <div className="mt-1.5 flex gap-[2px]">
        {rows.map((r) => (
          <span key={r.key} className="flex-1 text-center text-[10.5px] text-app-mute">
            {r.key}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Card meta that gives way to the title in the narrowest frames: `lead` (or the
 * whole meta, without one) only shows once the frame is 18rem wide.
 */
function NarrowMeta({ lead, children }: { lead?: string; children: React.ReactNode }) {
  if (lead === undefined) return <span className="hidden @min-[18rem]:inline">{children}</span>;
  return (
    <span>
      <span className="hidden @min-[18rem]:inline">{lead}</span>
      {children}
    </span>
  );
}

function ArtistLabel({ id }: { id: ArtistId }) {
  const a = ARTISTS[id];
  return (
    <span className="flex items-center gap-1.5">
      <AppAvatar initials={a.initials} tone={a.tone} size="sm" />
      {a.name}
    </span>
  );
}

/* ─── Tabs ────────────────────────────────────────────────────────────────── */

const KPIS: Record<AnalyticsTab, AppKpiItem[]> = {
  /* adapt.ts adaptRevenue: Revenue (range) · Deposits collected · Tips collected · Avg. sale. */
  revenue: [
    { label: "Revenue (30d)", value: usd(REVENUE_CENTS), note: RANGE_WORD },
    { label: "Deposits collected", value: usd(DEPOSITS_COLLECTED.cents), note: `${DEPOSITS_COLLECTED.count} deposits` },
    { label: "Tips collected", value: usd(TIPS_TOTAL_CENTS), note: "100% to artists" },
    { label: "Avg. sale", value: usd(AVG_SALE_CENTS), note: `${SESSIONS_30D} sessions` },
  ],
  /* adaptArtists: Top earner · Sessions · Guest revenue. */
  artists: [
    { label: "Top earner", value: ARTISTS[TOP_EARNER.id].name, note: `${usd(TOP_EARNER.cents)} · ${RANGE_WORD}` },
    { label: "Sessions", value: String(SESSIONS_30D), note: "completed sittings" },
    { label: "Guest revenue", value: usd(artistRevenue("rio")), note: ARTISTS.rio.name },
  ],
  /* adaptClients: New clients · Returning · Avg. LTV · Lapsed. */
  clients: [
    { label: "New clients", value: String(NEW_CLIENTS_30D), note: RANGE_WORD },
    { label: "Returning", value: `${RETURNING_PCT}%`, note: "rebook rate" },
    { label: "Avg. LTV", value: usd(AVG_LTV_CENTS), note: "paid to date" },
    { label: "Lapsed", value: String(LAPSED), note: "win-back ready", accent: true },
  ],
  /* adaptBookings: Bookings · No-show rate · Cancellations · Fill rate. */
  bookings: [
    { label: "Bookings", value: String(BOOKINGS_30D), note: RANGE_WORD },
    { label: "No-show rate", value: `${ratePct(NO_SHOWS_30D, BOOKINGS_30D)}%`, note: `${NO_SHOWS_30D} of ${BOOKINGS_30D} bookings` },
    // Soft hyphen: the one-word label breaks instead of clipping in the narrowest frames.
    { label: "Cancel\u00ADlations", value: String(CANCELLED_30D), note: `${ratePct(CANCELLED_30D, BOOKINGS_30D)}% of bookings` },
    { label: "Fill rate", value: `${FILL_PCT}%`, note: "completed of all bookings" },
  ],
};

/** Revenue: the hub pairs "Revenue trend" (daily, the range's total at the right) with "By service". */
function RevenueTab() {
  return (
    <div className="grid gap-4 @4xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      <AppCard
        title="Revenue trend"
        meta={
          <>
            <span className="hidden @min-[26rem]:inline">Daily · {RANGE_WORD}</span>
            <span className="text-ui-sm font-bold text-app-text tabular-nums">{usd(REVENUE_CENTS)}</span>
          </>
        }
      >
        <RevenueLine />
      </AppCard>
      <AppCard title="By service" meta={<NarrowMeta lead="Revenue · ">{RANGE_WORD}</NarrowMeta>}>
        <BarsList rows={BY_SERVICE.map((r) => ({ key: r.name, label: r.name, value: r.cents }))} format={(v) => usd(v)} accentFirst />
      </AppCard>
    </div>
  );
}

/** Leaderboard: the full report's columns (ScrArtistsReport) plus the overview's share-of-busiest bar. */
function ArtistsTab() {
  const busiest = Math.max(...ARTIST_ORDER.map((id) => SESSIONS[id]));
  return (
    <AppCard title="Artist leaderboard" meta={<NarrowMeta>{RANGE_WORD}</NarrowMeta>} padded={false}>
      <AppTable
        columns={[
          { label: "#" },
          { label: "Artist" },
          { label: "Sessions", align: "right" },
          { label: "Revenue", align: "right" },
          { label: "Avg session", align: "right" },
          { label: "No-show", align: "right" },
          { label: "Tip %", align: "right" },
          { label: "Share of busiest" },
        ]}
        rows={[...ARTIST_ORDER]
          .sort((a, b) => artistRevenue(b) - artistRevenue(a))
          .map((id, i) => {
            const rev = artistRevenue(id);
            const share = Math.round((SESSIONS[id] / busiest) * 100);
            return {
              key: id,
              cells: [
                <span key="r" className="text-app-mute">
                  {i + 1}
                </span>,
                <span key="a" className="flex items-center gap-1.5 font-semibold">
                  <ArtistLabel id={id} />
                  <span className="text-ui-xs font-normal text-app-mute">{ARTISTS[id].kind}</span>
                </span>,
                SESSIONS[id],
                <span key="v" className="font-semibold">
                  {usd(rev)}
                </span>,
                usd(Math.round(rev / SESSIONS[id])),
                `${ratePct(NO_SHOWS[id], bookingsFor(id))}%`,
                `${Math.round((TIPS_CENTS[id] / rev) * 100)}%`,
                <span key="b" className="flex items-center gap-2">
                  <span className="h-1.5 w-20 overflow-hidden rounded-full bg-graphite/[0.07]">
                    <span className="block h-full rounded-r-[4px] bg-app-active-fg" style={{ width: `${share}%` }} />
                  </span>
                  <span className="text-ui-xs text-app-mute tabular-nums">{share}%</span>
                </span>,
              ],
            };
          })}
        minWidth={720}
      />
    </AppCard>
  );
}

/** Clients: both cards read every client on file, as the app's do ("All clients"). */
function ClientsTab() {
  return (
    <div className="grid gap-4 @3xl:grid-cols-2">
      <AppCard title="New vs returning" meta={<NarrowMeta>All clients</NarrowMeta>}>
        <BarsList
          rows={[
            { key: "returning", label: "Returning", value: RETURNING },
            { key: "first", label: "First-time", value: ALL_CLIENTS - RETURNING },
          ]}
          format={String}
        />
        <p className="mt-4 text-ui-xs text-app-mute">
          {RETURNING} of {ALL_CLIENTS} clients have come back: {RETURNING_PCT}% rebook rate.
        </p>
      </AppCard>
      <AppCard title="Acquisition source" meta={<NarrowMeta lead="All clients · ">by source</NarrowMeta>}>
        <BarsList rows={ACQUISITION.map((s) => ({ key: s.source, label: s.source, value: s.clients }))} format={String} accentFirst />
      </AppCard>
    </div>
  );
}

/** Status breakdown (bookings/_proto/ScrBookingsReport.tsx StatusBar): one stacked bar plus its legend. */
function StatusBreakdown() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-3 w-full gap-[2px] overflow-hidden rounded-full">
        {BOOKING_STATUS.map((s) => (
          <span key={s.key} className={cn("h-full", s.fill)} style={{ width: `${(s.count / BOOKINGS_30D) * 100}%` }} />
        ))}
      </div>
      <div className="flex flex-col">
        {BOOKING_STATUS.map((s) => (
          <div
            key={s.key}
            className="flex items-center gap-2 border-b border-app-border py-2 text-ui-sm last:border-b-0 last:pb-0"
          >
            <span className={cn("h-2.5 w-2.5 shrink-0 rounded-full", s.fill)} />
            <span className="min-w-0 flex-1 font-semibold text-app-text">{s.label}</span>
            <span className="font-semibold text-app-text tabular-nums">{s.count}</span>
            <span className="w-9 text-right text-app-mute tabular-nums">{Math.round((s.count / BOOKINGS_30D) * 100)}%</span>
          </div>
        ))}
      </div>
      <p className="text-ui-xs text-app-mute">
        Fill rate: {SESSIONS_30D} completed of {BOOKINGS_30D} bookings. Today&rsquo;s {TODAY_BOOKINGS.length} are still open.
      </p>
    </div>
  );
}

function BookingsTab() {
  return (
    <div className="grid gap-4 @3xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
      <AppCard title="By day of week" meta={<NarrowMeta lead="bookings, ">{RANGE_WORD}</NarrowMeta>}>
        <Columns rows={BOOKINGS_BY_WEEKDAY.map((d) => ({ key: d.day, value: d.bookings }))} />
      </AppCard>
      <AppCard title="Status breakdown" meta={<NarrowMeta>{BOOKINGS_30D} bookings</NarrowMeta>}>
        <StatusBreakdown />
      </AppCard>
    </div>
  );
}

/**
 * Analytics (app: /analytics, analytics/_proto/ScrAnalytics.tsx and the four
 * reports) on its default 30-day range, Sep 9 – Oct 8. Every figure is computed
 * from sample-data, the Payments ledger and payroll run, and the inputs at the
 * top, so the tabs agree with each other and with Payments, Today and Guest
 * artists. Only metrics the app reports.
 */
export function AnalyticsScreen({ tab = "revenue", className }: { tab?: AnalyticsTab; className?: string }) {
  return (
    <AppFrame
      active="analytics"
      className={className}
      actions={
        <>
          <ToolbarSegmented options={["7 days", "30 days", "90 days"]} active="30 days" />
          <AppButton icon={Download}>Export</AppButton>
        </>
      }
    >
      <div className="flex items-end justify-between gap-4 border-b border-app-border pr-4 @lg:pr-6">
        <AppTabs
          tabs={[...Object.values(TAB_LABEL), "Inventory", "AI Usage"]}
          active={TAB_LABEL[tab]}
          className="min-w-0 flex-1 border-b-0 @lg:px-6"
        />
        <span className="hidden shrink-0 items-center gap-1 pb-2.5 text-ui-sm font-semibold text-app-mute @2xl:flex">
          View full report <ArrowRight size={13} strokeWidth={2} />
        </span>
      </div>
      <div className="flex flex-col gap-4 p-4 @lg:p-6">
        <AppKpiStrip items={KPIS[tab]} />
        {tab === "revenue" && <RevenueTab />}
        {tab === "artists" && <ArtistsTab />}
        {tab === "clients" && <ClientsTab />}
        {tab === "bookings" && <BookingsTab />}
      </div>
    </AppFrame>
  );
}
