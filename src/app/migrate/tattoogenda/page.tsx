"use client";

import React from "react";
import { motion } from "framer-motion";
import { Droplet, Wallet, ArrowRightLeft } from "lucide-react";
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
const [STUDIO] = PLANS.filter((p) => p.tier === "studio");
const [PRO] = PLANS.filter((p) => p.tier === "pro");

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
    icon: Droplet,
    title: "Ink inventory with REACH tracking",
    body: "TattooGenda lists inventory as not offered; its ink passport records the inks used. Limespun tracks stock by bottle, with an Ink registry and a REACH ink disclosure on the consent form.",
    detail: [
      ["TattooGenda", "No inventory"],
      ["Limespun", "Every plan"],
      ["Consent form", "REACH disclosure"],
    ],
  },
  {
    accent: "amber",
    icon: Wallet,
    title: "Artist pay, worked out",
    body: "TattooGenda shows the artist's share in reports; payroll isn't published. Limespun works out commission and booth-rent splits, and runs payroll and 1099s.",
    detail: [
      ["TattooGenda", "Share in reports"],
      ["Limespun splits", "Studio and up"],
      ["Payroll and 1099s", "Pro and up"],
    ],
  },
  {
    accent: "sage",
    icon: ArrowRightLeft,
    title: "The move, done for you",
    body: "TattooGenda doesn't publish migration help. On Limespun our team moves your clients, bookings, deposits and signed forms, on every plan.",
    detail: [
      ["TattooGenda", "Not published"],
      ["Limespun", "Every plan"],
      ["Usually takes", "A week or two"],
    ],
  },
];

const timelineSteps = [
  { day: "1", title: "You tell us what you use; we work from what TattooGenda lets you export" },
  { day: "2", title: "Clients, upcoming bookings, deposits held and signed forms moved across" },
  { day: "3", title: "Preview: you check the import before it lands" },
  { day: "4", title: "Side by side until your last TattooGenda booking clears, then you switch" },
];

const faqItems = [
  {
    q: "What happens to custom fields?",
    a: "Standard fields map across. Custom fields you've added come over as notes on the client record.",
  },
  {
    q: "What can we bring over from TattooGenda?",
    a: "We work from what TattooGenda lets you export and move your clients, upcoming bookings, deposits held and signed forms. If something won't export cleanly, we tell you before you switch.",
  },
  {
    q: "How does Limespun's price compare with TattooGenda's?",
    a: `TattooGenda publishes: ${competitorPricing("tattoogenda")} Limespun plans go by team size: ${formatPrice(SOLO.monthlyCents)}/mo for one artist, ${formatPrice(STUDIO.monthlyCents)}/mo for up to 5, ${formatPrice(PRO.monthlyCents)}/mo for up to 15, with no Limespun fee on bookings or deposits.`,
  },
  {
    q: "Will my guest residency setup carry over?",
    a: "Guest-artist seats start on Pro. Upcoming bookings come across with the rest of your calendar; you then give each guest their own dates, booking link and split.",
  },
  {
    q: "Can I keep both running during migration?",
    a: `Yes, and we recommend it. Keep TattooGenda running until your last booking there clears, then cancel. Limespun has a ${MONEY_BACK_DAYS}-day money-back guarantee.`,
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TattoogendaPage() {
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
          eyebrow="From TattooGenda"
          eyebrowAccent="rust"
          headline="Both built for tattoo. Here's what's different."
          italicWord="different"
          subhead="TattooGenda is tattoo software too: projects, deposits and guest spots are first-class there. Limespun adds ink inventory with EU REACH tracking, artist splits and payroll, and a done-for-you move: usually a week or two, included on every plan, with TattooGenda running alongside until you switch."
          primaryCTA={{ label: ACCOUNT.signUpLabel, href: ACCOUNT.signUpHref }}
          secondaryCTA={{
            label: "Contact us about switching",
            href: "/contact",
          }}
        />

        {/* Why Limespun */}
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
            <SectionEyebrow label="What's different" accent="rust" />
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
              Where Limespun is different.
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
              className="tattoogenda-moat-grid"
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
              TattooGenda vs. Limespun.
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
                  { key: "tattoogenda", label: "TattooGenda" },
                  { key: "limespun", label: "Limespun", highlighted: true },
                ]}
                rows={competitorRows("tattoogenda")}
                caption={competitorCaption("tattoogenda")}
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
                      color: BRAND.rust,
                      minWidth: 52,
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

        {/* Early-days note */}
        <section
          style={{
            background: BRAND.bone,
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
                  {" "}TattooGenda, you work directly with the people building the product: we map your
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
            <SectionEyebrow label="TattooGenda questions" accent="rust" />
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
          headline="Bring your studio over."
          italicWord="over"
          subhead={`Migration is included on every plan: usually a week or two, with TattooGenda running alongside until you switch. ${MONEY_BACK_DAYS}-day money-back guarantee.`}
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
          .tattoogenda-moat-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
