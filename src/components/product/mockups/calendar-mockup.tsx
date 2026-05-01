"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles, Inbox, Calendar, MessageSquare, Clock,
  LayoutGrid, Users, Heart,
  ChevronDown, ChevronLeft, ChevronRight, Plus,
  Plane, MessageSquare as MsgSq, Repeat, Droplet,
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

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar() {
  const studioItems: NavItem[] = [
    { icon: Sparkles,      label: "Today" },
    { icon: Inbox,         label: "Inbox",        badge: 3 },
    { icon: Calendar,      label: "Calendar",     active: true },
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

// ─── CalendarMockup ────────────────────────────────────────────────────────────

// Hour rows: 9 AM → 4 PM = 8 hours, each 52px tall
const HOURS = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM"];
const HOUR_H = 52;
const SIDEBAR_W = 44;

// Column formula helper — returns left offset for a given col index (0-3)
// Used in inline style left values for absolutely-positioned cards
// col 0 = Miles, col 1 = Rafael, col 2 = Yvette, col 3 = Nina

const artists = [
  { initial: "M", name: "Miles",   sub: "RESIDENT", color: BRAND.onyx,      isGuest: false },
  { initial: "R", name: "Rafael",  sub: "RESIDENT", color: BRAND.stoneDark,  isGuest: false },
  { initial: "Y", name: "Yvette",  sub: "RESIDENT", color: BRAND.success,    isGuest: false },
  { initial: "N", name: "Nina",    sub: "GUEST",    color: BRAND.rust,       isGuest: true },
] as const;

export function CalendarMockup() {
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
          inkos.app/calendar
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
        <Sidebar />

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
              marginBottom: 16,
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
                Studio &middot; Sable &amp; Sparrow
              </div>
              <div
                style={{
                  fontFamily: FONT.serif,
                  fontSize: 30,
                  color: BRAND.onyx,
                  lineHeight: 1.1,
                } as React.CSSProperties}
              >
                Thursday, <em>24 April</em>
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 } as React.CSSProperties}>
              {/* View switcher */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "#FFFFFF",
                  border: `1px solid ${BRAND.border}`,
                  borderRadius: 100,
                  padding: 2,
                } as React.CSSProperties}
              >
                {(["Day", "Week", "Month"] as const).map((v) => (
                  <div
                    key={v}
                    style={{
                      padding: "5px 12px",
                      borderRadius: 100,
                      fontFamily: FONT.sans,
                      fontSize: 11,
                      fontWeight: 600,
                      background: v === "Day" ? BRAND.onyx : "transparent",
                      color: v === "Day" ? BRAND.bone : BRAND.stoneDark,
                      cursor: "default",
                    } as React.CSSProperties}
                  >
                    {v}
                  </div>
                ))}
              </div>

              {/* Today nav */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  background: "#FFFFFF",
                  border: `1px solid ${BRAND.border}`,
                  borderRadius: 100,
                  padding: "5px 10px",
                  fontFamily: FONT.sans,
                  fontSize: 11,
                  fontWeight: 600,
                  color: BRAND.stoneDark,
                  cursor: "default",
                } as React.CSSProperties}
              >
                <ChevronLeft size={13} strokeWidth={2} />
                Today
                <ChevronRight size={13} strokeWidth={2} />
              </div>

              {/* Book */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
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
                Book
              </div>
            </div>
          </div>

          {/* Guest residency band */}
          <motion.div
            animate={{ opacity: [0.92, 1, 0.92] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              background: `linear-gradient(90deg, ${BRAND.rust}18 0%, ${BRAND.rust}08 100%)`,
              border: `1px solid ${BRAND.rust}30`,
              borderRadius: 8,
              padding: "8px 12px",
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              gap: 10,
            } as React.CSSProperties}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 100,
                background: BRAND.rust,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              } as React.CSSProperties}
            >
              <Plane size={11} color={BRAND.bone} strokeWidth={1.8} />
            </div>
            <div style={{ flex: 1 } as React.CSSProperties}>
              <div
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 9.5,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: BRAND.rust,
                  marginBottom: 2,
                } as React.CSSProperties}
              >
                Guest Residency &middot; In studio now
              </div>
              <div
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 12,
                  color: BRAND.onyx,
                } as React.CSSProperties}
              >
                <strong>Nina Yates</strong> &middot; <em>Black &amp; grey, Tokyo-based</em> &middot; 22–29 Apr &middot; Chair 4
              </div>
            </div>
            <div
              style={{
                fontFamily: FONT.sans,
                fontSize: 10,
                fontWeight: 700,
                color: BRAND.rust,
                letterSpacing: "0.1em",
                whiteSpace: "nowrap",
              } as React.CSSProperties}
            >
              5 days left
            </div>
          </motion.div>

          {/* Multi-chair grid */}
          <div
            style={{
              background: "#FFFFFF",
              border: `1px solid ${BRAND.border}`,
              borderRadius: 10,
              overflow: "hidden",
            } as React.CSSProperties}
          >
            {/* Chair headers */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `${SIDEBAR_W}px repeat(4, 1fr)`,
                background: BRAND.boneCream,
                borderBottom: `1px solid ${BRAND.border}`,
              } as React.CSSProperties}
            >
              <div />
              {artists.map((a, i) => (
                <div
                  key={i}
                  style={{
                    padding: "10px 8px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    borderLeft: `1px solid ${BRAND.borderSoft}`,
                  } as React.CSSProperties}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 100,
                      background: a.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: FONT.serif,
                      fontSize: 12,
                      color: BRAND.bone,
                      fontStyle: "italic",
                      flexShrink: 0,
                    } as React.CSSProperties}
                  >
                    {a.initial}
                  </div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        fontFamily: FONT.sans,
                        fontSize: 11.5,
                        fontWeight: 700,
                        color: BRAND.onyx,
                      } as React.CSSProperties}
                    >
                      {a.name}
                      {a.isGuest && (
                        <Plane size={9} color={BRAND.rust} strokeWidth={1.8} />
                      )}
                    </div>
                    <div
                      style={{
                        fontFamily: FONT.sans,
                        fontSize: 9,
                        fontWeight: 600,
                        color: BRAND.stoneLight,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      } as React.CSSProperties}
                    >
                      {a.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Time grid + cards */}
            <div style={{ position: "relative" } as React.CSSProperties}>
              {/* Hour rows */}
              {HOURS.map((h, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: `${SIDEBAR_W}px repeat(4, 1fr)`,
                    height: HOUR_H,
                    borderTop: i !== 0 ? `1px solid ${BRAND.borderSoft}` : "none",
                  } as React.CSSProperties}
                >
                  <div
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 9.5,
                      fontWeight: 600,
                      color: BRAND.stoneLight,
                      textAlign: "right",
                      paddingRight: 8,
                      paddingTop: 4,
                    } as React.CSSProperties}
                  >
                    {h}
                  </div>
                  {[0, 1, 2, 3].map((col) => (
                    <div
                      key={col}
                      style={{
                        borderLeft: `1px solid ${BRAND.borderSoft}`,
                      } as React.CSSProperties}
                    />
                  ))}
                </div>
              ))}

              {/* Appointment cards — absolutely positioned */}

              {/* 1. Miles · Asha M. · 9:00–11:00 · 2 hours = 2 * 52 = 104px */}
              <ApptCard
                col={0}
                top={4}
                height={100}
                bg={BRAND.onyx}
                borderColor={BRAND.onyx}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 4 } as React.CSSProperties}>
                  <span style={{ fontFamily: FONT.sans, fontSize: 11, fontWeight: 700, color: BRAND.bone } as React.CSSProperties}>
                    Asha M.
                  </span>
                  <span
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 8,
                      fontWeight: 700,
                      color: BRAND.bone,
                      background: BRAND.danger,
                      padding: "1px 4px",
                      borderRadius: 3,
                    } as React.CSSProperties}
                  >
                    ⚠
                  </span>
                </div>
                <div style={{ fontFamily: FONT.sans, fontSize: 9.5, color: "rgba(247,247,245,0.75)", marginTop: 2 } as React.CSSProperties}>
                  Koi sleeve · S4/5
                </div>
                <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 4 } as React.CSSProperties}>
                  <Clock size={8} color="rgba(247,247,245,0.55)" strokeWidth={1.8} />
                  <span style={{ fontFamily: FONT.sans, fontSize: 9, color: "rgba(247,247,245,0.55)" } as React.CSSProperties}>9:00–11:00</span>
                </div>
              </ApptCard>

              {/* 2. Miles · Sterilization buffer · 11:00–11:30 */}
              <div
                style={{
                  position: "absolute",
                  top: 132,
                  left: `calc(${SIDEBAR_W}px + (100% - ${SIDEBAR_W}px) * 0 / 4 + 4px)`,
                  width: `calc((100% - ${SIDEBAR_W}px) / 4 - 8px)`,
                  height: 28,
                  background: `repeating-linear-gradient(45deg, ${BRAND.boneDeep}, ${BRAND.boneDeep} 4px, ${BRAND.bone} 4px, ${BRAND.bone} 8px)`,
                  border: `1px dashed ${BRAND.stoneLight}`,
                  borderRadius: 6,
                  padding: "4px 8px",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                } as React.CSSProperties}
              >
                <Droplet size={9} color={BRAND.stoneDark} strokeWidth={1.8} />
                <span
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 9,
                    fontWeight: 600,
                    color: BRAND.stoneDark,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  } as React.CSSProperties}
                >
                  Sterilization · 30 min
                </span>
              </div>

              {/* 3. Miles · Elena R. · 1:00–3:30 · 2.5 hours ≈ 2.5 * 52 = 130px */}
              <ApptCard
                col={0}
                top={212}
                height={130}
                bg={BRAND.onyx}
                borderColor={BRAND.onyx}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 4 } as React.CSSProperties}>
                  <span style={{ fontFamily: FONT.sans, fontSize: 11, fontWeight: 700, color: BRAND.bone } as React.CSSProperties}>
                    Elena R.
                  </span>
                  <span
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 8,
                      fontWeight: 700,
                      color: BRAND.onyx,
                      background: BRAND.warn,
                      padding: "1px 4px",
                      borderRadius: 3,
                    } as React.CSSProperties}
                  >
                    $
                  </span>
                </div>
                <div style={{ fontFamily: FONT.sans, fontSize: 9.5, color: "rgba(247,247,245,0.75)", marginTop: 2 } as React.CSSProperties}>
                  Back piece · S2/3
                </div>
                <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 4 } as React.CSSProperties}>
                  <Clock size={8} color="rgba(247,247,245,0.55)" strokeWidth={1.8} />
                  <span style={{ fontFamily: FONT.sans, fontSize: 9, color: "rgba(247,247,245,0.55)" } as React.CSSProperties}>1:00–3:30</span>
                </div>
              </ApptCard>

              {/* 4. Rafael · Marcus L. · 11:00–12:00 · consultation */}
              <ApptCard
                col={1}
                top={110}
                height={48}
                bg={BRAND.boneDeep}
                borderColor={BRAND.stoneDark}
                borderStyle="2px solid"
              >
                <div style={{ display: "flex", alignItems: "center", gap: 5 } as React.CSSProperties}>
                  <span style={{ fontFamily: FONT.sans, fontSize: 10.5, fontWeight: 700, color: BRAND.onyx } as React.CSSProperties}>
                    Marcus L.
                  </span>
                  <MsgSq size={8} color={BRAND.stone} strokeWidth={1.8} />
                </div>
                <div style={{ fontFamily: FONT.sans, fontSize: 9, color: BRAND.stone } as React.CSSProperties}>
                  Consultation · 60 min
                </div>
              </ApptCard>

              {/* 5. Rafael · Jonah P. · 4:00–5:00 · touch-up */}
              <ApptCard
                col={1}
                top={368}
                height={48}
                bg={BRAND.stoneDark}
                borderColor={BRAND.stoneDark}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 5 } as React.CSSProperties}>
                  <span style={{ fontFamily: FONT.sans, fontSize: 10.5, fontWeight: 700, color: BRAND.bone } as React.CSSProperties}>
                    Jonah P.
                  </span>
                  <Repeat size={8} color="rgba(247,247,245,0.6)" strokeWidth={1.8} />
                </div>
                <div style={{ fontFamily: FONT.sans, fontSize: 9, color: "rgba(247,247,245,0.65)" } as React.CSSProperties}>
                  Touch-up · 60 min
                </div>
              </ApptCard>

              {/* 6. Yvette · Diana K. · 10:00–11:30 · Forearm S1/2 */}
              <ApptCard
                col={2}
                top={56}
                height={100}
                bg={BRAND.success}
                borderColor={BRAND.success}
              >
                <div style={{ fontFamily: FONT.sans, fontSize: 11, fontWeight: 700, color: BRAND.bone } as React.CSSProperties}>
                  Diana K.
                </div>
                <div style={{ fontFamily: FONT.sans, fontSize: 9.5, color: "rgba(247,247,245,0.8)", marginTop: 2 } as React.CSSProperties}>
                  Forearm · S1/2
                </div>
                <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 4 } as React.CSSProperties}>
                  <Clock size={8} color="rgba(247,247,245,0.6)" strokeWidth={1.8} />
                  <span style={{ fontFamily: FONT.sans, fontSize: 9, color: "rgba(247,247,245,0.6)" } as React.CSSProperties}>10:00–11:30</span>
                </div>
              </ApptCard>

              {/* 7. Yvette · Healing block */}
              <div
                style={{
                  position: "absolute",
                  top: 264,
                  left: `calc(${SIDEBAR_W}px + (100% - ${SIDEBAR_W}px) * 2 / 4 + 4px)`,
                  width: `calc((100% - ${SIDEBAR_W}px) / 4 - 8px)`,
                  height: 100,
                  background: "#DCFCE7",
                  border: `1px dashed ${BRAND.success}`,
                  borderRadius: 7,
                  padding: "7px 8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                } as React.CSSProperties}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 4 } as React.CSSProperties}>
                  <Heart size={9} color={BRAND.success} strokeWidth={1.8} />
                  <span
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: BRAND.success,
                    } as React.CSSProperties}
                  >
                    Healing block
                  </span>
                </div>
                <div style={{ fontFamily: FONT.sans, fontSize: 10, color: BRAND.stoneDark } as React.CSSProperties}>
                  Forearm zone — recovering
                </div>
                <div style={{ fontFamily: FONT.sans, fontSize: 9, color: BRAND.stone } as React.CSSProperties}>
                  Until 2 May
                </div>
              </div>

              {/* 8. Nina · Theo W. · 11:00–3:00 · Flash */}
              <div
                style={{
                  position: "absolute",
                  top: 110,
                  left: `calc(${SIDEBAR_W}px + (100% - ${SIDEBAR_W}px) * 3 / 4 + 4px)`,
                  width: `calc((100% - ${SIDEBAR_W}px) / 4 - 8px)`,
                  height: 204,
                  background: `${BRAND.rust}`,
                  backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(0,0,0,0.06) 6px, rgba(0,0,0,0.06) 12px)`,
                  borderRadius: 7,
                  padding: "7px 8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                  border: `1px solid ${BRAND.rustDeep}`,
                } as React.CSSProperties}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" } as React.CSSProperties}>
                  <span style={{ fontFamily: FONT.sans, fontSize: 11, fontWeight: 700, color: BRAND.bone } as React.CSSProperties}>
                    Theo W.
                  </span>
                  <Plane size={10} color={BRAND.bone} strokeWidth={1.8} />
                </div>
                <div style={{ fontFamily: FONT.sans, fontSize: 9.5, color: "rgba(247,247,245,0.85)", marginTop: 4 } as React.CSSProperties}>
                  Flash · single session
                </div>
                <div style={{ fontFamily: FONT.sans, fontSize: 9.5, color: "rgba(247,247,245,0.7)", marginTop: 2 } as React.CSSProperties}>
                  Black &amp; grey · A4 size
                </div>
                <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 4 } as React.CSSProperties}>
                  <Clock size={8} color="rgba(247,247,245,0.55)" strokeWidth={1.8} />
                  <span style={{ fontFamily: FONT.sans, fontSize: 9, color: "rgba(247,247,245,0.55)" } as React.CSSProperties}>11:00–3:00</span>
                </div>
              </div>

              {/* 9. Nina · Walk-in slot */}
              <div
                style={{
                  position: "absolute",
                  top: 394,
                  left: `calc(${SIDEBAR_W}px + (100% - ${SIDEBAR_W}px) * 3 / 4 + 4px)`,
                  width: `calc((100% - ${SIDEBAR_W}px) / 4 - 8px)`,
                  height: 24,
                  background: "transparent",
                  border: `1px dashed ${BRAND.rust}`,
                  borderRadius: 6,
                  padding: "3px 8px",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                } as React.CSSProperties}
              >
                <Plus size={9} color={BRAND.rust} strokeWidth={2} />
                <span
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 9,
                    fontWeight: 600,
                    color: BRAND.rust,
                  } as React.CSSProperties}
                >
                  Walk-in slot
                </span>
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                padding: "8px 14px",
                background: BRAND.boneCream,
                borderTop: `1px solid ${BRAND.border}`,
                display: "flex",
                alignItems: "center",
                gap: 16,
              } as React.CSSProperties}
            >
              {/* Legend */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 } as React.CSSProperties}>
                <LegendItem color={BRAND.danger} icon="⚠" label="Allergy" />
                <LegendItem color={BRAND.warn} icon="$" label="Deposit pending" />
                <LegendItem color={BRAND.rust} plane label="Guest" />
                <LegendItem color={BRAND.success} heart label="Healing" />
              </div>
              <div style={{ flex: 1 } as React.CSSProperties} />
              <span
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 9.5,
                  fontWeight: 600,
                  color: BRAND.stoneDark,
                } as React.CSSProperties}
              >
                12 sessions &middot; 4 chairs →
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ApptCard ──────────────────────────────────────────────────────────────────

interface ApptCardProps {
  col: 0 | 1 | 2 | 3;
  top: number;
  height: number;
  bg: string;
  borderColor: string;
  borderStyle?: string;
  children: React.ReactNode;
}

function ApptCard({ col, top, height, bg, borderColor, borderStyle = "1px solid", children }: ApptCardProps) {
  const SIDEBAR_W_PX = 44;
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: `calc(${SIDEBAR_W_PX}px + (100% - ${SIDEBAR_W_PX}px) * ${col} / 4 + 4px)`,
        width: `calc((100% - ${SIDEBAR_W_PX}px) / 4 - 8px)`,
        height,
        background: bg,
        border: `${borderStyle} ${borderColor}`,
        borderRadius: 7,
        padding: "7px 8px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

// ─── LegendItem ────────────────────────────────────────────────────────────────

interface LegendItemProps {
  color: string;
  icon?: string;
  label: string;
  plane?: boolean;
  heart?: boolean;
}

function LegendItem({ color, icon, label, plane, heart }: LegendItemProps) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 4 } as React.CSSProperties}>
      {icon && (
        <span
          style={{
            fontFamily: FONT.sans,
            fontSize: 9,
            fontWeight: 700,
            color,
          } as React.CSSProperties}
        >
          {icon}
        </span>
      )}
      {plane && <Plane size={9} color={color} strokeWidth={1.8} />}
      {heart && <Heart size={9} color={color} strokeWidth={1.8} />}
      <span
        style={{
          fontFamily: FONT.sans,
          fontSize: 9,
          fontWeight: 500,
          color: BRAND.stoneDark,
        } as React.CSSProperties}
      >
        {label}
      </span>
    </div>
  );
}
