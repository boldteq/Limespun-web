"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, LifeBuoy, Newspaper, Heart, Lightbulb } from "lucide-react";
import { BRAND, FONT, SHADOW, GRADIENT, fadeUp, stagger } from "@/lib/brand";
import { HeroSection } from "@/components/shared/hero-section";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { StatStrip } from "@/components/shared/stat-strip";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { CTASection } from "@/components/shared/cta-section";
import { ContactForm } from "@/components/forms/contact-form";

// ─── Channel card data ────────────────────────────────────────────────────────
type AccentColor = "rust" | "amber" | "sage";

interface ChannelCard {
  accent: AccentColor;
  icon: React.ReactNode;
  title: string;
  email: string;
  description: string;
  href: string;
}

const accentTokens: Record<AccentColor, { color: string; bg: string; border: string }> = {
  rust: { color: BRAND.rust, bg: BRAND.rustWash, border: BRAND.rustSoft },
  amber: { color: BRAND.amber, bg: BRAND.amberWash, border: BRAND.amberSoft },
  sage: { color: BRAND.sage, bg: BRAND.sageWash, border: BRAND.sageSoft },
};

const CHANNELS: ChannelCard[] = [
  {
    accent: "rust",
    icon: <Mail size={18} strokeWidth={1.8} />,
    title: "Sales",
    email: "sales@boldteq.com",
    description: "For pricing, multi-location, custom plans",
    href: "mailto:sales@boldteq.com",
  },
  {
    accent: "amber",
    icon: <LifeBuoy size={18} strokeWidth={1.8} />,
    title: "Support",
    email: "support@boldteq.com",
    description: "Logged-in studios use in-app chat for fastest response",
    href: "mailto:support@boldteq.com",
  },
  {
    accent: "sage",
    icon: <Newspaper size={18} strokeWidth={1.8} />,
    title: "Press",
    email: "press@boldteq.com",
    description: "Brand kit and product screenshots at /press",
    href: "mailto:press@boldteq.com",
  },
  {
    accent: "rust",
    icon: <Heart size={18} strokeWidth={1.8} />,
    title: "Partnerships",
    email: "partners@boldteq.com",
    description: "Integrations, agencies, education programmes",
    href: "mailto:partners@boldteq.com",
  },
  {
    accent: "amber",
    icon: <Lightbulb size={18} strokeWidth={1.8} />,
    title: "Feature requests",
    email: "feedback@boldteq.com",
    description: "We answer within 5 business days. Honest yes/no/on-roadmap.",
    href: "mailto:feedback@boldteq.com",
  },
];

const FAQ_ITEMS = [
  {
    q: "Do you have a phone number?",
    a: "Not a public one. Phones don't scale, and the founder picks up his own emails. If you need a call, we'll set one up after the first email exchange.",
  },
  {
    q: "Where are you based?",
    a: "Boldteq has a registered office in the UK. The team is distributed across Europe and the Americas. Working hours roughly span UTC-5 to UTC+5.",
  },
  {
    q: "What about data subject requests (GDPR, CCPA)?",
    a: "Email privacy@boldteq.com. We respond within 30 days as required, usually within 5.",
  },
  {
    q: "Is there an EU representative?",
    a: "Yes. EU data subjects can contact our EU representative at eu-rep@boldteq.com.",
  },
  {
    q: "Do you support different languages?",
    a: "We answer in English and Spanish today. French and German planned for Q3 2026.",
  },
];

// ─── Channel Card Component ───────────────────────────────────────────────────
function ChannelCardItem({ card }: { card: ChannelCard }) {
  const tokens = accentTokens[card.accent];

  return (
    <motion.a
      href={card.href}
      variants={fadeUp}
      whileHover={{ y: -3, boxShadow: SHADOW.card }}
      style={{
        display: "block",
        background: BRAND.white,
        borderRadius: 16,
        padding: 24,
        boxShadow: SHADOW.soft,
        borderTop: `3px solid ${tokens.color}`,
        textDecoration: "none",
        transition: "box-shadow 0.2s ease",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: tokens.bg,
          border: `1px solid ${tokens.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: tokens.color,
          marginBottom: 12,
        }}
      >
        {card.icon}
      </div>
      <div
        style={{
          fontFamily: FONT.sans,
          fontSize: 14,
          fontWeight: 700,
          color: BRAND.onyx,
          marginBottom: 4,
        }}
      >
        {card.title}
      </div>
      <div
        style={{
          fontFamily: FONT.mono,
          fontSize: 12,
          color: BRAND.stoneDark,
          marginBottom: 6,
        }}
      >
        {card.email}
      </div>
      <div
        style={{
          fontFamily: FONT.sans,
          fontSize: 12,
          color: BRAND.stoneLight,
          lineHeight: 1.5,
        }}
      >
        {card.description}
      </div>
    </motion.a>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <>
      <HeroSection
        eyebrow="Get in touch"
        eyebrowAccent="rust"
        headline="One inbox. We answer every email."
        italicWord="every"
        subhead="No support tier maze. No 'select your urgency level' form. One human reads every message and routes it to the right person — usually within four hours, always within one business day."
        primaryCTA={{ label: "Email hello@boldteq.com", href: "mailto:hello@boldteq.com" }}
        secondaryCTA={{ label: "Or use the form", href: "#contact-form" }}
      />

      {/* ─── Channel grid ─────────────────────────────────────────────────────── */}
      <section
        style={{
          background: GRADIENT.sectionWarm,
          paddingTop: 100,
          paddingBottom: 100,
        }}
      >
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>
          <SectionEyebrow label="Pick a channel" accent="amber" />
          <h2
            style={{
              fontFamily: FONT.serif,
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 400,
              color: BRAND.onyx,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: 48,
              marginTop: 0,
            }}
          >
            Five direct lines.
          </h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            {CHANNELS.map((card) => (
              <ChannelCardItem key={card.email} card={card} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Stat strip ───────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>
        <StatStrip
          items={[
            { stat: "< 4 hr", label: "average response time" },
            { stat: "< 1 day", label: "absolute SLA on every email" },
            { stat: "No tiers", label: "one inbox for everything" },
            { stat: "Real humans", label: "never an LLM auto-reply" },
          ]}
        />
      </div>

      {/* ─── Form section ─────────────────────────────────────────────────────── */}
      <section
        id="contact-form"
        style={{
          background: BRAND.bone,
          paddingTop: 100,
          paddingBottom: 100,
        }}
      >
        <div
          className="contact-form-grid"
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "0 32px",
            display: "grid",
            gridTemplateColumns: "1fr 480px",
            gap: 64,
            alignItems: "start",
          }}
        >
          {/* Left */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.div variants={fadeUp}>
              <SectionEyebrow label="Or send a single message" accent="rust" />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: FONT.serif,
                fontSize: "clamp(28px, 3.5vw, 44px)",
                fontWeight: 400,
                color: BRAND.onyx,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                marginBottom: 20,
                marginTop: 0,
              }}
            >
              Tell us once. We route it.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: FONT.sans,
                fontSize: 17,
                color: BRAND.stoneDark,
                lineHeight: 1.6,
                maxWidth: 480,
                marginBottom: 0,
              }}
            >
              Not sure which email address to use? Use the form. Select a topic and
              we&apos;ll route your message to the right person. Sales, support, press,
              partnerships, feature requests — one form serves every topic.
            </motion.p>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: GRADIENT.sectionWarm,
          paddingTop: 100,
          paddingBottom: 100,
        }}
      >
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>
          <SectionEyebrow label="FAQ" accent="rust" />
          <h2
            style={{
              fontFamily: FONT.serif,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 400,
              color: BRAND.onyx,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: 40,
              marginTop: 0,
            }}
          >
            Common questions.
          </h2>
          <FAQAccordion items={FAQ_ITEMS} accent="rust" />
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────────────── */}
      <CTASection
        badge="Talk to a real human"
        headline="No tier mazes."
        italicWord="no"
        subhead="One inbox. One human. Every message read."
        primaryCTA={{ label: "Email hello@boldteq.com", href: "mailto:hello@boldteq.com" }}
        secondaryCTA={{
          label: "Start a 14-day trial",
          href: "https://app.limespun.com/signup",
          icon: "play",
        }}
      />

      <style>{`
        @media (max-width: 1024px) {
          .contact-form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
