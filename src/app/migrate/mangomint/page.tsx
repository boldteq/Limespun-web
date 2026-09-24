"use client";

import React from "react";
import { motion } from "framer-motion";
import { LayoutGrid, AlertCircle, DollarSign } from "lucide-react";
import { ACCOUNT, BRAND, FONT, SHADOW, GRADIENT, fadeUp, stagger } from "@/lib/brand";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/shared/hero-section";
import { ComparisonTable } from "@/components/shared/comparison-table";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { CTASection } from "@/components/shared/cta-section";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { SectionHeading } from "@/components/shared/section-heading";
import { MONEY_BACK_DAYS, ONBOARDING_SUPPORT_DAYS } from "@/lib/data/plans";
import { competitorCaption, competitorRows } from "@/components/shared/competitor-rows";

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

// ── TimelineStep ─────────────────────────────────────────────────────────────

interface TimelineStepProps {
  label: string;
  desc: string;
  index: number;
  isLast: boolean;
}

function TimelineStep({ label, desc, index, isLast }: TimelineStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      style={{
        display: "flex",
        gap: 20,
        position: "relative",
      } as React.CSSProperties}
    >
      {/* Line + dot */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
          width: 32,
        } as React.CSSProperties}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: GRADIENT.cardRust,
            border: `1px solid ${BRAND.rust}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONT.mono,
            fontSize: 11,
            fontWeight: 700,
            color: BRAND.rust,
            flexShrink: 0,
          } as React.CSSProperties}
        >
          {index + 1}
        </div>
        {!isLast && (
          <div
            style={{
              width: 1,
              flex: 1,
              background: BRAND.border,
              marginTop: 6,
              marginBottom: 6,
              minHeight: 24,
            } as React.CSSProperties}
          />
        )}
      </div>
      {/* Content */}
      <div style={{ paddingBottom: isLast ? 0 : 28, paddingTop: 4 } as React.CSSProperties}>
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 16,
            fontWeight: 600,
            color: BRAND.onyx,
            letterSpacing: "-0.01em",
            marginBottom: 4,
          } as React.CSSProperties}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 14,
            lineHeight: 1.6,
            color: BRAND.stoneDark,
          } as React.CSSProperties}
        >
          {desc}
        </div>
      </div>
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

const timelineSteps = [
  {
    label: "Tell us what you have",
    desc: "We look at what you're moving: client count, booking history, deposits you're holding, custom fields, your team.",
  },
  {
    label: "Export and clean",
    desc: "We work from what Mangomint lets you export. We remove duplicate clients, tidy phone formats and flag booking clashes before anything moves.",
  },
  {
    label: "Move it across",
    desc: "Clients, upcoming bookings, deposits held and signed forms come across, each on the right client. If something won't export cleanly, we tell you first.",
  },
  {
    label: "Preview and sign-off",
    desc: "Your data in Limespun, nothing live yet. You check a few clients end to end and tell us what looks wrong. We fix it before you switch.",
  },
  {
    label: "Switch, then cancel Mangomint",
    desc: "Limespun goes live and Mangomint runs alongside until your last booking there clears. When you're settled, cancel it. Usually a week or two from start to finish.",
  },
];

const whatWeCarryCards: MoatCardBrightProps[] = [
  {
    accent: "rust",
    icon: LayoutGrid,
    title: "Every client",
    body: "Names, contact details, notes and custom fields. Custom fields come over as notes on the client record.",
    detail: [
      ["Custom fields", "As notes"],
      ["Contacts", "De-duplicated"],
      ["Notes history", "Carried as written"],
    ],
  },
  {
    accent: "amber",
    icon: AlertCircle,
    title: "Every booking",
    body: "Upcoming appointments come across on the right artist's calendar, so your book matches on the day you switch.",
    detail: [
      ["Upcoming bookings", "Carried"],
      ["Signed forms", "Filed on the client"],
      ["Mangomint", "Runs alongside"],
    ],
  },
  {
    accent: "sage",
    icon: DollarSign,
    title: "Every deposit held",
    body: "Deposits you're holding come across on the client, and onto the project when the piece runs over several sessions.",
    detail: [
      ["Deposits held", "Carried"],
      ["Multi-session", "Pooled on the project"],
      ["Card payments", "Set up in Limespun"],
    ],
  },
];

export default function MangomintMigrationPage() {
  return (
    <div>
      <Nav />
      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <HeroSection
          eyebrow="From Mangomint"
          eyebrowAccent="amber"
          headline="A sleeve is one project, not a string of visits."
          italicWord="project"
          subhead="Mangomint is strong salon and spa software. Limespun is built only for tattoo: one project per piece, one deposit pool across its sessions, and EU REACH ink tracking on every plan. We move your data for you: usually a week or two, included on every plan, with Mangomint running alongside until you switch."
          primaryCTA={{ label: ACCOUNT.signUpLabel, href: ACCOUNT.signUpHref }}
          secondaryCTA={{ label: "Contact us about switching", href: "/contact" }}
        />

        {/* ── Architectural difference ──────────────────────────────────── */}
        <section
          style={{
            background: GRADIENT.sectionCool,
            paddingTop: 100,
            paddingBottom: 100,
            position: "relative",
            overflow: "hidden",
          } as React.CSSProperties}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: 600,
              height: 500,
              background: `radial-gradient(ellipse at 0% 100%, ${BRAND.amberWash} 0%, transparent 60%)`,
              pointerEvents: "none",
            } as React.CSSProperties}
          />
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "0 32px",
              position: "relative",
              zIndex: 2,
            } as React.CSSProperties}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: 48, maxWidth: 760 } as React.CSSProperties}
            >
              <SectionEyebrow label="Why architecture matters" accent="rust" />
              <SectionHeading size="sm">
                Built only for tattoo.
              </SectionHeading>
            </motion.div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 18,
              } as React.CSSProperties}
              className="v4-moat-grid"
            >
              <MoatCardBright
                accent="rust"
                icon={LayoutGrid}
                title="One project per piece"
                body="Mangomint supports multi-session bookings; tracking a piece as one project isn't described. In Limespun a sleeve is one project: every session, photo and note, with one deposit pool."
                detail={[
                  ["Mangomint", "Multi-session bookings"],
                  ["Limespun", "One project"],
                  ["Built for", "Tattoo"],
                ]}
              />
              <MoatCardBright
                accent="amber"
                icon={AlertCircle}
                title="Allergy flags on every booking"
                body="Mangomint stores health details through forms and has client alerts. In Limespun a red ink allergy noted once shows on every booking and on Today, before the client sits down."
                detail={[
                  ["Mangomint", "Forms and alerts"],
                  ["Limespun", "On every booking"],
                  ["Noted", "Once"],
                ]}
              />
              <MoatCardBright
                accent="sage"
                icon={DollarSign}
                title="One deposit across sessions"
                body="Mangomint publishes card-on-file collection; deposits across sessions aren't described. Limespun holds the deposit on the project and applies it session by session."
                detail={[
                  ["Mangomint", "Not published"],
                  ["Limespun", "Deposit pool"],
                  ["Refundable", "Shown on the project"],
                ]}
              />
            </div>
          </div>
        </section>

        {/* ── Comparison table ──────────────────────────────────────────── */}
        <section
          style={{
            background: BRAND.bone,
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
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <ComparisonTable
                competitors={[
                  { key: "mangomint", label: "Mangomint" },
                  { key: "limespun", label: "Limespun", highlighted: true },
                ]}
                rows={competitorRows("mangomint")}
                caption={competitorCaption("mangomint")}
              />
            </motion.div>
          </div>
        </section>

        {/* ── What we carry ─────────────────────────────────────────────── */}
        <section
          style={{
            background: BRAND.bone,
            paddingTop: 80,
            paddingBottom: 80,
            position: "relative",
            overflow: "hidden",
          } as React.CSSProperties}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 520,
              height: 520,
              background: `radial-gradient(circle at 100% 0%, ${BRAND.amberWash} 0%, transparent 60%)`,
              pointerEvents: "none",
            } as React.CSSProperties}
          />
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "0 32px",
              position: "relative",
              zIndex: 2,
            } as React.CSSProperties}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: 48, maxWidth: 760 } as React.CSSProperties}
            >
              <SectionEyebrow label="What we carry" accent="amber" />
              <SectionHeading size="sm">Every record migrates clean.</SectionHeading>
            </motion.div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 18,
              } as React.CSSProperties}
              className="v4-moat-grid"
            >
              {whatWeCarryCards.map((card) => (
                <MoatCardBright key={card.title} {...card} />
              ))}
            </div>
          </div>
        </section>

        {/* ── The move ──────────────────────────────────────────────────── */}
        <section
          style={{
            background: GRADIENT.sectionWarm,
            paddingTop: 100,
            paddingBottom: 100,
            position: "relative",
            overflow: "hidden",
          } as React.CSSProperties}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "0 32px",
              position: "relative",
              zIndex: 2,
            } as React.CSSProperties}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: 56, maxWidth: 760 } as React.CSSProperties}
            >
              <SectionEyebrow label="The move" accent="rust" />
              <SectionHeading size="sm">How the move works.</SectionHeading>
            </motion.div>

            <div
              style={{
                maxWidth: 680,
                background: BRAND.white,
                borderRadius: 22,
                padding: "36px 36px 28px",
                boxShadow: SHADOW.card,
                position: "relative",
                overflow: "hidden",
              } as React.CSSProperties}
            >
              {/* Top gradient strip */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: `linear-gradient(90deg, ${BRAND.amber} 0%, ${BRAND.rust} 50%, ${BRAND.sage} 100%)`,
                } as React.CSSProperties}
              />
              {timelineSteps.map((step, i) => (
                <TimelineStep
                  key={i}
                  label={step.label}
                  desc={step.desc}
                  index={i}
                  isLast={i === timelineSteps.length - 1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Early-days note ───────────────────────────────────────────── */}
        <section
          style={{
            background: BRAND.bone,
            paddingTop: 80,
            paddingBottom: 80,
          } as React.CSSProperties}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "0 32px",
              display: "flex",
              justifyContent: "center",
            } as React.CSSProperties}
          >
            <motion.div
              variants={stagger}
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
                  {" "}Mangomint, you work directly with the people building the product: we map your
                  data with you and run both systems side by side, and if it isn&apos;t right in the first {MONEY_BACK_DAYS} days you get your money back.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <section
          style={{
            background: BRAND.boneDeep,
            paddingTop: 80,
            paddingBottom: 80,
          } as React.CSSProperties}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "0 32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            } as React.CSSProperties}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: 40, textAlign: "center" } as React.CSSProperties}
            >
              <SectionEyebrow label="Common questions" accent="amber" />
              <SectionHeading size="sm">Before you migrate.</SectionHeading>
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              style={{ width: "100%" } as React.CSSProperties}
            >
              <FAQAccordion
                accent="amber"
                items={[
                  {
                    q: "Mangomint's customer support is great. Does Limespun match?",
                    a: "Different model. Mangomint serves a wide salon and spa audience. We're a small team building only for tattoo studios. Email support on every plan, priority support on Pro and Multi-Location.",
                  },
                  {
                    q: "What comes across from Mangomint?",
                    a: "We work from what Mangomint lets you export and move your clients, upcoming bookings, deposits held and signed forms. If something won't export cleanly, we tell you before you switch.",
                  },
                  {
                    q: "Does Limespun handle tips?",
                    a: "Yes. A tip is recorded as its own line on the payment and goes to the artist in full.",
                  },
                  {
                    q: "Can I run Limespun alongside Mangomint during migration?",
                    a: `Yes, and we recommend it. Keep Mangomint running until your last booking there clears, then cancel. Limespun has a ${MONEY_BACK_DAYS}-day money-back guarantee.`,
                  },
                  {
                    q: "What if my staff is used to Mangomint's UI?",
                    a: `The screens use studio words (Today, Calendar, Projects, Payments), so most teams find their way quickly. You also get ${ONBOARDING_SUPPORT_DAYS} days of onboarding help.`,
                  },
                ]}
              />
            </motion.div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <CTASection
          badge="Tattoo-native"
          headline="Move to software built for the work."
          italicWord="work"
          subhead={`Migration is included on every plan: usually a week or two, with Mangomint running alongside until you switch. ${MONEY_BACK_DAYS}-day money-back guarantee.`}
          primaryCTA={{ label: ACCOUNT.signUpLabel, href: ACCOUNT.signUpHref }}
          secondaryCTA={{ label: "Contact us about switching", href: "/contact" }}
        />
      </main>
      <Footer />
    </div>
  );
}
