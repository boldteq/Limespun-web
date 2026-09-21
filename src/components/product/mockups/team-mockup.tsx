"use client";

import React from "react";
import {
  Plus, ChevronDown,
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

interface TeamMember {
  name: string;
  joined: string;
  role: "Resident" | "Guest" | "Apprentice";
  activeProjects: number;
  split: string;
  stripeConnected: boolean;
}

// ─── Sidebar ───────────────────────────────────────────────────────────────────

function Sidebar({ activeItem }: { activeItem: string }) {
  const studioItems: NavItem[] = [
    { icon: Sparkles,      label: "Today" },
    { icon: Inbox,         label: "Inbox",        badge: 3 },
    { icon: Calendar,      label: "Calendar" },
    { icon: MessageSquare, label: "Messages",     badge: 2 },
    { icon: Clock,         label: "Appointments" },
  ];
  const workflowItems: NavItem[] = [
    { icon: LayoutGrid, label: "Projects", tag: "NEW" },
    { icon: Users,      label: "Clients" },
    { icon: Heart,      label: "Team", active: activeItem === "Team" },
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

const AVATAR_COLORS: string[] = [
  `linear-gradient(135deg, ${BRAND.rust}, ${BRAND.rustDeep})`,
  `linear-gradient(135deg, ${BRAND.amber}, ${BRAND.rustGlow})`,
  `linear-gradient(135deg, ${BRAND.sage}, ${BRAND.amber})`,
  `linear-gradient(135deg, ${BRAND.stoneDark}, ${BRAND.onyx})`,
  `linear-gradient(135deg, ${BRAND.rustGlow}, ${BRAND.amber})`,
  `linear-gradient(135deg, ${BRAND.sage}, ${BRAND.rustGlow})`,
  `linear-gradient(135deg, ${BRAND.rustDeep}, ${BRAND.rust})`,
  `linear-gradient(135deg, ${BRAND.amber}, ${BRAND.sage})`,
];

const ROLE_STYLES: Record<TeamMember["role"], { bg: string; color: string }> = {
  Resident:   { bg: BRAND.rustSoft,   color: BRAND.rust },
  Guest:      { bg: BRAND.amberSoft,  color: BRAND.amber },
  Apprentice: { bg: BRAND.sageSoft,   color: BRAND.sage },
};

const teamMembers: TeamMember[] = [
  { name: "Miles Verena",   joined: "joined 2022", role: "Resident",   activeProjects: 7, split: "70/30",  stripeConnected: true },
  { name: "Rafael Moreno",  joined: "joined 2022", role: "Resident",   activeProjects: 5, split: "65/35",  stripeConnected: true },
  { name: "Yvette Klein",   joined: "joined 2023", role: "Resident",   activeProjects: 4, split: "70/30",  stripeConnected: true },
  { name: "Nina Yates",     joined: "joined 2024", role: "Guest",      activeProjects: 1, split: "60/40",  stripeConnected: true },
  { name: "Dev Patel",      joined: "joined 2023", role: "Resident",   activeProjects: 3, split: "70/30",  stripeConnected: true },
  { name: "Zoe Hall",       joined: "joined 2025", role: "Apprentice", activeProjects: 2, split: "0/100",  stripeConnected: true },
  { name: "Asha Khan",      joined: "joined 2024", role: "Guest",      activeProjects: 1, split: "60/40",  stripeConnected: false },
  { name: "Marcus Brown",   joined: "joined 2022", role: "Resident",   activeProjects: 6, split: "65/35",  stripeConnected: true },
];

const tabs = [
  { label: "Active",   count: 8,  selected: true },
  { label: "Guests",   count: 3,  selected: false },
  { label: "Pending",  count: 2,  selected: false },
  { label: "Archived", count: 5,  selected: false },
];

// ─── TeamMockup ────────────────────────────────────────────────────────────────

export function TeamMockup() {
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
          app.limespun.com/team
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
        <Sidebar activeItem="Team" />

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
                Team &middot; Artists, Guests, Admin
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
                  Team
                </span>
                <span
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 13,
                    fontWeight: 500,
                    color: BRAND.stoneDark,
                  } as React.CSSProperties}
                >
                  &middot; 8 active
                </span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: BRAND.onyx,
                borderRadius: 100,
                padding: "6px 12px",
                fontFamily: FONT.sans,
                fontSize: 11.5,
                fontWeight: 600,
                color: BRAND.bone,
              } as React.CSSProperties}
            >
              <Plus size={12} strokeWidth={2.2} />
              Invite member
            </div>
          </div>

          {/* Tab strip */}
          <div
            style={{
              display: "flex",
              gap: 4,
              borderBottom: `1px solid ${BRAND.border}`,
              paddingBottom: 12,
              marginBottom: 14,
            } as React.CSSProperties}
          >
            {tabs.map((tab, i) => (
              <div
                key={i}
                style={{
                  padding: "4px 12px",
                  fontFamily: FONT.sans,
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: tab.selected ? BRAND.onyx : BRAND.stone,
                  borderBottom: tab.selected ? `2px solid ${BRAND.rust}` : "2px solid transparent",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  cursor: "default",
                } as React.CSSProperties}
              >
                {tab.label}
                <span
                  style={{
                    fontSize: 10.5,
                    fontWeight: 500,
                    color: tab.selected ? BRAND.stoneDark : BRAND.stoneLight,
                  } as React.CSSProperties}
                >
                  {tab.count}
                </span>
              </div>
            ))}
          </div>

          {/* Roster table */}
          <div
            style={{
              background: "#FFFFFF",
              border: `1px solid ${BRAND.border}`,
              borderRadius: 10,
              overflow: "hidden",
            } as React.CSSProperties}
          >
            {/* Table header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
                background: BRAND.boneCream,
                padding: "11px 16px",
                borderBottom: `1px solid ${BRAND.border}`,
              } as React.CSSProperties}
            >
              {["Artist", "Role", "Active projects", "Commission split", "Stripe Connect"].map((col, i) => (
                <div
                  key={i}
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 10.5,
                    fontWeight: 600,
                    color: BRAND.stone,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  } as React.CSSProperties}
                >
                  {col}
                </div>
              ))}
            </div>

            {/* Rows */}
            {teamMembers.map((member, i) => {
              const initial = member.name.charAt(0).toUpperCase();
              const roleStyle = ROLE_STYLES[member.role];
              return (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
                    padding: "12px 16px",
                    alignItems: "center",
                    borderTop: i === 0 ? "none" : `1px solid ${BRAND.borderSoft}`,
                  } as React.CSSProperties}
                >
                  {/* Artist col */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10 } as React.CSSProperties}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 100,
                        background: AVATAR_COLORS[i % AVATAR_COLORS.length],
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
                      {initial}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: FONT.sans,
                          fontSize: 13,
                          fontWeight: 600,
                          color: BRAND.onyx,
                          lineHeight: 1.2,
                        } as React.CSSProperties}
                      >
                        {member.name}
                      </div>
                      <div
                        style={{
                          fontFamily: FONT.sans,
                          fontSize: 11,
                          color: BRAND.stoneLight,
                        } as React.CSSProperties}
                      >
                        {member.joined}
                      </div>
                    </div>
                  </div>

                  {/* Role col */}
                  <div>
                    <span
                      style={{
                        fontFamily: FONT.sans,
                        fontSize: 11,
                        fontWeight: 600,
                        color: roleStyle.color,
                        background: roleStyle.bg,
                        padding: "3px 8px",
                        borderRadius: 100,
                      } as React.CSSProperties}
                    >
                      {member.role}
                    </span>
                  </div>

                  {/* Active projects col */}
                  <div>
                    <span
                      style={{
                        fontFamily: FONT.sans,
                        fontSize: 13,
                        fontWeight: 600,
                        color: BRAND.onyx,
                      } as React.CSSProperties}
                    >
                      {member.activeProjects}
                    </span>
                    <span
                      style={{
                        fontFamily: FONT.sans,
                        fontSize: 11,
                        color: BRAND.stoneLight,
                        marginLeft: 4,
                      } as React.CSSProperties}
                    >
                      active
                    </span>
                  </div>

                  {/* Commission split col */}
                  <div
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 13,
                      color: BRAND.onyx,
                    } as React.CSSProperties}
                  >
                    {member.split}
                  </div>

                  {/* Stripe Connect col */}
                  <div style={{ display: "flex", alignItems: "center", gap: 6 } as React.CSSProperties}>
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 100,
                        background: member.stripeConnected ? BRAND.sage : BRAND.danger,
                        flexShrink: 0,
                      } as React.CSSProperties}
                    />
                    <span
                      style={{
                        fontFamily: FONT.sans,
                        fontSize: 11,
                        fontWeight: 500,
                        color: BRAND.stoneDark,
                      } as React.CSSProperties}
                    >
                      {member.stripeConnected ? "Connected" : "Pending"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 14px",
              background: BRAND.boneCream,
              borderTop: `1px solid ${BRAND.border}`,
              marginTop: 14,
              borderRadius: "0 0 10px 10px",
            } as React.CSSProperties}
          >
            <span
              style={{
                fontFamily: FONT.sans,
                fontSize: 11,
                color: BRAND.stoneDark,
              } as React.CSSProperties}
            >
              8 active &middot; 3 guest residencies &middot; $42K commissions paid this month
            </span>
            <span
              style={{
                fontFamily: FONT.sans,
                fontSize: 11,
                fontWeight: 600,
                color: BRAND.onyx,
              } as React.CSSProperties}
            >
              Run payroll &rarr;
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
