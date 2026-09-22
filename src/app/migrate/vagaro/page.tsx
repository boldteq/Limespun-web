"use client";

import React from "react";
import { motion } from "framer-motion";
import { LayoutGrid, AlertCircle, Shield } from "lucide-react";
import { BRAND, FONT, SHADOW, GRADIENT, fadeUp, stagger } from "@/lib/brand";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/shared/hero-section";
import { ComparisonTable } from "@/components/shared/comparison-table";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { CTASection } from "@/components/shared/cta-section";
import { StatStrip } from "@/components/shared/stat-strip";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { PLANS, formatPrice, MONEY_BACK_DAYS } from "@/lib/data/plans";

const [MULTI] = PLANS.filter((p) => p.tier === "enterprise");

// ── MoatCardBright (local — lifted from work.tsx) ────────────────────────────

const accentMap = {
  rust:  { color: BRAND.rust,  bg: BRAND.rustWash,  glow: GRADIENT.cardRust  },
  amber: { color: BRAND.amber, bg: BRAND.amberWash, glow: GRADIENT.cardAmber },
  sage:  { color: BRAND.sage,  bg: BRAND.sageWash,  glow: GRADIENT.cardSage  },
} as const;

type AccentKey = keyof typeof accentMap;

interface MoatCardBrightProps {
  accent: AccentKey;
  icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  title: string;
  body: string;
  detail: [string, string][];
}

function MoatCardBright({ accent, icon: Icon, title, body, detail }: MoatCardBrightProps) {
  const a = accentMap[accent];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, boxShadow: SHADOW.card }}
      style={{
        background: BRAND.white,
        borderRadius: 18,
        padding: 28,
        boxShadow: SHADOW.soft,
        display: "flex",
        flexDirection: "column",
        gap: 18,
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.25s, box-shadow 0.25s",
      } as React.CSSProperties}
    >
      {/* Top accent strip */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: a.color,
        } as React.CSSProperties}
      />

      {/* Corner glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 120,
          height: 120,
          background: `radial-gradient(circle at 100% 0%, ${a.bg} 0%, transparent 70%)`,
          pointerEvents: "none",
        } as React.CSSProperties}
      />

      <div style={{ position: "relative" } as React.CSSProperties}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: a.glow,
            border: `1px solid ${a.color}25`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          } as React.CSSProperties}
        >
          <Icon size={20} color={a.color} strokeWidth={2} />
        </div>
      </div>

      <div style={{ position: "relative" } as React.CSSProperties}>
        <h3
          style={{
            fontFamily: FONT.sans,
            fontSize: 19,
            fontWeight: 600,
            color: BRAND.onyx,
            letterSpacing: "-0.015em",
            marginBottom: 10,
            lineHeight: 1.25,
          } as React.CSSProperties}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: FONT.sans,
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 1.6,
            color: BRAND.stoneDark,
          } as React.CSSProperties}
        >
          {body}
        </p>
      </div>

      <div
        style={{
          background: a.bg,
          borderRadius: 12,
          padding: "4px 16px",
          marginTop: "auto",
          position: "relative",
        } as React.CSSProperties}
      >
        {detail.map((row, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              padding: "10px 0",
              borderBottom:
                i < detail.length - 1 ? `1px dashed ${a.color}25` : "none",
              gap: 12,
            } as React.CSSProperties}
          >
            <span
              style={{
                fontFamily: FONT.sans,
                fontSize: 11.5,
                fontWeight: 500,
                color: BRAND.stoneDark,
              } as React.CSSProperties}
            >
              {row[0]}
            </span>
            <span
              style={{
                fontFamily: FONT.sans,
                fontSize: 12,
                fontWeight: 600,
                color: BRAND.onyx,
                textAlign: "right",
              } as React.CSSProperties}
            >
              {row[1]}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const moatCards: MoatCardBrightProps[] = [
  {
    accent: "rust",
    icon: LayoutGrid,
    title: "Multi-session projects",
    body: "Vagaro books a service. A sleeve is five visits, one deposit pool. The mismatch is total.",
    detail: [
      ["Vagaro", "Per-service"],
      ["Limespun", "Per-project"],
      ["Migration", "Schema re-map"],
    ],
  },
  {
    accent: "amber",
    icon: AlertCircle,
    title: "Allergy intelligence",
    body: "Vagaro stores 'notes.' Limespun surfaces allergies on Today, schedule cards, kiosk forms — three places, one source.",
    detail: [
      ["Vagaro", "Notes field"],
      ["Limespun", "4-place surface"],
      ["Risk", "Managed"],
    ],
  },
  {
    accent: "sage",
    icon: Shield,
    title: "EU REACH compliance",
    body: "Vagaro has no concept of an ink registry. CI numbers, MSDS, batch tracking — none of it.",
    detail: [
      ["Vagaro", "Not supported"],
      ["Limespun", "Every plan"],
      ["Inspector", "<30s report"],
    ],
  },
];

const timelineSteps = [
  { day: "Day 1", title: "Discovery + Vagaro export request" },
  { day: "Days 2–3", title: "Export + clean (Vagaro CSV pull, dedup)" },
  {
    day: "Day 4",
    title:
      "Schema re-mapping (services → sessions, packages → projects, notes → allergy/medical fields)",
  },
  { day: "Day 5", title: "Preview run + sign-off" },
  { day: "Days 6–7", title: "Parallel run + cutover" },
];

const faqItems = [
  {
    q: "Vagaro charges 1.99% per booking. What does Limespun charge?",
    a: "Nothing. You pay the monthly software fee. Stripe takes its standard processing fee. We add zero on top.",
  },
  {
    q: "Will my Vagaro packages convert?",
    a: "Yes. Packages map to Limespun multi-session projects. The discount logic, scheduled visits, and prepaid deposits all carry.",
  },
  {
    q: "I run a multi-location chain on Vagaro. Will that work?",
    a: `Yes. Pro covers up to 5 locations; Multi-Location (${formatPrice(MULTI.monthlyCents)}/mo flat) covers unlimited locations, with reports across every shop. Migration runs sequentially — pilot at one location, then roll out.`,
  },
  {
    q: "What about Vagaro's marketplace? Does Limespun have one?",
    a: "We don't run a customer-facing marketplace. Our job is to power your studio's brand. Marketplace traffic ends with Vagaro on day-of cutover; build your own funnel through Marketing module.",
  },
  {
    q: "Can I keep using Vagaro during migration?",
    a: `Yes. Standard 14-day parallel run. Cancel Vagaro day-of cutover. Limespun has a ${MONEY_BACK_DAYS}-day money-back guarantee.`,
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function VagaroPage() {
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
          eyebrow="From Vagaro"
          eyebrowAccent="amber"
          headline="Vagaro is built for nail salons. You're a tattoo studio."
          italicWord="tattoo studio"
          subhead="Vagaro is excellent salon software — for haircuts, manicures, and waxing. None of that translates to a 5-session sleeve, a deposit pool across visits, or a REACH-compliant ink registry. We re-map your data to a tattoo schema. 7 days. White-glove."
          primaryCTA={{ label: "Talk to migrations", href: "/book-a-demo" }}
          secondaryCTA={{
            label: "Get started",
            href: "https://app.limespun.com/signup",
          }}
        />

        {/* The architectural problem */}
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
            <SectionEyebrow label="What goes wrong" accent="rust" />
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
              Five concepts Vagaro doesn&apos;t have.
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
              className="vagaro-moat-grid"
            >
              {moatCards.map((card) => (
                <MoatCardBright key={card.title} {...card} />
              ))}
            </motion.div>
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
              Vagaro vs. Limespun.
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
                  { key: "vagaro", label: "Vagaro" },
                  { key: "limespun", label: "Limespun", highlighted: true },
                ]}
                rows={[
                  {
                    feature: "Multi-session projects",
                    values: { vagaro: false, limespun: true },
                  },
                  {
                    feature: "Deposit pool across visits",
                    values: { vagaro: false, limespun: true },
                  },
                  {
                    feature: "Allergy intelligence (4-place surface)",
                    values: { vagaro: "Notes only", limespun: true },
                  },
                  {
                    feature: "EU REACH ink registry",
                    values: { vagaro: false, limespun: true },
                  },
                  {
                    feature: "Photo timeline (REF→HEALED)",
                    values: { vagaro: "Basic", limespun: true },
                  },
                  {
                    feature: "Commission auto-splits",
                    values: { vagaro: "Salon-style only", limespun: "Studio and up" },
                  },
                  {
                    feature: "AI design assistant",
                    values: { vagaro: false, limespun: "Pro and up" },
                  },
                  {
                    feature: "Guest artist residency band",
                    values: { vagaro: false, limespun: "Pro and up" },
                  },
                  {
                    feature: "Tattoo-specific by design",
                    values: { vagaro: false, limespun: true },
                  },
                  {
                    feature: "Per-booking transaction fee",
                    values: { vagaro: "Yes", limespun: "No" },
                  },
                  {
                    feature: "Multi-location support",
                    values: { vagaro: true, limespun: "Pro and up" },
                  },
                  {
                    feature: "White-glove migration",
                    values: { vagaro: false, limespun: true },
                  },
                ]}
                caption="Vagaro feature set: vagaro.com docs + pricing, April 2026."
              />
            </motion.div>
          </div>
        </section>

        {/* 7-day plan */}
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
            <SectionEyebrow label="7-day plan" accent="amber" />
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
              How Vagaro studios migrate.
            </motion.h2>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
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
                      fontWeight: 700,
                      color: BRAND.amber,
                      minWidth: 64,
                      paddingTop: 2,
                      flexShrink: 0,
                      letterSpacing: "0.06em",
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

        {/* Stats */}
        <section
          style={{
            background: GRADIENT.sectionWarm,
            paddingTop: 80,
            paddingBottom: 80,
          } as React.CSSProperties}
        >
          <div
            style={{
              maxWidth: 1120,
              margin: "0 auto",
              padding: "0 32px",
            } as React.CSSProperties}
          >
            <StatStrip
              items={[
                { stat: "Re-mapped", label: "salon records to a tattoo schema" },
                { stat: "Side by side", label: "Vagaro runs until cutover" },
                { stat: "0%", label: "transaction fees on Limespun" },
                { stat: `${MONEY_BACK_DAYS} days`, label: "money-back guarantee" },
              ]}
            />
          </div>
        </section>

        {/* Early-days note */}
        <section
          style={{
            background: GRADIENT.sectionWarm,
            paddingTop: 80,
            paddingBottom: 80,
          } as React.CSSProperties}
        >
          <div
            style={{
              maxWidth: 1120,
              margin: "0 auto",
              padding: "0 32px",
              display: "flex",
              justifyContent: "center",
            } as React.CSSProperties}
          >
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              style={{ maxWidth: 560, width: "100%" } as React.CSSProperties}
            >
              <div
                style={{
                  background: BRAND.white,
                  borderRadius: 18,
                  padding: 32,
                  boxShadow: SHADOW.soft,
                  border: `1px solid ${BRAND.borderSoft}`,
                } as React.CSSProperties}
              >
                <SectionEyebrow label="Early days" accent="rust" />
                <p
                  style={{
                    fontFamily: FONT.serif,
                    fontStyle: "italic",
                    fontSize: 24,
                    lineHeight: 1.3,
                    color: BRAND.onyx,
                    margin: "0 0 16px",
                  } as React.CSSProperties}
                >
                  No testimonials here yet &mdash; and we won&apos;t invent them.
                </p>
                <p
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: BRAND.stoneDark,
                    margin: 0,
                  } as React.CSSProperties}
                >
                  Limespun is new, so there are no switching stories yet. Moving from
                  {" "}Vagaro, you work directly with the people building the product: we map your
                  data with you and run both systems side by side, and if it isn&apos;t right in the first {MONEY_BACK_DAYS} days you get your money back.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
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
            <SectionEyebrow label="Vagaro questions" accent="amber" />
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
              What studios ask before moving.
            </motion.h2>
            <FAQAccordion items={faqItems} accent="amber" />
          </div>
        </section>

        {/* CTA */}
        <CTASection
          badge="Stop bending salon software"
          headline="Move to software built for tattoo."
          italicWord="for tattoo"
          subhead={`7-day migration. Free on every plan. ${MONEY_BACK_DAYS}-day money-back guarantee.`}
          primaryCTA={{ label: "Talk to migrations", href: "/book-a-demo" }}
          secondaryCTA={{
            label: "Or get started",
            href: "https://app.limespun.com/signup",
            icon: "play",
          }}
        />
      </main>
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .vagaro-moat-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
