"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles, Inbox, Calendar, MessageSquare, Clock,
  LayoutGrid, Users, Heart,
  ChevronDown, AlertCircle, CreditCard, DollarSign,
  FileText, Shield, Star, Search, Filter, ChevronRight,
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

interface ActionItem {
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;
  iconColor: string;
  iconBg: string;
  iconBorder: string;
  title: string;
  sub: string;
  age: string;
  cta: string;
}

interface SectionData {
  dotColor: string;
  name: string;
  count: number;
  items: ActionItem[];
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar() {
  const studioItems: NavItem[] = [
    { icon: Sparkles,      label: "Today" },
    { icon: Inbox,         label: "Inbox",        badge: 3, active: true },
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

// ─── Data ──────────────────────────────────────────────────────────────────────

const filterChips = [
  { label: "All",        count: 12, active: true,  dot: false },
  { label: "Urgent",     count: 3,  active: false, dot: true },
  { label: "Bookings",   count: 2,  active: false, dot: false },
  { label: "Payments",   count: 3,  active: false, dot: false },
  { label: "Forms",      count: 2,  active: false, dot: false },
  { label: "Reviews",    count: 1,  active: false, dot: false },
  { label: "Compliance", count: 1,  active: false, dot: false },
] as const;

const sections: SectionData[] = [
  {
    dotColor: BRAND.crimson,
    name: "Urgent",
    count: 2,
    items: [
      {
        Icon: AlertCircle,
        iconColor: BRAND.crimson,
        iconBg: BRAND.crimsonSoft,
        iconBorder: `${BRAND.crimson}30`,
        title: "Allergy update — Elena Ruiz",
        sub: "Red ink allergy added · session in 4 hours",
        age: "1 PM today",
        cta: "Resolve",
      },
      {
        Icon: CreditCard,
        iconColor: BRAND.crimson,
        iconBg: BRAND.crimsonSoft,
        iconBorder: `${BRAND.crimson}30`,
        title: "Stripe dispute — Jonah Park",
        sub: "$300 chargeback opened · evidence ready",
        age: "Due Fri",
        cta: "Respond",
      },
    ],
  },
  {
    dotColor: BRAND.amber,
    name: "Today",
    count: 3,
    items: [
      {
        Icon: Calendar,
        iconColor: BRAND.amber,
        iconBg: BRAND.amberWash,
        iconBorder: `${BRAND.amber}30`,
        title: "Booking request — Asha Mehra",
        sub: "Cover-up sleeve · 2 hr · Tue 5pm conflicts with Miles",
        age: "2 hr ago",
        cta: "Approve",
      },
      {
        Icon: DollarSign,
        iconColor: BRAND.amber,
        iconBg: BRAND.amberWash,
        iconBorder: `${BRAND.amber}30`,
        title: "Deposit reminder — Tomas Vega",
        sub: "$200 owed · session in 1 week",
        age: "2 days",
        cta: "Send",
      },
      {
        Icon: FileText,
        iconColor: BRAND.amber,
        iconBg: BRAND.amberWash,
        iconBorder: `${BRAND.amber}30`,
        title: "Consent submitted — Ahmet Demir",
        sub: "Awaiting your countersign",
        age: "15 min",
        cta: "Sign",
      },
    ],
  },
  {
    dotColor: BRAND.sage,
    name: "This week",
    count: 3,
    items: [
      {
        Icon: FileText,
        iconColor: BRAND.sage,
        iconBg: BRAND.sageWash,
        iconBorder: `${BRAND.sage}30`,
        title: "Consent expiring — Marcus Lane",
        sub: "Re-sign required for next session",
        age: "in 4 days",
        cta: "Re-send",
      },
      {
        Icon: Shield,
        iconColor: BRAND.sage,
        iconBg: BRAND.sageWash,
        iconBorder: `${BRAND.sage}30`,
        title: "REACH update — 2 ink colors",
        sub: "MSDS update required for compliance",
        age: "by 30 Apr",
        cta: "Update",
      },
      {
        Icon: Star,
        iconColor: BRAND.sage,
        iconBg: BRAND.sageWash,
        iconBorder: `${BRAND.sage}30`,
        title: "3 new 5-star reviews",
        sub: "Across Google, Yelp, Instagram · respond",
        age: "6 hr",
        cta: "Reply",
      },
    ],
  },
];

// ─── InboxMockup ───────────────────────────────────────────────────────────────

export function InboxMockup() {
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
          app.limespun.com/inbox
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
                Action feed &middot; Studio-wide
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 } as React.CSSProperties}>
                <div
                  style={{
                    fontFamily: FONT.serif,
                    fontSize: 32,
                    color: BRAND.onyx,
                    lineHeight: 1.1,
                  } as React.CSSProperties}
                >
                  Inbox
                </div>
                <div
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 13,
                    fontWeight: 500,
                    color: BRAND.stoneDark,
                  } as React.CSSProperties}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      color: BRAND.onyx,
                    } as React.CSSProperties}
                  >
                    12
                  </span>{" "}
                  open &middot;{" "}
                  <span
                    style={{
                      fontWeight: 700,
                      color: BRAND.crimson,
                    } as React.CSSProperties}
                  >
                    3
                  </span>{" "}
                  urgent
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 } as React.CSSProperties}>
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
                <Search size={12} strokeWidth={1.8} />
                Search
              </div>
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
                <Filter size={12} strokeWidth={1.8} />
                Filter
              </div>
            </div>
          </div>

          {/* Filter chips */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginBottom: 14,
              paddingBottom: 14,
              borderBottom: `1px solid ${BRAND.border}`,
            } as React.CSSProperties}
          >
            {filterChips.map((chip, i) => (
              <div
                key={i}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "5px 11px",
                  borderRadius: 100,
                  background: chip.active ? BRAND.onyx : "#FFFFFF",
                  border: `1px solid ${chip.active ? BRAND.onyx : BRAND.border}`,
                  fontFamily: FONT.sans,
                  fontSize: 11,
                  fontWeight: 500,
                  color: chip.active ? BRAND.bone : BRAND.stoneDark,
                  cursor: "default",
                } as React.CSSProperties}
              >
                {chip.dot && !chip.active && (
                  <div
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: 100,
                      background: BRAND.crimson,
                      flexShrink: 0,
                    } as React.CSSProperties}
                  />
                )}
                {chip.label}
                <span
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 10,
                    fontWeight: 600,
                    color: chip.active ? "rgba(247,247,245,0.7)" : BRAND.stoneLight,
                  } as React.CSSProperties}
                >
                  {chip.count}
                </span>
              </div>
            ))}
          </div>

          {/* Smart sort banner */}
          <motion.div
            animate={{
              boxShadow: [
                `0 0 0 0 ${BRAND.rust}00`,
                `0 0 0 6px ${BRAND.rust}22`,
                `0 0 0 0 ${BRAND.rust}00`,
              ],
            }}
            transition={{ duration: 2.6, repeat: Infinity }}
            style={{
              background: BRAND.boneDeep,
              borderRadius: 8,
              padding: "8px 12px",
              marginBottom: 16,
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
                background: BRAND.onyx,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              } as React.CSSProperties}
            >
              <Sparkles size={11} color={BRAND.bone} strokeWidth={1.8} />
            </div>
            <div
              style={{
                fontFamily: FONT.sans,
                fontSize: 11.5,
                color: BRAND.stoneDark,
                flex: 1,
              } as React.CSSProperties}
            >
              <strong>Smart sort:</strong> ranked by impact &times; time-to-fix &middot; allergy &amp; disputes always first
            </div>
            <div
              style={{
                fontFamily: FONT.sans,
                fontSize: 10,
                color: BRAND.stone,
                letterSpacing: "0.08em",
              } as React.CSSProperties}
            >
              AI
            </div>
          </motion.div>

          {/* Action items list */}
          <div
            style={{
              background: "#FFFFFF",
              border: `1px solid ${BRAND.border}`,
              borderRadius: 10,
              overflow: "hidden",
            } as React.CSSProperties}
          >
            {sections.map((section, si) => (
              <React.Fragment key={si}>
                {/* Section header */}
                <div
                  style={{
                    background: BRAND.boneCream,
                    padding: "8px 14px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: si !== 0 ? `1px solid ${BRAND.border}` : "none",
                    borderBottom: `1px solid ${BRAND.border}`,
                  } as React.CSSProperties}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 7 } as React.CSSProperties}>
                    <div
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: 100,
                        background: section.dotColor,
                      } as React.CSSProperties}
                    />
                    <span
                      style={{
                        fontFamily: FONT.sans,
                        fontSize: 9.5,
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: BRAND.stoneDark,
                      } as React.CSSProperties}
                    >
                      {section.name}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 9.5,
                      fontWeight: 600,
                      color: BRAND.stoneLight,
                    } as React.CSSProperties}
                  >
                    {section.count}
                  </span>
                </div>

                {/* Items */}
                {section.items.map((item, ii) => (
                  <ActionItemRow key={ii} item={item} first={ii === 0} />
                ))}
              </React.Fragment>
            ))}

            {/* Footer */}
            <div
              style={{
                padding: "10px 14px",
                background: BRAND.boneCream,
                borderTop: `1px solid ${BRAND.border}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              } as React.CSSProperties}
            >
              <span
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 10.5,
                  color: BRAND.stone,
                } as React.CSSProperties}
              >
                Showing 8 of 12 &middot; 4 snoozed
              </span>
              <span
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 10.5,
                  fontWeight: 500,
                  color: BRAND.stoneDark,
                  cursor: "default",
                } as React.CSSProperties}
              >
                View archive →
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ActionItemRow ─────────────────────────────────────────────────────────────

function ActionItemRow({ item, first }: { item: ActionItem; first: boolean }) {
  const Icon = item.Icon;
  return (
    <div
      style={{
        padding: "12px 14px",
        display: "flex",
        alignItems: "center",
        gap: 11,
        borderTop: !first ? `1px solid ${BRAND.borderSoft}` : "none",
      } as React.CSSProperties}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 7,
          background: item.iconBg,
          border: `1px solid ${item.iconBorder}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        } as React.CSSProperties}
      >
        <Icon size={13} color={item.iconColor} strokeWidth={1.8} />
      </div>
      <div style={{ flex: 1, minWidth: 0 } as React.CSSProperties}>
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 12.5,
            fontWeight: 600,
            color: BRAND.onyx,
            marginBottom: 2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          } as React.CSSProperties}
        >
          {item.title}
        </div>
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 11,
            color: BRAND.stone,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          } as React.CSSProperties}
        >
          {item.sub}
        </div>
      </div>
      <div
        style={{
          fontFamily: FONT.sans,
          fontSize: 10,
          fontWeight: 500,
          color: BRAND.stoneLight,
          flexShrink: 0,
          whiteSpace: "nowrap",
        } as React.CSSProperties}
      >
        {item.age}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          background: BRAND.onyx,
          color: BRAND.bone,
          fontFamily: FONT.sans,
          fontSize: 11,
          fontWeight: 600,
          padding: "6px 12px",
          borderRadius: 100,
          flexShrink: 0,
          cursor: "default",
        } as React.CSSProperties}
      >
        {item.cta}
        <ChevronRight size={11} strokeWidth={2} />
      </div>
    </div>
  );
}
