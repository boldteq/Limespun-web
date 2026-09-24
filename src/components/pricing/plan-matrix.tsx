import React from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/components/system";
import { CHECK, DASH, PLAN_MATRIX, PLANS, formatPrice, type MatrixCell } from "@/lib/data/plans";
import { MatrixDisclosure } from "./matrix-disclosure";

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

/*
 * The feature column is sticky, so the names stay put while the plans slide under them. On
 * phones it is 128px (150px from 380px) and each plan column is a fixed share of the rest, so
 * Solo sits whole beside it and part of Studio shows at the right edge: the cut column is the
 * cue that the table swipes. From sm the column is 34% of a table at least 760px wide.
 */
const STICKY = "sticky left-0 z-[1] bg-white max-sm:shadow-[inset_-1px_0_0_var(--color-hair)]";
const tint = (recommended?: boolean) => (recommended ? "bg-ember-soft/40" : "");

/*
 * Phones show the first groups (the caps, then who can work on each plan) and a button for the
 * rest, so the table costs about a screen of scroll instead of three. The plan cards above
 * already list what each plan adds. From sm every row shows and the button is gone.
 */
const PHONE_GROUPS = 2;
const COLLAPSIBLE = "max-sm:group-data-[open=false]/matrix:hidden";
const TABLE_ID = "plan-matrix";
const TOTAL_ROWS = PLAN_MATRIX.reduce((n, g) => n + g.rows.length, 0);

/** Every plan, every feature — mirrors the app's own comparison. Swipes sideways on a phone. */
export function PlanMatrix({ className }: { className?: string }) {
  return (
    <MatrixDisclosure
      controls={TABLE_ID}
      moreLabel={`Show all ${TOTAL_ROWS} rows`}
      className={cn("overflow-hidden rounded-[20px] bg-white ring-1 ring-hair", className)}
    >
      <div
        className="relative overflow-x-auto focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ember"
        tabIndex={0}
        role="region"
        aria-label="Plan comparison table, scrolls sideways"
      >
        <table
          id={TABLE_ID}
          className="w-full min-w-[568px] table-fixed border-separate border-spacing-0 text-left min-[380px]:min-w-[670px] sm:min-w-[760px]"
        >
          <caption className="sr-only">Limespun plans compared</caption>
          <colgroup>
            <col className="w-[128px] min-[380px]:w-[150px] sm:w-[34%]" />
            {PLANS.map((p) => (
              <col key={p.tier} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th
                scope="col"
                className={cn(STICKY, "border-b border-hair px-3 py-4 text-[13px] font-semibold text-mute sm:px-6 sm:py-5")}
              >
                Feature
              </th>
              {PLANS.map((p) => (
                <th
                  key={p.tier}
                  scope="col"
                  className={cn("border-b border-hair px-2 py-4 text-center sm:px-4 sm:py-5", tint(p.recommended))}
                >
                  <span className="block text-[15px] leading-tight font-semibold text-graphite sm:text-[16px]">{p.name}</span>
                  <span className="mt-0.5 block text-[13px] font-normal text-mute tabular-nums">
                    {formatPrice(p.monthlyCents)}/mo
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          {PLAN_MATRIX.map((g, gi) => (
            <tbody key={g.label} className={gi >= PHONE_GROUPS ? COLLAPSIBLE : undefined}>
              <tr>
                <th
                  scope="rowgroup"
                  className={cn(
                    STICKY,
                    "px-3 pt-5 pb-2 text-[12px] font-semibold tracking-[0.08em] text-ember-deep uppercase sm:px-6 sm:pt-7",
                  )}
                >
                  {g.label}
                </th>
                {PLANS.map((p) => (
                  <td key={p.tier} aria-hidden="true" className={tint(p.recommended)} />
                ))}
              </tr>
              {g.rows.map((r) => (
                <tr key={r.label}>
                  <th
                    scope="row"
                    className={cn(
                      STICKY,
                      "border-t border-hair px-3 py-2 text-[14px] leading-snug font-normal text-graphite-soft sm:px-6 sm:py-3.5 sm:text-[15px]",
                    )}
                  >
                    {r.label}
                  </th>
                  {PLANS.map((p) => (
                    <td
                      key={p.tier}
                      className={cn(
                        "border-t border-hair px-2 py-2 text-center sm:px-4 sm:py-3.5",
                        tint(p.recommended),
                      )}
                    >
                      <Cell value={r.cells[p.tier]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </MatrixDisclosure>
  );
}
