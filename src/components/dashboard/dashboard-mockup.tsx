"use client";

import React from "react";
import {
  Sparkles, Inbox, Calendar, MessageSquare, Clock,
  Users, LayoutGrid, ImageIcon, FileText, CreditCard,
  Package, BarChart3, Megaphone, Heart,
  AlertCircle, ArrowRight, ChevronDown,
} from "lucide-react";
import { BRAND, FONT, SHADOW } from "@/lib/brand";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavGroupProps {
  title: string;
  items: Array<{
    icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
    label: string;
    active?: boolean;
    badge?: number;
    tag?: string;
  }>;
}

interface ScheduleRowData {
  t: string;
  d: string;
  c: string;
  p: string;
  a: string;
  status?: "live" | "next";
  warn?: boolean;
}

interface ProjectRowData {
  c: string;
  s: string;
  dep: string;
  dot: string;
  pct: number;
}

export interface DashboardMockupProps {
  hero?: boolean;
}

// ─── NavGroup ─────────────────────────────────────────────────────────────────

function NavGroup({ title, items }: NavGroupProps) {
  return (
    <>
      <div
        style={{
          fontFamily: FONT.sans,
          fontSize: 10,
          letterSpacing: "0.08em",
          color: "rgba(247,247,245,0.45)",
          fontWeight: 500,
          padding: "14px 8px 8px",
          textTransform: "uppercase",
        } as React.CSSProperties}
      >
        {title}
      </div>
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "7px 10px",
              borderRadius: 7,
              fontFamily: FONT.sans,
              fontSize: 12.5,
              background: item.active ? "rgba(247,247,245,0.10)" : "transparent",
              color: item.active ? BRAND.bone : "rgba(247,247,245,0.7)",
              fontWeight: item.active ? 500 : 400,
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
                  padding: "1.5px 5.5px",
                  borderRadius: 8,
                  fontWeight: 600,
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
                  color: BRAND.rustBright,
                  letterSpacing: "0.1em",
                  fontWeight: 600,
                } as React.CSSProperties}
              >
                {item.tag}
              </span>
            )}
          </div>
        );
      })}
    </>
  );
}

// ─── DashSectionHeader ────────────────────────────────────────────────────────

function DashSectionHeader({ text, right }: { text: string; right?: string }) {
  return (
    <div
      style={{
        padding: "12px 16px",
        borderBottom: `1px solid ${BRAND.border}`,
        fontFamily: FONT.sans,
        fontSize: 12,
        fontWeight: 600,
        color: BRAND.onyx,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      } as React.CSSProperties}
    >
      <span>{text}</span>
      {right && (
        <span style={{ color: BRAND.stoneFaint, fontWeight: 400, fontSize: 11 } as React.CSSProperties}>
          {right}
        </span>
      )}
    </div>
  );
}

// ─── ScheduleRow ──────────────────────────────────────────────────────────────

function ScheduleRow({ row, first }: { row: ScheduleRowData; first: boolean }) {
  return (
    <div
      style={{
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        borderTop: !first ? `1px solid ${BRAND.borderSoft}` : "none",
        background: row.status === "live" ? BRAND.rustSoft : "transparent",
      } as React.CSSProperties}
    >
      <div style={{ width: 56 } as React.CSSProperties}>
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 12.5,
            fontWeight: 600,
            color: BRAND.onyx,
            lineHeight: 1.1,
          } as React.CSSProperties}
        >
          {row.t}
        </div>
        <div style={{ fontFamily: FONT.sans, fontSize: 10, color: BRAND.stoneFaint } as React.CSSProperties}>
          to {row.d}
        </div>
      </div>

      <div
        style={{
          width: 3,
          height: 36,
          borderRadius: 2,
          background:
            row.status === "live"
              ? BRAND.rust
              : row.warn
              ? BRAND.crimson
              : BRAND.border,
        } as React.CSSProperties}
      />

      <div style={{ flex: 1 } as React.CSSProperties}>
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 13,
            fontWeight: 600,
            color: BRAND.onyx,
            lineHeight: 1.2,
          } as React.CSSProperties}
        >
          {row.c}
          {row.warn && (
            <span
              style={{
                marginLeft: 8,
                fontSize: 10,
                color: BRAND.crimson,
                fontWeight: 600,
                letterSpacing: "0.04em",
              } as React.CSSProperties}
            >
              &middot; allergy
            </span>
          )}
        </div>
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 11.5,
            color: BRAND.stoneFaint,
            marginTop: 2,
          } as React.CSSProperties}
        >
          {row.p} &middot; {row.a}
        </div>
      </div>

      {row.status === "live" && (
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 9.5,
            padding: "3px 9px",
            borderRadius: 100,
            background: BRAND.rust,
            color: BRAND.bone,
            fontWeight: 600,
            letterSpacing: "0.08em",
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
            color: BRAND.rust,
            fontWeight: 600,
            letterSpacing: "0.08em",
          } as React.CSSProperties}
        >
          NEXT →
        </div>
      )}
    </div>
  );
}

// ─── ProjectRow ───────────────────────────────────────────────────────────────

function ProjectRow({ row, first }: { row: ProjectRowData; first: boolean }) {
  return (
    <div
      style={{
        padding: "13px 16px",
        borderTop: !first ? `1px solid ${BRAND.borderSoft}` : "none",
      } as React.CSSProperties}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 7,
        } as React.CSSProperties}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: 100,
            background: row.dot,
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
          {row.c}
        </div>
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 10.5,
            color: BRAND.stoneFaint,
            fontWeight: 500,
          } as React.CSSProperties}
        >
          {row.s}
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
      <div style={{ fontFamily: FONT.sans, fontSize: 11, color: BRAND.stoneDark } as React.CSSProperties}>
        Deposit:{" "}
        <strong style={{ color: BRAND.onyx, fontWeight: 600 } as React.CSSProperties}>
          {row.dep}
        </strong>
      </div>
    </div>
  );
}

// ─── Data (matches original JSX exactly) ─────────────────────────────────────

const scheduleData: ScheduleRowData[] = [
  { t: "9:00",  d: "11:00", c: "Asha Mehra",  p: "Koi sleeve · S4 of 5",   a: "Miles", status: "live" },
  { t: "11:30", d: "12:30", c: "Marcus Lane", p: "Consultation · 60 min",  a: "Rafael", status: "next" },
  { t: "1:00",  d: "3:30",  c: "Elena Ruiz",  p: "Back piece · S2 of 3",   a: "Miles", warn: true },
  { t: "4:00",  d: "5:00",  c: "Jonah Park",  p: "Touch-up · Forearm",     a: "Rafael" },
];

const projectData: ProjectRowData[] = [
  { c: "Asha · Koi sleeve",   s: "S4 of 5", dep: "$420 / $600", dot: BRAND.rust,  pct: 80 },
  { c: "Elena · Back piece",  s: "S2 of 3", dep: "$300 / $300", dot: BRAND.sage,  pct: 67 },
  { c: "Tomas · Half-sleeve", s: "Booked",  dep: "$0 / $200",   dot: BRAND.amber, pct: 0 },
];

const kpis = [
  { v: "$8,320", l: "Today's revenue",      d: "+12% vs Tue",  good: true },
  { v: "26",     l: "Bookings on the deck", d: "+4 this week" },
  { v: "3",      l: "No-show risk",         d: "down 1.2%",    warn: true },
  { v: "$4,280", l: "Commissions owed",     d: "+6.1% trail",  good: true },
];

// ─── DashboardMockup ──────────────────────────────────────────────────────────

export function DashboardMockup({ hero = false }: DashboardMockupProps) {
  return (
    <div
      style={{
        borderRadius: 18,
        overflow: "hidden",
        background: BRAND.white,
        boxShadow: hero ? SHADOW.hero : SHADOW.card,
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
          <div style={{ width: 11, height: 11, borderRadius: 100, background: "#FCA5A5" } as React.CSSProperties} />
          <div style={{ width: 11, height: 11, borderRadius: 100, background: "#FCD34D" } as React.CSSProperties} />
          <div style={{ width: 11, height: 11, borderRadius: 100, background: "#86EFAC" } as React.CSSProperties} />
        </div>
        <div
          style={{
            flex: 1,
            marginLeft: 16,
            background: BRAND.bone,
            borderRadius: 6,
            padding: "5px 12px",
            fontFamily: FONT.mono,
            fontSize: 11,
            color: BRAND.stoneFaint,
          } as React.CSSProperties}
        >
          inkos.studio/sable-sparrow
        </div>
      </div>

      {/* App shell: sidebar + main */}
      <div
        style={{ display: "grid", gridTemplateColumns: "224px 1fr", minHeight: 620 } as React.CSSProperties}
      >
        {/* Sidebar */}
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
          {/* Logo row */}
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
                width: 28,
                height: 28,
                background: BRAND.bone,
                color: BRAND.onyx,
                borderRadius: 7,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: FONT.serif,
                fontStyle: "italic",
                fontSize: 19,
                lineHeight: 1,
              } as React.CSSProperties}
            >
              i
            </div>
            <div style={{ flex: 1 } as React.CSSProperties}>
              <div style={{ fontFamily: FONT.sans, fontSize: 13, fontWeight: 600 } as React.CSSProperties}>
                InkOS
              </div>
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 9,
                  color: "rgba(247,247,245,0.45)",
                  letterSpacing: "0.06em",
                } as React.CSSProperties}
              >
                SABLE & SPARROW
              </div>
            </div>
          </div>

          <NavGroup
            title="Studio"
            items={[
              { icon: Sparkles,      label: "Today",        active: true },
              { icon: Inbox,         label: "Inbox",        badge: 3 },
              { icon: Calendar,      label: "Calendar" },
              { icon: MessageSquare, label: "Messages",     badge: 2 },
              { icon: Clock,         label: "Appointments" },
            ]}
          />
          <NavGroup
            title="Workflow"
            items={[
              { icon: LayoutGrid, label: "Projects",         tag: "NEW" },
              { icon: Users,      label: "Clients" },
              { icon: Heart,      label: "Team" },
              { icon: ImageIcon,  label: "Flash & portfolio" },
              { icon: FileText,   label: "Forms" },
            ]}
          />
          <NavGroup
            title="Grow"
            items={[
              { icon: CreditCard, label: "Payments" },
              { icon: Package,    label: "Inventory" },
              { icon: BarChart3,  label: "Analytics" },
              { icon: Megaphone,  label: "Marketing" },
              { icon: Sparkles,   label: "AI" },
            ]}
          />

          <div style={{ flex: 1 } as React.CSSProperties} />

          {/* User row */}
          <div
            style={{
              padding: 10,
              borderRadius: 10,
              background: "rgba(247,247,245,0.05)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            } as React.CSSProperties}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 100,
                background: `linear-gradient(135deg, ${BRAND.rust}, ${BRAND.rustDeep})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: FONT.serif,
                fontSize: 14,
                color: BRAND.bone,
                fontStyle: "italic",
              } as React.CSSProperties}
            >
              m
            </div>
            <div style={{ flex: 1, minWidth: 0 } as React.CSSProperties}>
              <div style={{ fontFamily: FONT.sans, fontSize: 11, fontWeight: 600 } as React.CSSProperties}>
                Miles Verena
              </div>
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 9,
                  color: "rgba(247,247,245,0.5)",
                } as React.CSSProperties}
              >
                Owner &middot; Resident
              </div>
            </div>
            <ChevronDown size={11} color="rgba(247,247,245,0.5)" />
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            padding: "28px 32px",
            background: BRAND.bone,
            overflow: "hidden",
          } as React.CSSProperties}
        >
          {/* Header */}
          <div style={{ marginBottom: 22 } as React.CSSProperties}>
            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: 11,
                color: BRAND.stoneFaint,
                letterSpacing: "0.04em",
                marginBottom: 6,
              } as React.CSSProperties}
            >
              Today &middot; Thursday 24 April
            </div>
            <div
              style={{
                fontFamily: FONT.sans,
                fontSize: 26,
                color: BRAND.onyx,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                fontWeight: 600,
              } as React.CSSProperties}
            >
              Good morning, Miles.
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
            {kpis.map((s, i) => (
              <div
                key={i}
                style={{
                  background: BRAND.white,
                  padding: "14px 14px",
                  borderRadius: 10,
                  border: `1px solid ${BRAND.border}`,
                  boxShadow: "0 1px 2px rgba(15,15,15,0.03)",
                } as React.CSSProperties}
              >
                <div
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 11,
                    color: BRAND.stone,
                    fontWeight: 500,
                    marginBottom: 6,
                  } as React.CSSProperties}
                >
                  {s.l}
                </div>
                <div
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 24,
                    fontWeight: 600,
                    color: s.warn ? BRAND.crimson : BRAND.onyx,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    marginBottom: 4,
                  } as React.CSSProperties}
                >
                  {s.v}
                </div>
                <div
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 11,
                    fontWeight: 500,
                    color: s.good ? BRAND.sage : s.warn ? BRAND.crimson : BRAND.stoneDark,
                  } as React.CSSProperties}
                >
                  {s.d}
                </div>
              </div>
            ))}
          </div>

          {/* Allergy alert — Asha Mehra, rust colors */}
          <div
            style={{
              background: BRAND.rustSoft,
              border: `1px solid ${BRAND.rust}30`,
              borderRadius: 10,
              padding: "13px 16px",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 12,
            } as React.CSSProperties}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                background: BRAND.rust,
                color: BRAND.bone,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              } as React.CSSProperties}
            >
              <AlertCircle size={15} strokeWidth={2.2} />
            </div>
            <div style={{ flex: 1 } as React.CSSProperties}>
              <div
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 12,
                  fontWeight: 600,
                  color: BRAND.rust,
                  marginBottom: 2,
                } as React.CSSProperties}
              >
                Allergy alert &middot; session at 1 PM
              </div>
              <div
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 13,
                  color: BRAND.onyx,
                  fontWeight: 400,
                } as React.CSSProperties}
              >
                <strong>Asha Mehra</strong> &mdash; red ink allergy, latex sensitivity. Last flagged 8 days ago.
              </div>
            </div>
            <ArrowRight size={14} color={BRAND.rust} />
          </div>

          {/* Schedule + Project pulse */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr",
              gap: 12,
            } as React.CSSProperties}
          >
            <div
              style={{
                background: BRAND.white,
                borderRadius: 10,
                border: `1px solid ${BRAND.border}`,
                overflow: "hidden",
                boxShadow: "0 1px 2px rgba(15,15,15,0.03)",
              } as React.CSSProperties}
            >
              <DashSectionHeader text="Today's chair" right="Miles V · Rafael M" />
              {scheduleData.map((row, i) => (
                <ScheduleRow key={i} row={row} first={i === 0} />
              ))}
            </div>

            <div
              style={{
                background: BRAND.white,
                borderRadius: 10,
                border: `1px solid ${BRAND.border}`,
                overflow: "hidden",
                boxShadow: "0 1px 2px rgba(15,15,15,0.03)",
              } as React.CSSProperties}
            >
              <DashSectionHeader text="Project pulse" />
              {projectData.map((row, i) => (
                <ProjectRow key={i} row={row} first={i === 0} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
