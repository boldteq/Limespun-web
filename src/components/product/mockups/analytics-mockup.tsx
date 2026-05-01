"use client";

import React from "react";
import {
  ArrowUpRight, ChevronDown, AlertCircle,
  Sparkles, Inbox, Calendar, MessageSquare, Clock,
  LayoutGrid, Users, Heart,
} from "lucide-react";
import { BRAND, FONT } from "@/lib/brand";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface NavItem {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
  active?: boolean;
  badge?: number;
  tag?: string;
}

interface KpiCard {
  label: string;
  value: string;
  delta: string;
  sparkColor: string;
  sparkPoints: string;
}

interface ArtistRow {
  name: string;
  revenue: string;
  pct: number;
}

interface RiskRow {
  client: string;
  level: "high" | "medium" | "low";
  badge: string;
  badgeBg: string;
  badgeColor: string;
}

// ─── Sidebar ───────────────────────────────────────────────────────────────────

function Sidebar({ activeItem }: { activeItem: string }) {
  const studioItems: NavItem[] = [
    { icon: Sparkles,      label: "Today",        active: activeItem === "Today" },
    { icon: Inbox,         label: "Inbox",        badge: 3 },
    { icon: Calendar,      label: "Calendar" },
    { icon: MessageSquare, label: "Messages",     badge: 2 },
    { icon: Clock,         label: "Appointments" },
  ];
  const workflowItems: NavItem[] = [
    { icon: LayoutGrid, label: "Projects", tag: "NEW" },
    { icon: Users,      label: "Clients" },
    { icon: Heart,      label: "Team" },
  ];

  return (
    <div
      style={{
        background: BRAND.onyx,
        color: BRAND.bone,
        padding: "20px 14px",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      } as React.CSSProperties}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "4px 6px",
          marginBottom: 22,
        } as React.CSSProperties}
      >
        <div
          style={{
            width: 26,
            height: 26,
            background: BRAND.bone,
            color: BRAND.onyx,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONT.serif,
            fontStyle: "italic",
            fontSize: 18,
            lineHeight: 1,
          } as React.CSSProperties}
        >
          i
        </div>
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 14,
            fontWeight: 700,
            color: BRAND.bone,
          } as React.CSSProperties}
        >
          InkOS
        </div>
      </div>

      <NavGroupLabel label="Studio" />
      {studioItems.map((item, i) => (
        <NavItemRow key={i} item={item} />
      ))}

      <NavGroupLabel label="Workflow" />
      {workflowItems.map((item, i) => (
        <NavItemRow key={i} item={item} />
      ))}

      <div style={{ flex: 1 } as React.CSSProperties} />

      <div
        style={{
          padding: "10px 10px",
          borderRadius: 8,
          background: "rgba(247,247,245,0.06)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        } as React.CSSProperties}
      >
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 100,
            background: `linear-gradient(135deg, ${BRAND.rust}, ${BRAND.rustDeep})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONT.serif,
            fontSize: 13,
            color: BRAND.bone,
            fontStyle: "italic",
            flexShrink: 0,
          } as React.CSSProperties}
        >
          s
        </div>
        <div style={{ flex: 1, minWidth: 0 } as React.CSSProperties}>
          <div
            style={{
              fontFamily: FONT.sans,
              fontSize: 11,
              fontWeight: 600,
              color: BRAND.bone,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            } as React.CSSProperties}
          >
            Sable &amp; Sparrow
          </div>
          <div
            style={{
              fontFamily: FONT.sans,
              fontSize: 9,
              color: "rgba(247,247,245,0.5)",
            } as React.CSSProperties}
          >
            Brooklyn
          </div>
        </div>
        <ChevronDown size={11} color="rgba(247,247,245,0.5)" />
      </div>
    </div>
  );
}

function NavGroupLabel({ label }: { label: string }) {
  return (
    <div
      style={{
        fontFamily: FONT.sans,
        fontSize: 9,
        letterSpacing: "0.14em",
        color: "rgba(247,247,245,0.4)",
        fontWeight: 700,
        padding: "2px 8px 6px",
        textTransform: "uppercase",
        marginTop: 10,
      } as React.CSSProperties}
    >
      {label}
    </div>
  );
}

function NavItemRow({ item }: { item: NavItem }) {
  const Icon = item.icon;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 10px",
        borderRadius: 7,
        fontFamily: FONT.sans,
        fontSize: 12.5,
        background: item.active ? "rgba(247,247,245,0.10)" : "transparent",
        color: item.active ? BRAND.bone : "rgba(247,247,245,0.7)",
        fontWeight: item.active ? 600 : 500,
      } as React.CSSProperties}
    >
      <Icon size={13} strokeWidth={1.6} />
      <span style={{ flex: 1 } as React.CSSProperties}>{item.label}</span>
      {item.badge !== undefined && item.badge > 0 && (
        <span
          style={{
            background: BRAND.rust,
            color: BRAND.bone,
            fontFamily: FONT.sans,
            fontSize: 9,
            fontWeight: 700,
            padding: "1.5px 5.5px",
            borderRadius: 8,
          } as React.CSSProperties}
        >
          {item.badge}
        </span>
      )}
      {item.tag && (
        <span
          style={{
            fontFamily: FONT.sans,
            fontSize: 8,
            color: BRAND.rust,
            letterSpacing: "0.12em",
            fontWeight: 700,
          } as React.CSSProperties}
        >
          {item.tag}
        </span>
      )}
    </div>
  );
}

// ─── Sparkline helpers ─────────────────────────────────────────────────────────

function Sparkline({ points, color }: { points: string; color: string }) {
  return (
    <svg width={80} height={24} viewBox="0 0 80 24" fill="none">
      <polyline
        points={points}
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={0.9}
      />
    </svg>
  );
}

// ─── Bar chart helpers ─────────────────────────────────────────────────────────

const BAR_HEIGHTS = [
  42, 58, 35, 72, 88, 55, 40, 65, 78, 50, 44, 91, 68, 54, 37,
  82, 70, 48, 60, 76, 95, 83, 57, 43, 66, 52, 39, 74, 61, 47,
];

function BarChart() {
  const svgW = 560;
  const svgH = 200;
  const barW = 13;
  const gap = 5;
  const maxH = 140;

  return (
    <svg width="100%" height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={BRAND.rust} stopOpacity="0.9" />
          <stop offset="100%" stopColor={BRAND.rustGlow} stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {BAR_HEIGHTS.map((h, i) => {
        const scaledH = (h / 100) * maxH;
        const x = i * (barW + gap) + 4;
        const y = svgH - scaledH - 20;
        const isHovered = i === 21;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={scaledH}
              rx={3}
              fill={isHovered ? BRAND.rust : "url(#barGrad)"}
              opacity={isHovered ? 1 : 0.72}
            />
            {isHovered && (
              <>
                <rect
                  x={x - 10}
                  y={y - 28}
                  width={60}
                  height={22}
                  rx={5}
                  fill={BRAND.onyx}
                />
                <text
                  x={x + 21}
                  y={y - 13}
                  textAnchor="middle"
                  fontFamily="Inter, sans-serif"
                  fontSize={9}
                  fill={BRAND.bone}
                >
                  Tue Apr 22 · $4,810
                </text>
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const kpiCards: KpiCard[] = [
  {
    label: "Revenue",
    value: "$84,210",
    delta: "+18% this month",
    sparkColor: BRAND.rust,
    sparkPoints: "0,20 10,16 20,18 30,10 40,14 50,6 60,8 70,4 80,2",
  },
  {
    label: "New clients",
    value: "32",
    delta: "+6 vs last month",
    sparkColor: BRAND.amber,
    sparkPoints: "0,18 10,15 20,20 30,12 40,14 50,10 60,13 70,8 80,6",
  },
  {
    label: "Retention",
    value: "84%",
    delta: "+2pt month-on-month",
    sparkColor: BRAND.sage,
    sparkPoints: "0,16 10,14 20,15 30,12 40,10 50,11 60,9 70,8 80,7",
  },
  {
    label: "Avg ticket",
    value: "$620",
    delta: "+$40 vs last month",
    sparkColor: BRAND.rust,
    sparkPoints: "0,20 10,17 20,19 30,13 40,11 50,14 60,9 70,7 80,5",
  },
];

const artistRows: ArtistRow[] = [
  { name: "Miles Verena",  revenue: "$24,400", pct: 100 },
  { name: "Rafael Moreno", revenue: "$19,200", pct: 79 },
  { name: "Yvette Klein",  revenue: "$14,800", pct: 61 },
  { name: "Nina Yates",    revenue: "$11,600", pct: 48 },
];

const riskRows: RiskRow[] = [
  { client: "Asha Mehra",  level: "high",   badge: "High risk",   badgeBg: BRAND.crimsonSoft, badgeColor: BRAND.crimson },
  { client: "Marcus Lane", level: "medium", badge: "Medium",      badgeBg: BRAND.amberSoft,   badgeColor: BRAND.amber },
  { client: "Tomas Vega",  level: "low",    badge: "Low",         badgeBg: BRAND.sageSoft,    badgeColor: BRAND.sage },
];

const chartTabs = ["Daily", "Weekly", "Monthly"];

// ─── AnalyticsMockup ───────────────────────────────────────────────────────────

export function AnalyticsMockup() {
  return (
    <div
      style={{
        borderRadius: 18,
        overflow: "hidden",
        background: "#FFFFFF",
        boxShadow: "0 60px 120px -30px rgba(15,15,15,0.28), 0 12px 28px -8px rgba(15,15,15,0.08)",
        border: `1px solid ${BRAND.border}`,
      } as React.CSSProperties}
    >
      {/* Browser chrome */}
      <div
        style={{
          background: BRAND.boneDeep,
          padding: "12px 18px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          borderBottom: `1px solid ${BRAND.border}`,
        } as React.CSSProperties}
      >
        <div style={{ display: "flex", gap: 7 } as React.CSSProperties}>
          <div style={{ width: 12, height: 12, borderRadius: 100, background: "#FF5F57" } as React.CSSProperties} />
          <div style={{ width: 12, height: 12, borderRadius: 100, background: "#FEBC2E" } as React.CSSProperties} />
          <div style={{ width: 12, height: 12, borderRadius: 100, background: "#28C840" } as React.CSSProperties} />
        </div>
        <div
          style={{
            flex: 1,
            marginLeft: 14,
            background: BRAND.bone,
            borderRadius: 7,
            padding: "6px 12px",
            fontFamily: FONT.mono,
            fontSize: 12,
            color: BRAND.stone,
          } as React.CSSProperties}
        >
          inkos.app/analytics
        </div>
      </div>

      {/* App shell */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "220px 1fr",
          minHeight: 620,
        } as React.CSSProperties}
      >
        <Sidebar activeItem="Today" />

        {/* Main */}
        <div
          style={{
            padding: "24px 28px",
            background: BRAND.bone,
            overflow: "hidden",
          } as React.CSSProperties}
        >
          {/* Header row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 18,
            } as React.CSSProperties}
          >
            <div>
              <div
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: BRAND.stone,
                  marginBottom: 5,
                } as React.CSSProperties}
              >
                Analytics &middot; Last 30 Days
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 } as React.CSSProperties}>
                <span
                  style={{
                    fontFamily: FONT.serif,
                    fontSize: 30,
                    color: BRAND.onyx,
                    lineHeight: 1.1,
                  } as React.CSSProperties}
                >
                  Studio P&amp;L
                </span>
                <span
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 13,
                    fontWeight: 500,
                    color: BRAND.stoneDark,
                  } as React.CSSProperties}
                >
                  &middot; April 2026
                </span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" } as React.CSSProperties}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  background: "#FFFFFF",
                  border: `1px solid ${BRAND.border}`,
                  borderRadius: 100,
                  padding: "6px 12px",
                  fontFamily: FONT.sans,
                  fontSize: 11.5,
                  fontWeight: 500,
                  color: BRAND.stoneDark,
                } as React.CSSProperties}
              >
                Last 30 days
                <ChevronDown size={11} strokeWidth={1.8} />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  background: "#FFFFFF",
                  border: `1px solid ${BRAND.border}`,
                  borderRadius: 100,
                  padding: "6px 12px",
                  fontFamily: FONT.sans,
                  fontSize: 11.5,
                  fontWeight: 500,
                  color: BRAND.stoneDark,
                } as React.CSSProperties}
              >
                <ArrowUpRight size={12} strokeWidth={1.8} />
                Export
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  background: BRAND.onyx,
                  borderRadius: 100,
                  padding: "6px 12px",
                  fontFamily: FONT.sans,
                  fontSize: 11.5,
                  fontWeight: 600,
                  color: BRAND.bone,
                } as React.CSSProperties}
              >
                Compare
              </div>
            </div>
          </div>

          {/* KPI grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 10,
              marginBottom: 16,
            } as React.CSSProperties}
          >
            {kpiCards.map((kpi, i) => (
              <div
                key={i}
                style={{
                  background: "#FFFFFF",
                  padding: "14px 14px",
                  borderRadius: 10,
                  border: `1px solid ${BRAND.border}`,
                } as React.CSSProperties}
              >
                <div
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 9.5,
                    fontWeight: 600,
                    color: BRAND.stone,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  } as React.CSSProperties}
                >
                  {kpi.label}
                </div>
                <div
                  style={{
                    fontFamily: FONT.serif,
                    fontSize: 28,
                    fontWeight: 400,
                    color: BRAND.onyx,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    marginBottom: 4,
                  } as React.CSSProperties}
                >
                  {kpi.value}
                </div>
                <div
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 10.5,
                    fontWeight: 500,
                    color: BRAND.sage,
                    marginBottom: 8,
                  } as React.CSSProperties}
                >
                  {kpi.delta}
                </div>
                <Sparkline points={kpi.sparkPoints} color={kpi.sparkColor} />
              </div>
            ))}
          </div>

          {/* Big chart card */}
          <div
            style={{
              background: "#FFFFFF",
              border: `1px solid ${BRAND.border}`,
              borderRadius: 10,
              padding: 18,
              marginBottom: 14,
            } as React.CSSProperties}
          >
            {/* Chart header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 14,
              } as React.CSSProperties}
            >
              <span
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 13,
                  fontWeight: 700,
                  color: BRAND.onyx,
                } as React.CSSProperties}
              >
                Revenue trend
              </span>
              <div style={{ display: "flex", gap: 4, alignItems: "center" } as React.CSSProperties}>
                {chartTabs.map((tab, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "3px 10px",
                      borderRadius: 6,
                      fontFamily: FONT.sans,
                      fontSize: 11,
                      fontWeight: i === 0 ? 600 : 500,
                      background: i === 0 ? BRAND.boneDeep : "transparent",
                      color: i === 0 ? BRAND.onyx : BRAND.stone,
                    } as React.CSSProperties}
                  >
                    {tab}
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    marginLeft: 8,
                    padding: "3px 10px",
                    borderRadius: 6,
                    border: `1px solid ${BRAND.border}`,
                    fontFamily: FONT.sans,
                    fontSize: 11,
                    fontWeight: 500,
                    color: BRAND.stoneDark,
                  } as React.CSSProperties}
                >
                  By artist
                  <ChevronDown size={10} strokeWidth={1.8} />
                </div>
              </div>
            </div>

            {/* Bar chart */}
            <div style={{ overflow: "hidden" } as React.CSSProperties}>
              <BarChart />
            </div>

            {/* Legend */}
            <div
              style={{
                display: "flex",
                gap: 18,
                marginTop: 10,
              } as React.CSSProperties}
            >
              {[
                { label: "Sessions",      value: "$62,400", color: BRAND.rust },
                { label: "Touch-ups",     value: "$8,240",  color: BRAND.amber },
                { label: "Consultations", value: "$13,570", color: BRAND.sage },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 } as React.CSSProperties}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 2,
                      background: item.color,
                      flexShrink: 0,
                    } as React.CSSProperties}
                  />
                  <span
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 11,
                      color: BRAND.stoneDark,
                    } as React.CSSProperties}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 11,
                      color: BRAND.onyx,
                      fontWeight: 600,
                    } as React.CSSProperties}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            } as React.CSSProperties}
          >
            {/* Top artists */}
            <div
              style={{
                background: "#FFFFFF",
                border: `1px solid ${BRAND.border}`,
                borderRadius: 10,
                overflow: "hidden",
              } as React.CSSProperties}
            >
              <div
                style={{
                  padding: "11px 14px",
                  borderBottom: `1px solid ${BRAND.border}`,
                } as React.CSSProperties}
              >
                <span
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: BRAND.stoneDark,
                  } as React.CSSProperties}
                >
                  Top artists by revenue
                </span>
              </div>
              {artistRows.map((row, i) => (
                <div
                  key={i}
                  style={{
                    padding: "10px 14px",
                    borderTop: i === 0 ? "none" : `1px solid ${BRAND.borderSoft}`,
                  } as React.CSSProperties}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 6,
                    } as React.CSSProperties}
                  >
                    <span
                      style={{
                        fontFamily: FONT.sans,
                        fontSize: 13,
                        fontWeight: 600,
                        color: BRAND.onyx,
                      } as React.CSSProperties}
                    >
                      {row.name}
                    </span>
                    <span
                      style={{
                        fontFamily: FONT.mono,
                        fontSize: 13,
                        color: BRAND.onyx,
                      } as React.CSSProperties}
                    >
                      {row.revenue}
                    </span>
                  </div>
                  <div
                    style={{
                      height: 4,
                      background: BRAND.boneDeep,
                      borderRadius: 2,
                      overflow: "hidden",
                    } as React.CSSProperties}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${row.pct}%`,
                        background: BRAND.onyx,
                        borderRadius: 2,
                      } as React.CSSProperties}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* No-show risk */}
            <div
              style={{
                background: "#FFFFFF",
                border: `1px solid ${BRAND.border}`,
                borderRadius: 10,
                overflow: "hidden",
              } as React.CSSProperties}
            >
              <div
                style={{
                  padding: "11px 14px",
                  borderBottom: `1px solid ${BRAND.border}`,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                } as React.CSSProperties}
              >
                <AlertCircle size={12} color={BRAND.warn} strokeWidth={2} />
                <span
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: BRAND.stoneDark,
                  } as React.CSSProperties}
                >
                  No-show risk &middot; next 14 days
                </span>
              </div>
              {riskRows.map((row, i) => (
                <div
                  key={i}
                  style={{
                    padding: "11px 14px",
                    display: "flex",
                    alignItems: "center",
                    borderTop: i === 0 ? "none" : `1px solid ${BRAND.borderSoft}`,
                  } as React.CSSProperties}
                >
                  <span
                    style={{
                      flex: 1,
                      fontFamily: FONT.sans,
                      fontSize: 13,
                      fontWeight: 600,
                      color: BRAND.onyx,
                    } as React.CSSProperties}
                  >
                    {row.client}
                  </span>
                  <span
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 11,
                      fontWeight: 600,
                      color: row.badgeColor,
                      background: row.badgeBg,
                      padding: "3px 8px",
                      borderRadius: 100,
                      marginRight: 10,
                    } as React.CSSProperties}
                  >
                    {row.badge}
                  </span>
                  <span
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 11,
                      fontWeight: 600,
                      color: BRAND.onyx,
                    } as React.CSSProperties}
                  >
                    send reminder
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
