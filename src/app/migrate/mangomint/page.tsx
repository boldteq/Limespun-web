"use client";

import React from "react";
import { motion } from "framer-motion";
import { LayoutGrid, AlertCircle, DollarSign } from "lucide-react";
import { BRAND, FONT, SHADOW, GRADIENT, fadeUp, stagger } from "@/lib/brand";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/shared/hero-section";
import { ComparisonTable } from "@/components/shared/comparison-table";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { CTASection } from "@/components/shared/cta-section";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { SectionHeading } from "@/components/shared/section-heading";
import { MONEY_BACK_DAYS } from "@/lib/data/plans";

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
  day: string;
  label: string;
  desc: string;
  index: number;
  isLast: boolean;
}

function TimelineStep({ day, label, desc, index, isLast }: TimelineStepProps) {
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
            display: "inline-block",
            fontFamily: FONT.mono,
            fontSize: 10,
            fontWeight: 700,
            color: BRAND.rust,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            marginBottom: 4,
          } as React.CSSProperties}
        >
          {day}
        </div>
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
    day: "Day 1",
    label: "Discovery + Mangomint API access",
    desc: "We audit your account: client count, booking history, deposit balances, custom fields, team structure. You grant read-only API access.",
  },
  {
    day: "Day 2–3",
    label: "Export + clean",
    desc: "Full data export. We de-duplicate clients, normalise phone formats, resolve booking conflicts. Nothing moves dirty.",
  },
  {
    day: "Day 4",
    label: "Schema mapping",
    desc: "Salon concepts re-mapped to tattoo schema: tip jar → deposit pool, package → project, hair-colour note → ink allergy flag.",
  },
  {
    day: "Day 5",
    label: "Preview run + sign-off",
    desc: "Your data in Limespun, nothing live yet. You review three clients end-to-end, confirm everything looks right. We fix anything on the spot.",
  },
  {
    day: "Day 6",
    label: "Cutover + cancel Mangomint",
    desc: "Limespun goes live. Stripe Connect re-attached. We stay on call for the first business day. When you're settled, cancel Mangomint.",
  },
];

const whatWeCarryCards: MoatCardBrightProps[] = [
  {
    accent: "rust",
    icon: LayoutGrid,
    title: "Every client",
    body: "Names, contacts, notes, custom fields. Mangomint custom fields become Limespun Notes or get promoted to first-class fields.",
    detail: [
      ["Custom fields", "Mapped or promoted"],
      ["Contacts", "De-duplicated"],
      ["Notes history", "Carried verbatim"],
    ],
  },
  {
    accent: "amber",
    icon: AlertCircle,
    title: "Every booking",
    body: "Future appointments, recurring bookings, blocked time. The Mangomint calendar = the Limespun calendar at cutover.",
    detail: [
      ["Future appts", "All carried"],
      ["Blocked time", "Preserved"],
      ["Recurring", "Re-scheduled"],
    ],
  },
  {
    accent: "sage",
    icon: DollarSign,
    title: "Every transaction",
    body: "Outstanding deposits, completed payments, refunds. Stripe Connect re-attached. Money state preserved.",
    detail: [
      ["Deposits", "Re-pooled to projects"],
      ["Stripe Connect", "Re-attached"],
      ["Refund history", "Carried"],
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
          headline="Salon software is built for haircuts. Tattoo deserves better."
          italicWord="tattoo"
          subhead="Mangomint is the best salon SaaS. We respect them. But a sleeve isn't a haircut. A deposit pool isn't a tip jar. An allergy isn't a hair-colour preference. 6-day migration. White-glove."
          primaryCTA={{ label: "Talk to migrations", href: "/book-a-demo" }}
          secondaryCTA={{ label: "Get started", href: "https://app.limespun.com/signup" }}
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
                Tattoo-native, from the first commit.
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
                title="Multi-session projects, native"
                body="Mangomint treats every booking as a transaction. Limespun groups them: a sleeve is one project, four sessions, one deposit pool. The whole work, in one place."
                detail={[
                  ["Mangomint", "Per-booking"],
                  ["Limespun", "Per-project"],
                  ["Built for", "Tattoo workflow"],
                ]}
              />
              <MoatCardBright
                accent="amber"
                icon={AlertCircle}
                title="Allergy intelligence, surfaces"
                body="Mangomint stores notes. Limespun surfaces the red ink allergy on Today, on the schedule card, in the artist's brief — three places, one source."
                detail={[
                  ["Mangomint", "Notes field"],
                  ["Limespun", "4-place surface"],
                  ["Risk", "Managed"],
                ]}
              />
              <MoatCardBright
                accent="sage"
                icon={DollarSign}
                title="Deposit pool accounting"
                body="Mangomint deposits attach to bookings. Reschedule and the deposit floats. Limespun pools deposits to projects — they travel with the client, not the slot."
                detail={[
                  ["Mangomint", "Per-booking"],
                  ["Limespun", "Per-project pool"],
                  ["Refund logic", "Re-balances"],
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
                rows={[
                  { feature: "Multi-session projects (sleeves)", values: { mangomint: false, limespun: true } },
                  { feature: "Deposit pool across visits", values: { mangomint: false, limespun: true } },
                  { feature: "Allergy intelligence (4-place surface)", values: { mangomint: "Notes only", limespun: true } },
                  { feature: "Photo timeline (REF → HEALED)", values: { mangomint: "Basic", limespun: true } },
                  { feature: "EU REACH ink registry", values: { mangomint: false, limespun: true } },
                  { feature: "AI design assistant", values: { mangomint: false, limespun: "Pro and up" } },
                  { feature: "Commission auto-splits", values: { mangomint: "Team Pay add-on", limespun: "Studio and up" } },
                  { feature: "Guest artist residency band", values: { mangomint: false, limespun: "Pro and up" } },
                  { feature: "Tattoo-specific by design", values: { mangomint: false, limespun: true } },
                  { feature: "Per-booking transaction fee", values: { mangomint: "No", limespun: "No" } },
                  { feature: "White-glove migration", values: { mangomint: false, limespun: true } },
                ]}
                caption="Mangomint feature set: mangomint.com docs, April 2026. Limespun: shipped product."
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

        {/* ── 6-day plan ────────────────────────────────────────────────── */}
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
              <SectionEyebrow label="6-day plan" accent="rust" />
              <SectionHeading size="sm">How Mangomint studios migrate.</SectionHeading>
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
                  day={step.day}
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
                    a: "Different model. Mangomint has a big support org for a wide audience. We have engineers + a small team for tattoo studios specifically. Email response under 24h on every plan, priority support on Pro and Multi-Location.",
                  },
                  {
                    q: "Will my packages convert to Limespun projects?",
                    a: "Yes. Mangomint packages map to Limespun multi-session projects. Discounts, scheduled sessions, prepaid deposits — all carry.",
                  },
                  {
                    q: "Does Limespun support tip jars?",
                    a: "Yes — though we treat them as a tip line on the invoice rather than a separate jar. Tips route to artists via Stripe Connect.",
                  },
                  {
                    q: "Can I run Limespun alongside Mangomint during migration?",
                    a: `Yes. Standard parallel run for 14 days. Limespun has a ${MONEY_BACK_DAYS}-day money-back guarantee.`,
                  },
                  {
                    q: "What if my staff is used to Mangomint's UI?",
                    a: "The core screens are built to be learnable in a day or two. We do a remote training session on day 5 of migration. Includes recording for new hires.",
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
          subhead={`6-day migration. Free. ${MONEY_BACK_DAYS}-day money-back guarantee.`}
          primaryCTA={{ label: "Talk to migrations", href: "/book-a-demo" }}
          secondaryCTA={{ label: "Or get started", href: "https://app.limespun.com/signup", icon: "play" }}
        />
      </main>
      <Footer />
    </div>
  );
}
