"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, FileText, AlertCircle, BarChart3 } from "lucide-react";
import { BRAND, FONT, SHADOW, GRADIENT, fadeUp, stagger } from "@/lib/brand";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/shared/hero-section";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { CTASection } from "@/components/shared/cta-section";
import { TestimonialCard } from "@/components/shared/testimonial-card";
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
          eyebrow="REACH compliance hub"
          eyebrowAccent="amber"
          headline="EU REACH 2022, built into the studio."
          italicWord="built"
          subhead="The European ink registry. MSDS attachments. Batch tracking. Reaction logging. Inspector reports in one click. The compliance layer most studios run on a spreadsheet."
          primaryCTA={{ label: "Start a 14-day trial", href: "https://inkos.up.railway.app/signup" }}
          secondaryCTA={{ label: "Talk to compliance", href: "/book-a-demo" }}
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
                What REACH 2022 means for your studio.
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
                REACH (Registration, Evaluation, Authorisation and Restriction of
                Chemicals) is the EU regulation governing chemical substances. The 2022
                amendment (Annex XVII, entry 75) restricts specific pigments and additives
                in tattoo and permanent makeup inks.
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
                If you operate in any EU member state, your inks must comply. Bottles must
                list CI numbers. MSDS sheets must be on file. Reactions must be logged.
                Inspectors can ask, and &ldquo;we have it on a spreadsheet&rdquo; is no
                longer a defensible answer.
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
                InkOS treats compliance as a feature, not a checkbox. Every bottle in your
                inventory has a CI number, batch ID, MSDS attachment, and shelf-life
                tracking. Reactions are logged on both the client AND the bottle batch.
                Reports export in one click for inspectors.
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
              <SectionEyebrow label="Four compliance pillars" accent="amber" />
              <SectionHeading size="sm">What InkOS automates.</SectionHeading>
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
                icon={Shield}
                title="CI number registry"
                body="Every ink in your cabinet linked to its CI number. Validated against the EU REACH 2022 ink registry. Prohibited substances flagged red."
                detail={[
                  ["Validation", "Against REACH registry"],
                  ["Flagging", "Prohibited subs"],
                  ["Update cycle", "Quarterly"],
                ]}
              />
              <MoatCardBright
                accent="amber"
                icon={FileText}
                title="MSDS attachments"
                body="Material Safety Data Sheets attached to every bottle. PDF, expirable, version-tracked. Inspector pulls the report, the MSDS comes with it."
                detail={[
                  ["Format", "PDF"],
                  ["Storage", "Supabase"],
                  ["Audit", "Version history"],
                ]}
              />
              <MoatCardBright
                accent="sage"
                icon={AlertCircle}
                title="Reaction logging"
                body="Client reacts to red ink? Logged on the client AND the bottle batch. Future studios using the same batch see the warning. Network-wide intelligence."
                detail={[
                  ["Per-client", "Yes"],
                  ["Per-batch", "Yes"],
                  ["Cross-studio", "Opt-in"],
                ]}
              />
              <MoatCardBright
                accent="rust"
                icon={BarChart3}
                title="Inspector reports"
                body="One click exports a PDF: every bottle, every CI, every MSDS, every reaction. Quarterly or on-demand. Submitted to the inspector before they leave."
                detail={[
                  ["Export format", "PDF"],
                  ["Generation time", "<30s"],
                  ["Retention", "7 years"],
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
                { stat: "84", label: "inks tracked, average studio" },
                { stat: "EU REACH 2022", label: "compliant out of the box" },
                { stat: "< 30s", label: "inspector report generation" },
                { stat: "7 years", label: "default retention" },
              ]}
            />
          </div>
        </section>

        {/* ── Testimonial ───────────────────────────────────────────────── */}
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
              style={{ maxWidth: 480, width: "100%" } as React.CSSProperties}
            >
              <TestimonialCard
                name="Asha Mehra"
                role="Solo · Pluma Studio"
                city="Amsterdam, NL"
                chairs="1 chair · by appointment"
                quote="REACH compliance was the unlock. Every bottle on a registry, every reaction logged. I sleep better."
                stats={[
                  { l: "Inks tracked", v: "84" },
                  { l: "Compliance reports", v: "Auto" },
                  { l: "Migration", v: "2 days" },
                ]}
                gradient={`linear-gradient(135deg, ${BRAND.sage} 0%, ${BRAND.rustGlow} 100%)`}
                initials="AM"
              />
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
                    a: "Legally, no. Practically — many EU clients book studios in the UK, US, Australia. If you accept EU clients, the inks they receive must comply. InkOS handles it either way.",
                  },
                  {
                    q: "What happens if an inspector visits unannounced?",
                    a: "You log into InkOS, generate the inspector report, hand them the PDF. <30s start to finish. The report includes every bottle's CI, MSDS, batch, expiry, and reaction history.",
                  },
                  {
                    q: "Can I import my existing ink list?",
                    a: "Yes. CSV import or copy-paste. The migration team helps map existing bottles to REACH records. Studio plan and above includes white-glove.",
                  },
                  {
                    q: "Are there fines for non-compliance?",
                    a: "Yes. EU fines for non-compliance start at €5,000 and scale with studio size. Repeat offences risk operating-licence suspension. The math on InkOS compliance vs a fine: obvious.",
                  },
                  {
                    q: "Is the REACH module on every plan?",
                    a: "Pro plan and above includes the full registry + inspector reports. Solo and Studio plans get the basic ink-tracking module.",
                  },
                  {
                    q: "Do you update when REACH regulations change?",
                    a: "Yes. Quarterly. The 2022 list isn't the final word — the EU is reviewing additional substances. We track changes and update the registry; your studio stays compliant without lifting a finger.",
                  },
                ]}
              />
            </motion.div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <CTASection
          badge="Compliance, automated"
          headline="Stop running compliance on a spreadsheet."
          italicWord="spreadsheet"
          subhead="14-day trial. Drop your ink list in. Watch REACH compliance light up."
          primaryCTA={{ label: "Start a 14-day trial", href: "https://inkos.up.railway.app/signup" }}
          secondaryCTA={{ label: "Talk to compliance", href: "/book-a-demo", icon: "play" }}
        />
      </main>
      <Footer />
    </div>
  );
}
