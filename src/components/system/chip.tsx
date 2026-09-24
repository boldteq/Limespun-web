import React from "react";
import { Check } from "lucide-react";
import { cn } from "./cn";

export type ChipTone = "flag" | "paid" | "ember" | "ink" | "quiet" | "success" | "warning" | "danger" | "info";

/**
 * flag/paid/ember/ink/quiet are the marketing tones; success/warning/danger/info are the app's status tones.
 * flag text uses the app's danger red: text-flag on flag-soft is 4.39:1 at 11px, app-danger is 6.17:1.
 */
const chipTone: Record<ChipTone, string> = {
  flag: "bg-flag-soft text-app-danger",
  paid: "bg-paid-soft text-paid",
  ember: "bg-ember-soft text-ember-deep",
  ink: "bg-graphite text-white",
  quiet: "bg-canvas-deep text-graphite-soft",
  success: "bg-app-success-bg text-app-success",
  warning: "bg-app-warning-bg text-app-warning",
  danger: "bg-app-danger-bg text-app-danger",
  info: "bg-app-info-bg text-app-info",
};

export function Chip({
  tone,
  children,
  className,
}: {
  tone: ChipTone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap",
        chipTone[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Every mockup carries this: the data on screen is the canonical sample studio, not a customer. */
export function SampleTag({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full border border-hair px-2 py-0.5 text-[10px] font-medium tracking-[0.04em] whitespace-nowrap text-mute uppercase",
        className,
      )}
    >
      Sample studio
    </span>
  );
}

/** A row of short promises with ember ticks (money-back, migration, no per-booking fees). */
export function CheckRow({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-6 gap-y-2", className)}>
      {items.map((it) => (
        <li key={it} className="flex items-center gap-2 text-[15px] text-graphite-soft">
          <Check size={16} strokeWidth={2.6} className="text-ember" aria-hidden="true" />
          {it}
        </li>
      ))}
    </ul>
  );
}
