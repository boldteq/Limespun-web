import type { Metadata } from "next";
import React from "react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { BRAND } from "@/lib/brand";
import { AboutSections } from "./about-sections";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "About — Built for the work, not the spreadsheet | InkOS",
  description:
    "Boldteq, a small team building global-first software for craft industries. Why we built InkOS, and the principles behind every line of code.",
  openGraph: {
    title: "About InkOS",
    description: "Built for tattoo studios. By a team that actually walks into shops.",
    type: "website",
  },
  alternates: { canonical: "https://inkos.studio/about" },
};

export default function AboutPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: BRAND.bone,
        overflow: "hidden",
      } as React.CSSProperties}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "InkOS",
          legalName: "Boldteq Holdings Ltd",
          url: "https://inkos.studio",
          logo: "https://inkos.studio/icon.png",
          description:
            "Boldteq builds global-first software for craft industries. InkOS is the studio operating system purpose-built for tattoo.",
          foundingDate: "2024",
          foundingLocation: [
            { "@type": "Place", name: "United Kingdom" },
            { "@type": "Place", name: "Americas" },
          ],
          founders: [
            {
              "@type": "Person",
              name: "Yash Baldha",
              jobTitle: "Founder & CEO",
            },
          ],
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
      <Nav />

      <main>
        <AboutSections />
      </main>

      <Footer />

      <style>{`
        @media (max-width: 1024px) {
          .about-thesis-grid { grid-template-columns: 1fr !important; }
          .about-principles-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .about-team-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .about-principles-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
