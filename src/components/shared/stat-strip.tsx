import React from "react";
import { BRAND, FONT } from "@/lib/brand";

interface StatStripItem {
  stat: string;
  label: string;
}

interface StatStripProps {
  items: StatStripItem[];
  variant?: "default" | "dark";
  bordered?: boolean;
}

export function StatStrip({
  items,
  variant = "default",
  bordered = true,
}: StatStripProps) {
  const isDark = variant === "dark";
  const borderColor = isDark ? "rgba(247,247,245,0.12)" : BRAND.border;

  return (
    <div
      style={{
        padding: "28px 0",
        display: "grid",
        gridTemplateColumns: `repeat(${items.length}, 1fr)`,
        gap: 32,
        borderTop: bordered ? `1px solid ${borderColor}` : undefined,
        borderBottom: bordered ? `1px solid ${borderColor}` : undefined,
      } as React.CSSProperties}
      className="v4-hero-trust"
    >
      {items.map((item, i) => (
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
            {item.stat}
          </div>
          <div
            style={{
              fontFamily: FONT.sans,
              fontSize: 13,
              fontWeight: 400,
              color: isDark ? BRAND.stoneLight : BRAND.stone,
            } as React.CSSProperties}
          >
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
