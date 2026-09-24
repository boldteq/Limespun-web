"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BRAND, FONT, fadeUp, stagger } from "@/lib/brand";

export interface Pillar {
  icon: LucideIcon;
  accent: string;
  eyebrow: string;
  title: string;
  desc: string;
  bullets: string[];
}

interface ProductPillarsProps {
  eyebrow: string;
  heading: string;
  italicWord?: string;
  intro: string;
  pillars: Pillar[];
}

function buildHeadlineParts(heading: string, italicWord?: string) {
  if (!italicWord) return { before: heading, italic: "", after: "" };
  const idx = heading.indexOf(italicWord);
  if (idx === -1) return { before: heading, italic: "", after: "" };
  return {
    before: heading.slice(0, idx),
    italic: italicWord,
    after: heading.slice(idx + italicWord.length),
  };
}

export function ProductPillars({
  eyebrow,
  heading,
  italicWord,
  intro,
  pillars,
}: ProductPillarsProps) {
  const { before, italic, after } = buildHeadlineParts(heading, italicWord);

  return (
    <section
      style={{
        background: BRAND.boneCream,
        paddingTop: 120,
        paddingBottom: 120,
        borderTop: `1px solid ${BRAND.border}`,
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
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Header */}
          <motion.div
            variants={fadeUp}
            style={{ marginBottom: 64, maxWidth: 720 } as React.CSSProperties}
          >
            <div
              style={{
                fontFamily: FONT.sans,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: BRAND.stoneDark,
                marginBottom: 16,
              } as React.CSSProperties}
            >
              {eyebrow}
            </div>

            <h2
              style={{
                fontFamily: FONT.serif,
                fontSize: "clamp(38px, 5vw, 60px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: BRAND.onyx,
                fontWeight: 400,
                marginBottom: 18,
              } as React.CSSProperties}
            >
              {before}
              {italic && (
                <span style={{ fontStyle: "italic" } as React.CSSProperties}>
                  {italic}
                </span>
              )}
              {after}
            </h2>

            <p
              style={{
                fontFamily: FONT.sans,
                fontSize: 16,
                lineHeight: 1.6,
                color: BRAND.stoneDark,
              } as React.CSSProperties}
            >
              {intro}
            </p>
          </motion.div>

          {/* Pillars grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                style={{
                  background: BRAND.white,
                  border: `1px solid ${BRAND.border}`,
                  borderRadius: 16,
                  padding: "28px 26px",
                  display: "flex",
                  flexDirection: "column",
                } as React.CSSProperties}
              >
                {/* Icon square */}
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: `${pillar.accent}14`,
                    border: `1px solid ${pillar.accent}30`,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 22,
                    flexShrink: 0,
                  } as React.CSSProperties}
                >
                  <pillar.icon size={20} color={pillar.accent} strokeWidth={2} />
                </div>

                {/* Eyebrow */}
                <div
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 10.5,
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: pillar.accent,
                    marginBottom: 10,
                  } as React.CSSProperties}
                >
                  {pillar.eyebrow}
                </div>

                {/* Title */}
                <div
                  style={{
                    fontFamily: FONT.serif,
                    fontSize: 26,
                    lineHeight: 1.15,
                    color: BRAND.onyx,
                    letterSpacing: "-0.01em",
                    fontWeight: 400,
                    marginBottom: 14,
                  } as React.CSSProperties}
                >
                  {pillar.title}
                </div>

                {/* Desc */}
                <p
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 13.5,
                    lineHeight: 1.6,
                    color: BRAND.stoneDark,
                    marginBottom: 22,
                    flex: 1,
                  } as React.CSSProperties}
                >
                  {pillar.desc}
                </p>

                {/* Bullets */}
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    borderTop: `1px solid ${BRAND.borderSoft}`,
                    paddingTop: 18,
                  } as React.CSSProperties}
                >
                  {pillar.bullets.map((bullet, j) => (
                    <li
                      key={j}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 9,
                      } as React.CSSProperties}
                    >
                      <CheckCircle2
                        size={13}
                        color={BRAND.onyx}
                        strokeWidth={2.2}
                        style={{ flexShrink: 0, marginTop: 2 } as React.CSSProperties}
                      />
                      <span
                        style={{
                          fontFamily: FONT.sans,
                          fontSize: 12.5,
                          color: BRAND.stoneDark,
                          lineHeight: 1.5,
                        } as React.CSSProperties}
                      >
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
