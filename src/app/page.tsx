import type { Metadata } from "next";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { Pillars } from "@/components/home/pillars";
import { Tour } from "@/components/home/tour";
import { Connected } from "@/components/home/connected";
import { Promises } from "@/components/home/promises";
import { Reviews } from "@/components/home/reviews";
import { Pricing } from "@/components/home/pricing";
import { Faq } from "@/components/home/faq";
import { InkBand } from "@/components/system";
import { JsonLd } from "@/components/seo/json-ld";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/brand";
import { FOUNDING_OFFER_OPEN, FOUNDING_OFFER_SIZE, PLANS } from "@/lib/data/plans";

// Title, description and share card come from the root layout; the homepage adds its canonical.
export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
};

const monthlyDollars = PLANS.map((p) => p.monthlyCents / 100);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-canvas text-graphite">
      <a
        href="#main"
        className="sr-only z-[1000] items-center rounded-full bg-graphite text-[15px] font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:inline-flex focus:min-h-11 focus:px-[18px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite"
      >
        Skip to content
      </a>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Limespun",
          url: SITE_URL,
          logo: `${SITE_URL}/icon.svg`,
          description:
            "Tattoo studio software for bookings, multi-session projects, deposits, consent forms and artist payouts.",
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            email: CONTACT_EMAIL,
            availableLanguage: ["English"],
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Limespun",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "USD",
            lowPrice: String(Math.min(...monthlyDollars)),
            highPrice: String(Math.max(...monthlyDollars)),
            offerCount: String(PLANS.length),
          },
        }}
      />
      <Nav />
      <main id="main">
        <Hero />
        <Pillars />
        <Tour />
        <Connected />
        <Promises />
        <Reviews />
        <Pricing />
        <Faq />
        <InkBand
          eyebrow={FOUNDING_OFFER_OPEN ? `Founding offer · first ${FOUNDING_OFFER_SIZE} studios` : undefined}
          secondary={{ label: "See pricing", href: "#pricing" }}
        />
      </main>
      <Footer />
    </div>
  );
}
