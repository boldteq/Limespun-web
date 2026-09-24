import type React from "react";
import { ArrowRight, Download } from "lucide-react";
import { cn } from "@/components/system/cn";
import { AppFrame } from "./app-frame";
import { AppAvatar, AppButton, AppCard, AppKpiStrip, AppTable, AppTabs, type AppKpiItem } from "./app-parts";
import { PAYROLL_TIPS_CENTS } from "./payments";
import { ToolbarSegmented } from "./projects";
import {
  ARTIST_ORDER,
  ARTISTS,
  BOOKINGS_30D,
  BOOKINGS_BY_DAY_30D,
  CANCELLED_30D,
  CLIENTS,
  DAILY_REVENUE,
  NEW_CLIENTS_30D,
  NO_SHOWS_30D,
  REVENUE_30D_BY_ARTIST,
  REVENUE_30D_CENTS,
  SEGMENTS,
  SESSIONS_30D,
  SESSIONS_30D_BY_ARTIST,
  usd,
  type ArtistId,
} from "./sample-data";

/** Daily revenue lives in sample-data so Analytics, Locations and Payments read one set of books. */
export { DAILY_REVENUE, type RevenueDay } from "./sample-data";

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

/*
 * Daily revenue (sample-data DAILY_REVENUE): through Sun, Oct 4 the weekly
 * takings spread by weekday (the Sep 28 week is the $7,630 payout week); from
 * Mon, Oct 5 the Payments ledger itself. The KPI, the trend, the leaderboard
 * and the Locations month all sum these days.
 */
const DAYS = DAILY_REVENUE;

const DAY_TOTALS = DAYS.map((d) => ARTIST_ORDER.reduce((total, id) => total + d.cents[id], 0));
const REVENUE_CENTS = REVENUE_30D_CENTS;
const artistRevenue = (id: ArtistId) => REVENUE_30D_BY_ARTIST[id];
const TOP_EARNER = ARTIST_ORDER.map((id) => ({ id, cents: artistRevenue(id) })).reduce((a, b) => (b.cents > a.cents ? b : a));

/*
 * Sittings, no-shows, cancellations and bookings by day in the window come
 * from sample-data (SESSIONS_30D_BY_ARTIST, BOOKINGS_BY_DAY_30D …), so Forms and
 * Marketing read the same 30 days. Today's five are still open.
 */
const SESSIONS = SESSIONS_30D_BY_ARTIST;
const total = (r: Record<ArtistId, number>) => ARTIST_ORDER.reduce((t, id) => t + r[id], 0);
/** Fill rate as the app defines it: completed ÷ all bookings in the range. */
const FILL_PCT = Math.round((SESSIONS_30D / BOOKINGS_30D) * 100);
/** Bookings in the window by weekday, Mon–Sun, summed from the daily series (the window opens on a Wednesday). */
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const BOOKINGS_BY_WEEKDAY: { day: string; bookings: number }[] = WEEKDAYS.map((day, d) => ({
  day,
  bookings: BOOKINGS_BY_DAY_30D.filter((_, i) => (i + 2) % 7 === d).reduce((t, n) => t + n, 0),
}));

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
 * Clients: the app scopes only "New clients" to the range (sample-data, the same
 * 23 as the "New (last 30 days)" segment); Returning, Avg. LTV, Lapsed and both
 * cards read every client on file (412, sample-data SEGMENTS). Referral (9)
 * sits outside the top five, matching the referral program's 9.
 */
const ALL_CLIENTS = SEGMENTS.find((s) => s.label === "All clients")?.clients ?? 0;
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

/** A daily single-series line: 2px line, 10% wash, today's dot, its value called out above. */
function TrendLine({
  values,
  step,
  tick,
  format,
}: {
  values: number[];
  step: number;
  tick: (v: number) => string;
  format: (v: number) => string;
}) {
  const max = Math.ceil(Math.max(...values) / step) * step;
  const ticks = Array.from({ length: max / step + 1 }, (_, i) => i * step);
  const n = values.length;
  const pts = values.map((c, i) => ({ x: (i / (n - 1)) * 100, y: 100 - (c / max) * 100 }));
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
  const area = `${line} L100,100 L0,100 Z`;
  const last = pts[n - 1] ?? { x: 100, y: 100 };

  return (
    <div>
      {/* Today's point is called out above the plot, where it can't sit on the line. */}
      <div className="mb-2 flex items-center justify-end gap-1.5 text-ui-xs text-app-mute">
        <span className="h-2 w-2 rounded-full bg-app-active-fg" />
        Today, {DAYS[n - 1]?.label}
        <span className="font-bold text-app-text tabular-nums">{format(values[n - 1] ?? 0)}</span>
      </div>
      <div className="flex items-start gap-2">
        <div className="relative h-[168px] w-9 shrink-0">
          {ticks.map((t) => (
            <span
              key={t}
              className="absolute right-0 -translate-y-1/2 text-[10.5px] text-app-mute tabular-nums"
              style={{ top: `${100 - (t / max) * 100}%` }}
            >
              {tick(t)}
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
        <TrendLine values={DAY_TOTALS} step={50000} tick={tickUsd} format={(v) => usd(v)} />
      </AppCard>
      <AppCard title="By service" meta={<NarrowMeta lead="Revenue · ">{RANGE_WORD}</NarrowMeta>}>
        <BarsList rows={BY_SERVICE.map((r) => ({ key: r.name, label: r.name, value: r.cents }))} format={(v) => usd(v)} accentFirst />
      </AppCard>
    </div>
  );
}

/**
 * The overview's leaderboard (ScrAnalytics.tsx ArtistsOverview): # · Artist ·
 * Revenue · Tips · Share of busiest, "Revenue + tips · last 30 days". The wider
 * columns (sessions, average, no-show, tip %) live in the full report only.
 */
function ArtistsTab() {
  const busiest = Math.max(...ARTIST_ORDER.map((id) => SESSIONS[id]));
  return (
    <AppCard
      title={
        <span className="flex flex-col leading-tight">
          <span>Artist leaderboard</span>
          <span className="text-ui-xs font-normal text-app-mute">Revenue + tips · {RANGE_WORD}</span>
        </span>
      }
      padded={false}
    >
      <AppTable
        /* Columns join as the card widens, so every one that shows is whole. */
        columns={[
          { label: "#", className: "hidden @min-[360px]:table-cell" },
          { label: "Artist" },
          { label: "Revenue", align: "right" },
          { label: "Tips", align: "right", className: "hidden @min-[300px]:table-cell" },
          { label: "Share of busiest", className: "hidden @min-[520px]:table-cell" },
        ]}
        rows={[...ARTIST_ORDER]
          .sort((a, b) => artistRevenue(b) - artistRevenue(a))
          .map((id, i) => {
            const share = Math.round((SESSIONS[id] / busiest) * 100);
            return {
              key: id,
              cells: [
                <span key="r" className={cn("font-serif text-[17px] italic", i === 0 ? "text-app-active-fg" : "text-app-mute")}>
                  {i + 1}
                </span>,
                <span key="a" className="font-semibold">
                  <ArtistLabel id={id} />
                </span>,
                <span key="v" className="font-bold">
                  {usd(artistRevenue(id))}
                </span>,
                <span key="t" className="font-semibold text-app-success">
                  +{usd(TIPS_CENTS[id])}
                </span>,
                <span key="b" className="flex items-center gap-2">
                  <span className="h-1.5 w-24 overflow-hidden rounded-full bg-graphite/[0.07]">
                    <span className="block h-full rounded-r-[4px] bg-app-active-fg" style={{ width: `${share}%` }} />
                  </span>
                  <span className="text-ui-xs text-app-mute tabular-nums">{share}%</span>
                </span>,
              ],
            };
          })}
        minWidth={200}
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

/** The overview's Bookings tab: "Booking trend" (Daily, the range's total at the right) and "By day of week". */
function BookingsTab() {
  return (
    <div className="grid gap-4 @4xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      <AppCard
        title="Booking trend"
        meta={
          <>
            <span className="hidden @min-[26rem]:inline">Daily · {RANGE_WORD}</span>
            <span className="text-ui-sm font-bold text-app-text tabular-nums">{BOOKINGS_30D}</span>
          </>
        }
      >
        <TrendLine
          values={BOOKINGS_BY_DAY_30D}
          step={2}
          tick={String}
          format={(v) => `${v} booking${v === 1 ? "" : "s"}`}
        />
      </AppCard>
      <AppCard title="By day of week" meta={<NarrowMeta>{RANGE_WORD}</NarrowMeta>}>
        <Columns rows={BOOKINGS_BY_WEEKDAY.map((d) => ({ key: d.day, value: d.bookings }))} />
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
