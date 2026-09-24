import React from "react";
import { Camera, CircleCheck, CalendarCheck } from "lucide-react";
import { cn } from "@/components/system";
import {
  AppCard,
  AppFrame,
  AppLabel,
  AppStatus,
  AppTabs,
  ARTISTS,
  ASHA_PROJECT,
  GuestArtistsScreen,
  InventoryScreen,
  PaymentsScreen,
  PhotoTile,
  TODAY_SESSIONS,
  TodayScreen,
  usd,
} from "@/components/mockups";
import type { PostScreen } from "@/lib/data/blog-posts";

/*
 * The product screen each post is about, from the mockup library (decorative, aria-hidden,
 * Sample studio data). Full screens are cropped to the part the post talks about, with a
 * fade where the crop cuts. Two small screens are composed here from the library's parts:
 * Asha M.'s deposit pool (the featured-post cover) and her project's photo timeline.
 */

/** Crops a tall screen to `h` (Tailwind max-h classes) and fades the cut edge. */
function Crop({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "overflow-hidden [mask-image:linear-gradient(to_bottom,#000_calc(100%-72px),transparent)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ─── Asha M.'s deposit pool ──────────────────────────────────────────────── */

const ASHA = ASHA_PROJECT;
/** What today's checkout (session 4) takes from her pool. */
const TODAY_FROM_POOL = TODAY_SESSIONS.find((s) => s.projectId === ASHA.id)?.deposit?.cents ?? 0;

function PoolFigure({ label, cents, strong }: { label: string; cents: number; strong?: boolean }) {
  return (
    <div className="flex min-w-0 flex-col gap-0.5">
      <AppLabel>{label}</AppLabel>
      <span className={cn("text-[18px] leading-tight font-extrabold tabular-nums", strong ? "text-app-success" : "text-app-text")}>
        {usd(cents)}
      </span>
    </div>
  );
}

function PoolSessions() {
  const rows = ASHA.sessions.filter((s) => s.n >= 3);
  return (
    <AppCard padded={false}>
      {rows.map((s, i) => {
        const done = s.state === "done";
        const fromPool = s.appliedCents ?? (s.state === "today" ? TODAY_FROM_POOL : 0);
        return (
          <div
            key={s.n}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5",
              i < rows.length - 1 && "border-b border-app-border",
              s.state === "today" && "bg-app-sidebar",
            )}
          >
            <span
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-app",
                done ? "bg-app-success-bg text-app-success" : "bg-graphite/[0.05] text-app-soft",
              )}
            >
              {done ? <CircleCheck size={14} strokeWidth={2} /> : <CalendarCheck size={14} strokeWidth={1.9} />}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-1.5">
                <span className="text-ui font-semibold whitespace-nowrap text-app-text">Session {s.n}</span>
                {/* Status chips give way in the narrowest frames (phones under ~375), so the date stays whole */}
                {s.state === "today" && <AppStatus tone="active" className="hidden @[18rem]:inline-flex">Today</AppStatus>}
                {done && <AppStatus tone="success" className="hidden @[18rem]:inline-flex">Done</AppStatus>}
                {s.state === "booked" && <AppStatus tone="neutral" className="hidden @[18rem]:inline-flex">Booked</AppStatus>}
              </span>
              <span className="block text-ui-xs text-app-mute">{s.date}</span>
            </span>
            {fromPool > 0 && (
              <span className="shrink-0 text-right tabular-nums">
                <span className="block text-ui-sm font-semibold text-app-text">{usd(fromPool)}</span>
                <span className="block text-ui-xs text-app-mute">{done ? "from pool" : "at checkout"}</span>
              </span>
            )}
          </div>
        );
      })}
    </AppCard>
  );
}

/** Projects › Koi sleeve, cut to the deposit pool and the sessions it pays toward. */
export function DepositPoolScreen({ className }: { className?: string }) {
  const artist = ARTISTS[ASHA.artist];
  return (
    <AppFrame
      active="projects"
      sidebar={false}
      className={className}
      greeting={ASHA.title}
      meta={
        <>
          <span className="font-serif text-[13px] italic">{ASHA.client}</span> · {artist.name} · {ASHA.placement}
        </>
      }
    >
      <div className="grid gap-3 px-4 pb-4 @lg:px-6 @lg:pb-6 @3xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] @3xl:items-start">
        <AppCard title="Deposit pool" meta={<AppStatus tone="success">{usd(ASHA.pool.availableCents)} in pool</AppStatus>}>
          <div className="grid grid-cols-2 gap-x-3 gap-y-3 @md:grid-cols-4 @3xl:grid-cols-2">
            <PoolFigure label="Paid in" cents={ASHA.pool.paidInCents} />
            <PoolFigure label="Applied" cents={ASHA.pool.appliedCents} />
            <PoolFigure label="Available" cents={ASHA.pool.availableCents} strong />
            <PoolFigure label="Refundable" cents={ASHA.pool.refundableCents} />
          </div>
        </AppCard>
        <PoolSessions />
      </div>
    </AppFrame>
  );
}

/* ─── Asha M.'s photo timeline ────────────────────────────────────────────── */

/* The app's slots, in its order (InkOS lib/projects/photo-slots.ts): Before, Stencil, then
   S{n} Fresh and S{n} Healed for each session, then Final healed. A healed photo is due 14 days
   after its session; once that date passes with no photo, the app flags the slot (solid red
   border, a dot, "Healed photo due"). Empty slots show a camera.
   Asha M. (sample-data PROJECTS, PORTFOLIO): session 2's healed photo came in Aug 1 and is P1
   in Dev's portfolio; session 3's (due Thu, Sep 24) is still missing, so it's flagged; session 4
   is today, so its healed photo is the next one due.
   What shows at each width, always in the app's order: 3 columns (6 slots) Before, Stencil and
   sessions 3–4; 4 columns (8) add session 2; 6 columns (12) add sessions 1 and 5. The crop ends
   at S5 Healed, so Final healed stays off-frame. */
type Slot =
  | { label: string; photo: string; caption?: string; hide?: string }
  | { label: string; note: string; since?: string; overdue?: boolean; next?: boolean; hide?: string };

const SLOTS: Slot[] = [
  { label: "Before", photo: "R1", caption: "References" },
  { label: "Stencil", photo: "St" },
  { label: "S1 Fresh", photo: "S1", caption: "Jun 13", hide: "hidden @2xl:flex" },
  { label: "S1 Healed", photo: "S1", caption: "Jun 27", hide: "hidden @2xl:flex" },
  { label: "S2 Fresh", photo: "S2", caption: "Jul 18", hide: "hidden @md:flex" },
  { label: "S2 Healed", photo: "S2", caption: "Aug 1", hide: "hidden @md:flex" },
  { label: "S3 Fresh", photo: "S3", caption: "Sep 10" },
  { label: "S3 Healed", note: "Healed photo due", since: "Since Sep\u00a024", overdue: true },
  { label: "S4 Fresh", note: "After today’s session" },
  { label: "S4 Healed", note: "Due Thu, Oct\u00a022", next: true },
  { label: "S5 Fresh", note: "Sat, Nov\u00a07", hide: "hidden @2xl:flex" },
  { label: "S5 Healed", note: "Due Sat, Nov\u00a021", hide: "hidden @2xl:flex" },
];

/** `compact` (card thumbnails) names the project in the top bar instead of a greeting, so the
    photos sit near the top. */
export function PhotoTimelineScreen({ className, compact }: { className?: string; compact?: boolean }) {
  const artist = ARTISTS[ASHA.artist];
  return (
    <AppFrame
      active="projects"
      sidebar={false}
      className={className}
      {...(compact ? { title: ASHA.title } : { greeting: ASHA.title })}
      meta={
        <>
          <span className="font-serif text-[13px] italic">{ASHA.client}</span> · {artist.name} · {ASHA.placement}
        </>
      }
    >
      <AppTabs tabs={["Sessions", "Photos", "Moodboard", "Activity"]} active="Photos" className="@lg:px-6" />
      <div className="grid grid-cols-3 gap-2.5 p-4 @md:grid-cols-4 @lg:p-6 @2xl:grid-cols-6">
        {SLOTS.map((s) => (
          <div key={s.label} className={cn("flex min-w-0 flex-col gap-1.5", s.hide)}>
            <span className="truncate text-ui-xs font-semibold text-app-soft">{s.label}</span>
            {"photo" in s ? (
              <PhotoTile label={s.photo} caption={s.caption} />
            ) : s.overdue ? (
              <div className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-app border border-app-danger bg-app-danger-bg px-1.5 text-center">
                <span className="h-2 w-2 rounded-full bg-app-danger" />
                <span className="text-[10px] leading-tight font-semibold text-app-danger">{s.note}</span>
                {s.since && <span className="text-[10px] leading-tight text-app-soft">{s.since}</span>}
              </div>
            ) : (
              <div
                className={cn(
                  "flex aspect-square flex-col items-center justify-center gap-1.5 rounded-app border border-dashed px-1.5 text-center",
                  s.next ? "border-app-mute/50 bg-app-sidebar" : "border-app-border bg-app-surface",
                )}
              >
                <Camera size={18} strokeWidth={1.7} className={s.next ? "text-app-soft" : "text-app-mute"} />
                <span className={cn("text-[10px] leading-tight", s.next ? "font-semibold text-app-soft" : "text-app-mute")}>
                  {s.note}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </AppFrame>
  );
}

/* ─── Per post ────────────────────────────────────────────────────────────── */

/** The post's screen, whole. */
function Screen({ screen, compact }: { screen: PostScreen; compact?: boolean }) {
  switch (screen) {
    case "today":
      return <TodayScreen />;
    case "deposit-pool":
      return <DepositPoolScreen />;
    case "inventory":
      return <InventoryScreen tab="items" />;
    case "guest-artists":
      return <GuestArtistsScreen />;
    case "commissions":
      return <PaymentsScreen tab="commissions" />;
    case "photo-timeline":
      return <PhotoTimelineScreen compact={compact} />;
  }
}

/** Crop heights for the tall screens under a post's intro; the short ones show whole. */
const FIGURE_CROP: Partial<Record<PostScreen, string>> = {
  today: "max-h-[480px] sm:max-h-[640px]",
  inventory: "max-h-[480px] sm:max-h-[600px]",
  "guest-artists": "max-h-[520px] sm:max-h-[640px]",
  commissions: "max-h-[520px] sm:max-h-[640px]",
};

/** The screen under a post's intro. */
export function PostFigure({ screen }: { screen: PostScreen }) {
  const crop = FIGURE_CROP[screen];
  return crop ? (
    <Crop className={crop}>
      <Screen screen={screen} />
    </Crop>
  ) : (
    <Screen screen={screen} />
  );
}

/**
 * A post card's thumbnail on /blog: the top of the same screen at three-quarter size on the
 * sand stage, fading out at the stage's bottom edge. The frame is laid out at 4/3 of the room it
 * has, then scaled into it, so it shows the screen's wider layout. The app sidebar is left out
 * (the frame's first child when it has two); the top bar keeps its Sample studio tag.
 */
export function PostThumb({ screen }: { screen: PostScreen }) {
  return (
    <div className="relative h-[168px] border-b border-hair bg-canvas-deep sm:h-[188px]">
      {/* The crop, fading into the stage where it cuts */}
      <div className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,#000_calc(100%-44px),transparent)]">
        <div className="absolute top-4 left-4 w-[calc((100%-2rem)*4/3)] origin-top-left scale-75 transition-transform duration-300 ease-out group-hover:-translate-y-1 motion-reduce:transition-none sm:top-5 sm:left-5 sm:w-[calc((100%-2.5rem)*4/3)] [&>[aria-hidden]>div:first-child:not(:last-child)]:hidden">
          <Screen screen={screen} compact />
        </div>
      </div>
    </div>
  );
}

/** The latest post's cover on /blog: a smaller cut of the same screen. */
export function PostCover({ screen }: { screen: PostScreen }) {
  if (screen === "deposit-pool") return <DepositPoolScreen className="shadow-none" />;
  if (screen === "photo-timeline") return <PhotoTimelineScreen className="shadow-none" />;
  return (
    <Crop className="max-h-[360px] sm:max-h-[420px]">
      <Screen screen={screen} />
    </Crop>
  );
}
