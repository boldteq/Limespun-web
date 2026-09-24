"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, FileText, Droplet, BarChart3 } from "lucide-react";
import { ACCOUNT, BRAND, CTA, FONT, SHADOW, GRADIENT, fadeUp, stagger } from "@/lib/brand";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/shared/hero-section";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { CTASection } from "@/components/shared/cta-section";
import { StatStrip } from "@/components/shared/stat-strip";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { SectionHeading } from "@/components/shared/section-heading";

// ── MoatCardBright (local — lifted from work.tsx) ────────────────────────────

const accentMap = {
  rust:  { color: BRAND.rust,  bg: BRAND.rustWash,  glow: GRADIENT.cardRust  },
  amber: { color: BRAND.amber, bg: BRAND.amberWash, glow: GRADIENT.cardAmber },
  sage:  { color: BRAND.sage,  bg: BRAND.sageWash,  glow: GRADIENT.cardSage  },
} as const;

type AccentKey = keyof typeof accentMap;

interface MoatCardBrightProps {
  accent: AccentKey;
  icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  title: string;
  body: string;
  detail: [string, string][];
}

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
              borderBottom:
                i < detail.length - 1 ? `1px dashed ${a.color}25` : "none",
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

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ReachCompliancePage() {
  return (
    <div>
      <Nav />
      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <HeroSection
          eyebrow="EU REACH ink tracking"
          eyebrowAccent="amber"
          headline="Your REACH ink records, built into the studio."
          italicWord="built"
          subhead="The EU REACH restriction on tattoo inks, in force since January 2022, limits what can be in the bottle. Limespun keeps your records in three places: the Ink registry in Settings, a REACH-registered count on Inventory and a REACH ink disclosure on the consent form. On every plan, Solo included."
          primaryCTA={{ label: ACCOUNT.signUpLabel, href: ACCOUNT.signUpHref }}
          secondaryCTA={{ label: CTA.secondaryLabel, href: CTA.secondaryHref }}
        />

        {/* ── What is REACH ─────────────────────────────────────────────── */}
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
              maxWidth: 1280,
              margin: "0 auto",
              padding: "0 32px",
              position: "relative",
              zIndex: 2,
            } as React.CSSProperties}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: 48, maxWidth: 760 } as React.CSSProperties}
            >
              <SectionEyebrow label="Background" accent="rust" />
              <SectionHeading size="sm">
                What the REACH restriction means for your studio.
              </SectionHeading>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              style={{
                maxWidth: 720,
                background: BRAND.white,
                borderRadius: 20,
                padding: 32,
                boxShadow: SHADOW.soft,
                position: "relative",
                overflow: "hidden",
              } as React.CSSProperties}
            >
              {/* Top gradient strip */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: `linear-gradient(90deg, ${BRAND.rust} 0%, ${BRAND.amber} 100%)`,
                } as React.CSSProperties}
              />
              <p
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: BRAND.stoneDark,
                  marginBottom: 20,
                } as React.CSSProperties}
              >
                REACH is the EU regulation on chemical substances. The EU REACH
                restriction on tattoo inks (Annex XVII, entry 75), in force since January
                2022, restricts specific pigments and additives in tattoo and permanent
                makeup inks.
              </p>
              <p
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: BRAND.stoneDark,
                  marginBottom: 20,
                } as React.CSSProperties}
              >
                In plain terms, three things fall on a studio in the EU: use inks that meet
                the restriction, know which ink and batch went into each client, and share
                the label information with the client. Your supplier formulates the ink;
                the record of what you used is yours.
              </p>
              <p
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: BRAND.stoneDark,
                  marginBottom: 0,
                } as React.CSSProperties}
              >
                Limespun keeps that record in one place. The Ink registry in Settings holds
                each ink&apos;s brand, color, product code and batch number, and whether
                you&apos;ve confirmed it&apos;s REACH compliant. Inventory shows how many of
                your inks are REACH-registered. The consent form carries a REACH ink
                disclosure, so the client signs with the ink details in front of them.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Four pillars ──────────────────────────────────────────────── */}
        <section
          style={{
            background: BRAND.bone,
            paddingTop: 100,
            paddingBottom: 100,
            position: "relative",
            overflow: "hidden",
          } as React.CSSProperties}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 600,
              height: 500,
              background: `radial-gradient(ellipse at 100% 0%, ${BRAND.rustWash} 0%, transparent 60%)`,
              pointerEvents: "none",
            } as React.CSSProperties}
          />
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "0 32px",
              position: "relative",
              zIndex: 2,
            } as React.CSSProperties}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: 48, maxWidth: 760 } as React.CSSProperties}
            >
              <SectionEyebrow label="How Limespun does it" accent="amber" />
              <SectionHeading size="sm">Three screens, one ink record.</SectionHeading>
            </motion.div>

            <style>{`
              @media (max-width: 1024px) {
                .reach-pillars-grid { grid-template-columns: 1fr !important; }
              }
            `}</style>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 18,
              } as React.CSSProperties}
              className="reach-pillars-grid"
            >
              <MoatCardBright
                accent="rust"
                icon={Droplet}
                title="Ink registry"
                body="Register each ink in Settings: brand, color, product code and batch number, with a switch for whether its REACH compliance is confirmed."
                detail={[
                  ["Where", "Settings"],
                  ["Per ink", "Brand, color, batch"],
                  ["REACH compliant", "Confirmed by you"],
                ]}
              />
              <MoatCardBright
                accent="amber"
                icon={BarChart3}
                title="REACH-registered on Inventory"
                body="Inventory counts the inks linked to a registry record and lets you filter to them, so a gap shows up before a client asks."
                detail={[
                  ["Where", "Inventory"],
                  ["Shows", "REACH-registered"],
                  ["Filter", "Yes"],
                ]}
              />
              <MoatCardBright
                accent="sage"
                icon={FileText}
                title="REACH ink disclosure"
                body="Add the REACH ink disclosure section to your consent form. The client reads the ink details and signs, and the signed form is stored with the session."
                detail={[
                  ["Where", "Consent form"],
                  ["Section", "REACH ink disclosure"],
                  ["Signed", "With the form"],
                ]}
              />
              <MoatCardBright
                accent="rust"
                icon={Shield}
                title="On every plan"
                body="EU REACH ink tracking is on Solo, Studio, Pro and Multi-Location. It isn't an add-on, and your ink list moves over with the rest of your data."
                detail={[
                  ["Solo", "Included"],
                  ["Add-on", "None"],
                  ["Your ink list", "Moved for you"],
                ]}
              />
            </div>
          </div>
        </section>

        {/* ── Stats ─────────────────────────────────────────────────────── */}
        <section
          style={{
            background: BRAND.boneDeep,
            paddingTop: 56,
            paddingBottom: 56,
          } as React.CSSProperties}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "0 32px",
            } as React.CSSProperties}
          >
            <StatStrip
              items={[
                { stat: "Settings", label: "Ink registry for every ink" },
                { stat: "Inventory", label: "REACH-registered count" },
                { stat: "Consent form", label: "REACH ink disclosure" },
                { stat: "Every plan", label: "Solo included" },
              ]}
            />
          </div>
        </section>

        {/* ── Early-days note ───────────────────────────────────────────── */}
        <section
          style={{
            background: BRAND.bone,
            paddingTop: 80,
            paddingBottom: 80,
          } as React.CSSProperties}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "0 32px",
              display: "flex",
              justifyContent: "center",
            } as React.CSSProperties}
          >
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              style={{ maxWidth: 560, width: "100%" } as React.CSSProperties}
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
                <SectionEyebrow label="Early days" accent="sage" />
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
                  We&apos;d rather show you the registry than quote a customer we made up.
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
                  Limespun is new, so there are no compliance case studies yet. Create an
                  account and register your first ink in Settings, or send us your ink list
                  and we&apos;ll move it over &mdash; then judge it on the work.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <section
          style={{
            background: BRAND.boneDeep,
            paddingTop: 80,
            paddingBottom: 80,
          } as React.CSSProperties}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "0 32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            } as React.CSSProperties}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: 40, textAlign: "center" } as React.CSSProperties}
            >
              <SectionEyebrow label="Common questions" accent="rust" />
              <SectionHeading size="sm">On REACH compliance.</SectionHeading>
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              style={{ width: "100%" } as React.CSSProperties}
            >
              <FAQAccordion
                accent="rust"
                items={[
                  {
                    q: "Do I need REACH compliance if I'm not in the EU?",
                    a: "The restriction applies to studios in the EU. Outside it, these records aren't a legal requirement, but knowing which ink and batch went into each client is still good practice. Limespun works the same either way.",
                  },
                  {
                    q: "What do I show an inspector?",
                    a: "Open the Ink registry in Settings: every registered ink with its brand, color, product code, batch number and REACH status. Each client's signed consent form carries the REACH ink disclosure.",
                  },
                  {
                    q: "Can I import my existing ink list?",
                    a: "Yes. Send us your list and we move it over for you as part of migration, on every plan.",
                  },
                  {
                    q: "Is the REACH module on every plan?",
                    a: "Yes. EU REACH ink tracking is on every plan, Solo included. It isn't an add-on or a Pro-only feature.",
                  },
                  {
                    q: "Does Limespun check my inks against the restricted substances list?",
                    a: "No. The Ink registry records what you use and whether you've confirmed it's REACH compliant; your supplier's documentation is what confirms it. Limespun keeps that record in one place and puts it on the consent form.",
                  },
                ]}
              />
            </motion.div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <CTASection
          badge="On every plan"
          headline="Stop keeping ink records on a spreadsheet."
          italicWord="spreadsheet"
          subhead="EU REACH ink tracking is on every plan, Solo included. Register your inks in Settings, or send us your list and we'll move it over."
          primaryCTA={{ label: ACCOUNT.signUpLabel, href: ACCOUNT.signUpHref }}
          secondaryCTA={{ label: CTA.secondaryLabel, href: CTA.secondaryHref }}
        />
      </main>
      <Footer />
    </div>
  );
}
