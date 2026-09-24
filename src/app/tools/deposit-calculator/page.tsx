import React from "react";
import { AppointmentsScreen } from "@/components/mockups";
import { DepositCalculator } from "@/components/tools/deposit-calculator";
import { ToolPage } from "@/components/tools/tool-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Tattoo deposit & no-show calculator",
  description:
    "Work out how much no-shows and late cancels cost your tattoo studio each month, and how much a deposit policy keeps. Free, no sign-up.",
  path: "/tools/deposit-calculator",
});

export default function DepositCalculatorPage() {
  return (
    <ToolPage
      slug="deposit-calculator"
      eyebrow="Free calculator"
      /* The word joiner keeps "no-shows" whole: a line never breaks after its hyphen */
      title={"Calculate what no-\u2060shows cost"}
      italicWord={"no-\u2060shows"}
      lead="Put in your own numbers to see what no-shows and late cancels cost each month, and how much of that a deposit keeps."
      feature="appointments"
      inApp={{
        title: "Deposits taken when the client books",
        body: (
          <>
            Your booking page asks for the deposit and holds the slot as Pending until it’s paid. Unpaid deposits
            cancel the booking on your deadline, and a sleeve’s deposit is applied session by session. If a client
            cancels, you decide whether the deposit is kept or refunded.
          </>
        ),
        bullets: [
          "Deposits on every plan, Solo included",
          "A different amount on each service",
          "No Limespun fee on bookings or deposits",
        ],
        action: "How deposits work",
        visual: (
          <>
            {/* As on the Deposits page: phones get the Needs action rows, wider stages the week's Deposit column */}
            <AppointmentsScreen tab="needs-action" className="sm:hidden" />
            <AppointmentsScreen tab="this-week" className="hidden sm:flex" />
          </>
        ),
      }}
      inkBand={{
        headline: "Take the deposit when they book.",
        italicWord: "deposit",
        secondary: { label: "How deposits work", href: "/product/appointments" },
      }}
    >
      <DepositCalculator />
    </ToolPage>
  );
}
