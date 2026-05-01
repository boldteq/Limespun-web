"use client";

import React, { useState, useEffect } from "react";
import { BRAND, FONT, GRADIENT } from "@/lib/brand";
import { TriCircleMarkV2 } from "@/components/brand/tri-circle-mark";

// ─── LiveClock ────────────────────────────────────────────────────────────────

function LiveClock() {
  const [time, setTime] = useState<string>("—");

  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const hh = d.getHours();
      const mm = d.getMinutes().toString().padStart(2, "0");
      const ampm = hh >= 12 ? "pm" : "am";
      const h12 = hh % 12 || 12;
      setTime(`${h12}:${mm}${ampm}`);
    };
    fmt();
    const id = setInterval(fmt, 30000);
    return () => clearInterval(id);
  }, []);

  return <span>{time}</span>;
}

// ─── Footer link columns ──────────────────────────────────────────────────────

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

const columns: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "Today",      href: "/product/today" },
      { label: "Inbox",      href: "/product/inbox" },
      { label: "Calendar",   href: "/product/calendar" },
      { label: "Messages",   href: "/product/messages" },
      { label: "Projects",   href: "/product/projects" },
      { label: "Clients",    href: "/product/clients" },
      { label: "Payments",   href: "/product/payments" },
      { label: "Inventory",  href: "/product/inventory" },
      { label: "AI",         href: "/product/ai-design" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About",      href: "/about" },
      { label: "Customers",  href: "/customers" },
      { label: "Changelog",  href: "/changelog" },
      { label: "Roadmap",    href: "/roadmap" },
      { label: "Press",      href: "/press" },
      { label: "Careers",    href: "/careers" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Help center",            href: "#" },
      { label: "API documentation",      href: "#" },
      { label: "REACH compliance hub",   href: "/reach-compliance" },
      { label: "Migration guide",        href: "/migrate" },
      { label: "System status",          href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy",       href: "/legal/privacy" },
      { label: "Terms",         href: "/legal/terms" },
      { label: "Security",      href: "/legal/security" },
      { label: "GDPR",          href: "/legal/gdpr" },
      { label: "Cookie policy", href: "/legal/cookies" },
    ],
  },
];

// ─── Footer ───────────────────────────────────────────────────────────────────

export function Footer() {
  return (
    <footer style={{
      background: BRAND.boneCream,
      borderTop: `1px solid ${BRAND.border}`,
      position: "relative",
      overflow: "hidden",
    } as React.CSSProperties}>
      {/* Corner rust glow */}
      <div style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 400,
        height: 400,
        background: GRADIENT.cornerRust,
        pointerEvents: "none",
        zIndex: 0,
      } as React.CSSProperties} />

      {/* Main footer body */}
      <div style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1200,
        margin: "0 auto",
        padding: "64px 40px 0",
      } as React.CSSProperties}>
        {/* Top row: logo + columns */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "220px 1fr",
          gap: 48,
          marginBottom: 56,
        } as React.CSSProperties}>
          {/* Brand column */}
          <div>
            {/* Logo mark */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 } as React.CSSProperties}>
              <TriCircleMarkV2 size={36} />
              <span style={{
                fontFamily: FONT.sans,
                fontSize: 16,
                fontWeight: 600,
                color: BRAND.onyx,
                letterSpacing: "-0.01em",
              } as React.CSSProperties}>InkOS</span>
            </div>

            <p style={{
              fontFamily: FONT.sans,
              fontSize: 13,
              color: BRAND.stone,
              lineHeight: 1.7,
              marginBottom: 20,
            } as React.CSSProperties}>
              The studio OS for tattoo. Bookings, deposits, projects, portfolio, consent, payments — one quiet system.
            </p>

            {/* Live clock */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "6px 12px",
              borderRadius: 8,
              background: BRAND.boneDeep,
              border: `1px solid ${BRAND.border}`,
            } as React.CSSProperties}>
              <span style={{
                width: 6,
                height: 6,
                borderRadius: 100,
                background: BRAND.sage,
                display: "inline-block",
                animation: "inkos-pulse 2s ease-in-out infinite",
              } as React.CSSProperties} />
              <span style={{
                fontFamily: FONT.mono,
                fontSize: 12,
                color: BRAND.stoneDark,
                letterSpacing: "0.04em",
              } as React.CSSProperties}>
                <LiveClock />
              </span>
              <span style={{
                fontFamily: FONT.sans,
                fontSize: 11,
                color: BRAND.stoneLight,
              } as React.CSSProperties}>local</span>
            </div>
          </div>

          {/* Link columns */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
          } as React.CSSProperties}>
            {columns.map((col) => (
              <div key={col.heading}>
                <div style={{
                  fontFamily: FONT.sans,
                  fontSize: 11,
                  fontWeight: 600,
                  color: BRAND.stoneDark,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                } as React.CSSProperties}>{col.heading}</div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9 } as React.CSSProperties}>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        style={{
                          fontFamily: FONT.sans,
                          fontSize: 13,
                          color: BRAND.stone,
                          textDecoration: "none",
                          lineHeight: 1.4,
                          transition: "color 0.12s",
                        } as React.CSSProperties}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.color = BRAND.ink;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.color = BRAND.stone;
                        }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div style={{
        position: "relative",
        zIndex: 1,
        borderTop: `1px solid ${BRAND.border}`,
        maxWidth: "100%",
      } as React.CSSProperties}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "18px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        } as React.CSSProperties}>
          <span style={{
            fontFamily: FONT.sans,
            fontSize: 12,
            color: BRAND.stoneLight,
          } as React.CSSProperties}>
            &copy; {new Date().getFullYear()} InkOS Technologies, Inc. All rights reserved.
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: 6 } as React.CSSProperties}>
            {/* Status dot */}
            <span style={{
              width: 6,
              height: 6,
              borderRadius: 100,
              background: BRAND.sage,
              display: "inline-block",
            } as React.CSSProperties} />
            <span style={{
              fontFamily: FONT.sans,
              fontSize: 12,
              color: BRAND.stoneLight,
            } as React.CSSProperties}>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
