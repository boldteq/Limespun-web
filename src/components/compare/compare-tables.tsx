import React from "react";
import Link from "next/link";
import { Check, CircleDashed, Minus } from "lucide-react";
import { FEATURES, LIMESPUN, type Competitor, type FeatureCell } from "@/lib/data/competitors";

const LABEL: Record<FeatureCell["value"], string> = {
  yes: "Yes",
  partial: "Partial",
  no: "No",
  unknown: "Not published",
};

export function SupportBadge({ cell, compact = false }: { cell: FeatureCell; compact?: boolean }) {
  const tone =
    cell.value === "yes"
      ? "bg-paid-soft text-paid"
      : cell.value === "partial"
        ? "bg-ember-soft text-ember-deep"
        : cell.value === "no"
          ? "bg-canvas-deep text-graphite-soft"
          : "bg-white text-mute ring-1 ring-hair";
  const Icon = cell.value === "yes" ? Check : cell.value === "partial" ? CircleDashed : Minus;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[13px] font-semibold whitespace-nowrap ${tone}`}>
      <Icon size={13} strokeWidth={2.6} aria-hidden="true" />
      {compact && cell.value === "unknown" ? "—" : LABEL[cell.value]}
      {compact && cell.value === "unknown" && <span className="sr-only">Not published</span>}
    </span>
  );
}

/** Head-to-head table for one competitor. */
export function HeadToHead({ competitor }: { competitor: Competitor }) {
  return (
    <div
      className="relative overflow-x-auto rounded-[20px] ring-1 ring-hair focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite"
      tabIndex={0}
      aria-label={`Limespun vs ${competitor.name} table, scrolls sideways`}
    >
      <table className="w-full min-w-[640px] border-collapse bg-white text-left">
        <caption className="sr-only">
          Limespun compared with {competitor.name} on tattoo studio features
        </caption>
        <thead>
          <tr className="bg-canvas">
            <th scope="col" className="w-[34%] px-6 py-4 text-[13px] font-semibold tracking-[0.06em] text-mute uppercase">
              What a tattoo studio needs
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
              <th scope="row" className="px-6 py-5 font-normal">
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
  );
}

/** Every competitor side by side, for the hub page. */
export function CompareMatrix({ competitors }: { competitors: Competitor[] }) {
  return (
    <div
      className="relative overflow-x-auto rounded-[20px] ring-1 ring-hair focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite"
      tabIndex={0}
      aria-label="Comparison table, scrolls sideways"
    >
      <table className="w-full min-w-[980px] border-collapse bg-white text-left">
        <caption className="sr-only">Tattoo studio features across Limespun and seven alternatives</caption>
        <thead>
          <tr className="bg-canvas">
            <th scope="col" className="sticky left-0 z-10 bg-canvas px-5 py-4 text-[13px] font-semibold tracking-[0.06em] text-mute uppercase">
              Feature
            </th>
            <th scope="col" className="px-4 py-4 text-[14px] font-semibold text-graphite">
              Limespun
            </th>
            {competitors.map((c) => (
              <th key={c.slug} scope="col" className="px-4 py-4 text-[14px] font-semibold text-graphite">
                <Link href={`/compare/${c.slug}`} className="underline decoration-hair-strong underline-offset-4 hover:decoration-ember">
                  {c.name}
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FEATURES.map((f) => (
            <tr key={f.key} className="border-t border-hair">
              <th scope="row" className="sticky left-0 z-10 bg-white px-5 py-4 text-[15px] font-semibold text-graphite">
                {f.label}
              </th>
              <td className="px-4 py-4">
                <SupportBadge cell={LIMESPUN[f.key]} compact />
              </td>
              {competitors.map((c) => (
                <td key={c.slug} className="px-4 py-4">
                  <SupportBadge cell={c.features[f.key]} compact />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
