"use client";

import React from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, FileText, Download, Mail } from "lucide-react";
import { BRAND, CONTACT_EMAIL, FONT, HOME, SHADOW, GRADIENT, fadeUp, stagger } from "@/lib/brand";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/shared/hero-section";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { CTASection } from "@/components/shared/cta-section";
import { LimespunMark } from "@/components/brand/limespun-mark";
import {
  PLANS,
  formatPrice,
  ANNUAL_DISCOUNT_PERCENT,
  FOUNDING_OFFER_OPEN,
  FOUNDING_OFFER_SIZE,
} from "@/lib/data/plans";

/** Press questions go to the main inbox; the subject line marks them as press. */
const pressMail = (subject: string): string => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

const [SOLO] = PLANS.filter((p) => p.tier === "solo");
const [MULTI] = PLANS.filter((p) => p.tier === "enterprise");

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
  { label: "Company:", value: "Boldteq Holdings" },
  { label: "Founded:", value: "2024" },
  {
    label: "Status:",
    value: `Live — studios sign up and pay monthly or yearly${
      FOUNDING_OFFER_OPEN ? `, or once on the founding lifetime offer (first ${FOUNDING_OFFER_SIZE} studios)` : ""
    }`,
  },
  {
    label: "Pricing:",
    value: `${formatPrice(SOLO.monthlyCents)} / mo (Solo) to ${formatPrice(MULTI.monthlyCents)} / mo flat (${MULTI.name}); ${ANNUAL_DISCOUNT_PERCENT}% off billed yearly`,
  },
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
    name: "Ember",
    description: "The one accent. The mark, highlights and the italic word in a headline.",
    hex: HOME.ember,
    swatch: HOME.ember,
  },
  {
    name: "Graphite",
    description: "Text and the primary button.",
    hex: HOME.graphite,
    swatch: HOME.graphite,
  },
  {
    name: "Canvas",
    description: "The warm off-white behind every page.",
    hex: HOME.canvas,
    swatch: HOME.canvas,
  },
];

// ─── Download cards ───────────────────────────────────────────────────────────
interface DownloadCard {
  accent: AccentColor;
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  /** Direct file download (true) vs. a request-by-email link (false). */
  isFile: boolean;
}

const DOWNLOAD_CARDS: DownloadCard[] = [
  {
    accent: "rust",
    icon: <ImageIcon size={20} strokeWidth={1.8} />,
    title: "Logo mark (.svg)",
    description:
      "The Limespun mark as a full-colour vector on a transparent background. Scales to any size.",
    href: "/brand/limespun-mark.svg",
    isFile: true,
  },
  {
    accent: "amber",
    icon: <ImageIcon size={20} strokeWidth={1.8} />,
    title: "Product screenshots",
    description:
      "Today, Calendar, Projects, Inventory, Forms. Sent on request so they match the current build and your layout.",
    href: pressMail("Press: screenshot request"),
    isFile: false,
  },
  {
    accent: "sage",
    icon: <FileText size={20} strokeWidth={1.8} />,
    title: "Full brand kit",
    description:
      "Logo variants (PNG, mono), colour guide, typography spec and founder bio. Emailed so you never work from an outdated file.",
    href: pressMail("Press: brand kit request"),
    isFile: false,
  },
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
        download={card.isFile ? "" : undefined}
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
        {card.isFile ? (
          <Download size={12} strokeWidth={2.2} />
        ) : (
          <Mail size={12} strokeWidth={2.2} />
        )}
        {card.isFile ? "Download" : "Request by email"}
      </a>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PressPage() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection
          variant="centered"
          eyebrow="Press kit"
          eyebrowAccent="rust"
          headline="Everything you need to write about us."
          italicWord="us"
          subhead={`Brand assets, the facts and the founder's contact. Screenshots and the full kit on request. Press questions go to ${CONTACT_EMAIL}, and we reply within one business day.`}
          primaryCTA={{ label: `Email ${CONTACT_EMAIL}`, href: pressMail("Press") }}
          secondaryCTA={{ label: "Get brand assets", href: "#download" }}
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
              The short version.
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
              Three colours, one accent.
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
                  <div style={{ height: 140, background: c.swatch, borderBottom: `1px solid ${HOME.hair}` }} />
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
                The Limespun mark. Download the SVG below, or email us for PNG and
                mono versions.
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
              Brand assets.
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
                  {CONTACT_EMAIL}
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
                  Press and media questions. Put &ldquo;Press&rdquo; in the subject line and
                  we reply within one business day. Embargoes respected.
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
                  Topics: building software for one craft, the EU REACH ink rules for
                  tattoo studios, and why salon software doesn&rsquo;t fit tattoo.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─── Coverage ───────────────────────────────────────────────────────── */}
        <section style={{ background: BRAND.bone, paddingTop: 80, paddingBottom: 100 }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>
            <SectionEyebrow label="Coverage" accent="amber" />
            <h2
              style={{
                fontFamily: FONT.serif,
                fontSize: "clamp(28px, 3.5vw, 44px)",
                fontWeight: 400,
                color: BRAND.onyx,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                marginBottom: 24,
                marginTop: 0,
              }}
            >
              No headlines yet. That&rsquo;s on purpose.
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              style={{
                background: BRAND.white,
                maxWidth: 720,
                borderRadius: 16,
                padding: 28,
                boxShadow: SHADOW.soft,
              }}
            >
              <p
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 15,
                  color: BRAND.stoneDark,
                  lineHeight: 1.65,
                  margin: "0 0 14px",
                }}
              >
                Limespun is new. We&rsquo;re spending our energy on the product and the studios
                using it rather than on a press push, so there&rsquo;s no coverage to point you
                to yet.
              </p>
              <p
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 15,
                  color: BRAND.stoneDark,
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                If you&rsquo;re writing about tattoo, studio software or independent craft
                businesses, we&rsquo;d still love to talk, and the founder is happy to answer
                questions. Email{" "}
                <a
                  href={pressMail("Press")}
                  style={{ color: BRAND.onyx, textDecoration: "underline" }}
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─── CTA ──────────────────────────────────────────────────────────────── */}
        <CTASection
          badge="On the record"
          headline="Get in touch."
          italicWord="touch"
          subhead="Founder available for interview. Brand assets are above; screenshots and the full kit come by email."
          primaryCTA={{ label: `Email ${CONTACT_EMAIL}`, href: pressMail("Press") }}
          secondaryCTA={{ label: "About Limespun", href: "/about" }}
        />
      </main>
      <Footer />

      <style>{`
        @media (max-width: 1024px) {
          .press-colors { grid-template-columns: 1fr !important; }
          .press-downloads { grid-template-columns: 1fr !important; }
          .press-contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
