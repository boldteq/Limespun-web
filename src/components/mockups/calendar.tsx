import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  CalendarRange,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  LayoutGrid,
  List,
  Plus,
  TriangleAlert,
} from "lucide-react";
import { cn } from "@/components/system/cn";
import { AppFrame } from "./app-frame";
import { AppAvatar, AppButton, AppStatus, NowLine, type AppStatusTone } from "./app-parts";
import {
  ARTISTS,
  ARTIST_ORDER,
  DAY_END_MIN,
  DAY_START_MIN,
  NOW,
  TODAY_DATE_LINE,
  TODAY_SESSIONS,
  type ArtistId,
  type TodaySession,
} from "./sample-data";

/**
 * Calendar (app route /calendar). Mirrors calendar/_proto/ScrCalendar.tsx:
 * date pager, Day · Week · Month · Agenda switch, All stations, New booking.
 * Day = one column per chair with the rust now line; Week = day columns of
 * stacked cards (a window around today in narrow frames); Agenda = the next
 * days as a list. Blocks wear the app's status skins (APPT_STATUS): Pending
 * amber, Confirmed neutral, In progress solid rust, Completed green, and the
 * dashed "Walk-in hold".
 */

export type CalendarView = "day" | "week" | "agenda";

type CalState = "pending" | "confirmed" | "in_progress" | "completed" | "hold";

const STATE_LABEL: Record<CalState, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  in_progress: "In progress",
  completed: "Completed",
  hold: "Walk-in hold",
};

/* Opaque fills (colour-mixed into white) so the day grid's hour lines never show through a block. */
const STATE_SKIN: Record<CalState, string> = {
  pending: "bg-app-warning-bg text-app-warning ring-1 ring-app-warning/35 ring-inset",
  confirmed: "bg-[color-mix(in_oklch,var(--color-graphite)_5%,white)] text-app-text ring-1 ring-app-mute/25 ring-inset",
  in_progress: "bg-app-active-fg text-white",
  completed: "bg-app-success-bg text-app-success ring-1 ring-app-success/30 ring-inset",
  hold: "border border-dashed border-app-mute/45 bg-[color-mix(in_oklch,var(--color-graphite)_3%,white)] text-app-soft",
};

const STATE_TONE: Record<CalState, AppStatusTone> = {
  pending: "warning",
  confirmed: "neutral",
  in_progress: "active",
  completed: "success",
  hold: "neutral",
};

function stateOf(s: TodaySession): CalState {
  if (s.kind === "walk-in") return "hold";
  return s.status === "in_progress" || s.status === "completed" || s.status === "pending" ? s.status : "confirmed";
}

/** "1:30" / "1:30 PM" from minutes past midnight. */
function clock(min: number, suffix = false): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")}${suffix ? (h < 12 ? " AM" : " PM") : ""}`;
}

function hourLabel(min: number): string {
  const h = Math.floor(min / 60);
  return `${h % 12 === 0 ? 12 : h % 12} ${h < 12 ? "AM" : "PM"}`;
}

/* ─── Toolbar ────────────────────────────────────────────────────────────── */

const VIEWS: { id: CalendarView | "month"; label: string; icon: LucideIcon }[] = [
  { id: "day", label: "Day", icon: CalendarDays },
  { id: "week", label: "Week", icon: CalendarRange },
  { id: "month", label: "Month", icon: LayoutGrid },
  { id: "agenda", label: "Agenda", icon: List },
];

function Toolbar({ view }: { view: CalendarView }) {
  /* The short date ("Thu, Oct 8") until the frame has room for the long one beside the pager
     (@xl), so the date never truncates; narrow frames also drop the Today pill. The title is
     set in Inter as the app sets it (ScrCalendar.tsx cal-toolbar-title): Instrument Serif's 1
     reads as an l, and "Oct 5 – 11" must not read "ll". Week titles are the app's "Oct 5 – Oct 11". */
  const heading = view === "week" ? { short: "Oct 5 – 11", full: "Oct 5 – Oct 11" } : { short: "Thu, Oct 8", full: TODAY_DATE_LINE };
  const pagerBtn = "flex h-7 w-7 items-center justify-center rounded-app border border-app-border text-app-mute @sm:h-8 @sm:w-8";
  return (
    <div className="flex flex-col gap-3 px-3 pt-4 pb-3 @sm:px-4 @lg:px-5">
      <div className="flex items-center gap-2">
        <span className="min-w-0 flex-1 truncate text-[16px] leading-tight font-semibold tracking-[-0.01em] text-app-text @sm:order-last @sm:ml-1.5 @md:text-[18px]">
          <span className="@xl:hidden">{heading.short}</span>
          <span className="hidden @xl:inline">{heading.full}</span>
        </span>
        <span className="flex shrink-0 items-center gap-1.5 @sm:gap-2">
          <span className={pagerBtn}>
            <ChevronLeft size={15} strokeWidth={1.8} />
          </span>
          <span className="hidden h-8 items-center rounded-app bg-graphite/[0.05] px-3 text-ui-sm font-semibold text-app-text @sm:inline-flex">
            Today
          </span>
          <span className={pagerBtn}>
            <ChevronRight size={15} strokeWidth={1.8} />
          </span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex rounded-app bg-graphite/[0.05] p-0.5">
          {VIEWS.map(({ id, label, icon: Icon }) => (
            <span
              key={id}
              className={cn(
                "inline-flex h-7 items-center gap-1.5 rounded-[6px] px-2 text-ui-sm font-medium @sm:px-2.5",
                id === view ? "bg-app-surface font-semibold text-app-text shadow-[0_1px_2px_rgba(28,25,23,0.08)]" : "text-app-soft",
                id === "month" && "hidden @xl:inline-flex",
              )}
            >
              <Icon size={13} strokeWidth={1.8} className="hidden text-app-mute @md:block" />
              {label}
            </span>
          ))}
        </div>
        <span className="hidden h-8 items-center gap-6 rounded-app border border-app-border px-2.5 text-ui-sm text-app-text @2xl:inline-flex">
          All stations
          <ChevronDown size={13} strokeWidth={1.8} className="text-app-mute" />
        </span>
        <span className="hidden h-8 w-8 items-center justify-center rounded-app border border-app-border text-app-mute @2xl:flex">
          <Download size={14} strokeWidth={1.8} />
        </span>
        {/* Icon-only below @sm, "New" to @md, then the full label. */}
        <AppButton variant="primary" icon={Plus} className="ml-auto h-7 w-7 px-0 @sm:h-8 @sm:w-auto @sm:px-3">
          <span className="hidden @sm:inline @md:hidden">New</span>
          <span className="hidden @md:inline">New booking</span>
        </AppButton>
      </div>
    </div>
  );
}

/* ─── Day: one column per chair ──────────────────────────────────────────── */

const SPAN = DAY_END_MIN - DAY_START_MIN;
const HOURS = Array.from({ length: SPAN / 60 }, (_, i) => DAY_START_MIN + i * 60);
/** Pixels per hour on the day grid. */
const HOUR_PX = 44;

/** Client name with the allergy flag glued to its last word, so a wrap never strands the icon. */
function NameLine({ name, flag, className, iconClassName }: { name: string; flag?: boolean; className?: string; iconClassName?: string }) {
  return (
    <p className={cn("break-words", className)}>
      {name}
      {flag && (
        <>
          {"\u00a0"}
          <TriangleAlert size={11} strokeWidth={2.2} className={cn("inline-block align-[-1px]", iconClassName)} />
        </>
      )}
    </p>
  );
}

function DayBlock({ s }: { s: TodaySession }) {
  const state = stateOf(s);
  const minutes = s.endMin - s.startMin;
  const top = ((s.startMin - DAY_START_MIN) / 60) * HOUR_PX;
  const height = (minutes / 60) * HOUR_PX - 4;
  const title = s.client ?? s.piece;
  /* Narrow chairs get the short line; @md frames add the session, time and state. Lines wrap
     rather than clip; the blocks are tall enough for it. Solid status colours only (no opacity). */
  const short = s.kind === "walk-in" ? `${s.slots} slots` : s.piece;
  const sub = s.kind === "walk-in" ? `Guest day · ${s.slots} slots` : s.piece;
  return (
    <div
      className={cn(
        "absolute inset-x-0.5 z-[3] overflow-hidden rounded-app px-1 @2xs:px-1.5 @sm:inset-x-1 @sm:px-2",
        minutes > 30 ? "py-1.5" : "py-0.5",
        STATE_SKIN[state],
      )}
      style={{ top: top + 2, height }}
    >
      {minutes > 30 ? (
        <>
          <NameLine
            name={title}
            flag={Boolean(s.flag)}
            className="text-[11px] leading-tight font-semibold"
            iconClassName={state === "in_progress" ? "text-white" : "text-app-danger"}
          />
          {/* In the narrowest frames an hour block keeps just the name (two lines don't fit). */}
          <p className={cn("mt-px text-[10px] leading-snug font-medium break-words", minutes <= 60 && "hidden @2xs:block")}>
            <span className="@md:hidden">{short}</span>
            <span className="hidden @md:inline">{sub}</span>
          </p>
          {s.session && minutes >= 120 && (
            <p className="hidden text-[10px] leading-snug font-medium @md:block">
              Session {s.session.n} of {s.session.of}
            </p>
          )}
          {minutes >= 120 && (
            <p className="mt-0.5 hidden flex-wrap gap-x-1.5 text-[10px] leading-snug font-medium @md:flex">
              <span className="tabular-nums">
                {clock(s.startMin)}–{clock(s.endMin)}
              </span>
              <span>{STATE_LABEL[state]}</span>
            </p>
          )}
        </>
      ) : (
        <p className="truncate text-[10px] leading-[16px]">
          <span className="font-semibold">{title}</span>
          <span className="hidden font-medium @md:inline"> · {s.piece}</span>
        </p>
      )}
    </div>
  );
}

/** Below @sm the chair head stacks the avatar over the name, so "Mara" never clips. */
function ChairHead({ id }: { id: ArtistId }) {
  const a = ARTISTS[id];
  return (
    <div className="flex min-w-0 flex-col items-center gap-1 border-l border-app-border px-1 py-2 @sm:flex-row @sm:gap-2 @sm:px-2 @sm:py-2.5 @lg:px-3">
      <AppAvatar initials={a.initials} tone={a.tone} size="sm" />
      <span className="max-w-full truncate text-[11px] font-semibold text-app-text @sm:text-ui-sm">{a.name}</span>
      {a.kind === "Guest" && (
        <span className="hidden rounded-full bg-app-warning-bg px-1.5 text-[10px] leading-4 font-semibold text-app-warning @md:inline">
          Guest
        </span>
      )}
    </div>
  );
}

/** Time gutter + three chairs; the gutter narrows in small frames to give the chairs room. */
const DAY_COLS =
  "grid-cols-[34px_repeat(3,minmax(0,1fr))] @2xs:grid-cols-[38px_repeat(3,minmax(0,1fr))] @sm:grid-cols-[44px_repeat(3,minmax(0,1fr))]";

function DayView() {
  const nowTop = `${((NOW.minutes - DAY_START_MIN) / SPAN) * 100}%`;
  return (
    <div className="mx-3 mb-3 overflow-hidden rounded-app-lg ring-1 ring-app-border @sm:mx-4 @sm:mb-4 @lg:mx-5 @lg:mb-5">
      <div className={cn("grid border-b border-app-border bg-app-surface", DAY_COLS)}>
        <span />
        {ARTIST_ORDER.map((id) => (
          <ChairHead key={id} id={id} />
        ))}
      </div>
      <div className={cn("relative grid", DAY_COLS)} style={{ height: HOURS.length * HOUR_PX }}>
        <div className="relative">
          {HOURS.map((h, i) => (
            // The top row's label sits just inside the grid instead of centred on its edge.
            <span
              key={h}
              className={cn(
                "absolute right-1 text-[10px] whitespace-nowrap text-app-mute tabular-nums @sm:right-1.5",
                i === 0 ? "top-1" : "-translate-y-1/2",
              )}
              style={i === 0 ? undefined : { top: i * HOUR_PX }}
            >
              {hourLabel(h)}
            </span>
          ))}
        </div>
        {ARTIST_ORDER.map((id) => (
          <div
            key={id}
            className="relative border-l border-app-border bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_43px,var(--color-app-border)_43px,var(--color-app-border)_44px)]"
          >
            {TODAY_SESSIONS.filter((s) => s.artist === id).map((s) => (
              <DayBlock key={s.id} s={s} />
            ))}
          </div>
        ))}
        <NowLine time={NOW.label} top={nowTop} />
      </div>
    </div>
  );
}

/* ─── Week: day columns of cards ─────────────────────────────────────────── */

interface WeekCard {
  client: string;
  artist: ArtistId;
  from: number;
  to: number;
  state: CalState;
  flag?: boolean;
  /**
   * Rio's walk-in flash block. Open walk-in slots aren't bookings yet (today's
   * and Friday's), so they stay out of the day's count; a walk-in who sat gets a
   * booking in the app, so a past block carries `bookings` (Tuesday's four).
   */
  walkIn?: boolean;
  bookings?: number;
}

/**
 * The week of Mon, Oct 5. Tuesday and Wednesday match the Payments ledger and
 * Appointments (Tomás V. and Rio's four walk-ins, paid 12:50–3:05 PM, on Tue:
 * five bookings; Bea L. on Wed);
 * Thursday is today; Friday is the last day of Rio's guest spot; Owen P.'s
 * Saturday booking waits on its deposit, so it's Pending.
 */
const WEEK: { label: string; day: string; num: number; today?: boolean; cards: WeekCard[] }[] = [
  { label: "Mon", day: "Monday", num: 5, cards: [] },
  {
    label: "Tue",
    day: "Tuesday",
    num: 6,
    cards: [
      { client: "4 walk-ins", artist: "rio", from: 720, to: 900, state: "completed", walkIn: true, bookings: 4 },
      { client: "Tomás V.", artist: "dev", from: 780, to: 1020, state: "completed" },
    ],
  },
  { label: "Wed", day: "Wednesday", num: 7, cards: [{ client: "Bea L.", artist: "dev", from: 720, to: 990, state: "completed" }] },
  {
    label: "Thu",
    day: "Thursday",
    num: 8,
    today: true,
    cards: [...TODAY_SESSIONS]
      .sort((a, b) => a.startMin - b.startMin)
      .map((s) => ({
        client: s.client ?? "Walk-in flash",
        artist: s.artist,
        from: s.startMin,
        to: s.endMin,
        state: stateOf(s),
        flag: Boolean(s.flag),
        walkIn: s.kind === "walk-in",
      })),
  },
  { label: "Fri", day: "Friday", num: 9, cards: [{ client: "Walk-in flash", artist: "rio", from: 720, to: 1020, state: "hold", walkIn: true }] },
  { label: "Sat", day: "Saturday", num: 10, cards: [{ client: "Owen P.", artist: "dev", from: 780, to: 960, state: "pending" }] },
  { label: "Sun", day: "Sunday", num: 11, cards: [] },
];

/**
 * Which days a frame shows, so today is always in view without a sideways scroll:
 * Wed–Fri below @md, Tue–Sat to @3xl, the full week from there. `edge` puts the
 * divider on every column but the first one showing.
 */
const WEEK_WINDOW: { show: string; edge: string }[] = [
  { show: "hidden @3xl:flex", edge: "" },
  { show: "hidden @md:flex", edge: "@3xl:border-l" },
  { show: "flex", edge: "@md:border-l" },
  { show: "flex", edge: "border-l" },
  { show: "flex", edge: "border-l" },
  { show: "hidden @md:flex", edge: "border-l" },
  { show: "hidden @3xl:flex", edge: "border-l" },
];

function WeekView() {
  return (
    <div className="mx-3 mb-3 overflow-hidden rounded-app-lg ring-1 ring-app-border @sm:mx-4 @sm:mb-4 @lg:mx-5 @lg:mb-5">
      <div className="grid grid-cols-3 @md:grid-cols-5 @3xl:grid-cols-7">
        {WEEK.map((d, i) => {
          const bookings = d.cards.reduce((total, c) => total + (c.bookings ?? (c.walkIn ? 0 : 1)), 0);
          return (
            <div key={d.num} className={cn("min-h-[300px] min-w-0 flex-col border-app-border", WEEK_WINDOW[i].show, WEEK_WINDOW[i].edge)}>
              <div className={cn("border-b border-app-border px-1.5 py-2.5 text-center", d.today && "bg-app-active")}>
                <p className={cn("text-[11px] font-bold uppercase", d.today ? "text-app-active-fg" : "text-app-mute")}>{d.label}</p>
                <p className={cn("text-[18px] leading-tight font-bold tabular-nums", d.today ? "text-app-active-fg" : "text-app-text")}>{d.num}</p>
                <p className="text-[10px] text-app-mute">{bookings > 0 ? `${bookings} booking${bookings > 1 ? "s" : ""}` : "\u00a0"}</p>
              </div>
              <div className="flex flex-col gap-1.5 p-1 @md:p-1.5">
                {d.cards.map((c) => (
                  <div key={`${c.client}-${c.from}`} className={cn("rounded-app px-1.5 py-1.5 @md:px-2", STATE_SKIN[c.state])}>
                    <NameLine
                      name={c.client}
                      flag={c.flag}
                      className="text-[11px] leading-tight font-semibold"
                      iconClassName="text-app-danger"
                    />
                    <p className="mt-px text-[10px] leading-snug font-medium tabular-nums">
                      {clock(c.from)}–{clock(c.to)}
                    </p>
                    <p className="text-[10px] leading-snug font-medium">{ARTISTS[c.artist].name}</p>
                  </div>
                ))}
                {d.cards.length === 0 && <p className="mt-3 text-center text-[11px] text-app-mute">No bookings</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Agenda: the coming days as a list ──────────────────────────────────── */

function AgendaView() {
  const days = WEEK.filter((d) => d.num >= 8 && d.cards.length > 0);
  return (
    <div className="flex flex-col gap-4 px-3 pb-4 @sm:px-4 @sm:pb-5 @lg:px-5">
      {days.map((d) => (
        <div key={d.num}>
          <p className="mb-2 flex items-baseline gap-2 text-[11px] font-bold tracking-[0.08em] text-app-mute uppercase">
            {d.today ? "Today" : d.day}
            <span className="font-medium tracking-normal normal-case">
              {d.today ? `${d.label}, ` : ""}Oct {d.num}
            </span>
          </p>
          <div className="divide-y divide-app-border overflow-hidden rounded-app-lg bg-app-surface ring-1 ring-app-border">
            {d.cards.map((c) => {
              const artist = ARTISTS[c.artist];
              return (
                <div key={`${c.client}-${c.from}`} className="flex items-start gap-3 px-3.5 py-2.5 @sm:items-center">
                  <span className="flex w-[68px] shrink-0 flex-col leading-tight">
                    <span className="text-ui-sm font-semibold text-app-text tabular-nums">{clock(c.from, true)}</span>
                    <span className="text-ui-xs text-app-mute tabular-nums">to {clock(c.to, true)}</span>
                  </span>
                  {/* Below @sm the status sits under the name, so the name keeps the row's width. */}
                  <div className="min-w-0 flex-1">
                    <NameLine name={c.client} flag={c.flag} className="text-ui-sm leading-tight font-semibold text-app-text" iconClassName="text-app-danger" />
                    <p className="mt-0.5 text-ui-xs leading-tight text-app-mute">
                      {artist.name}
                      {artist.kind === "Guest" ? " · guest" : ""}
                    </p>
                    <AppStatus tone={STATE_TONE[c.state]} dot={c.state !== "in_progress"} className="mt-1.5 @sm:hidden">
                      {STATE_LABEL[c.state]}
                    </AppStatus>
                  </div>
                  <AppStatus tone={STATE_TONE[c.state]} dot={c.state !== "in_progress"} className="hidden @sm:inline-flex">
                    {STATE_LABEL[c.state]}
                  </AppStatus>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export function CalendarScreen({ view = "day", className }: { view?: CalendarView; className?: string }) {
  return (
    <AppFrame active="calendar" className={className}>
      <Toolbar view={view} />
      {view === "day" && <DayView />}
      {view === "week" && <WeekView />}
      {view === "agenda" && <AgendaView />}
    </AppFrame>
  );
}
