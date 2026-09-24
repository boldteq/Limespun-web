import type { Metadata } from "next";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { PageIntro } from "@/components/marketing/page-intro";
import { ClosingCta } from "@/components/marketing/closing-cta";
import { PayoutCalculator } from "@/components/tools/payout-calculator";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Tattoo artist payout calculator",
  description: "Work out artist and studio pay under commission, booth rent or a guest-artist split. Free tattoo studio payout calculator.",
  path: "/tools/payout-calculator",
});

export default function PayoutCalculatorPage() {
  return (
    <div className="min-h-screen bg-canvas text-graphite">
      <Nav />
      <main id="main">
        <PageIntro
          crumbs={[{ label: "Home", href: "/" }, { label: "Free tools", href: "/tools" }, { label: "Payout calculator" }]}
          title="Artist payout calculator"
          lead="Pick how your artist is paid, add a week's sessions, and see what the artist and the studio each take home."
        />
        <section className="bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
            <PayoutCalculator />
          </div>
        </section>
        <ClosingCta
          title="Payday without the spreadsheet."
          italicWord="Payday"
          body="Limespun counts every closed session toward the right artist under their own split, so payouts take one approval."
        />
      </main>
      <Footer />
    </div>
  );
}
