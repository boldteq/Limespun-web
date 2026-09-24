"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, LifeBuoy, Newspaper } from "lucide-react";
import { ACCOUNT, BRAND, CONTACT_EMAIL, FONT, SHADOW, GRADIENT, fadeUp, stagger } from "@/lib/brand";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
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

/** Every topic goes to the one inbox; the subject line tells us what it's about. */
const mailto = (subject: string): string => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

const CHANNELS: ChannelCard[] = [
  {
    accent: "rust",
    icon: <Mail size={18} strokeWidth={1.8} />,
    title: "Sales",
    email: CONTACT_EMAIL,
    description: "Plans, Multi-Location, or switching from another tool",
    href: mailto("Sales"),
  },
  {
    accent: "amber",
    icon: <LifeBuoy size={18} strokeWidth={1.8} />,
    title: "Support",
    email: CONTACT_EMAIL,
    description: "Help with your account or anything in the app",
    href: mailto("Support"),
  },
  {
    accent: "sage",
    icon: <Newspaper size={18} strokeWidth={1.8} />,
    title: "Press",
    email: CONTACT_EMAIL,
    description: "Facts and brand assets are on the press page",
    href: mailto("Press"),
  },
];

const FAQ_ITEMS = [
  {
    q: "Do you have a phone number?",
    a: "No. Email is the way to reach us, and you'll hear back within one business day.",
  },
  {
    q: "I'm switching from another tool. Who do I write to?",
    a: `Pick Sales in the form or email ${CONTACT_EMAIL}. We move your clients, bookings and signed forms over for you, on every plan.`,
  },
  {
    q: "How do I make a data request (GDPR, CCPA)?",
    a: `Email ${CONTACT_EMAIL} with "Data request" in the subject line. We complete it within the legal deadline, which is one month under GDPR.`,
  },
  {
    q: "Which languages do you reply in?",
    a: "English.",
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
      <Nav />
      <main>
        <HeroSection
          eyebrow="Get in touch"
          eyebrowAccent="rust"
          headline="One inbox. We answer every email."
          italicWord="every"
          subhead="Sales, support and press questions all go to the same inbox. We reply within one business day, with priority handling on Pro and Multi-Location."
          primaryCTA={{ label: `Email ${CONTACT_EMAIL}`, href: `mailto:${CONTACT_EMAIL}` }}
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
            <SectionEyebrow label="Pick a topic" accent="amber" />
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
              Three topics, one inbox.
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
                <ChannelCardItem key={card.title} card={card} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── Stat strip ───────────────────────────────────────────────────────── */}
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>
          <StatStrip
            items={[
              { stat: "1 business day", label: "to hear back from us" },
              { stat: "One inbox", label: "for sales, support and press" },
              { stat: "Email only", label: "no phone line to chase" },
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
                <SectionEyebrow label="Or use the form" accent="rust" />
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
                Write it once, here.
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
                Pick a topic and write a line or two. The form lands in the same inbox as
                email, and we reply within one business day.
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
          badge="Get in touch"
          headline="One address for everything."
          italicWord="everything"
          subhead="One inbox for every question. We reply within one business day."
          primaryCTA={{ label: `Email ${CONTACT_EMAIL}`, href: `mailto:${CONTACT_EMAIL}` }}
          secondaryCTA={{ label: ACCOUNT.signUpLabel, href: ACCOUNT.signUpHref }}
        />
      </main>
      <Footer />

      <style>{`
        @media (max-width: 1024px) {
          .contact-form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
