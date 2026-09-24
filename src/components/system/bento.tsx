import React from "react";
import { cn } from "./cn";

/** Six-column grid at lg, two at sm, one on phones. Tiles pick their width with `span`. */
export function BentoGrid({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("grid grid-flow-dense gap-4 sm:grid-cols-2 lg:grid-cols-6", className)}>{children}</div>;
}

const spanClass = {
  sm: "lg:col-span-2",
  md: "lg:col-span-3",
  lg: "sm:col-span-2 lg:col-span-4",
  full: "sm:col-span-2 lg:col-span-6",
} as const;

const toneClass = {
  white: "bg-white ring-hair",
  canvas: "bg-canvas ring-hair",
  deep: "bg-canvas-deep ring-hair-strong/50",
} as const;

/**
 * One tile: badge (a Chip or PlanChip), title, one or two lines, then an optional visual
 * pinned to the bottom. Tiles are @container, so visuals inside can respond to the tile's
 * own width rather than the page's.
 */
export function BentoTile({
  title,
  body,
  badge,
  span = "sm",
  tone = "white",
  className,
  children,
}: {
  title: string;
  body: React.ReactNode;
  badge?: React.ReactNode;
  span?: keyof typeof spanClass;
  tone?: keyof typeof toneClass;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <article
      className={cn("@container flex min-w-0 flex-col overflow-hidden rounded-tile ring-1", toneClass[tone], spanClass[span], className)}
    >
      <div className="p-6 sm:p-7">
        {badge && <div className="mb-4 flex flex-wrap gap-2">{badge}</div>}
        <h3 className="text-title-sm text-balance text-graphite">{title}</h3>
        <div className="mt-2 text-[16px] leading-[1.55] text-pretty text-mute">{body}</div>
      </div>
      {children && <div className="mt-auto min-w-0 px-6 pb-6 sm:px-7 sm:pb-7">{children}</div>}
    </article>
  );
}
