import React from "react";
import { BRAND, FONT } from "@/lib/brand";

interface LogoBarProps {
  logos: Array<{ name: string; type?: "studio" | "press" }>;
  caption?: string;
  variant?: "default" | "dark";
}

export function LogoBar({ logos, caption, variant = "default" }: LogoBarProps) {
  const isDark = variant === "dark";

  return (
    <div
      style={{
        padding: "32px 0",
      } as React.CSSProperties}
    >
      {caption && (
        <div
          style={{
            textAlign: "center",
            marginBottom: 20,
            fontFamily: FONT.sans,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: isDark ? "rgba(247,247,245,0.5)" : BRAND.stoneLight,
          } as React.CSSProperties}
        >
          {caption}
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: 48,
          opacity: 0.6,
        } as React.CSSProperties}
      >
        {logos.map((logo) => (
          <span
            key={logo.name}
            style={{
              fontFamily: FONT.serif,
              fontStyle: "italic",
              fontSize: 22,
              color: isDark ? BRAND.bone : BRAND.stoneDark,
              userSelect: "none",
            } as React.CSSProperties}
          >
            {logo.name}
          </span>
        ))}
      </div>
    </div>
  );
}
