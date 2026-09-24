import type { Metadata } from "next";
import React from "react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { BRAND, CONTACT_EMAIL, SITE_URL, SOCIAL } from "@/lib/brand";
import { AboutSections } from "./about-sections";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "About — Built for the work, not the spreadsheet | Limespun",
  description:
    "Boldteq is a small team building Limespun, studio software made only for tattoo. Why we built it, and the four principles behind it.",
  openGraph: {
    title: "About Limespun",
    description: "Studio software built only for tattoo, by a small independent team.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/about" },
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
          name: "Limespun",
          legalName: "Boldteq Holdings Ltd",
          url: SITE_URL,
          logo: `${SITE_URL}/icon.svg`,
          description:
            "Limespun is studio software built only for tattoo: bookings, deposits, consent, multi-session projects and artist payouts in one client record. Made by Boldteq.",
          foundingDate: "2024",
          founders: [
            {
              "@type": "Person",
              name: "Yash Baldha",
              jobTitle: "Founder & CEO",
            },
          ],
          sameAs: [SOCIAL.x, SOCIAL.instagram],
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            email: CONTACT_EMAIL,
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
