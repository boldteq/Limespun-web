"use client";

import React from "react";
import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";
import { BRAND, FONT, SHADOW, GRADIENT, fadeUp, stagger } from "@/lib/brand";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/shared/hero-section";
import { ComparisonTable } from "@/components/shared/comparison-table";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { CTASection } from "@/components/shared/cta-section";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";

type AccentKey = "rust" | "amber" | "sage";

interface FeeCardProps {
  accent: AccentKey;
  monthlyRevenue: string;
  freshaFee: string;
  inkosPlan: string;
  inkosCost: string;
  savingsMonthly: string;
  savingsAnnual: string;
}

const accentMap = {
  rust: { color: BRAND.rust, bg: BRAND.rustWash, glow: GRADIENT.cardRust },
  amber: {
    color: BRAND.amber,
    bg: BRAND.amberWash,
    glow: GRADIENT.cardAmber,
  },
  sage: { color: BRAND.sage, bg: BRAND.sageWash, glow: GRADIENT.cardSage },
} as const;

function FeeCard({
  accent,
  monthlyRevenue,
  freshaFee,
  inkosPlan,
  inkosCost,
  savingsMonthly,
  savingsAnnual,
}: FeeCardProps) {
  const a = accentMap[accent];
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, boxShadow: SHADOW.card }}
      style={{
        background: a.glow,
        borderRadius: 18,
        padding: "28px",
        border: `1px solid ${BRAND.borderSoft}`,
        boxShadow: SHADOW.soft,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        transition: "box-shadow 0.22s ease",
      } as React.CSSProperties}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: a.bg,
          border: `1.5px solid ${a.color}22`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        } as React.CSSProperties}
      >
        <DollarSign size={20} color={a.color} strokeWidth={1.8} />
      </div>

      <div>
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 22,
            fontWeight: 700,
            color: BRAND.onyx,
            letterSpacing: "-0.02em",
            marginBottom: 4,
          } as React.CSSProperties}
        >
          {monthlyRevenue}
        </div>
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 12,
            color: BRAND.stoneLight,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            fontWeight: 500,
          } as React.CSSProperties}
        >
          per month
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
        } as React.CSSProperties}
      >
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 13,
            color: BRAND.stoneDark,
          } as React.CSSProperties}
        >
          Fresha fee:{" "}
          <span
            style={{
              fontWeight: 700,
              color: BRAND.crimson,
            } as React.CSSProperties}
          >
            {freshaFee}/mo
          </span>
        </div>
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 13,
            color: BRAND.stoneDark,
          } as React.CSSProperties}
        >
          InkOS {inkosPlan}:{" "}
          <span
            style={{ fontWeight: 700, color: BRAND.sage } as React.CSSProperties}
          >
            {inkosCost}/mo
          </span>
        </div>
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 14,
            fontWeight: 700,
            color: a.color,
            marginTop: 4,
          } as React.CSSProperties}
        >
          Savings: {savingsMonthly}/mo
        </div>
      </div>

      <div
        style={{
          padding: "10px 14px",
          borderRadius: 10,
          background: BRAND.white,
          fontFamily: FONT.mono,
          fontSize: 12,
          fontWeight: 600,
          color: BRAND.stoneDark,
          border: `1px solid ${BRAND.borderSoft}`,
        } as React.CSSProperties}
      >
        Annual savings: {savingsAnnual}
      </div>
    </motion.div>
  );
}

const feeCards: FeeCardProps[] = [
  {
    accent: "rust",
    monthlyRevenue: "On $20K/month",
    freshaFee: "$390",
    inkosPlan: "Solo",
    inkosCost: "$29",
    savingsMonthly: "$361",
    savingsAnnual: "$4,332",
  },
  {
    accent: "amber",
    monthlyRevenue: "On $50K/month",
    freshaFee: "$975",
    inkosPlan: "Studio",
    inkosCost: "$59",
    savingsMonthly: "$916",
    savingsAnnual: "$10,992",
  },
  {
    accent: "sage",
    monthlyRevenue: "On $100K/month",
    freshaFee: "$1,950",
    inkosPlan: "Pro",
    inkosCost: "$99",
    savingsMonthly: "$1,851",
    savingsAnnual: "$22,212",
  },
];

const timelineSteps = [
  { day: "Day 1", title: "Discovery call + Fresha API connection" },
  {
    day: "Days 2-3",
    title: "Export + clean (Fresha CSV-pull, schema map)",
  },
  { day: "Day 4", title: "Preview run (InkOS staging, you sign off)" },
  {
    day: "Day 5",
    title: "Cutover (parallel hour, DNS switch, cancel Fresha)",
  },
];

const faqItems = [
  {
    q: "Will Fresha let me export my data?",
    a: "Yes. Fresha provides a CSV export of all client and booking data. We've migrated 100+ studios from Fresha — they cooperate.",
  },
  {
    q: "What about Fresha's marketplace? Will I lose those leads?",
    a: "You keep your client list. Fresha marketplace leads from before cutover are now in your InkOS CRM. New leads come from your own marketing — not a marketplace that competes with you.",
  },
  {
    q: "Does InkOS have a marketplace too?",
    a: "No. We don't run a customer-facing marketplace. Our job is to power your studio's brand, not compete for your customers.",
  },
  {
    q: "What happens to recurring bookings?",
    a: "Migrated. Recurring rules carry. Clients see no disruption.",
  },
  {
    q: "Can I keep using my Fresha subscription during migration?",
    a: "Yes. 14-day overlap recommended. Stop billing on Fresha day-of cutover.",
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
          headline="Keep your bookings. Leave the platform fee."
          italicWord="leave"
          subhead="Fresha takes 1.95% of every payment in addition to the subscription. On a $50K month, that's $975 you don't need to pay. InkOS doesn't take a cut. 5-day migration. Done."
          primaryCTA={{ label: "Talk to migrations", href: "/book-a-demo" }}
          secondaryCTA={{
            label: "Start the trial",
            href: "https://inkos.up.railway.app/signup",
          }}
        />

        {/* Fee math */}
        <section
          style={{
            background: GRADIENT.sectionCool,
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
            <SectionEyebrow label="The math" accent="rust" />
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
              What Fresha&apos;s 1.95% costs you.
            </motion.h2>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 20,
                width: "100%",
              } as React.CSSProperties}
              className="fresha-fee-grid"
            >
              {feeCards.map((card) => (
                <FeeCard key={card.monthlyRevenue} {...card} />
              ))}
            </motion.div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              style={{
                fontFamily: FONT.sans,
                fontSize: 13,
                color: BRAND.stoneLight,
                textAlign: "center",
                marginTop: 24,
                fontStyle: "italic",
              } as React.CSSProperties}
            >
              Plus the $19.99–$59.99 monthly Fresha subscription on top of the
              transaction fee.
            </motion.p>
          </div>
        </section>

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
              Fresha vs. InkOS.
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
                  { key: "inkos", label: "InkOS", highlighted: true },
                ]}
                rows={[
                  {
                    feature: "Per-booking transaction fee",
                    values: { fresha: "1.95%", inkos: "No" },
                  },
                  {
                    feature: "Multi-session projects",
                    values: { fresha: false, inkos: true },
                  },
                  {
                    feature: "Deposit pool across visits",
                    values: { fresha: false, inkos: true },
                  },
                  {
                    feature: "Allergy intelligence",
                    values: { fresha: false, inkos: true },
                  },
                  {
                    feature: "Photo timeline",
                    values: { fresha: "Basic", inkos: true },
                  },
                  {
                    feature: "Commission auto-splits (artist payouts)",
                    values: { fresha: "Team Pay add-on", inkos: true },
                  },
                  {
                    feature: "EU REACH ink registry",
                    values: { fresha: false, inkos: true },
                  },
                  {
                    feature: "Tattoo-specific by design",
                    values: { fresha: false, inkos: true },
                  },
                  {
                    feature: "White-glove migration",
                    values: { fresha: false, inkos: true },
                  },
                ]}
                caption="Fresha pricing source: fresha.com pricing page, April 2026."
              />
            </motion.div>
          </div>
        </section>

        {/* 5-day plan */}
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
            <SectionEyebrow label="5-day plan" accent="rust" />
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
              How Fresha studios migrate.
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
          badge="Stop paying the take"
          headline="Leave Fresha cleanly."
          italicWord="cleanly"
          subhead="5-day move. Free. We don't bill until you've cancelled Fresha."
          primaryCTA={{ label: "Talk to migrations", href: "/book-a-demo" }}
          secondaryCTA={{
            label: "Or start the trial",
            href: "https://inkos.up.railway.app/signup",
            icon: "play",
          }}
        />
      </main>
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .fresha-fee-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
