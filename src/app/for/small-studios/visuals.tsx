import type React from "react";
import {
  CalendarDays,
  CalendarRange,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Lock,
  Mail,
  Menu,
  MessageSquare,
  Plus,
  Search,
  TriangleAlert,
} from "lucide-react";
import { AppShellPhone, SampleTag, Toast, cn } from "@/components/system";
import { AppFrame } from "@/components/mockups/app-frame";
import { AppAvatar, AppButton, AppStatus, NowLine } from "@/components/mockups/app-parts";
import {
  ARTISTS,
  COMMISSIONS,
  DAY_END_MIN,
  DAY_START_MIN,
  NOW,
  PAYOUT_WEEK,
  THREADS,
  TODAY_DATE_LINE,
  TODAY_SESSIONS,
  UNREAD_THREADS,
  WEEK_PAYOUTS,
  payRuleLabel,
  usd,
  type ArtistId,
  type Thread,
  type TodaySession,
} from "@/components/mockups/sample-data";

/*
 * Screens for /for/small-studios, from the sample studio as it runs on Studio: Dev and Mara,
 * both residents. Rio is left out everywhere on this page because guest seats need Pro.
 * Wording is the app's (InkOS calendar/_proto/ScrCalendar.tsx, payments/_proto,
 * messages/_proto); numbers are derived from sample-data.ts, never typed.
 */

const RESIDENTS: ArtistId[] = ["dev", "mara"];
const isResident = (id: ArtistId) => RESIDENTS.includes(id);

/** "1:30" from minutes past midnight, the calendar mockup's 12-hour clock. */
function clock(min: number): string {
  const h = Math.floor(min / 60);
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(min % 60).padStart(2, "0")}`;
}

/* ─── A staff screen on a phone ───────────────────────────────────────────── */

/** The app's top bar over the work area, as the app lays a screen out behind its drawer. */
function StaffPhone({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <AppShellPhone className={className}>
      <div className="flex h-[440px] flex-col text-left">
        <div className="flex h-10 shrink-0 items-center gap-2 border-b border-app-border px-3">
          <Menu size={14} strokeWidth={1.8} className="shrink-0 text-app-mute" />
          <span className="min-w-0 flex-1 truncate text-[12px] font-semibold text-app-text">{title}</span>
          <SampleTag className="px-1.5 text-[10px]" />
        </div>
        <div data-body className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden px-3 pt-3 pb-3.5">
          {children}
        </div>
      </div>
    </AppShellPhone>
  );
}

function SmallLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-[10px] font-bold tracking-[0.08em] text-app-mute uppercase", className)}>{children}</p>;
}

/* ─── Hero: two chairs, and a move onto a taken one ─────────────────────────
   Priya S. (Mara, 1:00–3:00) dragged onto Dev at 12:00 lands on Asha M.'s koi session.
   The app's move check prints "Clashes with <client> on <chair>" and refuses the move,
   worded as /product/calendar words the same event. */

const HOUR_PX = 44;
const SPAN = DAY_END_MIN - DAY_START_MIN;
const HOURS = Array.from({ length: SPAN / 60 }, (_, i) => DAY_START_MIN + i * 60);
const DAY = TODAY_SESSIONS.filter((s) => isResident(s.artist));
const MOVED_BACK = "priya-florals";
const PRIYA = DAY.find((s) => s.id === MOVED_BACK);
/** Where the drag lands: Dev's chair at 12:00, for Priya's two hours. */
const DROP_MIN = 12 * 60;
const DROP_CLASH = DAY.filter((s) => s.artist === "dev")
  .sort((a, b) => a.startMin - b.startMin)
  .find((s) => s.startMin < DROP_MIN + (PRIYA ? PRIYA.endMin - PRIYA.startMin : 120) && s.endMin > DROP_MIN);

function hourLabel(min: number): string {
  const h = Math.floor(min / 60);
  return `${h % 12 === 0 ? 12 : h % 12} ${h < 12 ? "AM" : "PM"}`;
}

/* The app's block skins (APPT_STATUS): In progress solid rust, Confirmed neutral. */
function blockSkin(s: TodaySession): string {
  return s.status === "in_progress"
    ? "bg-app-active-fg text-white"
    : "bg-[color-mix(in_oklch,var(--color-graphite)_5%,white)] text-app-text ring-1 ring-app-mute/25 ring-inset";
}

function DayBlock({ s }: { s: TodaySession }) {
  const minutes = s.endMin - s.startMin;
  const top = ((s.startMin - DAY_START_MIN) / 60) * HOUR_PX;
  const moved = s.id === MOVED_BACK;
  return (
    <div
      className={cn(
        "absolute inset-x-1 z-[3] overflow-hidden rounded-app px-1.5 @md:inset-x-1.5 @md:px-2.5",
        minutes > 30 ? "py-1.5" : "py-0.5",
        blockSkin(s),
        moved && "ring-2 ring-app-active-fg ring-inset",
      )}
      style={{ top: top + 2, height: (minutes / 60) * HOUR_PX - 4 }}
    >
      {minutes > 30 ? (
        <>
          <p className="text-[11px] leading-tight font-semibold break-words">
            {s.client}
            {s.flag && (
              <>
                {" "}
                <TriangleAlert size={11} strokeWidth={2.2} className="inline-block align-[-1px] text-app-danger" />
              </>
            )}
          </p>
          <p className="mt-px text-[10px] leading-snug font-medium break-words">
            {s.piece}
            {s.session && <span className="hidden @md:inline"> · session {s.session.n} of {s.session.of}</span>}
          </p>
          {minutes >= 120 && (
            <p className="mt-0.5 hidden text-[10px] leading-snug font-medium tabular-nums @md:block">
              {clock(s.startMin)}–{clock(s.endMin)}
              {s.status === "in_progress" ? " · In progress" : " · Confirmed"}
            </p>
          )}
        </>
      ) : (
        <p className="truncate text-[10px] leading-[16px]">
          <span className="font-semibold">{s.client}</span>
          <span className="hidden font-medium @md:inline"> · {s.piece}</span>
        </p>
      )}
    </div>
  );
}

const VIEWS = [
  { label: "Day", icon: CalendarDays },
  { label: "Week", icon: CalendarRange },
  { label: "Month", icon: LayoutGrid },
  { label: "Agenda", icon: List },
];

const DAY_COLS = "grid-cols-[34px_repeat(2,minmax(0,1fr))] @sm:grid-cols-[46px_repeat(2,minmax(0,1fr))]";

function TwoChairDay() {
  return (
    <AppFrame active="calendar">
      <div className="flex flex-col gap-3 px-3 pt-4 pb-3 @sm:px-4 @lg:px-5">
        <div className="flex items-center gap-2">
          <span className="flex shrink-0 items-center gap-1.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-app border border-app-border text-app-mute">
              <ChevronLeft size={15} strokeWidth={1.8} />
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-app border border-app-border text-app-mute">
              <ChevronRight size={15} strokeWidth={1.8} />
            </span>
          </span>
          <span className="min-w-0 flex-1 truncate font-serif text-[22px] leading-none text-app-text italic">
            <span className="@md:hidden">Thu, Oct 8</span>
            <span className="hidden @md:inline">{TODAY_DATE_LINE}</span>
          </span>
          <div className="hidden rounded-app bg-graphite/[0.05] p-0.5 @xl:flex">
            {VIEWS.map(({ label, icon: Icon }) => (
              <span
                key={label}
                className={cn(
                  "inline-flex h-7 items-center gap-1.5 rounded-[6px] px-2.5 text-ui-sm font-medium",
                  label === "Day" ? "bg-app-surface font-semibold text-app-text shadow-[0_1px_2px_rgba(28,25,23,0.08)]" : "text-app-soft",
                )}
              >
                <Icon size={13} strokeWidth={1.8} className="text-app-mute" />
                {label}
              </span>
            ))}
          </div>
          <AppButton variant="primary" icon={Plus} className="h-7 w-7 px-0 @md:h-8 @md:w-auto @md:px-3">
            <span className="hidden @md:inline">New booking</span>
          </AppButton>
        </div>
      </div>

      <div className="mx-3 mb-3 overflow-hidden rounded-app-lg ring-1 ring-app-border @sm:mx-4 @sm:mb-4 @lg:mx-5 @lg:mb-5">
        <div className={cn("grid border-b border-app-border bg-app-surface", DAY_COLS)}>
          <span />
          {RESIDENTS.map((id) => (
            <div key={id} className="flex min-w-0 items-center gap-2 border-l border-app-border px-2 py-2.5 @lg:px-3">
              <AppAvatar initials={ARTISTS[id].initials} tone={ARTISTS[id].tone} size="sm" />
              <span className="min-w-0">
                <span className="block truncate text-ui-sm font-semibold text-app-text">{ARTISTS[id].name}</span>
                <span className="hidden truncate text-ui-xs text-app-mute @md:block">{payRuleLabel(ARTISTS[id].pay)}</span>
              </span>
            </div>
          ))}
        </div>
        <div className={cn("relative grid", DAY_COLS)} style={{ height: HOURS.length * HOUR_PX }}>
          <div className="relative">
            {HOURS.map((h, i) => (
              <span
                key={h}
                className="absolute right-1 -translate-y-1/2 text-[10px] whitespace-nowrap text-app-mute tabular-nums @sm:right-1.5"
                style={{ top: i * HOUR_PX }}
              >
                {i === 0 ? "" : hourLabel(h)}
              </span>
            ))}
          </div>
          {RESIDENTS.map((id) => (
            <div
              key={id}
              className="relative border-l border-app-border bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_43px,var(--color-app-border)_43px,var(--color-app-border)_44px)]"
            >
              {DAY.filter((s) => s.artist === id).map((s) => (
                <DayBlock key={s.id} s={s} />
              ))}
            </div>
          ))}
          <NowLine time={NOW.label} top={`${((NOW.minutes - DAY_START_MIN) / SPAN) * 100}%`} />
        </div>
      </div>
    </AppFrame>
  );
}

/** The day with both chairs, and the toast a refused drag leaves. On phones the day fades out after Priya's 1:00. */
export function StudioDayHero() {
  return (
    <div className="flex flex-col">
      <div className="max-sm:max-h-[430px] max-sm:overflow-hidden max-sm:[mask-image:linear-gradient(to_bottom,#000_calc(100%-80px),transparent)]">
        <TwoChairDay />
      </div>
      <Toast
        tone="flag"
        icon={<TriangleAlert size={16} strokeWidth={2.2} />}
        title={`Clashes with ${DROP_CLASH?.client ?? "Asha M."} on ${ARTISTS.dev.name}`}
        body={`Move refused. ${PRIYA?.client ?? "Priya S."} stays with ${ARTISTS.mara.name} at ${PRIYA ? clock(PRIYA.startMin) : "1:00"}.`}
        className="relative z-10 mx-auto -mt-10 w-[calc(100%-1.5rem)] sm:mr-8 sm:ml-auto sm:w-full"
      />
    </div>
  );
}

/* ─── Week 1: the Reschedule sheet refuses a taken slot ─────────────────────
   Priya's 2-hour session, station switched to Dev. At 1:00 it overlaps Elena R.
   (1:30–4:00), so the app prints "Clashes with <client> on <station>. Pick another
   slot." and Move stays off. Slots run 9:00–4:00 every half hour; a slot is taken
   when the 2-hour block overlaps anything on Dev's chair. */

const BLOCK = PRIYA ? PRIYA.endMin - PRIYA.startMin : 120;
const SLOTS = Array.from({ length: (DAY_END_MIN - BLOCK - DAY_START_MIN) / 30 + 1 }, (_, i) => DAY_START_MIN + i * 30);
const DEV_DAY = DAY.filter((s) => s.artist === "dev");
const takenOnDev = (start: number) => DEV_DAY.some((s) => s.startMin < start + BLOCK && s.endMin > start);
const PICKED = PRIYA?.startMin ?? 780;
const CLASH = DEV_DAY.find((s) => s.startMin < PICKED + BLOCK && s.endMin > PICKED);

export function ReschedulePhone() {
  return (
    <StaffPhone title="Calendar" className="[&_[data-body]]:gap-2">
      <div>
        <p className="text-[15px] leading-tight font-bold text-app-text">Reschedule · Priya</p>
        <p className="mt-0.5 text-[10px] leading-snug text-app-mute">
          Currently {ARTISTS.mara.name} · {clock(PICKED)}–{clock(PICKED + BLOCK)}. Pick a new day, station, or time.
        </p>
      </div>
      <div>
        <SmallLabel className="mb-1">Date</SmallLabel>
        {/* One line of whole chips: a chip that doesn't fit wraps out of sight */}
        <div className="flex h-[25px] flex-wrap gap-1.5 overflow-hidden">
          {["Same day", "Fri, Oct 9", "Sat, Oct 10"].map((d, i) => (
            <span
              key={d}
              className={cn(
                "h-[25px] shrink-0 rounded-app px-2 text-[10.5px] leading-[25px] font-semibold whitespace-nowrap",
                i === 0 ? "bg-app-text text-white" : "text-app-text ring-1 ring-app-border",
              )}
            >
              {d}
            </span>
          ))}
        </div>
      </div>
      <div>
        <SmallLabel className="mb-1">Station</SmallLabel>
        <div className="grid grid-cols-2 gap-1.5">
          {RESIDENTS.map((id) => (
            <span
              key={id}
              className={cn(
                "rounded-app py-1 text-center text-[11px] font-semibold",
                id === "dev" ? "bg-app-text text-white" : "text-app-text ring-1 ring-app-border",
              )}
            >
              {ARTISTS[id].name}
            </span>
          ))}
        </div>
      </div>
      <div>
        <SmallLabel className="mb-1">
          Start time <span className="font-medium tracking-normal normal-case">· {BLOCK / 60} hr block</span>
        </SmallLabel>
        <div className="grid grid-cols-5 gap-1">
          {SLOTS.map((m) => {
            const on = m === PICKED;
            const taken = takenOnDev(m);
            return (
              <span
                key={m}
                className={cn(
                  "rounded-[6px] py-[3px] text-center text-[10px] font-semibold tabular-nums",
                  on ? "bg-app-text text-white" : taken ? "bg-graphite/[0.05] text-app-mute line-through decoration-app-mute/50" : "text-app-text ring-1 ring-app-border",
                )}
              >
                {clock(m)}
              </span>
            );
          })}
        </div>
      </div>
      {CLASH && (
        <div className="flex items-start gap-1.5 rounded-app border border-app-active-fg/35 bg-app-active px-2 py-1.5">
          <TriangleAlert size={12} strokeWidth={2.2} className="mt-px shrink-0 text-app-active-fg" />
          <p className="text-[10.5px] leading-snug text-app-text">
            Clashes with <span className="font-bold">{CLASH.client}</span> on {ARTISTS.dev.name}. Pick another slot.
          </p>
        </div>
      )}
      <p className="flex items-center gap-1.5 text-[10px] text-app-text">
        <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[4px] bg-app-active-fg text-white">
          <Check size={9} strokeWidth={3.2} />
        </span>
        Tell the client the new time
      </p>
      <div className="mt-auto flex justify-end gap-1.5">
        <AppButton className="h-7 px-2.5 text-[10.5px]">Cancel</AppButton>
        {/* Move stays off while the slot clashes */}
        <AppButton variant="ghost" className="h-7 bg-graphite/[0.07] px-2.5 text-[10.5px] text-app-soft">
          Move to {clock(PICKED)}
        </AppButton>
      </div>
    </StaffPhone>
  );
}

/* ─── Week 2: Payments › Commissions, a row per artist ──────────────────────
   The app's Commissions table (payments/_proto/ScrPayments.tsx PaymentsCommissions):
   Artist · Sessions · Gross · Commission · Status, with Approve on a pending row. On
   Studio the team is Dev and Mara, so the screen is framed by artist, not by a studio
   total: Dev's two sessions this week wait for approval (his share of the sample
   studio's pending records), and last payout week's rows are paid. Mara rents her
   booth, so her row is her takings less the rent. */

const DEV_PENDING = COMMISSIONS.filter((c) => c.artist === "dev" && c.status === "Pending approval");
const DEV_PENDING_CENTS = DEV_PENDING.reduce((total, c) => total + c.artistCents, 0);
const DEV_PENDING_GROSS_CENTS = DEV_PENDING.reduce((total, c) => total + c.serviceCents, 0);
const DEV_PAY = ARTISTS.dev.pay;
/** "60% of $1,500", the way WEEK_PAYOUTS writes a commission. */
const DEV_PENDING_MATH =
  DEV_PAY.kind === "booth-rent" ? usd(DEV_PENDING_GROSS_CENTS) : `${DEV_PAY.artistPercent}% of ${usd(DEV_PENDING_GROSS_CENTS)}`;
const PAYOUTS = WEEK_PAYOUTS.filter((p) => isResident(p.artist));

function CommissionRow({
  artist,
  sub,
  cents,
  pending,
  last,
}: {
  artist: ArtistId;
  sub: React.ReactNode;
  cents: number;
  pending?: boolean;
  last?: boolean;
}) {
  return (
    <div className={cn("flex items-start gap-1.5 px-2 py-2", !last && "border-b border-app-border")}>
      <AppAvatar initials={ARTISTS[artist].initials} tone={ARTISTS[artist].tone} size="sm" className="mt-px" />
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] leading-tight font-semibold text-app-text">{ARTISTS[artist].name}</span>
        <span className="mt-0.5 block text-[10px] leading-snug text-app-mute tabular-nums">{sub}</span>
      </span>
      <span className="flex shrink-0 flex-col items-end gap-1">
        <span className="text-[11px] leading-tight font-bold text-app-text tabular-nums">{usd(cents)}</span>
        <AppStatus tone={pending ? "warning" : "success"} dot className="h-[18px] px-1.5 text-[10px]">
          {pending ? "Pending" : "Paid"}
        </AppStatus>
      </span>
    </div>
  );
}

export function CommissionsPhone() {
  return (
    <StaffPhone title="Payments">
      <div className="-mx-3 -mt-3 flex gap-4 border-b border-app-border px-3">
        {["Transactions", "Commissions"].map((t) => (
          <span
            key={t}
            className={cn(
              "border-b-2 py-2 text-[11px] font-semibold",
              t === "Commissions" ? "border-app-active-fg text-app-text" : "border-transparent text-app-mute",
            )}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="overflow-hidden rounded-app-lg ring-1 ring-app-border">
        <div className="flex items-center justify-between gap-2 border-b border-app-border px-2.5 py-2">
          <span className="min-w-0">
            <span className="block text-[11px] font-semibold text-app-text">Artist commissions</span>
            <span className="block text-[10px] text-app-mute">gross vs commission</span>
          </span>
          <span className="shrink-0 text-[10px] font-semibold text-app-soft">Rules</span>
        </div>

        {/* This week: Dev's row, with the app's per-row Approve */}
        <p className="bg-graphite/[0.03] px-2.5 py-1 text-[10px] font-semibold text-app-mute">This week</p>
        <div className="border-b border-app-border">
          <CommissionRow artist="dev" cents={DEV_PENDING_CENTS} pending last sub={DEV_PENDING_MATH} />
          {/* The sessions behind the row, one commission record each */}
          <div className="-mt-1 pr-2 pb-2 pl-[38px]">
            {DEV_PENDING.map((c) => (
              <p key={c.client} className="flex justify-between gap-2 text-[10px] leading-[15px] text-app-mute tabular-nums">
                <span className="min-w-0 truncate">
                  {c.client} · {c.when}
                </span>
                <span className="shrink-0">{usd(c.artistCents)}</span>
              </p>
            ))}
            <div className="mt-1.5 flex justify-end">
              <AppButton variant="primary" icon={Check} className="h-6 px-2.5 text-[10.5px]">
                Approve
              </AppButton>
            </div>
          </div>
        </div>

        <p className="bg-graphite/[0.03] px-2.5 py-1 text-[10px] font-semibold text-app-mute tabular-nums">
          {PAYOUT_WEEK.label} · paid {PAYOUT_WEEK.paidOn}
        </p>
        {PAYOUTS.map((p, i) => (
          <CommissionRow key={p.artist} artist={p.artist} cents={p.payoutCents} sub={p.math} last={i === PAYOUTS.length - 1} />
        ))}
      </div>
    </StaffPhone>
  );
}

/* ─── Week 3: one inbox for the whole shop ──────────────────────────────────
   The Messages thread list as MessagesScreen draws it (messages/_proto
   thread-list.tsx): Search messages, the All · Unread · SMS · Email chips, then
   today's texts and emails in one list, an unread dot on the two waiting.
   Assignment lives in the thread's header (the before/after below). */

/** Asha's Wednesday-evening thread, as MessagesScreen lists it (read). */
const ASHA_ROW: Thread = {
  client: "Asha M.",
  initials: "AM",
  channel: "SMS",
  preview: "Booked it, thank you! See you tomorrow at 10.",
  time: "Wed",
  unread: false,
};
const LIST: Thread[] = [...THREADS.filter((t) => t.time !== "Wed"), ASHA_ROW, ...THREADS.filter((t) => t.time === "Wed")];

export function InboxPhone() {
  return (
    <StaffPhone title="Messages" className="[&_[data-body]]:gap-2">
      <div className="flex h-7 shrink-0 items-center gap-1.5 rounded-app border border-app-border px-2 text-[10.5px] text-app-mute">
        <Search size={12} strokeWidth={1.8} />
        Search messages
      </div>
      <div className="flex gap-1">
        <span className="inline-flex h-[22px] items-center rounded-full bg-app-text px-2 text-[10px] font-semibold text-white">All</span>
        <span className="inline-flex h-[22px] items-center gap-1 rounded-full bg-graphite/[0.06] px-2 text-[10px] font-semibold text-app-soft">
          Unread
          <span className="text-app-active-fg tabular-nums">{UNREAD_THREADS}</span>
        </span>
        <span className="inline-flex h-[22px] items-center rounded-full bg-graphite/[0.06] px-2 text-[10px] font-semibold text-app-soft">SMS</span>
        <span className="inline-flex h-[22px] items-center rounded-full bg-graphite/[0.06] px-2 text-[10px] font-semibold text-app-soft">Email</span>
      </div>
      <div className="-mx-3 flex flex-col border-t border-app-border">
        {LIST.map((t) => {
          const Icon = t.channel === "Email" ? Mail : MessageSquare;
          return (
            <div key={t.client} className="flex items-start gap-2 border-b border-app-border px-3 py-[7px] last:border-b-0">
              <AppAvatar initials={t.initials} size="md" className="h-7 w-7 text-[10px]" />
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5">
                  <span className={cn("truncate text-[11px] text-app-text", t.unread ? "font-bold" : "font-semibold")}>{t.client}</span>
                  <Icon size={10} strokeWidth={2} className="shrink-0 text-app-mute" />
                  <span className="ml-auto shrink-0 text-[10px] text-app-mute tabular-nums">{t.time}</span>
                </span>
                <span className="mt-0.5 flex items-center gap-1.5">
                  <span className={cn("min-w-0 flex-1 truncate text-[10px]", t.unread ? "font-medium text-app-text" : "text-app-mute")}>
                    {t.preview}
                  </span>
                  {t.unread && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-app-active-fg" />}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </StaffPhone>
  );
}

/* ─── Before / after: Kira N.'s email goes to Mara ──────────────────────────
   Kira (Mara's new client: fine-line wrist, Sat Nov 14, 12:00, on Mara's waitlist
   for an earlier slot) emails at 9:48. The header's assignee control reads
   "Unassigned" until someone picks an artist; the note is staff-only. */

const KIRA = THREADS.find((t) => t.client === "Kira N.");

export function KiraThreadPhone({ assigned }: { assigned: boolean }) {
  return (
    <StaffPhone title="Messages">
      <div className="-mx-3 -mt-3 flex items-center gap-2 border-b border-app-border px-3 py-2">
        <ChevronLeft size={13} strokeWidth={2} className="shrink-0 text-app-mute" />
        <AppAvatar initials={KIRA?.initials ?? "KN"} size="sm" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[11.5px] font-semibold text-app-text">{KIRA?.client ?? "Kira N."}</span>
          <span className="block text-[10px] text-app-mute">{KIRA?.channel ?? "Email"}</span>
        </span>
        <span
          className={cn(
            "inline-flex h-6 shrink-0 items-center gap-1 rounded-full px-2 text-[10px] font-semibold ring-1",
            assigned ? "text-app-text ring-app-border" : "border border-dashed border-app-mute/60 text-app-mute ring-0",
          )}
        >
          {assigned && <AppAvatar initials={ARTISTS.mara.initials} tone={ARTISTS.mara.tone} size="xs" className="h-4 w-4 text-[10px]" />}
          {assigned ? ARTISTS.mara.name : "Unassigned"}
          <ChevronDown size={10} strokeWidth={2} />
        </span>
      </div>

      <div className="rounded-app bg-graphite/[0.03] px-2.5 py-2 ring-1 ring-app-border">
        <SmallLabel>Next</SmallLabel>
        <p className="mt-0.5 text-[11px] font-semibold text-app-text">Fine-line wrist · {ARTISTS.mara.name}</p>
        <p className="text-[10px] text-app-mute tabular-nums">Sat, Nov 14, 12:00 · $150 deposit paid</p>
      </div>

      {/* The time sits inside each bubble, right-aligned (thread-view.tsx UX-R1: no line under it) */}
      <div className="flex flex-col gap-1">
        <p className="text-center text-[10px] text-app-mute">Today</p>
        <div className="max-w-[88%] rounded-[12px] rounded-bl-[4px] bg-white px-2.5 pt-2 pb-1.5 text-[11px] leading-snug text-app-text ring-1 ring-app-border">
          {KIRA?.preview ?? "Any chance of something before Nov 14?"}
          <p className="mt-0.5 text-right text-[10px] leading-none text-app-mute tabular-nums">{KIRA?.time ?? "9:48"}</p>
        </div>
      </div>

      {/* A staff-only note sits in the transcript as the app draws it (thread-view.tsx): an
          amber bubble on the team's side, headed by a filled pill with a lock and "Internal —
          team only" (no author), the time inside the bubble. No left rail: the app removed it. */}
      {assigned && (
        <div className="ml-auto max-w-[94%] rounded-[12px] bg-app-warning-bg px-2 pt-2 pb-1.5 shadow-[0_1px_2px_rgba(28,25,23,0.06)]">
          <p className="flex w-fit items-center gap-1 rounded-full bg-app-warning px-1.5 py-[3px] text-[10px] leading-none font-bold tracking-[0.04em] whitespace-nowrap text-white uppercase">
            <Lock size={10} strokeWidth={2.4} />
            Internal — team only
          </p>
          <p className="mt-1 text-[11px] leading-snug text-app-text">Already on {ARTISTS.mara.name}&rsquo;s waitlist for an earlier slot.</p>
          <p className="mt-0.5 text-right text-[10px] leading-none text-app-mute tabular-nums">9:52</p>
        </div>
      )}

      <div className="mt-auto overflow-hidden rounded-app-lg ring-1 ring-app-border">
        <div className="flex gap-3 border-b border-app-border px-2.5">
          {["Reply", "Note"].map((t) => {
            const on = assigned ? t === "Note" : t === "Reply";
            return (
              <span
                key={t}
                className={cn("border-b-2 py-1.5 text-[10.5px] font-semibold", on ? "border-app-text text-app-text" : "border-transparent text-app-mute")}
              >
                {t}
              </span>
            );
          })}
        </div>
        <p className="h-12 px-2.5 py-2 text-[10.5px] leading-snug text-app-mute">
          {assigned
            ? `Internal note about ${KIRA?.client ?? "Kira N."} — only your team sees this…`
            : `Message ${KIRA?.client ?? "Kira N."}…`}
        </p>
      </div>
    </StaffPhone>
  );
}
