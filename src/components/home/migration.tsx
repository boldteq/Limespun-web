"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, ArrowRight } from "lucide-react";
import { BRAND, FONT, SHADOW, fadeUp, stagger } from "@/lib/brand";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";

interface MigrationRow {
  from: string;
  time: string;
  carries: string;
}

const migrationRows: MigrationRow[] = [
  {
    from: "DaySmart Body Art",
    time: "9 days",
    carries: "2 white-glove calls · 100% data preserved",
  },
  {
    from: "Mangomint",
    time: "6 days",
    carries: "Bookings, deposits, client notes — all carried",
  },
  {
    from: "Fresha",
    time: "5 days",
    carries: "Keep your bookings, leave the platform fee",
  },
  {
    from: "TattooGenda",
    time: "4 days",
    carries: "Guest residencies and deposit pools migrate intact",
  },
  {
    from: "Vagaro",
    time: "7 days",
    carries: "Salon-coded data re-mapped to tattoo schema",
  },
  {
    from: "A Google spreadsheet",
    time: "1 day",
    carries: "CSV import in minutes · we clean the rest",
  },
];

export function Migration() {
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
      {/* AmberWash glow top-left */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 520,
          height: 520,
          background: `radial-gradient(circle at 0% 0%, ${BRAND.amberWash} 0%, transparent 60%)`,
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
        } as React.CSSProperties}
      >
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <SectionEyebrow label="The migration" accent="amber" />
        </motion.div>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          style={{
            fontFamily: FONT.sans,
            fontSize: "clamp(30px, 4vw, 50px)",
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
            color: BRAND.onyx,
            fontWeight: 600,
            marginBottom: 16,
            maxWidth: 640,
            textAlign: "center",
          } as React.CSSProperties}
        >
          Whatever you&apos;re on, we move it for you.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          style={{
            fontFamily: FONT.sans,
            fontSize: 17,
            lineHeight: 1.6,
            color: BRAND.stoneDark,
            maxWidth: 560,
            textAlign: "center",
            marginBottom: 52,
          } as React.CSSProperties}
        >
          White-glove migration is included on every plan above Solo. We do not bill until your last appointment from your old tool has cleared.
        </motion.p>

        {/* Migration table */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            width: "100%",
            maxWidth: 860,
            background: BRAND.white,
            borderRadius: 18,
            boxShadow: SHADOW.card,
            overflow: "hidden",
            marginBottom: 40,
          } as React.CSSProperties}
        >
          {/* Top gradient strip */}
          <div
            aria-hidden="true"
            style={{
              height: 4,
              background: `linear-gradient(90deg, ${BRAND.amber} 0%, ${BRAND.rust} 50%, ${BRAND.sage} 100%)`,
            } as React.CSSProperties}
          />

          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 140px 1fr",
              padding: "14px 24px",
              borderBottom: `1px solid ${BRAND.border}`,
              background: BRAND.boneDeep,
            } as React.CSSProperties}
          >
            {["Coming from", "Time to live", "What we carry"].map((h) => (
              <div
                key={h}
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 11,
                  fontWeight: 600,
                  color: BRAND.stoneLight,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                } as React.CSSProperties}
              >
                {h}
              </div>
            ))}
          </div>

          {/* Table rows */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {migrationRows.map((row, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 140px 1fr",
                  padding: "16px 24px",
                  borderBottom:
                    i < migrationRows.length - 1
                      ? `1px solid ${BRAND.borderSoft}`
                      : "none",
                  alignItems: "center",
                } as React.CSSProperties}
              >
                <div
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 14,
                    fontWeight: 600,
                    color: BRAND.onyx,
                    letterSpacing: "-0.005em",
                  } as React.CSSProperties}
                >
                  {row.from}
                </div>

                <div>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      borderRadius: 100,
                      background: BRAND.rustSoft,
                      fontFamily: FONT.mono,
                      fontSize: 12,
                      fontWeight: 600,
                      color: BRAND.rust,
                      letterSpacing: "0.01em",
                    } as React.CSSProperties}
                  >
                    {row.time}
                  </span>
                </div>

                <div
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 13,
                    color: BRAND.stoneDark,
                    lineHeight: 1.4,
                  } as React.CSSProperties}
                >
                  {row.carries}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Promise band */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            width: "100%",
            maxWidth: 860,
            background: BRAND.onyx,
            borderRadius: 18,
            padding: "32px 36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            position: "relative",
            overflow: "hidden",
          } as React.CSSProperties}
        >
          {/* Rust glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              height: 300,
              background: `radial-gradient(ellipse, rgba(200,53,31,0.25) 0%, transparent 70%)`,
              pointerEvents: "none",
            } as React.CSSProperties}
          />

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 16,
              position: "relative",
              flex: 1,
            } as React.CSSProperties}
          >
            {/* Shield badge */}
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "rgba(200,53,31,0.20)",
                border: "1px solid rgba(200,53,31,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: 2,
              } as React.CSSProperties}
            >
              <Shield size={20} color={BRAND.rust} strokeWidth={1.8} />
            </div>

            <div>
              <div
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 11,
                  fontWeight: 600,
                  color: BRAND.rust,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                } as React.CSSProperties}
              >
                The promise
              </div>
              <div
                style={{
                  fontFamily: FONT.serif,
                  fontSize: "clamp(18px, 2.4vw, 26px)",
                  color: BRAND.bone,
                  lineHeight: 1.25,
                  letterSpacing: "-0.01em",
                } as React.CSSProperties}
              >
                If we can&apos;t move you cleanly in 14 days, you don&apos;t pay.
              </div>
            </div>
          </div>

          <div style={{ position: "relative", flexShrink: 0 } as React.CSSProperties}>
            <button
              type="button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 22px",
                borderRadius: 100,
                background: BRAND.bone,
                color: BRAND.onyx,
                fontFamily: FONT.sans,
                fontSize: 14,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                letterSpacing: "-0.005em",
                whiteSpace: "nowrap",
              } as React.CSSProperties}
            >
              Talk to migrations
              <ArrowRight size={14} strokeWidth={2} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
