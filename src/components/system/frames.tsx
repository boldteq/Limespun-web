import React from "react";
import { HOME } from "@/lib/brand";
import { LimespunMark } from "@/components/brand/limespun-mark";
import { cn } from "./cn";

/* Irregular angled ember stripes — the frame every product view sits in. */
const STRIPES = `linear-gradient(118deg,
  ${HOME.emberMid} 0 7%, ${HOME.emberLight} 7% 9%, ${HOME.emberMid} 9% 15%,
  ${HOME.emberLight} 15% 19%, ${HOME.emberMid} 19% 31%, ${HOME.emberLight} 31% 33%,
  ${HOME.emberMid} 33% 46%, ${HOME.emberLight} 46% 51%, ${HOME.emberMid} 51% 58%,
  ${HOME.emberLight} 58% 60%, ${HOME.emberMid} 60% 72%, ${HOME.emberLight} 72% 77%,
  ${HOME.emberMid} 77% 88%, ${HOME.emberLight} 88% 90%, ${HOME.emberMid} 90% 100%)`;

/** Padding presets, from a tight crop (sm) to the homepage hero's generous frame (lg). */
const insetClass = {
  none: "",
  sm: "p-4 sm:p-6",
  md: "px-4 pt-10 pb-10 sm:px-10 sm:pt-14 sm:pb-14",
  lg: "px-4 pt-12 pb-16 sm:px-12 sm:pt-16 sm:pb-20 lg:px-20",
} as const;

export function StripedFrame({
  inset = "none",
  children,
  className,
}: {
  inset?: keyof typeof insetClass;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-[24px]", insetClass[inset], className)}
      style={{ backgroundImage: STRIPES }}
    >
      {children}
    </div>
  );
}

/** The labels the compact window shows, in the app's own groups (InkOS components/app/sidebar/sidebar-nav.ts, studio lens). */
export type AppWindowItem =
  | "Today"
  | "Needs attention"
  | "Messages"
  | "Calendar"
  | "Projects"
  | "Clients"
  | "Payments"
  | "Forms"
  | "Inventory";

/** Older homepage panels named views the app doesn't have in its nav; they highlight the real row instead. */
type LegacyActive = "Deposits" | "Payouts" | "Consent forms";
const LEGACY_ACTIVE: Record<LegacyActive, AppWindowItem> = {
  Deposits: "Payments",
  Payouts: "Payments",
  "Consent forms": "Forms",
};

/* The daily queue has no heading in the app; Management and Operations do. The 13.5px group
   gap and 16.5px bottom pad keep the sidebar at the 380.5px the homepage panels were laid out against. */
const GROUPS: { label: string | null; items: AppWindowItem[] }[] = [
  { label: null, items: ["Today", "Needs attention", "Messages", "Calendar", "Projects"] },
  { label: "Management", items: ["Clients", "Payments"] },
  { label: "Operations", items: ["Forms", "Inventory"] },
];

function isLegacy(v: string): v is LegacyActive {
  return v in LEGACY_ACTIVE;
}

/** A compact Limespun app window: slim sand sidebar with the app's real rows, plus content. Always sample data. */
export function AppWindow({
  active,
  children,
  className,
}: {
  active: AppWindowItem | LegacyActive;
  children: React.ReactNode;
  className?: string;
}) {
  const current = isLegacy(active) ? LEGACY_ACTIVE[active] : active;
  return (
    <div
      data-app-window=""
      className={cn(
        "flex overflow-hidden rounded-[16px] bg-white text-left shadow-[var(--shadow-lift)] ring-1 ring-graphite/5",
        className,
      )}
    >
      <div
        data-app-window-sidebar=""
        className="hidden w-[168px] shrink-0 flex-col gap-[13.5px] border-r border-hair bg-app-sidebar px-3 pt-4 pb-[16.5px] sm:flex"
      >
        <div className="flex items-center gap-2 px-1.5">
          <LimespunMark size={18} />
          <span className="text-[13px] font-semibold text-graphite">Limespun</span>
        </div>
        {GROUPS.map((g) => (
          <div key={g.label ?? "queue"} className="flex flex-col gap-0.5">
            {g.label && <span className="px-1.5 pb-1 text-[10px] font-medium text-mute">{g.label}</span>}
            {g.items.map((it) => (
              <span
                key={it}
                className={cn(
                  "rounded-[8px] px-1.5 py-1 text-[12px] whitespace-nowrap",
                  it === current ? "bg-app-active font-semibold text-graphite" : "text-graphite-soft",
                )}
              >
                {it}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
