"use client";

import React from "react";
import { motion } from "framer-motion";
import { ACCOUNT, BRAND, FONT, SHADOW, GRADIENT, fadeUp, stagger } from "@/lib/brand";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/shared/hero-section";
import { ComparisonTable } from "@/components/shared/comparison-table";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { CTASection } from "@/components/shared/cta-section";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { PLANS, formatPrice, MONEY_BACK_DAYS } from "@/lib/data/plans";
import { competitorCaption, competitorPricing, competitorRows } from "@/components/shared/competitor-rows";

const [SOLO] = PLANS.filter((p) => p.tier === "solo");

const timelineSteps = [
  { day: "1", title: "You tell us what you use; we work from what Fresha lets you export" },
  {
    day: "2",
    title: "Export and clean: fields mapped, duplicates removed",
  },
  { day: "3", title: "Preview: you check the import before it lands" },
  {
    day: "4",
    title: "Side by side until your last Fresha booking clears, then you switch",
  },
];

const faqItems = [
  {
    q: "Will Fresha let me export my data?",
    a: "We work from whatever Fresha lets you export and move your clients, upcoming bookings, deposits held and signed forms. If something won't export cleanly, we tell you before you switch.",
  },
  {
    q: "What about Fresha's marketplace? Will I lose those leads?",
    a: "Clients who found you through Fresha come across with the rest of your client list, as far as Fresha's export includes them. New clients come from your own booking page and marketing, not a marketplace that lists other studios next to you.",
  },
  {
    q: "Does Limespun have a marketplace too?",
    a: "No. We don't run a customer-facing marketplace. Our job is to power your studio's brand, not compete for your customers.",
  },
  {
    q: "How does Limespun's price compare with Fresha's?",
    a: `Fresha publishes: ${competitorPricing("fresha")} Limespun is a flat monthly plan from ${formatPrice(SOLO.monthlyCents)}/mo, with no Limespun fee on bookings or deposits; card payments carry the provider's standard fee.`,
  },
  {
    q: "Can I keep using my Fresha subscription during migration?",
    a: `Yes, and we recommend it. Keep Fresha running until your last booking there clears, then cancel. Limespun comes with a ${MONEY_BACK_DAYS}-day money-back guarantee.`,
  },
];

export default function FreshaPage() {
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
        {/* Hero */}
        <HeroSection
          eyebrow="From Fresha"
          eyebrowAccent="amber"
          headline="Keep every booking. Move to software built for tattoo."
          italicWord="tattoo"
          subhead="Fresha prices per bookable team member and charges a one-time fee on new clients who find you through its marketplace. Limespun is one flat monthly plan with no Limespun fee on bookings or deposits. We move your data for you: usually a week or two, included on every plan, with Fresha running alongside until you switch."
          primaryCTA={{ label: ACCOUNT.signUpLabel, href: ACCOUNT.signUpHref }}
          secondaryCTA={{
            label: "Contact us about switching",
            href: "/contact",
          }}
        />

        {/* Comparison */}
        <section
          style={{
            background: BRAND.bone,
            paddingTop: 100,
            paddingBottom: 100,
          } as React.CSSProperties}
        >
          <div
            style={{
              maxWidth: 1120,
              margin: "0 auto",
              padding: "0 32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            } as React.CSSProperties}
          >
            <SectionEyebrow label="Side by side" accent="amber" />
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              style={{
                fontFamily: FONT.sans,
                fontSize: "clamp(26px, 3.5vw, 42px)",
                fontWeight: 600,
                color: BRAND.onyx,
                letterSpacing: "-0.02em",
                marginBottom: 48,
                textAlign: "center",
              } as React.CSSProperties}
            >
              Fresha vs. Limespun.
            </motion.h2>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              style={{ width: "100%" } as React.CSSProperties}
            >
              <ComparisonTable
                competitors={[
                  { key: "fresha", label: "Fresha" },
                  { key: "limespun", label: "Limespun", highlighted: true },
                ]}
                rows={competitorRows("fresha")}
                caption={competitorCaption("fresha")}
              />
            </motion.div>
          </div>
        </section>

        {/* The move */}
        <section
          style={{
            background: BRAND.bone,
            paddingTop: 0,
            paddingBottom: 100,
          } as React.CSSProperties}
        >
          <div
            style={{
              maxWidth: 1120,
              margin: "0 auto",
              padding: "0 32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            } as React.CSSProperties}
          >
            <SectionEyebrow label="The move" accent="rust" />
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              style={{
                fontFamily: FONT.sans,
                fontSize: "clamp(26px, 3.5vw, 42px)",
                fontWeight: 600,
                color: BRAND.onyx,
                letterSpacing: "-0.02em",
                marginBottom: 48,
                textAlign: "center",
              } as React.CSSProperties}
            >
              How the move works.
            </motion.h2>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                width: "100%",
                maxWidth: 720,
              } as React.CSSProperties}
            >
              {timelineSteps.map((step, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  style={{
                    background: BRAND.white,
                    borderRadius: 14,
                    padding: "20px 24px",
                    boxShadow: SHADOW.soft,
                    border: `1px solid ${BRAND.borderSoft}`,
                    display: "flex",
                    gap: 20,
                    alignItems: "flex-start",
                  } as React.CSSProperties}
                >
                  <div
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 12,
                      fontWeight: 600,
                      color: BRAND.rust,
                      minWidth: 64,
                      paddingTop: 2,
                      flexShrink: 0,
                    } as React.CSSProperties}
                  >
                    {step.day}
                  </div>
                  <div
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 15,
                      fontWeight: 500,
                      color: BRAND.onyx,
                      lineHeight: 1.5,
                    } as React.CSSProperties}
                  >
                    {step.title}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section
          style={{
            background: GRADIENT.sectionWarm,
            paddingTop: 100,
            paddingBottom: 100,
          } as React.CSSProperties}
        >
          <div
            style={{
              maxWidth: 1120,
              margin: "0 auto",
              padding: "0 32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            } as React.CSSProperties}
          >
            <SectionEyebrow label="Fresha questions" accent="amber" />
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              style={{
                fontFamily: FONT.sans,
                fontSize: "clamp(26px, 3.5vw, 42px)",
                fontWeight: 600,
                color: BRAND.onyx,
                letterSpacing: "-0.02em",
                marginBottom: 48,
                textAlign: "center",
              } as React.CSSProperties}
            >
              What studios ask before leaving.
            </motion.h2>
            <FAQAccordion items={faqItems} accent="amber" />
          </div>
        </section>

        {/* CTA */}
        <CTASection
          badge="Switching"
          headline="Leave Fresha cleanly."
          italicWord="cleanly"
          subhead={`Migration is included on every plan: usually a week or two, with Fresha running alongside until you switch. ${MONEY_BACK_DAYS}-day money-back guarantee if Limespun isn't right for you.`}
          primaryCTA={{ label: ACCOUNT.signUpLabel, href: ACCOUNT.signUpHref }}
          secondaryCTA={{
            label: "Contact us about switching",
            href: "/contact",
          }}
        />
      </main>
      <Footer />

    </div>
  );
}
