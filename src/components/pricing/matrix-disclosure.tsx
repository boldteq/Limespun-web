"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
// The system cn (keeps the text-* size tokens); by path so this client bundle skips the server-component barrel.
import { cn } from "@/components/system/cn";

/**
 * Phones only: holds the comparison table's open state as `data-open` on a `group/matrix`
 * wrapper, so the server-rendered rows can hide themselves with
 * `max-sm:group-data-[open=false]/matrix:hidden`. From sm the button is gone and every row shows.
 */
export function MatrixDisclosure({
  controls,
  moreLabel,
  className,
  children,
}: {
  /** id of the table the button reveals. */
  controls: string;
  /** Closed-state label, e.g. "Show all 24 rows". */
  moreLabel: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div data-open={open ? "true" : "false"} className={cn("group/matrix", className)}>
      {children}
      <button
        type="button"
        aria-expanded={open}
        aria-controls={controls}
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-12 w-full items-center justify-center gap-2 border-t border-hair text-[15px] font-semibold text-graphite transition-colors hover:bg-canvas focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-graphite sm:hidden"
      >
        {open ? "Show fewer rows" : moreLabel}
        <ChevronDown
          size={16}
          strokeWidth={2.2}
          className={cn("shrink-0 transition-transform duration-200", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
