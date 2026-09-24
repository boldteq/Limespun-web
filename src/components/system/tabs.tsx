"use client";

import React, { useId, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "./cn";

export interface TabItem {
  id: string;
  label: string;
  /** Rendered on the server and passed in; every panel is in the HTML, inactive ones hidden. */
  panel: React.ReactNode;
}

/**
 * Horizontal tabs (one interactive demo per page, at most). Keyboard as in the homepage tour:
 * roving tabindex, arrows move and select (wrapping), Home/End jump to the ends.
 * The tab strip scrolls inside itself on narrow screens; the page never does.
 */
export function Tabs({
  label,
  tabs,
  defaultId,
  className,
  panelClassName,
}: {
  label: string;
  tabs: TabItem[];
  defaultId?: string;
  className?: string;
  panelClassName?: string;
}) {
  const baseId = useId();
  const [active, setActive] = useState(() => Math.max(0, tabs.findIndex((t) => t.id === defaultId)));
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(i: number, moveFocus = false) {
    setActive(i);
    if (!moveFocus) return;
    const el = tabRefs.current[i];
    el?.focus({ preventScroll: true });
    el?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: prefersReducedMotion() ? "instant" : "smooth" });
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, i: number) {
    const last = tabs.length - 1;
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? i === last
          ? 0
          : i + 1
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? i === 0
            ? last
            : i - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    select(next, true);
  }

  const tabId = (id: string) => `${baseId}-tab-${id}`;
  const panelId = (id: string) => `${baseId}-panel-${id}`;

  return (
    <div className={cn("min-w-0", className)}>
      <div
        role="tablist"
        aria-label={label}
        aria-orientation="horizontal"
        className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full bg-white p-1 ring-1 ring-hair [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((t, i) => {
          const selected = i === active;
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={tabId(t.id)}
              aria-selected={selected}
              aria-controls={panelId(t.id)}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center rounded-full px-4 text-[15px] font-semibold whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ember",
                selected ? "bg-graphite text-white" : "text-graphite-soft hover:bg-canvas hover:text-graphite",
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.id}
          role="tabpanel"
          id={panelId(t.id)}
          aria-labelledby={tabId(t.id)}
          hidden={i !== active}
          tabIndex={0}
          className={cn(
            "ls-panel-in mt-8 min-w-0 rounded-[8px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-graphite",
            panelClassName,
          )}
        >
          {t.panel}
        </div>
      ))}
    </div>
  );
}
