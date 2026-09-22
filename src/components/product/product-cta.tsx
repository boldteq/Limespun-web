"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BRAND, FONT } from "@/lib/brand";

interface ProductCTAProps {
  headline: string;
  italicWord?: string;
  subhead: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
}

const defaultPrimary = {
  label: "Get started",
  href: "https://app.limespun.com/signup",
};

const defaultSecondary = {
  label: "Book a demo",
  href: "/book-a-demo",
};

function buildHeadlineParts(headline: string, italicWord?: string) {
  if (!italicWord) return { before: headline, italic: "", after: "" };
  const idx = headline.indexOf(italicWord);
  if (idx === -1) return { before: headline, italic: "", after: "" };
  return {
    before: headline.slice(0, idx),
    italic: italicWord,
    after: headline.slice(idx + italicWord.length),
  };
}

export function ProductCTA({
  headline,
  italicWord,
  subhead,
  primaryCTA = defaultPrimary,
  secondaryCTA = defaultSecondary,
}: ProductCTAProps) {
  const { before, italic, after } = buildHeadlineParts(headline, italicWord);

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
          maxWidth: 920,
          margin: "0 auto",
          padding: "0 32px",
          textAlign: "center",
        } as React.CSSProperties}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: FONT.serif,
            fontSize: "clamp(48px, 6.5vw, 84px)",
            lineHeight: 1,
            letterSpacing: "-0.025em",
            color: BRAND.bone,
            fontWeight: 400,
            marginBottom: 22,
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
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: FONT.sans,
            fontSize: 17,
            lineHeight: 1.6,
            color: BRAND.stoneLight,
            maxWidth: 580,
            margin: "0 auto 40px",
          } as React.CSSProperties}
        >
          {subhead}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.55, delay: 0.18 }}
          style={{
            display: "inline-flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
          } as React.CSSProperties}
        >
          <a
            href={primaryCTA.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: FONT.sans,
              fontSize: 15,
              fontWeight: 600,
              color: BRAND.onyx,
              background: BRAND.bone,
              padding: "14px 26px",
              borderRadius: 100,
              textDecoration: "none",
              letterSpacing: "-0.01em",
            } as React.CSSProperties}
          >
            {primaryCTA.label}
            <ArrowRight size={15} strokeWidth={2.2} />
          </a>

          <a
            href={secondaryCTA.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: FONT.sans,
              fontSize: 15,
              fontWeight: 500,
              color: BRAND.bone,
              background: "transparent",
              padding: "13px 22px",
              borderRadius: 100,
              textDecoration: "none",
              letterSpacing: "-0.01em",
              border: "1px solid rgba(247,247,245,0.2)",
            } as React.CSSProperties}
          >
            {secondaryCTA.label}
            <ArrowUpRight size={15} strokeWidth={2} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
