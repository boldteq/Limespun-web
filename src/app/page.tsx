import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { Pillars } from "@/components/home/pillars";
import { Tour } from "@/components/home/tour";
import { Connected } from "@/components/home/connected";
import { Promises } from "@/components/home/promises";
import { Reviews } from "@/components/home/reviews";
import { Pricing } from "@/components/home/pricing";
import { Faq, faqs } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/lib/brand";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-canvas text-graphite">
      <a
        href="#main"
        className="sr-only z-[1000] rounded-full bg-graphite px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
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
            email: "hello@boldteq.com",
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
            lowPrice: "39",
            highPrice: "329",
            offerCount: "4",
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
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
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
