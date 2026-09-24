"use client";

import React from "react";
import { motion } from "framer-motion";
import { BRAND, FONT } from "@/lib/brand";

export interface AnatomyCallout {
  n: number;
  title: string;
  desc: string;
  /** No longer drawn (see the grid below); kept so page data stays valid. */
  position?: { top: string; left: string };
}

interface ProductAnatomyProps {
  eyebrow: string;
  heading: string;
  italicWord?: string;
  intro: string;
  dashboard: React.ReactNode;
  callouts: AnatomyCallout[];
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

export function ProductAnatomy({
  eyebrow,
  heading,
  italicWord,
  intro,
  dashboard,
  callouts,
}: ProductAnatomyProps) {
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
        </div>

        {/* Anatomy grid */}
        {/* Stacks below lg; side by side from lg */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          {/* Left: the app screen. No numbered dots over it: the screens come from
              the shared mockup library, so fixed dot positions would land on the
              wrong rows. The numbered list on the right carries the callouts. */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0"
          >
            {dashboard}
          </motion.div>

          {/* Right: callout list */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              paddingTop: 16,
            } as React.CSSProperties}
          >
            {callouts.map((callout, i) => (
              <motion.div
                key={callout.n}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                style={{
                  display: "flex",
                  gap: 16,
                  padding: "18px 0",
                  borderTop: i === 0 ? "none" : `1px solid ${BRAND.border}`,
                } as React.CSSProperties}
              >
                {/* Number badge */}
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: BRAND.onyx,
                    color: BRAND.bone,
                    fontFamily: FONT.sans,
                    fontSize: 13,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  } as React.CSSProperties}
                >
                  {callout.n}
                </div>

                {/* Text */}
                <div>
                  <div
                    style={{
                      fontFamily: FONT.serif,
                      fontSize: 22,
                      fontStyle: "italic",
                      color: BRAND.onyx,
                      letterSpacing: "-0.01em",
                      marginBottom: 4,
                      lineHeight: 1.2,
                    } as React.CSSProperties}
                  >
                    {callout.title}
                  </div>
                  <p
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: BRAND.stoneDark,
                      margin: 0,
                    } as React.CSSProperties}
                  >
                    {callout.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
