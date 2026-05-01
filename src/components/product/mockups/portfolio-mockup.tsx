"use client";

import React from "react";
import {
  Plus, Filter, Pin, Check, ChevronDown,
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

interface ThumbCard {
  gradient: string;
  badge: string;
  initial: string;
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
    { icon: LayoutGrid, label: "Projects", tag: "NEW", active: activeItem === "Projects" },
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

// ─── Noise overlay SVG ─────────────────────────────────────────────────────────

const NOISE_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E`;

// ─── Thumbnail card data ───────────────────────────────────────────────────────

const thumbCards: ThumbCard[] = [
  { gradient: `linear-gradient(135deg, ${BRAND.rust}, ${BRAND.rustDeep})`,       badge: "FEATURED",    initial: "M" },
  { gradient: `linear-gradient(135deg, ${BRAND.amber}, ${BRAND.rustGlow})`,      badge: "FLASH",       initial: "R" },
  { gradient: `linear-gradient(135deg, ${BRAND.sage}, ${BRAND.amber})`,          badge: "HEALED",      initial: "Y" },
  { gradient: `linear-gradient(135deg, ${BRAND.onyx}, ${BRAND.stoneDark})`,      badge: "DRAFT",       initial: "N" },
  { gradient: `linear-gradient(135deg, ${BRAND.rustGlow}, ${BRAND.amber})`,      badge: "FLASH",       initial: "D" },
  { gradient: `linear-gradient(135deg, ${BRAND.sage}, ${BRAND.rustGlow})`,       badge: "HEALED · D45",initial: "Z" },
  { gradient: `linear-gradient(135deg, ${BRAND.rustDeep}, ${BRAND.rust})`,       badge: "FEATURED",    initial: "A" },
  { gradient: `linear-gradient(135deg, ${BRAND.amber}, ${BRAND.sage})`,          badge: "HEALED",      initial: "M" },
  { gradient: `linear-gradient(135deg, ${BRAND.stoneDark}, ${BRAND.onyx})`,      badge: "DRAFT",       initial: "R" },
  { gradient: `linear-gradient(135deg, ${BRAND.rustGlow}, ${BRAND.rustDeep})`,   badge: "FLASH",       initial: "Y" },
  { gradient: `linear-gradient(135deg, ${BRAND.sage}, ${BRAND.stoneDark})`,      badge: "HEALED",      initial: "N" },
  { gradient: `linear-gradient(135deg, ${BRAND.amber}, ${BRAND.rustDeep})`,      badge: "FEATURED",    initial: "D" },
];

const filterChips = [
  { label: "All",      count: 84, active: true },
  { label: "Flash",    count: 32, active: false },
  { label: "Healed",   count: 28, active: false },
  { label: "Drafts",   count: 12, active: false },
  { label: "Featured", count: 9,  active: false },
  { label: "Reviews",  count: 3,  active: false },
];

// ─── PortfolioMockup ──────────────────────────────────────────────────────────

export function PortfolioMockup() {
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
          inkos.app/portfolio
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
        <Sidebar activeItem="Projects" />

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
                Portfolio &middot; Studio Gallery
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
                  Portfolio
                </span>
                <span
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 13,
                    fontWeight: 500,
                    color: BRAND.stoneDark,
                  } as React.CSSProperties}
                >
                  &middot; 84 pieces
                </span>
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
                } as React.CSSProperties}
              >
                <Filter size={12} strokeWidth={1.8} />
                Filter
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
                Upload
              </div>
            </div>
          </div>

          {/* Filter chips */}
          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              paddingBottom: 14,
              borderBottom: `1px solid ${BRAND.border}`,
              marginBottom: 14,
            } as React.CSSProperties}
          >
            {filterChips.map((chip, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "5px 11px",
                  borderRadius: 100,
                  fontFamily: FONT.sans,
                  fontSize: 11.5,
                  fontWeight: chip.active ? 600 : 500,
                  background: chip.active ? BRAND.onyx : "#FFFFFF",
                  color: chip.active ? BRAND.bone : BRAND.stoneDark,
                  border: chip.active ? `1px solid ${BRAND.onyx}` : `1px solid ${BRAND.border}`,
                } as React.CSSProperties}
              >
                {chip.label}
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    opacity: 0.65,
                  } as React.CSSProperties}
                >
                  {chip.count}
                </span>
              </div>
            ))}
          </div>

          {/* Gallery grid card */}
          <div
            style={{
              background: "#FFFFFF",
              border: `1px solid ${BRAND.border}`,
              borderRadius: 10,
              padding: 18,
            } as React.CSSProperties}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 12,
              } as React.CSSProperties}
            >
              {thumbCards.map((card, i) => (
                <div
                  key={i}
                  style={{
                    aspectRatio: "3/4",
                    borderRadius: 10,
                    position: "relative",
                    background: card.gradient,
                    overflow: "hidden",
                  } as React.CSSProperties}
                >
                  {/* Noise overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: `url("${NOISE_SVG}")`,
                      opacity: 0.18,
                      mixBlendMode: "multiply",
                      borderRadius: 10,
                    } as React.CSSProperties}
                  />
                  {/* Pin icon top-right */}
                  <div
                    style={{
                      position: "absolute",
                      top: 7,
                      right: 7,
                    } as React.CSSProperties}
                  >
                    <Pin size={11} color={BRAND.bone} strokeWidth={1.8} />
                  </div>
                  {/* Badge bottom-left */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 7,
                      left: 7,
                      background: "rgba(247,247,245,0.85)",
                      backdropFilter: "blur(4px)",
                      padding: "3px 6px",
                      borderRadius: 4,
                      fontFamily: FONT.sans,
                      fontSize: 8,
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: BRAND.onyx,
                    } as React.CSSProperties}
                  >
                    {card.badge}
                  </div>
                  {/* Artist initial bottom-right */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 7,
                      right: 7,
                      fontFamily: FONT.mono,
                      fontSize: 9,
                      color: BRAND.bone,
                      letterSpacing: "0.06em",
                      opacity: 0.75,
                    } as React.CSSProperties}
                  >
                    {card.initial}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 14px",
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
              Showing 12 of 84 &middot; 3 healed this week
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontFamily: FONT.sans,
                fontSize: 11,
                color: BRAND.stoneDark,
              } as React.CSSProperties}
            >
              <Check size={10} color={BRAND.sage} strokeWidth={2.4} />
              Auto-sync from Projects on
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
