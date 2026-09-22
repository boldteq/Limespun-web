"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Users, Shield, Check, ArrowRight } from "lucide-react";
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
  MONEY_BACK_DAYS,
  ONBOARDING_SUPPORT_DAYS,
} from "@/lib/data/plans";

const [PRO] = PLANS.filter((p) => p.tier === "pro");
const [MULTI] = PLANS.filter((p) => p.tier === "enterprise");
const MULTI_PRICE = formatPrice(MULTI.monthlyCents);

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
            Three locations, three versions of the truth.
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 } as React.CSSProperties} className="v4-moat-grid">
          <MoatCardBright
            accent="rust"
            icon={Globe}
            title="Three reports, three logins, three formats"
            body="Each location runs its own version of admin. Comparing performance is a manual data merge."
            detail={[["Comparison cycle", "monthly"], ["Format", "inconsistent"], ["Source-of-truth", "nowhere"]]}
          />
          <MoatCardBright
            accent="amber"
            icon={Users}
            title="Onboarding artists across locations"
            body="New hire at Brooklyn shop has to be added separately at Manhattan. No shared roster. Permission management: by hand."
            detail={[["Onboarding time", "hours"], ["Shared roster", "no"], ["Permission audit", "never"]]}
          />
          <MoatCardBright
            accent="sage"
            icon={Shield}
            title="Audit logs that don't span locations"
            body="Compliance audit asks 'who deleted that consent form?' Answer: depends on which location's audit log you check."
            detail={[["Cross-location audit", "no"], ["One answer", "never"], ["Investigation time", "high"]]}
          />
        </div>
      </div>
    </section>
  );
}

// ── Why Limespun Multi-Location ──────────────────────────────────────────────────

const multiLocationFeatures = [
  "Unlimited artists and locations — one flat price, not per shop",
  "Reports across locations — every shop, one view",
  "Roles and permissions across every location",
  "Cross-location audit log — every action, one stream",
  "API access with webhooks",
  "5,000 texts a month",
  "Dedicated migration team — one location first, then the rest",
  "Dedicated account manager — direct line, not a ticket queue",
];

function WhyLimespunSection() {
  return (
    <section style={{ background: BRAND.bone, paddingTop: 100, paddingBottom: 100 } as React.CSSProperties}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" } as React.CSSProperties}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} style={{ marginBottom: 48 } as React.CSSProperties}>
          <SectionEyebrow label="What changes" accent="amber" />
          <h2 style={{ fontFamily: FONT.serif, fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, color: BRAND.onyx, letterSpacing: "-0.025em", lineHeight: 1.1 } as React.CSSProperties}>
            Multi-Location plan, chain infrastructure.
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ background: BRAND.white, borderRadius: 20, padding: 32, boxShadow: SHADOW.soft, maxWidth: 720 } as React.CSSProperties}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 } as React.CSSProperties}>
            {multiLocationFeatures.map((feature, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, paddingTop: i === 0 ? 0 : 14, paddingBottom: i === multiLocationFeatures.length - 1 ? 0 : 14, borderBottom: i < multiLocationFeatures.length - 1 ? `1px solid ${BRAND.borderSoft}` : "none" } as React.CSSProperties}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: BRAND.amberWash, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 } as React.CSSProperties}>
                  <Check size={13} color={BRAND.amber} strokeWidth={2.5} />
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

// ── Pilot note ─────────────────────────────────────────────────────────────────

function CustomerQuoteSection() {
  return (
    <section style={{ background: BRAND.bone, paddingTop: 80, paddingBottom: 80 } as React.CSSProperties}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" } as React.CSSProperties}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} style={{ marginBottom: 32 } as React.CSSProperties}>
          <SectionEyebrow label="Pilot programme" accent="amber" />
          <h2 style={{ fontFamily: FONT.serif, fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400, color: BRAND.onyx, letterSpacing: "-0.025em", lineHeight: 1.1 } as React.CSSProperties}>
            Groups get a pilot, not a pitch.
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
              No invented case studies &mdash; just a {MONEY_BACK_DAYS}-day money-back guarantee.
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
              Limespun is new. For groups, that means starting at one location with our migration lead, proving it on your own numbers, and rolling out the rest only if it earns it.
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
          <SectionEyebrow label="Multi-Location plan" accent="amber" />
          <h2 style={{ fontFamily: FONT.serif, fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, color: BRAND.onyx, letterSpacing: "-0.025em", lineHeight: 1.05, marginBottom: 16 } as React.CSSProperties}>
            {MULTI_PRICE} / month, flat
          </h2>
          <p style={{ fontSize: 17, fontFamily: FONT.sans, color: BRAND.stoneDark, marginBottom: 32, lineHeight: 1.6 } as React.CSSProperties}>
            One price for the whole group, not per location. Unlimited artists and locations.
          </p>
          <a href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 100, background: BRAND.onyx, color: BRAND.bone, textDecoration: "none", fontFamily: FONT.sans, fontSize: 14, fontWeight: 600 } as React.CSSProperties}>
            See Multi-Location plan details <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "Is there a minimum number of locations?",
    a: `No. Multi-Location is a flat ${MULTI_PRICE}/mo with unlimited artists and locations. If you run up to 5 locations and 15 artists, Pro (${formatPrice(PRO.monthlyCents)}/mo) already covers you.`,
  },
  {
    q: "Do you offer custom contracts and procurement?",
    a: "Yes. We can sign an NDA and a data processing agreement, and we'll answer your security questionnaire honestly. We don't hold a SOC 2 report yet; our security page lists exactly what we do today.",
  },
  {
    q: "How long does a multi-location migration take?",
    a: "We move one location first, then roll out the rest in sequence. For a 3-location group we plan for roughly 90 days end-to-end.",
  },
  {
    q: "Does the price go up as we add locations?",
    a: `No. Multi-Location is ${MULTI_PRICE}/mo flat, however many shops you run. Pay yearly and save ${ANNUAL_DISCOUNT_PERCENT}%.`,
  },
];

function FAQSection() {
  return (
    <section style={{ background: BRAND.bone, paddingTop: 80, paddingBottom: 80 } as React.CSSProperties}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" } as React.CSSProperties}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} style={{ marginBottom: 40 } as React.CSSProperties}>
          <SectionEyebrow label="Questions" accent="amber" />
          <h2 style={{ fontFamily: FONT.serif, fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400, color: BRAND.onyx, letterSpacing: "-0.025em", lineHeight: 1.1 } as React.CSSProperties}>
            Common questions.
          </h2>
        </motion.div>
        <FAQAccordion items={faqs} accent="amber" />
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function MultiLocationPage() {
  return (
    <div style={{ minHeight: "100vh", background: BRAND.bone, overflow: "hidden" } as React.CSSProperties}>
      <Nav />
      <main>
        <HeroSection
          eyebrow="For chains and franchises"
          eyebrowAccent="amber"
          headline="Three locations. One operating system."
          italicWord="One"
          subhead="Reports across every location in one dashboard. Roles and permissions across the team. Dedicated migration team and a real account manager. The infrastructure for studios that grow into chains."
          primaryCTA={{ label: "Talk to us", href: "/book-a-demo" }}
          secondaryCTA={{ label: "See pricing", href: "/pricing" }}
        />
        <PainPointsSection />
        <WhyLimespunSection />
        <CustomerQuoteSection />
        <PricingTeaserSection />
        <FAQSection />
        <CTASection
          badge="The infrastructure for scale"
          headline="Talk to the team."
          italicWord="team"
          subhead={`Demos run live with our migration lead. One flat ${MULTI_PRICE}/mo, a ${MONEY_BACK_DAYS}-day money-back guarantee, and ${ONBOARDING_SUPPORT_DAYS} days of founder-priority onboarding.`}
          primaryCTA={{ label: "Book a demo", href: "/book-a-demo" }}
          secondaryCTA={{ label: "See pricing", href: "/pricing", icon: "play" }}
        />
      </main>
      <Footer />
    </div>
  );
}
