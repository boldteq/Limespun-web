"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import { BRAND, FONT, SHADOW, GRADIENT, stagger } from "@/lib/brand";
import { MangomintBlobs } from "@/components/brand/mangomint-blobs";
import { LimespunMark } from "@/components/brand/limespun-mark";
import { DashboardMockup } from "@/components/dashboard/dashboard-mockup";

const trustStats = [
  { stat: "1,200+",          label: "artists on the waitlist" },
  { stat: "US · UK · CA · AU", label: "global from day one" },
  { stat: "EU REACH",        label: "compliant ink registry" },
  { stat: "14 days",         label: "free white-glove migration" },
];

export function Hero() {
  return (
    <section
      style={{
        background: BRAND.bone,
        position: "relative",
        overflow: "hidden",
        paddingTop: 100,
        paddingBottom: 80,
      } as React.CSSProperties}
    >
      {/* Mangomint-style organic blobs */}
      <MangomintBlobs variant="hero" />

      {/* Hero bloom gradient overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: GRADIENT.heroBloom,
          pointerEvents: "none",
        } as React.CSSProperties}
      />

      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.25,
          backgroundImage: `linear-gradient(${BRAND.border} 1px, transparent 1px), linear-gradient(90deg, ${BRAND.border} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 50% 30%, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, black 30%, transparent 70%)",
          pointerEvents: "none",
        } as React.CSSProperties}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
          position: "relative",
          zIndex: 2,
        } as React.CSSProperties}
      >
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "7px 14px 7px 7px",
            borderRadius: 100,
            background: BRAND.white,
            border: `1px solid ${BRAND.border}`,
            fontFamily: FONT.sans,
            fontSize: 12,
            fontWeight: 500,
            color: BRAND.stoneDark,
            marginBottom: 32,
            boxShadow: SHADOW.soft,
          } as React.CSSProperties}
        >
          <LimespunMark size={20} />
          The studio OS for tattoo &middot; v1 in private beta
        </motion.div>

        {/* Serif headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: FONT.serif,
            fontSize: "clamp(48px, 7vw, 96px)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            color: BRAND.onyx,
            fontWeight: 400,
            maxWidth: 920,
            marginBottom: 24,
          } as React.CSSProperties}
        >
          The studio OS built like a{" "}
          <em style={{ fontStyle: "italic", color: BRAND.rust } as React.CSSProperties}>
            tattoo
          </em>
          , not a spreadsheet.
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            fontFamily: FONT.sans,
            fontSize: 19,
            fontWeight: 400,
            lineHeight: 1.55,
            color: BRAND.stoneDark,
            maxWidth: 620,
            marginBottom: 36,
          } as React.CSSProperties}
        >
          Bookings, deposits, projects, portfolio, consent, payments, messages &mdash;
          one quiet system that understands multi-session work, red-ink allergies,
          and deposits split across five visits.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 56,
          } as React.CSSProperties}
        >
          <a
            href="https://app.limespun.com/signup"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: BRAND.onyx,
              color: BRAND.bone,
              fontFamily: FONT.sans,
              fontSize: 15,
              fontWeight: 500,
              padding: "14px 26px",
              borderRadius: 100,
              textDecoration: "none",
              boxShadow: SHADOW.soft,
            } as React.CSSProperties}
          >
            Start a 14-day trial <ArrowRight size={15} />
          </a>
          <a
            href="/book-a-demo"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: BRAND.stoneDark,
              fontFamily: FONT.sans,
              fontSize: 15,
              fontWeight: 500,
              textDecoration: "none",
              padding: "14px 20px",
              borderRadius: 100,
              border: `1px solid ${BRAND.border}`,
              background: BRAND.white,
              boxShadow: SHADOW.soft,
            } as React.CSSProperties}
          >
            <PlayCircle size={15} /> Watch a 90-second tour
          </a>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "relative" } as React.CSSProperties}
        >
          {/* Decorative blob behind dashboard */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "-40px -20px",
              background: `radial-gradient(ellipse at 30% 40%, ${BRAND.rustWash} 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, ${BRAND.amberWash} 0%, transparent 60%)`,
              filter: "blur(40px)",
              opacity: 0.8,
              pointerEvents: "none",
            } as React.CSSProperties}
          />
          <div style={{ position: "relative" } as React.CSSProperties}>
            <DashboardMockup hero={true} />
          </div>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          variants={stagger}
          style={{
            marginTop: 64,
            paddingTop: 28,
            borderTop: `1px solid ${BRAND.border}`,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 32,
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
                  color: BRAND.onyx,
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
                  color: BRAND.stone,
                } as React.CSSProperties}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
