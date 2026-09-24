import type { LucideIcon } from "lucide-react";
import { CalendarDays, CalendarRange, ChevronLeft, Eye, Hourglass, MessageSquare, Percent } from "lucide-react";
import { cn } from "@/components/system/cn";
import { AppFrame } from "./app-frame";
import { AppAvatar, AppButton, AppCard, AppKpiStrip, AppTabs } from "./app-parts";
import { ARTIST_STATS, ARTISTS, artistRevenueCents, payRuleLabel, TRANSACTIONS, usd } from "./sample-data";

const RIO = ARTISTS.rio;
const SPOT = RIO.guestSpot ?? { from: "", to: "" };
const ARTIST_PCT = RIO.pay.kind === "guest-split" ? RIO.pay.artistPercent : 0;

/** Rio's engagement so far: the Oct 2–4 weekend (analytics) plus this week's paid walk-ins. */
const RIO_TXNS = TRANSACTIONS.filter((t) => t.artist === "rio" && t.status === "Paid");
const REVENUE_CENTS = artistRevenueCents("rio") + RIO_TXNS.reduce((total, t) => total + t.cents, 0);
/** "Walk-ins (4)" → 4 sessions. */
const TXN_SESSIONS = RIO_TXNS.reduce((total, t) => total + Number(/\((\d+)\)/.exec(t.client)?.[1] ?? 1), 0);
const BOOKINGS = (ARTIST_STATS.find((s) => s.artist === "rio")?.sessions ?? 0) + TXN_SESSIONS;
const EARNED_CENTS = Math.round((REVENUE_CENTS * ARTIST_PCT) / 100);

/** The guest spot, day by day (Fri, Oct 2 – Fri, Oct 9). Today is Thu, Oct 8. */
const DAYS: { dow: string; day: number; state: "worked" | "off" | "today" | "last" }[] = [
  { dow: "Fri", day: 2, state: "worked" },
  { dow: "Sat", day: 3, state: "worked" },
  { dow: "Sun", day: 4, state: "worked" },
  { dow: "Mon", day: 5, state: "off" },
  { dow: "Tue", day: 6, state: "worked" },
  { dow: "Wed", day: 7, state: "off" },
  { dow: "Thu", day: 8, state: "today" },
  { dow: "Fri", day: 9, state: "last" },
];

/** Access toggles from components/guest-artists/GuestEngagementTabs.tsx. */
const PERMS: { label: string; description: string; icon: LucideIcon; on: boolean }[] = [
  { label: "View client history", description: "See previous appointments and notes for their own clients.", icon: Eye, on: true },
  { label: "View other bookings", description: "See the full studio calendar including other artists' appointments.", icon: CalendarRange, on: false },
  { label: "Send messages", description: "Message clients directly from the Limespun app.", icon: MessageSquare, on: true },
];

function Toggle({ on }: { on: boolean }) {
  return (
    <span className={cn("relative h-5 w-9 shrink-0 rounded-full", on ? "bg-app-active-fg" : "bg-graphite/15")}>
      <span className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-[0_1px_2px_rgba(28,25,23,0.2)]", on ? "left-[18px]" : "left-0.5")} />
    </span>
  );
}

function Radio({ on }: { on: boolean }) {
  return (
    <span className={cn("flex h-4 w-4 shrink-0 items-center justify-center rounded-full border", on ? "border-app-active-fg" : "border-app-border")}>
      {on && <span className="h-2 w-2 rounded-full bg-app-active-fg" />}
    </span>
  );
}

function DayStrip() {
  return (
    <div className="grid grid-cols-8 gap-1">
      {DAYS.map((d) => (
        <span
          key={d.day}
          className={cn(
            "flex flex-col items-center rounded-app py-1.5 text-center",
            d.state === "worked" && "bg-app-sidebar text-app-soft",
            d.state === "off" && "text-app-mute",
            d.state === "today" && "bg-app-active text-app-active-fg ring-1 ring-app-active-fg/30",
            d.state === "last" && "border border-dashed border-app-border text-app-text",
          )}
        >
          <span className="text-[10px] font-bold tracking-[0.06em] uppercase">{d.dow}</span>
          <span className="text-ui font-bold tabular-nums">{d.day}</span>
        </span>
      ))}
    </div>
  );
}

/**
 * A guest artist's engagement (app: /guest-artists/[id], GuestEngagementTabs
 * and EngagementDetailView). Rio's guest spot, Fri, Oct 2 – Fri, Oct 9 at 70/30,
 * with the Access tab open. The seat deactivates when the engagement ends.
 */
export function GuestArtistsScreen({ className }: { className?: string }) {
  return (
    <AppFrame active="team" title="Guest Artists" className={className} actions={<AppButton>End engagement</AppButton>}>
      <div className="flex flex-col gap-4 p-4 @lg:p-6">
        <span className="flex items-center gap-1 text-ui-sm text-app-mute">
          <ChevronLeft size={14} strokeWidth={1.9} />
          Guest Artists
        </span>

        <div className="flex flex-col gap-4 @2xl:flex-row @2xl:items-start @2xl:justify-between">
          <div className="flex items-start gap-3">
            <AppAvatar initials={RIO.initials} tone={RIO.tone} size="lg" />
            <div className="min-w-0">
              <span className="flex items-center gap-2">
                <span className="font-serif text-[26px] leading-none text-app-text">{RIO.name}</span>
                <span className="rounded-full bg-app-text px-2 text-ui-xs leading-5 font-semibold text-white">Active</span>
              </span>
              <span className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-ui-sm text-app-mute">
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={13} strokeWidth={1.9} />
                  {SPOT.from} — {SPOT.to}
                </span>
                <span className="flex items-center gap-1.5">
                  <Percent size={13} strokeWidth={1.9} />
                  {payRuleLabel(RIO.pay)} · {RIO.specialties.join(", ")}
                </span>
              </span>
            </div>
          </div>
          <div className="w-full @2xl:w-[320px]">
            <DayStrip />
          </div>
        </div>

        <AppKpiStrip
          items={[
            { label: "Total revenue", value: usd(REVENUE_CENTS), note: `${SPOT.from.replace(/^\w+, /, "")} – today` },
            { label: "Commission earned", value: usd(EARNED_CENTS), note: `${ARTIST_PCT}% to ${RIO.name}`, accent: true },
            { label: "Bookings", value: String(BOOKINGS), note: "walk-ins and flash" },
            { label: "Avg session value", value: usd(Math.round(REVENUE_CENTS / BOOKINGS)), note: "per booking" },
          ]}
        />

        <div>
          <AppTabs tabs={["Overview", "Bookings", "Schedule", "Access"]} active="Access" className="-mx-4 @lg:-mx-6 @lg:px-6" />
          <div className="mt-4 grid gap-4 @3xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
            <AppCard title="Booking page visibility" className="hidden @3xl:block">
              <div className="flex flex-col gap-2">
                {[
                  { label: "Visible", note: "Clients can book this artist online.", on: true },
                  { label: "Hidden", note: "Staff-only — not visible to clients.", on: false },
                ].map((o) => (
                  <span
                    key={o.label}
                    className={cn(
                      "flex items-start gap-2.5 rounded-app border px-3 py-2.5",
                      o.on ? "border-app-active-fg/30 bg-app-active/40" : "border-app-border",
                    )}
                  >
                    <span className="mt-0.5">
                      <Radio on={o.on} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-ui-sm font-semibold text-app-text">{o.label}</span>
                      <span className="block text-ui-xs text-app-mute">{o.note}</span>
                    </span>
                  </span>
                ))}
              </div>
            </AppCard>

            <AppCard title="App permissions" padded={false}>
              {PERMS.map((p, i) => (
                <div key={p.label} className={cn("flex items-start gap-3 px-4 py-3", i < PERMS.length - 1 && "border-b border-app-border")}>
                  <span className="mt-px flex h-7 w-7 shrink-0 items-center justify-center rounded-app bg-graphite/[0.05] text-app-soft">
                    <p.icon size={14} strokeWidth={1.9} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-ui-sm font-semibold text-app-text">{p.label}</span>
                    <span className="block text-ui-xs leading-snug text-app-mute">{p.description}</span>
                  </span>
                  <Toggle on={p.on} />
                </div>
              ))}
            </AppCard>
          </div>

          <div className="mt-4 flex items-start gap-2.5 rounded-app-lg bg-app-warning-bg px-4 py-3">
            <Hourglass size={15} strokeWidth={1.9} className="mt-px shrink-0 text-app-warning" />
            <span className="min-w-0 text-ui-sm text-app-text">
              <span className="font-semibold">Access ends with the engagement.</span>{" "}
              {RIO.name}&rsquo;s seat deactivates after {SPOT.to}, the last day of the guest spot.
            </span>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}
