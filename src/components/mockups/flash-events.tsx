import { ArrowUpDown, CalendarDays, Clock, Plus } from "lucide-react";
import { cn } from "@/components/system/cn";
import { AppFrame } from "./app-frame";
import { AppAvatar, AppButton, AppCard, AppKpiStrip, AppStatus, AppTabs, PhotoTile } from "./app-parts";
import { ToolbarPill, ToolbarSearch, ToolbarSelect } from "./projects";
import { ARTISTS, FLASH_EVENTS, flashEventValueCents, usd, type ArtistId, type FlashEvent } from "./sample-data";

/**
 * Event hours and slot length. Slots = artists × (hours ÷ slot length), which
 * matches each event's `slots` in sample-data (2 × 12 = 24, 2 × 10 = 20).
 */
const EVENT_HOURS: Record<string, { start: string; end: string; startMin: number; slotMin: number }> = {
  "Friday the 13th flash": { start: "11:00 AM", end: "5:00 PM", startMin: 11 * 60, slotMin: 30 },
  "Summer flash day": { start: "11:00 AM", end: "4:00 PM", startMin: 11 * 60, slotMin: 30 },
};

/** Card badge (app FE_BADGE): a scheduled event is Published; a finished one Completed. */
const BADGE: Record<FlashEvent["status"], { tone: "success" | "info"; label: string }> = {
  Scheduled: { tone: "success", label: "Published" },
  Completed: { tone: "info", label: "Completed" },
};

const LIVE = FLASH_EVENTS.filter((e) => e.status === "Scheduled");
const NEXT = LIVE[0];
const LIVE_SLOTS = LIVE.reduce((total, e) => total + e.slots, 0);
const LIVE_BOOKED = LIVE.reduce((total, e) => total + e.booked, 0);
const FILL_PCT = Math.round((LIVE_BOOKED / LIVE_SLOTS) * 100);
const LIVE_VALUE_CENTS = LIVE.reduce((total, e) => total + flashEventValueCents(e), 0);

/* ─── Slot board for the next event ───────────────────────────────────────── */

type SlotState = "open" | "reserved" | "booked" | "blocked";

/** Slot styles from flash-events/_proto/FlashEventTabs.tsx FE_SLOT_STYLE. */
const SLOT_STYLE: Record<SlotState, { cell: string; label: string; time: string }> = {
  open: { cell: "border border-app-border bg-app-surface text-app-soft", label: "Open", time: "text-app-mute" },
  reserved: { cell: "border border-transparent bg-app-warning-bg text-app-text", label: "Reserved", time: "text-app-warning" },
  booked: { cell: "border border-transparent bg-app-text text-white", label: "Booked", time: "text-white/70" },
  blocked: { cell: "border border-dashed border-app-border bg-graphite/[0.04] text-app-mute", label: "Blocked", time: "text-app-mute" },
};

/** Studio holds on the day: Mara's 1:00 is blocked for lunch; two slots are held awaiting deposit. */
const BLOCKED: [ArtistId, number][] = [["mara", 4]];
const RESERVED: [ArtistId, number][] = [
  ["dev", 6],
  ["mara", 9],
];
/** Order slots fill in; the first `booked` of these are taken, so the board always matches the event's count. */
const FILL_ORDER: [ArtistId, number][] = [
  ["dev", 0],
  ["mara", 0],
  ["dev", 1],
  ["mara", 2],
  ["dev", 2],
  ["mara", 5],
  ["dev", 4],
  ["mara", 6],
  ["dev", 8],
  ["mara", 7],
  ["dev", 9],
  ["mara", 10],
];

function clock(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")}`;
}

function buildSlots(e: FlashEvent): Record<ArtistId, { time: string; state: SlotState }[]> {
  const hours = EVENT_HOURS[e.name];
  const perArtist = e.slots / e.artists.length;
  const has = (list: [ArtistId, number][], a: ArtistId, i: number) => list.some(([la, li]) => la === a && li === i);
  const booked = FILL_ORDER.slice(0, e.booked);
  const out = {} as Record<ArtistId, { time: string; state: SlotState }[]>;
  for (const a of e.artists) {
    out[a] = Array.from({ length: perArtist }, (_, i) => {
      const state: SlotState = has(BLOCKED, a, i)
        ? "blocked"
        : has(RESERVED, a, i)
          ? "reserved"
          : has(booked, a, i)
            ? "booked"
            : "open";
      return { time: clock(hours.startMin + i * hours.slotMin), state };
    });
  }
  return out;
}

function SlotBoard({ e }: { e: FlashEvent }) {
  const slots = buildSlots(e);
  const all = e.artists.flatMap((a) => slots[a]);
  const count = (s: SlotState) => all.filter((x) => x.state === s).length;
  const pct = Math.round((count("booked") / all.length) * 100);
  return (
    <AppCard
      padded={false}
      title={
        <span className="flex items-center gap-2">
          {e.name}
          <AppStatus tone={BADGE[e.status].tone} dot>
            {BADGE[e.status].label}
          </AppStatus>
        </span>
      }
      meta={<span className="hidden @xl:inline">{e.date}</span>}
    >
      <AppTabs tabs={["Overview", "Designs", "Slots", "Bookings", "Settings"]} active="Slots" className="px-2 @md:px-4" />
      {/* The Slots tab's own filter (FlashEventTabs.tsx): All · Open · Reserved · Booked · Blocked. */}
      <div className="flex flex-wrap gap-1.5 px-4 pt-3.5">
        <ToolbarPill active count={all.length}>
          All
        </ToolbarPill>
        <ToolbarPill count={count("open")}>Open</ToolbarPill>
        <ToolbarPill count={count("reserved")}>Reserved</ToolbarPill>
        <ToolbarPill count={count("booked")}>Booked</ToolbarPill>
        <span className="hidden @md:contents">
          <ToolbarPill count={count("blocked")}>Blocked</ToolbarPill>
        </span>
        <span className="ml-auto hidden items-center text-ui-sm font-semibold text-app-active-fg tabular-nums @2xl:flex">{pct}% filled</span>
      </div>
      <div className="flex flex-col gap-4 p-4">
        {e.artists.map((a) => (
          <div key={a} className="flex flex-col gap-2">
            <span className="flex items-center gap-2 text-ui-sm font-semibold text-app-text">
              <AppAvatar initials={ARTISTS[a].initials} tone={ARTISTS[a].tone} size="sm" />
              {ARTISTS[a].name}
            </span>
            <div className="grid grid-cols-4 gap-1.5 @lg:grid-cols-6">
              {slots[a].map((s) => (
                <span key={s.time} className={cn("flex min-w-0 flex-col rounded-app px-1.5 py-1.5 @md:px-2", SLOT_STYLE[s.state].cell)}>
                  <span className={cn("text-[10.5px] font-semibold tabular-nums", SLOT_STYLE[s.state].time)}>{s.time}</span>
                  <span className="truncate text-[10.5px] font-semibold @md:text-ui-xs">{SLOT_STYLE[s.state].label}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppCard>
  );
}

/* ─── Event cards ─────────────────────────────────────────────────────────── */

function monogram(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function EventCard({ e, selected }: { e: FlashEvent; selected?: boolean }) {
  const hours = EVENT_HOURS[e.name];
  const pct = Math.round((e.booked / e.slots) * 100);
  return (
    <div
      className={cn(
        "overflow-hidden rounded-app-lg bg-app-surface ring-1",
        selected ? "ring-app-active-fg/40 shadow-[0_0_0_3px_var(--color-app-active)]" : "ring-app-border",
      )}
    >
      <PhotoTile label={monogram(e.name)} className="aspect-[16/7] rounded-none ring-0">
        <AppStatus tone={BADGE[e.status].tone} dot className="absolute top-2 left-2">
          {BADGE[e.status].label}
        </AppStatus>
        <span className="absolute inset-x-3 bottom-2 truncate text-ui font-semibold text-app-text">{e.name}</span>
      </PhotoTile>
      <div className="flex flex-col gap-2 p-3">
        <div className="flex items-center gap-2">
          <span className="flex -space-x-1">
            {e.artists.map((a) => (
              <AppAvatar key={a} initials={ARTISTS[a].initials} tone={ARTISTS[a].tone} size="sm" className="ring-2 ring-white" />
            ))}
          </span>
          <span className="truncate text-ui-sm text-app-mute">{e.artists.map((a) => ARTISTS[a].name).join(", ")}</span>
          <span className="ml-auto text-ui-sm font-bold text-app-text tabular-nums">{usd(e.priceCents)}</span>
        </div>
        <div className="flex flex-col gap-1 text-ui-sm text-app-mute">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={13} strokeWidth={1.9} />
            {e.date}
          </span>
          <span className="flex items-center gap-1.5 tabular-nums">
            <Clock size={13} strokeWidth={1.9} />
            {hours.start} – {hours.end} · {hours.slotMin} min
          </span>
        </div>
        <div>
          <div className="h-1 overflow-hidden rounded-full bg-graphite/[0.07]">
            <div className="h-full rounded-full bg-app-active-fg" style={{ width: `${pct}%` }} />
          </div>
          <span className="mt-1.5 flex justify-between text-ui-xs text-app-mute tabular-nums">
            <span>
              {e.booked} of {e.slots} booked
            </span>
            <span>{pct}%</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Flash Events (app: /flash-events, flash-events/_proto/FlashEventsList.tsx
 * with the Slots tab from FlashEventTabs.tsx). Friday the 13th flash is open
 * for booking; the slot board shows its Open, Reserved, Booked and Blocked slots.
 */
export function FlashEventsScreen({ className }: { className?: string }) {
  const past = FLASH_EVENTS.filter((e) => e.status === "Completed").length;
  return (
    <AppFrame
      active="flash-events"
      className={className}
      meta={`${FLASH_EVENTS.length} events`}
      actions={
        <AppButton variant="primary" icon={Plus}>
          New event
        </AppButton>
      }
    >
      <div className="flex flex-col gap-4 p-4 @lg:p-6">
        <AppKpiStrip
          items={[
            { label: "Scheduled", value: String(LIVE.length), note: NEXT ? `next: ${NEXT.date}` : "none scheduled" },
            { label: "Slots booked", value: String(LIVE_BOOKED), note: "across live events" },
            { label: "Fill rate", value: `${FILL_PCT}%`, note: "booked of all slots", accent: true },
            { label: "Booked value", value: usd(LIVE_VALUE_CENTS), note: "gross, at slot price" },
          ]}
        />

        <div className="hidden flex-col gap-2.5 @xl:flex">
          <div className="flex items-center gap-2">
            <ToolbarSearch placeholder="Search events" className="flex-1" />
            <ToolbarSelect icon={ArrowUpDown} label="Sort" />
          </div>
          <div className="flex flex-wrap gap-2">
            <ToolbarPill active count={FLASH_EVENTS.length}>
              All
            </ToolbarPill>
            <ToolbarPill count={LIVE.length}>Upcoming</ToolbarPill>
            <ToolbarPill count={past}>Past</ToolbarPill>
            <ToolbarPill>Drafts</ToolbarPill>
            <ToolbarPill count={LIVE.length}>Published</ToolbarPill>
            <ToolbarPill count={past}>Completed</ToolbarPill>
          </div>
        </div>

        <div className="grid gap-4 @4xl:grid-cols-[264px_minmax(0,1fr)]">
          <div className="hidden content-start gap-3 @2xl:grid @2xl:grid-cols-2 @4xl:grid-cols-1">
            {FLASH_EVENTS.map((e) => (
              <EventCard key={e.name} e={e} selected={e === NEXT} />
            ))}
          </div>
          {NEXT && <SlotBoard e={NEXT} />}
        </div>
      </div>
    </AppFrame>
  );
}
