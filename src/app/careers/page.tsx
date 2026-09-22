"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/shared/hero-section";
import { CTASection } from "@/components/shared/cta-section";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { BRAND, FONT, SHADOW, GRADIENT, fadeUp, stagger } from "@/lib/brand";
import { openRoles, teamLabels } from "@/lib/data/careers";
import type { Role } from "@/lib/data/careers";

// ─── Why us cards ──────────────────────────────────────────────────────────────

const WHY_CARDS = [
  {
    accent: BRAND.rust,
    accentBg: BRAND.rustWash,
    title: "Real product, real studios",
    body: "We're an early-stage team building Limespun alongside the studios using it. Your work ships to artists who tell us what broke by Friday — not to a stakeholder review deck.",
  },
  {
    accent: BRAND.amber,
    accentBg: BRAND.amberWash,
    title: "Pairing > process",
    body: "No two-week sprints with stand-ups. We pair on the work, ship daily, document in code. Senior engineers do code review; juniors learn by writing real production code.",
  },
  {
    accent: BRAND.sage,
    accentBg: BRAND.sageWash,
    title: "Ownership over titles",
    body: "Roles are descriptions, not silos. Designers ship code. Engineers write copy. Customer Success has root-cause access. Best people, fewer of them, more leverage each.",
  },
];

// ─── Benefits list ─────────────────────────────────────────────────────────────

const BENEFITS = [
  "Salary banded to senior London / NYC market rates, regardless of where you live",
  "Equity on every full-time role",
  "Top-of-the-line hardware (M-series Mac, second display, ergonomic chair)",
  "30 days off + your country's public holidays",
  "Annual team gathering (last one was Lisbon, this one is Tokyo)",
  "Boldteq covers your conferences (1-2 / yr) and one course / yr",
  "No on-call rotation; pager covers production exceptions only",
];

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
  'apprentice': 'Apprentice',
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
        href={`mailto:careers@boldteq.com?subject=Application: ${role.title}`}
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
          headline="Build software for craft industries."
          italicWord="craft"
          subhead="Boldteq is a small team in three time zones. We make tools for tattoo studios, photographers, and (eventually) more craft businesses. Remote-first. Ship-or-die. Every hire is paired with the founder."
          primaryCTA={{ label: "See open roles", href: "#roles" }}
          secondaryCTA={{ label: "About us", href: "/about", icon: "play" }}
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
              <SectionEyebrow label="Why this team" accent="rust" />
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
              Three reasons to join.
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
              Currently hiring.
            </motion.h2>

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
          </div>
        </section>

        {/* Working here */}
        <section
          style={{
            background: GRADIENT.sectionCool,
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
              <SectionEyebrow label="How we work" accent="amber" />
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
                marginBottom: 40,
                maxWidth: 480,
              } as React.CSSProperties}
            >
              What you&apos;ll find.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                background: BRAND.white,
                borderRadius: 18,
                padding: "32px 36px",
                boxShadow: SHADOW.soft,
                maxWidth: 720,
              } as React.CSSProperties}
            >
              <ul style={{ listStyle: "none", padding: 0, margin: 0 } as React.CSSProperties}>
                {BENEFITS.map((benefit, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      paddingTop: i > 0 ? 16 : 0,
                      paddingBottom: i < BENEFITS.length - 1 ? 16 : 0,
                      borderBottom: i < BENEFITS.length - 1 ? `1px solid ${BRAND.borderSoft}` : "none",
                    } as React.CSSProperties}
                  >
                    <Check
                      size={16}
                      color={BRAND.sage}
                      strokeWidth={2.5}
                      style={{ flexShrink: 0, marginTop: 2 } as React.CSSProperties}
                    />
                    <span
                      style={{
                        fontFamily: FONT.sans,
                        fontSize: 15,
                        lineHeight: 1.55,
                        color: BRAND.stoneDark,
                      } as React.CSSProperties}
                    >
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* No-bullshit section */}
        <section
          style={{
            background: BRAND.bone,
            paddingTop: 80,
            paddingBottom: 100,
          } as React.CSSProperties}
        >
          <div
            style={{
              maxWidth: 720,
              margin: "0 auto",
              padding: "0 32px",
              textAlign: "center",
            } as React.CSSProperties}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              style={{ display: "flex", justifyContent: "center" } as React.CSSProperties}
            >
              <SectionEyebrow label="Honest disclaimers" accent="rust" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: FONT.serif,
                fontSize: "clamp(32px, 4.5vw, 56px)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: BRAND.onyx,
                fontWeight: 400,
                marginBottom: 28,
                textAlign: "center",
              } as React.CSSProperties}
            >
              What this isn&rsquo;t.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: FONT.sans,
                fontSize: 16,
                lineHeight: 1.7,
                color: BRAND.stoneDark,
                marginBottom: 16,
                textAlign: "center",
              } as React.CSSProperties}
            >
              We&rsquo;re not Series B. There&rsquo;s no &ldquo;unlimited&rdquo; anything that secretly limits at 5.
              The team is small enough that you&rsquo;ll personally know every other engineer. If you want a place to coast, we are not it. If you want to ship work you&rsquo;re proud of, every week, with people who notice — apply.
            </motion.p>
          </div>
        </section>

        {/* CTA */}
        <CTASection
          badge="Or just say hi"
          headline="No open role fits?"
          italicWord="No"
          subhead="Email careers@boldteq.com with your portfolio and what you'd want to work on. We answer every email."
          primaryCTA={{ label: "Email careers@boldteq.com", href: "mailto:careers@boldteq.com" }}
          secondaryCTA={{ label: "About us", href: "/about", icon: "play" }}
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
