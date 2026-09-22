"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Calendar, FileText, Check, ArrowRight } from "lucide-react";
import { BRAND, FONT, SHADOW, GRADIENT, fadeUp } from "@/lib/brand";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/shared/hero-section";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { CTASection } from "@/components/shared/cta-section";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { PLANS, formatPrice, MONEY_BACK_DAYS } from "@/lib/data/plans";

const [STUDIO] = PLANS.filter((p) => p.tier === "studio");
const [PRO] = PLANS.filter((p) => p.tier === "pro");
const STUDIO_PRICE = formatPrice(STUDIO.monthlyCents);

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
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: a.color } as React.CSSProperties} />
      <div aria-hidden="true" style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, background: `radial-gradient(circle at 100% 0%, ${a.bg} 0%, transparent 70%)`, pointerEvents: "none" } as React.CSSProperties} />
      <div style={{ position: "relative" } as React.CSSProperties}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: a.glow, border: `1px solid ${a.color}25`, display: "flex", alignItems: "center", justifyContent: "center" } as React.CSSProperties}>
          <Icon size={20} color={a.color} strokeWidth={2} />
        </div>
      </div>
      <div style={{ position: "relative" } as React.CSSProperties}>
        <h3 style={{ fontFamily: FONT.sans, fontSize: 19, fontWeight: 600, color: BRAND.onyx, letterSpacing: "-0.015em", marginBottom: 10, lineHeight: 1.25 } as React.CSSProperties}>
          {title}
        </h3>
        <p style={{ fontFamily: FONT.sans, fontSize: 14, fontWeight: 400, lineHeight: 1.6, color: BRAND.stoneDark } as React.CSSProperties}>
          {body}
        </p>
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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 48 } as React.CSSProperties}
        >
          <SectionEyebrow label="What you're tired of" accent="rust" />
          <h2 style={{ fontFamily: FONT.serif, fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, color: BRAND.onyx, letterSpacing: "-0.025em", lineHeight: 1.1, maxWidth: 600 } as React.CSSProperties}>
            Three hours of admin every Friday.
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 } as React.CSSProperties} className="v4-moat-grid">
          <MoatCardBright
            accent="rust"
            icon={Users}
            title="Commission math by hand"
            body="60/40 for resident, 70/30 for the guest, custom for the apprentice. Friday afternoon spreadsheet. Errors get caught months later."
            detail={[["Friday admin", "2–3 hr"], ["Errors", "monthly"], ["Disputes", "occasional"]]}
          />
          <MoatCardBright
            accent="amber"
            icon={Calendar}
            title="Four artists, four calendars"
            body="Everyone books from their own phone. Two clients land in the same chair at 2pm, and you find out when both walk in."
            detail={[["Calendars", "one per artist"], ["Clash checks", "none"], ["Found out", "at the door"]]}
          />
          <MoatCardBright
            accent="sage"
            icon={FileText}
            title="Consent on paper"
            body="Every appointment. Every client. Stack of paper that no one wants to file. Audit trail = filing cabinet."
            detail={[["Forms", "paper"], ["Storage", "filing cabinet"], ["Compliance risk", "real"]]}
          />
        </div>
      </div>
    </section>
  );
}

// ── Why Limespun ─────────────────────────────────────────────────────────────────

const studioFeatures = [
  "Up to 5 artists — residents, booth renters, apprentices",
  "Commission and booth-rent splits — route on Stripe at booking time",
  "One calendar for every artist — clash checks before anything double-books",
  "Kiosk consent — iPad in the studio, signed before the chair",
  "Unlimited bookings and 500 texts a month",
  "Free white-glove migration — included on every plan",
  "Email support — 24h response",
];

function WhyLimespunSection() {
  return (
    <section style={{ background: BRAND.bone, paddingTop: 100, paddingBottom: 100 } as React.CSSProperties}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" } as React.CSSProperties}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 48 } as React.CSSProperties}
        >
          <SectionEyebrow label="What changes" accent="amber" />
          <h2 style={{ fontFamily: FONT.serif, fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, color: BRAND.onyx, letterSpacing: "-0.025em", lineHeight: 1.1 } as React.CSSProperties}>
            Studio plan, full team kit.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ background: BRAND.white, borderRadius: 20, padding: 32, boxShadow: SHADOW.soft, maxWidth: 720 } as React.CSSProperties}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0 } as React.CSSProperties}>
            {studioFeatures.map((feature, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, paddingTop: i === 0 ? 0 : 14, paddingBottom: i === studioFeatures.length - 1 ? 0 : 14, borderBottom: i < studioFeatures.length - 1 ? `1px solid ${BRAND.borderSoft}` : "none" } as React.CSSProperties}>
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

// ── Early-days note ────────────────────────────────────────────────────────────

function CustomerQuoteSection() {
  return (
    <section style={{ background: BRAND.bone, paddingTop: 80, paddingBottom: 80 } as React.CSSProperties}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" } as React.CSSProperties}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 32 } as React.CSSProperties}
        >
          <SectionEyebrow label="Early days" accent="amber" />
          <h2 style={{ fontFamily: FONT.serif, fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400, color: BRAND.onyx, letterSpacing: "-0.025em", lineHeight: 1.1 } as React.CSSProperties}>
            Small studios are who we&apos;re building with.
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
              The stories will come from real studios. We&apos;re not there yet.
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
              Limespun is new, and open to every studio. Two to five chairs, a booth renter or two, an apprentice learning the ropes &mdash; if that&apos;s you, book a walkthrough and we&apos;ll show you commission splits live.
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
          <SectionEyebrow label="Studio plan" accent="amber" />
          <h2 style={{ fontFamily: FONT.serif, fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, color: BRAND.onyx, letterSpacing: "-0.025em", lineHeight: 1.05, marginBottom: 16 } as React.CSSProperties}>
            {STUDIO_PRICE} / month
          </h2>
          <p style={{ fontSize: 17, fontFamily: FONT.sans, color: BRAND.stoneDark, marginBottom: 32, lineHeight: 1.6 } as React.CSSProperties}>
            Up to 5 artists. Unlimited bookings. Free migration. {MONEY_BACK_DAYS}-day money-back guarantee.
          </p>
          <a href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 100, background: BRAND.onyx, color: BRAND.bone, textDecoration: "none", fontFamily: FONT.sans, fontSize: 14, fontWeight: 600 } as React.CSSProperties}>
            See Studio plan details <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "Can I host guest artists on Studio?",
    a: `Guest-artist seats start on Pro (${formatPrice(PRO.monthlyCents)}/mo). There, each guest gets a time-boxed band on the calendar with their own colour and a public booking page (portfolio.limespun.com/[handle]) for the residency window. Auto-archives when their tour ends.`,
  },
  {
    q: "Can artists get paid directly through Stripe Connect?",
    a: "Yes. Each artist links their own Stripe account once. Splits route automatically on every invoice.",
  },
  {
    q: "What if I have 6 artists?",
    a: `Move to Pro (${formatPrice(PRO.monthlyCents)}/mo): up to 15 artists, unlimited guest-artist seats, payroll and 1099s, and AI replies and aftercare. EU REACH ink tracking is already on every plan, Studio included.`,
  },
  {
    q: "Do you support apprentices that don't take a commission cut?",
    a: "Yes. Set their split to 0% and the studio retains the full revenue. Or any custom split.",
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

export default function SmallStudiosPage() {
  return (
    <div style={{ minHeight: "100vh", background: BRAND.bone, overflow: "hidden" } as React.CSSProperties}>
      <Nav />
      <main>
        <HeroSection
          eyebrow="For small studios"
          eyebrowAccent="amber"
          headline="2-5 chairs. Mixed roster. One quiet system."
          italicWord="quiet"
          subhead="Resident artists, a booth renter, the new apprentice. Commission and booth-rent splits route on the invoice. Every artist on one calendar, with clash checks. The small shop, finally not held together by group chat."
          primaryCTA={{ label: "Choose Studio", href: "https://app.limespun.com/signup" }}
          secondaryCTA={{ label: "See pricing", href: "/pricing" }}
        />
        <PainPointsSection />
        <WhyLimespunSection />
        <CustomerQuoteSection />
        <PricingTeaserSection />
        <FAQSection />
        <CTASection
          badge="Small studio, big rails"
          headline="Get the team running."
          italicWord="running"
          subhead={`${MONEY_BACK_DAYS}-day money-back guarantee. White-glove migration included. Up to 5 artists, ${STUDIO_PRICE}/mo.`}
          primaryCTA={{ label: "Choose Studio", href: "https://app.limespun.com/signup" }}
          secondaryCTA={{ label: "Book a walkthrough", href: "/book-a-demo", icon: "play" }}
        />
      </main>
      <Footer />
    </div>
  );
}
