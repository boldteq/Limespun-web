import type { Metadata } from "next";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { PageIntro } from "@/components/marketing/page-intro";
import { ClosingCta } from "@/components/marketing/closing-cta";
import { DepositCalculator } from "@/components/tools/deposit-calculator";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Tattoo deposit & no-show calculator",
  description: "Work out how much no-shows and late cancels cost your tattoo studio each month, and how much a deposit policy keeps. Free, no sign-up.",
  path: "/tools/deposit-calculator",
});

export default function DepositCalculatorPage() {
  return (
    <div className="min-h-screen bg-canvas text-graphite">
      <Nav />
      <main id="main">
        <PageIntro
          crumbs={[{ label: "Home", href: "/" }, { label: "Free tools", href: "/tools" }, { label: "Deposit calculator" }]}
          title="Deposit & no-show calculator"
          lead="Put in your own numbers to see what no-shows and late cancels cost each month, and how much of that a deposit keeps."
        />
        <section className="bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
            <DepositCalculator />
          </div>
        </section>
        <ClosingCta
          title="Take the deposit when they book."
          italicWord="deposit"
          body="Limespun collects deposits at booking, carries them across a project's sessions and applies your cancellation policy."
        />
      </main>
      <Footer />
    </div>
  );
}
