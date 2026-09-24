import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "./cn";

export interface TocItem {
  id: string;
  label: string;
}

// Below lg the list sits in a tap-driven disclosure, so each row is a 44px target; the
// desktop sticky list (lg+) keeps its tighter reading rhythm.
const linkClass =
  "flex min-h-11 items-center rounded-sm py-2 text-[15px] leading-snug text-graphite-soft transition-colors hover:text-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite lg:block lg:min-h-0 lg:py-1.5";

/**
 * "On this page" for legal pages and posts. A collapsed <details> below lg, a sticky list
 * beside the text from lg. Put it in the left column of lg:grid-cols-[220px_1fr].
 */
export function TOC({ items, className }: { items: TocItem[]; className?: string }) {
  if (items.length === 0) return null;
  const list = (
    <ol className="flex flex-col">
      {items.map((it) => (
        <li key={it.id}>
          <a href={`#${it.id}`} className={linkClass}>
            {it.label}
          </a>
        </li>
      ))}
    </ol>
  );
  return (
    <div className={cn("min-w-0", className)}>
      <details className="group rounded-field bg-white ring-1 ring-hair lg:hidden">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-4 text-[15px] font-semibold text-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite [&::-webkit-details-marker]:hidden">
          On this page
          <ChevronDown size={18} aria-hidden="true" className="transition-transform duration-200 group-open:rotate-180" />
        </summary>
        <nav aria-label="On this page" className="border-t border-hair px-4 py-2">
          {list}
        </nav>
      </details>
      <nav aria-label="On this page" className="hidden lg:sticky lg:top-28 lg:block">
        <p className="text-label text-mute uppercase">On this page</p>
        <div className="mt-3 border-l border-hair-strong pl-4">{list}</div>
      </nav>
    </div>
  );
}
