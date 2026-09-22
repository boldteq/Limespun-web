"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, DollarSign, Calendar } from "lucide-react";
import { BRAND, FONT, SHADOW, GRADIENT, fadeUp, stagger } from "@/lib/brand";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/shared/hero-section";
import { ComparisonTable } from "@/components/shared/comparison-table";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { CTASection } from "@/components/shared/cta-section";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { MONEY_BACK_DAYS } from "@/lib/data/plans";

type AccentKey = "rust" | "amber" | "sage";

interface CarryCardProps {
  accent: AccentKey;
  icon: React.ComponentType<{
    size?: number;
    color?: string;
    strokeWidth?: number;
  }>;
  title: string;
  body: string;
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

function CarryCard({ accent, icon: Icon, title, body }: CarryCardProps) {
  const a = accentMap[accent];
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, boxShadow: SHADOW.card }}
      style={{
        background: a.glow,
        borderRadius: 18,
        padding: "28px 28px 28px 28px",
        border: `1px solid ${BRAND.borderSoft}`,
        boxShadow: SHADOW.soft,
        display: "flex",
        flexDirection: "column",
        gap: 16,
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
          flexShrink: 0,
        } as React.CSSProperties}
      >
        <Icon size={20} color={a.color} strokeWidth={1.8} />
      </div>
      <div>
        <h3
          style={{
            fontFamily: FONT.sans,
            fontSize: 17,
            fontWeight: 700,
            color: BRAND.onyx,
            marginBottom: 8,
            letterSpacing: "-0.01em",
          } as React.CSSProperties}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: FONT.sans,
            fontSize: 14,
            lineHeight: 1.6,
            color: BRAND.stoneDark,
            margin: 0,
          } as React.CSSProperties}
        >
          {body}
        </p>
      </div>
    </motion.div>
  );
}

const carryCards: CarryCardProps[] = [
  {
    accent: "rust",
    icon: Users,
    title: "Every client record",
    body: "Names, contacts, allergy fields, custom fields. Mapped to Limespun schema. Photo libraries migrated and re-organised by project.",
  },
  {
    accent: "amber",
    icon: DollarSign,
    title: "Every deposit + balance",
    body: "Outstanding deposits ported intact. Stripe Connect re-attached. Day-1 in Limespun shows the same money state as day-zero in DaySmart.",
  },
  {
    accent: "sage",
    icon: Calendar,
    title: "Every booking on the deck",
    body: "Future appointments, recurring bookings, blocked time, residencies — all carried. The calendar in Limespun is identical to DaySmart's the moment we cut over.",
  },
];

const timelineSteps = [
  {
    day: "Day 1",
    title: "Discovery call · API access · data shape mapping",
  },
  {
    day: "Days 2-4",
    title: "Export + clean (DaySmart API-pull, schema map, dedup)",
  },
  {
    day: "Days 5-7",
    title: "Preview run (Limespun staging, you review, sign off)",
  },
  {
    day: "Days 8-9",
    title: "Cutover (parallel hour, switch DNS, cancel DaySmart)",
  },
];

const faqItems = [
  {
    q: "Will my DaySmart custom fields come across?",
    a: "Yes. Standard fields map automatically. Custom fields become 'Notes' or get promoted to first-class fields if the migration team thinks they earn it.",
  },
  {
    q: "What about my DaySmart inventory data?",
    a: "Migrated to Limespun Inventory module. Bottle records re-mapped to EU REACH-compliant schema. Vendor cost data preserved.",
  },
  {
    q: "Can I keep my old subscription overlapping?",
    a: `Yes — and it's our recommendation. Run both for up to 14 days, then cancel DaySmart at cutover. Limespun has a ${MONEY_BACK_DAYS}-day money-back guarantee.`,
  },
  {
    q: "Will my booking links break?",
    a: "No. We set up redirect rules from old DaySmart booking URLs to Limespun booking URLs. Clients clicking old links land on the new flow.",
  },
];

export default function DaysmartPage() {
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
          eyebrow="From DaySmart"
          eyebrowAccent="rust"
          headline="DaySmart was built for spas. You're a tattoo studio."
          italicWord="tattoo"
          subhead="Multi-session sleeves don't exist in DaySmart. Allergy intelligence is a custom field. Deposit pools are a Notes app. We plan your move over 9 days. White-glove. Every record checked with you."
          primaryCTA={{ label: "Talk to migrations", href: "/book-a-demo" }}
          secondaryCTA={{
            label: "Get started",
            href: "https://app.limespun.com/signup",
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
            <SectionEyebrow label="Side by side" accent="rust" />
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
              What Limespun does that DaySmart can&apos;t.
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
                  { key: "daysmart", label: "DaySmart" },
                  { key: "limespun", label: "Limespun", highlighted: true },
                ]}
                rows={[
                  {
                    feature: "Multi-session projects (sleeves)",
                    values: { daysmart: false, limespun: true },
                  },
                  {
                    feature: "Deposit pool across visits",
                    values: { daysmart: false, limespun: true },
                  },
                  {
                    feature: "Allergy intelligence (surfaces 4 places)",
                    values: { daysmart: "Custom field", limespun: true },
                  },
                  {
                    feature: "Photo timeline (REF → HEALED)",
                    values: { daysmart: "Just attachments", limespun: true },
                  },
                  {
                    feature: "EU REACH ink registry",
                    values: { daysmart: false, limespun: true },
                  },
                  {
                    feature: "AI design assistant",
                    values: { daysmart: false, limespun: "Pro and up" },
                  },
                  {
                    feature: "Commission auto-splits",
                    values: { daysmart: false, limespun: "Studio and up" },
                  },
                  {
                    feature: "Guest residency band",
                    values: { daysmart: false, limespun: "Pro and up" },
                  },
                  {
                    feature: "Per-booking transaction fee",
                    values: { daysmart: "No", limespun: "No" },
                  },
                  {
                    feature: "White-glove migration in 9 days",
                    values: { daysmart: false, limespun: true },
                  },
                ]}
                caption="Source: DaySmart public docs + Limespun feature set, April 2026."
              />
            </motion.div>
          </div>
        </section>

        {/* What we carry */}
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
            <SectionEyebrow label="What we carry" accent="amber" />
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
              Every record. Every photo. Every dollar.
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
              className="daysmart-carry-grid"
            >
              {carryCards.map((card) => (
                <CarryCard key={card.title} {...card} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* 9-day process */}
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
            <SectionEyebrow label="9-day plan" accent="rust" />
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
              How DaySmart studios migrate.
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

        {/* Early-days note */}
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
                  {" "}DaySmart, you work directly with the people building the product: we map your
                  data with you and run both systems side by side, and if it isn&apos;t right in the first {MONEY_BACK_DAYS} days you get your money back.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
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
            <SectionEyebrow label="DaySmart questions" accent="rust" />
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
            <FAQAccordion items={faqItems} accent="rust" />
          </div>
        </section>

        {/* CTA */}
        <CTASection
          badge="The 9-day move"
          headline="Leave DaySmart cleanly."
          italicWord="cleanly"
          subhead="30-min discovery call. We map your studio's data shape and give you an honest 9-day plan. Free."
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
          .daysmart-carry-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
