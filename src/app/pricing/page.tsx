"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/shared/hero-section";
import { ComparisonTable } from "@/components/shared/comparison-table";
import { StatStrip } from "@/components/shared/stat-strip";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { CTASection } from "@/components/shared/cta-section";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { BRAND, FONT, GRADIENT, fadeUp, stagger } from "@/lib/brand";
import { JsonLd } from "@/components/seo/json-ld";

// ─── Tier data ────────────────────────────────────────────────────────────────

interface PricingTierData {
  name: string;
  desc: string;
  price: string;
  period: string;
  cta: string;
  ctaHref: string;
  featured?: boolean;
  featuredLabel?: string;
  lines: string[];
}

const tiers: PricingTierData[] = [
  {
    name: "Solo",
    desc: "For one chair, one artist",
    price: "$29",
    period: "/mo",
    cta: "Start free trial",
    ctaHref: "https://app.limespun.com/signup",
    lines: [
      "Today, Inbox, Calendar, Messages",
      "Unlimited bookings, deposits, consents",
      "Multi-session projects · 1 active artist",
      "Stripe Connect · standard fees",
      "Email support",
    ],
  },
  {
    name: "Studio",
    desc: "For 2–5 chairs, mixed roster",
    price: "$59",
    period: "/mo",
    cta: "Start free trial",
    ctaHref: "https://app.limespun.com/signup",
    featured: true,
    featuredLabel: "Most studios",
    lines: [
      "Everything in Solo, plus:",
      "Up to 5 active artists",
      "Commission auto-splits · payroll-ready",
      "Guest residency band",
      "Free white-glove migration",
      "Chat support · 24h response",
    ],
  },
  {
    name: "Pro",
    desc: "For 6+ chairs and guest-heavy shops",
    price: "$99",
    period: "/mo",
    cta: "Start free trial",
    ctaHref: "https://app.limespun.com/signup",
    lines: [
      "Everything in Studio, plus:",
      "Unlimited active artists",
      "AI design assistant · brief generator",
      "EU REACH inventory module",
      "Public guest booking pages",
      "Priority chat · 4h response",
    ],
  },
  {
    name: "Enterprise",
    desc: "For chains and franchises",
    price: "$199",
    period: "/mo per location",
    cta: "Talk to us",
    ctaHref: "/book-a-demo",
    lines: [
      "Everything in Pro, plus:",
      "Multi-location dashboard",
      "Per-location P&L, payroll, tax",
      "SSO · SCIM · audit log",
      "Dedicated migration team",
      "Dedicated account manager",
    ],
  },
];

// ─── Comparison data ──────────────────────────────────────────────────────────

const competitors = [
  { key: "daysmart", label: "DaySmart" },
  { key: "mangomint", label: "Mangomint" },
  { key: "fresha", label: "Fresha" },
  { key: "tattoogenda", label: "TattooGenda" },
  { key: "limespun", label: "Limespun", highlighted: true },
];

const comparisonRows = [
  {
    feature: "Booking + calendar",
    values: {
      daysmart: true,
      mangomint: true,
      fresha: true,
      tattoogenda: true,
      limespun: true,
    },
  },
  {
    feature: "Digital consent forms",
    values: {
      daysmart: false,
      mangomint: "Pro tier",
      fresha: false,
      tattoogenda: "Bigger plan",
      limespun: true,
    },
  },
  {
    feature: "Online deposits",
    values: {
      daysmart: true,
      mangomint: true,
      fresha: "Extra fee",
      tattoogenda: "Bigger plan",
      limespun: true,
    },
  },
  {
    feature: "Multi-session projects (sleeves)",
    values: {
      daysmart: false,
      mangomint: false,
      fresha: false,
      tattoogenda: false,
      limespun: true,
    },
  },
  {
    feature: "Deposit pool accounting",
    values: {
      daysmart: false,
      mangomint: false,
      fresha: false,
      tattoogenda: false,
      limespun: true,
    },
  },
  {
    feature: "Allergy & medical intelligence",
    values: {
      daysmart: false,
      mangomint: false,
      fresha: false,
      tattoogenda: false,
      limespun: true,
    },
  },
  {
    feature: "Commission auto-splits",
    values: {
      daysmart: false,
      mangomint: "Team Pay",
      fresha: "Team Pay add-on",
      tattoogenda: false,
      limespun: true,
    },
  },
  {
    feature: "Artist payroll / 1099-K",
    values: {
      daysmart: false,
      mangomint: false,
      fresha: false,
      tattoogenda: false,
      limespun: true,
    },
  },
  {
    feature: "Guest artist residencies",
    values: {
      daysmart: false,
      mangomint: false,
      fresha: false,
      tattoogenda: true,
      limespun: true,
    },
  },
  {
    feature: "EU REACH / ink registry",
    values: {
      daysmart: false,
      mangomint: false,
      fresha: false,
      tattoogenda: true,
      limespun: true,
    },
  },
  {
    feature: "Client photo timeline",
    values: {
      daysmart: "Basic",
      mangomint: "Basic",
      fresha: "Basic",
      tattoogenda: "Limited",
      limespun: true,
    },
  },
  {
    feature: "AI design assistant",
    values: {
      daysmart: false,
      mangomint: false,
      fresha: false,
      tattoogenda: false,
      limespun: true,
    },
  },
  {
    feature: "Per-booking transaction fee",
    values: {
      daysmart: false,
      mangomint: false,
      fresha: "Yes",
      tattoogenda: false,
      limespun: false,
    },
  },
  {
    feature: "Free white-glove migration",
    values: {
      daysmart: false,
      mangomint: false,
      fresha: false,
      tattoogenda: false,
      limespun: true,
    },
  },
];

// ─── FAQ data ─────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "Is there really no card required to start?",
    a: "Correct. Sign up, work for 14 days, and only enter card details if you decide to keep going. We don't auto-charge at the end of the trial.",
  },
  {
    q: "What happens if I downgrade mid-cycle?",
    a: "Your current cycle continues at the higher tier until renewal. The new plan kicks in next billing cycle. No proration math needed — and no penalty for switching.",
  },
  {
    q: "Do you charge a transaction fee on bookings or deposits?",
    a: "Never. You pay the monthly software fee. Stripe takes its standard processing fee on cards (2.9% + 30¢ in the US). Limespun takes nothing on top.",
  },
  {
    q: "What about overages — SMS sends, AI design generations?",
    a: "SMS and AI design are metered. Each plan includes a generous monthly allotment. Overages are at-cost, billed monthly. No 'unlimited' games — you only pay for what you use.",
  },
  {
    q: "Can I add team seats mid-month?",
    a: "Yes. Studio plan includes 5 active artists. Pro is unlimited. Add or remove artists any time — billing prorates automatically.",
  },
  {
    q: "Do you support currencies outside USD?",
    a: "Yes. We bill in USD, but Stripe collects from your clients in their local currency. Studios in 47 countries are running on Limespun today.",
  },
  {
    q: "How are taxes handled?",
    a: "Stripe Tax is enabled on every plan. Sales tax / VAT on your subscription is calculated based on your studio address. Your client invoices use your own tax settings.",
  },
  {
    q: "Is there a longer free trial for Enterprise?",
    a: "Yes. Multi-location chains get a 30-day pilot at one location, fully migrated, before you commit to the rest of the rollout.",
  },
];

// ─── Tier card ────────────────────────────────────────────────────────────────

function PricingTierCard({ tier }: { tier: PricingTierData }) {
  return (
    <motion.div
      variants={fadeUp}
      style={{
        position: "relative",
        borderRadius: 18,
        overflow: "visible",
        display: "flex",
        flexDirection: "column",
      } as React.CSSProperties}
    >
      {tier.featured && tier.featuredLabel && (
        <div
          style={{
            position: "absolute",
            top: -10,
            left: "50%",
            transform: "translateX(-50%)",
            padding: "4px 14px",
            borderRadius: 100,
            background: `linear-gradient(135deg, ${BRAND.rust} 0%, ${BRAND.rustBright} 100%)`,
            fontFamily: FONT.sans,
            fontSize: 11,
            fontWeight: 700,
            color: BRAND.bone,
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
            zIndex: 10,
          } as React.CSSProperties}
        >
          {tier.featuredLabel}
        </div>
      )}

      <div
        style={{
          flex: 1,
          background: tier.featured
            ? BRAND.smoke
            : "rgba(247,247,245,0.03)",
          border: tier.featured
            ? `1.5px solid ${BRAND.rustBright}`
            : `1px solid ${BRAND.borderInk}`,
          borderRadius: 18,
          padding: "28px 24px",
          display: "flex",
          flexDirection: "column",
          boxShadow: tier.featured
            ? `0 0 0 1px rgba(200,53,31,0.20), 0 20px 48px -12px rgba(200,53,31,0.30)`
            : "none",
        } as React.CSSProperties}
      >
        <div style={{ marginBottom: 20 } as React.CSSProperties}>
          <div
            style={{
              fontFamily: FONT.sans,
              fontSize: 16,
              fontWeight: 700,
              color: BRAND.bone,
              letterSpacing: "-0.01em",
              marginBottom: 4,
            } as React.CSSProperties}
          >
            {tier.name}
          </div>
          <div
            style={{
              fontFamily: FONT.sans,
              fontSize: 13,
              color: BRAND.stoneLight,
              lineHeight: 1.4,
            } as React.CSSProperties}
          >
            {tier.desc}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 4,
            marginBottom: 24,
          } as React.CSSProperties}
        >
          <span
            style={{
              fontFamily: FONT.sans,
              fontSize: 48,
              fontWeight: 700,
              color: BRAND.bone,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            } as React.CSSProperties}
          >
            {tier.price}
          </span>
          <span
            style={{
              fontFamily: FONT.sans,
              fontSize: 13,
              color: BRAND.stoneLight,
            } as React.CSSProperties}
          >
            {tier.period}
          </span>
        </div>

        <a
          href={tier.ctaHref}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "11px 20px",
            borderRadius: 100,
            background: tier.featured ? BRAND.bone : "transparent",
            color: tier.featured ? BRAND.onyx : BRAND.bone,
            fontFamily: FONT.sans,
            fontSize: 14,
            fontWeight: 600,
            border: tier.featured ? "none" : `1.5px solid ${BRAND.borderInk}`,
            letterSpacing: "-0.005em",
            marginBottom: 24,
            width: "100%",
            textDecoration: "none",
          } as React.CSSProperties}
        >
          {tier.cta}
          <ArrowRight size={14} strokeWidth={2} />
        </a>

        <div
          aria-hidden="true"
          style={{
            height: 1,
            background: BRAND.borderInk,
            marginBottom: 20,
          } as React.CSSProperties}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            flex: 1,
          } as React.CSSProperties}
        >
          {tier.lines.map((line, i) => {
            const isContinuation = line.startsWith("Everything in");
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                } as React.CSSProperties}
              >
                {isContinuation ? (
                  <span
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 12,
                      color: BRAND.bone,
                      flexShrink: 0,
                      marginTop: 1,
                    } as React.CSSProperties}
                  >
                    ↳
                  </span>
                ) : (
                  <Check
                    size={14}
                    color={BRAND.sage}
                    strokeWidth={2.2}
                    style={{ flexShrink: 0, marginTop: 2 } as React.CSSProperties}
                  />
                )}
                <span
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 13,
                    color: isContinuation ? BRAND.bone : BRAND.stoneLight,
                    fontWeight: isContinuation ? 600 : 400,
                    lineHeight: 1.4,
                  } as React.CSSProperties}
                >
                  {line}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section: Pricing tiers ───────────────────────────────────────────────────

function PricingTiersSection() {
  return (
    <section
      id="tiers"
      style={{
        position: "relative",
        background: BRAND.onyx,
        paddingTop: 0,
        paddingBottom: 100,
        overflow: "hidden",
      } as React.CSSProperties}
    >
      {/* Atmosphere blobs */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "10%",
          left: "15%",
          width: 500,
          height: 500,
          background: `radial-gradient(circle, rgba(200,53,31,0.18) 0%, transparent 65%)`,
          filter: "blur(60px)",
          pointerEvents: "none",
        } as React.CSSProperties}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "10%",
          right: "15%",
          width: 500,
          height: 500,
          background: `radial-gradient(circle, rgba(216,149,56,0.14) 0%, transparent 65%)`,
          filter: "blur(60px)",
          pointerEvents: "none",
        } as React.CSSProperties}
      />

      <div
        style={{
          position: "relative",
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        } as React.CSSProperties}
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
            width: "100%",
            marginBottom: 36,
            alignItems: "start",
          } as React.CSSProperties}
          className="v4-pricing-grid"
        >
          {tiers.map((tier) => (
            <PricingTierCard key={tier.name} tier={tier} />
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            fontFamily: FONT.sans,
            fontSize: 13,
            color: BRAND.stoneLight,
            textAlign: "center",
          } as React.CSSProperties}
        >
          14-day trial on every plan. No card required.
        </motion.p>
      </div>
    </section>
  );
}

// ─── Section: Compare ─────────────────────────────────────────────────────────

function CompareSection() {
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
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 24px",
        } as React.CSSProperties}
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 48,
          } as React.CSSProperties}
        >
          <SectionEyebrow label="Head-to-head" accent="rust" />
          <h2
            style={{
              fontFamily: FONT.sans,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 700,
              color: BRAND.onyx,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              textAlign: "center",
              marginBottom: 0,
            } as React.CSSProperties}
          >
            Stack us against{" "}
            <em
              style={{
                fontStyle: "normal",
                color: BRAND.rust,
              } as React.CSSProperties}
            >
              everyone else
            </em>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <ComparisonTable
            competitors={competitors}
            rows={comparisonRows}
            caption="Updated April 2026. Source: public pricing pages + Limespun signup data."
          />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: ROI ─────────────────────────────────────────────────────────────

function ROISection() {
  return (
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
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        } as React.CSSProperties}
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 48,
          } as React.CSSProperties}
        >
          <SectionEyebrow label="The maths" accent="amber" />
          <h2
            style={{
              fontFamily: FONT.sans,
              fontSize: "clamp(26px, 3.2vw, 40px)",
              fontWeight: 700,
              color: BRAND.onyx,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              textAlign: "center",
            } as React.CSSProperties}
          >
            Limespun pays for itself in week one.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: "100%", marginBottom: 48 } as React.CSSProperties}
        >
          <StatStrip
            items={[
              { stat: "12 hr / wk", label: "time recovered, average" },
              { stat: "$2,400 / mo", label: "recovered at $50 / hr studio rate" },
              { stat: "$59 / mo", label: "Limespun Studio plan" },
              { stat: "40×", label: "return in month one" },
            ]}
          />
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            fontFamily: FONT.serif,
            fontSize: 19,
            fontStyle: "italic",
            color: BRAND.stoneDark,
            lineHeight: 1.6,
            maxWidth: 640,
            textAlign: "center",
            margin: "0 auto",
          } as React.CSSProperties}
        >
          &quot;On average, studios moving from a salon-coded SaaS recover the Limespun
          subscription cost 40 times over in their first month — purely from
          time saved on app-switching.&quot;
        </motion.p>
      </div>
    </section>
  );
}

// ─── Section: FAQ ─────────────────────────────────────────────────────────────

function FAQSection() {
  return (
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
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        } as React.CSSProperties}
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 48,
          } as React.CSSProperties}
        >
          <SectionEyebrow label="Common questions" accent="sage" />
          <h2
            style={{
              fontFamily: FONT.sans,
              fontSize: "clamp(26px, 3.2vw, 40px)",
              fontWeight: 700,
              color: BRAND.onyx,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              textAlign: "center",
            } as React.CSSProperties}
          >
            Pricing, plain and direct.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            maxWidth: 920,
            width: "100%",
            margin: "0 auto",
          } as React.CSSProperties}
        >
          <FAQAccordion items={faqs} accent="sage" />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: BRAND.bone,
        overflow: "hidden",
      } as React.CSSProperties}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Limespun — Studio OS for Tattoo",
          description:
            "Tattoo studio software with multi-session projects, deposit pools, allergy intelligence, EU REACH compliance.",
          brand: { "@type": "Brand", name: "Limespun" },
          offers: [
            {
              "@type": "Offer",
              name: "Solo",
              price: "29",
              priceCurrency: "USD",
              url: "https://limespun.com/pricing",
            },
            {
              "@type": "Offer",
              name: "Studio",
              price: "59",
              priceCurrency: "USD",
              url: "https://limespun.com/pricing",
            },
            {
              "@type": "Offer",
              name: "Pro",
              price: "99",
              priceCurrency: "USD",
              url: "https://limespun.com/pricing",
            },
            {
              "@type": "Offer",
              name: "Enterprise",
              price: "199",
              priceCurrency: "USD",
              url: "https://limespun.com/pricing",
            },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a,
            },
          })),
        }}
      />
      <Nav />
      <main>
        <HeroSection
          variant="dark"
          eyebrow="The line in the sand"
          eyebrowAccent="rust"
          headline="Priced like a tool, quietly fair."
          italicWord="quietly"
          subhead="No per-booking fees. No transaction take. No upsells in the chair. You pay for the software. Stripe takes its standard cut. That is the entire arrangement."
          primaryCTA={{
            label: "Start a 14-day trial",
            href: "https://app.limespun.com/signup",
          }}
          secondaryCTA={{ label: "Talk to sales", href: "/book-a-demo" }}
        />

        <PricingTiersSection />

        <CompareSection />

        <ROISection />

        <FAQSection />

        <CTASection
          badge="The decision takes one minute"
          headline="Pick a plan and start the trial."
          italicWord="trial"
          subhead="14-day free trial on every plan. No card required. White-glove migration included above Solo. Cancel without a phone call."
          primaryCTA={{
            label: "Start a 14-day trial",
            href: "https://app.limespun.com/signup",
          }}
          secondaryCTA={{
            label: "Book a 30-min walkthrough",
            href: "/book-a-demo",
            icon: "play",
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
