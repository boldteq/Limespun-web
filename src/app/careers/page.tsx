"use client";

import React from "react";
import { motion } from "framer-motion";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/shared/hero-section";
import { CTASection } from "@/components/shared/cta-section";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { BRAND, CONTACT_EMAIL, FONT, SHADOW, GRADIENT, fadeUp, stagger } from "@/lib/brand";
import { openRoles, teamLabels } from "@/lib/data/careers";
import type { Role } from "@/lib/data/careers";

// ─── Why us cards ──────────────────────────────────────────────────────────────

const WHY_CARDS = [
  {
    accent: BRAND.rust,
    accentBg: BRAND.rustWash,
    title: "Real product, real studios",
    body: "Limespun is live. What you build ships to studios that tell us plainly what works and what doesn't, not to a review deck.",
  },
  {
    accent: BRAND.amber,
    accentBg: BRAND.amberWash,
    title: "Small on purpose",
    body: "A founder and a small team. You'd know everyone, and everyone's work shows in the product.",
  },
  {
    accent: BRAND.sage,
    accentBg: BRAND.sageWash,
    title: "Remote, written down",
    body: "We work remotely and write decisions down, so the reasoning doesn't live in a meeting you missed.",
  },
];

/** Every careers email goes to the main inbox, marked by its subject line. */
const careersMail = (subject: string): string => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

// ─── Team accent map ───────────────────────────────────────────────────────────

const TEAM_ACCENT: Record<Role['team'], { color: string; bg: string }> = {
  engineering: { color: BRAND.rust,  bg: BRAND.rustWash },
  design:      { color: BRAND.amber, bg: BRAND.amberWash },
  support:     { color: BRAND.sage,  bg: BRAND.sageWash },
  sales:       { color: BRAND.stone, bg: BRAND.boneDeep },
};

const TYPE_LABEL: Record<Role['type'], string> = {
  'full-time':  'Full-time',
  'contract':   'Contract',
};

// ─── Role card ────────────────────────────────────────────────────────────────

function RoleCard({ role }: { role: Role }) {
  const teamAccent = TEAM_ACCENT[role.team];

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -2, boxShadow: SHADOW.card }}
      style={{
        background: BRAND.white,
        borderRadius: 16,
        padding: 28,
        boxShadow: SHADOW.soft,
        border: `1px solid ${BRAND.borderSoft}`,
        marginBottom: 16,
        maxWidth: 800,
        margin: "0 auto 16px",
      } as React.CSSProperties}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 16,
          marginBottom: 6,
        } as React.CSSProperties}
      >
        {/* Left */}
        <div style={{ flex: 1 } as React.CSSProperties}>
          {/* Team badge */}
          <span
            style={{
              display: "inline-block",
              fontFamily: FONT.mono,
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase" as const,
              letterSpacing: "0.06em",
              color: teamAccent.color,
              background: teamAccent.bg,
              padding: "3px 9px",
              borderRadius: 100,
              marginBottom: 8,
            } as React.CSSProperties}
          >
            {teamLabels[role.team]}
          </span>

          {/* Title */}
          <h3
            style={{
              fontFamily: FONT.sans,
              fontSize: 18,
              fontWeight: 700,
              color: BRAND.onyx,
              letterSpacing: "-0.01em",
            } as React.CSSProperties}
          >
            {role.title}
          </h3>
        </div>

        {/* Type badge */}
        <span
          style={{
            fontFamily: FONT.sans,
            fontSize: 11,
            fontWeight: 600,
            color: BRAND.stoneDark,
            background: BRAND.boneCream,
            padding: "4px 10px",
            borderRadius: 100,
            whiteSpace: "nowrap" as const,
            flexShrink: 0,
          } as React.CSSProperties}
        >
          {TYPE_LABEL[role.type]}
        </span>
      </div>

      {/* Location */}
      <p
        style={{
          fontFamily: FONT.sans,
          fontSize: 12,
          color: BRAND.stoneLight,
          marginBottom: 12,
        } as React.CSSProperties}
      >
        {role.location}
      </p>

      {/* Description */}
      <p
        style={{
          fontFamily: FONT.sans,
          fontSize: 14,
          lineHeight: 1.6,
          color: BRAND.stoneDark,
          marginBottom: 16,
        } as React.CSSProperties}
      >
        {role.description}
      </p>

      {/* Apply CTA */}
      <a
        href={careersMail(`Application: ${role.title}`)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          fontFamily: FONT.sans,
          fontSize: 11,
          fontWeight: 600,
          color: BRAND.onyx,
          background: BRAND.bone,
          border: `1px solid ${BRAND.border}`,
          padding: "4px 12px",
          borderRadius: 100,
          textDecoration: "none",
          letterSpacing: "-0.005em",
        } as React.CSSProperties}
      >
        Apply via email &rarr;
      </a>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CareersPage() {
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
          eyebrow="Careers"
          eyebrowAccent="amber"
          headline="Build software for tattoo studios."
          italicWord="tattoo"
          subhead="Boldteq is the small team behind Limespun, studio software made only for tattoo. We hire when there's a real role to fill, and we list it here."
          primaryCTA={{ label: "Open roles", href: "#roles" }}
          secondaryCTA={{ label: "About us", href: "/about" }}
        />

        {/* Why us */}
        <section
          style={{
            background: GRADIENT.sectionWarm,
            paddingTop: 100,
            paddingBottom: 100,
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
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <SectionEyebrow label="The team" accent="rust" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: FONT.serif,
                fontSize: "clamp(36px, 5vw, 64px)",
                lineHeight: 1.0,
                letterSpacing: "-0.025em",
                color: BRAND.onyx,
                fontWeight: 400,
                marginBottom: 56,
                maxWidth: 480,
              } as React.CSSProperties}
            >
              How we work.
            </motion.h2>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 24,
              } as React.CSSProperties}
              className="careers-why-grid"
            >
              {WHY_CARDS.map((card) => (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  style={{
                    background: BRAND.white,
                    borderRadius: 18,
                    padding: 28,
                    boxShadow: SHADOW.soft,
                    borderTop: `3px solid ${card.accent}`,
                  } as React.CSSProperties}
                >
                  <h3
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 16,
                      fontWeight: 700,
                      color: BRAND.onyx,
                      letterSpacing: "-0.01em",
                      marginBottom: 12,
                    } as React.CSSProperties}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 14,
                      lineHeight: 1.65,
                      color: BRAND.stoneDark,
                    } as React.CSSProperties}
                  >
                    {card.body}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Open roles */}
        <section
          id="roles"
          style={{
            background: BRAND.bone,
            paddingTop: 100,
            paddingBottom: 100,
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
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <SectionEyebrow label="Open roles" accent="sage" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: FONT.serif,
                fontSize: "clamp(36px, 5vw, 64px)",
                lineHeight: 1.0,
                letterSpacing: "-0.025em",
                color: BRAND.onyx,
                fontWeight: 400,
                marginBottom: 48,
                maxWidth: 480,
              } as React.CSSProperties}
            >
              {openRoles.length > 0 ? "Currently hiring." : "No open roles right now."}
            </motion.h2>

            {openRoles.length > 0 ? (
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                {openRoles.map((role) => (
                  <RoleCard key={role.title} role={role} />
                ))}
              </motion.div>
            ) : (
              <p
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: BRAND.stoneDark,
                  maxWidth: 560,
                  margin: 0,
                } as React.CSSProperties}
              >
                If you build software or run a studio and want to help, write to{" "}
                <a
                  href={careersMail("Careers")}
                  style={{ color: BRAND.onyx, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 4 } as React.CSSProperties}
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            )}
          </div>
        </section>

        {/* CTA */}
        <CTASection
          badge="Or just say hi"
          headline="Write to us anyway."
          italicWord="anyway"
          subhead={`Tell us what you'd want to work on and send a link to your work. It goes to ${CONTACT_EMAIL}.`}
          primaryCTA={{ label: `Email ${CONTACT_EMAIL}`, href: careersMail("Careers") }}
          secondaryCTA={{ label: "About us", href: "/about" }}
        />
      </main>

      <Footer />

      <style>{`
        @media (max-width: 1024px) {
          .careers-why-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .careers-why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
