"use client";

import React from "react";
import { motion } from "framer-motion";
import { BRAND, FONT } from "@/lib/brand";

interface DayInLifePerson {
  name: string;
  role: string;
  gradient: string;
}

interface ProductDayInLifeProps {
  eyebrow: string;
  heading: string;
  italicWord?: string;
  intro: string;
  paragraphs: Array<string | React.ReactNode>;
  quote: string;
  person: DayInLifePerson;
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

export function ProductDayInLife({
  eyebrow,
  heading,
  italicWord,
  intro,
  paragraphs,
  quote,
  person,
}: ProductDayInLifeProps) {
  const { before, italic, after } = buildHeadlineParts(heading, italicWord);

  return (
    <section
      style={{
        background: BRAND.boneCream,
        paddingTop: 140,
        paddingBottom: 140,
        borderTop: `1px solid ${BRAND.border}`,
      } as React.CSSProperties}
    >
      <div
        style={{
          maxWidth: 920,
          margin: "0 auto",
          padding: "0 32px",
        } as React.CSSProperties}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
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
              fontSize: "clamp(38px, 5vw, 64px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: BRAND.onyx,
              fontWeight: 400,
              marginBottom: 32,
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

        {/* Intro paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.08 }}
          style={{
            fontFamily: FONT.serif,
            fontSize: 22,
            lineHeight: 1.55,
            color: BRAND.onyx,
            marginBottom: 28,
          } as React.CSSProperties}
        >
          {intro}
        </motion.p>

        {/* Body paragraphs */}
        {paragraphs.map((para, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.55, delay: i * 0.04 }}
            style={{
              fontFamily: FONT.sans,
              fontSize: 16,
              lineHeight: 1.75,
              color: BRAND.stoneDark,
              marginBottom: 18,
            } as React.CSSProperties}
          >
            {para}
          </motion.p>
        ))}

        {/* Pull quote */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            borderLeft: `3px solid ${BRAND.rust}`,
            paddingLeft: 28,
            marginTop: 48,
          } as React.CSSProperties}
        >
          <p
            style={{
              fontFamily: FONT.serif,
              fontSize: 28,
              fontStyle: "italic",
              lineHeight: 1.3,
              color: BRAND.onyx,
              letterSpacing: "-0.01em",
              marginBottom: 18,
            } as React.CSSProperties}
          >
            {quote}
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
            } as React.CSSProperties}
          >
            {/* Avatar */}
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: person.gradient,
                flexShrink: 0,
              } as React.CSSProperties}
            />

            <div>
              <div
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 13,
                  fontWeight: 700,
                  color: BRAND.onyx,
                  marginBottom: 2,
                } as React.CSSProperties}
              >
                {person.name}
              </div>
              <div
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 12,
                  color: BRAND.stone,
                } as React.CSSProperties}
              >
                {person.role}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
