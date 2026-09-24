import type { LucideIcon } from "lucide-react";
import {
  Check,
  CheckCheck,
  ChevronDown,
  Clock,
  DollarSign,
  FileSignature,
  Package,
  Pin,
  Search,
} from "lucide-react";
import { cn } from "@/components/system/cn";
import { AppFrame } from "./app-frame";
import { AppButton } from "./app-parts";
import { DEPOSITS_PENDING, DEPOSITS_PENDING_CENTS, NEEDS_ATTENTION, usd, type AttentionItem } from "./sample-data";

/**
 * Needs attention (app route /inbox). Mirrors inbox/_proto/Inbox.tsx: the
 * revenue-blocking band, category chips (All · Deposits · Forms · Clients ·
 * Bookings · Inventory · Inquiries), then the queue in urgency lanes
 * (Overdue · Today · This week). The first row is drawn hovered, so its quick
 * actions show: pin, snooze, the row's action and resolve.
 *
 * The rows are sample-data NEEDS_ATTENTION (the queue lib/inbox/queue.ts
 * builds from this studio's data, in its words), the same rows the sidebar
 * badge counts.
 */

type Category = "Deposits" | "Forms" | "Clients" | "Bookings" | "Inventory" | "Inquiries";
type TileTone = "rust" | "info" | "warn" | "stone";

interface Row extends AttentionItem {
  icon: LucideIcon;
  tone: TileTone;
  cat: Category;
}

const KIND: Record<AttentionItem["kind"], { icon: LucideIcon; tone: TileTone; cat: Category }> = {
  form: { icon: FileSignature, tone: "info", cat: "Forms" },
  stock: { icon: Package, tone: "warn", cat: "Inventory" },
  deposit: { icon: DollarSign, tone: "rust", cat: "Deposits" },
};

const ITEMS: Row[] = NEEDS_ATTENTION.map((item) => ({ ...item, ...KIND[item.kind] }));

const TILE: Record<TileTone, string> = {
  rust: "bg-app-active text-app-active-fg",
  info: "bg-app-info-bg text-app-info",
  warn: "bg-app-warning-bg text-app-warning",
  stone: "bg-graphite/[0.06] text-app-mute",
};

const FILTERS: ("All" | Category)[] = ["All", "Deposits", "Forms", "Clients", "Bookings", "Inventory", "Inquiries"];

const LANES: { key: AttentionItem["lane"]; label: string }[] = [
  { key: "overdue", label: "Overdue" },
  { key: "today", label: "Today" },
  { key: "week", label: "This week" },
];

/** The row drawn in its hover state: the top of the queue. */
const HOVERED = ITEMS[0];

function IconSquare({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return (
    <span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px] border border-app-border bg-app-surface text-app-mute", className)}>
      <Icon size={13} strokeWidth={1.9} />
    </span>
  );
}

/**
 * Title and detail wrap instead of clipping. Below @sm the hovered row's actions drop
 * under the text (second grid row), so the title keeps the row's full width.
 */
function QueueRow({ r, hovered }: { r: Row; hovered: boolean }) {
  const Icon = r.icon;
  return (
    <div
      className={cn(
        "relative grid grid-cols-[34px_minmax(0,1fr)_auto] items-center gap-x-3 py-3 pr-3 pl-5 @lg:pr-4",
        hovered && "grid-cols-[34px_minmax(0,1fr)] bg-app-sidebar @sm:grid-cols-[34px_minmax(0,1fr)_auto]",
      )}
    >
      {r.unread && <span className="absolute top-[29px] left-[7px] h-2 w-2 -translate-y-1/2 rounded-full bg-app-active-fg @sm:top-1/2" />}
      <span className={cn("flex h-[34px] w-[34px] items-center justify-center self-start rounded-app @sm:self-center", TILE[r.tone])}>
        <Icon size={16} strokeWidth={1.8} />
      </span>
      <div className="min-w-0">
        <p className={cn("text-[13px] leading-snug text-app-text", r.unread ? "font-bold" : "font-semibold")}>{r.title}</p>
        <p className="text-ui-sm text-app-mute">{r.sub}</p>
      </div>
      {hovered ? (
        <div className="col-start-2 mt-2 flex items-center gap-1.5 @sm:col-start-auto @sm:mt-0">
          <IconSquare icon={Pin} className="hidden @xl:flex" />
          <IconSquare icon={Clock} className="@sm:hidden @md:flex" />
          <span className="inline-flex h-7 items-center rounded-[7px] bg-app-text px-2.5 text-ui-xs font-semibold whitespace-nowrap text-white">
            {r.action}
          </span>
          <IconSquare icon={Check} className="text-app-success @sm:hidden @md:flex" />
        </div>
      ) : (
        <span className="self-start pt-0.5 text-ui-xs text-app-mute tabular-nums @sm:self-center @sm:pt-0">{r.time}</span>
      )}
    </div>
  );
}

export function NeedsAttentionScreen({ className }: { className?: string }) {
  const counts = new Map<string, { n: number; overdue: boolean }>();
  for (const f of FILTERS) {
    const rows = f === "All" ? ITEMS : ITEMS.filter((r) => r.cat === f);
    counts.set(f, { n: rows.length, overdue: rows.some((r) => r.lane === "overdue") });
  }

  return (
    <AppFrame
      active="needs-attention"
      /* The line only fits beside the title in wide frames; narrower, the title keeps the room. */
      meta={<span className="hidden @4xl/frame:inline">Everything that needs a hand, triaged in one place.</span>}
      actions={
        <AppButton icon={CheckCheck} className="h-7 px-2.5 text-ui-xs">
          Resolve all
        </AppButton>
      }
      className={className}
    >
      <div className="flex flex-col gap-4 px-4 py-4 @lg:px-6 @lg:py-5">
        {/* Search */}
        <div className="flex h-8 items-center gap-2 rounded-app border border-app-border bg-app-surface px-2.5 text-ui-sm text-app-mute @xl:max-w-[320px]">
          <Search size={14} strokeWidth={1.8} />
          Search inbox…
        </div>

        {/* Revenue-blocking band */}
        <div className="flex items-center gap-3 rounded-app-lg border border-app-active-fg/20 bg-app-active px-3.5 py-3">
          <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-app bg-app-active-fg text-white">
            <DollarSign size={17} strokeWidth={2} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-bold text-app-text">{usd(DEPOSITS_PENDING_CENTS)} in revenue is blocked</p>
            <p className="text-ui-sm text-app-soft">
              {DEPOSITS_PENDING.length} item — {DEPOSITS_PENDING.length} unpaid deposit — needs attention before it falls
              through.
            </p>
          </div>
          <AppButton variant="primary" className="hidden h-7 px-2.5 text-ui-xs @md:inline-flex">
            Review →
          </AppButton>
        </div>

        {/* Category chips + sort */}
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2.5">
          <div className="flex flex-wrap gap-1.5">
            {FILTERS.map((f) => {
              const on = f === "All";
              const c = counts.get(f);
              return (
                <span
                  key={f}
                  className={cn(
                    "inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-ui-sm font-semibold whitespace-nowrap",
                    on ? "bg-app-text text-white" : "bg-graphite/[0.06] text-app-soft",
                  )}
                >
                  {f}
                  {c && c.n > 0 && (
                    <span
                      className={cn(
                        "inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold tabular-nums",
                        on ? "bg-white/20 text-white" : c.overdue ? "bg-app-active text-app-active-fg" : "bg-graphite/[0.08] text-app-soft",
                      )}
                    >
                      {c.n}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
          <span className="hidden h-7 items-center gap-1.5 rounded-app border border-app-border bg-app-surface px-2 text-ui-sm text-app-text @xl:inline-flex">
            Sort: Urgency
            <ChevronDown size={13} strokeWidth={1.8} className="text-app-mute" />
          </span>
        </div>

        {/* Urgency lanes */}
        <div className="flex flex-col gap-5">
          {LANES.map((lane) => {
            const rows = ITEMS.filter((r) => r.lane === lane.key);
            if (rows.length === 0) return null;
            const overdue = lane.key === "overdue";
            return (
              <div key={lane.key}>
                <div className="mb-2 flex items-center gap-2">
                  <span className={cn("text-[11px] font-bold tracking-[0.12em] uppercase", overdue ? "text-app-active-fg" : "text-app-mute")}>
                    {lane.label}
                  </span>
                  <span
                    className={cn(
                      "inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-graphite/[0.06] px-1.5 text-[11px] font-bold tabular-nums",
                      overdue ? "text-app-active-fg" : "text-app-mute",
                    )}
                  >
                    {rows.length}
                  </span>
                  <span className="h-px flex-1 bg-app-border" />
                </div>
                <div className="divide-y divide-app-border overflow-hidden rounded-app-lg bg-app-surface ring-1 ring-app-border">
                  {rows.map((r) => (
                    <QueueRow key={r.key} r={r} hovered={r === HOVERED} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppFrame>
  );
}
