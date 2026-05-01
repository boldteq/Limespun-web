"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BRAND, FONT, SHADOW, fadeUp } from "@/lib/brand";

export interface RelatedModule {
  icon: LucideIcon;
  label: string;
  desc: string;
  href: string;
  badge?: string;
}

interface ProductRelatedProps {
  eyebrow: string;
  heading: string;
  italicWord?: string;
  modules: RelatedModule[];
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

export function ProductRelated({
  eyebrow,
  heading,
  italicWord,
  modules,
}: ProductRelatedProps) {
  const { before, italic, after } = buildHeadlineParts(heading, italicWord);

  return (
    <section
      style={{
        background: BRAND.bone,
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
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{ marginBottom: 48, maxWidth: 720 } as React.CSSProperties}
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
        </motion.div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${modules.length}, 1fr)`,
            gap: 14,
          } as React.CSSProperties}
          className="td-related-grid"
        >
          {modules.map((mod, i) => (
            <motion.a
              key={i}
              href={mod.href}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{
                y: -2,
                borderColor: BRAND.onyx,
                boxShadow: SHADOW.card,
              }}
              style={{
                background: BRAND.white,
                border: `1px solid ${BRAND.border}`,
                borderRadius: 14,
                padding: "24px 22px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                textDecoration: "none",
                transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
              } as React.CSSProperties}
            >
              {/* Icon square */}
              <div
                style={{
                  width: 38,
                  height: 38,
                  background: BRAND.boneDeep,
                  border: `1px solid ${BRAND.border}`,
                  borderRadius: 9,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                } as React.CSSProperties}
              >
                <mod.icon size={17} color={BRAND.onyx} strokeWidth={2} />
              </div>

              {/* Body */}
              <div style={{ flex: 1 } as React.CSSProperties}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 6,
                  } as React.CSSProperties}
                >
                  <span
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 15,
                      fontWeight: 700,
                      color: BRAND.onyx,
                    } as React.CSSProperties}
                  >
                    {mod.label}
                  </span>
                  {mod.badge && (
                    <span
                      style={{
                        fontFamily: FONT.sans,
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: BRAND.rust,
                        background: BRAND.rustSoft,
                        padding: "2px 7px",
                        borderRadius: 100,
                      } as React.CSSProperties}
                    >
                      {mod.badge}
                    </span>
                  )}
                </div>
                <p
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 12.5,
                    color: BRAND.stoneDark,
                    lineHeight: 1.5,
                    margin: 0,
                  } as React.CSSProperties}
                >
                  {mod.desc}
                </p>
              </div>

              {/* Footer */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontFamily: FONT.sans,
                  fontSize: 12,
                  fontWeight: 600,
                  color: BRAND.onyx,
                } as React.CSSProperties}
              >
                Explore
                <ArrowUpRight size={12} strokeWidth={2.2} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
