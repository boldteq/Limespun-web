"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/shared/hero-section";
import { CTASection } from "@/components/shared/cta-section";
import { BRAND, FONT, SHADOW, fadeUp, stagger } from "@/lib/brand";
import { changelogEntries, type ChangelogEntry } from "@/lib/data/changelog";

// ─── Types ────────────────────────────────────────────────────────────────────
type TypeFilter = "all" | ChangelogEntry["type"];

const TYPE_FILTER_OPTIONS: { key: TypeFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "release", label: "Release" },
  { key: "improvement", label: "Improvement" },
  { key: "fix", label: "Fix" },
];

// ─── Type badge colors ────────────────────────────────────────────────────────
const TYPE_STYLES: Record<
  ChangelogEntry["type"],
  { bg: string; color: string; dotColor: string }
> = {
  release: {
    bg: BRAND.rustWash,
    color: BRAND.rust,
    dotColor: BRAND.rust,
  },
  improvement: {
    bg: BRAND.amberWash,
    color: BRAND.amber,
    dotColor: BRAND.amber,
  },
  fix: {
    bg: BRAND.sageWash,
    color: BRAND.sage,
    dotColor: BRAND.sage,
  },
};

// ─── Module pill ──────────────────────────────────────────────────────────────
function ModulePill({ label }: { label: string }) {
  return (
    <span
      style={{
        fontFamily: FONT.sans,
        fontSize: 11,
        fontWeight: 600,
        color: BRAND.stoneDark,
        background: BRAND.boneDeep,
        padding: "4px 10px",
        borderRadius: 100,
        display: "inline-block",
      } as React.CSSProperties}
    >
      {label}
    </span>
  );
}

// ─── Filter chip ──────────────────────────────────────────────────────────────
function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: FONT.sans,
        fontSize: 13,
        fontWeight: active ? 600 : 400,
        color: active ? BRAND.white : BRAND.stoneDark,
        background: active ? BRAND.onyx : BRAND.white,
        border: `1px solid ${active ? BRAND.onyx : BRAND.border}`,
        borderRadius: 100,
        padding: "8px 18px",
        cursor: "pointer",
        transition: "all 0.18s ease",
      } as React.CSSProperties}
    >
      {label}
    </button>
  );
}

// ─── Changelog entry card ─────────────────────────────────────────────────────
function ChangelogCard({
  entry,
  index,
  isLast,
}: {
  entry: ChangelogEntry;
  index: number;
  isLast: boolean;
}) {
  const typeStyle = TYPE_STYLES[entry.type];
  const formattedDate = new Date(entry.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      style={{
        display: "flex",
        gap: 24,
        position: "relative",
      } as React.CSSProperties}
    >
      {/* Left rail */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
          width: 20,
        } as React.CSSProperties}
      >
        {/* Dot */}
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: typeStyle.dotColor,
            flexShrink: 0,
            marginTop: 6,
            boxShadow: `0 0 0 3px ${typeStyle.bg}`,
          } as React.CSSProperties}
        />
        {/* Connector line */}
        {!isLast && (
          <div
            style={{
              flex: 1,
              width: 1,
              background: BRAND.borderSoft,
              marginTop: 8,
              marginBottom: 0,
              minHeight: 24,
            } as React.CSSProperties}
          />
        )}
      </div>

      {/* Card */}
      <div
        style={{
          flex: 1,
          background: BRAND.white,
          borderRadius: 14,
          padding: 24,
          boxShadow: SHADOW.soft,
          border: `1px solid ${BRAND.borderSoft}`,
          marginBottom: isLast ? 0 : 18,
        } as React.CSSProperties}
      >
        {/* Top row: version + date + type badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 12,
            flexWrap: "wrap",
          } as React.CSSProperties}
        >
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 13,
              fontWeight: 700,
              color: BRAND.onyx,
            } as React.CSSProperties}
          >
            {entry.version}
          </span>

          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 12,
              color: BRAND.stoneFaint,
            } as React.CSSProperties}
          >
            {formattedDate}
          </span>

          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 10,
              fontWeight: 600,
              color: typeStyle.color,
              background: typeStyle.bg,
              padding: "3px 9px",
              borderRadius: 100,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            } as React.CSSProperties}
          >
            {entry.type}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: FONT.sans,
            fontSize: 19,
            fontWeight: 600,
            color: BRAND.onyx,
            letterSpacing: "-0.015em",
            lineHeight: 1.3,
            marginBottom: 14,
          } as React.CSSProperties}
        >
          {entry.title}
        </h3>

        {/* Highlights list */}
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "0 0 16px 0",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          } as React.CSSProperties}
        >
          {entry.highlights.map((highlight, hi) => (
            <li
              key={hi}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
              } as React.CSSProperties}
            >
              <Check
                size={14}
                color={BRAND.sage}
                style={{ flexShrink: 0, marginTop: 3 } as React.CSSProperties}
              />
              <span
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: BRAND.stoneDark,
                } as React.CSSProperties}
              >
                {highlight}
              </span>
            </li>
          ))}
        </ul>

        {/* Module tags */}
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
          } as React.CSSProperties}
        >
          {entry.modules.map((mod) => (
            <ModulePill key={mod} label={mod} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ChangelogPage() {
  const [activeFilter, setActiveFilter] = useState<TypeFilter>("all");

  const filtered =
    activeFilter === "all"
      ? changelogEntries
      : changelogEntries.filter((e) => e.type === activeFilter);

  return (
    <div>
      <Nav />
      <main>
        <HeroSection
          variant="centered"
          eyebrow="Changelog"
          eyebrowAccent="amber"
          headline="What's shipped, when, and why."
          italicWord="why"
          subhead="Public ship log. Every release. Every fix. Every improvement. We update this on the same day we deploy. The opposite of a 'product hunt' marketing page."
          primaryCTA={{
            label: "Start a 14-day trial",
            href: "https://inkos.up.railway.app/signup",
          }}
          secondaryCTA={{ label: "See roadmap", href: "/roadmap" }}
        />

        {/* Timeline section */}
        <section
          style={{
            background: BRAND.bone,
            paddingTop: 100,
            paddingBottom: 100,
          } as React.CSSProperties}
        >
          <div
            style={{
              maxWidth: 920,
              margin: "0 auto",
              padding: "0 32px",
            } as React.CSSProperties}
          >
            {/* Filter chips */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
                marginBottom: 56,
              } as React.CSSProperties}
            >
              {TYPE_FILTER_OPTIONS.map((opt) => (
                <FilterChip
                  key={opt.key}
                  label={opt.label}
                  active={activeFilter === opt.key}
                  onClick={() => setActiveFilter(opt.key)}
                />
              ))}
            </div>

            {/* Timeline entries */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              style={{
                display: "flex",
                flexDirection: "column",
              } as React.CSSProperties}
            >
              {filtered.map((entry, i) => (
                <ChangelogCard
                  key={`${entry.version}-${entry.date}`}
                  entry={entry}
                  index={i}
                  isLast={i === filtered.length - 1}
                />
              ))}
            </motion.div>

            {filtered.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  paddingTop: 80,
                  paddingBottom: 80,
                } as React.CSSProperties}
              >
                <p
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 16,
                    color: BRAND.stoneLight,
                  } as React.CSSProperties}
                >
                  No entries in this category yet.
                </p>
              </div>
            )}
          </div>
        </section>

        <CTASection
          badge="Always shipping"
          headline="Try the latest."
          italicWord="latest"
          subhead="14-day trial includes everything in this changelog. No card. Updates auto-apply — you'll always be on the latest."
          primaryCTA={{
            label: "Start a 14-day trial",
            href: "https://inkos.up.railway.app/signup",
          }}
          secondaryCTA={{
            label: "See roadmap",
            href: "/roadmap",
            icon: "play",
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
