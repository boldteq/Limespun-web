import type React from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/components/system/cn";
import {
  BOOKING_STATUS_LABEL,
  PROJECT_STATUS_LABEL,
  type BookingStatus,
  type ProjectStatus,
  type SampleTone,
} from "./sample-data";

/**
 * Building blocks for app screens, sized and coloured like the app
 * (InkOS theme/semantic.css). Everything renders as plain spans and divs:
 * mockups are decorative, so nothing here is focusable or a heading.
 */

/* ─── Labels ──────────────────────────────────────────────────────────────── */

/** The app's small uppercase label ("NEXT UP", "DEPOSIT POOL"). */
export function AppLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("block text-kpi-label font-bold text-app-mute uppercase", className)}>{children}</span>
  );
}

/* ─── KPIs ────────────────────────────────────────────────────────────────── */

export interface AppKpiItem {
  label: string;
  value: string;
  /** Muted figure after the value ("$150", "0 done · 4 ahead"). */
  plain?: string;
  /** Caption under the value ("at risk", "3 pending approval"). */
  note?: string;
  trend?: { dir: "up" | "down"; value: string };
  /** Rust value and dot, for the figure that needs action. */
  accent?: boolean;
  icon?: LucideIcon;
}

/**
 * Rough advance of a KPI value in em (Inter 800, tabular figures, -0.02em
 * tracking). Only used to size the value to its tile, so it errs wide.
 */
function kpiValueEm(value: string): number {
  let em = 0;
  for (const ch of value) {
    if (/[0-9$+\-−–]/.test(ch)) em += 0.64;
    else if (/[,.·:;'’]/.test(ch)) em += 0.32;
    else if (ch === " ") em += 0.28;
    else if (ch === "%") em += 0.9;
    else if (ch === "/") em += 0.44;
    else if (/[MWmw]/.test(ch)) em += 0.94;
    else if (/[A-Z]/.test(ch)) em += 0.74;
    else if (/[ijlft]/.test(ch)) em += 0.38;
    else em += 0.62;
  }
  return Math.max(em - 0.02 * value.length, 1);
}

/**
 * The value's size follows its tile (the cell is an inline-size container): full
 * text-kpi-value when the tile has room, stepping down in proportion to the
 * string so "$25,910" or "Instagram" never clips in a two-up strip at 320.
 */
function kpiValueSize(value: string): React.CSSProperties {
  const cqi = Math.min(96 / kpiValueEm(value), 40).toFixed(1);
  return { fontSize: `clamp(15px, ${cqi}cqi, var(--text-kpi-value))` };
}

export function AppKpi({ label, value, plain, note, trend, accent, icon: Icon, className }: AppKpiItem & { className?: string }) {
  return (
    <div data-kpi className={cn("@container/kpi flex min-w-0 flex-col gap-2", className)}>
      <div className="flex min-w-0 items-start gap-1.5">
        {Icon && (
          <Icon
            size={13}
            strokeWidth={1.8}
            className={cn("mt-px shrink-0 @max-[8.5rem]/kpi:hidden", accent ? "text-app-active-fg" : "text-app-mute")}
          />
        )}
        {/* In a tile under 7.5rem (two-up at 320) the label steps to 10px and the dot goes,
            so one-word labels like TRANSACTIONS fit whole; the value stays rust. */}
        <span
          data-kpi-label
          className="min-w-0 text-kpi-label font-bold text-app-mute uppercase @max-[7.5rem]/kpi:text-[10px] @max-[7.5rem]/kpi:tracking-[0.02em]"
        >
          {label}
        </span>
        {accent && <span className="mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full bg-app-active-fg @max-[7.5rem]/kpi:hidden" />}
      </div>
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <span
          data-kpi-value
          className={cn("text-kpi-value font-extrabold whitespace-nowrap tabular-nums", accent ? "text-app-active-fg" : "text-app-text")}
          style={kpiValueSize(value)}
        >
          {value}
        </span>
        {trend && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-ui-xs font-semibold tabular-nums",
              trend.dir === "up" ? "text-app-success" : "text-app-danger",
            )}
          >
            {trend.dir === "up" ? <ArrowUpRight size={12} strokeWidth={2.2} /> : <ArrowDownRight size={12} strokeWidth={2.2} />}
            {trend.value}
          </span>
        )}
        {plain && <span className="text-ui-xs text-app-mute tabular-nums">{plain}</span>}
      </div>
      {note && <span className="text-ui-xs leading-snug text-app-mute">{note}</span>}
    </div>
  );
}

/* Literal class strings so Tailwind sees every one. Below the container step an
   odd last cell spans the row instead of leaving a hole. */
const KPI_COLS: Record<number, { grid: string; oddLast: string }> = {
  1: { grid: "grid-cols-1", oddLast: "" },
  2: { grid: "grid-cols-2", oddLast: "" },
  3: { grid: "grid-cols-2 @xl:grid-cols-3", oddLast: "col-span-2 @xl:col-span-1" },
  4: { grid: "grid-cols-2 @3xl:grid-cols-4", oddLast: "" },
  5: { grid: "grid-cols-2 @4xl:grid-cols-5", oddLast: "col-span-2 @4xl:col-span-1" },
};

/** The app's KPI strip: one white card, 1px dividers between cells. */
export function AppKpiStrip({ items, className }: { items: AppKpiItem[]; className?: string }) {
  const cols = KPI_COLS[Math.min(Math.max(items.length, 1), 5)];
  return (
    <div className={cn("grid gap-px overflow-hidden rounded-app-lg bg-app-border ring-1 ring-app-border", cols.grid, className)}>
      {items.map((it, i) => (
        <AppKpi
          key={it.label}
          {...it}
          className={cn(
            "bg-app-surface px-3 py-3 @sm:px-4 @sm:py-3.5 @lg:px-5 @lg:py-4",
            i === items.length - 1 && items.length % 2 === 1 && cols.oddLast,
          )}
        />
      ))}
    </div>
  );
}

/* ─── Table ───────────────────────────────────────────────────────────────── */

export interface AppColumn {
  label: string;
  align?: "left" | "right" | "center";
  /** Width or visibility classes for the column, e.g. "w-[28%]". */
  className?: string;
  /**
   * Tabular figures for the column's cells. Defaults to on for right- and
   * centre-aligned (money, counts) and off for text, where Inter's tabular
   * hyphen would spread "Fine-line" into "Fine - line".
   */
  numeric?: boolean;
}

export interface AppTableRow {
  key: string;
  cells: React.ReactNode[];
  /** "active" = the row the story is about (sand fill); "muted" = greyed out. */
  tone?: "default" | "active" | "muted";
}

/** Minimum table widths, as literal classes: the table scrolls inside the frame below this. */
const TABLE_MIN: Record<AppTableMinWidth, { table: string; fade: string }> = {
  /* For tables whose columns hide by container width (className "hidden @min-[…]:table-cell"). */
  200: { table: "min-w-[200px]", fade: "@min-[200px]:hidden" },
  360: { table: "min-w-[360px]", fade: "@min-[360px]:hidden" },
  480: { table: "min-w-[480px]", fade: "@min-[480px]:hidden" },
  560: { table: "min-w-[560px]", fade: "@min-[560px]:hidden" },
  640: { table: "min-w-[640px]", fade: "@min-[640px]:hidden" },
  720: { table: "min-w-[720px]", fade: "@min-[720px]:hidden" },
  840: { table: "min-w-[840px]", fade: "@min-[840px]:hidden" },
  960: { table: "min-w-[960px]", fade: "@min-[960px]:hidden" },
};
export type AppTableMinWidth = 200 | 360 | 480 | 560 | 640 | 720 | 840 | 960;

const ALIGN = { left: "text-left", right: "text-right", center: "text-center" } as const;

function isNumeric(c: AppColumn | undefined): boolean {
  if (!c) return false;
  return c.numeric ?? (c.align === "right" || c.align === "center");
}

/**
 * A dense app table. Narrower than `minWidth`, it scrolls sideways inside its own
 * box (never the page) with a fade on the right edge. Pass `maxHeight` to scroll
 * rows under a sticky header.
 */
export function AppTable({
  columns,
  rows,
  minWidth = 640,
  maxHeight,
  className,
}: {
  columns: AppColumn[];
  rows: AppTableRow[];
  minWidth?: AppTableMinWidth;
  /** CSS length, e.g. "320px". */
  maxHeight?: string;
  className?: string;
}) {
  const min = TABLE_MIN[minWidth];
  return (
    <div className={cn("@container relative w-full max-w-full min-w-0", className)}>
      <div className="overflow-x-auto overscroll-x-contain" style={maxHeight ? { maxHeight } : undefined}>
        <table className={cn("w-full border-collapse text-ui-sm text-app-text", min.table)}>
          <thead>
            <tr>
              {columns.map((c) => (
                <th
                  key={c.label}
                  scope="col"
                  className={cn(
                    "sticky top-0 z-[1] h-9 border-b border-app-border bg-app-surface px-3 text-kpi-label font-bold whitespace-nowrap text-app-mute uppercase first:pl-4 last:pr-4",
                    ALIGN[c.align ?? "left"],
                    c.className,
                  )}
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.key}
                className={cn(
                  "border-b border-app-border last:border-b-0",
                  r.tone === "active" && "bg-app-sidebar",
                  r.tone === "muted" && "text-app-mute",
                )}
              >
                {r.cells.map((cell, i) => (
                  <td
                    key={columns[i]?.label ?? i}
                    className={cn(
                      "h-11 px-3 align-middle whitespace-nowrap first:pl-4 last:pr-4",
                      ALIGN[columns[i]?.align ?? "left"],
                      isNumeric(columns[i]) && "tabular-nums",
                      columns[i]?.className,
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-app-surface to-transparent",
          min.fade,
        )}
      />
    </div>
  );
}

/* ─── Tabs ────────────────────────────────────────────────────────────────── */

export interface AppTab {
  label: string;
  count?: number;
}

function TabItem({ tab, on, className }: { tab: AppTab; on: boolean; className?: string }) {
  return (
    <span
      data-tab={on ? "active" : ""}
      className={cn(
        "relative flex h-9 shrink-0 items-center gap-1.5 text-ui-sm whitespace-nowrap",
        on ? "font-semibold text-app-text" : "font-medium text-app-mute",
        className,
      )}
    >
      {tab.label}
      {tab.count !== undefined && (
        <span
          className={cn(
            "rounded-full px-1.5 text-[10px] leading-4 font-bold tabular-nums",
            on ? "bg-graphite text-white" : "bg-graphite/[0.07] text-app-soft",
          )}
        >
          {tab.count}
        </span>
      )}
      {on && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-graphite" />}
    </span>
  );
}

/*
 * The active tab is always whole, and no tab is ever cut. Each other tab stays
 * only while the strip (an inline-size container) is wide enough for it and every
 * tab that outranks it: the active one first, then its neighbours alternately,
 * after then before. Widths are a deliberately generous estimate, rounded up to a
 * container-query step, so a tab leaves (display: none) before it could crowd.
 * The strip reads as the app's tab bar scrolled to the active tab. As a backstop
 * the tabs after it sit in a one-line wrapping box, where a tab that still didn't
 * fit would drop to a hidden second line, whole.
 */
const TAB_GAP_PX = 20;

/** Rough rendered width of a tab (text-ui-sm Inter, count pill), erring wide. */
function tabWidthPx(tab: AppTab): number {
  let px = 0;
  for (const ch of tab.label) {
    if (ch === " ") px += 3.3;
    else if (/[MWmw]/.test(ch)) px += 10.5;
    else if (/[A-Z&]/.test(ch)) px += 8.5;
    else if (/[ijlrtf]/.test(ch)) px += 3.6;
    else px += 7;
  }
  const pill = tab.count !== undefined ? 17.5 + 6.2 * String(tab.count).length : 0;
  return px * 1.04 + pill + 2;
}

/**
 * Strip widths (content box) a before-tab can need, as literal classes so Tailwind
 * emits them: 16px steps through phone and tablet frames, 40px after.
 */
const TAB_HIDE_BELOW: [number, string][] = [
  [160, "@max-[160px]/tabs:hidden"],
  [176, "@max-[176px]/tabs:hidden"],
  [192, "@max-[192px]/tabs:hidden"],
  [208, "@max-[208px]/tabs:hidden"],
  [224, "@max-[224px]/tabs:hidden"],
  [240, "@max-[240px]/tabs:hidden"],
  [256, "@max-[256px]/tabs:hidden"],
  [272, "@max-[272px]/tabs:hidden"],
  [288, "@max-[288px]/tabs:hidden"],
  [304, "@max-[304px]/tabs:hidden"],
  [320, "@max-[320px]/tabs:hidden"],
  [336, "@max-[336px]/tabs:hidden"],
  [352, "@max-[352px]/tabs:hidden"],
  [368, "@max-[368px]/tabs:hidden"],
  [384, "@max-[384px]/tabs:hidden"],
  [400, "@max-[400px]/tabs:hidden"],
  [416, "@max-[416px]/tabs:hidden"],
  [432, "@max-[432px]/tabs:hidden"],
  [448, "@max-[448px]/tabs:hidden"],
  [464, "@max-[464px]/tabs:hidden"],
  [480, "@max-[480px]/tabs:hidden"],
  [520, "@max-[520px]/tabs:hidden"],
  [560, "@max-[560px]/tabs:hidden"],
  [600, "@max-[600px]/tabs:hidden"],
  [640, "@max-[640px]/tabs:hidden"],
  [680, "@max-[680px]/tabs:hidden"],
  [720, "@max-[720px]/tabs:hidden"],
  [760, "@max-[760px]/tabs:hidden"],
  [800, "@max-[800px]/tabs:hidden"],
  [840, "@max-[840px]/tabs:hidden"],
  [880, "@max-[880px]/tabs:hidden"],
  [920, "@max-[920px]/tabs:hidden"],
  [960, "@max-[960px]/tabs:hidden"],
];

/**
 * The class that hides a tab below the step for `needPx`. Rounded up for tabs
 * before the active one; rounded down for tabs after it, where the wrapping box
 * catches the rare one that shows on a step it doesn't quite fit.
 */
function hideBelow(needPx: number, round: "up" | "down"): string {
  const steps = TAB_HIDE_BELOW;
  const at = round === "up" ? steps.findIndex(([px]) => px >= needPx) : steps.findLastIndex(([px]) => px <= needPx);
  return steps[at < 0 ? (round === "up" ? steps.length - 1 : 0) : at][1];
}

const TAB_BOX = "flex h-9 min-w-0 flex-wrap content-start overflow-hidden";

/**
 * Static page tabs: the active one is graphite with an underline, and always
 * whole. In a narrow frame the strip shows as many whole tabs around it as fit.
 */
export function AppTabs({
  tabs,
  active,
  className,
}: {
  tabs: (string | AppTab)[];
  /** Label of the active tab. */
  active: string;
  className?: string;
}) {
  const list: AppTab[] = tabs.map((t) => (typeof t === "string" ? { label: t } : t));
  const at = list.findIndex((t) => t.label === active);
  const current = at >= 0 ? list[at] : undefined;
  const before = at > 0 ? list.slice(0, at) : [];
  const after = list.slice(at + 1);

  // Width each tab needs to stay: itself plus every tab that outranks it.
  const ranked: AppTab[] = at < 0 ? [...list] : [];
  for (let d = 1; at >= 0 && d < list.length; d += 1) {
    if (at + d < list.length) ranked.push(list[at + d]);
    if (at - d >= 0) ranked.push(list[at - d]);
  }
  const hide = new Map<string, string>();
  let needPx = current ? tabWidthPx(current) : -TAB_GAP_PX;
  for (const t of ranked) {
    needPx += tabWidthPx(t) + TAB_GAP_PX;
    hide.set(t.label, hideBelow(needPx, before.includes(t) ? "up" : "down"));
  }

  return (
    <div data-tabs className={cn("@container/tabs flex border-b border-app-border px-4 @lg:px-5", className)}>
      {before.map((t) => (
        <TabItem key={t.label} tab={t} on={false} className={cn("mr-5", hide.get(t.label))} />
      ))}
      {current && <TabItem tab={current} on />}
      {after.length > 0 && (
        <div className={TAB_BOX}>
          <span className="h-9 w-0 shrink-0" />
          {after.map((t, i) => (
            <TabItem key={t.label} tab={t} on={false} className={cn((current || i > 0) && "ml-5", hide.get(t.label))} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Status chips ────────────────────────────────────────────────────────── */

/** success/warning/danger/info = the app's status tones; active = the rust "In progress" chip. */
export type AppStatusTone = "success" | "warning" | "danger" | "info" | "neutral" | "active";

const STATUS_TONE: Record<AppStatusTone, string> = {
  success: "bg-app-success-bg text-app-success",
  warning: "bg-app-warning-bg text-app-warning",
  danger: "bg-app-danger-bg text-app-danger",
  info: "bg-app-info-bg text-app-info",
  neutral: "bg-graphite/[0.06] text-app-soft",
  active: "bg-app-active text-app-active-fg",
};

export function AppStatus({
  tone,
  dot = false,
  icon: Icon,
  className,
  children,
}: {
  tone: AppStatusTone;
  dot?: boolean;
  icon?: LucideIcon;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center gap-1 rounded-full px-2 text-ui-xs font-semibold whitespace-nowrap",
        STATUS_TONE[tone],
        className,
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {Icon && <Icon size={11} strokeWidth={2.2} />}
      {children}
    </span>
  );
}

/** Booking status tones from the app (appointments/_proto/data.ts APPT_STATUS). */
const BOOKING_TONE: Record<BookingStatus, AppStatusTone> = {
  pending: "warning",
  confirmed: "neutral",
  in_progress: "active",
  completed: "success",
  cancelled: "neutral",
  no_show: "danger",
};

export function AppBookingStatus({ status, className }: { status: BookingStatus; className?: string }) {
  return (
    <AppStatus tone={BOOKING_TONE[status]} className={className}>
      {BOOKING_STATUS_LABEL[status]}
    </AppStatus>
  );
}

/** Project status tones from the app (projects/_proto/data.ts PROJ_STATUS). */
const PROJECT_TONE: Record<ProjectStatus, AppStatusTone> = {
  planning: "neutral",
  deposit_paid: "warning",
  active: "active",
  healing: "info",
  completed: "success",
  on_hold: "neutral",
  cancelled: "neutral",
};

export function AppProjectStatus({ status, className }: { status: ProjectStatus; className?: string }) {
  return (
    <AppStatus tone={PROJECT_TONE[status]} className={className}>
      {PROJECT_STATUS_LABEL[status]}
    </AppStatus>
  );
}

/* ─── Buttons ─────────────────────────────────────────────────────────────── */

/**
 * The app's in-app primary is rust, darker than the site's ember (white label 5.18:1).
 * It exists only inside app mockups, so it lives here rather than in the site tokens.
 */
const APP_PRIMARY_RUST = "#C2410C";

/**
 * primary = rust (inside the app); onyx = the dark primary the app's public pages use
 * (booking page, consent, client portal); secondary = outline; ghost = text only.
 */
export function AppButton({
  variant = "secondary",
  icon: Icon,
  className,
  children,
}: {
  variant?: "primary" | "onyx" | "secondary" | "ghost";
  icon?: LucideIcon;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-app px-3 text-ui-sm font-semibold whitespace-nowrap",
        variant === "primary" && "text-white",
        variant === "onyx" && "bg-app-text text-white",
        variant === "secondary" && "border border-app-border bg-app-surface text-app-text shadow-[0_1px_2px_rgba(28,25,23,0.05)]",
        variant === "ghost" && "text-app-soft",
        className,
      )}
      style={variant === "primary" ? { backgroundColor: APP_PRIMARY_RUST } : undefined}
    >
      {Icon && <Icon size={14} strokeWidth={2} />}
      {children}
    </span>
  );
}

/* ─── Avatar ──────────────────────────────────────────────────────────────── */

const AVATAR_TONE: Record<SampleTone, string> = {
  ember: "bg-app-active text-app-active-fg",
  info: "bg-app-info-bg text-app-info",
  warning: "bg-app-warning-bg text-app-warning",
  success: "bg-app-success-bg text-app-success",
  neutral: "bg-graphite/[0.07] text-app-soft",
};

const AVATAR_SIZE = {
  xs: "h-5 w-5 text-[9px]",
  sm: "h-6 w-6 text-[10px]",
  md: "h-8 w-8 text-ui-xs",
  lg: "h-10 w-10 text-ui-sm",
} as const;

/** Initials in a tinted circle. Artists carry their tone from sample-data (Dev ember, Mara info, Rio warning). */
export function AppAvatar({
  initials,
  tone = "neutral",
  size = "sm",
  className,
}: {
  initials: string;
  tone?: SampleTone;
  size?: keyof typeof AVATAR_SIZE;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-bold tracking-[0.02em]",
        AVATAR_TONE[tone],
        AVATAR_SIZE[size],
        className,
      )}
    >
      {initials}
    </span>
  );
}

/* ─── Calendar now-line ───────────────────────────────────────────────────── */

/**
 * The current-time rule on a time grid. The parent is `relative`; `top` places
 * the rule (e.g. "18%", or from minutes: `${((NOW.minutes - start) / span) * 100}%`).
 */
export function NowLine({ time, top, className }: { time: string; top: string; className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-x-0 z-[2] flex -translate-y-1/2 items-center", className)} style={{ top }}>
      <span className="rounded-full bg-app-active-fg px-1.5 text-[10px] leading-4 font-bold text-white tabular-nums">{time}</span>
      <span className="h-px flex-1 bg-ember" />
    </div>
  );
}

/* ─── Photo tile ──────────────────────────────────────────────────────────── */

const PHOTO_ASPECT = {
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[3/2]",
} as const;

/**
 * The tile label, letter and number apart: the letter stays in Instrument Serif,
 * the number is set in Inter, because the serif's 1 reads as an l ("S1" as "Sl").
 */
const PHOTO_LABEL_SIZE = {
  md: { letter: "text-[22px]", number: "text-[17px]" },
  sm: { letter: "text-[12px]", number: "text-[10px]" },
} as const;

export function PhotoLabel({ label, size = "md" }: { label: string; size?: keyof typeof PHOTO_LABEL_SIZE }) {
  const s = PHOTO_LABEL_SIZE[size];
  const at = label.search(/\d/);
  if (at < 0) return <span className={cn("font-serif", s.letter)}>{label}</span>;
  return (
    <span className="flex items-baseline leading-none">
      <span className={cn("font-serif", s.letter)}>{label.slice(0, at)}</span>
      <span className={cn("font-sans font-medium tracking-[-0.01em] tabular-nums", s.number)}>{label.slice(at)}</span>
    </span>
  );
}

/**
 * Stands in for a photo of work: a canvas-deep block with a label ("S1", "P2",
 * "R3": serif letter, Inter number). Never draws or suggests tattoo art.
 * With `title` the tile prints the piece's name (and `subtitle`, e.g. its
 * style) large instead of the code, so a sheet of flash reads as a list of
 * named designs rather than blank squares. Children overlay the tile (a Healed
 * chip, a price).
 */
export function PhotoTile({
  label,
  caption,
  title,
  subtitle,
  aspect = "square",
  className,
  children,
}: {
  label: string;
  caption?: string;
  title?: string;
  subtitle?: string;
  aspect?: keyof typeof PHOTO_ASPECT;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-app bg-canvas-deep ring-1 ring-graphite/5 ring-inset", PHOTO_ASPECT[aspect], className)}>
      {title ? (
        /* Bottom-left like a label on a flash sheet; the top edge stays free for a status chip. */
        <span className="@container absolute inset-0 flex flex-col justify-end px-2.5 pt-8 pb-2.5 text-left">
          <span className="font-serif text-[clamp(15px,12cqi,24px)] leading-[1.05] text-graphite">{title}</span>
          {subtitle && <span className="mt-0.5 text-ui-xs font-medium text-graphite-soft">{subtitle}</span>}
        </span>
      ) : (
        /* Solid mute on canvas-deep: 4.76:1. */
        <span className="absolute inset-0 flex items-center justify-center leading-none text-mute">
          <PhotoLabel label={label} />
        </span>
      )}
      {caption && (
        <span className="absolute inset-x-0 bottom-0 truncate bg-linear-to-t from-canvas-deep px-2 pt-4 pb-1.5 text-ui-xs font-medium text-graphite-soft">
          {caption}
        </span>
      )}
      {children}
    </div>
  );
}

/* ─── Card ────────────────────────────────────────────────────────────────── */

/** A white app card with an optional header row (title left, meta or action right). */
export function AppCard({
  title,
  meta,
  padded = true,
  className,
  children,
}: {
  title?: React.ReactNode;
  meta?: React.ReactNode;
  padded?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("min-w-0 overflow-hidden rounded-app-lg bg-app-surface ring-1 ring-app-border", className)}>
      {(title || meta) && (
        <div className="flex min-h-11 items-center justify-between gap-3 border-b border-app-border px-4 py-2.5">
          {title && <span className="truncate text-ui font-semibold text-app-text">{title}</span>}
          {meta && <span className="flex shrink-0 items-center gap-2 text-ui-xs text-app-mute">{meta}</span>}
        </div>
      )}
      <div className={cn(padded && "p-4")}>{children}</div>
    </div>
  );
}
