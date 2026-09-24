"use client";

import React, { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { Container, cn } from "@/components/system";

/** Questions shown on phones before "more"; keep in step with the nth-of-type(n+5) variant below. */
const VISIBLE = 4;

/**
 * Phones read the first four questions of the system FAQ it wraps; "More questions" opens the
 * rest in place and moves focus to the first of them. From sm every question shows. The FAQ
 * itself is unchanged, so its FAQPage JSON-LD keeps every question. `tone` matches the FAQ's.
 */
export function FaqMore({
  children,
  total,
  tone = "white",
}: {
  children: React.ReactNode;
  /** How many questions the FAQ holds; with VISIBLE or fewer this renders the FAQ as it is. */
  total: number;
  tone?: "white" | "canvas";
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  if (total <= VISIBLE) return <>{children}</>;

  function more() {
    setOpen(true);
    requestAnimationFrame(() => root.current?.querySelectorAll<HTMLElement>("details > summary")[VISIBLE]?.focus());
  }

  return (
    <div
      ref={root}
      data-more={open ? "open" : "closed"}
      className="max-sm:[&>section]:pb-0 max-sm:[&[data-more=closed]_details:nth-of-type(n+5)]:hidden"
    >
      {children}
      <div className={cn("pb-section-y-inner sm:hidden", tone === "white" ? "bg-white" : "bg-canvas")}>
        {!open && (
          <Container>
            <button
              type="button"
              onClick={more}
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[15px] font-semibold text-graphite ring-1 ring-graphite/70 transition-colors duration-200 hover:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite"
            >
              <Plus size={16} strokeWidth={2.4} aria-hidden="true" />
              {total - VISIBLE} more questions
            </button>
          </Container>
        )}
      </div>
    </div>
  );
}
