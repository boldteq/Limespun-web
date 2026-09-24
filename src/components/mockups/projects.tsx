import type React from "react";
import type { LucideIcon } from "lucide-react";
import { CalendarCheck, CalendarPlus, ChevronDown, ChevronRight, CircleCheck, Plus, Search } from "lucide-react";
import { cn } from "@/components/system/cn";
import { AppFrame } from "./app-frame";
import {
  AppAvatar,
  AppButton,
  AppCard,
  AppKpiStrip,
  AppLabel,
  AppProjectStatus,
  AppStatus,
  AppTabs,
  PhotoTile,
} from "./app-parts";
import {
  ARTISTS,
  ASHA_PROJECT,
  IN_DEPOSIT_POOLS_CENTS,
  PROJECT_STATUS_LABEL,
  PROJECTS,
  TODAY_SESSIONS,
  usd,
  type Project,
  type ProjectId,
  type ProjectSession,
  type ProjectStatus,
} from "./sample-data";

/* ─── Toolbar pieces ──────────────────────────────────────────────────────────
   Static copies of the app's list toolbars (_proto-kit/lib.tsx SearchInput,
   Segmented, FilterChip and the dropdown triggers). Shared by the mockupsB
   screens; they belong in app-parts.tsx once the library settles. */

/** The app's search field, placeholder only. */
export function ToolbarSearch({ placeholder, className }: { placeholder: string; className?: string }) {
  return (
    <span
      className={cn(
        "flex h-8 min-w-0 items-center gap-2 rounded-app border border-app-border bg-app-surface px-2.5 text-ui-sm text-app-mute",
        className,
      )}
    >
      <Search size={13} strokeWidth={1.9} className="shrink-0" />
      <span className="truncate">{placeholder}</span>
    </span>
  );
}

/** A closed dropdown trigger ("All artists ▾"). */
export function ToolbarSelect({ icon: Icon, label, className }: { icon?: LucideIcon; label: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-app border border-app-border bg-app-surface px-2.5 text-ui-sm font-medium whitespace-nowrap text-app-text",
        className,
      )}
    >
      {Icon && <Icon size={13} strokeWidth={1.9} className="text-app-mute" />}
      {label}
      <ChevronDown size={13} strokeWidth={1.9} className="text-app-mute" />
    </span>
  );
}

/** The app's segmented control: sand track, white active segment. */
export function ToolbarSegmented({ options, active, className }: { options: string[]; active: string; className?: string }) {
  return (
    <span className={cn("inline-flex shrink-0 gap-0.5 rounded-app bg-graphite/[0.05] p-[3px]", className)}>
      {options.map((o) => (
        <span
          key={o}
          className={cn(
            "flex h-[26px] items-center rounded-[6px] px-3 text-ui-sm font-semibold whitespace-nowrap",
            o === active ? "bg-app-surface text-app-text shadow-[0_1px_2px_rgba(28,25,23,0.08)]" : "text-app-soft",
          )}
        >
          {o}
        </span>
      ))}
    </span>
  );
}

/** A filter pill: onyx when on, outlined when off, with an optional count. */
export function ToolbarPill({ active = false, count, children }: { active?: boolean; count?: number; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full border px-3 text-ui-sm font-semibold whitespace-nowrap",
        active ? "border-app-text bg-app-text text-white" : "border-app-border bg-app-surface text-app-soft",
      )}
    >
      {children}
      {count !== undefined && count > 0 && (
        <span
          className={cn(
            "flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] leading-none font-bold tabular-nums",
            active ? "bg-white/20 text-white" : "bg-graphite/[0.07] text-app-soft",
          )}
        >
          {count}
        </span>
      )}
    </span>
  );
}

/**
 * A table row as the app lays it out on a phone: who and when on the left, the
 * figure and its status on the right. Screens swap their AppTable for a list of
 * these below the container width where the key column would scroll away.
 */
export function ToolbarListRow({
  lead,
  title,
  sub,
  value,
  status,
  last = false,
}: {
  lead?: React.ReactNode;
  title: React.ReactNode;
  sub?: React.ReactNode;
  value?: React.ReactNode;
  status?: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-3 px-4 py-2.5", !last && "border-b border-app-border")}>
      {lead}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-ui-sm font-semibold text-app-text">{title}</span>
        {/* The sub line wraps at word breaks rather than cutting off in a narrow frame. */}
        {sub && <span className="block text-ui-xs text-app-mute">{sub}</span>}
      </span>
      <span className="flex shrink-0 flex-col items-end gap-1">
        {value && <span className="text-ui-sm font-semibold text-app-text tabular-nums">{value}</span>}
        {status}
      </span>
    </div>
  );
}

/* ─── Project helpers (app: projects/_proto/shared.tsx) ───────────────────── */

/** Style tags on each project card, matching the portfolio's style names. */
const PROJECT_STYLES: Record<ProjectId, string[]> = {
  "asha-koi": ["Japanese", "Color"],
  "elena-back": ["Blackwork"],
  "bea-botanical": ["Botanical"],
  "jo-florals": ["Fine-line"],
  "tomas-chest": ["Blackwork"],
  "sam-script": ["Lettering"],
  "owen-panther": ["Traditional"],
};

/** Mood grid swatches (the app shows four tones until photos exist). Warm neutrals only. */
const MOOD_TONES = ["bg-canvas-deep", "bg-hair", "bg-app-sidebar", "bg-hair-strong/60"];

function doneCount(p: Project): number {
  return p.sessions.filter((s) => s.state === "done").length;
}

/** "Active" KPI counts deposit paid, active and healing (app ProjectsList KpiStrip). */
const ACTIVE_STATUSES: ProjectStatus[] = ["deposit_paid", "active", "healing"];
const ACTIVE_COUNT = PROJECTS.filter((p) => ACTIVE_STATUSES.includes(p.status)).length;
/** Sessions completed / planned, averaged across projects. */
const AVG_COMPLETION_PCT = Math.round(
  (PROJECTS.reduce((total, p) => total + doneCount(p) / p.sessions.length, 0) / PROJECTS.length) * 100,
);

function ProgressBar({ done, total }: { done: number; total: number }) {
  const pct = Math.round((done / total) * 100);
  return (
    <div>
      <div className="h-0.5 overflow-hidden rounded-full bg-graphite/[0.07]">
        <div className="h-full bg-app-active-fg" style={{ width: `${pct}%` }} />
      </div>
      <span className="mt-1.5 block text-ui-xs text-app-mute tabular-nums">
        {done}/{total} sessions
      </span>
    </div>
  );
}

/** The app's deposit pill, same precedence as DepositPill in shared.tsx. */
function DepositPill({ p }: { p: Project }) {
  const done = doneCount(p);
  const total = p.sessions.length;
  if (done === total && (p.status === "healing" || p.status === "completed")) {
    return <AppStatus tone="success">Paid in full</AppStatus>;
  }
  if (p.pool.paidInCents > 0 && p.pool.appliedCents >= p.pool.paidInCents) {
    return <AppStatus tone="info">Pool applied</AppStatus>;
  }
  if (p.pool.availableCents > 0) return <AppStatus tone="success">{usd(p.pool.availableCents)} in pool</AppStatus>;
  if (p.pool.paidInCents === 0 && p.status === "planning") return <AppStatus tone="warning">Deposit pending</AppStatus>;
  return null;
}

function MoodGrid({ seed = 0, className }: { seed?: number; className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 grid-rows-2 gap-px bg-app-border", className)}>
      {MOOD_TONES.map((_, i) => {
        const tone = MOOD_TONES[(i + seed) % MOOD_TONES.length];
        return <span key={tone} className={tone} />;
      })}
    </div>
  );
}

function StyleTags({ styles }: { styles: string[] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {styles.map((s) => (
        <span key={s} className="rounded-[5px] bg-graphite/[0.05] px-1.5 py-px text-[10.5px] font-semibold text-app-soft">
          {s}
        </span>
      ))}
    </div>
  );
}

/** A row with a thumbnail in a narrow frame, the app's tall card from two columns up. */
function GalleryCard({ p, seed }: { p: Project; seed: number }) {
  const artist = ARTISTS[p.artist];
  return (
    <div className="flex h-full overflow-hidden rounded-app-lg bg-app-surface ring-1 ring-app-border @md:block">
      <div className="relative w-[88px] shrink-0 @md:w-auto">
        <MoodGrid seed={seed} className="h-full @md:aspect-[16/9] @md:h-auto" />
        <AppAvatar initials={artist.initials} tone={artist.tone} size="sm" className="absolute top-2 right-2 ring-2 ring-white" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2 p-3">
        <div>
          <span className="block font-serif text-[13px] leading-tight text-app-mute italic">{p.client}</span>
          <span className="block truncate text-ui font-semibold text-app-text">{p.title}</span>
        </div>
        <StyleTags styles={PROJECT_STYLES[p.id]} />
        <ProgressBar done={doneCount(p)} total={p.sessions.length} />
        <div className="flex flex-wrap items-center justify-between gap-1.5">
          <AppProjectStatus status={p.status} />
          <DepositPill p={p} />
        </div>
      </div>
    </div>
  );
}

function BoardCard({ p }: { p: Project }) {
  const artist = ARTISTS[p.artist];
  return (
    <div className="rounded-[10px] bg-app-surface p-3 shadow-[0_1px_2px_rgba(28,25,23,0.06)] ring-1 ring-app-border">
      <span className="block font-serif text-[12.5px] leading-tight text-app-mute italic">{p.client}</span>
      <span className="mb-2 block truncate text-ui font-semibold text-app-text">{p.title}</span>
      <ProgressBar done={doneCount(p)} total={p.sessions.length} />
      <div className="mt-2 flex items-center justify-between gap-2">
        <AppAvatar initials={artist.initials} tone={artist.tone} size="sm" />
        <DepositPill p={p} />
      </div>
    </div>
  );
}

/** Board columns from projects/_proto/data.ts BOARD_COLS. */
const BOARD_COLS: ProjectStatus[] = ["planning", "deposit_paid", "active", "healing", "completed"];

/**
 * The board scrolls sideways inside the frame, as the app's does. Below four
 * columns wide it opens swiped to Active (the busy column) and shows its first
 * two cards, so the frame isn't one tall column beside empty ones.
 */
function Board() {
  return (
    <div className="-mx-4 overflow-x-auto overscroll-x-contain px-4 pb-1 @lg:-mx-6 @lg:px-6">
      <div className="grid w-max grid-cols-[repeat(5,188px)] gap-3 @4xl:w-full @4xl:grid-cols-5">
        {BOARD_COLS.map((status) => {
          const items = PROJECTS.filter((p) => p.status === status);
          const busy = status === "active";
          return (
            <div
              key={status}
              className={cn(
                "flex min-h-[180px] flex-col gap-2 rounded-app-lg bg-app-sidebar p-2.5 ring-1 ring-app-border/60",
                busy && "order-first @4xl:order-none",
              )}
            >
              <div className="flex items-center justify-between px-1 pt-0.5 pb-1">
                <span className="text-kpi-label font-bold text-app-mute uppercase">{PROJECT_STATUS_LABEL[status]}</span>
                <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-app-surface px-1 text-[10.5px] font-bold text-app-soft tabular-nums">
                  {items.length}
                </span>
              </div>
              {items.map((p, i) => (
                <div key={p.id} className={cn(i >= 2 && "hidden @4xl:block")}>
                  <BoardCard p={p} />
                </div>
              ))}
              {items.length > 2 && (
                <span className="px-1 text-ui-xs font-semibold text-app-mute @4xl:hidden">+{items.length - 2} more</span>
              )}
              {items.length === 0 && (
                <span className="rounded-app border border-dashed border-app-border py-4 text-center text-ui-xs text-app-mute">None</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ListHeader({ view }: { view: "gallery" | "board" }) {
  return (
    <>
      <AppKpiStrip
        items={[
          { label: "Active", value: String(ACTIVE_COUNT), note: "deposit paid · active · healing" },
          { label: "In deposit pools", value: usd(IN_DEPOSIT_POOLS_CENTS), note: "unspent pool balances", accent: true },
          { label: "Avg completion", value: `${AVG_COMPLETION_PCT}%`, note: "sessions completed / planned" },
        ]}
      />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <ToolbarSegmented options={["Gallery", "Board", "List"]} active={view === "gallery" ? "Gallery" : "Board"} />
          <ToolbarSelect label="All statuses" className="hidden @md:inline-flex" />
        </div>
        <ToolbarSearch placeholder="Search projects" className="hidden w-[200px] @2xl:flex" />
      </div>
    </>
  );
}

/** Three rows at 1 column, then full rows: 4 at 2 columns, 6 at 3, 4 at 4. */
function galleryVisibility(i: number): string {
  if (i < 3) return "";
  if (i < 4) return "hidden @md:block";
  if (i < 6) return "hidden @3xl:block @5xl:hidden";
  return "hidden";
}

/* ─── Detail: Asha M.'s koi sleeve ────────────────────────────────────────── */

/** Session chip labels (components/projects/SessionsTab.tsx STATUS_CHIP). */
const SESSION_CHIP: Record<ProjectSession["state"], { tone: "success" | "active" | "neutral"; label: string }> = {
  done: { tone: "success", label: "Completed" },
  today: { tone: "active", label: "In progress" },
  booked: { tone: "neutral", label: "Confirmed" },
  "not-booked": { tone: "neutral", label: "Not booked" },
};

/** The pool's ledger: one deposit in, one application out (sample-data: $300 paid Thu, Aug 13). */
function poolLedger(p: Project): { label: string; when: string; cents: number }[] {
  const applied = p.sessions.filter((s) => s.appliedCents);
  return [
    { label: "Deposit paid", when: "Thu, Aug 13", cents: p.pool.paidInCents },
    ...applied.map((s) => ({ label: `Applied to S${s.n}`, when: s.date, cents: -(s.appliedCents ?? 0) })),
  ];
}

function SessionRow({ s, last, checkoutCents }: { s: ProjectSession; last: boolean; checkoutCents?: number }) {
  const chip = SESSION_CHIP[s.state];
  const done = s.state === "done";
  return (
    <div className={cn("flex items-start gap-3 px-4 py-3", !last && "border-b border-app-border", s.state === "today" && "bg-app-sidebar")}>
      <span
        className={cn(
          "mt-px flex h-7 w-7 shrink-0 items-center justify-center rounded-app",
          done ? "bg-app-success-bg text-app-success" : "bg-graphite/[0.05] text-app-soft",
        )}
      >
        {done ? <CircleCheck size={14} strokeWidth={2} /> : <CalendarCheck size={14} strokeWidth={1.9} />}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-ui font-semibold whitespace-nowrap text-app-text">Session {s.n}</span>
          <AppStatus tone={chip.tone}>{chip.label}</AppStatus>
        </div>
        <span className="mt-1 block text-ui-sm text-app-mute">
          {s.date}
          {s.note ? ` · ${s.note}` : ""}
        </span>
      </div>
      {s.appliedCents ? (
        <span className="shrink-0 text-right text-ui-sm tabular-nums">
          <span className="block font-semibold text-app-text">{usd(s.appliedCents)}</span>
          <span className="block text-ui-xs text-app-mute">from pool</span>
        </span>
      ) : checkoutCents ? (
        <span className="shrink-0 text-right text-ui-sm tabular-nums">
          <span className="block font-semibold text-app-text">{usd(checkoutCents)}</span>
          {/* Two short lines so the figure's column stays narrow beside the session detail. */}
          <span className="block text-ui-xs text-app-mute">from pool</span>
          <span className="block text-ui-xs text-app-mute">at checkout</span>
        </span>
      ) : null}
    </div>
  );
}

function PoolFigure({ label, cents, strong }: { label: string; cents: number; strong?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5">
      <AppLabel>{label}</AppLabel>
      <span className={cn("text-[18px] leading-tight font-extrabold tabular-nums", strong ? "text-app-success" : "text-app-text")}>
        {usd(cents)}
      </span>
    </div>
  );
}

function Detail() {
  const p = ASHA_PROJECT;
  const done = doneCount(p);
  const next = p.sessions.find((s) => s.state === "booked");
  const current = p.sessions.find((s) => s.state === "today");
  const photos = p.sessions.filter((s) => s.state === "done");
  /** Today's session takes its share of the pool when Dev checks Asha out. */
  const todayDeposit = TODAY_SESSIONS.find((s) => s.projectId === p.id)?.deposit?.cents;

  return (
    <div className="flex flex-col gap-4 px-4 pt-3 pb-5 @lg:px-6 @lg:pb-6">
      <AppKpiStrip
        items={[
          { label: "Sessions", value: `${done} of ${p.sessions.length}`, note: current ? `session ${current.n} in the chair` : undefined },
          { label: "Next session", value: next ? next.date.split(",").slice(0, 2).join(",") : "—", note: next ? `${next.date.split(", ").pop()} · session ${next.n}` : undefined },
          { label: "Pool balance", value: usd(p.pool.availableCents), note: `of ${usd(p.pool.paidInCents)} paid in`, accent: true },
        ]}
      />
      <AppTabs tabs={["Sessions", "Photos", "Moodboard", "Activity"]} active="Sessions" className="-mx-4 @lg:-mx-6 @lg:px-6" />

      <div className="grid gap-4 @3xl:grid-cols-[minmax(0,1fr)_252px]">
        {/* Title and action both shorten in narrow frames, so neither ever breaks mid-word. */}
        <AppCard
          title={
            <>
              <span className="@min-[26rem]:hidden">
                {done} of {p.sessions.length} done
              </span>
              <span className="hidden @min-[26rem]:inline">
                {done} of {p.sessions.length} sessions complete
              </span>
            </>
          }
          meta={
            <AppButton icon={CalendarPlus} className="h-7">
              <span className="@min-[22rem]:hidden">Book</span>
              <span className="hidden @min-[22rem]:inline">Book next session</span>
            </AppButton>
          }
          padded={false}
        >
          {p.sessions.map((s, i) => (
            <SessionRow
              key={s.n}
              s={s}
              last={i === p.sessions.length - 1}
              checkoutCents={s.state === "today" ? todayDeposit : undefined}
            />
          ))}
        </AppCard>

        <div className="flex flex-col gap-4">
          <AppCard title="Deposit pool" meta={<AppStatus tone="success">{usd(p.pool.availableCents)} in pool</AppStatus>}>
            <div className="grid grid-cols-2 gap-x-3 gap-y-3">
              <PoolFigure label="Paid in" cents={p.pool.paidInCents} />
              <PoolFigure label="Applied" cents={p.pool.appliedCents} />
              <PoolFigure label="Available" cents={p.pool.availableCents} strong />
              <PoolFigure label="Refundable" cents={p.pool.refundableCents} />
            </div>
            <div className="mt-3.5 flex flex-col border-t border-app-border pt-2.5">
              {poolLedger(p).map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-2 py-1 text-ui-sm">
                  <span className="min-w-0 truncate text-app-text">
                    {row.label}
                    <span className="text-app-mute"> · {row.when}</span>
                  </span>
                  <span className={cn("shrink-0 font-semibold tabular-nums", row.cents > 0 ? "text-app-success" : "text-app-text")}>
                    {row.cents > 0 ? "+" : ""}
                    {usd(row.cents)}
                  </span>
                </div>
              ))}
            </div>
          </AppCard>

          <AppCard title="Photos" meta={`${photos.length} sessions`}>
            <div className="grid grid-cols-3 gap-2">
              {photos.map((s) => (
                <PhotoTile key={s.n} label={`S${s.n}`} caption={s.date.replace(/^\w+, /, "")} />
              ))}
            </div>
          </AppCard>
        </div>
      </div>
    </div>
  );
}

/**
 * Projects (app: /projects, projects/_proto/ProjectsList.tsx; detail
 * components/projects/*). Gallery and Board are the list views with the
 * "Multi-session work" head; Detail is Asha M.'s koi sleeve with its sessions
 * and deposit pool.
 */
export function ProjectsScreen({ view = "gallery", className }: { view?: "gallery" | "board" | "detail"; className?: string }) {
  if (view === "detail") {
    const p = ASHA_PROJECT;
    const artist = ARTISTS[p.artist];
    return (
      <AppFrame
        active="projects"
        className={className}
        greeting={p.title}
        meta={
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="flex items-center gap-1 text-app-mute">
              Projects <ChevronRight size={12} strokeWidth={2} />
            </span>
            <AppProjectStatus status={p.status} />
            <span>
              <span className="font-serif text-[13px] italic">{p.client}</span> · {artist.name} · {p.placement}
            </span>
          </span>
        }
      >
        <Detail />
      </AppFrame>
    );
  }

  return (
    <AppFrame
      active="projects"
      className={className}
      greeting="Multi-session work"
      meta="Sleeves, back pieces, and the long commitments."
      actions={
        <AppButton variant="primary" icon={Plus}>
          New project
        </AppButton>
      }
    >
      <div className="flex flex-col gap-4 px-4 pb-5 @lg:px-6 @lg:pb-6">
        <ListHeader view={view} />
        {view === "gallery" ? (
          <div className="grid grid-cols-1 gap-3 @md:grid-cols-2 @3xl:grid-cols-3 @5xl:grid-cols-4">
            {PROJECTS.map((p, i) => (
              <div key={p.id} className={galleryVisibility(i)}>
                <GalleryCard p={p} seed={i} />
              </div>
            ))}
          </div>
        ) : (
          <Board />
        )}
      </div>
    </AppFrame>
  );
}
