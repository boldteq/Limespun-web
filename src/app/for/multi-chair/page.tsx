"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Sparkles, Shield, Check, ArrowRight } from "lucide-react";
import { BRAND, FONT, SHADOW, GRADIENT, fadeUp } from "@/lib/brand";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/shared/hero-section";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { CTASection } from "@/components/shared/cta-section";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import {
  PLANS,
  formatPrice,
  ANNUAL_DISCOUNT_PERCENT,
  FOUNDING_OFFER_OPEN,
  FOUNDING_OFFER_SIZE,
  MONEY_BACK_DAYS,
  ONBOARDING_SUPPORT_DAYS,
} from "@/lib/data/plans";

const [PRO] = PLANS.filter((p) => p.tier === "pro");
const PRO_PRICE = formatPrice(PRO.monthlyCents);

// ── MoatCardBright ────────────────────────────────────────────────────────────

interface MoatCardBrightProps {
  accent: "rust" | "amber" | "sage";
  icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  title: string;
  body: string;
  detail: [string, string][];
}

const accentMap = {
  rust:  { color: BRAND.rust,  bg: BRAND.rustWash,  glow: GRADIENT.cardRust  },
  amber: { color: BRAND.amber, bg: BRAND.amberWash, glow: GRADIENT.cardAmber },
  sage:  { color: BRAND.sage,  bg: BRAND.sageWash,  glow: GRADIENT.cardSage  },
} as const;

function MoatCardBright({ accent, icon: Icon, title, body, detail }: MoatCardBrightProps) {
  const a = accentMap[accent];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, boxShadow: SHADOW.card }}
      style={{ background: BRAND.white, borderRadius: 18, padding: 28, boxShadow: SHADOW.soft, display: "flex", flexDirection: "column", gap: 18, position: "relative", overflow: "hidden", transition: "transform 0.25s, box-shadow 0.25s" } as React.CSSProperties}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: a.color } as React.CSSProperties} />
      <div aria-hidden="true" style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, background: `radial-gradient(circle at 100% 0%, ${a.bg} 0%, transparent 70%)`, pointerEvents: "none" } as React.CSSProperties} />
      <div style={{ position: "relative" } as React.CSSProperties}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: a.glow, border: `1px solid ${a.color}25`, display: "flex", alignItems: "center", justifyContent: "center" } as React.CSSProperties}>
          <Icon size={20} color={a.color} strokeWidth={2} />
        </div>
      </div>
      <div style={{ position: "relative" } as React.CSSProperties}>
        <h3 style={{ fontFamily: FONT.sans, fontSize: 19, fontWeight: 600, color: BRAND.onyx, letterSpacing: "-0.015em", marginBottom: 10, lineHeight: 1.25 } as React.CSSProperties}>{title}</h3>
        <p style={{ fontFamily: FONT.sans, fontSize: 14, fontWeight: 400, lineHeight: 1.6, color: BRAND.stoneDark } as React.CSSProperties}>{body}</p>
      </div>
      <div style={{ background: a.bg, borderRadius: 12, padding: "4px 16px", marginTop: "auto", position: "relative" } as React.CSSProperties}>
        {detail.map((row, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "10px 0", borderBottom: i < detail.length - 1 ? `1px dashed ${a.color}25` : "none", gap: 12 } as React.CSSProperties}>
            <span style={{ fontFamily: FONT.sans, fontSize: 11.5, fontWeight: 500, color: BRAND.stoneDark } as React.CSSProperties}>{row[0]}</span>
            <span style={{ fontFamily: FONT.sans, fontSize: 12, fontWeight: 600, color: BRAND.onyx, textAlign: "right" } as React.CSSProperties}>{row[1]}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Pain Points ───────────────────────────────────────────────────────────────

function PainPointsSection() {
  return (
    <section style={{ background: GRADIENT.sectionWarm, paddingTop: 100, paddingBottom: 100, position: "relative", overflow: "hidden" } as React.CSSProperties}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" } as React.CSSProperties}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} style={{ marginBottom: 48 } as React.CSSProperties}>
          <SectionEyebrow label="What you're tired of" accent="rust" />
          <h2 style={{ fontFamily: FONT.serif, fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, color: BRAND.onyx, letterSpacing: "-0.025em", lineHeight: 1.1, maxWidth: 600 } as React.CSSProperties}>
            Running a real business on gut-feel.
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 } as React.CSSProperties} className="v4-moat-grid">
          <MoatCardBright
            accent="rust"
            icon={BarChart3}
            title="P&L math by spreadsheet"
            body="Per-artist, per-chair, per-month. Margin reports cobbled together at quarter-end. The shop's actual health: unclear."
            detail={[["Reporting cycle", "quarterly"], ["Margin per artist", "opaque"], ["Decisions", "gut-feel"]]}
          />
          <MoatCardBright
            accent="amber"
            icon={Sparkles}
            title="AI tools that generate, never prep"
            body="Mid-journey for inspiration. ChatGPT for client briefs. Five tabs and zero connection to your booking pipeline."
            detail={[["Tools used", "4+"], ["Connection to bookings", "0"], ["Brand consistency", "low"]]}
          />
          <MoatCardBright
            accent="sage"
            icon={Shield}
            title="REACH compliance: spreadsheet"
            body="EU 2022 ink registry mandates batch tracking, MSDS attachments, reaction logging. For plenty of studios: a Numbers file."
            detail={[["Compliance method", "manual"], ["Inspector readiness", "low"], ["Reaction logs", "scattered"]]}
          />
        </div>
      </div>
    </section>
  );
}

// ── Why Limespun ─────────────────────────────────────────────────────────────────

const proFeatures = [
  "Up to 15 artists, plus unlimited guest-artist seats",
  "AI replies, aftercare and consult summaries — in your studio's voice",
  "Public guest booking pages — one URL per residency",
  "Payroll and 1099s — every artist's split, ready at year-end",
  "Roles and permissions — owner, artist, front desk",
  "Per-artist + per-chair P&L — monthly auto-reports",
  "EU REACH 2022 ink registry — on every plan, Pro included",
  "Priority support",
  "Up to 5 locations, with reports across them (when you grow)",
];

function WhyLimespunSection() {
  return (
    <section style={{ background: BRAND.bone, paddingTop: 100, paddingBottom: 100 } as React.CSSProperties}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" } as React.CSSProperties}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} style={{ marginBottom: 48 } as React.CSSProperties}>
          <SectionEyebrow label="What changes" accent="rust" />
          <h2 style={{ fontFamily: FONT.serif, fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, color: BRAND.onyx, letterSpacing: "-0.025em", lineHeight: 1.1 } as React.CSSProperties}>
            Pro plan, full shop kit.
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ background: BRAND.white, borderRadius: 20, padding: 32, boxShadow: SHADOW.soft, maxWidth: 720 } as React.CSSProperties}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 } as React.CSSProperties}>
            {proFeatures.map((feature, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, paddingTop: i === 0 ? 0 : 14, paddingBottom: i === proFeatures.length - 1 ? 0 : 14, borderBottom: i < proFeatures.length - 1 ? `1px solid ${BRAND.borderSoft}` : "none" } as React.CSSProperties}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: BRAND.rustWash, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 } as React.CSSProperties}>
                  <Check size={13} color={BRAND.rust} strokeWidth={2.5} />
                </div>
                <span style={{ fontFamily: FONT.sans, fontSize: 15, fontWeight: 400, color: BRAND.ink, lineHeight: 1.55 } as React.CSSProperties}>{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

// ── Early-days note ────────────────────────────────────────────────────────────

function CustomerQuoteSection() {
  return (
    <section style={{ background: BRAND.bone, paddingTop: 80, paddingBottom: 80 } as React.CSSProperties}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" } as React.CSSProperties}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} style={{ marginBottom: 32 } as React.CSSProperties}>
          <SectionEyebrow label="Early days" accent="rust" />
          <h2 style={{ fontFamily: FONT.serif, fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400, color: BRAND.onyx, letterSpacing: "-0.025em", lineHeight: 1.1 } as React.CSSProperties}>
            Your shop could be the first story here.
          </h2>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ maxWidth: 560 } as React.CSSProperties}>
          <div
            style={{
              background: BRAND.white,
              borderRadius: 18,
              padding: 32,
              boxShadow: SHADOW.soft,
              border: `1px solid ${BRAND.borderSoft}`,
            } as React.CSSProperties}
          >
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
              We won&apos;t publish a testimonial we haven&apos;t earned.
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
              Limespun is new, and open to every shop. You get {ONBOARDING_SUPPORT_DAYS} days of onboarding help from the founding team, a hand-held move off your current tool, and a {MONEY_BACK_DAYS}-day money-back guarantee.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Pricing Teaser ────────────────────────────────────────────────────────────

function PricingTeaserSection() {
  return (
    <section style={{ background: GRADIENT.sectionCool, paddingTop: 80, paddingBottom: 80 } as React.CSSProperties}>
      <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto", padding: "0 32px" } as React.CSSProperties}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <SectionEyebrow label="Pro plan" accent="rust" />
          <h2 style={{ fontFamily: FONT.serif, fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, color: BRAND.onyx, letterSpacing: "-0.025em", lineHeight: 1.05, marginBottom: 16 } as React.CSSProperties}>
            {PRO_PRICE} / month
          </h2>
          <p style={{ fontSize: 17, fontFamily: FONT.sans, color: BRAND.stoneDark, marginBottom: 32, lineHeight: 1.6 } as React.CSSProperties}>
            Up to 15 artists and 5 locations. Unlimited guest seats. AI replies and aftercare. Priority support.
          </p>
          <a href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 100, background: BRAND.onyx, color: BRAND.bone, textDecoration: "none", fontFamily: FONT.sans, fontSize: 14, fontWeight: 600 } as React.CSSProperties}>
            See Pro plan details <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "Can I split commissions across more than two parties (e.g., studio + artist + apprentice)?",
    a: "Yes. Three-way and four-way splits supported. Routing rules per-artist, per-piece, or per-time-period.",
  },
  {
    q: "Does the AI sound like my studio?",
    a: "Yes. Pro includes AI voice profiles, so replies, aftercare notes and consult summaries go out in your studio's tone, not a generic one.",
  },
  {
    q: "What does priority support mean on Pro?",
    a: "Pro and Multi-Location tickets are answered first, ahead of the email support queue on Solo and Studio.",
  },
  {
    q: "Is there a cheaper way to pay for Pro?",
    a: `Pay yearly and save ${ANNUAL_DISCOUNT_PERCENT}%: ${formatPrice(PRO.annualCents)} a year instead of ${PRO_PRICE} a month.${
      FOUNDING_OFFER_OPEN
        ? ` The founding offer for the first ${FOUNDING_OFFER_SIZE} studios is also open: Pro for ${formatPrice(PRO.lifetimeCents)} once, no monthly bill.`
        : ""
    }`,
  },
];

function FAQSection() {
  return (
    <section style={{ background: BRAND.bone, paddingTop: 80, paddingBottom: 80 } as React.CSSProperties}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" } as React.CSSProperties}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} style={{ marginBottom: 40 } as React.CSSProperties}>
          <SectionEyebrow label="Questions" accent="rust" />
          <h2 style={{ fontFamily: FONT.serif, fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400, color: BRAND.onyx, letterSpacing: "-0.025em", lineHeight: 1.1 } as React.CSSProperties}>
            Common questions.
          </h2>
        </motion.div>
        <FAQAccordion items={faqs} accent="rust" />
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function MultiChairPage() {
  return (
    <div style={{ minHeight: "100vh", background: BRAND.bone, overflow: "hidden" } as React.CSSProperties}>
      <Nav />
      <main>
        <HeroSection
          eyebrow="For multi-chair shops"
          eyebrowAccent="rust"
          headline="The shop with a brand. The shop that scales."
          italicWord="scales"
          subhead="Six artists. Eight chairs. Two floors. Walk-in clinic Tuesdays. AI replies and consult summaries on every booking. Unlimited guest-artist seats. Payroll and 1099s. Priority support. The Pro plan."
          primaryCTA={{ label: "Choose Pro", href: "https://app.limespun.com/signup" }}
          secondaryCTA={{ label: "See pricing", href: "/pricing" }}
        />
        <PainPointsSection />
        <WhyLimespunSection />
        <CustomerQuoteSection />
        <PricingTeaserSection />
        <FAQSection />
        <CTASection
          badge="The shop that scales"
          headline="Run the shop on Pro."
          italicWord="Pro"
          subhead={`Up to 15 artists, unlimited guest seats, AI replies and aftercare. ${MONEY_BACK_DAYS}-day money-back guarantee and ${ONBOARDING_SUPPORT_DAYS} days of founder-priority onboarding.`}
          primaryCTA={{ label: "Choose Pro", href: "https://app.limespun.com/signup" }}
          secondaryCTA={{ label: "Book a walkthrough", href: "/book-a-demo", icon: "play" }}
        />
      </main>
      <Footer />
    </div>
  );
}
