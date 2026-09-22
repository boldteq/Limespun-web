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
import { roadmapItems, statusLabels } from "@/lib/data/roadmap";
import type { RoadmapItem } from "@/lib/data/roadmap";

// ─── Column config ─────────────────────────────────────────────────────────────

interface ColumnConfig {
  status: RoadmapItem['status'];
  accentColor: string;
  accentBg: string;
  countBg: string;
}

const COLUMNS: ColumnConfig[] = [
  { status: 'shipped',     accentColor: BRAND.sage,  accentBg: BRAND.sageSoft,  countBg: BRAND.sageWash },
  { status: 'building',    accentColor: BRAND.rust,  accentBg: BRAND.rustSoft,  countBg: BRAND.rustWash },
  { status: 'next',        accentColor: BRAND.amber, accentBg: BRAND.amberSoft, countBg: BRAND.amberWash },
  { status: 'considering', accentColor: BRAND.stone, accentBg: BRAND.boneDeep,  countBg: BRAND.bone },
];

const MODULE_ACCENTS = [BRAND.rust, BRAND.amber, BRAND.sage];

// ─── Process cards data ────────────────────────────────────────────────────────

const processCards = [
  {
    num: "01",
    accent: BRAND.rust,
    accentBg: BRAND.rustWash,
    title: "Studio votes weighed by use",
    body: "If 200 studios are using a feature regularly, their feature requests carry more weight than a single feature request from someone who hasn't signed up. We track usage telemetry to keep ourselves honest.",
  },
  {
    num: "02",
    accent: BRAND.amber,
    accentBg: BRAND.amberWash,
    title: "We ship slowly and on purpose",
    body: "We average one major release a month. We'd rather skip a quarter than ship something we don't believe in. The graveyard of half-finished features doesn't exist here.",
  },
  {
    num: "03",
    accent: BRAND.sage,
    accentBg: BRAND.sageWash,
    title: "We say no to most things",
    body: "If it's not native to tattoo work, we don't build it. Salons can use a salon SaaS. We're for studios that draw on skin.",
  },
];

// ─── Item card ────────────────────────────────────────────────────────────────

function ItemCard({
  item,
  isShipped,
}: {
  item: RoadmapItem;
  isShipped: boolean;
}) {
  return (
    <div
      style={{
        background: BRAND.white,
        borderRadius: 12,
        padding: 16,
        boxShadow: SHADOW.soft,
        border: `1px solid ${BRAND.borderSoft}`,
        marginBottom: 12,
      } as React.CSSProperties}
    >
      {/* Title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 6,
        } as React.CSSProperties}
      >
        {isShipped && (
          <Check
            size={12}
            color={BRAND.sage}
            strokeWidth={2.5}
            style={{ flexShrink: 0 } as React.CSSProperties}
          />
        )}
        <span
          style={{
            fontFamily: FONT.sans,
            fontSize: 14,
            fontWeight: 600,
            color: BRAND.onyx,
            letterSpacing: "-0.005em",
          } as React.CSSProperties}
        >
          {item.title}
        </span>
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: FONT.sans,
          fontSize: 12.5,
          lineHeight: 1.5,
          color: BRAND.stoneDark,
          marginBottom: 10,
        } as React.CSSProperties}
      >
        {item.description}
      </p>

      {/* Footer row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 6,
        } as React.CSSProperties}
      >
        {/* Module pills */}
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" } as React.CSSProperties}>
          {item.modules.map((mod, mi) => (
            <span
              key={mod}
              style={{
                fontFamily: FONT.sans,
                fontSize: 10,
                fontWeight: 600,
                color: BRAND.white,
                background: MODULE_ACCENTS[mi % MODULE_ACCENTS.length],
                padding: "2px 7px",
                borderRadius: 100,
                letterSpacing: "0.02em",
              } as React.CSSProperties}
            >
              {mod}
            </span>
          ))}
        </div>

        {/* Quarter */}
        <span
          style={{
            fontFamily: FONT.mono,
            fontSize: 10,
            color: BRAND.stoneFaint,
            letterSpacing: "0.04em",
          } as React.CSSProperties}
        >
          {item.quarter}
        </span>
      </div>
    </div>
  );
}

// ─── Board column ─────────────────────────────────────────────────────────────

function BoardColumn({ col }: { col: ColumnConfig }) {
  const items = roadmapItems.filter((r) => r.status === col.status);
  const label = statusLabels[col.status];

  return (
    <motion.div variants={fadeUp}>
      {/* Column header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        } as React.CSSProperties}
      >
        <span
          style={{
            fontFamily: FONT.sans,
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase" as const,
            letterSpacing: "0.06em",
            color: col.accentColor,
          } as React.CSSProperties}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: FONT.mono,
            fontSize: 11,
            color: BRAND.stoneLight,
            background: col.countBg,
            padding: "2px 8px",
            borderRadius: 100,
          } as React.CSSProperties}
        >
          {items.length} {items.length === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Cards */}
      {items.map((item) => (
        <ItemCard
          key={item.title}
          item={item}
          isShipped={col.status === "shipped"}
        />
      ))}
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RoadmapPage() {
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
          eyebrow="Roadmap"
          eyebrowAccent="rust"
          headline="What's shipped. What's building. What's next."
          italicWord="next"
          subhead="The honest version. Updated when the plan changes — not when the marketing team needs a reason to publish a blog post. Vote with your studio: tell us what to build."
          primaryCTA={{ label: "Get started", href: "https://app.limespun.com/signup" }}
          secondaryCTA={{ label: "Request a feature", href: "/contact", icon: "play" }}
        />

        {/* Status board */}
        <section
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
              className="roadmap-board"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 24,
                alignItems: "start",
              } as React.CSSProperties}
            >
              {COLUMNS.map((col) => (
                <BoardColumn key={col.status} col={col} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Process section */}
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
              <SectionEyebrow label="How we decide" accent="amber" />
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
              Three rules.
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
              className="roadmap-process-grid"
            >
              {processCards.map((card) => (
                <motion.div
                  key={card.num}
                  variants={fadeUp}
                  style={{
                    background: BRAND.white,
                    borderRadius: 18,
                    padding: 28,
                    boxShadow: SHADOW.soft,
                    borderTop: `3px solid ${card.accent}`,
                    position: "relative" as const,
                    overflow: "hidden",
                  } as React.CSSProperties}
                >
                  {/* Number */}
                  <div
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 11,
                      fontWeight: 700,
                      color: card.accent,
                      letterSpacing: "0.06em",
                      marginBottom: 14,
                    } as React.CSSProperties}
                  >
                    {card.num}
                  </div>

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

        {/* CTA */}
        <CTASection
          badge="Vote with your studio"
          headline="Tell us what to build."
          italicWord="build"
          subhead="Every paying studio gets a vote. We answer feature requests within 5 business days. Honest yes, no, or 'on the roadmap.'"
          primaryCTA={{ label: "Get started", href: "https://app.limespun.com/signup" }}
          secondaryCTA={{ label: "Request a feature", href: "/contact", icon: "play" }}
        />
      </main>

      <Footer />

      <style>{`
        @media (max-width: 1024px) {
          .roadmap-board { grid-template-columns: repeat(2, 1fr) !important; }
          .roadmap-process-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .roadmap-board { grid-template-columns: 1fr !important; }
          .roadmap-process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
