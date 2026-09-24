import React from "react";
import Link from "next/link";
import { Check, ChevronDown, CircleDashed, Minus, X } from "lucide-react";
import { cn } from "@/components/system";
import { FEATURES, LIMESPUN, shortName, type Competitor, type FeatureCell } from "@/lib/data/competitors";

const LABEL: Record<FeatureCell["value"], string> = {
  yes: "Yes",
  partial: "Partial",
  no: "No",
  unknown: "Not published",
};

const TONE: Record<Exclude<FeatureCell["value"], "unknown">, string> = {
  yes: "bg-paid-soft text-paid",
  partial: "bg-ember-soft text-ember-deep",
  no: "bg-canvas-deep text-graphite-soft",
};

/**
 * One answer as a pill. `compact` (the hub's matrix) keeps the word for yes / partial / no and
 * shows "Not published" as a bare dash, lighter than "No", with the words for screen readers
 * (the legend under the table says what the dash means).
 */
function SupportBadge({ cell, compact = false }: { cell: FeatureCell; compact?: boolean }) {
  if (cell.value === "unknown") {
    if (compact) {
      return (
        <span className="inline-flex h-7 items-center px-2.5 text-[15px] text-mute">
          <span aria-hidden="true">—</span>
          <span className="sr-only">Not published</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[13px] font-semibold whitespace-nowrap text-mute ring-1 ring-hair">
        <Minus size={13} strokeWidth={2.6} aria-hidden="true" />
        {LABEL.unknown}
      </span>
    );
  }
  const Icon = cell.value === "yes" ? Check : cell.value === "partial" ? CircleDashed : Minus;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[13px] font-semibold whitespace-nowrap",
        TONE[cell.value],
      )}
    >
      <Icon size={13} strokeWidth={2.6} aria-hidden="true" />
      {LABEL[cell.value]}
    </span>
  );
}

/** The answer as a mark alone (phones), with its word for screen readers. */
function SupportMark({ cell }: { cell: FeatureCell }) {
  if (cell.value === "unknown") {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center text-[15px] text-mute">
        <span aria-hidden="true">—</span>
        <span className="sr-only">Not published</span>
      </span>
    );
  }
  const Icon = cell.value === "yes" ? Check : cell.value === "partial" ? CircleDashed : X;
  return (
    <span className={cn("inline-flex h-7 w-7 items-center justify-center rounded-full", TONE[cell.value])}>
      <Icon size={14} strokeWidth={2.8} aria-hidden="true" />
      <span className="sr-only">{LABEL[cell.value]}</span>
    </span>
  );
}

/** What the marks mean, for the phone list. */
function MarkLegend({ className }: { className?: string }) {
  const items: { cell: FeatureCell; label: string }[] = [
    { cell: { value: "yes" }, label: "Yes" },
    { cell: { value: "partial" }, label: "Partial" },
    { cell: { value: "no" }, label: "No" },
    { cell: { value: "unknown" }, label: "Not published" },
  ];
  return (
    <ul aria-hidden="true" className={cn("flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] text-mute", className)}>
      {items.map((i) => (
        <li key={i.label} className="flex items-center gap-1.5">
          <span className="scale-[0.86]">
            <SupportMark cell={i.cell} />
          </span>
          {i.label}
        </li>
      ))}
    </ul>
  );
}

/**
 * Head-to-head for one competitor. Phones get one row per need (the need, then a mark for each
 * product) that opens on a tap to the one-line why and both notes; from sm it's a table whose
 * need column stays put, with every note showing.
 */
export function HeadToHead({ competitor, className }: { competitor: Competitor; className?: string }) {
  const short = shortName(competitor);
  const cols = "grid grid-cols-[minmax(0,1fr)_4.75rem_4.75rem] items-center gap-x-2";
  return (
    <div className={className}>
      <div className="sm:hidden">
        <MarkLegend />
        <div className="mt-4 border-y border-hair-strong">
          <div
            aria-hidden="true"
            className={cn(cols, "border-b border-hair py-2.5 text-[12px] font-semibold tracking-[-0.01em] text-graphite")}
          >
            <span className="text-label tracking-[0.08em] text-mute uppercase">Tap for notes</span>
            <span className="text-center">Limespun</span>
            <span className="truncate text-center">{short}</span>
          </div>
          <ul aria-label={`Limespun compared with ${competitor.name}`}>
            {FEATURES.map((f) => {
              const ours = LIMESPUN[f.key];
              const theirs = competitor.features[f.key];
              return (
                <li key={f.key} className="border-b border-hair last:border-b-0">
                  <details className="group">
                    <summary
                      className={cn(
                        cols,
                        "min-h-14 cursor-pointer list-none py-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite [&::-webkit-details-marker]:hidden",
                      )}
                    >
                      <span className="min-w-0 text-[15px] leading-snug font-semibold text-balance text-graphite">
                        {f.short ?? f.label}
                        <ChevronDown
                          size={15}
                          strokeWidth={2.4}
                          aria-hidden="true"
                          className="ml-1 inline-block align-[-3px] text-mute transition-transform duration-200 group-open:rotate-180"
                        />
                      </span>
                      <span className="flex justify-center">
                        <span className="sr-only">Limespun: </span>
                        <SupportMark cell={ours} />
                      </span>
                      <span className="flex justify-center">
                        <span className="sr-only">{competitor.name}: </span>
                        <SupportMark cell={theirs} />
                      </span>
                    </summary>
                    <div className="pb-4 text-[14px] leading-[1.5] text-pretty">
                      <p className="text-mute">{f.why}</p>
                      <p className="mt-2 text-graphite-soft">
                        <span className="font-semibold text-graphite">Limespun: </span>
                        {ours.note ? `${LABEL[ours.value]}. ${ours.note}` : LABEL[ours.value]}
                      </p>
                      <p className="mt-1 text-graphite-soft">
                        <span className="font-semibold text-graphite">{competitor.name}: </span>
                        {theirs.note ? `${LABEL[theirs.value]}. ${theirs.note}` : LABEL[theirs.value]}
                      </p>
                    </div>
                  </details>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div
        className="relative hidden overflow-x-auto rounded-card ring-1 ring-hair focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite sm:block"
        tabIndex={0}
        role="region"
        aria-label={`Limespun vs ${competitor.name} table, scrolls sideways`}
      >
        <table className="w-full min-w-[620px] border-collapse bg-white text-left">
          <caption className="sr-only">Limespun compared with {competitor.name} on tattoo studio features</caption>
          <thead>
            <tr className="bg-canvas">
              <th scope="col" className="sticky left-0 z-10 w-[34%] bg-canvas px-6 py-4 text-label text-mute uppercase">
                What a studio needs
              </th>
              <th scope="col" className="w-[33%] px-6 py-4 text-[15px] font-semibold text-graphite">
                Limespun
              </th>
              <th scope="col" className="w-[33%] px-6 py-4 text-[15px] font-semibold text-graphite">
                {competitor.name}
              </th>
            </tr>
          </thead>
          <tbody>
            {FEATURES.map((f) => (
              <tr key={f.key} className="border-t border-hair align-top">
                <th scope="row" className="sticky left-0 z-10 bg-white px-6 py-5 font-normal">
                  <span className="block text-[16px] font-semibold text-graphite">{f.label}</span>
                  <span className="mt-1 block text-[14px] leading-snug text-mute">{f.why}</span>
                </th>
                <td className="px-6 py-5">
                  <SupportBadge cell={LIMESPUN[f.key]} />
                  {LIMESPUN[f.key].note && <p className="mt-2 text-[14px] leading-snug text-graphite-soft">{LIMESPUN[f.key].note}</p>}
                </td>
                <td className="px-6 py-5">
                  <SupportBadge cell={competitor.features[f.key]} />
                  {competitor.features[f.key].note && (
                    <p className="mt-2 text-[14px] leading-snug text-graphite-soft">{competitor.features[f.key].note}</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** Every competitor side by side, for the hub page, with the dash explained under it. */
export function CompareMatrix({ competitors, className }: { competitors: Competitor[]; className?: string }) {
  return (
    <div className={className}>
      <div
        className="relative overflow-x-auto rounded-card ring-1 ring-hair focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite"
        tabIndex={0}
        role="region"
        aria-label="Comparison table, scrolls sideways"
      >
        <table className="w-full min-w-[980px] border-collapse bg-white text-left">
          <caption className="sr-only">Tattoo studio features across Limespun and seven alternatives</caption>
          <thead>
            <tr className="bg-canvas">
              <th scope="col" className="sticky left-0 z-10 bg-canvas px-5 py-4 text-label text-mute uppercase">
                Feature
              </th>
              <th scope="col" className="px-4 py-4 text-[14px] font-semibold text-graphite">
                Limespun
              </th>
              {competitors.map((c) => (
                <th key={c.slug} scope="col" className="px-4 py-4 text-[14px] font-semibold text-graphite">
                  <Link
                    href={`/compare/${c.slug}`}
                    className="inline-flex min-h-11 items-center underline decoration-hair-strong underline-offset-4 hover:decoration-ember focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite"
                  >
                    {c.name}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FEATURES.map((f) => (
              <tr key={f.key} className="border-t border-hair">
                <th
                  scope="row"
                  className="sticky left-0 z-10 w-[11.5rem] min-w-[11.5rem] bg-white px-5 py-3.5 text-[15px] leading-snug font-semibold text-graphite sm:w-auto sm:py-4"
                >
                  {f.label}
                </th>
                <td className="px-4 py-3.5 sm:py-4">
                  <SupportBadge cell={LIMESPUN[f.key]} compact />
                </td>
                {competitors.map((c) => (
                  <td key={c.slug} className="px-4 py-3.5 sm:py-4">
                    <SupportBadge cell={c.features[f.key]} compact />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 flex gap-2 text-[14px] leading-snug text-mute">
        <span aria-hidden="true" className="text-[15px]">
          —
        </span>
        Not published on the vendor’s public pages. It may exist, so check with them.
      </p>
    </div>
  );
}
