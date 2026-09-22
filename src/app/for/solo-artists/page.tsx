"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, DollarSign, ImageIcon, Check, ArrowRight } from "lucide-react";
import { BRAND, FONT, SHADOW, GRADIENT, fadeUp } from "@/lib/brand";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/shared/hero-section";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { CTASection } from "@/components/shared/cta-section";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { PLANS, formatPrice, MONEY_BACK_DAYS, ONBOARDING_SUPPORT_DAYS } from "@/lib/data/plans";

const [SOLO] = PLANS.filter((p) => p.tier === "solo");
const [STUDIO] = PLANS.filter((p) => p.tier === "studio");
const [PRO] = PLANS.filter((p) => p.tier === "pro");
const SOLO_PRICE = formatPrice(SOLO.monthlyCents);

// ── MoatCardBright (lifted from home/work.tsx) ────────────────────────────────

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
              borderBottom: i < detail.length - 1 ? `1px dashed ${a.color}25` : "none",
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

// ── Pain Points ───────────────────────────────────────────────────────────────

function PainPointsSection() {
  return (
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
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0 32px",
        } as React.CSSProperties}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 48 } as React.CSSProperties}
        >
          <SectionEyebrow label="What you're tired of" accent="amber" />
          <h2
            style={{
              fontFamily: FONT.serif,
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 400,
              color: BRAND.onyx,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              maxWidth: 600,
            } as React.CSSProperties}
          >
            Sound familiar?
          </h2>
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
            icon={AlertCircle}
            title="Six apps before 10:30"
            body="Booking on one site. Deposits in another. Consent on paper. Allergy in your Notes. The work hasn't started."
            detail={[
              ["Apps usually", "5–7"],
              ["Time lost", "~40 min"],
              ["Mental load", "high"],
            ]}
          />
          <MoatCardBright
            accent="amber"
            icon={DollarSign}
            title="Deposit tracking by memory"
            body="Asha paid $200 last month, but for which session? Cash app vs Stripe. The spreadsheet you keep meaning to update."
            detail={[
              ["Spreadsheet status", "outdated"],
              ["Errors", "occasional"],
              ["Friday admin", "90 min"],
            ]}
          />
          <MoatCardBright
            accent="sage"
            icon={ImageIcon}
            title="Photos in your camera roll"
            body="REF, fresh, healed — all mixed in with your selfies and lunch photos. Finding 'the back piece from May' takes 8 minutes."
            detail={[
              ["Storage", "phone roll"],
              ["Searchability", "zero"],
              ["Backup", "hopefully"],
            ]}
          />
        </div>
      </div>
    </section>
  );
}

// ── Why Limespun ─────────────────────────────────────────────────────────────────

const soloFeatures = [
  "Today launchpad — see your day in 90 seconds",
  "Multi-session projects — sleeves tracked end to end",
  "Deposit pool — money lives on the project, not your spreadsheet",
  "Photo timeline — REF / FRESH / HEAL / HEALED, auto-organised",
  "Allergy intelligence — surfaced before the chair",
  "Stripe Connect — payouts in <2 days",
  "Email support — humans who answer in <24h",
];

function WhyLimespunSection() {
  return (
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
        } as React.CSSProperties}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 48 } as React.CSSProperties}
        >
          <SectionEyebrow label="What changes" accent="sage" />
          <h2
            style={{
              fontFamily: FONT.serif,
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 400,
              color: BRAND.onyx,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            } as React.CSSProperties}
          >
            Solo plan, full kit.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            background: BRAND.white,
            borderRadius: 20,
            padding: 32,
            boxShadow: SHADOW.soft,
            maxWidth: 720,
          } as React.CSSProperties}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0 } as React.CSSProperties}>
            {soloFeatures.map((feature, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  paddingTop: i === 0 ? 0 : 14,
                  paddingBottom: i === soloFeatures.length - 1 ? 0 : 14,
                  borderBottom:
                    i < soloFeatures.length - 1
                      ? `1px solid ${BRAND.borderSoft}`
                      : "none",
                } as React.CSSProperties}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: BRAND.sageWash,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 1,
                  } as React.CSSProperties}
                >
                  <Check size={13} color={BRAND.sage} strokeWidth={2.5} />
                </div>
                <span
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 15,
                    fontWeight: 400,
                    color: BRAND.ink,
                    lineHeight: 1.55,
                  } as React.CSSProperties}
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>
          <p
            style={{
              fontFamily: FONT.sans,
              fontSize: 13,
              color: BRAND.stoneDark,
              marginTop: 24,
              lineHeight: 1.5,
              borderTop: `1px solid ${BRAND.borderSoft}`,
              paddingTop: 20,
            } as React.CSSProperties}
          >
            Everything in this list comes with the {SOLO_PRICE} Solo plan: one artist, 100 bookings and 75 texts a
            month. No add-ons, no platform fees.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ── Early-days note ────────────────────────────────────────────────────────────

function CustomerQuoteSection() {
  return (
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
        } as React.CSSProperties}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 32 } as React.CSSProperties}
        >
          <SectionEyebrow label="Early days" accent="rust" />
          <h2
            style={{
              fontFamily: FONT.serif,
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 400,
              color: BRAND.onyx,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            } as React.CSSProperties}
          >
            Built with solo artists, not about them.
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ maxWidth: 560 } as React.CSSProperties}
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
              No case study yet &mdash; we&apos;d rather wait for a true one.
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
              Limespun is new, and solo artists are shaping it directly. Run a one-chair studio? You get {ONBOARDING_SUPPORT_DAYS} days of onboarding help from the founding team: tell us what slows your week down and it goes on the roadmap.
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
    <section
      style={{
        background: GRADIENT.sectionCool,
        paddingTop: 80,
        paddingBottom: 80,
      } as React.CSSProperties}
    >
      <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto", padding: "0 32px" } as React.CSSProperties}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionEyebrow label="Solo plan" accent="rust" />
          <h2
            style={{
              fontFamily: FONT.serif,
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 400,
              color: BRAND.onyx,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              marginBottom: 16,
            } as React.CSSProperties}
          >
            {SOLO_PRICE} / month
          </h2>
          <p
            style={{
              fontSize: 17,
              fontFamily: FONT.sans,
              color: BRAND.stoneDark,
              marginBottom: 32,
              lineHeight: 1.6,
            } as React.CSSProperties}
          >
            Everything above, plus inventory, EU REACH ink tracking and your own
            booking domain. {MONEY_BACK_DAYS}-day money-back guarantee. Stripe takes its
            standard processing fee on cards. We take nothing on top.
          </p>
          <a
            href="/pricing"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 24px",
              borderRadius: 100,
              background: BRAND.onyx,
              color: BRAND.bone,
              textDecoration: "none",
              fontFamily: FONT.sans,
              fontSize: 14,
              fontWeight: 600,
            } as React.CSSProperties}
          >
            See Solo plan details <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "Will I outgrow Solo?",
    a: `When you add a second artist or pass 100 bookings a month, you move to Studio (${formatPrice(STUDIO.monthlyCents)}/mo). One click, no migration. Until then, Solo has the full one-chair kit; Studio adds one calendar for every artist and commission and booth-rent splits.`,
  },
  {
    q: "Is Stripe Connect required?",
    a: "Yes. It's how payouts work. Setup takes 5 minutes. Standard Stripe rates apply (2.9% + 30¢ in US). Limespun adds nothing.",
  },
  {
    q: "Can I take cash payments?",
    a: "Yes. Logged manually. Reconciles against the day's bookings. Tax forms include cash totals.",
  },
  {
    q: "Does Solo include AI?",
    a: `AI replies, aftercare and consult summaries start on Pro (${formatPrice(PRO.monthlyCents)}/mo). Solo includes the rest of the kit — bookings, deposits, projects, payments, inventory, forms, photo timeline and EU REACH ink tracking.`,
  },
];

function FAQSection() {
  return (
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
        } as React.CSSProperties}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 40 } as React.CSSProperties}
        >
          <SectionEyebrow label="Questions" accent="rust" />
          <h2
            style={{
              fontFamily: FONT.serif,
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 400,
              color: BRAND.onyx,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            } as React.CSSProperties}
          >
            Common questions.
          </h2>
        </motion.div>
        <FAQAccordion items={faqs} accent="rust" />
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SoloArtistsPage() {
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
        <HeroSection
          eyebrow="For solo artists"
          eyebrowAccent="rust"
          headline="One chair. One artist. No overhead."
          italicWord="One"
          subhead={`You don't need a 'platform.' You need bookings that don't no-show, deposits that don't get lost, and a Today screen that takes 90 seconds. ${SOLO_PRICE}/mo. Done.`}
          primaryCTA={{ label: "Choose Solo", href: "https://app.limespun.com/signup" }}
          secondaryCTA={{ label: "See pricing", href: "/pricing" }}
        />
        <PainPointsSection />
        <WhyLimespunSection />
        <CustomerQuoteSection />
        <PricingTeaserSection />
        <FAQSection />
        <CTASection
          badge="One chair, full kit"
          headline="Start with Solo."
          italicWord="Solo"
          subhead={`${MONEY_BACK_DAYS}-day money-back guarantee. Our team moves your clients, bookings and deposits over for free.`}
          primaryCTA={{ label: "Choose Solo", href: "https://app.limespun.com/signup" }}
          secondaryCTA={{ label: "Talk to a real human", href: "/book-a-demo", icon: "play" }}
        />
      </main>
      <Footer />
    </div>
  );
}
