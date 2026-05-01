"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, ArrowRight } from "lucide-react";
import { BRAND, FONT, SHADOW, GRADIENT, fadeUp, stagger } from "@/lib/brand";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/shared/hero-section";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { CTASection } from "@/components/shared/cta-section";
import { StatStrip } from "@/components/shared/stat-strip";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";

interface MigrationRow {
  from: string;
  time: string;
  carries: string;
}

const migrationRows: MigrationRow[] = [
  {
    from: "DaySmart Body Art",
    time: "9 days",
    carries: "2 white-glove calls · 100% data preserved",
  },
  {
    from: "Mangomint",
    time: "6 days",
    carries: "Bookings, deposits, client notes — all carried",
  },
  {
    from: "Fresha",
    time: "5 days",
    carries: "Keep your bookings, leave the platform fee",
  },
  {
    from: "TattooGenda",
    time: "4 days",
    carries: "Guest residencies and deposit pools migrate intact",
  },
  {
    from: "Vagaro",
    time: "7 days",
    carries: "Salon-coded data re-mapped to tattoo schema",
  },
  {
    from: "A Google spreadsheet",
    time: "1 day",
    carries: "CSV import in minutes · we clean the rest",
  },
];

const deepLinkCards = [
  { label: "From DaySmart", href: "/migrate/daysmart" },
  { label: "From Fresha", href: "/migrate/fresha" },
  { label: "From Mangomint", href: "/migrate/mangomint" },
];

const processSteps = [
  {
    number: "01",
    title: "Day 0 — Discovery call",
    body: "30 minutes with our migration lead. We map your studio's data shape: bookings, clients, projects, deposits. Honest answer on whether 14 days is realistic.",
  },
  {
    number: "02",
    title: "Days 1-3 — Export + clean",
    body: "We pull from your current tool's API or CSV export. Map fields. Clean duplicates. Hand you a preview of what comes across.",
  },
  {
    number: "03",
    title: "Days 4-12 — Parallel run",
    body: "InkOS goes live alongside your current tool. New bookings flow to InkOS. Old bookings finish in your old system. Zero downtime.",
  },
  {
    number: "04",
    title: "Day 13-14 — Cutover + bill",
    body: "Last appointment in old tool clears. We flip the switch. Your old subscription gets cancelled. We start billing on day 15.",
  },
];

const faqItems = [
  {
    q: "What if I have a custom field in my current tool that InkOS doesn't have?",
    a: "We add it. Migration team has shipped 200+ custom field migrations. Most show up as 'Notes' on the client record; complex ones become first-class fields.",
  },
  {
    q: "What about historical client photos in my current tool?",
    a: "We migrate photo libraries. Re-organised by project where possible. Original timestamps preserved.",
  },
  {
    q: "Do I lose any features during the parallel run?",
    a: "No. Your current tool stays fully functional. New bookings get auto-routed to InkOS via a redirect rule we configure.",
  },
  {
    q: "What if migration takes longer than 14 days?",
    a: "We don't bill until cutover. Period. We've had migrations take 21 days; the studio paid nothing extra.",
  },
  {
    q: "Is migration included in the Solo plan?",
    a: "Solo gets self-serve CSV import (still free, just less hand-holding). Studio plan and above get white-glove with calls.",
  },
];

const deepCardStyle: React.CSSProperties = {
  background: BRAND.white,
  borderRadius: 12,
  padding: 20,
  boxShadow: SHADOW.soft,
  textDecoration: "none",
  color: BRAND.onyx,
  fontFamily: FONT.sans,
  fontSize: 15,
  fontWeight: 600,
  letterSpacing: "-0.005em",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  border: `1px solid ${BRAND.borderSoft}`,
  transition: "box-shadow 0.2s ease, border-color 0.2s ease",
};

export default function MigratePage() {
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
          variant="centered"
          eyebrow="The migration"
          eyebrowAccent="amber"
          headline="Whatever you're on, we move it for you."
          italicWord="whatever"
          subhead="14-day white-glove move. Bookings, deposits, client notes, consent forms, photo libraries — all carried. We don't bill until your last appointment from your old tool clears."
          primaryCTA={{ label: "Talk to migrations", href: "/book-a-demo" }}
          secondaryCTA={{
            label: "Start the trial",
            href: "https://inkos.up.railway.app/signup",
          }}
        />

        {/* Stats */}
        <section
          style={{
            background: BRAND.bone,
            paddingTop: 0,
            paddingBottom: 40,
          } as React.CSSProperties}
        >
          <div
            style={{
              maxWidth: 1120,
              margin: "0 auto",
              padding: "0 32px",
            } as React.CSSProperties}
          >
            <StatStrip
              items={[
                { stat: "14 days", label: "average migration" },
                { stat: "100%", label: "data carried" },
                { stat: "$0", label: "until cutover" },
                { stat: "Zero", label: "downtime" },
              ]}
            />
          </div>
        </section>

        {/* Migration table + deep links */}
        <section
          style={{
            background: BRAND.bone,
            paddingTop: 80,
            paddingBottom: 80,
            position: "relative",
            overflow: "hidden",
          } as React.CSSProperties}
        >
          {/* Amber glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 520,
              height: 520,
              background: `radial-gradient(circle at 0% 0%, ${BRAND.amberWash} 0%, transparent 60%)`,
              pointerEvents: "none",
            } as React.CSSProperties}
          />

          <div
            style={{
              position: "relative",
              maxWidth: 1120,
              margin: "0 auto",
              padding: "0 32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            } as React.CSSProperties}
          >
            {/* Migration table */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              style={{
                width: "100%",
                maxWidth: 860,
                background: BRAND.white,
                borderRadius: 18,
                boxShadow: SHADOW.card,
                overflow: "hidden",
                marginBottom: 32,
              } as React.CSSProperties}
            >
              {/* Top gradient strip */}
              <div
                aria-hidden="true"
                style={{
                  height: 4,
                  background: `linear-gradient(90deg, ${BRAND.amber} 0%, ${BRAND.rust} 50%, ${BRAND.sage} 100%)`,
                } as React.CSSProperties}
              />

              {/* Table header */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 140px 1fr",
                  padding: "14px 24px",
                  borderBottom: `1px solid ${BRAND.border}`,
                  background: BRAND.boneDeep,
                } as React.CSSProperties}
              >
                {["Coming from", "Time to live", "What we carry"].map((h) => (
                  <div
                    key={h}
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 11,
                      fontWeight: 600,
                      color: BRAND.stoneLight,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    } as React.CSSProperties}
                  >
                    {h}
                  </div>
                ))}
              </div>

              {/* Table rows */}
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                {migrationRows.map((row, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 140px 1fr",
                      padding: "16px 24px",
                      borderBottom:
                        i < migrationRows.length - 1
                          ? `1px solid ${BRAND.borderSoft}`
                          : "none",
                      alignItems: "center",
                    } as React.CSSProperties}
                  >
                    <div
                      style={{
                        fontFamily: FONT.sans,
                        fontSize: 14,
                        fontWeight: 600,
                        color: BRAND.onyx,
                        letterSpacing: "-0.005em",
                      } as React.CSSProperties}
                    >
                      {row.from}
                    </div>

                    <div>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "4px 12px",
                          borderRadius: 100,
                          background: BRAND.rustSoft,
                          fontFamily: FONT.mono,
                          fontSize: 12,
                          fontWeight: 600,
                          color: BRAND.rust,
                          letterSpacing: "0.01em",
                        } as React.CSSProperties}
                      >
                        {row.time}
                      </span>
                    </div>

                    <div
                      style={{
                        fontFamily: FONT.sans,
                        fontSize: 13,
                        color: BRAND.stoneDark,
                        lineHeight: 1.4,
                      } as React.CSSProperties}
                    >
                      {row.carries}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Deep-dive link grid */}
            <div
              className="migrate-deep-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 14,
                marginTop: 0,
                width: "100%",
                maxWidth: 860,
              } as React.CSSProperties}
            >
              {deepLinkCards.map((card) => (
                <a
                  key={card.href}
                  href={card.href}
                  style={deepCardStyle}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      BRAND.rust;
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      SHADOW.card;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      BRAND.borderSoft;
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      SHADOW.soft;
                  }}
                >
                  {card.label}
                  <ArrowRight size={14} strokeWidth={2} color={BRAND.rust} />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Promise band */}
        <section
          style={{
            background: BRAND.bone,
            paddingTop: 0,
            paddingBottom: 100,
          } as React.CSSProperties}
        >
          <div
            style={{
              maxWidth: 1120,
              margin: "0 auto",
              padding: "0 32px",
              display: "flex",
              justifyContent: "center",
            } as React.CSSProperties}
          >
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              style={{
                width: "100%",
                maxWidth: 860,
                background: BRAND.onyx,
                borderRadius: 18,
                padding: "32px 36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 24,
                position: "relative",
                overflow: "hidden",
              } as React.CSSProperties}
            >
              {/* Rust glow */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 600,
                  height: 300,
                  background: `radial-gradient(ellipse, rgba(200,53,31,0.25) 0%, transparent 70%)`,
                  pointerEvents: "none",
                } as React.CSSProperties}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  position: "relative",
                  flex: 1,
                } as React.CSSProperties}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(200,53,31,0.20)",
                    border: "1px solid rgba(200,53,31,0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 2,
                  } as React.CSSProperties}
                >
                  <Shield size={20} color={BRAND.rust} strokeWidth={1.8} />
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 11,
                      fontWeight: 600,
                      color: BRAND.rust,
                      letterSpacing: "0.07em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    } as React.CSSProperties}
                  >
                    The promise
                  </div>
                  <div
                    style={{
                      fontFamily: FONT.serif,
                      fontSize: "clamp(18px, 2.4vw, 26px)",
                      color: BRAND.bone,
                      lineHeight: 1.25,
                      letterSpacing: "-0.01em",
                    } as React.CSSProperties}
                  >
                    If we can&apos;t move you cleanly in 14 days, you don&apos;t
                    pay.
                  </div>
                </div>
              </div>

              <div
                style={{ position: "relative", flexShrink: 0 } as React.CSSProperties}
              >
                <a
                  href="/book-a-demo"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "12px 22px",
                    borderRadius: 100,
                    background: BRAND.bone,
                    color: BRAND.onyx,
                    fontFamily: FONT.sans,
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: "none",
                    letterSpacing: "-0.005em",
                    whiteSpace: "nowrap",
                  } as React.CSSProperties}
                >
                  Talk to migrations
                  <ArrowRight size={14} strokeWidth={2} />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 4-step process */}
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
              padding: "0 32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            } as React.CSSProperties}
          >
            <SectionEyebrow label="How it works" accent="rust" />
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              style={{
                fontFamily: FONT.sans,
                fontSize: "clamp(26px, 3.5vw, 42px)",
                fontWeight: 600,
                color: BRAND.onyx,
                letterSpacing: "-0.02em",
                marginBottom: 48,
                textAlign: "center",
              } as React.CSSProperties}
            >
              Four steps. Fourteen days.
            </motion.h2>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                width: "100%",
                maxWidth: 720,
              } as React.CSSProperties}
            >
              {processSteps.map((step) => (
                <motion.div
                  key={step.number}
                  variants={fadeUp}
                  style={{
                    background: BRAND.white,
                    borderRadius: 16,
                    padding: "24px 28px",
                    boxShadow: SHADOW.soft,
                    border: `1px solid ${BRAND.borderSoft}`,
                  } as React.CSSProperties}
                >
                  <div
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 14,
                      fontWeight: 700,
                      color: BRAND.rust,
                      marginBottom: 8,
                      letterSpacing: "0.01em",
                    } as React.CSSProperties}
                  >
                    {step.number}
                  </div>
                  <h3
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 18,
                      fontWeight: 600,
                      color: BRAND.onyx,
                      marginBottom: 8,
                      letterSpacing: "-0.01em",
                    } as React.CSSProperties}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: BRAND.stoneDark,
                      margin: 0,
                    } as React.CSSProperties}
                  >
                    {step.body}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            } as React.CSSProperties}
          >
            <SectionEyebrow label="Common questions" accent="amber" />
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              style={{
                fontFamily: FONT.sans,
                fontSize: "clamp(26px, 3.5vw, 42px)",
                fontWeight: 600,
                color: BRAND.onyx,
                letterSpacing: "-0.02em",
                marginBottom: 48,
                textAlign: "center",
              } as React.CSSProperties}
            >
              Migration questions answered.
            </motion.h2>
            <FAQAccordion items={faqItems} accent="rust" />
          </div>
        </section>

        {/* CTA */}
        <CTASection
          badge="Move with us"
          headline="Talk to migrations."
          italicWord="migrations"
          subhead="30-minute discovery call. Honest answer on fit. Zero pressure."
          primaryCTA={{ label: "Book the call", href: "/book-a-demo" }}
          secondaryCTA={{
            label: "Or start the trial",
            href: "https://inkos.up.railway.app/signup",
            icon: "play",
          }}
        />
      </main>
      <Footer />

      <style>{`
        @media (max-width: 640px) {
          .migrate-deep-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
