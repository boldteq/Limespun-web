import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { BRAND, FONT, SHADOW, fadeUp } from "@/lib/brand";

interface TestimonialStat {
  l: string;
  v: string;
}

interface TestimonialCardProps {
  name: string;
  role: string;
  city: string;
  chairs: string;
  quote: string;
  stats: TestimonialStat[];
  gradient: string;
  initials: string;
  index?: number;
}

export function TestimonialCard({
  name,
  role,
  city,
  chairs,
  quote,
  stats,
  gradient,
  initials,
  index,
}: TestimonialCardProps) {
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
          background: gradient,
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
            background:
              "linear-gradient(180deg, transparent 40%, rgba(15,15,15,0.45) 100%)",
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
          {initials}
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
          {city}
        </div>

        {/* Index badge */}
        {index !== undefined && (
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
            {String(index + 1).padStart(2, "0")}
          </div>
        )}
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
            {name}
          </div>
          <div
            style={{
              fontFamily: FONT.sans,
              fontSize: 12,
              color: BRAND.stoneLight,
            } as React.CSSProperties}
          >
            {role} &middot; {chairs}
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
          &ldquo;{quote}&rdquo;
        </blockquote>
      </div>

      {/* Stats footer */}
      <div
        style={{
          borderTop: `1px solid ${BRAND.borderSoft}`,
          display: "grid",
          gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
        } as React.CSSProperties}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            style={{
              padding: "12px 14px",
              borderRight:
                i < stats.length - 1
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
