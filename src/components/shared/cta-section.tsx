"use client";

import React from "react";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import { BRAND, FONT, SHADOW, fadeUp, stagger } from "@/lib/brand";
import { MangomintBlobs } from "@/components/brand/mangomint-blobs";
import { TriCircleMarkV2 } from "@/components/brand/tri-circle-mark";

interface CTASectionProps {
  badge?: string;
  headline: string;
  italicWord?: string;
  subhead: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string; icon?: "play" };
  showTriCircle?: boolean;
}

export function CTASection({
  badge,
  headline,
  italicWord,
  subhead,
  primaryCTA,
  secondaryCTA,
  showTriCircle = true,
}: CTASectionProps) {
  function renderHeadline() {
    if (!italicWord || !headline.includes(italicWord)) {
      return headline;
    }
    const parts = headline.split(italicWord);
    return (
      <>
        {parts[0]}
        <em
          style={{
            fontStyle: "italic",
            color: BRAND.rustBright,
            fontFamily: FONT.serif,
          } as React.CSSProperties}
        >
          {italicWord}
        </em>
        {parts[1]}
      </>
    );
  }

  return (
    <section
      style={{
        position: "relative",
        background: BRAND.onyx,
        paddingTop: 100,
        paddingBottom: 100,
        overflow: "hidden",
      } as React.CSSProperties}
    >
      <MangomintBlobs variant="cta" />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: 600,
          height: 600,
          background: `radial-gradient(circle, rgba(200,53,31,0.20) 0%, transparent 65%)`,
          filter: "blur(80px)",
          pointerEvents: "none",
        } as React.CSSProperties}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: 500,
          height: 500,
          background: `radial-gradient(circle, rgba(200,53,31,0.15) 0%, transparent 65%)`,
          filter: "blur(80px)",
          pointerEvents: "none",
        } as React.CSSProperties}
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        style={{
          position: "relative",
          maxWidth: 720,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        } as React.CSSProperties}
      >
        {showTriCircle && (
          <motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              marginBottom: 32,
            } as React.CSSProperties}
          >
            <TriCircleMarkV2 size={56} />
            {badge && (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "6px 16px",
                  borderRadius: 100,
                  background: "rgba(247,247,245,0.08)",
                  fontFamily: FONT.sans,
                  fontSize: 12,
                  fontWeight: 500,
                  color: BRAND.stoneLight,
                  letterSpacing: "0.02em",
                } as React.CSSProperties}
              >
                {badge}
              </div>
            )}
          </motion.div>
        )}

        <motion.h2
          variants={fadeUp}
          style={{
            fontFamily: FONT.serif,
            fontSize: "clamp(42px, 6vw, 80px)",
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
            color: BRAND.bone,
            fontWeight: 400,
            marginBottom: 20,
          } as React.CSSProperties}
        >
          {renderHeadline()}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          style={{
            fontFamily: FONT.sans,
            fontSize: 17,
            lineHeight: 1.6,
            color: BRAND.stoneLight,
            maxWidth: 520,
            marginBottom: 40,
          } as React.CSSProperties}
        >
          {subhead}
        </motion.p>

        <motion.div
          variants={fadeUp}
          style={{
            display: "flex",
            alignItems: "center",
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
              padding: "14px 28px",
              borderRadius: 100,
              background: BRAND.bone,
              color: BRAND.onyx,
              fontFamily: FONT.sans,
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
              letterSpacing: "-0.005em",
              boxShadow: SHADOW.card,
            } as React.CSSProperties}
          >
            {primaryCTA.label}
          </a>

          {secondaryCTA && (
            <a
              href={secondaryCTA.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 28px",
                borderRadius: 100,
                background: "transparent",
                color: BRAND.stoneLight,
                fontFamily: FONT.sans,
                fontSize: 15,
                fontWeight: 600,
                border: `1.5px solid ${BRAND.borderInk}`,
                textDecoration: "none",
                letterSpacing: "-0.005em",
              } as React.CSSProperties}
            >
              {secondaryCTA.icon === "play" && (
                <PlayCircle size={16} strokeWidth={1.8} />
              )}
              {secondaryCTA.label}
            </a>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
