"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { BRAND, FONT, SHADOW, GRADIENT, fadeUp, stagger } from "@/lib/brand";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { PhotoBand } from "@/components/brand/photo-band";

interface StoryStat {
  l: string;
  v: string;
}

interface StoryData {
  name: string;
  role: string;
  city: string;
  chairs: string;
  quote: string;
  stats: StoryStat[];
  gradient: string;
  initials: string;
}

const stories: StoryData[] = [
  {
    name: "Miles Verena",
    role: "Owner · Sable & Sparrow",
    city: "Brooklyn, NY",
    chairs: "4 chairs · 6 artists",
    quote:
      "We used to lose forty minutes every morning to app-switching. Now I open Today and the schedule's loaded before my coffee.",
    stats: [
      { l: "Time recovered", v: "12 hr / wk" },
      { l: "Booking lift", v: "+22%" },
      { l: "Migration", v: "9 days" },
    ],
    gradient: `linear-gradient(135deg, ${BRAND.rust} 0%, ${BRAND.rustGlow} 50%, ${BRAND.amber} 100%)`,
    initials: "MV",
  },
  {
    name: "Kaia Osei",
    role: "Solo · Nine Lives Tattoo",
    city: "East London, UK",
    chairs: "1 chair · resident-only",
    quote:
      "My whole week starts with a six-minute triage now. Inbox sorts the urgent stuff before I've even opened the shop.",
    stats: [
      { l: "Triage time", v: "6 min" },
      { l: "Disputes won", v: "4 of 4" },
      { l: "Migration", v: "1 day" },
    ],
    gradient: `linear-gradient(135deg, ${BRAND.amber} 0%, ${BRAND.rustGlow} 50%, ${BRAND.rust} 100%)`,
    initials: "KO",
  },
  {
    name: "Rafael Moreno",
    role: "Owner · Calle Negra",
    city: "Mexico City, MX",
    chairs: "9 artists · 2 floors",
    quote:
      "InkOS shows me a body — what's been worked, what's healing, what's left. Booking a back piece across ten weeks takes twelve minutes now.",
    stats: [
      { l: "Active sleeves", v: "14" },
      { l: "Guest residencies", v: "6 in 2025" },
      { l: "Disputes", v: "$0" },
    ],
    gradient: `linear-gradient(135deg, ${BRAND.sage} 0%, ${BRAND.amber} 50%, ${BRAND.rustGlow} 100%)`,
    initials: "RM",
  },
];

const photoBands = [
  {
    label: "Sable & Sparrow · Brooklyn",
    gradient: `linear-gradient(135deg, ${BRAND.rust} 0%, ${BRAND.rustDeep} 40%, ${BRAND.amber} 100%)`,
    flex: 2,
  },
  {
    label: "Nine Lives · East London",
    gradient: `linear-gradient(135deg, ${BRAND.amber} 0%, ${BRAND.rustGlow} 100%)`,
    flex: 1,
  },
  {
    label: "Calle Negra · CDMX",
    gradient: `linear-gradient(135deg, ${BRAND.sage} 0%, ${BRAND.amber} 100%)`,
    flex: 1,
  },
];

interface ArtistStoryCardBrightProps {
  story: StoryData;
  index: number;
}

function ArtistStoryCardBright({ story, index }: ArtistStoryCardBrightProps) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, boxShadow: SHADOW.glow }}
      style={{
        background: BRAND.white,
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: SHADOW.soft,
        border: `1px solid ${BRAND.borderSoft}`,
        cursor: "default",
        transition: "box-shadow 0.22s ease",
      } as React.CSSProperties}
    >
      {/* Portrait band */}
      <div
        style={{
          height: 160,
          background: story.gradient,
          position: "relative",
          overflow: "hidden",
        } as React.CSSProperties}
      >
        {/* Noise texture overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
            opacity: 0.2,
            mixBlendMode: "multiply",
          } as React.CSSProperties}
        />

        {/* Gradient vignette */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, transparent 40%, rgba(15,15,15,0.45) 100%)",
          } as React.CSSProperties}
        />

        {/* Serif initials */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -58%)",
            fontFamily: FONT.serif,
            fontSize: 56,
            fontWeight: 400,
            color: "rgba(247,247,245,0.25)",
            letterSpacing: "-0.02em",
            userSelect: "none",
          } as React.CSSProperties}
        >
          {story.initials}
        </div>

        {/* City badge */}
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: 14,
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "4px 10px",
            borderRadius: 100,
            background: "rgba(247,247,245,0.18)",
            backdropFilter: "blur(6px)",
            fontFamily: FONT.sans,
            fontSize: 11,
            fontWeight: 500,
            color: BRAND.bone,
          } as React.CSSProperties}
        >
          <MapPin size={10} strokeWidth={2} color={BRAND.bone} />
          {story.city}
        </div>

        {/* Index badge */}
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 14,
            fontFamily: FONT.mono,
            fontSize: 10,
            fontWeight: 600,
            color: "rgba(247,247,245,0.6)",
          } as React.CSSProperties}
        >
          0{index + 1}
        </div>
      </div>

      <div style={{ padding: "20px 20px 0" } as React.CSSProperties}>
        {/* Name + role */}
        <div style={{ marginBottom: 12 } as React.CSSProperties}>
          <div
            style={{
              fontFamily: FONT.sans,
              fontSize: 15,
              fontWeight: 700,
              color: BRAND.onyx,
              letterSpacing: "-0.01em",
              marginBottom: 2,
            } as React.CSSProperties}
          >
            {story.name}
          </div>
          <div
            style={{
              fontFamily: FONT.sans,
              fontSize: 12,
              color: BRAND.stoneLight,
            } as React.CSSProperties}
          >
            {story.role} &middot; {story.chairs}
          </div>
        </div>

        {/* Quote */}
        <blockquote
          style={{
            fontFamily: FONT.sans,
            fontSize: 14,
            lineHeight: 1.6,
            color: BRAND.ink,
            fontStyle: "italic",
            marginBottom: 18,
            borderLeft: `3px solid ${BRAND.rust}`,
            paddingLeft: 14,
            marginLeft: 0,
          } as React.CSSProperties}
        >
          &ldquo;{story.quote}&rdquo;
        </blockquote>
      </div>

      {/* Stats table */}
      <div
        style={{
          borderTop: `1px solid ${BRAND.borderSoft}`,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
        } as React.CSSProperties}
      >
        {story.stats.map((stat, i) => (
          <div
            key={i}
            style={{
              padding: "12px 14px",
              borderRight:
                i < story.stats.length - 1
                  ? `1px solid ${BRAND.borderSoft}`
                  : "none",
              display: "flex",
              flexDirection: "column",
              gap: 3,
            } as React.CSSProperties}
          >
            <span
              style={{
                fontFamily: FONT.mono,
                fontSize: 14,
                fontWeight: 700,
                color: BRAND.onyx,
                letterSpacing: "-0.01em",
              } as React.CSSProperties}
            >
              {stat.v}
            </span>
            <span
              style={{
                fontFamily: FONT.sans,
                fontSize: 10,
                color: BRAND.stoneLight,
                lineHeight: 1.3,
              } as React.CSSProperties}
            >
              {stat.l}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function Proof() {
  return (
    <section
      style={{
        background: GRADIENT.sectionWarm,
        paddingTop: 100,
        paddingBottom: 100,
        overflow: "hidden",
        position: "relative",
      } as React.CSSProperties}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0 24px",
        } as React.CSSProperties}
      >
        {/* Section header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginBottom: 52,
          } as React.CSSProperties}
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <SectionEyebrow label="The proof" accent="rust" />
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
            } as React.CSSProperties}
          >
            Three studios. Three outcomes, not features.
          </motion.h2>
        </div>

        {/* Photo band row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: 14,
            marginBottom: 32,
          } as React.CSSProperties}
          className="v6-photo-band"
        >
          {photoBands.map((band, i) => (
            <div key={i}>
              <PhotoBand
                height={280}
                label={band.label}
                gradient={band.gradient}
              />
            </div>
          ))}
        </motion.div>

        {/* Story cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          } as React.CSSProperties}
          className="v4-stories-grid"
        >
          {stories.map((story, i) => (
            <ArtistStoryCardBright key={story.name} story={story} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
