"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BRAND, FONT, SHADOW } from "@/lib/brand";
import { ProductBreadcrumb } from "@/components/product/product-breadcrumb";

interface ProductHeroProps {
  feature: string;
  headline: string;
  italicWord: string;
  subhead: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  dashboard: React.ReactNode;
}

const defaultPrimary = {
  label: "Start free trial",
  href: "https://inkos.up.railway.app/signup",
};

const defaultSecondary = {
  label: "See it in motion",
  href: "/book-a-demo",
};

function buildHeadlineParts(headline: string, italicWord: string) {
  const idx = headline.indexOf(italicWord);
  if (idx === -1) {
    return { before: headline, italic: "", after: "" };
  }
  return {
    before: headline.slice(0, idx),
    italic: italicWord,
    after: headline.slice(idx + italicWord.length),
  };
}

export function ProductHero({
  feature,
  headline,
  italicWord,
  subhead,
  primaryCTA = defaultPrimary,
  secondaryCTA = defaultSecondary,
  dashboard,
}: ProductHeroProps) {
  const { before, italic, after } = buildHeadlineParts(headline, italicWord);

  return (
    <section
      style={{
        background: BRAND.bone,
        position: "relative",
        overflow: "hidden",
        paddingTop: 140,
        paddingBottom: 80,
      } as React.CSSProperties}
    >
      {/* Background grid texture */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.4,
          pointerEvents: "none",
          backgroundImage: `linear-gradient(${BRAND.border} 1px, transparent 1px), linear-gradient(90deg, ${BRAND.border} 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at 50% 30%, black 30%, transparent 70%)",
        } as React.CSSProperties}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
          position: "relative",
        } as React.CSSProperties}
      >
        <ProductBreadcrumb feature={feature} />

        <div style={{ maxWidth: 920 } as React.CSSProperties}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: FONT.serif,
              fontSize: "clamp(56px, 8vw, 112px)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: BRAND.onyx,
              fontWeight: 400,
              marginBottom: 28,
              margin: "0 0 28px 0",
            } as React.CSSProperties}
          >
            {before}
            <span
              style={{
                fontStyle: "italic",
                color: BRAND.rust,
              } as React.CSSProperties}
            >
              {italic}
            </span>
            {after}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: FONT.sans,
              fontSize: 19,
              lineHeight: 1.55,
              color: BRAND.stoneDark,
              maxWidth: 720,
              marginBottom: 36,
            } as React.CSSProperties}
          >
            {subhead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              flexWrap: "wrap",
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
                color: BRAND.bone,
                background: BRAND.onyx,
                padding: "14px 26px",
                borderRadius: 100,
                textDecoration: "none",
                letterSpacing: "-0.01em",
                boxShadow: SHADOW.card,
              } as React.CSSProperties}
            >
              {primaryCTA.label}
              <ArrowRight size={16} strokeWidth={2.2} />
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
                color: BRAND.onyx,
                background: "transparent",
                padding: "13px 22px",
                borderRadius: 100,
                textDecoration: "none",
                letterSpacing: "-0.01em",
                border: `1px solid ${BRAND.border}`,
              } as React.CSSProperties}
            >
              {secondaryCTA.label}
              <ArrowUpRight size={16} strokeWidth={2} />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ marginTop: 80 } as React.CSSProperties}
        >
          {dashboard}
        </motion.div>
      </div>
    </section>
  );
}
