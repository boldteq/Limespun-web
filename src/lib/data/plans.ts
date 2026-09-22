/**
 * Limespun plans, mirrored from the app (InkOS repo):
 *   - prices:        lib/billing/plan-prices.ts      (PLAN_PRICE_CENTS)
 *   - lifetime:      lib/billing/lifetime-pricing.ts (LIFETIME_PRICE_DEFAULTS)
 *   - feature matrix lib/billing/comparison-config.ts (COMPARISON_GROUPS)
 *
 * The matrix is what the app's gate enforces. Never tick a cell here that the app
 * doesn't tick: that sells a feature the customer can't open. Re-sync on any
 * pricing change in the app.
 */

export type PlanTier = "solo" | "studio" | "pro" | "enterprise";
export type BillingOption = "lifetime" | "monthly" | "annual";

export interface Plan {
  tier: PlanTier;
  name: string;
  fit: string;
  monthlyCents: number;
  annualCents: number;
  lifetimeCents: number;
  recommended?: boolean;
  /** Plain-words headline for the list below the caps. */
  listIntro: string;
  lines: string[];
}

/** Founding lifetime offer is live in the app while the campaign is open. Set to "closed" the day it sells out. */
export const FOUNDING_OFFER_OPEN = (process.env.NEXT_PUBLIC_FOUNDING_OFFER ?? "open") !== "closed";
export const FOUNDING_OFFER_SIZE = 300;
export const ANNUAL_DISCOUNT_PERCENT = 20;
export const MONEY_BACK_DAYS = 30;
export const ONBOARDING_SUPPORT_DAYS = 60;

export const PLANS: Plan[] = [
  {
    tier: "solo",
    name: "Solo",
    fit: "One artist, one chair",
    monthlyCents: 3900,
    annualCents: 37440,
    lifetimeCents: 24900,
    listIntro: "The whole one-person studio",
    lines: [
      "Multi-session projects",
      "Ink and supply inventory",
      "EU REACH ink tracking",
      "Marketing campaigns and reports",
      "Your own booking domain",
    ],
  },
  {
    tier: "studio",
    name: "Studio",
    fit: "2–5 artists sharing a shop",
    monthlyCents: 9900,
    annualCents: 95040,
    lifetimeCents: 59900,
    recommended: true,
    listIntro: "Everything in Solo, plus",
    lines: [
      "One calendar for every artist, with clash checks",
      "Commission and booth-rent splits",
      "Unlimited bookings",
    ],
  },
  {
    tier: "pro",
    name: "Pro",
    fit: "Busy shops with guest artists",
    monthlyCents: 17900,
    annualCents: 171840,
    lifetimeCents: 109900,
    listIntro: "Everything in Studio, plus",
    lines: [
      "Unlimited guest-artist seats",
      "Payroll and 1099s",
      "AI replies, aftercare and consult notes",
      "Roles and permissions",
      "Your brand on the booking page, not ours",
      "Priority support",
    ],
  },
  {
    tier: "enterprise",
    name: "Multi-Location",
    fit: "Several shops, one account",
    monthlyCents: 32900,
    annualCents: 315840,
    lifetimeCents: 179900,
    listIntro: "Everything in Pro, plus",
    lines: ["Unlimited artists and locations", "A dedicated account manager", "API access with webhooks"],
  },
];

/** Usage caps shown on every card, in the same order, so the cards read as one table. */
export const PLAN_CAPS: { label: string; values: Record<PlanTier, string> }[] = [
  { label: "Artists", values: { solo: "1", studio: "Up to 5", pro: "Up to 15", enterprise: "Unlimited" } },
  { label: "Locations", values: { solo: "1", studio: "1", pro: "5", enterprise: "Unlimited" } },
  { label: "Bookings a month", values: { solo: "100", studio: "Unlimited", pro: "Unlimited", enterprise: "Unlimited" } },
  { label: "Texts a month", values: { solo: "75", studio: "500", pro: "2,000", enterprise: "5,000" } },
];

export const ALWAYS_INCLUDED: string[] = [
  "Booking and calendar",
  "Client records and history",
  "Digital consent forms",
  "Flash gallery and portfolio",
  "Deposits and in-studio payments",
  "Mobile booking page",
];

export const CHECK = "check" as const;
export const DASH = "dash" as const;
export type MatrixCell = typeof CHECK | typeof DASH | string;

export interface MatrixGroup {
  label: string;
  rows: { label: string; cells: Record<PlanTier, MatrixCell> }[];
}

const all = (cell: MatrixCell): Record<PlanTier, MatrixCell> => ({ solo: cell, studio: cell, pro: cell, enterprise: cell });
const fromPro = (): Record<PlanTier, MatrixCell> => ({ solo: DASH, studio: DASH, pro: CHECK, enterprise: CHECK });

export const PLAN_MATRIX: MatrixGroup[] = [
  {
    label: "Usage",
    rows: PLAN_CAPS.map((c) => ({ label: c.label, cells: c.values })),
  },
  {
    label: "Scheduling and team",
    rows: [
      { label: "Multi-artist calendar with clash checks", cells: { solo: DASH, studio: CHECK, pro: CHECK, enterprise: CHECK } },
      { label: "Guest-artist seats", cells: { solo: DASH, studio: DASH, pro: "Unlimited", enterprise: "Unlimited" } },
      { label: "Roles and permissions", cells: fromPro() },
    ],
  },
  {
    label: "Payments and payouts",
    rows: [
      { label: "Deposits and in-studio payments", cells: all(CHECK) },
      { label: "Commission and booth-rent splits", cells: { solo: DASH, studio: CHECK, pro: CHECK, enterprise: CHECK } },
      { label: "Payroll and 1099s", cells: fromPro() },
    ],
  },
  {
    label: "Running the shop",
    rows: [
      { label: "Inventory", cells: all(CHECK) },
      { label: "Multi-session projects", cells: all(CHECK) },
      { label: "Marketing campaigns and reports", cells: all(CHECK) },
    ],
  },
  {
    label: "AI",
    rows: [
      { label: "AI replies, aftercare and consult summaries", cells: fromPro() },
      { label: "AI voice profiles and high-volume replies", cells: fromPro() },
    ],
  },
  {
    label: "Compliance and brand",
    rows: [
      { label: "Digital consent forms", cells: all(CHECK) },
      { label: "EU REACH ink tracking", cells: all(CHECK) },
      { label: "Custom booking domain", cells: all(CHECK) },
      { label: "Remove Limespun branding", cells: fromPro() },
      { label: "White-label client booking and portal", cells: fromPro() },
    ],
  },
  {
    label: "Platform",
    rows: [
      { label: "API access", cells: { solo: DASH, studio: DASH, pro: "Basic", enterprise: "With webhooks" } },
      { label: "Reports across locations", cells: fromPro() },
      { label: "Dedicated account manager", cells: { solo: DASH, studio: DASH, pro: DASH, enterprise: CHECK } },
    ],
  },
  {
    label: "Support",
    rows: [{ label: "Support", cells: { solo: "Email", studio: "Email", pro: "Priority", enterprise: "Priority + manager" } }],
  },
];

/** "$39" or "$31.20": whole dollars stay whole. */
export function formatPrice(cents: number): string {
  const dollars = cents / 100;
  return Number.isInteger(dollars)
    ? `$${dollars.toLocaleString("en-US")}`
    : `$${dollars.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export interface DisplayPrice {
  amount: string;
  suffix: string;
  note: string;
}

export function priceFor(plan: Plan, option: BillingOption): DisplayPrice {
  if (option === "lifetime") {
    const months = Math.round(plan.lifetimeCents / plan.monthlyCents);
    return { amount: formatPrice(plan.lifetimeCents), suffix: "once", note: `Pays for itself in ${months} months` };
  }
  if (option === "annual") {
    return {
      amount: formatPrice(Math.round(plan.annualCents / 12)),
      suffix: "/mo",
      note: `${formatPrice(plan.annualCents)} billed yearly`,
    };
  }
  return { amount: formatPrice(plan.monthlyCents), suffix: "/mo", note: "Billed monthly" };
}

/** One-line summary for SEO copy and comparisons. */
export const PLANS_SUMMARY = `Flat plans, never per booking: ${PLANS.map((p) => `${p.name} ${formatPrice(p.monthlyCents)}/mo`).join(", ")}. No cut of bookings or deposits.`;
