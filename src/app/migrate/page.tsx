"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, ArrowRight } from "lucide-react";
import { ACCOUNT, BRAND, FONT, SHADOW, GRADIENT, fadeUp, stagger } from "@/lib/brand";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/shared/hero-section";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { CTASection } from "@/components/shared/cta-section";
import { StatStrip } from "@/components/shared/stat-strip";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { MONEY_BACK_DAYS } from "@/lib/data/plans";

interface MigrationRow {
  item: string;
  detail: string;
}

// What moves is the same whichever tool you're on. Keep this generic until the
// per-vendor export facts are confirmed.
const migrationRows: MigrationRow[] = [
  {
    item: "Clients",
    detail: "Names, contact details and notes, with duplicates removed. Custom fields come over as notes.",
  },
  {
    item: "Upcoming bookings",
    detail: "Every future appointment, on the right artist's calendar",
  },
  {
    item: "Deposits held",
    detail: "Money you're holding for sessions still to come, on the right client",
  },
  {
    item: "Signed forms",
    detail: "Consent and release forms you already have, filed on the client",
  },
  {
    item: "A spreadsheet or paper",
    detail: "Send us the file, or photos of the book; we clean it up",
  },
];

const deepLinkCards = [
  { label: "From DaySmart", href: "/migrate/daysmart" },
  { label: "From Fresha", href: "/migrate/fresha" },
  { label: "From Mangomint", href: "/migrate/mangomint" },
  { label: "From TattooGenda", href: "/migrate/tattoogenda" },
  { label: "From Vagaro", href: "/migrate/vagaro" },
];

const processSteps = [
  {
    number: "01",
    title: "Tell us what you use",
    body: "Create your account and tell us which tool you're on. We look at what you're moving: clients, bookings, projects, deposits.",
  },
  {
    number: "02",
    title: "Export and clean",
    body: "We work from your current tool's export or spreadsheet. We map the fields, remove duplicates and show you a preview before anything lands.",
  },
  {
    number: "03",
    title: "Run side by side",
    body: "Limespun goes live next to your current tool. New bookings come to Limespun; existing ones finish where they are. You keep taking bookings the whole way through.",
  },
  {
    number: "04",
    title: "Switch when you're ready",
    body: "When the last booking in your old tool clears, you cancel it. Usually a week or two from start to finish.",
  },
];

const faqItems = [
  {
    q: "What if I have a custom field in my current tool that Limespun doesn't have?",
    a: "We carry it across. Custom fields come over as notes on the client record, so nothing you wrote down is lost.",
  },
  {
    q: "What about client photos in my current tool?",
    a: "If your current tool lets you export them, we bring them across and file them on the client and project.",
  },
  {
    q: "Do I lose any features during the parallel run?",
    a: "No. Your current tool keeps working until you cancel it. When you're ready, point your booking link at Limespun.",
  },
  {
    q: "What if the move takes longer than expected?",
    a: `We keep going until you're moved. Migration costs nothing extra, however long it takes, and every plan has a ${MONEY_BACK_DAYS}-day money-back guarantee.`,
  },
  {
    q: "Is migration included on the Solo plan?",
    a: "Yes. Done-for-you migration is included on every plan, Solo too: our team moves your clients, bookings, deposits and signed forms for you.",
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
          subhead={`We move your clients, bookings, deposits and signed forms for you. Usually a week or two, included on every plan, and your old tool runs alongside until you switch. ${MONEY_BACK_DAYS}-day money-back guarantee.`}
          primaryCTA={{ label: ACCOUNT.signUpLabel, href: ACCOUNT.signUpHref }}
          secondaryCTA={{
            label: "Contact us about switching",
            href: "/contact",
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
                { stat: "Side by side", label: "your old tool runs until cutover" },
                { stat: "Previewed", label: "you check the import before it lands" },
                { stat: `${MONEY_BACK_DAYS} days`, label: "money-back guarantee" },
                { stat: "Your call", label: "you decide when to switch" },
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
                marginBottom: 16,
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
                  gridTemplateColumns: "1fr 1.4fr",
                  columnGap: 16,
                  padding: "14px 24px",
                  borderBottom: `1px solid ${BRAND.border}`,
                  background: BRAND.boneDeep,
                } as React.CSSProperties}
              >
                {["What we move", "What that covers"].map((h) => (
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
                      gridTemplateColumns: "1fr 1.4fr",
                      columnGap: 16,
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
                      {row.item}
                    </div>

                    <div
                      style={{
                        fontFamily: FONT.sans,
                        fontSize: 13,
                        color: BRAND.stoneDark,
                        lineHeight: 1.4,
                      } as React.CSSProperties}
                    >
                      {row.detail}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <p
              style={{
                width: "100%",
                maxWidth: 860,
                margin: "0 0 32px",
                fontFamily: FONT.sans,
                fontSize: 13,
                lineHeight: 1.5,
                color: BRAND.stoneDark,
                textAlign: "center",
              } as React.CSSProperties}
            >
              We work from whatever your current tool lets you export. If something won&apos;t come out
              cleanly, we tell you before you switch.
            </p>

            {/* Deep-dive link grid */}
            <div
              className="migrate-deep-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: 14,
                marginTop: 0,
                width: "100%",
                maxWidth: 960,
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
                flexWrap: "wrap",
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
                  flex: "1 1 280px",
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
                    Migration is included on every plan, and every plan has a{" "}
                    {MONEY_BACK_DAYS}-day money-back guarantee.
                  </div>
                </div>
              </div>

              <div
                style={{ position: "relative", flexShrink: 0 } as React.CSSProperties}
              >
                <a
                  href="/contact"
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
                  Contact us about switching
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
              Four steps. Usually a week or two.
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
          badge="Switching"
          headline="Bring your studio over."
          italicWord="over"
          subhead={`Migration is included on every plan: usually a week or two, with your old tool running alongside until you switch. ${MONEY_BACK_DAYS}-day money-back guarantee.`}
          primaryCTA={{ label: ACCOUNT.signUpLabel, href: ACCOUNT.signUpHref }}
          secondaryCTA={{
            label: "Contact us about switching",
            href: "/contact",
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
