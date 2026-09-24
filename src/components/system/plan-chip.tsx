import React from "react";
import { PLANS, formatPrice, type PlanTier } from "@/lib/data/plans";
import { cn } from "./cn";

/**
 * Names the plan a feature starts on, read from PLANS so it can't drift from pricing.
 * andUp: "Studio and up" (Solo and up reads "Every plan"). price: adds the monthly price.
 */
export function PlanChip({
  plan,
  andUp = false,
  price = false,
  className,
}: {
  plan: PlanTier;
  andUp?: boolean;
  price?: boolean;
  className?: string;
}) {
  const p = PLANS.find((x) => x.tier === plan);
  const name = p?.name ?? plan;
  const label = andUp ? (plan === "solo" ? "Every plan" : `${name} and up`) : name;
  const amount = p ? `${formatPrice(p.monthlyCents)}/mo` : null;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-ui font-semibold whitespace-nowrap text-graphite ring-1 ring-hair",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ember" aria-hidden="true" />
      {label}
      {price && amount && (
        <span className="font-medium text-mute">
          {andUp ? "from " : ""}
          {amount}
        </span>
      )}
    </span>
  );
}
