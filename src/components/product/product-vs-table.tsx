"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { BRAND, FONT, fadeUp } from "@/lib/brand";

export type CellValue = boolean | string;

export interface VsTableRow {
  feature: string;
  values: boolean[];
}

interface ProductVsTableProps {
  eyebrow: string;
  heading: string;
  italicWord?: string;
  intro?: string;
  competitors: string[];
  rows: VsTableRow[];
  caption?: string;
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

export function ProductVsTable({
  eyebrow,
  heading,
  italicWord,
  intro,
  competitors,
  rows,
  caption,
}: ProductVsTableProps) {
  const { before, italic, after } = buildHeadlineParts(heading, italicWord);
  const colCount = competitors.length;
  const gridTemplate = `1.6fr repeat(${colCount}, 1fr)`;

  return (
    <section
      style={{
        background: BRAND.bone,
        paddingTop: 120,
        paddingBottom: 120,
      } as React.CSSProperties}
    >
      <div
        style={{
          maxWidth: 1100,
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
              marginBottom: intro ? 18 : 0,
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

          {intro && (
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
          )}
        </motion.div>

        {/* Table card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: BRAND.white,
            border: `1px solid ${BRAND.border}`,
            borderRadius: 16,
            overflow: "hidden",
          } as React.CSSProperties}
        >
          {/* Header row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: gridTemplate,
              background: BRAND.boneCream,
              borderBottom: `1px solid ${BRAND.border}`,
            } as React.CSSProperties}
          >
            {/* "Capability" label */}
            <div
              style={{
                padding: "16px 24px",
                fontFamily: FONT.sans,
                fontSize: 11,
                fontWeight: 700,
                color: BRAND.stoneDark,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              } as React.CSSProperties}
            >
              Capability
            </div>

            {competitors.map((name, ci) => (
              <div
                key={ci}
                style={{
                  padding: "16px 14px",
                  textAlign: "center",
                  fontFamily: FONT.sans,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  borderLeft: `1px solid ${BRAND.border}`,
                  background: ci === 0 ? BRAND.boneDeep : "transparent",
                  color: ci === 0 ? BRAND.onyx : BRAND.stoneDark,
                } as React.CSSProperties}
              >
                {name}
              </div>
            ))}
          </div>

          {/* Body rows */}
          {rows.map((row, ri) => (
            <div
              key={ri}
              style={{
                display: "grid",
                gridTemplateColumns: gridTemplate,
                borderTop: ri === 0 ? "none" : `1px solid ${BRAND.borderSoft}`,
              } as React.CSSProperties}
            >
              {/* Feature name */}
              <div
                style={{
                  padding: "16px 24px",
                  fontFamily: FONT.sans,
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: BRAND.onyx,
                } as React.CSSProperties}
              >
                {row.feature}
              </div>

              {row.values.map((val, ci) => (
                <div
                  key={ci}
                  style={{
                    padding: "16px 14px",
                    textAlign: "center",
                    borderLeft: `1px solid ${BRAND.borderSoft}`,
                    background: ci === 0 ? BRAND.boneDeep : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  } as React.CSSProperties}
                >
                  {val ? (
                    <CheckCircle2
                      size={18}
                      color={ci === 0 ? BRAND.rust : BRAND.success}
                      strokeWidth={2.2}
                    />
                  ) : (
                    <span
                      style={{
                        color: BRAND.stoneLight,
                        fontSize: 18,
                      } as React.CSSProperties}
                    >
                      &mdash;
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </motion.div>

        {caption && (
          <p
            style={{
              marginTop: 24,
              fontFamily: FONT.sans,
              fontSize: 12,
              color: BRAND.stone,
              textAlign: "center",
            } as React.CSSProperties}
          >
            {caption}
          </p>
        )}
      </div>
    </section>
  );
}
