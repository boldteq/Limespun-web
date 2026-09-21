import type { Metadata } from "next";
import React from "react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/shared/hero-section";
import { StatStrip } from "@/components/shared/stat-strip";
import { PhotoBand } from "@/components/brand/photo-band";
import { LogoBar } from "@/components/shared/logo-bar";
import { CTASection } from "@/components/shared/cta-section";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { StoryGrid } from "@/components/customers/story-grid";
import { BRAND, FONT, GRADIENT } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Customers — How studios run on Limespun",
  description:
    "Real tattoo studios using Limespun. From solo residencies in East London to two-floor shops in Mexico City. See how they cut hours and grew bookings.",
  openGraph: {
    title: "Limespun Customers",
    description:
      "Real tattoo studios using Limespun. From solo residencies in East London to two-floor shops in Mexico City.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/customers" },
};

export default function CustomersPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: BRAND.bone,
        overflow: "hidden",
      } as React.CSSProperties}
    >
      <Nav />
      <main>
        {/* ── Section 1: Hero ── */}
        <HeroSection
          variant="centered"
          eyebrow="The proof"
          eyebrowAccent="rust"
          headline="How studios run on Limespun."
          italicWord="run"
          subhead="From a single residency chair in East London to a two-floor shop in Mexico City — these are the studios that traded seven apps for one quiet system. And the numbers behind the move."
          primaryCTA={{
            label: "Start a 14-day trial",
            href: "https://app.limespun.com/signup",
          }}
          secondaryCTA={{
            label: "Book a walkthrough",
            href: "/book-a-demo",
            icon: "play",
          }}
        />

        {/* ── Section 2: Stat strip ── */}
        <div
          style={{
            background: BRAND.bone,
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 32px",
          } as React.CSSProperties}
        >
          <StatStrip
            items={[
              { stat: "1,200+", label: "artists on Limespun" },
              { stat: "47", label: "countries" },
              { stat: "$8.4M", label: "monthly bookings processed" },
              { stat: "$0", label: "in transaction fees taken" },
            ]}
          />
        </div>

        {/* ── Section 3: PhotoBand row ── */}
        <section
          style={{
            background: GRADIENT.sectionWarm,
            paddingTop: 80,
            paddingBottom: 80,
          } as React.CSSProperties}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "0 32px",
            } as React.CSSProperties}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: 40,
              } as React.CSSProperties}
            >
              <SectionEyebrow label="Featured studios" accent="amber" />
              <h2
                style={{
                  fontFamily: FONT.serif,
                  fontSize: "clamp(28px, 4vw, 42px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                  color: BRAND.onyx,
                  fontWeight: 400,
                  textAlign: "center",
                  margin: 0,
                } as React.CSSProperties}
              >
                Three signals from the wall.
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr",
                gap: 14,
              } as React.CSSProperties}
              className="v6-photo-band"
            >
              <PhotoBand
                height={320}
                label="Sable & Sparrow · Brooklyn · 4 chairs in motion"
                gradient={`linear-gradient(135deg, ${BRAND.rust} 0%, ${BRAND.rustDeep} 50%, ${BRAND.amber} 100%)`}
              />
              <PhotoBand
                height={320}
                label="Nine Lives · East London · solo residency"
                gradient={`linear-gradient(135deg, ${BRAND.amber} 0%, ${BRAND.rustGlow} 100%)`}
              />
              <PhotoBand
                height={320}
                label="Calle Negra · CDMX · two floors"
                gradient={`linear-gradient(135deg, ${BRAND.sage} 0%, ${BRAND.amber} 100%)`}
              />
            </div>
          </div>
        </section>

        {/* ── Section 4: Filterable story grid ── */}
        <section
          style={{
            background: BRAND.bone,
            paddingTop: 100,
            paddingBottom: 100,
          } as React.CSSProperties}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "0 32px",
            } as React.CSSProperties}
          >
            <div style={{ marginBottom: 48 } as React.CSSProperties}>
              <SectionEyebrow label="All stories" accent="sage" />
              <h2
                style={{
                  fontFamily: FONT.serif,
                  fontSize: "clamp(28px, 4vw, 42px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                  color: BRAND.onyx,
                  fontWeight: 400,
                  margin: 0,
                } as React.CSSProperties}
              >
                Every studio. Every size.
              </h2>
            </div>

            <StoryGrid />
          </div>
        </section>

        {/* ── Section 5: Logo bar ── */}
        <section
          style={{
            background: GRADIENT.sectionCool,
            paddingTop: 80,
            paddingBottom: 80,
          } as React.CSSProperties}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "0 32px",
            } as React.CSSProperties}
          >
            <LogoBar
              caption="Studios on Limespun"
              logos={[
                { name: "Sable & Sparrow" },
                { name: "Nine Lives" },
                { name: "Calle Negra" },
                { name: "Pluma Studio" },
                { name: "Salt House" },
                { name: "Aoiro Atelier" },
                { name: "Iron + Ash" },
                { name: "Cinco Manos" },
                { name: "Quiet Hand" },
              ]}
            />
          </div>
        </section>

        {/* ── Section 6: Featured pull quote ── */}
        <section
          style={{
            background: BRAND.bone,
            paddingTop: 100,
            paddingBottom: 100,
          } as React.CSSProperties}
        >
          <div
            style={{
              maxWidth: 800,
              margin: "0 auto",
              padding: "0 32px",
            } as React.CSSProperties}
          >
            <blockquote
              style={{
                fontFamily: FONT.serif,
                fontSize: "clamp(28px, 4vw, 44px)",
                lineHeight: 1.3,
                color: BRAND.onyx,
                textAlign: "center",
                fontStyle: "italic",
                letterSpacing: "-0.015em",
                margin: 0,
              } as React.CSSProperties}
            >
              &ldquo;Limespun is the first software that understood the shop is a
              body of work, not a calendar full of strangers.&rdquo;
            </blockquote>
            <div
              style={{
                marginTop: 24,
                textAlign: "center",
                fontFamily: FONT.sans,
                fontSize: 13,
                color: BRAND.stoneFaint,
              } as React.CSSProperties}
            >
              &mdash; Miles Verena, Sable &amp; Sparrow
            </div>
          </div>
        </section>

        {/* ── Section 7: CTA ── */}
        <CTASection
          badge="Add your studio to the wall"
          headline="Run on Limespun."
          italicWord="Run"
          subhead="14-day trial. No card. White-glove migration above Solo. We do not bill until your last appointment from your old tool has cleared."
          primaryCTA={{
            label: "Start a 14-day trial",
            href: "https://app.limespun.com/signup",
          }}
          secondaryCTA={{
            label: "Book a walkthrough",
            href: "/book-a-demo",
            icon: "play",
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
