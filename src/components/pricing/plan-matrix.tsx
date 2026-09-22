import React from "react";
import { Check, Minus } from "lucide-react";
import { CHECK, DASH, PLAN_MATRIX, PLANS, formatPrice, type MatrixCell } from "@/lib/data/plans";

function Cell({ value }: { value: MatrixCell }) {
  if (value === CHECK) {
    return (
      <>
        <Check size={17} strokeWidth={2.6} className="mx-auto text-ember" aria-hidden="true" />
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (value === DASH) {
    return (
      <>
        <Minus size={16} strokeWidth={2} className="mx-auto text-hair-strong" aria-hidden="true" />
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return <span className="text-[14px] font-semibold text-graphite tabular-nums">{value}</span>;
}

/** Every plan, every feature — mirrors the app's own comparison. Scrolls sideways on a phone. */
export function PlanMatrix() {
  return (
    <div className="relative overflow-x-auto rounded-[20px] bg-white ring-1 ring-hair">
      <table className="w-full min-w-[760px] border-collapse text-left">
        <caption className="sr-only">Limespun plans compared</caption>
        <thead>
          <tr className="border-b border-hair">
            <th scope="col" className="w-[34%] px-6 py-5 text-[13px] font-semibold text-mute">
              Feature
            </th>
            {PLANS.map((p) => (
              <th key={p.tier} scope="col" className={`px-4 py-5 text-center ${p.recommended ? "bg-ember-soft/40" : ""}`}>
                <span className="block text-[16px] font-semibold text-graphite">{p.name}</span>
                <span className="mt-0.5 block text-[13px] font-normal text-mute tabular-nums">
                  {formatPrice(p.monthlyCents)}/mo
                </span>
              </th>
            ))}
          </tr>
        </thead>
        {PLAN_MATRIX.map((g) => (
          <tbody key={g.label}>
            <tr>
              <th
                scope="rowgroup"
                className="px-6 pt-7 pb-2 text-[12px] font-semibold tracking-[0.08em] text-ember-deep uppercase"
              >
                {g.label}
              </th>
              {PLANS.map((p) => (
                <td key={p.tier} aria-hidden="true" className={p.recommended ? "bg-ember-soft/40" : ""} />
              ))}
            </tr>
            {g.rows.map((r) => (
              <tr key={r.label} className="border-t border-hair">
                <th scope="row" className="px-6 py-3.5 text-[15px] font-normal text-graphite-soft">
                  {r.label}
                </th>
                {PLANS.map((p) => (
                  <td key={p.tier} className={`px-4 py-3.5 text-center ${p.recommended ? "bg-ember-soft/40" : ""}`}>
                    <Cell value={r.cells[p.tier]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
