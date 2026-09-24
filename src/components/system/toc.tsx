import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "./cn";
import { TocSpy } from "./toc-spy";

export interface TocItem {
  id: string;
  label: string;
}

// Every row is a 44px target at every width (the disclosure below lg and the sticky list
// from lg); long labels wrap inside the row.
// The section being read (TocSpy) is set in graphite, with an ember tick on the rail from lg.
const linkClass =
  "relative flex min-h-11 items-center rounded-sm py-2 text-[15px] leading-snug text-graphite-soft transition-colors hover:text-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite aria-[current=location]:font-medium aria-[current=location]:text-graphite lg:aria-[current=location]:before:absolute lg:aria-[current=location]:before:inset-y-2.5 lg:aria-[current=location]:before:-left-[17px] lg:aria-[current=location]:before:w-0.5 lg:aria-[current=location]:before:rounded-full lg:aria-[current=location]:before:bg-ember lg:aria-[current=location]:before:content-['']";

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
      <TocSpy ids={items.map((it) => it.id)} />
      <details className="group rounded-field bg-white ring-1 ring-hair lg:hidden">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-4 text-[15px] font-semibold text-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite [&::-webkit-details-marker]:hidden">
          On this page
          <ChevronDown size={18} aria-hidden="true" className="transition-transform duration-200 group-open:rotate-180" />
        </summary>
        <nav aria-label="On this page" className="border-t border-hair px-4 py-2">
          {list}
        </nav>
      </details>
      {/* A long list scrolls inside itself so its last rows stay reachable under the nav */}
      <nav
        aria-label="On this page"
        className="hidden lg:sticky lg:top-28 lg:block lg:max-h-[calc(100dvh-8rem)] lg:overflow-y-auto lg:pr-1 lg:pb-1 lg:[scrollbar-width:thin]"
      >
        <p className="text-label text-mute uppercase">On this page</p>
        <div className="mt-2 border-l border-hair-strong pl-4">{list}</div>
      </nav>
    </div>
  );
}
