import React from "react";
import { cn } from "./cn";

export interface Step {
  title: string;
  body: React.ReactNode;
  visual?: React.ReactNode;
}

const colsClass = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
} as const;

/**
 * A real sequence (the order matters), so it earns numerals: serif ember numbers like the
 * homepage promises list, joined by a hairline at lg. Vertical rail on phones and tablets.
 */
export function StepRail({ steps, className }: { steps: Step[]; className?: string }) {
  const cols = Math.min(Math.max(steps.length, 2), 4) as 2 | 3 | 4;
  return (
    <ol className={cn("grid gap-10 lg:gap-8", colsClass[cols], className)}>
      {steps.map((s, i) => (
        <li key={s.title} className="grid min-w-0 grid-cols-[32px_minmax(0,1fr)] gap-x-4 lg:flex lg:flex-col">
          <div className="flex flex-col items-center lg:flex-row lg:items-center lg:gap-4">
            <span className="font-serif text-[40px] leading-none text-ember-deep tabular-nums" aria-hidden="true">
              {i + 1}
            </span>
            {/* the rail: down the side below lg, across to the next step at lg */}
            <span
              aria-hidden="true"
              className={cn(
                "mt-3 w-px flex-1 bg-hair-strong lg:mt-0 lg:h-px lg:w-auto",
                i === steps.length - 1 && "hidden",
              )}
            />
          </div>
          <div className="min-w-0 pb-2 lg:mt-5 lg:pb-0">
            <h3 className="text-title-sm text-balance text-graphite">
              <span className="sr-only">Step {i + 1}: </span>
              {s.title}
            </h3>
            <div className="mt-2 max-w-[440px] text-[16px] leading-[1.6] text-pretty text-mute">{s.body}</div>
          </div>
          {s.visual && <div className="col-span-2 mt-6 min-w-0 lg:mt-7">{s.visual}</div>}
        </li>
      ))}
    </ol>
  );
}
