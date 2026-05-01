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

interface CampaignStat {
  label: string;
  value: string;
}

interface Campaign {
  title: string;
  sub: string;
  stats: CampaignStat[];
}

interface LoyaltyTier {
  label: string;
  members: number;
  pct: number;
  color: string;
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

// ─── Data ──────────────────────────────────────────────────────────────────────

const campaigns: Campaign[] = [
  {
    title: "Spring touch-up window",
    sub: "SMS · Targeted clients with 1+ year since last session",
    stats: [
      { label: "Sent",   value: "47" },
      { label: "Open",   value: "78%" },
      { label: "Click",  value: "34%" },
      { label: "Booked", value: "12 (26%)" },
    ],
  },
  {
    title: "Loyalty milestone — 5th session",
    sub: "Auto-trigger · Free aftercare bundle on 5th session",
    stats: [
      { label: "Triggered", value: "8" },
      { label: "Redeemed",  value: "6" },
      { label: "Value",     value: "$240" },
    ],
  },
  {
    title: "Win-back · 6 months silent",
    sub: "Email + SMS · 14-day sequence",
    stats: [
      { label: "Triggered", value: "23" },
      { label: "Re-booked", value: "4" },
      { label: "Value",     value: "$1,860" },
    ],
  },
];

const loyaltyTiers: LoyaltyTier[] = [
  { label: "Tier 1 — 1st session",             members: 32, pct: 38, color: BRAND.onyx },
  { label: "Tier 2 — 3rd session",             members: 28, pct: 33, color: BRAND.rust },
  { label: "Tier 3 — 5th session (unlocked)",  members: 24, pct: 29, color: BRAND.sage },
];

const campaignTabs = [
  { label: "Live",      count: 5,  selected: true },
  { label: "Scheduled", count: 2,  selected: false },
  { label: "Drafts",    count: 3,  selected: false },
  { label: "Completed", count: 12, selected: false },
];

// ─── MarketingMockup ───────────────────────────────────────────────────────────

export function MarketingMockup() {
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
          inkos.app/marketing
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
                Marketing &middot; Campaigns &amp; Loyalty
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
                  Campaigns
                </span>
                <span
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 13,
                    fontWeight: 500,
                    color: BRAND.stoneDark,
                  } as React.CSSProperties}
                >
                  &middot; 5 live
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
              New campaign
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
            {campaignTabs.map((tab, i) => (
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

          {/* Active campaigns list */}
          <div
            style={{
              background: "#FFFFFF",
              border: `1px solid ${BRAND.border}`,
              borderRadius: 10,
              overflow: "hidden",
            } as React.CSSProperties}
          >
            {campaigns.map((campaign, i) => (
              <div
                key={i}
                style={{
                  padding: "16px 18px",
                  borderTop: i === 0 ? "none" : `1px solid ${BRAND.borderSoft}`,
                } as React.CSSProperties}
              >
                {/* Top row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 4,
                  } as React.CSSProperties}
                >
                  <span
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 14,
                      fontWeight: 700,
                      color: BRAND.onyx,
                      flex: 1,
                    } as React.CSSProperties}
                  >
                    {campaign.title}
                  </span>
                  <span
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 9,
                      fontWeight: 700,
                      color: BRAND.sage,
                      background: BRAND.sageSoft,
                      padding: "2px 6px",
                      borderRadius: 100,
                      letterSpacing: "0.06em",
                    } as React.CSSProperties}
                  >
                    LIVE
                  </span>
                  <span
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 11,
                      color: BRAND.stone,
                    } as React.CSSProperties}
                  >
                    {campaign.stats.map(s => `${s.value} ${s.label.toLowerCase()}`).slice(0, 2).join(" · ")}
                  </span>
                </div>

                {/* Sub */}
                <div
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 12,
                    color: BRAND.stoneLight,
                    marginBottom: 10,
                  } as React.CSSProperties}
                >
                  {campaign.sub}
                </div>

                {/* Stats row */}
                <div style={{ display: "flex", gap: 14, alignItems: "center" } as React.CSSProperties}>
                  {campaign.stats.map((stat, j) => (
                    <div key={j} style={{ display: "flex", flexDirection: "column", gap: 1 } as React.CSSProperties}>
                      <span
                        style={{
                          fontFamily: FONT.sans,
                          fontSize: 9,
                          color: BRAND.stoneLight,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        } as React.CSSProperties}
                      >
                        {stat.label}
                      </span>
                      <span
                        style={{
                          fontFamily: FONT.sans,
                          fontSize: 13,
                          fontWeight: 600,
                          color: BRAND.onyx,
                        } as React.CSSProperties}
                      >
                        {stat.value}
                      </span>
                    </div>
                  ))}
                  <div style={{ flex: 1 } as React.CSSProperties} />
                  <span
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 11,
                      fontWeight: 600,
                      color: BRAND.onyx,
                    } as React.CSSProperties}
                  >
                    View &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Loyalty widget */}
          <div
            style={{
              background: "#FFFFFF",
              border: `1px solid ${BRAND.border}`,
              borderRadius: 10,
              padding: 18,
              marginTop: 14,
            } as React.CSSProperties}
          >
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
                Loyalty programme &middot; Sable &amp; Sparrow members
              </span>
              <span
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 11,
                  fontWeight: 600,
                  color: BRAND.stoneDark,
                } as React.CSSProperties}
              >
                84 active
              </span>
            </div>

            {loyaltyTiers.map((tier, i) => (
              <div key={i} style={{ marginBottom: i < loyaltyTiers.length - 1 ? 12 : 0 } as React.CSSProperties}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 5,
                  } as React.CSSProperties}
                >
                  <span
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 11.5,
                      fontWeight: 500,
                      color: BRAND.stoneDark,
                    } as React.CSSProperties}
                  >
                    {tier.label}
                  </span>
                  <span
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 11,
                      color: BRAND.stone,
                    } as React.CSSProperties}
                  >
                    {tier.members} members
                  </span>
                </div>
                <div
                  style={{
                    height: 8,
                    background: BRAND.boneDeep,
                    borderRadius: 4,
                    overflow: "hidden",
                  } as React.CSSProperties}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${tier.pct}%`,
                      background: tier.color,
                      borderRadius: 4,
                    } as React.CSSProperties}
                  />
                </div>
              </div>
            ))}

            <div
              style={{
                fontFamily: FONT.sans,
                fontSize: 11,
                color: BRAND.stoneLight,
                fontStyle: "italic",
                marginTop: 12,
              } as React.CSSProperties}
            >
              Auto-rewards routed via Stripe Connect on next invoice
            </div>
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
              5 live &middot; 2 scheduled &middot; $4,310 attributed revenue this month
            </span>
            <span
              style={{
                fontFamily: FONT.sans,
                fontSize: 11,
                fontWeight: 600,
                color: BRAND.onyx,
              } as React.CSSProperties}
            >
              Open Marketing &rarr;
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
