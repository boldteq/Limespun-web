"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, DollarSign, Calendar } from "lucide-react";
import { ACCOUNT, BRAND, FONT, SHADOW, GRADIENT, fadeUp, stagger } from "@/lib/brand";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/shared/hero-section";
import { ComparisonTable } from "@/components/shared/comparison-table";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { CTASection } from "@/components/shared/cta-section";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { MONEY_BACK_DAYS } from "@/lib/data/plans";
import { competitorCaption, competitorRows } from "@/components/shared/competitor-rows";

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
    body: "Names, contact details, notes and the signed forms you already have. Custom fields come over as notes on the client record.",
  },
  {
    accent: "amber",
    icon: DollarSign,
    title: "Every deposit held",
    body: "Deposits you're holding come across on the client, so day one in Limespun shows the same money you had in DaySmart.",
  },
  {
    accent: "sage",
    icon: Calendar,
    title: "Every upcoming booking",
    body: "Upcoming appointments come across on the right artist's calendar, so your book matches on the day you switch.",
  },
];

const timelineSteps = [
  {
    day: "1",
    title: "You tell us what you use; we work from what DaySmart lets you export",
  },
  {
    day: "2",
    title: "Export and clean: fields mapped, duplicates removed",
  },
  {
    day: "3",
    title: "Preview: you check the import before it lands",
  },
  {
    day: "4",
    title: "Side by side until your last DaySmart booking clears, then you switch",
  },
];

const faqItems = [
  {
    q: "Will my DaySmart custom fields come across?",
    a: "Standard fields map across. Custom fields come over as notes on the client record.",
  },
  {
    q: "What comes across from DaySmart?",
    a: "We work from what DaySmart lets you export and move your clients, upcoming bookings, deposits held and signed forms. If something won't export cleanly, we tell you before you switch.",
  },
  {
    q: "Can I keep my old subscription overlapping?",
    a: `Yes, and we recommend it. Keep DaySmart running until your last booking there clears, then cancel. Limespun has a ${MONEY_BACK_DAYS}-day money-back guarantee.`,
  },
  {
    q: "Will my booking links break?",
    a: "Your Limespun booking page has its own link, or your own domain on any plan. On the day you switch, update the link in your bio and on your website.",
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
          headline="Move from DaySmart without losing a booking."
          italicWord="booking"
          subhead="DaySmart Body Art handles tattoo bookings, release forms and commissions. Limespun tracks a sleeve as one project with one deposit pool, and shows allergy flags on every booking. We move your data for you: usually a week or two, included on every plan, with DaySmart running alongside until you switch."
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
              DaySmart and Limespun, side by side.
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
                rows={competitorRows("daysmart")}
                caption={competitorCaption("daysmart")}
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
              What comes across.
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

        {/* The move */}
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
          badge="Switching"
          headline="Leave DaySmart cleanly."
          italicWord="cleanly"
          subhead={`Migration is included on every plan: usually a week or two, with DaySmart running alongside until you switch. ${MONEY_BACK_DAYS}-day money-back guarantee.`}
          primaryCTA={{ label: ACCOUNT.signUpLabel, href: ACCOUNT.signUpHref }}
          secondaryCTA={{
            label: "Contact us about switching",
            href: "/contact",
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
