import React from "react";
import { Download } from "lucide-react";
import { cn } from "@/components/system";
import { FeaturePage } from "@/components/templates/feature-page";
import { AnalyticsScreen } from "@/components/mockups/analytics";
import { AppFrame } from "@/components/mockups/app-frame";
import { AppButton, AppCard, AppKpiStrip } from "@/components/mockups/app-parts";
import { PAYROLL_TIPS_CENTS } from "@/components/mockups/payments";
import { ToolbarSegmented } from "@/components/mockups/projects";
import {
  ARTIST_ORDER,
  BOOKINGS_30D,
  DAILY_REVENUE,
  NO_SHOWS_30D,
  REVENUE_30D_CENTS,
  SEGMENTS,
  SESSIONS_30D,
  usd,
  type ArtistId,
} from "@/components/mockups/sample-data";
import { getFeature } from "@/lib/data/features";
import { PLANS } from "@/lib/data/plans";
import { pageMetadata } from "@/lib/seo";

const feature = getFeature("analytics");

export const metadata = pageMetadata({
  title: feature.seo.title,
  description: feature.seo.description,
  path: "/product/analytics",
});

const PRO = PLANS.find((p) => p.tier === "pro")?.name ?? "Pro";

/*
 * The hero is the Analytics hub (app: /analytics, analytics/_proto/ScrAnalytics.tsx) on its
 * Artists tab: the leaderboard, revenue per artist with sessions, no-shows and tips.
 * The moments are cropped report frames with no sidebar, as on the calendar page, each
 * showing only the cards that prove it, on the same 30-day range (Sep 9 – Oct 8):
 *   moment 1  Revenue (analytics/revenue ScrRevenueReport): Daily/Weekly/Monthly, deposits
 *             and tips collected, the revenue trend
 *   moment 2  Client analytics (analytics/clients ScrClientsReport): the Returning (rebook rate)
 *             and Lapsed KPIs over New vs returning, beside Acquisition source
 *   moment 3  Bookings (analytics/bookings ScrBookingsReport): no-show and fill rate beside
 *             By day of week
 */

/*
 * Figures AnalyticsScreen keeps private (src/components/mockups/analytics.tsx). They are
 * mirrored here exactly so the moments agree with the hub in the hero and with Payments;
 * everything else is read from sample-data.
 */
const DEPOSITS_COLLECTED = { count: 19, cents: 245000 } as const;
const OTHER_TIPS_CENTS: Record<ArtistId, number> = { dev: 129000, mara: 99500, rio: 6000 };
const TIPS_TOTAL_CENTS = ARTIST_ORDER.reduce((t, id) => t + PAYROLL_TIPS_CENTS[id] + OTHER_TIPS_CENTS[id], 0);
const ALL_CLIENTS = SEGMENTS.find((s) => s.label === "All clients")?.clients ?? 0;
const RETURNING = 256;
const RETURNING_PCT = Math.round((RETURNING / ALL_CLIENTS) * 100);
const LAPSED = SEGMENTS.find((s) => s.label === "Inactive 90 days")?.clients ?? 0;
/** Top five sources; Referral (9) sits outside them, matching the referral program's 9. */
const ACQUISITION: { source: string; clients: number }[] = [
  { source: "Instagram", clients: 171 },
  { source: "Walk-in", clients: 94 },
  { source: "Google", clients: 68 },
  { source: "Website", clients: 43 },
  { source: "Other", clients: 27 },
];
/** Bookings in the window by weekday, Mon–Sun: sums to BOOKINGS_30D (69); Thursday holds today's five. */
const BOOKINGS_BY_WEEKDAY: { day: string; bookings: number }[] = [
  { day: "Mon", bookings: 4 },
  { day: "Tue", bookings: 8 },
  { day: "Wed", bookings: 10 },
  { day: "Thu", bookings: 14 },
  { day: "Fri", bookings: 12 },
  { day: "Sat", bookings: 15 },
  { day: "Sun", bookings: 6 },
];
/** Fill rate as the app defines it: completed ÷ all bookings in the range. */
const FILL_PCT = Math.round((SESSIONS_30D / BOOKINGS_30D) * 100);
const DAY_TOTALS = DAILY_REVENUE.map((d) => ARTIST_ORDER.reduce((t, id) => t + d.cents[id], 0));

/** App ratePct: two decimals, or a whole number when it is one ("1.45", "0"). */
function ratePct(numerator: number, denominator: number): string {
  if (denominator <= 0) return "0";
  const rounded = Math.round((numerator / denominator) * 10000) / 100;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2);
}

/** "$1.5k" / "$500" style tick. */
function tickUsd(cents: number): string {
  const dollars = cents / 100;
  return dollars < 1000 ? `$${dollars}` : `$${Number((dollars / 1000).toFixed(1))}k`;
}

/* ─── Chart pieces, drawn as the hub draws them ───────────────────────────── */

const X_TICKS = [0, 7, 14, 21, DAY_TOTALS.length - 1];
const X_TICKS_NARROW = [0, 14, DAY_TOTALS.length - 1];

/** Daily revenue: one 2px line over a 10% wash, today's dot, its value called out above the plot. */
function RevenueTrend() {
  const step = 50000;
  const max = Math.ceil(Math.max(...DAY_TOTALS) / step) * step;
  const ticks = Array.from({ length: max / step + 1 }, (_, i) => i * step);
  const n = DAY_TOTALS.length;
  const pts = DAY_TOTALS.map((c, i) => ({ x: (i / (n - 1)) * 100, y: 100 - (c / max) * 100 }));
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
  const last = pts[n - 1] ?? { x: 100, y: 100 };

  return (
    <div>
      <div className="mb-2 flex items-center justify-end gap-1.5 text-ui-xs text-app-mute">
        <span className="h-2 w-2 rounded-full bg-app-active-fg" />
        Today, {DAILY_REVENUE[n - 1]?.label}
        <span className="font-bold text-app-text tabular-nums">{usd(DAY_TOTALS[n - 1] ?? 0)}</span>
      </div>
      <div className="flex items-start gap-2">
        <div className="relative h-[140px] w-9 shrink-0">
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
          <div className="relative h-[140px]">
            {ticks.map((t) => (
              <span key={t} className="absolute inset-x-0 h-px bg-app-border" style={{ top: `${100 - (t / max) * 100}%` }} />
            ))}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
              <path d={`${line} L100,100 L0,100 Z`} fill="var(--color-app-active-fg)" fillOpacity={0.1} />
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
                  !X_TICKS_NARROW.includes(i) && "hidden @lg:inline",
                )}
                style={{ left: `${pts[i]?.x ?? 0}%` }}
              >
                {DAILY_REVENUE[i]?.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** The hub's BarsCard rows: name and value on one line, a 6px bar under it, the leader rust. */
function BarsList({ rows, accentFirst = false }: { rows: { label: string; value: number }[]; accentFirst?: boolean }) {
  const max = Math.max(...rows.map((r) => r.value), 1);
  return (
    <div className="flex flex-col gap-3">
      {rows.map((r, i) => (
        <div key={r.label}>
          <div className="mb-1.5 flex items-center justify-between gap-3 text-ui-sm">
            <span className="min-w-0 truncate text-app-text">{r.label}</span>
            <span className="shrink-0 font-bold text-app-text tabular-nums">{r.value}</span>
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

/** Columns from a zero baseline, 2px apart, the busiest day rust with its value on the cap. */
function WeekdayColumns() {
  const max = Math.max(...BOOKINGS_BY_WEEKDAY.map((d) => d.bookings));
  return (
    <div>
      <div className="relative flex h-[132px] items-end gap-[2px] border-b border-app-border">
        {BOOKINGS_BY_WEEKDAY.map((d) => (
          <span key={d.day} className="relative flex h-full flex-1 items-end justify-center">
            <span
              className={cn("w-full max-w-6 rounded-t-[4px]", d.bookings === max ? "bg-app-active-fg" : "bg-app-active-fg/45")}
              style={{ height: `${(d.bookings / max) * 86}%` }}
            />
            {d.bookings === max && (
              <span
                className="absolute pb-1 text-ui-sm font-bold text-app-text tabular-nums"
                style={{ bottom: `${(d.bookings / max) * 86}%` }}
              >
                {d.bookings}
              </span>
            )}
          </span>
        ))}
      </div>
      <div className="mt-1.5 flex gap-[2px]">
        {BOOKINGS_BY_WEEKDAY.map((d) => (
          <span key={d.day} className="flex-1 text-center text-[10.5px] text-app-mute">
            {d.day}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── The three report frames ─────────────────────────────────────────────── */

/** Card meta that gives way to the title in the narrowest frames (320 phones), so no title is cut. */
function NarrowMeta({ children }: { children: React.ReactNode }) {
  return <span className="hidden @min-[17rem]:inline">{children}</span>;
}

/** A report page cropped to the cards that prove the moment: no sidebar, the range in the bar. */
function ReportFrame({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <AppFrame active="analytics" sidebar={false} title={title} meta="Last 30 days · Sep 9 – Oct 8" className="shadow-none">
      <div className={cn("flex flex-col gap-3 p-3 @md:gap-4 @md:p-4", className)}>{children}</div>
    </AppFrame>
  );
}

/* Moment 1: the revenue report grouped Daily (Weekly and Monthly beside it), deposits and
   tips collected over the trend, the window's total in the card head. */
function RevenueReport() {
  return (
    <ReportFrame title="Revenue">
      <div className="flex items-center justify-between gap-3">
        <ToolbarSegmented options={["Daily", "Weekly", "Monthly"]} active="Daily" />
        <AppButton icon={Download} className="hidden @sm:inline-flex">
          Export
        </AppButton>
      </div>
      <AppKpiStrip
        items={[
          { label: "Deposits collected", value: usd(DEPOSITS_COLLECTED.cents), note: `${DEPOSITS_COLLECTED.count} deposits` },
          { label: "Tips collected", value: usd(TIPS_TOTAL_CENTS), note: "100% to artists" },
        ]}
      />
      <AppCard
        title="Revenue trend"
        meta={
          <>
            <span className="hidden @min-[26rem]:inline">Daily · last 30 days</span>
            <span className="text-ui-sm font-bold text-app-text tabular-nums">{usd(REVENUE_30D_CENTS)}</span>
          </>
        }
      >
        <RevenueTrend />
      </AppCard>
    </ReportFrame>
  );
}

/* Moment 2: who comes back, and who has lapsed (the hub's Returning and Lapsed KPIs over
   its two cards). Every figure reads all clients on file, as the app's do. */
function ClientsReport() {
  return (
    <ReportFrame title="Client analytics" className="@lg:grid @lg:grid-cols-2">
      <div className="flex min-w-0 flex-col gap-3 @md:gap-4">
        <AppKpiStrip
          items={[
            { label: "Returning", value: `${RETURNING_PCT}%`, note: "rebook rate" },
            { label: "Lapsed", value: String(LAPSED), note: "win-back ready", accent: true },
          ]}
        />
        <AppCard title="New vs returning" meta={<NarrowMeta>All clients</NarrowMeta>} className="flex-1">
          <BarsList
            rows={[
              { label: "Returning", value: RETURNING },
              { label: "First-time", value: ALL_CLIENTS - RETURNING },
            ]}
          />
        </AppCard>
      </div>
      <AppCard title="Acquisition source" meta={<NarrowMeta>All clients</NarrowMeta>}>
        <BarsList rows={ACQUISITION.map((s) => ({ label: s.source, value: s.clients }))} accentFirst />
      </AppCard>
    </ReportFrame>
  );
}

/* Moment 3: how full the book is. The no-show and fill rates beside the busiest weekdays. */
function BookingsReport() {
  return (
    <ReportFrame title="Bookings" className="@lg:grid @lg:grid-cols-[minmax(0,12rem)_minmax(0,1fr)]">
      <AppKpiStrip
        className="@lg:grid-cols-1"
        items={[
          {
            label: "No-show rate",
            value: `${ratePct(NO_SHOWS_30D, BOOKINGS_30D)}%`,
            note: `${NO_SHOWS_30D} of ${BOOKINGS_30D} bookings`,
          },
          { label: "Fill rate", value: `${FILL_PCT}%`, note: `${SESSIONS_30D} completed of ${BOOKINGS_30D}` },
        ]}
      />
      <AppCard
        title="By day of week"
        meta={
          <NarrowMeta>
            <span className="hidden @min-[22rem]:inline">bookings, </span>last 30 days
          </NarrowMeta>
        }
      >
        <WeekdayColumns />
      </AppCard>
    </ReportFrame>
  );
}

export default function AnalyticsPage() {
  return (
    <FeaturePage
      feature={feature}
      headings={{
        moments: "Revenue, rebooks and fill rate",
        details: "What else the reports cover",
        worksWith: "Read from payments and the calendar",
        worksWithLead: "Reports count the payments and bookings the studio already records, so the numbers match what was paid out.",
      }}
      visuals={{
        hero: <AnalyticsScreen tab="artists" />,
        moments: [<RevenueReport key="revenue" />, <ClientsReport key="clients" />, <BookingsReport key="bookings" />],
        detailLabels: [
          { label: "30 days", tone: "quiet" },
          { label: "Instagram", tone: "quiet" },
          { label: "Guest", tone: "info" },
          { label: "Inventory", tone: "quiet" },
          { label: "Export", tone: "quiet" },
          { label: PRO, tone: "ember" },
        ],
      }}
      planRows={[
        { label: "Revenue, artist, client and booking reports", from: "solo" },
        { label: "7, 30 or 90 days, exported as CSV", from: "solo" },
        { label: "Every artist on the leaderboard", from: "studio" },
        { label: "Guest artists beside residents", from: "pro" },
        { label: "Reports across locations", from: "pro" },
      ]}
      inkBand={{ headline: "The numbers behind every chair.", italicWord: "numbers" }}
    />
  );
}
