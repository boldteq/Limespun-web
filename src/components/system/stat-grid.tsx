import React from "react";
import { cn } from "./cn";

export interface StatItem {
  value: string;
  label: string;
  note?: string;
}

const colsClass = {
  2: "grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
} as const;

const toneClass = {
  canvas: { grid: "bg-hair-strong/60 ring-hair-strong/60", cell: "bg-canvas", value: "text-graphite", label: "text-mute" },
  white: { grid: "bg-hair ring-hair", cell: "bg-white", value: "text-graphite", label: "text-mute" },
  ink: { grid: "bg-ink-line ring-ink-line", cell: "bg-ink-raised", value: "text-ink-text", label: "text-ink-muted" },
} as const;

/**
 * Facts in a hairline grid (the homepage "What every studio gets" block). Values must come
 * from plans.ts, competitors.ts or the app, never a made-up number.
 */
export function StatGrid({
  items,
  cols = 4,
  tone = "canvas",
  className,
}: {
  items: StatItem[];
  cols?: 2 | 3 | 4;
  tone?: keyof typeof toneClass;
  className?: string;
}) {
  const t = toneClass[tone];
  return (
    <dl className={cn("grid gap-px overflow-hidden rounded-card ring-1", colsClass[cols], t.grid, className)}>
      {items.map((s) => (
        <div key={s.label} className={cn("flex flex-col-reverse justify-end gap-1 p-5 sm:p-6", t.cell)}>
          <dt className={cn("text-[15px] leading-snug text-pretty", t.label)}>
            {s.label}
            {s.note && <span className="mt-1 block text-ui-sm">{s.note}</span>}
          </dt>
          <dd className={cn("text-figure break-words tabular-nums", t.value)}>{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}
