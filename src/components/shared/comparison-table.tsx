import React from "react";
import { Check, Minus } from "lucide-react";
import { BRAND, FONT, SHADOW } from "@/lib/brand";

type CellValue = boolean | string;

interface ComparisonRow {
  feature: string;
  values: Record<string, CellValue>;
}

interface Competitor {
  key: string;
  label: string;
  highlighted?: boolean;
}

interface ComparisonTableProps {
  competitors: Competitor[];
  rows: ComparisonRow[];
  caption?: string;
}

export function ComparisonTable({
  competitors,
  rows,
  caption,
}: ComparisonTableProps) {
  const colCount = competitors.length + 1;

  return (
    <div
      style={{
        background: BRAND.white,
        borderRadius: 18,
        boxShadow: SHADOW.card,
        overflow: "hidden",
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

      {/* Header row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${colCount}, 1fr)`,
          padding: "14px 24px",
          borderBottom: `1px solid ${BRAND.border}`,
          background: BRAND.boneDeep,
        } as React.CSSProperties}
      >
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 11,
            fontWeight: 600,
            color: BRAND.stoneLight,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          } as React.CSSProperties}
        >
          Feature
        </div>
        {competitors.map((c) => (
          <div
            key={c.key}
            style={{
              fontFamily: FONT.sans,
              fontSize: 11,
              fontWeight: 600,
              color: c.highlighted ? BRAND.rust : BRAND.stoneLight,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              background: c.highlighted ? BRAND.rustSoft : "transparent",
              padding: c.highlighted ? "2px 8px" : "0",
              borderRadius: c.highlighted ? 4 : 0,
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            } as React.CSSProperties}
          >
            {c.highlighted && "★ "}
            {c.label}
          </div>
        ))}
      </div>

      {/* Data rows */}
      {rows.map((row, rowIdx) => (
        <div
          key={rowIdx}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${colCount}, 1fr)`,
            padding: "16px 24px",
            borderBottom:
              rowIdx < rows.length - 1
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
            } as React.CSSProperties}
          >
            {row.feature}
          </div>
          {competitors.map((c) => {
            const val = row.values[c.key];
            return (
              <div
                key={c.key}
                style={{
                  background: c.highlighted ? BRAND.rustWash : "transparent",
                  display: "flex",
                  alignItems: "center",
                  padding: "4px 0",
                } as React.CSSProperties}
              >
                {val === true ? (
                  <Check size={14} color={BRAND.sage} strokeWidth={2.4} />
                ) : val === false ? (
                  <Minus size={14} color={BRAND.stoneLight} strokeWidth={2} />
                ) : (
                  <span
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 12,
                      fontStyle: "italic",
                      color: BRAND.stoneLight,
                    } as React.CSSProperties}
                  >
                    {val}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}

      {caption && (
        <div
          style={{
            padding: "14px 24px",
            fontFamily: FONT.sans,
            fontSize: 11,
            fontStyle: "italic",
            color: BRAND.stoneFaint,
            textAlign: "center",
          } as React.CSSProperties}
        >
          {caption}
        </div>
      )}
    </div>
  );
}
