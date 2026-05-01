"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import { BRAND, FONT, SHADOW, GRADIENT, fadeUp, stagger } from "@/lib/brand";
import { MangomintBlobs } from "@/components/brand/mangomint-blobs";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import type { AccentKey } from "@/lib/brand";

interface HeroSectionProps {
  eyebrow: string;
  eyebrowAccent?: AccentKey;
  headline: string;
  italicWord?: string;
  subhead: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string; icon?: "play" };
  trustStats?: Array<{ stat: string; label: string }>;
  variant?: "default" | "centered" | "dark";
  showBlobs?: boolean;
}

export function HeroSection({
  eyebrow,
  eyebrowAccent = "rust",
  headline,
  italicWord,
  subhead,
  primaryCTA,
  secondaryCTA,
  trustStats,
  variant = "default",
  showBlobs = true,
}: HeroSectionProps) {
  const isDark = variant === "dark";
  const isCentered = variant === "centered" || isDark;

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
            color: isDark ? BRAND.rustBright : BRAND.rust,
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
        background: isDark ? BRAND.onyx : BRAND.bone,
        position: "relative",
        overflow: "hidden",
        paddingTop: 100,
        paddingBottom: 80,
      } as React.CSSProperties}
    >
      {showBlobs && <MangomintBlobs variant={isDark ? "cta" : "hero"} />}

      {isDark && (
        <>
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
        </>
      )}

      {!isDark && (
        <>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: GRADIENT.heroBloom,
              pointerEvents: "none",
            } as React.CSSProperties}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.25,
              backgroundImage: `linear-gradient(${BRAND.border} 1px, transparent 1px), linear-gradient(90deg, ${BRAND.border} 1px, transparent 1px)`,
              backgroundSize: "64px 64px",
              maskImage:
                "radial-gradient(ellipse at 50% 30%, black 30%, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at 50% 30%, black 30%, transparent 70%)",
              pointerEvents: "none",
            } as React.CSSProperties}
          />
        </>
      )}

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: isCentered ? "center" : "flex-start",
          textAlign: isCentered ? "center" : "left",
        } as React.CSSProperties}
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionEyebrow
            label={eyebrow}
            accent={eyebrowAccent}
            dark={isDark}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: FONT.serif,
            fontSize: "clamp(48px, 7vw, 96px)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            color: isDark ? BRAND.bone : BRAND.onyx,
            fontWeight: 400,
            maxWidth: 920,
            marginBottom: 24,
          } as React.CSSProperties}
        >
          {renderHeadline()}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            fontFamily: FONT.sans,
            fontSize: 19,
            fontWeight: 400,
            lineHeight: 1.55,
            color: isDark ? BRAND.stoneLight : BRAND.stoneDark,
            maxWidth: 620,
            marginBottom: 36,
          } as React.CSSProperties}
        >
          {subhead}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: trustStats ? 56 : 64,
            justifyContent: isCentered ? "center" : "flex-start",
          } as React.CSSProperties}
        >
          <a
            href={primaryCTA.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: isDark ? BRAND.bone : BRAND.onyx,
              color: isDark ? BRAND.onyx : BRAND.bone,
              fontFamily: FONT.sans,
              fontSize: 15,
              fontWeight: 500,
              padding: "14px 26px",
              borderRadius: 100,
              textDecoration: "none",
              boxShadow: SHADOW.soft,
            } as React.CSSProperties}
          >
            {primaryCTA.label}
            <ArrowRight size={15} />
          </a>

          {secondaryCTA && (
            <a
              href={secondaryCTA.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: isDark ? BRAND.stoneLight : BRAND.stoneDark,
                fontFamily: FONT.sans,
                fontSize: 15,
                fontWeight: 500,
                textDecoration: "none",
                padding: "14px 20px",
                borderRadius: 100,
                border: isDark
                  ? `1.5px solid ${BRAND.borderInk}`
                  : `1px solid ${BRAND.border}`,
                background: isDark ? "transparent" : BRAND.white,
                boxShadow: isDark ? "none" : SHADOW.soft,
              } as React.CSSProperties}
            >
              {secondaryCTA.icon === "play" && (
                <PlayCircle size={15} strokeWidth={1.8} />
              )}
              {secondaryCTA.label}
            </a>
          )}
        </motion.div>

        {trustStats && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            variants={stagger}
            style={{
              marginTop: 64,
              paddingTop: 28,
              borderTop: `1px solid ${isDark ? "rgba(247,247,245,0.12)" : BRAND.border}`,
              display: "grid",
              gridTemplateColumns: `repeat(${trustStats.length}, 1fr)`,
              gap: 32,
              width: "100%",
            } as React.CSSProperties}
            className="v4-hero-trust"
          >
            {trustStats.map((s, i) => (
              <div key={i}>
                <div
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 18,
                    fontWeight: 600,
                    color: isDark ? BRAND.bone : BRAND.onyx,
                    letterSpacing: "-0.01em",
                    marginBottom: 4,
                  } as React.CSSProperties}
                >
                  {s.stat}
                </div>
                <div
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 13,
                    fontWeight: 400,
                    color: isDark ? BRAND.stoneLight : BRAND.stone,
                  } as React.CSSProperties}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
