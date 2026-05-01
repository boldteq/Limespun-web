"use client";

import React from "react";
import { motion } from "framer-motion";
import { BRAND, FONT, fadeUp } from "@/lib/brand";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { DashboardMockup } from "@/components/dashboard/dashboard-mockup";

export function Shift() {
  return (
    <section
      style={{
        position: "relative",
        background: BRAND.bone,
        paddingTop: 100,
        paddingBottom: 100,
        overflow: "hidden",
      } as React.CSSProperties}
    >
      {/* Subtle radial amberWash at bottom */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 900,
          height: 500,
          background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${BRAND.amberWash} 0%, transparent 70%)`,
          pointerEvents: "none",
        } as React.CSSProperties}
      />

      <div
        style={{
          position: "relative",
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        } as React.CSSProperties}
      >
        {/* Eyebrow */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <SectionEyebrow label="The shift" accent="amber" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          style={{
            fontFamily: FONT.sans,
            fontSize: "clamp(32px, 4.2vw, 54px)",
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
            color: BRAND.onyx,
            fontWeight: 600,
            marginBottom: 18,
            maxWidth: 720,
          } as React.CSSProperties}
        >
          One quiet system, holding every loop.
        </motion.h2>

        {/* Subhead */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          style={{
            fontFamily: FONT.sans,
            fontSize: 17,
            lineHeight: 1.65,
            color: BRAND.stoneDark,
            maxWidth: 580,
            marginBottom: 60,
          } as React.CSSProperties}
        >
          Sessions linked into projects. Deposits pooled per sleeve. Allergies surfaced before the chair. Residencies tracked without a spreadsheet. InkOS runs in the background so you don&apos;t have to.
        </motion.p>

        {/* Dashboard */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{ width: "100%" } as React.CSSProperties}
        >
          <DashboardMockup hero={false} />
        </motion.div>
      </div>
    </section>
  );
}
