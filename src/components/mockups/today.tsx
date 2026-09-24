import type React from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CalendarPlus,
  CreditCard,
  Footprints,
  LogIn,
  MessageSquare,
  Plane,
  TriangleAlert,
  Zap,
} from "lucide-react";
import { cn } from "@/components/system/cn";
import { AppFrame } from "./app-frame";
import { AppAvatar, AppButton, AppKpiStrip, AppStatus } from "./app-parts";
import {
  ARTISTS,
  ARTIST_ORDER,
  ARTIST_STATS,
  COMMISSIONS,
  COMMISSIONS_OWED_CENTS,
  DEPOSITS_PENDING,
  DEPOSITS_PENDING_CENTS,
  ELENA_ALLERGY,
  INVENTORY_LOW,
  INVENTORY_SKU,
  NOW,
  REVENUE_TODAY_CENTS,
  REVENUE_YESTERDAY_CENTS,
  TODAY_BOOKINGS,
  TODAY_LABEL,
  TODAY_SESSIONS,
  TRANSACTIONS,
  VIEWER,
  WAITLIST,
  WAITLIST_OFFER_EXPIRES,
  usd,
  type SampleTone,
  type TodaySession,
} from "./sample-data";

/**
 * Today (app route /dashboard, owner lens). Mirrors ScrDashboard's studio view:
 * serif greeting + quick-action pills, the amber allergy band, the KPI strip,
 * the Next up card, Today's schedule (one lane per artist with the rust now
 * line, as TodayScheduleTimelineWidget draws it) and the watchlist cards.
 */

/** "1:30 PM" from minutes past midnight. */
function clock(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

/* ─── Header pills ───────────────────────────────────────────────────────── */

const QUICK_ACTIONS: { label: string; icon: LucideIcon }[] = [
  { label: "New booking", icon: CalendarPlus },
  { label: "Payments", icon: CreditCard },
  { label: "Walk-in", icon: Footprints },
];

function QuickActions({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {QUICK_ACTIONS.map(({ label, icon: Icon }) => (
        <span
          key={label}
          className="inline-flex h-8 items-center gap-1.5 rounded-full border border-app-border bg-app-surface px-3 text-ui-sm font-semibold whitespace-nowrap text-app-text"
        >
          <Icon size={13} strokeWidth={1.8} className="text-app-mute" />
          {label}
        </span>
      ))}
    </div>
  );
}

/* ─── Allergy band (DashWidgets AllergyAlertBand) ────────────────────────── */

const ELENA_SESSION = TODAY_SESSIONS.find((s) => s.flag);

function AllergyBand() {
  if (!ELENA_SESSION) return null;
  return (
    <div className="flex items-start gap-2.5 rounded-app-lg border border-app-warning/25 bg-app-warning-bg px-3.5 py-3 @lg:items-center">
      <TriangleAlert size={16} strokeWidth={1.9} className="mt-px shrink-0 text-app-warning @lg:mt-0" />
      <p className="min-w-0 text-ui-sm leading-snug text-app-warning">
        <span className="font-bold">1 client flagged today.</span>{" "}
        <span className="font-semibold underline underline-offset-2">{ELENA_ALLERGY.client}</span>
        {` — ${ELENA_ALLERGY.flag.toLowerCase()} (${clock(ELENA_SESSION.startMin)}) · review profile before the session.`}
      </p>
    </div>
  );
}

/* ─── Guest banner (ScrDashboard: shown while a residency is active) ─────── */

const RIO = ARTISTS.rio;
/** Rio's spot ends Fri, Oct 9: one day left on Thursday. */
const GUEST_DAYS_LEFT = 1;
/** Bookings during the residency: the Oct 2–4 weekend plus Tuesday's four walk-ins (Guest artists shows the same 13). */
const GUEST_BOOKINGS =
  (ARTIST_STATS.find((s) => s.artist === "rio")?.sessions ?? 0) + TRANSACTIONS.filter((t) => t.artist === "rio" && t.type === "Walk-in").length;

function GuestBanner() {
  if (!RIO.guestSpot) return null;
  return (
    <div className="flex items-start gap-2.5 rounded-app-lg bg-app-active px-3.5 py-2.5 @lg:items-center">
      <Plane size={15} strokeWidth={1.9} className="mt-px shrink-0 text-app-active-fg @lg:mt-0" />
      <p className="min-w-0 flex-1 text-ui-sm leading-snug text-app-text">
        <span className="font-bold">{RIO.name}</span> is guesting ·{" "}
        <span className="font-semibold text-app-active-fg">
          {GUEST_DAYS_LEFT} day{GUEST_DAYS_LEFT === 1 ? "" : "s"} left
        </span>{" "}
        · {GUEST_BOOKINGS} bookings
      </p>
      <span className="hidden shrink-0 items-center gap-1 text-ui-xs font-semibold whitespace-nowrap text-app-active-fg @md:inline-flex">
        Market slots <ArrowRight size={13} strokeWidth={2} />
      </span>
    </div>
  );
}

/* ─── Card shell (DashWidgets WCard) ─────────────────────────────────────── */

function WCard({
  label,
  right,
  padded = true,
  className,
  children,
}: {
  label: React.ReactNode;
  right?: React.ReactNode;
  padded?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex min-w-0 flex-col rounded-app-lg bg-app-surface ring-1 ring-app-border", className)}>
      <div className="flex min-h-10 items-center justify-between gap-2 border-b border-app-border px-4 py-2.5">
        <span className="min-w-0 truncate text-[11px] font-bold tracking-[0.08em] text-app-mute uppercase">{label}</span>
        {right}
      </div>
      <div className={cn("min-w-0 flex-1", padded && "px-4 py-3.5")}>{children}</div>
    </div>
  );
}

function ViewLink({ children }: { children: React.ReactNode }) {
  return <span className="shrink-0 text-[11px] font-semibold whitespace-nowrap text-app-mute">{children}</span>;
}

/* ─── Next up ────────────────────────────────────────────────────────────── */

/** The next booking that hasn't started: Jo K.'s consult at 11:00. */
const NEXT_UP = TODAY_BOOKINGS.find((s) => s.startMin > NOW.minutes);

function NextUpCard() {
  if (!NEXT_UP || !NEXT_UP.client) return null;
  const artist = ARTISTS[NEXT_UP.artist];
  const minutesAway = NEXT_UP.startMin - NOW.minutes;
  const initials = NEXT_UP.client
    .split(" ")
    .map((p) => p[0])
    .join("");
  return (
    <WCard label="Next up" right={<span className="text-ui-sm font-bold text-app-active-fg">in {minutesAway}m</span>}>
      <div className="flex flex-col gap-3 @3xl:flex-row @3xl:items-center @3xl:gap-6">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <AppAvatar initials={initials} tone="neutral" size="lg" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-bold text-app-text">{NEXT_UP.client}</p>
            <p className="text-ui-sm leading-snug text-app-mute">
              {NEXT_UP.detail} · {artist.name}
            </p>
          </div>
          <span className="text-[18px] font-extrabold text-app-text tabular-nums">{NEXT_UP.start}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {NEXT_UP.deposit && (
            <AppStatus tone="success" dot>
              Deposit paid
            </AppStatus>
          )}
          <AppButton icon={Zap} className="h-7 px-2.5 text-ui-xs">
            Briefing
          </AppButton>
          <AppButton icon={LogIn} className="h-7 px-2.5 text-ui-xs">
            Check in
          </AppButton>
          <AppButton icon={MessageSquare} className="hidden h-7 px-2.5 text-ui-xs @md:inline-flex">
            Message
          </AppButton>
        </div>
      </div>
    </WCard>
  );
}

/* ─── Today's schedule: one lane per artist ─────────────────────────────── */

/** The timeline spans the studio's open hours, 10:00 to 5:00. */
const OPEN_MIN = 10 * 60;
const CLOSE_MIN = 17 * 60;
const SPAN = CLOSE_MIN - OPEN_MIN;
const HOURS = Array.from({ length: SPAN / 60 + 1 }, (_, i) => OPEN_MIN + i * 60);
/** Width of the artist-name column, px. Blocks are placed against the rest. */
const NAME_COL = 76;

function pct(min: number): number {
  return ((min - OPEN_MIN) / SPAN) * 100;
}

/** Left offset inside the lane grid, name column included. */
function laneLeft(min: number): string {
  return `calc(${NAME_COL}px + (100% - ${NAME_COL}px) * ${pct(min) / 100})`;
}

function hourLabel(min: number): string {
  const h = Math.floor(min / 60);
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}${h < 12 ? "am" : "pm"}`;
}

const LANE_TINT: Record<SampleTone, { block: string; dot: string }> = {
  ember: { block: "bg-app-active text-app-active-fg", dot: "bg-app-active-fg" },
  info: { block: "bg-app-info-bg text-app-info", dot: "bg-app-info" },
  warning: { block: "bg-app-warning-bg text-app-warning", dot: "bg-app-warning" },
  success: { block: "bg-app-success-bg text-app-success", dot: "bg-app-success" },
  neutral: { block: "bg-graphite/[0.06] text-app-soft", dot: "bg-app-mute" },
};

/**
 * A lane block is its own size container (queries read its content box), so a
 * short one (Sam T.'s 30-minute touch-up) steps down from "Sam T." to "Sam"
 * to "ST" instead of clipping.
 */
function LaneBlock({ s, tone }: { s: TodaySession; tone: SampleTone }) {
  const walkIn = s.kind === "walk-in";
  const client = s.client ?? "";
  const first = client.split(" ")[0];
  const initials = client
    .split(" ")
    .map((p) => p[0])
    .join("");
  return (
    <span
      className={cn(
        "@container absolute top-1.5 bottom-1.5 flex min-w-0 items-center gap-1 overflow-hidden rounded-[5px]",
        s.endMin - s.startMin <= 30 ? "px-1" : "px-1.5",
        walkIn ? "border border-dashed border-app-mute/40 bg-graphite/[0.03] text-app-soft" : LANE_TINT[tone].block,
      )}
      style={{ left: `${pct(s.startMin)}%`, width: `calc(${pct(s.endMin) - pct(s.startMin)}% - 2px)` }}
    >
      {s.flag && <TriangleAlert size={11} strokeWidth={2.2} className="shrink-0 text-app-danger" />}
      <span className="truncate text-[10px] leading-tight font-semibold">
        {walkIn ? (
          `${s.piece} · ${s.slots} slots`
        ) : (
          <>
            <span className="hidden @min-[36px]:inline">{client}</span>
            <span className="hidden @min-[22px]:inline @min-[36px]:hidden">{first}</span>
            <span className="@min-[22px]:hidden">{initials}</span>
          </>
        )}
        {!walkIn && s.endMin - s.startMin >= 150 && <span className="font-medium"> · {s.piece}</span>}
      </span>
    </span>
  );
}

function ScheduleCard() {
  const nowLeft = laneLeft(NOW.minutes);
  return (
    <WCard
      label={
        <>
          Today&apos;s schedule{" "}
          <span className="hidden font-normal tracking-normal text-app-mute normal-case @sm:inline">
            · {ARTIST_ORDER.length} artists · {TODAY_BOOKINGS.length} bookings
          </span>
        </>
      }
      right={
        /* The narrowest frames drop the link so the card label never clips. */
        <span className="hidden @2xs:inline">
          <ViewLink>OPEN CALENDAR →</ViewLink>
        </span>
      }
      padded={false}
    >
      {/* Narrower than 480px the lanes scroll inside the card, as in the app. */}
      <div className="relative">
        <div className="overflow-x-auto overscroll-x-contain">
          <div className="relative min-w-[480px] pt-2 pb-3">
            <div className="relative ml-[76px] h-5">
              {HOURS.map((h) => (
                <span
                  key={h}
                  className="absolute -translate-x-1/2 text-[10px] text-app-mute tabular-nums first:translate-x-0 last:-translate-x-full"
                  style={{ left: `${pct(h)}%` }}
                >
                  {hourLabel(h)}
                </span>
              ))}
            </div>
            <div className="relative">
              {ARTIST_ORDER.map((id, i) => {
                const artist = ARTISTS[id];
                return (
                  <div key={id} className={cn("flex h-10", i % 2 === 1 && "bg-graphite/[0.025]")}>
                    <div className="flex w-[76px] shrink-0 items-center gap-1.5 border-r border-app-border px-2.5">
                      <span className={cn("h-[7px] w-[7px] shrink-0 rounded-full", LANE_TINT[artist.tone].dot)} />
                      <span className="truncate text-[11px] font-semibold text-app-text">{artist.name}</span>
                      {artist.kind === "Guest" && (
                        <span className="rounded-full bg-graphite/[0.07] px-1 text-[10px] leading-[14px] font-bold text-app-mute">
                          G
                        </span>
                      )}
                    </div>
                    <div className="relative flex-1">
                      {TODAY_SESSIONS.filter((s) => s.artist === id).map((s) => (
                        <LaneBlock key={s.id} s={s} tone={artist.tone} />
                      ))}
                    </div>
                  </div>
                );
              })}
              {/* The rust now line, with the time on a pill above the lanes. */}
              <div className="pointer-events-none absolute inset-y-0 z-[2] w-0.5 bg-app-active-fg" style={{ left: nowLeft }}>
                <span className="absolute -top-1 -left-[3.5px] h-[9px] w-[9px] rounded-full bg-app-active-fg" />
              </div>
            </div>
            {/* The time rides under the lanes so it never covers an hour label. */}
            <div className="relative mt-1 h-4">
              <span
                className="absolute -translate-x-1/2 rounded-full bg-app-active-fg px-1.5 text-[10px] leading-4 font-bold text-white tabular-nums"
                style={{ left: nowLeft }}
              >
                {NOW.label}
              </span>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l from-app-surface to-transparent @[528px]:hidden" />
      </div>
    </WCard>
  );
}

/* ─── Watchlist (wide frames only): the DashWidgets cards this studio gets ── */

/** App due label (lib/dashboard/pending-deposits.ts): "Sat · 2 days left" for a booking two days out. */
function dueLabel(booking: string): string {
  const m = /(\w{3}), Oct (\d+)/.exec(booking);
  if (!m) return "";
  const days = Number(m[2]) - 8;
  return days <= 0 ? "today" : `${m[1]} · ${days} day${days === 1 ? "" : "s"} left`;
}

/** The app's serif count ("3 / 4", "2") with its caption. */
function SerifCount({ value, of, caption }: { value: number; of?: number; caption: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-serif text-[30px] leading-none text-app-text italic">
        {value}
        {of !== undefined && <span className="text-[21px] text-app-mute"> / {of}</span>}
      </span>
      <span className="text-ui-sm text-app-mute">{caption}</span>
    </div>
  );
}

const CONSENT_NEEDED = TODAY_BOOKINGS.filter((s) => s.consent !== "not-needed");
const CONSENT_SIGNED = CONSENT_NEEDED.filter((s) => s.consent === "signed");
const CONSENT_UNSIGNED = CONSENT_NEEDED.filter((s) => s.consent === "not-signed");
const WAITING = WAITLIST.filter((w) => w.status === "Active").length;
const OFFERED = WAITLIST.filter((w) => w.status === "Offered").length;
const OFFER_LEFT_MIN = WAITLIST_OFFER_EXPIRES.minutes - NOW.minutes;

function Watchlist() {
  return (
    <div className="hidden gap-4 @3xl:grid @3xl:grid-cols-4">
      {/* PendingDepositsWidget: plain rows (client, due label, amount) that open Payments. */}
      <WCard label="Pending deposits" right={<span className="text-ui font-bold text-app-active-fg tabular-nums">{usd(DEPOSITS_PENDING_CENTS)}</span>}>
        <div className="flex flex-col gap-1">
          {DEPOSITS_PENDING.map((d) => (
            <div key={d.client} className="flex items-start justify-between gap-2.5 py-1">
              <div className="min-w-0">
                <p className="truncate text-ui-sm font-semibold text-app-text">{d.client}</p>
                <p className="text-ui-xs text-app-mute tabular-nums">{dueLabel(d.booking)}</p>
              </div>
              <span className="shrink-0 text-ui-sm font-bold text-app-text tabular-nums">{usd(d.cents)}</span>
            </div>
          ))}
        </div>
      </WCard>
      {/* ConsentStatusWidget: signed of today's total, then the unsigned clients. */}
      <WCard label="Consent status" right={<span className="text-[11px] text-app-mute">Today</span>}>
        <SerifCount value={CONSENT_SIGNED.length} of={CONSENT_NEEDED.length} caption="signed today" />
        {CONSENT_UNSIGNED.length > 0 && (
          <>
            <p className="mt-3.5 mb-1.5 text-[10px] font-bold tracking-[0.1em] text-app-active-fg uppercase">Unsigned</p>
            {CONSENT_UNSIGNED.map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-2 py-1">
                <div className="min-w-0">
                  <p className="truncate text-ui-sm font-semibold text-app-text">{s.client}</p>
                  <p className="text-ui-xs text-app-mute">{TODAY_LABEL.replace("Thursday", "Thu")}</p>
                </div>
                <span className="shrink-0 text-[11px] font-semibold text-app-active-fg">Review →</span>
              </div>
            ))}
          </>
        )}
      </WCard>
      {/* LowInventoryWidget: shown whenever stock is low; name, SKU and on hand / par. */}
      <WCard label="Low inventory" right={<ViewLink>REORDER</ViewLink>}>
        <div className="flex flex-col gap-2.5">
          {INVENTORY_LOW.map((i) => (
            <div key={i.name} className="flex items-start justify-between gap-2.5">
              <div className="min-w-0">
                <p className="text-ui-sm leading-snug font-semibold text-app-text">{i.name}</p>
                <p className="text-[10px] text-app-mute">{INVENTORY_SKU[i.name]}</p>
              </div>
              <span className="shrink-0 text-[11px] font-semibold text-app-active-fg tabular-nums">
                {i.onHand} / {i.reorderAt}
              </span>
            </div>
          ))}
        </div>
      </WCard>
      {/* WaitlistWidget: clients waiting and the soonest live offer. */}
      <WCard label="Waitlist" right={<ViewLink>MANAGE →</ViewLink>}>
        <SerifCount value={WAITING} caption={WAITING === 1 ? "client waiting" : "clients waiting"} />
        {OFFERED > 0 && OFFER_LEFT_MIN > 0 && (
          <p className="mt-1.5 text-ui-xs text-app-mute">
            {OFFERED} live offer{OFFERED === 1 ? "" : "s"} · soonest expires in{" "}
            <span className="whitespace-nowrap">
              {Math.floor(OFFER_LEFT_MIN / 60)}h {OFFER_LEFT_MIN % 60}m
            </span>
          </p>
        )}
      </WCard>
    </div>
  );
}

/* ─── Screen ─────────────────────────────────────────────────────────────── */

export function TodayScreen({ className }: { className?: string }) {
  const inChair = TODAY_BOOKINGS.filter((s) => s.status === "in_progress").length;
  const done = TODAY_BOOKINGS.filter((s) => s.status === "completed").length;
  const ahead = TODAY_BOOKINGS.length - inChair - done;

  return (
    <AppFrame active="today" greeting={VIEWER.greeting} actions={<QuickActions />} className={className}>
      <div className="flex flex-col gap-4 px-4 pb-5 @lg:px-6 @lg:pb-6">
        <QuickActions className="-mt-1 @xl/frame:hidden" />
        <AllergyBand />
        <GuestBanner />
        <AppKpiStrip
          items={[
            { label: "Revenue", value: usd(REVENUE_TODAY_CENTS), note: `vs ${usd(REVENUE_YESTERDAY_CENTS)} yesterday` },
            { label: "Bookings", value: String(TODAY_BOOKINGS.length), plain: `${done} done · ${ahead} ahead`, note: "on the deck today" },
            {
              label: "Deposits pending",
              value: String(DEPOSITS_PENDING.length),
              plain: usd(DEPOSITS_PENDING_CENTS),
              note: "at risk",
              accent: true,
            },
            { label: "Commissions owed", value: usd(COMMISSIONS_OWED_CENTS), note: `${COMMISSIONS.length} pending approval` },
          ]}
        />
        <NextUpCard />
        <ScheduleCard />
        <Watchlist />
      </div>
    </AppFrame>
  );
}
