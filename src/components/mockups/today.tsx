import type React from "react";
import type { LucideIcon } from "lucide-react";
import {
  CalendarPlus,
  CreditCard,
  Footprints,
  LogIn,
  MessageSquare,
  TriangleAlert,
  Zap,
} from "lucide-react";
import { cn } from "@/components/system/cn";
import { AppFrame } from "./app-frame";
import { AppAvatar, AppButton, AppKpiStrip, AppStatus } from "./app-parts";
import {
  ARTISTS,
  ARTIST_ORDER,
  COMMISSIONS,
  COMMISSIONS_OWED_CENTS,
  DEPOSITS_PENDING,
  DEPOSITS_PENDING_CENTS,
  ELENA_ALLERGY,
  NOW,
  REVENUE_TODAY_CENTS,
  REVENUE_YESTERDAY_CENTS,
  TODAY_BOOKINGS,
  TODAY_SESSIONS,
  VIEWER,
  WAITLIST,
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

/* ─── Watchlist (wide frames only) ──────────────────────────────────────── */

function WatchRow({ title, sub, action }: { title: string; sub: string; action: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="min-w-0 flex-1">
        <p className="truncate text-ui-sm font-semibold text-app-text">{title}</p>
        <p className="truncate text-ui-xs text-app-mute">{sub}</p>
      </div>
      <AppButton className="h-7 px-2.5 text-ui-xs">{action}</AppButton>
    </div>
  );
}

const CONSENT_NEEDED = TODAY_BOOKINGS.filter((s) => s.consent !== "not-needed");
const CONSENT_SIGNED = CONSENT_NEEDED.filter((s) => s.consent === "signed");
const CONSENT_OPEN = CONSENT_NEEDED.find((s) => s.consent === "not-signed");
const WAITLIST_OFFERED = WAITLIST.find((w) => w.status === "Offered");

function Watchlist() {
  const owen = DEPOSITS_PENDING[0];
  return (
    <div className="hidden grid-cols-3 gap-4 @3xl:grid">
      <WCard label="Pending deposits" right={<span className="text-ui font-extrabold text-app-text tabular-nums">{usd(DEPOSITS_PENDING_CENTS)}</span>}>
        {owen && <WatchRow title={owen.client} sub={owen.booking} action="Remind" />}
      </WCard>
      <WCard
        label="Consent"
        right={
          <span className="text-ui-xs font-semibold text-app-mute tabular-nums">
            {CONSENT_SIGNED.length} of {CONSENT_NEEDED.length} signed
          </span>
        }
      >
        <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-graphite/[0.06]">
          <div
            className="h-full rounded-full bg-app-success"
            style={{ width: `${(CONSENT_SIGNED.length / CONSENT_NEEDED.length) * 100}%` }}
          />
        </div>
        {CONSENT_OPEN?.client && (
          <WatchRow title={CONSENT_OPEN.client} sub={`${CONSENT_OPEN.piece} · ${clock(CONSENT_OPEN.startMin)}`} action="Send form" />
        )}
      </WCard>
      <WCard label="Waitlist" right={<span className="text-ui-xs font-semibold text-app-mute tabular-nums">{WAITLIST.length} waiting</span>}>
        {WAITLIST_OFFERED && <WatchRow title={WAITLIST_OFFERED.client} sub={WAITLIST_OFFERED.note} action="Open" />}
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
