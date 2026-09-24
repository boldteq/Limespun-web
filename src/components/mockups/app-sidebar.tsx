import type { LucideIcon } from "lucide-react";
import {
  BarChart2,
  Bell,
  Briefcase,
  CalendarCheck,
  CalendarDays,
  ChevronRight,
  ChevronsLeft,
  Clock,
  ConciergeBell,
  CreditCard,
  FileText,
  FolderKanban,
  Image as ImageIcon,
  Inbox,
  LayoutDashboard,
  MapPin,
  Megaphone,
  MessageSquare,
  Package,
  Scissors,
  Search,
  Settings,
  Sparkles,
  UserRound,
  Zap,
} from "lucide-react";
import { LimespunMark } from "@/components/brand/limespun-mark";
import { cn } from "@/components/system/cn";
import { NEEDS_ATTENTION, UNREAD_THREADS, VIEWER } from "./sample-data";

/**
 * The app's sidebar, row for row (InkOS components/app/sidebar/sidebar-nav.ts):
 * same groups, labels, lucide icons and lens switcher. Light sand rail, peach
 * active pill with a rust icon. The app nests Clients and Team under an
 * expandable "Users" row and Service List and Booking under "Services"; the
 * mockup shows the leaf rows flat, with Services keeping its chevron.
 */

export type AppNavItem =
  | "today"
  | "needs-attention"
  | "messages"
  | "calendar"
  | "appointments"
  | "projects"
  | "waitlist"
  | "clients"
  | "team"
  | "payments"
  | "services"
  | "forms"
  | "inventory"
  | "flash"
  | "flash-events"
  | "portfolio"
  | "locations"
  | "analytics"
  | "marketing"
  | "ai";

export type AppLens = "studio" | "artist" | "desk";

interface NavRow {
  id: AppNavItem;
  label: string;
  icon: LucideIcon;
  count?: number;
  /** The rust count pill. Only Needs attention uses it in the app. */
  urgent?: boolean;
  dot?: boolean;
  isNew?: boolean;
  parent?: boolean;
}

interface NavGroup {
  label: string | null;
  rows: NavRow[];
}

const ICON: Record<AppNavItem, LucideIcon> = {
  today: LayoutDashboard,
  "needs-attention": Inbox,
  messages: MessageSquare,
  calendar: CalendarDays,
  appointments: CalendarCheck,
  projects: FolderKanban,
  waitlist: Clock,
  clients: UserRound,
  team: Briefcase,
  payments: CreditCard,
  services: Scissors,
  forms: FileText,
  inventory: Package,
  flash: Sparkles,
  "flash-events": Zap,
  portfolio: ImageIcon,
  locations: MapPin,
  analytics: BarChart2,
  marketing: Megaphone,
  ai: Sparkles,
};

function row(id: AppNavItem, label: string, extra: Omit<NavRow, "id" | "label" | "icon"> = {}): NavRow {
  return { id, label, icon: ICON[id], ...extra };
}

const needsAttention = row("needs-attention", "Needs attention", { count: NEEDS_ATTENTION.length, urgent: true });
const messages = row("messages", "Messages", { count: UNREAD_THREADS });

const LENSES: Record<AppLens, NavGroup[]> = {
  studio: [
    {
      label: null,
      rows: [
        row("today", "Today"),
        needsAttention,
        messages,
        row("calendar", "Calendar"),
        row("appointments", "Appointments"),
        row("projects", "Projects"),
        row("waitlist", "Waitlist"),
      ],
    },
    { label: "Management", rows: [row("clients", "Clients"), row("team", "Team"), row("payments", "Payments")] },
    {
      label: "Operations",
      rows: [
        row("services", "Services", { parent: true }),
        row("forms", "Forms"),
        row("inventory", "Inventory", { dot: true }),
        row("flash", "Flash"),
        row("flash-events", "Flash Events"),
        row("portfolio", "Portfolio"),
        row("locations", "Locations"),
      ],
    },
    {
      label: "Insights",
      rows: [row("analytics", "Analytics"), row("marketing", "Marketing"), row("ai", "AI", { isNew: true })],
    },
  ],
  artist: [
    {
      label: null,
      rows: [
        row("today", "Today"),
        needsAttention,
        messages,
        row("calendar", "Calendar"),
        row("appointments", "Appointments"),
        row("projects", "Projects"),
      ],
    },
    {
      label: "Your work",
      rows: [
        row("clients", "Clients"),
        row("waitlist", "Waitlist"),
        row("flash", "Flash"),
        row("flash-events", "Flash Events"),
        row("portfolio", "Portfolio"),
        // The artist lens calls Payments "Earnings": it is their own commission ledger.
        row("payments", "Earnings"),
        row("ai", "AI"),
      ],
    },
  ],
  desk: [
    {
      label: null,
      rows: [
        row("today", "Front desk"),
        needsAttention,
        messages,
        row("calendar", "Calendar"),
        row("appointments", "Appointments"),
        row("waitlist", "Waitlist"),
      ],
    },
    {
      label: "Front desk",
      rows: [row("clients", "Clients"), row("forms", "Forms"), row("payments", "Payments"), row("inventory", "Inventory", { dot: true })],
    },
  ],
};

const LENS_TABS: { id: AppLens; label: string; icon: LucideIcon }[] = [
  { id: "studio", label: "Studio", icon: Briefcase },
  { id: "artist", label: "Artist", icon: UserRound },
  { id: "desk", label: "Desk", icon: ConciergeBell },
];

/** The label a nav item carries in a lens ("Earnings" for Payments in the artist lens). */
export function appNavLabel(active: AppNavItem, lens: AppLens = "studio"): string {
  for (const group of LENSES[lens]) {
    const found = group.rows.find((r) => r.id === active);
    if (found) return found.label;
  }
  for (const group of LENSES.studio) {
    const found = group.rows.find((r) => r.id === active);
    if (found) return found.label;
  }
  return active;
}

function NavBadge({ r }: { r: NavRow }) {
  if (r.count) {
    return (
      <span
        className={cn(
          "ml-auto flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] leading-none font-bold tabular-nums",
          r.urgent ? "bg-app-active-fg text-white" : "bg-graphite/[0.07] text-app-soft",
        )}
      >
        {r.count}
      </span>
    );
  }
  if (r.dot) return <span className="ml-auto h-1.5 w-1.5 rounded-full bg-app-active-fg" />;
  if (r.isNew) {
    // The app's NEW badge: 11px, 700, .08em, 1px 5px padding (SidebarParts.tsx NavBadge).
    return (
      <span className="ml-auto rounded-[4px] border border-app-active bg-white px-[5px] py-px text-[11px] leading-[14px] font-bold tracking-[0.08em] text-app-active-fg">
        NEW
      </span>
    );
  }
  if (r.parent) return <ChevronRight size={13} strokeWidth={1.8} className="ml-auto text-app-mute" />;
  return null;
}

/**
 * Every nav item (row or group label) is one 28px slot plus a 1px gap, so the
 * list is a strict 29px grid.
 */
const SLOT_PX = 29;

type RailItem = { kind: "label"; label: string } | { kind: "row"; row: NavRow };

/**
 * One flex item of the rail. The rail is a column that wraps, and a unit that
 * doesn't fit whole moves to a second column the rail clips out of view, so the
 * list only ever ends on a whole unit: rows are cut at the bottom, whole, never
 * half. A group label travels with its first row, so the list never ends on a
 * label. `needPx` marks a group above the active one that gives way (collapses
 * to nothing) when the rail is too short to show it and every slot down to the
 * active row.
 */
interface RailUnit {
  key: string;
  items: RailItem[];
  needPx?: number;
}

function railUnits(groups: NavGroup[], active: AppNavItem): RailUnit[] {
  let at = 0;
  let activeAt = -1;
  const placed = groups.map((g) => {
    const items: RailItem[] = [
      ...(g.label ? [{ kind: "label" as const, label: g.label }] : []),
      ...g.rows.map((row) => ({ kind: "row" as const, row })),
    ];
    const start = at;
    const hit = items.findIndex((it) => it.kind === "row" && it.row.id === active);
    if (hit >= 0) activeAt = start + hit;
    at += items.length;
    return { key: g.label ?? "daily", items, start };
  });
  const activeGroup = placed.findIndex((g) => activeAt >= g.start && activeAt < g.start + g.items.length);

  return placed.flatMap((g, gi): RailUnit[] => {
    if (activeGroup > 0 && gi < activeGroup) {
      return [{ key: g.key, items: g.items, needPx: (activeAt + 1 - g.start) * SLOT_PX }];
    }
    const lead = g.items[0]?.kind === "label" ? 2 : 1;
    return [
      { key: `${g.key}-0`, items: g.items.slice(0, lead) },
      ...g.items.slice(lead).map((it, i) => ({ key: `${g.key}-${i + lead}`, items: [it] })),
    ];
  });
}

/**
 * A group above the active one: its full height while the rail (rounded down to
 * whole slots) has room for it and everything down to the active row, zero once
 * it doesn't. `clamp(0, need − rail, slot)` is 0 or exactly one slot, because
 * both sides are whole slots. Pure CSS, no scrolling and no script.
 */
function collapseHeight(slots: number, needPx: number): string {
  const rail = `round(down, 100%, ${SLOT_PX}px)`;
  return `calc(${slots * SLOT_PX}px - ${slots} * clamp(0px, ${needPx}px - ${rail}, ${SLOT_PX}px))`;
}

function RailSlot({ it, active }: { it: RailItem; active: AppNavItem }) {
  if (it.kind === "label") {
    return (
      <span
        data-rail-item
        className="mb-px flex h-[28px] items-end px-2 pb-1.5 text-kpi-label font-bold tracking-[0.1em] text-app-mute uppercase"
      >
        {it.label}
      </span>
    );
  }
  const r = it.row;
  const on = r.id === active;
  const Icon = r.icon;
  return (
    <span
      data-rail-item={on ? "active" : ""}
      className={cn(
        "mb-px flex h-[28px] items-center gap-2.5 rounded-app px-2 text-ui-sm whitespace-nowrap",
        on ? "bg-app-active font-semibold text-app-text" : "font-medium",
      )}
    >
      <Icon size={15} strokeWidth={1.8} className={cn("shrink-0", on ? "text-app-active-fg" : "text-app-mute")} />
      {r.label}
      <NavBadge r={r} />
    </span>
  );
}

/**
 * Hidden below sm: phone-width mockups show the work area only, as the app does
 * behind its drawer. Fills its parent's height and never sets it. The list reads
 * from the top and is clipped at the bottom, whole rows only. When the rail is
 * too short to reach the active row, the groups above the active one give way,
 * whole, from the top, so the active row always shows without the list ever
 * scrolling, the way the app looks scrolled down to that group.
 */
export function AppSidebar({ active, lens = "studio" }: { active: AppNavItem; lens?: AppLens }) {
  const units = railUnits(LENSES[lens], active);

  return (
    <div className="relative hidden w-[188px] shrink-0 border-r border-app-border bg-app-sidebar sm:block">
      <div className="absolute inset-0 flex flex-col text-app-soft">
        <div className="flex h-12 shrink-0 items-center gap-2 border-b border-app-border px-3.5">
          <LimespunMark size={18} />
          <span className="text-ui font-semibold text-app-text">Limespun</span>
          <Bell size={14} strokeWidth={1.8} className="ml-auto text-app-mute" />
        </div>

        <div className="flex shrink-0 flex-col gap-2 px-2 pt-2.5 pb-1">
          <div className="flex h-7 items-center gap-2 rounded-app border border-app-border bg-white px-2 text-ui-sm text-app-mute">
            <Search size={13} strokeWidth={1.8} />
            Search
            <span className="ml-auto rounded-[4px] border border-app-border px-1 text-[10px] leading-4">⌘K</span>
          </div>
          <div className="flex gap-0.5 rounded-app border border-app-border bg-graphite/[0.04] p-0.5">
            {LENS_TABS.map((t) => {
              const on = t.id === lens;
              const Icon = t.icon;
              return (
                <span
                  key={t.id}
                  className={cn(
                    "flex h-6 min-w-0 flex-1 items-center justify-center gap-1 rounded-[6px] text-ui-xs font-semibold",
                    on ? "bg-white text-app-text shadow-[0_1px_2px_rgba(28,25,23,0.08)]" : "text-app-soft",
                  )}
                >
                  <Icon size={11} strokeWidth={2.1} className={on ? "text-app-active-fg" : "text-app-mute"} />
                  {t.label}
                </span>
              );
            })}
          </div>
        </div>

        {/* The padding sits outside the wrapping column, so a unit pushed to the second column
            starts past the clip edge and never peeks in at the right. */}
        <div className="min-h-0 flex-1 px-2">
          <div data-rail="nav" className="flex h-full w-full flex-col flex-wrap content-start overflow-hidden">
            {units.map((u) => (
              <div
                key={u.key}
                className={cn("flex w-full shrink-0 flex-col", u.needPx !== undefined && "overflow-hidden")}
                style={u.needPx !== undefined ? { height: collapseHeight(u.items.length, u.needPx) } : undefined}
              >
                {u.items.map((it) => (
                  <RailSlot key={it.kind === "label" ? `label-${it.label}` : it.row.id} it={it} active={active} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex h-11 shrink-0 items-center justify-end gap-1 border-t border-app-border px-2.5 text-app-mute">
          <ChevronsLeft size={15} strokeWidth={1.8} />
          <Settings size={15} strokeWidth={1.8} className="mx-1.5" />
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-app-active text-[10px] font-bold text-app-active-fg">
            {VIEWER.initials}
          </span>
        </div>
      </div>
    </div>
  );
}
