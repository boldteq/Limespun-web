"use client";

import React from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, FileText, Download } from "lucide-react";
import { BRAND, FONT, SHADOW, GRADIENT, fadeUp, stagger } from "@/lib/brand";
import { HeroSection } from "@/components/shared/hero-section";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { CTASection } from "@/components/shared/cta-section";
import { LimespunMark } from "@/components/brand/limespun-mark";

// ─── Accent tokens ────────────────────────────────────────────────────────────
type AccentColor = "rust" | "amber" | "sage";

const accentTokens: Record<AccentColor, { color: string; bg: string; border: string }> = {
  rust: { color: BRAND.rust, bg: BRAND.rustWash, border: BRAND.rustSoft },
  amber: { color: BRAND.amber, bg: BRAND.amberWash, border: BRAND.amberSoft },
  sage: { color: BRAND.sage, bg: BRAND.sageWash, border: BRAND.sageSoft },
};

// ─── Factsheet rows ───────────────────────────────────────────────────────────
const FACTSHEET_ROWS: { label: string; value: string }[] = [
  { label: "Product:", value: "Limespun — the studio operating system for tattoo" },
  { label: "Company:", value: "Boldteq Holdings (registered United Kingdom)" },
  { label: "Founded:", value: "2024" },
  { label: "Beta launch:", value: "April 2026" },
  { label: "Customers:", value: "1,200+ artists across 47 countries" },
  { label: "Pricing:", value: "$29 / mo (Solo) to $199 / mo per location (Enterprise)" },
];

// ─── Colour swatches ──────────────────────────────────────────────────────────
interface ColourCard {
  name: string;
  description: string;
  hex: string;
  swatch: string;
}

const COLOUR_CARDS: ColourCard[] = [
  {
    name: "Rust / Artist",
    description: "The maker. Italic emphasis. Primary CTA. Allergy alerts.",
    hex: "#C8351F",
    swatch: BRAND.rust,
  },
  {
    name: "Amber / Ink",
    description: "The medium. Warmth. Healing stage.",
    hex: "#D89538",
    swatch: BRAND.amber,
  },
  {
    name: "Sage / Skin",
    description: "The canvas. Success. Healed stage.",
    hex: "#5C8A55",
    swatch: BRAND.sage,
  },
];

// ─── Download cards ───────────────────────────────────────────────────────────
interface DownloadCard {
  accent: AccentColor;
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

const DOWNLOAD_CARDS: DownloadCard[] = [
  {
    accent: "rust",
    icon: <ImageIcon size={20} strokeWidth={1.8} />,
    title: "Brand kit (.zip, 4.2MB)",
    description:
      "Logos: SVG, PNG, mono / colour. Three-circles mark. Brand colours guide. Typography spec.",
    href: "#",
  },
  {
    accent: "amber",
    icon: <ImageIcon size={20} strokeWidth={1.8} />,
    title: "Product screenshots (.zip, 18MB)",
    description:
      "Today, Calendar, Projects, Inventory, Forms. PNG + JPG. Light & dark.",
    href: "#",
  },
  {
    accent: "sage",
    icon: <FileText size={20} strokeWidth={1.8} />,
    title: "Factsheet (.pdf, 220KB)",
    description:
      "One-page company snapshot. Founder bio. Key dates. Customer numbers. Press contacts.",
    href: "#",
  },
];

// ─── Press coverage placeholders ──────────────────────────────────────────────
const COVERAGE_PLACEHOLDERS = [
  { outlet: "Inked Magazine", quote: '"Limespun is quietly changing how tattoo studios run their businesses."', date: "Mar 2026" },
  { outlet: "Total Tattoo", quote: '"Finally, software built by people who understand the craft."', date: "Feb 2026" },
  { outlet: "Tattoo Life", quote: '"From walk-ins to REACH compliance — Limespun covers it all."', date: "Jan 2026" },
];

// ─── Download Card Component ──────────────────────────────────────────────────
function DownloadCardItem({ card }: { card: DownloadCard }) {
  const tokens = accentTokens[card.accent];
  return (
    <motion.div
      variants={fadeUp}
      style={{
        background: BRAND.white,
        borderRadius: 16,
        padding: 24,
        boxShadow: SHADOW.soft,
        borderTop: `3px solid ${tokens.color}`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: tokens.bg,
          border: `1px solid ${tokens.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: tokens.color,
          marginBottom: 16,
        }}
      >
        {card.icon}
      </div>
      <div
        style={{
          fontFamily: FONT.sans,
          fontSize: 15,
          fontWeight: 700,
          color: BRAND.onyx,
          marginBottom: 8,
        }}
      >
        {card.title}
      </div>
      <p
        style={{
          fontFamily: FONT.sans,
          fontSize: 13,
          color: BRAND.stoneDark,
          lineHeight: 1.55,
          flex: 1,
          marginBottom: 20,
        }}
      >
        {card.description}
      </p>
      <a
        href={card.href}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontFamily: FONT.sans,
          fontSize: 13,
          fontWeight: 600,
          color: tokens.color,
          textDecoration: "none",
        }}
      >
        <Download size={12} strokeWidth={2.2} />
        Download
      </a>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PressPage() {
  return (
    <>
      <HeroSection
        variant="centered"
        eyebrow="Press kit"
        eyebrowAccent="rust"
        headline="Everything you need to write about us."
        italicWord="us"
        subhead="Brand assets, product screenshots, factsheet, founder bio, key dates. Pre-cleared for journalists. Press inquiries go to press@boldteq.com — we answer within one business day."
        primaryCTA={{ label: "Email press@boldteq.com", href: "mailto:press@boldteq.com" }}
        secondaryCTA={{ label: "Download brand kit (.zip)", href: "#download" }}
      />

      {/* ─── Brand at a glance ────────────────────────────────────────────────── */}
      <section style={{ background: BRAND.bone, paddingTop: 100, paddingBottom: 100 }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>
          <SectionEyebrow label="At a glance" accent="amber" />
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
            Limespun in five lines.
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: BRAND.white,
              maxWidth: 720,
              borderRadius: 18,
              padding: 32,
              boxShadow: SHADOW.soft,
            }}
          >
            {FACTSHEET_ROWS.map((row, i) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 16,
                  paddingTop: 10,
                  paddingBottom: 10,
                  borderBottom:
                    i < FACTSHEET_ROWS.length - 1
                      ? `1px dashed ${BRAND.border}`
                      : "none",
                }}
              >
                <span
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 12,
                    fontWeight: 600,
                    color: BRAND.stoneFaint,
                    minWidth: 90,
                    flexShrink: 0,
                  }}
                >
                  {row.label}
                </span>
                <span
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 14,
                    color: BRAND.stoneDark,
                    lineHeight: 1.5,
                  }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Brand colours ────────────────────────────────────────────────────── */}
      <section style={{ background: GRADIENT.sectionWarm, paddingTop: 100, paddingBottom: 100 }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>
          <SectionEyebrow label="The palette" accent="rust" />
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
            Three colours, one motif.
          </h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="press-colors"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
              marginBottom: 32,
            }}
          >
            {COLOUR_CARDS.map((c) => (
              <motion.div
                key={c.hex}
                variants={fadeUp}
                style={{
                  background: BRAND.white,
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: SHADOW.soft,
                }}
              >
                <div style={{ height: 140, background: c.swatch }} />
                <div style={{ padding: 20 }}>
                  <div
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 16,
                      fontWeight: 700,
                      color: BRAND.onyx,
                      marginBottom: 6,
                    }}
                  >
                    {c.name}
                  </div>
                  <p
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 13,
                      color: BRAND.stoneDark,
                      lineHeight: 1.55,
                      margin: "0 0 10px",
                    }}
                  >
                    {c.description}
                  </p>
                  <div
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 13,
                      fontWeight: 600,
                      color: BRAND.stoneFaint,
                    }}
                  >
                    {c.hex}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Three circles motif card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              background: BRAND.white,
              maxWidth: 720,
              margin: "0 auto",
              borderRadius: 16,
              padding: 28,
              boxShadow: SHADOW.soft,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 16,
            }}
          >
            <LimespunMark size={100} />
            <p
              style={{
                fontFamily: FONT.sans,
                fontSize: 14,
                color: BRAND.stoneDark,
                lineHeight: 1.6,
                maxWidth: 440,
                margin: 0,
              }}
            >
              Artist · Ink · Skin — three intersecting circles. The recurring brand mark,
              available in SVG and PNG in the kit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Download section ─────────────────────────────────────────────────── */}
      <section
        id="download"
        style={{ background: BRAND.bone, paddingTop: 100, paddingBottom: 100 }}
      >
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>
          <SectionEyebrow label="Download" accent="sage" />
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
            Brand kit + screenshots.
          </h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="press-downloads"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
          >
            {DOWNLOAD_CARDS.map((card) => (
              <DownloadCardItem key={card.title} card={card} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Press contact + founder ──────────────────────────────────────────── */}
      <section style={{ background: GRADIENT.sectionCool, paddingTop: 100, paddingBottom: 100 }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="press-contact-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 32,
            }}
          >
            {/* Press contact */}
            <motion.div
              variants={fadeUp}
              style={{
                background: BRAND.white,
                borderRadius: 16,
                padding: 32,
                boxShadow: SHADOW.soft,
              }}
            >
              <div
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 12,
                  fontWeight: 600,
                  color: BRAND.stoneFaint,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 16,
                }}
              >
                Press contact
              </div>
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 14,
                  color: BRAND.onyx,
                  fontWeight: 600,
                  marginBottom: 12,
                }}
              >
                press@boldteq.com
              </div>
              <p
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 14,
                  color: BRAND.stoneDark,
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                All press / media inquiries. We answer within one business day.
                Embargoed announcements honoured.
              </p>
            </motion.div>

            {/* Founder */}
            <motion.div
              variants={fadeUp}
              style={{
                background: BRAND.white,
                borderRadius: 16,
                padding: 32,
                boxShadow: SHADOW.soft,
              }}
            >
              <div
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 12,
                  fontWeight: 600,
                  color: BRAND.stoneFaint,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 16,
                }}
              >
                Founder available for interview
              </div>
              <div
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 15,
                  fontWeight: 700,
                  color: BRAND.onyx,
                  marginBottom: 12,
                }}
              >
                Yash Baldha · Founder · Boldteq
              </div>
              <p
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 14,
                  color: BRAND.stoneDark,
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                Available for podcast, video, written interview. Speaks English.
                Topics: building software for craft industries, the post-Series-B
                small team thesis, EU REACH 2022 compliance for tattoo, the
                salon-vs-tattoo software divide.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Recent coverage ──────────────────────────────────────────────────── */}
      <section style={{ background: BRAND.bone, paddingTop: 80, paddingBottom: 100 }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>
          <SectionEyebrow label="Recent coverage" accent="amber" />
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
            Where we&rsquo;ve been mentioned.
          </h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="press-coverage"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
          >
            {COVERAGE_PLACEHOLDERS.map((item) => (
              <motion.div
                key={item.outlet}
                variants={fadeUp}
                style={{
                  background: BRAND.white,
                  borderRadius: 16,
                  padding: 28,
                  boxShadow: SHADOW.soft,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT.serif,
                    fontStyle: "italic",
                    fontSize: 22,
                    color: BRAND.stoneDark,
                    marginBottom: 16,
                  }}
                >
                  {item.outlet}
                </div>
                <p
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 14,
                    fontStyle: "italic",
                    color: BRAND.stoneDark,
                    lineHeight: 1.6,
                    marginBottom: 16,
                  }}
                >
                  {item.quote}
                </p>
                <div
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 11,
                    color: BRAND.stoneFaint,
                  }}
                >
                  {item.date}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <p
            style={{
              textAlign: "center",
              fontFamily: FONT.sans,
              fontSize: 13,
              color: BRAND.stoneFaint,
              marginTop: 24,
            }}
          >
            Full coverage list:{" "}
            <a
              href="mailto:press@boldteq.com"
              style={{ color: BRAND.stoneDark, textDecoration: "underline" }}
            >
              press@boldteq.com
            </a>
          </p>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────────────── */}
      <CTASection
        badge="On the record"
        headline="Get in touch."
        italicWord="touch"
        subhead="press@boldteq.com — embargoes honoured, founder available for interview, brand kit at /press#download."
        primaryCTA={{ label: "Email press@boldteq.com", href: "mailto:press@boldteq.com" }}
        secondaryCTA={{ label: "About Limespun", href: "/about", icon: "play" }}
      />

      <style>{`
        @media (max-width: 1024px) {
          .press-colors { grid-template-columns: 1fr !important; }
          .press-downloads { grid-template-columns: 1fr !important; }
          .press-contact-grid { grid-template-columns: 1fr !important; }
          .press-coverage { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
