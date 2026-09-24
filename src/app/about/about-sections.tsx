"use client";

import React from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/shared/hero-section";
import { CTASection } from "@/components/shared/cta-section";
import { StatStrip } from "@/components/shared/stat-strip";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { LimespunMark } from "@/components/brand/limespun-mark";
import { ACCOUNT, BRAND, FONT, SHADOW, GRADIENT, fadeUp, stagger } from "@/lib/brand";
import { FOUNDING_OFFER_OPEN, FOUNDING_OFFER_SIZE, MONEY_BACK_DAYS } from "@/lib/data/plans";

// ── Types ─────────────────────────────────────────────────────────────────────

interface PrincipleCard {
  title: string;
  body: string;
  accent: "rust" | "amber" | "sage";
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
  gradientFrom: string;
  gradientTo: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const principles: PrincipleCard[] = [
  {
    title: "Built only for tattoo",
    body: "Sessions, deposits, consent and artist splits are the foundation, not add-ons to salon software. If it doesn't fit a tattoo studio, we don't build it.",
    accent: "rust",
  },
  {
    title: "Flat price, no cut",
    body: "One monthly price per plan. No Limespun fee on your bookings or deposits; card payments carry only the provider's standard fee.",
    accent: "amber",
  },
  {
    title: "Say what's true",
    body: "No invented reviews, studios or numbers. If something isn't in the app yet, we say so.",
    accent: "sage",
  },
  {
    title: "Ship with studios",
    body: "What we build next comes from the studios using it. The changelog shows what shipped, and the roadmap shows what's next.",
    accent: "rust",
  },
];

const accentColorMap = {
  rust:  { color: BRAND.rust,  bg: BRAND.rustWash  },
  amber: { color: BRAND.amber, bg: BRAND.amberWash },
  sage:  { color: BRAND.sage,  bg: BRAND.sageWash  },
} as const;

const teamMembers: TeamMember[] = [
  {
    name: "Yash Baldha",
    role: "Founder · Boldteq",
    bio: "Runs Boldteq and builds Limespun with the team.",
    initials: "YB",
    gradientFrom: BRAND.rust,
    gradientTo: BRAND.amber,
  },
  {
    name: "Engineering",
    role: "The build team",
    bio: "Builds and runs the Limespun app.",
    initials: "EN",
    gradientFrom: BRAND.amber,
    gradientTo: BRAND.sage,
  },
  {
    name: "Design",
    role: "The taste team",
    bio: "Every screen and every word in the app and on this site.",
    initials: "DS",
    gradientFrom: BRAND.sage,
    gradientTo: BRAND.rust,
  },
];

// ── ThesisSection ─────────────────────────────────────────────────────────────

function ThesisSection() {
  return (
    <section
      style={{
        background: GRADIENT.sectionWarm,
        paddingTop: 100,
        paddingBottom: 100,
        overflow: "hidden",
        position: "relative",
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
        <div
          className="about-thesis-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: 64,
            alignItems: "start",
          } as React.CSSProperties}
        >
          {/* Left: prose */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            style={{ maxWidth: 720 } as React.CSSProperties}
          >
            <motion.div variants={fadeUp}>
              <SectionEyebrow label="The thesis" accent="amber" />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: FONT.sans,
                fontSize: "clamp(34px, 4.2vw, 50px)",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                color: BRAND.onyx,
                fontWeight: 600,
                marginBottom: 24,
              } as React.CSSProperties}
            >
              Tattoo isn&apos;t a salon.
            </motion.h2>

            {[
              "We started Boldteq in 2024 because we kept watching craft businesses try to run on software written for spas and barbershops. The 'multi-session project' didn't exist. The 'allergy field' was buried three menus deep. The 'deposit pool' was a Notes app on a second phone.",
              "Limespun is what happens when you stop adapting salon software for tattoo and start designing for tattoo from the first commit. A sleeve is one project. Deposits follow the project. Allergies show on the day. Guest artists get their own dates and splits. None of these are add-ons. They're the foundation.",
              "We are a small, independent team writing software for one industry, and we'd rather have 200 studios that love it than 20,000 that put up with it.",
              "Every decision we make starts with the same question: would a great studio owner pay us, by choice, every month, to keep this running? If the answer is no, we cut it.",
            ].map((para, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 17,
                  lineHeight: 1.7,
                  color: BRAND.stoneDark,
                  marginBottom: 18,
                } as React.CSSProperties}
              >
                {para}
              </motion.p>
            ))}
          </motion.div>

          {/* Right: decorative LimespunMark */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: 48,
            } as React.CSSProperties}
          >
            <LimespunMark size={280} opacity={0.75} />
            <p
              style={{
                fontFamily: FONT.serif,
                fontSize: 12,
                fontStyle: "italic",
                color: BRAND.stoneFaint,
                textAlign: "center",
                marginTop: 20,
                lineHeight: 1.5,
              } as React.CSSProperties}
            >
              Artist &middot; Ink &middot; Skin / The three things that make tattoo, tattoo.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── PrinciplesGrid ────────────────────────────────────────────────────────────

function PrinciplesGrid() {
  return (
    <section
      style={{
        background: BRAND.bone,
        paddingTop: 100,
        paddingBottom: 100,
        overflow: "hidden",
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
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 48, maxWidth: 760 } as React.CSSProperties}
        >
          <SectionEyebrow label="How we work" accent="sage" />
          <h2
            style={{
              fontFamily: FONT.sans,
              fontSize: "clamp(34px, 4.2vw, 50px)",
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              color: BRAND.onyx,
              fontWeight: 600,
              marginBottom: 18,
            } as React.CSSProperties}
          >
            Four principles, every release.
          </h2>
          <p
            style={{
              fontFamily: FONT.sans,
              fontSize: 17,
              lineHeight: 1.6,
              color: BRAND.stoneDark,
              maxWidth: 600,
            } as React.CSSProperties}
          >
            Not posters on a wall. These are the rules we use to decide what to build, and what to say about it.
          </p>
        </motion.div>

        <div
          className="about-principles-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 18,
          } as React.CSSProperties}
        >
          {principles.map((p, i) => {
            const a = accentColorMap[p.accent];
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -3, boxShadow: SHADOW.card }}
                style={{
                  background: BRAND.white,
                  borderRadius: 18,
                  padding: 24,
                  boxShadow: SHADOW.soft,
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
                    width: 100,
                    height: 100,
                    background: `radial-gradient(circle at 100% 0%, ${a.bg} 0%, transparent 70%)`,
                    pointerEvents: "none",
                  } as React.CSSProperties}
                />
                <h3
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 16,
                    fontWeight: 600,
                    color: BRAND.onyx,
                    letterSpacing: "-0.01em",
                    marginTop: 8,
                    marginBottom: 10,
                    lineHeight: 1.3,
                  } as React.CSSProperties}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 13,
                    lineHeight: 1.55,
                    color: BRAND.stoneDark,
                  } as React.CSSProperties}
                >
                  {p.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── TimelineSection ───────────────────────────────────────────────────────────

function TimelineSection() {
  return (
    <section
      style={{
        background: GRADIENT.sectionCool,
        paddingTop: 100,
        paddingBottom: 100,
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
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 48, textAlign: "center" } as React.CSSProperties}
        >
          <div style={{ display: "flex", justifyContent: "center" } as React.CSSProperties}>
            <SectionEyebrow label="The journey" accent="rust" />
          </div>
          <h2
            style={{
              fontFamily: FONT.sans,
              fontSize: "clamp(30px, 4vw, 46px)",
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              color: BRAND.onyx,
              fontWeight: 600,
              marginBottom: 16,
            } as React.CSSProperties}
          >
            From an idea to open doors.
          </h2>
          <p
            style={{
              fontFamily: FONT.sans,
              fontSize: 16,
              lineHeight: 1.6,
              color: BRAND.stoneDark,
              maxWidth: 540,
              margin: "0 auto",
            } as React.CSSProperties}
          >
            Here&apos;s what&apos;s true today.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <StatStrip
            items={[
              { stat: "2024",   label: "Boldteq founded" },
              { stat: "Live",   label: "any studio can create an account today" },
              ...(FOUNDING_OFFER_OPEN
                ? [{ stat: String(FOUNDING_OFFER_SIZE), label: "founding lifetime spots, first come" }]
                : []),
              { stat: "$0",     label: "Limespun fee on bookings or deposits" },
            ]}
          />
        </motion.div>
      </div>
    </section>
  );
}

// ── TeamGrid ──────────────────────────────────────────────────────────────────

function TeamGrid() {
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
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 48, maxWidth: 760 } as React.CSSProperties}
        >
          <SectionEyebrow label="The team" accent="amber" />
          <h2
            style={{
              fontFamily: FONT.sans,
              fontSize: "clamp(30px, 4vw, 46px)",
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              color: BRAND.onyx,
              fontWeight: 600,
              marginBottom: 18,
            } as React.CSSProperties}
          >
            A small team.
          </h2>
          <p
            style={{
              fontFamily: FONT.sans,
              fontSize: 17,
              lineHeight: 1.6,
              color: BRAND.stoneDark,
              maxWidth: 600,
            } as React.CSSProperties}
          >
            No 50-person customer success org. A founder and a small team who build the product and answer the email.
          </p>
        </motion.div>

        <div
          className="about-team-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          } as React.CSSProperties}
        >
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: BRAND.white,
                borderRadius: 18,
                overflow: "hidden",
                boxShadow: SHADOW.soft,
                border: `1px solid ${BRAND.borderSoft}`,
              } as React.CSSProperties}
            >
              <div
                style={{
                  height: 200,
                  background: `linear-gradient(135deg, ${member.gradientFrom} 0%, ${member.gradientTo} 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                } as React.CSSProperties}
              >
                <span
                  style={{
                    fontFamily: FONT.serif,
                    fontStyle: "italic",
                    fontSize: 52,
                    color: "rgba(247,247,245,0.90)",
                    letterSpacing: "-0.02em",
                    userSelect: "none",
                  } as React.CSSProperties}
                >
                  {member.initials}
                </span>
              </div>

              <div style={{ padding: 24 } as React.CSSProperties}>
                <div
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 17,
                    fontWeight: 600,
                    color: BRAND.onyx,
                    letterSpacing: "-0.01em",
                    marginBottom: 4,
                  } as React.CSSProperties}
                >
                  {member.name}
                </div>
                <div
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 12,
                    fontWeight: 400,
                    color: BRAND.stoneLight,
                    marginBottom: 14,
                  } as React.CSSProperties}
                >
                  {member.role}
                </div>
                <p
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: BRAND.stoneDark,
                  } as React.CSSProperties}
                >
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── AboutSections (composite export) ─────────────────────────────────────────

export function AboutSections() {
  return (
    <>
      <HeroSection
        variant="default"
        eyebrow="The studio behind the studio OS"
        eyebrowAccent="rust"
        headline="Built for the work, not the spreadsheet."
        italicWord="work"
        subhead="Boldteq is a small team building software for tattoo studios. We don't make platforms. We make tools that show up at 9am, do the job and stay out of the way."
        primaryCTA={{ label: ACCOUNT.signUpLabel, href: ACCOUNT.signUpHref }}
        secondaryCTA={{ label: "Contact us", href: "/contact" }}
      />

      <ThesisSection />
      <PrinciplesGrid />
      <TimelineSection />
      <TeamGrid />

      <CTASection
        badge="Run on Limespun"
        headline="Run the shop in one place."
        italicWord="place"
        subhead={`Create your account in minutes. We move your data over for you on every plan. ${MONEY_BACK_DAYS}-day money-back guarantee.`}
        primaryCTA={{ label: ACCOUNT.signUpLabel, href: ACCOUNT.signUpHref }}
        secondaryCTA={{ label: "See pricing", href: "/pricing" }}
      />
    </>
  );
}
