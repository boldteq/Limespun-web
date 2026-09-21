"use client";

import React from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/shared/hero-section";
import { CTASection } from "@/components/shared/cta-section";
import { StatStrip } from "@/components/shared/stat-strip";
import { LogoBar } from "@/components/shared/logo-bar";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { LimespunMark } from "@/components/brand/limespun-mark";
import { BRAND, FONT, SHADOW, GRADIENT, fadeUp, stagger } from "@/lib/brand";

// ── Types ─────────────────────────────────────────────────────────────────────

interface PrincipleCard {
  num: string;
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
    num: "01",
    title: "Brand-First",
    body: "Premium, intentional, current. No filler. If a button doesn't earn its pixels, it doesn't ship.",
    accent: "rust",
  },
  {
    num: "02",
    title: "Competitive Intelligence",
    body: "Study the winners. Extract the playbook. Execute it better. Add what no one else has.",
    accent: "amber",
  },
  {
    num: "03",
    title: "Iterative Quality",
    body: "v1 = functional, branded, deployable. v2 = enhanced. v3 = polished. Never ship a 'maybe.'",
    accent: "sage",
  },
  {
    num: "04",
    title: "Fearless Execution",
    body: "Someone built it? Build it better. Default to action, not analysis paralysis.",
    accent: "rust",
  },
  {
    num: "05",
    title: "Complexity as Moat",
    body: "We choose hard problems. The harder the problem, the smaller the field of competitors who can ship it.",
    accent: "amber",
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
    bio: "Builds with the team. Studies the work. Treats every Limespun user like the only one.",
    initials: "YB",
    gradientFrom: BRAND.rust,
    gradientTo: BRAND.amber,
  },
  {
    name: "Engineering",
    role: "The build team",
    bio: "The hands behind 644 files, 18 migrations, 140 routes. Ship-or-die work ethic.",
    initials: "EN",
    gradientFrom: BRAND.amber,
    gradientTo: BRAND.sage,
  },
  {
    name: "Design",
    role: "The taste team",
    bio: "Every screen, every animation, every word. The reason it doesn't feel like SaaS.",
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
              "Limespun is what happens when you stop adapting salon software for tattoo and start designing for tattoo from the first commit. Sleeves are projects. Deposits pool. Allergies surface. Residencies have their own band on the calendar. None of these are configurable add-ons. They're the foundation.",
              "We are not a Series B venture-backed company chasing a billion-dollar TAM. We are a small, profitable team writing software for an industry we admire — and we'd rather have 200 studios that love us than 20,000 that tolerate us.",
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
            Five principles, every line.
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
            Not a manifesto. Not a posters-on-the-wall thing. These are the actual decision rules we apply when we sit down to build.
          </p>
        </motion.div>

        <div
          className="about-principles-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 18,
          } as React.CSSProperties}
        >
          {principles.map((p, i) => {
            const a = accentColorMap[p.accent];
            return (
              <motion.div
                key={p.num}
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
                <div
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 12,
                    fontWeight: 700,
                    color: a.color,
                    letterSpacing: "0.06em",
                    marginBottom: 14,
                    marginTop: 8,
                  } as React.CSSProperties}
                >
                  {p.num}
                </div>
                <h3
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 16,
                    fontWeight: 600,
                    color: BRAND.onyx,
                    letterSpacing: "-0.01em",
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
            From an idea to 1,200 artists.
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
            Two years from concept to private beta. Here&apos;s what&apos;s true today.
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
              { stat: "13",     label: "sprints to v1" },
              { stat: "1,200+", label: "artists on the waitlist" },
              { stat: "47",     label: "countries represented" },
              { stat: "$0",     label: "in transaction fees taken" },
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
            A small team. Three time zones.
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
            We don&apos;t have a 50-person &apos;customer success&apos; org. We have engineers, designers, and one founder — all of whom have walked into actual studios with actual clients.
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

// ── PressLogoBar ──────────────────────────────────────────────────────────────

function PressLogoBar() {
  return (
    <section
      style={{
        background: GRADIENT.sectionWarm,
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
        <LogoBar
          caption="Press & community"
          logos={[
            { name: "Inked Magazine" },
            { name: "Total Tattoo" },
            { name: "Tattoo Life" },
            { name: "Skin Deep" },
            { name: "Things&Ink" },
            { name: "TATTOOPHILE" },
          ]}
        />
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
        subhead="Boldteq is a small team in three time zones, building software for studios in many. We don't make 'platforms.' We make tools. The kind that show up at 9am, do the job, and stay out of the way."
        primaryCTA={{ label: "Start a 14-day trial", href: "https://app.limespun.com/signup" }}
        secondaryCTA={{ label: "Talk to the team", href: "/book-a-demo" }}
      />

      <ThesisSection />
      <PrinciplesGrid />
      <TimelineSection />
      <TeamGrid />
      <PressLogoBar />

      <CTASection
        badge="Run on Limespun"
        headline="Studios that care, building with us."
        italicWord="care"
        subhead="14-day trial. No card. White-glove migration above Solo. Or talk to us — we answer every email."
        primaryCTA={{ label: "Start a 14-day trial", href: "https://app.limespun.com/signup" }}
        secondaryCTA={{ label: "Talk to the team", href: "/book-a-demo", icon: "play" }}
      />
    </>
  );
}
