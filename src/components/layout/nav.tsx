"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { LimespunMark } from "@/components/brand/limespun-mark";
import {
  Sparkles, Inbox, Calendar, MessageSquare, Clock,
  Users, LayoutGrid, ImageIcon, FileText, CreditCard,
  Package, BarChart3, Megaphone, Star, Globe,
  ArrowUpRight, Shield, MapPin, Database, CheckCircle2,
  Bell, Heart, TrendingUp, Menu, X, ChevronDown,
} from "lucide-react";
import { BRAND, FONT, CTA } from "@/lib/brand";
import type { NavItem, NavColumn, NavColumnItem, NavFooter } from "@/types";

// ─── Nav data ────────────────────────────────────────────────────────────────

const navItems: NavItem[] = [
  {
    label: "Product",
    type: "mega",
    columns: [
      {
        title: "Run the day",
        items: [
          { icon: Sparkles,      name: "Today",        desc: "Morning launchpad",        href: "/product/today" },
          { icon: Inbox,         name: "Inbox",         desc: "Action items in one feed",  href: "/product/inbox" },
          { icon: Calendar,      name: "Calendar",      desc: "Multi-chair scheduling",    href: "/product/calendar" },
          { icon: MessageSquare, name: "Messages",      desc: "Unified client chat",       href: "/product/messages" },
          { icon: Clock,         name: "Appointments",  desc: "Booking & deposits",        href: "/product/appointments" },
        ],
      },
      {
        title: "Clients & creative",
        items: [
          { icon: Users,      name: "Clients",           desc: "CRM with allergy alerts",  href: "/product/clients" },
          { icon: LayoutGrid, name: "Projects",           desc: "Multi-session sleeves",    href: "/product/projects" },
          { icon: ImageIcon,  name: "Flash & Portfolio",  desc: "Design library",           href: "/product/portfolio" },
          { icon: FileText,   name: "Forms",              desc: "Consent & waivers",        href: "/product/forms" },
        ],
      },
      {
        title: "Studio operations",
        items: [
          { icon: Users,      name: "Team",       desc: "Artists, guests, payroll",   href: "/product/team" },
          { icon: CreditCard, name: "Payments",   desc: "Commission auto-splits",     href: "/product/payments" },
          { icon: Package,    name: "Inventory",  desc: "Ink, needles, REACH",        href: "/product/inventory" },
        ],
      },
      {
        title: "Grow",
        items: [
          { icon: BarChart3,  name: "Analytics",  desc: "Revenue, retention, mix",   href: "/product/analytics" },
          { icon: Megaphone,  name: "Marketing",  desc: "Campaigns & loyalty",       href: "/product/marketing" },
          { icon: Sparkles,   name: "AI Studio",  desc: "Design assist & briefs",    href: "/product/ai-design" },
        ],
      },
    ] satisfies NavColumn[],
    footer: {
      title: "The studio OS for tattoo",
      desc: "Fifteen modules, one source of truth — built for resident, guest, and chain studios.",
      ctaLabel: "See full product tour",
      ctaHref: "/product",
    } satisfies NavFooter,
  },
  {
    label: "Solutions",
    type: "mega",
    columns: [
      {
        title: "By studio size",
        items: [
          { icon: Star,       name: "Solo artists",         desc: "One chair, full kit · $29/mo",     href: "/for/solo-artists" },
          { icon: Users,      name: "Small studios",        desc: "2–5 chairs · $59/mo",              href: "/for/small-studios" },
          { icon: LayoutGrid, name: "Multi-chair shops",    desc: "6+ chairs · $99/mo",               href: "/for/multi-chair" },
          { icon: Globe,      name: "Multi-location chains",desc: "Enterprise scale · $199/mo",        href: "/for/multi-location" },
        ],
      },
      {
        title: "By goal",
        items: [
          { icon: ArrowUpRight, name: "Migrate from DaySmart", desc: "9-day white-glove move",     href: "/migrate/daysmart" },
          { icon: ArrowUpRight, name: "Migrate from Fresha",   desc: "Keep your bookings",         href: "/migrate/fresha" },
          { icon: Shield,       name: "EU REACH compliance",   desc: "Ink registry built-in",      href: "/reach-compliance" },
          { icon: MapPin,       name: "Guest artist tours",    desc: "Time-boxed residencies",     href: "/product" },
        ],
      },
    ] satisfies NavColumn[],
    footer: {
      title: "Migrate in 14 days",
      desc: "White-glove import from any tattoo or salon SaaS. Zero data loss, zero downtime.",
      ctaLabel: "Talk to migrations team",
      ctaHref: "/migrate",
    } satisfies NavFooter,
  },
  { label: "Pricing",   href: "/pricing",  type: "link" },
  {
    label: "Resources",
    type: "mega",
    columns: [
      {
        title: "Learn",
        items: [
          { icon: FileText,     name: "Blog",                    desc: "Studio playbooks & ops",    href: "/blog" },
          { icon: ArrowUpRight, name: "Migration guide",          desc: "Move from any platform",   href: "/migrate" },
          { icon: Shield,       name: "REACH compliance hub",     desc: "EU ink regulations",       href: "/reach-compliance" },
          { icon: Sparkles,     name: "Studio operations 101",    desc: "New owner essentials",     href: "#" },
        ],
      },
      {
        title: "Support",
        items: [
          { icon: MessageSquare, name: "Help center",        desc: "Docs & how-tos",     href: "#" },
          { icon: Database,      name: "API documentation",  desc: "For developers",     href: "#" },
          { icon: CheckCircle2,  name: "Status",             desc: "System health",      href: "#" },
          { icon: Bell,          name: "Contact support",    desc: "24/7 chat & email",  href: "/contact" },
        ],
      },
      {
        title: "Company",
        items: [
          { icon: Heart,     name: "About Limespun",  desc: "Our story",           href: "/about" },
          { icon: TrendingUp,name: "Roadmap",       desc: "What we're building", href: "/roadmap" },
          { icon: Users,     name: "Careers",       desc: "Join the team",       href: "/careers" },
          { icon: ImageIcon, name: "Press kit",     desc: "Brand & assets",      href: "/press" },
        ],
      },
    ] satisfies NavColumn[],
    footer: {
      title: "New here? Start with the playbook",
      desc: "A 12-page guide to running a modern tattoo studio — written by studio owners, free.",
      ctaLabel: "Download the playbook",
      ctaHref: "#",
    } satisfies NavFooter,
  },
  { label: "Changelog", href: "/changelog", type: "link", dot: true },
];

// ─── Mega menu grid column counts ────────────────────────────────────────────

function megaGridCols(label: string): number {
  if (label === "Product")   return 4;
  if (label === "Solutions") return 2;
  if (label === "Resources") return 3;
  return 1;
}

// ─── NavColumnItem component ──────────────────────────────────────────────────

function MegaItem({ item }: { item: NavColumnItem }) {
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;

  return (
    <a
      href={item.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        padding: "8px 10px",
        borderRadius: 8,
        textDecoration: "none",
        background: hovered ? BRAND.bone : "transparent",
        transition: "background 0.15s",
        cursor: "pointer",
      } as React.CSSProperties}
    >
      <span style={{
        flexShrink: 0,
        width: 30,
        height: 30,
        borderRadius: 6,
        background: hovered ? BRAND.rustWash : BRAND.boneDeep,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.15s",
      } as React.CSSProperties}>
        <Icon size={15} strokeWidth={1.6} style={{ color: hovered ? BRAND.rust : BRAND.stoneDark } as React.CSSProperties} />
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: 1 } as React.CSSProperties}>
        <span style={{
          fontFamily: FONT.sans,
          fontSize: 13,
          fontWeight: 500,
          color: BRAND.ink,
          lineHeight: 1.3,
        } as React.CSSProperties}>{item.name}</span>
        <span style={{
          fontFamily: FONT.sans,
          fontSize: 12,
          color: BRAND.stone,
          lineHeight: 1.4,
        } as React.CSSProperties}>{item.desc}</span>
      </span>
    </a>
  );
}

// ─── Mega menu panel ──────────────────────────────────────────────────────────

interface MegaPanelProps {
  item: NavItem;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function MegaPanel({ item, onMouseEnter, onMouseLeave }: MegaPanelProps) {
  const cols = megaGridCols(item.label);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: "absolute",
        top: "calc(100% + 8px)",
        left: "50%",
        transform: "translateX(-50%)",
        width: 1100,
        maxWidth: "calc(100vw - 48px)",
        background: BRAND.white,
        border: `1px solid ${BRAND.border}`,
        borderRadius: 16,
        boxShadow: "0 20px 60px -12px rgba(15,15,15,0.14), 0 4px 16px -4px rgba(15,15,15,0.06)",
        zIndex: 1000,
        overflow: "hidden",
      } as React.CSSProperties}
    >
      {/* Columns */}
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 0,
        padding: "20px 20px 0",
      } as React.CSSProperties}>
        {item.columns?.map((col) => (
          <div key={col.title} style={{ padding: "0 12px 20px" } as React.CSSProperties}>
            <div style={{
              fontFamily: FONT.sans,
              fontSize: 11,
              fontWeight: 600,
              color: BRAND.stoneLight,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 8,
              paddingLeft: 10,
            } as React.CSSProperties}>{col.title}</div>
            {col.items.map((it) => (
              <MegaItem key={it.name} item={it} />
            ))}
          </div>
        ))}
      </div>

      {/* Footer band */}
      {item.footer && (
        <div style={{
          borderTop: `1px solid ${BRAND.border}`,
          background: BRAND.bone,
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        } as React.CSSProperties}>
          <div>
            <div style={{
              fontFamily: FONT.serif,
              fontSize: 16,
              color: BRAND.ink,
              marginBottom: 2,
            } as React.CSSProperties}>{item.footer.title}</div>
            <div style={{
              fontFamily: FONT.sans,
              fontSize: 12,
              color: BRAND.stone,
              lineHeight: 1.5,
            } as React.CSSProperties}>{item.footer.desc}</div>
          </div>
          <a
            href={item.footer.ctaHref}
            style={{
              flexShrink: 0,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "9px 18px",
              borderRadius: 100,
              background: BRAND.onyx,
              color: BRAND.bone,
              fontFamily: FONT.sans,
              fontSize: 13,
              fontWeight: 500,
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "background 0.15s",
            } as React.CSSProperties}
          >
            {item.footer.ctaLabel}
            <ArrowUpRight size={13} strokeWidth={2} />
          </a>
        </div>
      )}
    </div>
  );
}

// ─── Mobile accordion item ────────────────────────────────────────────────────

interface MobileNavItemProps {
  item: NavItem;
  expanded: boolean;
  onToggle: () => void;
}

function MobileNavItem({ item, expanded, onToggle }: MobileNavItemProps) {
  if (item.type === "link") {
    return (
      <a
        href={item.href}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "14px 0",
          borderBottom: `1px solid ${BRAND.border}`,
          fontFamily: FONT.sans,
          fontSize: 16,
          fontWeight: 500,
          color: BRAND.ink,
          textDecoration: "none",
        } as React.CSSProperties}
      >
        {item.label}
        {item.dot && (
          <span style={{
            width: 6, height: 6, borderRadius: 100,
            background: BRAND.rust, display: "inline-block",
          } as React.CSSProperties} />
        )}
      </a>
    );
  }

  return (
    <div style={{ borderBottom: `1px solid ${BRAND.border}` } as React.CSSProperties}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: FONT.sans,
          fontSize: 16,
          fontWeight: 500,
          color: BRAND.ink,
        } as React.CSSProperties}
      >
        {item.label}
        <ChevronDown
          size={16}
          strokeWidth={2}
          style={{
            color: BRAND.stone,
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          } as React.CSSProperties}
        />
      </button>
      {expanded && (
        <div style={{ paddingBottom: 12 } as React.CSSProperties}>
          {item.columns?.map((col) => (
            <div key={col.title} style={{ marginBottom: 16 } as React.CSSProperties}>
              <div style={{
                fontFamily: FONT.sans,
                fontSize: 11,
                fontWeight: 600,
                color: BRAND.stoneLight,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 6,
                paddingLeft: 4,
              } as React.CSSProperties}>{col.title}</div>
              {col.items.map((it) => {
                const Icon = it.icon;
                return (
                  <a
                    key={it.name}
                    href={it.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "7px 4px",
                      textDecoration: "none",
                    } as React.CSSProperties}
                  >
                    <Icon size={14} strokeWidth={1.6} style={{ color: BRAND.stone } as React.CSSProperties} />
                    <span style={{
                      fontFamily: FONT.sans,
                      fontSize: 14,
                      color: BRAND.ink,
                    } as React.CSSProperties}>{it.name}</span>
                  </a>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

export function Nav() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(label);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const toggleMobile = (label: string) => {
    setMobileExpanded((prev) => (prev === label ? null : label));
  };

  // Always a floating white bar; only the shadow deepens once the page scrolls
  const wrapperStyle: React.CSSProperties = {
    position: "fixed",
    top: 14,
    left: "50%",
    transform: "translateX(-50%)",
    width: "calc(100% - 28px)",
    maxWidth: 1296,
    zIndex: 900,
  };

  const barStyle: React.CSSProperties = {
    background: BRAND.white,
    borderRadius: 20,
    border: `1px solid ${scrolled ? BRAND.border : "rgba(231,229,225,0.6)"}`,
    boxShadow: scrolled
      ? "0 10px 30px -12px rgba(29,30,28,0.18), 0 2px 6px -2px rgba(29,30,28,0.08)"
      : "0 4px 18px -10px rgba(29,30,28,0.14)",
    padding: "0 10px 0 20px",
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "box-shadow 0.25s ease, border-color 0.25s ease",
  };

  return (
    <>
      <div style={wrapperStyle}>
        <div style={barStyle}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 9 } as React.CSSProperties}>
            <LimespunMark size={28} />
            <span style={{
              fontFamily: FONT.sans,
              fontSize: 15,
              fontWeight: 600,
              color: BRAND.onyx,
              letterSpacing: "-0.01em",
            } as React.CSSProperties}>Limespun</span>
          </Link>

          {/* Desktop nav items */}
          <nav
            aria-label="Primary"
            className="limespun-nav-desktop"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              position: "relative",
            } as React.CSSProperties}
          >
            {navItems.map((item) => {
              if (item.type === "link") {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "6px 12px",
                      borderRadius: 8,
                      fontFamily: FONT.sans,
                      fontSize: 14,
                      fontWeight: 450,
                      color: BRAND.ink,
                      textDecoration: "none",
                      transition: "background 0.12s",
                    } as React.CSSProperties}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = BRAND.boneDeep;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                    }}
                  >
                    {item.label}
                    {item.dot && (
                      <span style={{
                        width: 5, height: 5, borderRadius: 100,
                        background: BRAND.rust, display: "inline-block",
                      } as React.CSSProperties} />
                    )}
                  </a>
                );
              }

              // Mega menu trigger
              const isActive = activeMenu === item.label;
              return (
                <div
                  key={item.label}
                  style={{ position: "relative" } as React.CSSProperties}
                  onMouseEnter={() => handleEnter(item.label)}
                  onMouseLeave={handleLeave}
                >
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={isActive}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "6px 12px",
                      borderRadius: 8,
                      background: isActive ? BRAND.boneDeep : "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: FONT.sans,
                      fontSize: 14,
                      fontWeight: 450,
                      color: BRAND.ink,
                      transition: "background 0.12s",
                    } as React.CSSProperties}
                  >
                    {item.label}
                    <ChevronDown
                      size={13}
                      strokeWidth={2}
                      style={{
                        color: BRAND.stone,
                        transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s",
                      } as React.CSSProperties}
                    />
                  </button>

                  {isActive && (
                    <MegaPanel
                      item={item}
                      onMouseEnter={() => handleEnter(item.label)}
                      onMouseLeave={handleLeave}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 } as React.CSSProperties}>
            <a
              href={CTA.demoHref}
              className="limespun-nav-secondary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: 44,
                padding: "0 14px",
                borderRadius: 100,
                color: BRAND.onyx,
                fontFamily: FONT.sans,
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
                whiteSpace: "nowrap",
              } as React.CSSProperties}
            >
              {CTA.demoLabel}
            </a>
            <a
              href={CTA.primaryHref}
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: 44,
                padding: "0 18px",
                borderRadius: 100,
                background: BRAND.onyx,
                color: BRAND.white,
                fontFamily: FONT.sans,
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
                whiteSpace: "nowrap",
              } as React.CSSProperties}
            >
              {CTA.primaryLabel}<span className="limespun-nav-secondary" aria-hidden="true">&nbsp;&nbsp;→</span>
            </a>

            {/* Mobile burger */}
            <button
              className="limespun-nav-burger"
              onClick={() => setOpen((v) => !v)}
              style={{
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                borderRadius: 8,
                background: BRAND.boneDeep,
                border: "none",
                cursor: "pointer",
              } as React.CSSProperties}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open
                ? <X size={18} strokeWidth={2} style={{ color: BRAND.ink } as React.CSSProperties} />
                : <Menu size={18} strokeWidth={2} style={{ color: BRAND.ink } as React.CSSProperties} />
              }
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div
            className="limespun-nav-mobile"
            style={{
              display: "none", // shown via CSS at ≤768px
              marginTop: 8,
              background: BRAND.white,
              border: `1px solid ${BRAND.border}`,
              borderRadius: 16,
              padding: "8px 24px 24px",
              boxShadow: "0 12px 32px -8px rgba(15,15,15,0.12)",
            } as React.CSSProperties}
          >
            {navItems.map((item) => (
              <MobileNavItem
                key={item.label}
                item={item}
                expanded={mobileExpanded === item.label}
                onToggle={() => toggleMobile(item.label)}
              />
            ))}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 } as React.CSSProperties}>
              <a
                href={CTA.demoHref}
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "13px",
                  borderRadius: 100,
                  border: `1px solid ${BRAND.onyx}`,
                  fontFamily: FONT.sans,
                  fontSize: 15,
                  fontWeight: 600,
                  color: BRAND.onyx,
                  textDecoration: "none",
                } as React.CSSProperties}
              >
                {CTA.demoLabel}
              </a>
              <a
                href={CTA.primaryHref}
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "13px",
                  borderRadius: 100,
                  background: BRAND.onyx,
                  fontFamily: FONT.sans,
                  fontSize: 15,
                  fontWeight: 600,
                  color: BRAND.white,
                  textDecoration: "none",
                } as React.CSSProperties}
              >
                {CTA.primaryLabel}
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Spacer so content doesn't sit under fixed nav */}
      <div style={{ height: 92 } as React.CSSProperties} aria-hidden="true" />
    </>
  );
}
