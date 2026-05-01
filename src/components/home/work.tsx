"use client";

import React from "react";
import { motion } from "framer-motion";
import { LayoutGrid, AlertCircle, DollarSign, Sparkles, ImageIcon } from "lucide-react";
import { BRAND, FONT, SHADOW, GRADIENT, fadeUp, stagger } from "@/lib/brand";
import { MangomintBlobs } from "@/components/brand/mangomint-blobs";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionSubhead } from "@/components/shared/section-subhead";

// ── Polaroid stage data ──────────────────────────────────────────────────────

interface Stage {
  tag: string;
  day: string;
  label: string;
  desc: string;
  bg: string;
  strip: string;
  tagBg: string;
  tagColor: string;
  lineColor: string;
}

const stages: Stage[] = [
  {
    tag: "REF",
    day: "Day 0",
    label: "Reference",
    desc: "Client brief, mood board, line study",
    bg: BRAND.boneCream,
    strip: BRAND.stone,
    tagBg: BRAND.boneDeep,
    tagColor: BRAND.stoneDark,
    lineColor: "#787774",
  },
  {
    tag: "FRESH",
    day: "Day 0",
    label: "Fresh",
    desc: "Just out of the chair · still raw",
    bg: BRAND.rustWash,
    strip: BRAND.rust,
    tagBg: BRAND.rust,
    tagColor: BRAND.bone,
    lineColor: BRAND.rust,
  },
  {
    tag: "HEAL",
    day: "Day 7",
    label: "Healing",
    desc: "Scabbed, peeling · clinical photo",
    bg: BRAND.amberWash,
    strip: BRAND.amber,
    tagBg: BRAND.amber,
    tagColor: BRAND.bone,
    lineColor: BRAND.amber,
  },
  {
    tag: "HEALED",
    day: "Day 45",
    label: "Healed",
    desc: "Settled saturation · the final record",
    bg: BRAND.sageWash,
    strip: BRAND.sage,
    tagBg: BRAND.sage,
    tagColor: BRAND.bone,
    lineColor: BRAND.sage,
  },
];

// ── Koi SVG linework ─────────────────────────────────────────────────────────

function PolaroidPanelBright({ stage }: { stage: Stage }) {
  const isRef = stage.tag === "REF";
  const isHeal = stage.tag === "HEAL";
  const isHealed = stage.tag === "HEALED";
  const strokeW = isRef ? 1.2 : 2.2;
  const finStroke = isRef ? 1.0 : 1.8;
  const opacity = isRef ? 0.5 : 0.85;

  return (
    <div>
      <div
        style={{
          aspectRatio: "3/4",
          background: stage.bg,
          borderRadius: 12,
          position: "relative",
          overflow: "hidden",
          border: `1px solid ${stage.strip}25`,
          boxShadow: "0 4px 12px -4px rgba(15,15,15,0.08)",
        } as React.CSSProperties}
      >
        {/* Tag badge */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 2,
            fontFamily: FONT.mono,
            fontSize: 9.5,
            fontWeight: 700,
            color: stage.tagColor,
            padding: "4px 9px",
            borderRadius: 100,
            background: stage.tagBg,
            letterSpacing: "0.06em",
          } as React.CSSProperties}
        >
          {stage.tag}
        </div>

        {/* Top accent strip */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: stage.strip,
          } as React.CSSProperties}
        />

        {/* Koi linework SVG */}
        <svg
          viewBox="0 0 100 130"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" } as React.CSSProperties}
          aria-hidden="true"
        >
          {/* Body */}
          <path
            d="M 25 35 Q 50 18, 75 35 Q 82 55, 75 75 Q 50 92, 25 75 Q 18 55, 25 35 Z"
            fill="none"
            stroke={stage.lineColor}
            strokeWidth={strokeW}
            opacity={opacity}
          />
          {/* Tail flick */}
          <path
            d="M 18 55 Q 8 50, 5 60 Q 8 65, 18 60"
            fill="none"
            stroke={stage.lineColor}
            strokeWidth={isRef ? 1 : 1.8}
            opacity={opacity}
          />
          {/* Top fin */}
          <path
            d="M 50 18 Q 45 8, 40 14"
            fill="none"
            stroke={stage.lineColor}
            strokeWidth={finStroke}
            opacity={opacity}
          />
          {/* Scale lines — appear after REF */}
          {!isRef && (
            <>
              <path d="M 35 45 Q 42 50, 50 45" fill="none" stroke={stage.lineColor} strokeWidth="1.2" opacity="0.7" />
              <path d="M 50 50 Q 58 55, 65 50" fill="none" stroke={stage.lineColor} strokeWidth="1.2" opacity="0.7" />
              <path d="M 35 60 Q 42 65, 50 60" fill="none" stroke={stage.lineColor} strokeWidth="1.2" opacity="0.7" />
              <path d="M 50 65 Q 58 70, 65 65" fill="none" stroke={stage.lineColor} strokeWidth="1.2" opacity="0.7" />
            </>
          )}
          {/* Eye */}
          <circle cx="35" cy="40" r={isRef ? 1 : 1.6} fill={stage.lineColor} opacity={isRef ? 0.5 : 0.9} />
          {/* Whiskers — healed/healing stages */}
          {(isHealed || isHeal) && (
            <>
              <path d="M 30 38 Q 22 34, 18 36" fill="none" stroke={stage.lineColor} strokeWidth="0.8" opacity="0.6" />
              <path d="M 30 42 Q 22 44, 18 42" fill="none" stroke={stage.lineColor} strokeWidth="0.8" opacity="0.6" />
            </>
          )}
          {/* HEAL: scab dots */}
          {isHeal && (
            <>
              <circle cx="42" cy="35" r="1" fill={stage.lineColor} opacity="0.5" />
              <circle cx="58" cy="45" r="0.8" fill={stage.lineColor} opacity="0.5" />
              <circle cx="48" cy="65" r="1" fill={stage.lineColor} opacity="0.5" />
              <circle cx="62" cy="68" r="0.7" fill={stage.lineColor} opacity="0.5" />
              <circle cx="38" cy="72" r="0.8" fill={stage.lineColor} opacity="0.5" />
            </>
          )}
        </svg>

        {/* Bottom day label */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            right: 12,
            fontFamily: FONT.mono,
            fontSize: 9,
            fontWeight: 600,
            color: stage.strip,
            letterSpacing: "0.06em",
          } as React.CSSProperties}
        >
          {stage.day.replace("Day ", "D ")}
        </div>
      </div>

      {/* Label below panel */}
      <div style={{ paddingTop: 14, paddingLeft: 4 } as React.CSSProperties}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 8,
            marginBottom: 4,
          } as React.CSSProperties}
        >
          <span
            style={{
              fontFamily: FONT.sans,
              fontSize: 15,
              fontWeight: 600,
              color: BRAND.onyx,
              letterSpacing: "-0.01em",
            } as React.CSSProperties}
          >
            {stage.label}
          </span>
          <span
            style={{
              fontFamily: FONT.mono,
              fontSize: 10.5,
              color: stage.strip,
              fontWeight: 600,
            } as React.CSSProperties}
          >
            &middot; {stage.day}
          </span>
        </div>
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 12.5,
            fontWeight: 400,
            color: BRAND.stoneDark,
            lineHeight: 1.45,
          } as React.CSSProperties}
        >
          {stage.desc}
        </div>
      </div>
    </div>
  );
}

// ── PolaroidTimelineBright ────────────────────────────────────────────────────

function PolaroidTimelineBright() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      style={{
        background: BRAND.white,
        borderRadius: 22,
        padding: 28,
        boxShadow: SHADOW.card,
        position: "relative",
        overflow: "hidden",
      } as React.CSSProperties}
    >
      {/* Corner glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 200,
          height: 200,
          background: `radial-gradient(circle at 100% 0%, ${BRAND.rustWash} 0%, transparent 60%)`,
          pointerEvents: "none",
        } as React.CSSProperties}
      />

      {/* Project header */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 22,
          paddingBottom: 18,
          borderBottom: `1px solid ${BRAND.borderSoft}`,
        } as React.CSSProperties}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 } as React.CSSProperties}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: GRADIENT.cardRust,
              border: `1px solid ${BRAND.rust}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            } as React.CSSProperties}
          >
            <ImageIcon size={18} color={BRAND.rust} strokeWidth={2} />
          </div>
          <div>
            <div
              style={{
                fontFamily: FONT.sans,
                fontSize: 15,
                fontWeight: 600,
                color: BRAND.onyx,
                letterSpacing: "-0.01em",
              } as React.CSSProperties}
            >
              Asha M. &middot; Koi sleeve
            </div>
            <div
              style={{
                fontFamily: FONT.sans,
                fontSize: 12.5,
                color: BRAND.stoneFaint,
              } as React.CSSProperties}
            >
              Project &middot; S4 of 5 &middot; 10 weeks &middot; Miles Verena
            </div>
          </div>
        </div>
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 11,
            color: BRAND.rust,
            fontWeight: 600,
            padding: "6px 12px",
            borderRadius: 100,
            background: BRAND.rustSoft,
            letterSpacing: "0.04em",
          } as React.CSSProperties}
        >
          &middot; in progress
        </div>
      </div>

      {/* 4-panel polaroid grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 14,
        } as React.CSSProperties}
        className="v4-polaroid-grid"
      >
        {stages.map((stage, i) => (
          <motion.div
            key={stage.tag}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <PolaroidPanelBright stage={stage} />
          </motion.div>
        ))}
      </div>

      {/* Footer punchline */}
      <div
        style={{
          marginTop: 24,
          padding: "16px 20px",
          background: GRADIENT.cardRust,
          borderRadius: 12,
          fontFamily: FONT.sans,
          fontSize: 14,
          fontWeight: 500,
          color: BRAND.onyx,
          lineHeight: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 12,
        } as React.CSSProperties}
      >
        <Sparkles size={16} color={BRAND.rust} strokeWidth={2.2} />
        <span>
          Four images. One sleeve. The progression of healed ink, recorded the way
          the work actually unfolds &mdash;{" "}
          <strong>
            only competitor that has it is the camera roll on your phone.
          </strong>
        </span>
      </div>
    </motion.div>
  );
}

// ── MoatCardBright ────────────────────────────────────────────────────────────

interface MoatCardBrightProps {
  accent: "rust" | "amber" | "sage";
  icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  title: string;
  body: string;
  detail: [string, string][];
}

const accentMap = {
  rust:  { color: BRAND.rust,  bg: BRAND.rustWash,  glow: GRADIENT.cardRust  },
  amber: { color: BRAND.amber, bg: BRAND.amberWash, glow: GRADIENT.cardAmber },
  sage:  { color: BRAND.sage,  bg: BRAND.sageWash,  glow: GRADIENT.cardSage  },
} as const;

function MoatCardBright({ accent, icon: Icon, title, body, detail }: MoatCardBrightProps) {
  const a = accentMap[accent];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, boxShadow: SHADOW.card }}
      style={{
        background: BRAND.white,
        borderRadius: 18,
        padding: 28,
        boxShadow: SHADOW.soft,
        display: "flex",
        flexDirection: "column",
        gap: 18,
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.25s, box-shadow 0.25s",
      } as React.CSSProperties}
    >
      {/* Top accent strip */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: a.color,
        } as React.CSSProperties}
      />

      {/* Corner glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 120,
          height: 120,
          background: `radial-gradient(circle at 100% 0%, ${a.bg} 0%, transparent 70%)`,
          pointerEvents: "none",
        } as React.CSSProperties}
      />

      <div style={{ position: "relative" } as React.CSSProperties}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: a.glow,
            border: `1px solid ${a.color}25`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          } as React.CSSProperties}
        >
          <Icon size={20} color={a.color} strokeWidth={2} />
        </div>
      </div>

      <div style={{ position: "relative" } as React.CSSProperties}>
        <h3
          style={{
            fontFamily: FONT.sans,
            fontSize: 19,
            fontWeight: 600,
            color: BRAND.onyx,
            letterSpacing: "-0.015em",
            marginBottom: 10,
            lineHeight: 1.25,
          } as React.CSSProperties}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: FONT.sans,
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 1.6,
            color: BRAND.stoneDark,
          } as React.CSSProperties}
        >
          {body}
        </p>
      </div>

      <div
        style={{
          background: a.bg,
          borderRadius: 12,
          padding: "4px 16px",
          marginTop: "auto",
          position: "relative",
        } as React.CSSProperties}
      >
        {detail.map((row, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              padding: "10px 0",
              borderBottom:
                i < detail.length - 1 ? `1px dashed ${a.color}25` : "none",
              gap: 12,
            } as React.CSSProperties}
          >
            <span
              style={{
                fontFamily: FONT.sans,
                fontSize: 11.5,
                fontWeight: 500,
                color: BRAND.stoneDark,
              } as React.CSSProperties}
            >
              {row[0]}
            </span>
            <span
              style={{
                fontFamily: FONT.sans,
                fontSize: 12,
                fontWeight: 600,
                color: BRAND.onyx,
                textAlign: "right",
              } as React.CSSProperties}
            >
              {row[1]}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Work (main export) ────────────────────────────────────────────────────────

export function Work() {
  return (
    <section
      style={{
        background: GRADIENT.sectionCool,
        position: "relative",
        overflow: "hidden",
        paddingTop: 100,
        paddingBottom: 100,
      } as React.CSSProperties}
    >
      <MangomintBlobs variant="soft" />

      {/* AmberWash blob bottom-left */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 700,
          height: 500,
          background: `radial-gradient(ellipse at 0% 100%, ${BRAND.amberWash} 0%, transparent 60%)`,
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
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 56, maxWidth: 760 } as React.CSSProperties}
        >
          <SectionEyebrow label="The work" accent="sage" />
          <SectionHeading>
            Ten weeks of one sleeve, tracked across every visit.
          </SectionHeading>
          <SectionSubhead>
            A tattoo is the third of five visits, shares a deposit pool, runs against
            an allergy chart, needs sterilization either side, and waits on a body
            zone to heal. InkOS knows all of that &mdash; every time you tap a slot.
          </SectionSubhead>
        </motion.div>

        <PolaroidTimelineBright />

        {/* Three moats section */}
        <div style={{ marginTop: 80 } as React.CSSProperties}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: 32, maxWidth: 760 } as React.CSSProperties}
          >
            <SectionEyebrow label="Three things no competitor has built" accent="rust" />
            <SectionHeading size="sm">What makes tattoo, tattoo.</SectionHeading>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 18,
            } as React.CSSProperties}
            className="v4-moat-grid"
          >
            <MoatCardBright
              accent="rust"
              icon={LayoutGrid}
              title="Multi-session project grouping"
              body="A sleeve is one project, four visits. InkOS keeps the deposit pool, photo timeline, consent history, and artist's notes attached to the project — not the appointment."
              detail={[
                ["Deposit pool",   "$420 of $600"],
                ["Session count",  "S4 of 5"],
                ["Photo timeline", "4 photos"],
              ]}
            />
            <MoatCardBright
              accent="amber"
              icon={AlertCircle}
              title="Allergy & medical intelligence"
              body="A client updates their kiosk form Tuesday. By Thursday morning the banner pulses on Today, the schedule card flags red, and the artist's brief opens with 'patch-test the new ink first.'"
              detail={[
                ["Allergy field",  "Red ink · latex"],
                ["Last updated",   "8 days ago"],
                ["Surfaces in",    "Today · Schedule"],
              ]}
            />
            <MoatCardBright
              accent="sage"
              icon={DollarSign}
              title="Deposit pool accounting"
              body="Deposits sit in a pool against the project, not the session. Apply $200 to S2, the rest carries. Refund S5 partial, the pool re-balances. No Friday night reconciling."
              detail={[
                ["Pool balance",  "$420 banked"],
                ["Applied",       "S1: $100 · S2: $120"],
                ["Routing",       "Stripe Connect"],
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
