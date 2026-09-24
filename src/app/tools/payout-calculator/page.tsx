import React from "react";
import { PaymentsScreen } from "@/components/mockups";
import { PayoutCalculator } from "@/components/tools/payout-calculator";
import { ToolPage } from "@/components/tools/tool-page";
import { PLANS, formatPrice, type PlanTier } from "@/lib/data/plans";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Tattoo artist payout calculator",
  description:
    "Work out artist and studio pay under commission, booth rent or a guest-artist split, per session and per week. A free payout calculator for tattoo studios.",
  path: "/tools/payout-calculator",
});

const plan = (tier: PlanTier) => {
  const p = PLANS.find((x) => x.tier === tier) ?? PLANS[0];
  return `${p.name} ${formatPrice(p.monthlyCents)}`;
};

export default function PayoutCalculatorPage() {
  return (
    <ToolPage
      slug="payout-calculator"
      eyebrow="Free calculator"
      title="Calculate each artist’s payout"
      italicWord="payout"
      lead="Pick how your artist is paid, add a week’s sessions, and see what the artist and the studio each take home."
      feature="payments"
      inApp={{
        title: "Splits worked out from every session",
        body: (
          <>
            Set each artist’s commission or booth rent once. What each artist is owed builds up session by session and
            waits on Today for your approval. On Pro, payroll runs total commission, tips and what the studio keeps.
          </>
        ),
        bullets: [
          `Commission and booth-rent splits from ${plan("studio")}`,
          `Guest-artist splits on ${plan("pro")}`,
          `Payroll and 1099s on ${plan("pro")}`,
        ],
        action: "How payouts work",
        visual: <PaymentsScreen tab="commissions" />,
      }}
      inkBand={{
        headline: "Payday without the spreadsheet.",
        italicWord: "spreadsheet",
        secondary: { label: "How payouts work", href: "/product/payments" },
      }}
    >
      <PayoutCalculator />
    </ToolPage>
  );
}
