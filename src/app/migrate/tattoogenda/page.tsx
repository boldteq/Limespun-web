"use client";

import React from "react";
import { motion } from "framer-motion";
import { LayoutGrid, Shield, Plane } from "lucide-react";
import { BRAND, FONT, SHADOW, GRADIENT, fadeUp, stagger } from "@/lib/brand";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/shared/hero-section";
import { ComparisonTable } from "@/components/shared/comparison-table";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { CTASection } from "@/components/shared/cta-section";
import { TestimonialCard } from "@/components/shared/testimonial-card";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";

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
    title: "Multi-session as the foundation",
    body: "Sleeves are projects from day one, not an upgrade.",
    detail: [
      ["Sessions", "Native to schema"],
      ["Deposit pool", "Per-project always"],
      ["Photo timeline", "REF→HEALED auto-tag"],
    ],
  },
  {
    accent: "amber",
    icon: Shield,
    title: "REACH compliance, every plan",
    body: "EU 2022 ink registry on every tier. No 'Bigger Plan' upsell.",
    detail: [
      ["REACH", "Every plan"],
      ["MSDS", "Attached per bottle"],
      ["Inspector report", "1-click"],
    ],
  },
  {
    accent: "sage",
    icon: Plane,
    title: "Guest residencies as a band",
    body: "Time-boxed guest mode on the calendar, auto-archive on departure.",
    detail: [
      ["Booking page slug", "Per-guest"],
      ["Time-box", "Auto-expire"],
      ["Email approval", "No account"],
    ],
  },
];

const timelineSteps = [
  { day: "Day 1", title: "Discovery + TattooGenda CSV export" },
  { day: "Day 2", title: "Schema mapping (Bigger Plan features map to InkOS defaults)" },
  { day: "Day 3", title: "Preview run + sign-off" },
  { day: "Day 4", title: "Cutover + cancel TattooGenda" },
];

const faqItems = [
  {
    q: "What about TattooGenda's tattoo-specific custom fields?",
    a: "Migrated. Every TattooGenda field — body part, ink type, session count, healing notes — maps to first-class InkOS fields. Custom fields you've added become InkOS Notes.",
  },
  {
    q: "Does TattooGenda's API export everything?",
    a: "Yes. They cooperate well with migrations. We pull bookings + clients + deposit ledger + photo references + consent files via their API.",
  },
  {
    q: "I'm on TattooGenda's 'Bigger Plan' for $79/mo. Why switch?",
    a: "Two reasons: (1) every InkOS plan includes the Bigger Plan features (multi-session, deposit pools, REACH); (2) AI Studio + commission auto-splits + omnichannel inbox don't exist in TattooGenda at any tier.",
  },
  {
    q: "Will my guest residency setup carry over?",
    a: "Fully. Time-boxed bands, per-guest booking pages, email-approval flow — all 1:1 between platforms.",
  },
  {
    q: "Can I keep both running during migration?",
    a: "Yes. 14-day overlap recommended. Cancel TattooGenda day-of cutover. We don't bill until your last TattooGenda appointment clears.",
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
          headline="Tattoo-native vs tattoo-native. We win on the small stuff."
          italicWord="the small stuff"
          subhead="TattooGenda was the original tattoo-only booking SaaS. We respect that. But the things they put behind 'Bigger Plan' — REACH compliance, guest residencies, deposit pools — InkOS includes on every plan. 4-day migration. White-glove. Free above Solo."
          primaryCTA={{ label: "Talk to migrations", href: "/book-a-demo" }}
          secondaryCTA={{
            label: "Start the trial",
            href: "https://inkos.up.railway.app/signup",
          }}
        />

        {/* Why InkOS */}
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
              Tattoo-native, but every feature on every plan.
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
              TattooGenda vs. InkOS.
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
                  { key: "inkos", label: "InkOS", highlighted: true },
                ]}
                rows={[
                  {
                    feature: "Multi-session projects (sleeves)",
                    values: { tattoogenda: "Bigger plan", inkos: true },
                  },
                  {
                    feature: "Deposit pool across visits",
                    values: { tattoogenda: "Bigger plan", inkos: true },
                  },
                  {
                    feature: "EU REACH ink registry",
                    values: { tattoogenda: true, inkos: true },
                  },
                  {
                    feature: "Allergy intelligence (4-place surface)",
                    values: { tattoogenda: "Limited", inkos: true },
                  },
                  {
                    feature: "AI design assistant",
                    values: { tattoogenda: false, inkos: true },
                  },
                  {
                    feature: "Photo timeline (REF→HEALED)",
                    values: { tattoogenda: "Limited", inkos: true },
                  },
                  {
                    feature: "Commission auto-splits (Stripe Connect)",
                    values: { tattoogenda: false, inkos: true },
                  },
                  {
                    feature: "Guest residency band",
                    values: { tattoogenda: true, inkos: true },
                  },
                  {
                    feature: "API access",
                    values: { tattoogenda: "Enterprise", inkos: true },
                  },
                  {
                    feature: "Tattoo-specific by design",
                    values: { tattoogenda: true, inkos: true },
                  },
                  {
                    feature: "Per-booking transaction fee",
                    values: { tattoogenda: "No", inkos: "No" },
                  },
                  {
                    feature: "White-glove migration",
                    values: { tattoogenda: false, inkos: true },
                  },
                ]}
                caption="TattooGenda feature set: tattoogenda.com pricing + docs, April 2026."
              />
            </motion.div>
          </div>
        </section>

        {/* 4-day plan */}
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
            <SectionEyebrow label="4-day plan" accent="rust" />
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
              How TattooGenda studios migrate.
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

        {/* Testimonial */}
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
              style={{ maxWidth: 460, width: "100%" } as React.CSSProperties}
            >
              <TestimonialCard
                name="Tomas Bel"
                role="Owner · Salt House Tattoo"
                city="Reykjavik, IS"
                chairs="3 chairs · rotating guests"
                quote="Guest residencies used to mean three spreadsheets. Now I drop them on the calendar and the booking page just works."
                stats={[
                  { l: "Residencies / yr", v: "11" },
                  { l: "Setup time", v: "12 min" },
                  { l: "Guest no-shows", v: "0" },
                ]}
                gradient={`linear-gradient(135deg, ${BRAND.amber} 0%, ${BRAND.rust} 100%)`}
                initials="TB"
              />
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
          badge="Tattoo-native, no upsells"
          headline="Move where every feature is on every plan."
          italicWord="every feature"
          subhead="4-day migration. Free above Solo. We don't bill until you cancel TattooGenda."
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
          .tattoogenda-moat-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
