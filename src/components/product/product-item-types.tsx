"use client";

import React from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { BRAND, FONT } from "@/lib/brand";

export interface ItemType {
  icon: LucideIcon;
  accent: string;
  accentBg?: string;
  severity?: string;
  duration?: string;
  title: string;
  desc: string;
  example: string;
}

interface ProductItemTypesProps {
  eyebrow: string;
  heading: string;
  italicWord?: string;
  intro: string;
  items: ItemType[];
  columns?: 3 | 4;
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

export function ProductItemTypes({
  eyebrow,
  heading,
  italicWord,
  intro,
  items,
  columns = 3,
}: ProductItemTypesProps) {
  const { before, italic, after } = buildHeadlineParts(heading, italicWord);

  return (
    <section
      style={{
        background: BRAND.onyx,
        color: BRAND.bone,
        paddingTop: 120,
        paddingBottom: 120,
      } as React.CSSProperties}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
        } as React.CSSProperties}
      >
        {/* Header */}
        <div
          style={{ marginBottom: 56, maxWidth: 720 } as React.CSSProperties}
        >
          <div
            style={{
              fontFamily: FONT.sans,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: BRAND.stoneLight,
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
              color: BRAND.bone,
              fontWeight: 400,
              marginBottom: 18,
            } as React.CSSProperties}
          >
            {before}
            {italic && (
              <span
                style={{
                  fontStyle: "italic",
                  color: BRAND.rustBright,
                } as React.CSSProperties}
              >
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
              color: BRAND.stoneLight,
            } as React.CSSProperties}
          >
            {intro}
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{ "--cols": columns } as React.CSSProperties}
          className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))]"
        >
          {items.map((item, i) => {
            const iconColor =
              item.accent === BRAND.onyx ? BRAND.bone : item.accent;
            const iconBg = item.accentBg ?? `${item.accent}22`;
            const pillLabel = item.severity ?? item.duration;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: (i % columns) * 0.06,
                }}
                style={{
                  background: "rgba(247,247,245,0.04)",
                  border: "1px solid rgba(247,247,245,0.10)",
                  borderRadius: 14,
                  padding: 22,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                } as React.CSSProperties}
              >
                {/* Top row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  } as React.CSSProperties}
                >
                  {/* Icon square */}
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      background: iconBg,
                      border: `1px solid ${item.accent}50`,
                      borderRadius: 9,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    } as React.CSSProperties}
                  >
                    <item.icon size={16} color={iconColor} strokeWidth={2} />
                  </div>

                  {/* Pill */}
                  {pillLabel && (
                    <div
                      style={{
                        fontFamily: FONT.sans,
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: item.accent === BRAND.onyx ? BRAND.bone : item.accent,
                        background: `${item.accent}15`,
                        border: `1px solid ${item.accent}30`,
                        padding: "3px 8px",
                        borderRadius: 100,
                      } as React.CSSProperties}
                    >
                      {pillLabel}
                    </div>
                  )}
                </div>

                {/* Body */}
                <div>
                  <div
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 15,
                      fontWeight: 700,
                      color: BRAND.bone,
                      marginBottom: 6,
                    } as React.CSSProperties}
                  >
                    {item.title}
                  </div>
                  <p
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 12.5,
                      lineHeight: 1.55,
                      color: BRAND.stoneLight,
                      marginBottom: 12,
                      margin: "0 0 12px 0",
                    } as React.CSSProperties}
                  >
                    {item.desc}
                  </p>
                  <div
                    style={{
                      fontFamily: FONT.serif,
                      fontStyle: "italic",
                      fontSize: 13,
                      color: BRAND.bone,
                      paddingLeft: 11,
                      borderLeft: `2px solid ${
                        item.accent === BRAND.onyx ? BRAND.bone : item.accent
                      }`,
                    } as React.CSSProperties}
                  >
                    {item.example}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
