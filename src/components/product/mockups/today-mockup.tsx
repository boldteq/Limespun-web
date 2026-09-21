"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles, Inbox, Calendar, MessageSquare, Clock,
  LayoutGrid, Users, Heart,
  Bell, AlertCircle, Plus, ChevronDown, ArrowRight,
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

interface ScheduleRow {
  timeStart: string;
  timeEnd: string;
  client: string;
  project: string;
  artist: string;
  status?: "live" | "next";
  warn?: boolean;
}

interface ProjectRow {
  client: string;
  step: string;
  paid: string;
  total: string;
  dot: string;
  pct: number;
}

// ─── Shared Sidebar ─────────────────────────────────────────────────────────────

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
      {/* Logo */}
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
          Limespun
        </div>
      </div>

      {/* Studio group */}
      <NavGroupLabel label="Studio" />
      {studioItems.map((item, i) => (
        <NavItemRow key={i} item={item} />
      ))}

      {/* Workflow group */}
      <NavGroupLabel label="Workflow" />
      {workflowItems.map((item, i) => (
        <NavItemRow key={i} item={item} />
      ))}

      <div style={{ flex: 1 } as React.CSSProperties} />

      {/* User card */}
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

// ─── Data ──────────────────────────────────────────────────────────────────────

interface KpiCard {
  label: string;
  value: string;
  delta: string;
  good?: boolean;
  warn?: boolean;
}

const kpis: KpiCard[] = [
  { label: "Today's revenue",  value: "$8,320", delta: "+12.4% vs Tue",  good: true },
  { label: "Bookings on deck", value: "26",     delta: "+4 this week" },
  { label: "No-show risk",     value: "3",      delta: "Risk down 1.2%", warn: true },
  { label: "Commissions owed", value: "$4,280", delta: "+6.1% trailing", good: true },
];

const scheduleRows: ScheduleRow[] = [
  { timeStart: "9:00",  timeEnd: "10:30", client: "Asha Mehra",  project: "Koi sleeve · Session 4 of 5",   artist: "Miles",  status: "live" },
  { timeStart: "11:00", timeEnd: "12:00", client: "Marcus Lane", project: "Consultation · 90 min",         artist: "Rafael", status: "next" },
  { timeStart: "1:00",  timeEnd: "3:30",  client: "Elena Ruiz",  project: "Back piece · Session 2 of 3",   artist: "Miles",  warn: true },
  { timeStart: "4:00",  timeEnd: "5:00",  client: "Jonah Park",  project: "Touch-up · Geometric forearm",  artist: "Rafael" },
];

const projectRows: ProjectRow[] = [
  { client: "Asha · Koi sleeve",   step: "S4 of 5", paid: "$420", total: "$600", dot: BRAND.rust,    pct: 80 },
  { client: "Elena · Back piece",  step: "S2 of 3", paid: "$300", total: "$300", dot: BRAND.success, pct: 67 },
  { client: "Tomas · Half-sleeve", step: "Booked",  paid: "$0",   total: "$200", dot: BRAND.amber,   pct: 0 },
];

// ─── TodayMockup ───────────────────────────────────────────────────────────────

export function TodayMockup() {
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
          app.limespun.com/today
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
            padding: "28px 32px",
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
              marginBottom: 22,
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
                Good morning, Miles
              </div>
              <div
                style={{
                  fontFamily: FONT.serif,
                  fontSize: 32,
                  color: BRAND.onyx,
                  lineHeight: 1.1,
                } as React.CSSProperties}
              >
                Thursday,{" "}
                <em>24 April</em>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" } as React.CSSProperties}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "#FFFFFF",
                  border: `1px solid ${BRAND.border}`,
                  borderRadius: 100,
                  padding: "6px 12px",
                  fontFamily: FONT.sans,
                  fontSize: 11.5,
                  fontWeight: 500,
                  color: BRAND.stoneDark,
                  cursor: "default",
                } as React.CSSProperties}
              >
                <Bell size={12} strokeWidth={1.8} />
                2 alerts
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: BRAND.onyx,
                  border: `1px solid ${BRAND.onyx}`,
                  borderRadius: 100,
                  padding: "6px 12px",
                  fontFamily: FONT.sans,
                  fontSize: 11.5,
                  fontWeight: 600,
                  color: BRAND.bone,
                  cursor: "default",
                } as React.CSSProperties}
              >
                <Plus size={12} strokeWidth={2.2} />
                Quick add
              </div>
            </div>
          </div>

          {/* KPI row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 10,
              marginBottom: 18,
            } as React.CSSProperties}
          >
            {kpis.map((kpi, i) => (
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
                    color: kpi.warn ? BRAND.danger : BRAND.onyx,
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
                    color: kpi.good ? BRAND.success : kpi.warn ? BRAND.danger : BRAND.stoneDark,
                  } as React.CSSProperties}
                >
                  {kpi.delta}
                </div>
              </div>
            ))}
          </div>

          {/* Allergy banner */}
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(220,38,38,0.45)",
                "0 0 0 8px rgba(220,38,38,0)",
                "0 0 0 0 rgba(220,38,38,0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              background: BRAND.crimsonSoft,
              border: `1px solid ${BRAND.dangerBorder}`,
              borderRadius: 10,
              padding: "12px 16px",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 12,
            } as React.CSSProperties}
          >
            <AlertCircle size={16} color={BRAND.crimson} strokeWidth={2} />
            <div style={{ flex: 1 } as React.CSSProperties}>
              <div
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: BRAND.crimson,
                  marginBottom: 3,
                } as React.CSSProperties}
              >
                Allergies &amp; medical &middot; 1:00 PM today
              </div>
              <div
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 12.5,
                  color: BRAND.onyx,
                } as React.CSSProperties}
              >
                <strong>Asha Mehra</strong> — red ink allergy &middot; latex sensitivity &middot; last flagged 8 days ago
              </div>
            </div>
            <ArrowRight size={14} color={BRAND.crimson} />
          </motion.div>

          {/* Schedule + Project pulse */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr",
              gap: 12,
            } as React.CSSProperties}
          >
            {/* Schedule card */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: 10,
                border: `1px solid ${BRAND.border}`,
                overflow: "hidden",
              } as React.CSSProperties}
            >
              <div
                style={{
                  padding: "11px 14px",
                  borderBottom: `1px solid ${BRAND.border}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                } as React.CSSProperties}
              >
                <span
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 10.5,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: BRAND.stoneDark,
                  } as React.CSSProperties}
                >
                  Today&apos;s schedule
                </span>
                <span
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 10.5,
                    fontWeight: 500,
                    color: BRAND.stone,
                  } as React.CSSProperties}
                >
                  Miles V &middot; Rafael M
                </span>
              </div>
              {scheduleRows.map((row, i) => (
                <ScheduleRowItem key={i} row={row} first={i === 0} />
              ))}
            </div>

            {/* Project pulse card */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: 10,
                border: `1px solid ${BRAND.border}`,
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
                    fontSize: 10.5,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: BRAND.stoneDark,
                  } as React.CSSProperties}
                >
                  Project pulse
                </span>
              </div>
              {projectRows.map((row, i) => (
                <ProjectRowItem key={i} row={row} first={i === 0} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ScheduleRowItem ───────────────────────────────────────────────────────────

function ScheduleRowItem({ row, first }: { row: ScheduleRow; first: boolean }) {
  return (
    <div
      style={{
        padding: "11px 14px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        borderTop: !first ? `1px solid ${BRAND.borderSoft}` : "none",
        background: row.status === "live" ? BRAND.rustSoft : "transparent",
      } as React.CSSProperties}
    >
      <div style={{ width: 56, flexShrink: 0 } as React.CSSProperties}>
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 12.5,
            fontWeight: 700,
            color: BRAND.onyx,
            lineHeight: 1.1,
          } as React.CSSProperties}
        >
          {row.timeStart}
        </div>
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 10,
            color: BRAND.stone,
          } as React.CSSProperties}
        >
          to {row.timeEnd}
        </div>
      </div>
      <div
        style={{
          width: 3,
          height: 36,
          borderRadius: 2,
          flexShrink: 0,
          background:
            row.status === "live"
              ? BRAND.rust
              : row.warn
              ? BRAND.danger
              : BRAND.border,
        } as React.CSSProperties}
      />
      <div style={{ flex: 1 } as React.CSSProperties}>
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 12.5,
            fontWeight: 600,
            color: BRAND.onyx,
            lineHeight: 1.2,
            display: "flex",
            alignItems: "center",
            gap: 6,
          } as React.CSSProperties}
        >
          {row.client}
          {row.warn && (
            <span
              style={{
                fontFamily: FONT.sans,
                fontSize: 9,
                fontWeight: 700,
                color: BRAND.bone,
                background: BRAND.danger,
                padding: "1px 4px",
                borderRadius: 4,
              } as React.CSSProperties}
            >
              ⚠ allergy
            </span>
          )}
        </div>
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 11,
            color: BRAND.stone,
            marginTop: 2,
          } as React.CSSProperties}
        >
          {row.project} &middot; {row.artist}
        </div>
      </div>
      {row.status === "live" && (
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: BRAND.bone,
            background: BRAND.rust,
            padding: "3px 8px",
            borderRadius: 100,
          } as React.CSSProperties}
        >
          LIVE
        </div>
      )}
      {row.status === "next" && (
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 9.5,
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: BRAND.rust,
          } as React.CSSProperties}
        >
          NEXT →
        </div>
      )}
    </div>
  );
}

// ─── ProjectRowItem ────────────────────────────────────────────────────────────

function ProjectRowItem({ row, first }: { row: ProjectRow; first: boolean }) {
  return (
    <div
      style={{
        padding: "12px 14px",
        borderTop: !first ? `1px solid ${BRAND.borderSoft}` : "none",
      } as React.CSSProperties}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          marginBottom: 7,
        } as React.CSSProperties}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: 100,
            background: row.dot,
            flexShrink: 0,
          } as React.CSSProperties}
        />
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 12,
            fontWeight: 600,
            color: BRAND.onyx,
            flex: 1,
          } as React.CSSProperties}
        >
          {row.client}
        </div>
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 10,
            fontWeight: 500,
            color: BRAND.stone,
          } as React.CSSProperties}
        >
          {row.step}
        </div>
      </div>
      <div
        style={{
          height: 4,
          background: BRAND.boneDeep,
          borderRadius: 2,
          overflow: "hidden",
          marginBottom: 6,
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
      <div
        style={{
          fontFamily: FONT.sans,
          fontSize: 10,
          color: BRAND.stoneDark,
        } as React.CSSProperties}
      >
        Deposit:{" "}
        <strong
          style={{
            fontWeight: 600,
            color: BRAND.onyx,
          } as React.CSSProperties}
        >
          {row.paid} / {row.total}
        </strong>
      </div>
    </div>
  );
}
