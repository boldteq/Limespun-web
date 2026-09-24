"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Display, cn } from "@/components/system";
import type { ChangelogKind } from "@/lib/data/changelog";

type Filter = "all" | ChangelogKind;

export interface FeedEntry {
  id: string;
  kind: ChangelogKind;
  year: string;
  /** The entry, rendered on the server. */
  node: React.ReactNode;
}

const FILTERS: { id: Filter; label: string; plural: string }[] = [
  { id: "all", label: "All", plural: "updates" },
  { id: "feature", label: "Features", plural: "features" },
  { id: "improvement", label: "Improvements", plural: "improvements" },
  { id: "fix", label: "Fixes", plural: "fixes" },
];

interface YearGroup {
  year: string;
  /** False when the year's h2 already printed above (a year split by the fold). */
  heading: boolean;
  entries: FeedEntry[];
}

/** Consecutive entries of one year form a group; `seen` carries the years already headed. */
function groupByYear(entries: FeedEntry[], seen: ReadonlySet<string>): YearGroup[] {
  const groups: YearGroup[] = [];
  const headed = new Set(seen);
  for (const e of entries) {
    const last = groups[groups.length - 1];
    if (last && last.year === e.year) {
      last.entries.push(e);
      continue;
    }
    groups.push({ year: e.year, heading: !headed.has(e.year), entries: [e] });
    headed.add(e.year);
  }
  return groups;
}

function YearGroups({ groups }: { groups: YearGroup[] }) {
  return (
    <>
      {groups.map((g) => (
        <div key={g.year} className="min-w-0">
          {g.heading && (
            <Display id={`year-${g.year}`} className="border-b border-hair pb-5 sm:pb-6">
              {g.year}
            </Display>
          )}
          <div className="flex flex-col divide-y divide-hair">
            {g.entries.map((e) => (
              <React.Fragment key={e.id}>{e.node}</React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

/**
 * The feed with its type filter. The server HTML holds every entry (the filter starts on All),
 * so the page reads in full without scripts; with scripts the chips narrow the list. On All,
 * entries past `recent` fold into an "Earlier updates" disclosure; a filtered list shows every
 * match unfolded.
 */
export function ChangelogFeed({
  entries,
  recent,
  earlierLabel,
  aside,
  after,
}: {
  entries: FeedEntry[];
  recent: number;
  /** The disclosure's line under "Earlier updates", e.g. "5 more, back to April 2026". */
  earlierLabel: string;
  /** Links under the filter from lg (roadmap, subscribe). */
  aside?: React.ReactNode;
  /** The block after the list (subscribe). */
  after?: React.ReactNode;
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const count = (f: Filter) => (f === "all" ? entries.length : entries.filter((e) => e.kind === f).length);
  const shown = filter === "all" ? entries : entries.filter((e) => e.kind === filter);
  const current = FILTERS.find((f) => f.id === filter) ?? FILTERS[0];

  const folded = filter === "all" && shown.length > recent;
  const openGroups = groupByYear(folded ? shown.slice(0, recent) : shown, new Set());
  const restGroups = folded ? groupByYear(shown.slice(recent), new Set(openGroups.map((g) => g.year))) : [];

  return (
    <div className="grid gap-8 sm:gap-10 lg:grid-cols-[208px_minmax(0,1fr)] lg:gap-14 xl:gap-16">
      <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
        <p id="changelog-filter-label" className="hidden text-label text-mute uppercase lg:block">
          Show
        </p>
        <div
          role="group"
          aria-labelledby="changelog-filter-label"
          className="-mx-5 flex gap-1.5 overflow-x-auto px-5 sm:gap-2 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:mt-4 lg:flex-col lg:overflow-visible [&::-webkit-scrollbar]:hidden"
        >
          {FILTERS.map((f) => {
            const pressed = f.id === filter;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={pressed}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "inline-flex min-h-11 shrink-0 items-center justify-between gap-2.5 rounded-full px-3.5 text-[15px] sm:px-4 font-semibold whitespace-nowrap ring-1 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite lg:w-full",
                  pressed
                    ? "bg-graphite text-white ring-graphite"
                    : "bg-canvas text-graphite-soft ring-hair hover:bg-white hover:text-graphite hover:ring-hair-strong",
                )}
              >
                {f.label}
                <span
                  className={cn(
                    "hidden text-[13px] font-medium tabular-nums sm:inline",
                    pressed ? "text-white/70" : "text-mute",
                  )}
                >
                  {count(f.id)}
                </span>
              </button>
            );
          })}
        </div>
        {aside && <div className="mt-8 hidden border-t border-hair pt-6 lg:block">{aside}</div>}
      </div>

      <div className="min-w-0">
        <p className="sr-only" aria-live="polite">
          {filter === "all" ? "" : `Showing ${shown.length} ${current.plural}`}
        </p>
        <YearGroups groups={openGroups} />
        {restGroups.length > 0 && (
          <details className="group/older border-t border-hair">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite sm:py-8 [&::-webkit-details-marker]:hidden">
              <span className="min-w-0">
                <span className="block text-title-sm text-graphite">Earlier updates</span>
                <span className="mt-1 block text-[15px] text-mute">{earlierLabel}</span>
              </span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-canvas text-graphite ring-1 ring-hair transition-colors group-hover/older:bg-graphite group-hover/older:text-white">
                <ChevronDown
                  size={18}
                  strokeWidth={2.2}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-open/older:rotate-180"
                />
              </span>
            </summary>
            <div className="border-t border-hair">
              <YearGroups groups={restGroups} />
            </div>
          </details>
        )}
        {after && <div className="mt-10 sm:mt-14">{after}</div>}
      </div>
    </div>
  );
}
