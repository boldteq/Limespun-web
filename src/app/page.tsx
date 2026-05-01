import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { Truth } from "@/components/home/truth";
import { Shift } from "@/components/home/shift";
import { Work } from "@/components/home/work";
import { Studio } from "@/components/home/studio";
import { Proof } from "@/components/home/proof";
import { Migration } from "@/components/home/migration";
import { Pricing } from "@/components/home/pricing";
import { Close } from "@/components/home/close";
import { BRAND } from "@/lib/brand";
import { JsonLd } from "@/components/seo/json-ld";

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", background: BRAND.bone, overflow: "hidden" }}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "InkOS",
          legalName: "Boldteq Holdings Ltd",
          url: "https://inkos.studio",
          logo: "https://inkos.studio/icon.png",
          description:
            "The studio operating system for tattoo. Multi-session projects, deposit pools, allergy intelligence, EU REACH compliance.",
          foundingDate: "2024",
          sameAs: [
            "https://twitter.com/inkos_studio",
            "https://www.instagram.com/inkos.studio",
          ],
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
          name: "InkOS",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "USD",
            lowPrice: "29",
            highPrice: "199",
            offerCount: "4",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "47",
          },
        }}
      />
      <Nav />
      <main>
        <Hero />
        <Truth />
        <Shift />
        <Work />
        <Studio />
        <Proof />
        <Migration />
        <Pricing />
        <Close />
      </main>
      <Footer />
    </div>
  );
}
