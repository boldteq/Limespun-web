"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { LimespunMark } from "@/components/brand/limespun-mark";
import {
  CalendarDays, HandCoins, MessagesSquare, UserRound,
  FileSignature, Layers, Images, Wand2,
  Banknote, UsersRound, Droplet, ChartColumn,
  User, Store, Building2, ArrowLeftRight,
  BookOpen, Calculator, Map, ShieldCheck,
  LifeBuoy, Mail, Sparkles, Heart,
  ArrowUpRight, Menu, X, ChevronDown,
} from "lucide-react";
import { BRAND, FONT, ACCOUNT } from "@/lib/brand";
import { PLANS, formatPrice, type PlanTier } from "@/lib/data/plans";
import type { NavItem, NavColumn, NavColumnItem, NavFooter } from "@/types";

// ─── Nav data ────────────────────────────────────────────────────────────────

const planPrice = (tier: PlanTier): string => formatPrice(PLANS.find((p) => p.tier === tier)?.monthlyCents ?? 0);
// Grouped by what a studio gets done, in plain words. Pages not listed here
// (Today, Inbox, Marketing) stay reachable from /product and the footer.

const navItems: NavItem[] = [
  {
    label: "Product",
    type: "mega",
    columns: [
      {
        title: "Get booked",
        items: [
          { icon: CalendarDays,   name: "Calendar",        desc: "Every artist's chair on one calendar", href: "/product/calendar" },
          { icon: HandCoins,      name: "Deposits",        desc: "Take deposits, cut no-shows",          href: "/product/appointments" },
          { icon: MessagesSquare, name: "Client messages", desc: "Every DM and text in one inbox",       href: "/product/messages" },
          { icon: UserRound,      name: "Client records",  desc: "History, photos and allergy alerts",   href: "/product/clients" },
        ],
      },
      {
        title: "Do the tattoo work",
        items: [
          { icon: FileSignature, name: "Consent forms",          desc: "Signed on a phone, stored safely",           href: "/product/forms" },
          { icon: Layers,        name: "Multi-session projects", desc: "Sleeves and back pieces, session by session", href: "/product/projects" },
          { icon: Images,        name: "Portfolio & flash",      desc: "Show your work, sell your flash",            href: "/product/portfolio" },
          { icon: Wand2,         name: "AI design briefs",       desc: "Turn a client's idea into a clear brief",    href: "/product/ai-design" },
        ],
      },
      {
        title: "Run the shop",
        items: [
          { icon: Banknote,    name: "Payments & payouts",  desc: "Card payments and artist splits",  href: "/product/payments" },
          { icon: UsersRound,  name: "Team & guest artists", desc: "Residents, guests and booth rent", href: "/product/team" },
          { icon: Droplet,     name: "Inventory",           desc: "Ink, needles and EU REACH",        href: "/product/inventory" },
          { icon: ChartColumn, name: "Reports",             desc: "Revenue, rebookings and busy days", href: "/product/analytics" },
        ],
      },
    ] satisfies NavColumn[],
    footer: {
      title: "One app for the whole shop",
      desc: "Bookings, forms, payouts and stock in one place. No more five tabs.",
      ctaLabel: "See all features",
      ctaHref: "/product",
    } satisfies NavFooter,
  },
  {
    label: "Who it's for",
    type: "mega",
    columns: [
      {
        title: "By studio size",
        items: [
          { icon: User,       name: "Solo artists",       desc: `Just you and one chair · ${planPrice("solo")}/mo`,       href: "/for/solo-artists" },
          { icon: Store,      name: "Small studios",      desc: `2–5 artists · ${planPrice("studio")}/mo`,                href: "/for/small-studios" },
          { icon: UsersRound, name: "Busy shops",         desc: `Up to 15 artists, plus guests · ${planPrice("pro")}/mo`, href: "/for/multi-chair" },
          { icon: Building2,  name: "Multiple locations", desc: `Every shop in one account · ${planPrice("enterprise")}/mo`, href: "/for/multi-location" },
        ],
      },
      {
        title: "Switching from",
        items: [
          { icon: ArrowLeftRight, name: "Vagaro",      desc: "Side by side, and how we move you", href: "/compare/vagaro" },
          { icon: ArrowLeftRight, name: "Square",      desc: "Side by side, and how we move you", href: "/compare/square" },
          { icon: ArrowLeftRight, name: "Fresha",      desc: "Side by side, and how we move you", href: "/compare/fresha" },
          { icon: ArrowLeftRight, name: "TattooGenda", desc: "Side by side, and how we move you", href: "/compare/tattoogenda" },
          { icon: Layers,         name: "See all comparisons", desc: "Limespun next to 7 other tools", href: "/compare" },
        ],
      },
    ] satisfies NavColumn[],
    footer: {
      title: "We move you over",
      desc: "Your clients, bookings and signed forms, moved by our team on every plan.",
      ctaLabel: "How switching works",
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
          { icon: BookOpen,   name: "Blog",            desc: "Guides for running a studio",                  href: "/blog" },
          { icon: Calculator, name: "Free tools",      desc: "Deposit and payout calculators, consent template", href: "/tools" },
          { icon: ArrowLeftRight, name: "Switching guide", desc: "Move over without losing a booking",       href: "/migrate" },
          { icon: Droplet,     name: "EU REACH hub",   desc: "What the ink rules mean for you",              href: "/reach-compliance" },
        ],
      },
      {
        title: "Limespun",
        items: [
          { icon: Sparkles,  name: "What's new", desc: "Latest updates to the app",        href: "/changelog", dot: true },
          { icon: Map,       name: "Roadmap",    desc: "What we're building next",          href: "/roadmap" },
          { icon: Heart,     name: "About",      desc: "Who's behind Limespun",             href: "/about" },
          { icon: ShieldCheck, name: "Security",   desc: "How we protect your studio's data", href: "/legal/security" },
        ],
      },
      {
        title: "Get help",
        items: [
          { icon: LifeBuoy, name: "Book a demo", desc: "A 30-minute walkthrough", href: "/book-a-demo" },
          { icon: Mail,     name: "Contact",     desc: "Talk to a real person",   href: "/contact" },
        ],
      },
    ] satisfies NavColumn[],
    footer: {
      title: "What do no-shows cost you?",
      desc: "Put in your prices and see how much deposits would save each month. Free, no sign-up.",
      ctaLabel: "Try the calculator",
      ctaHref: "/tools/deposit-calculator",
    } satisfies NavFooter,
  },
];

// ─── Mega menu grid column counts ────────────────────────────────────────────

function megaGridCols(label: string): number {
  if (label === "Product")      return 3;
  if (label === "Who it's for") return 2;
  if (label === "Resources")    return 3;
  return 1;
}

/** DOM id for a menu panel: "Who it's for" → "mega-who-its-for". */
function megaId(label: string): string {
  return `mega-${label.toLowerCase().replace(/'/g, "").replace(/[^a-z0-9]+/g, "-")}`;
}

// ─── NavColumnItem component ──────────────────────────────────────────────────

/** Small ember dot flagging something new, e.g. a fresh changelog entry. */
function NewDot() {
  return (
    <span
      role="img"
      aria-label="New"
      style={{ width: 5, height: 5, borderRadius: 100, background: BRAND.rust, display: "inline-block", flexShrink: 0 } as React.CSSProperties}
    />
  );
}

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
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
        } as React.CSSProperties}>
          {item.name}
          {item.dot && <NewDot />}
        </span>
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
    // Outer layer hangs off the bar: same left/right edges, and its top padding is an
    // invisible bridge across the gap so the pointer can travel down without closing it.
    <div
      id={megaId(item.label)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        paddingTop: 10,
        zIndex: 1000,
      } as React.CSSProperties}
    >
    <div
      role="region"
      aria-label={`${item.label} menu`}
      style={{
        background: BRAND.white,
        border: `1px solid ${BRAND.border}`,
        borderRadius: 20,
        boxShadow: "0 24px 60px -16px rgba(29,30,28,0.20), 0 4px 16px -4px rgba(29,30,28,0.06)",
        overflow: "hidden",
        maxHeight: "calc(100vh - 110px)",
        overflowY: "auto",
      } as React.CSSProperties}
    >
      {/* Columns */}
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gap: 0,
        padding: "22px 22px 0",
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
                    {it.dot && <NewDot />}
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
    closeTimer.current = setTimeout(() => setActiveMenu(null), 180);
  };

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!activeMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveMenu(null);
    };
    const onDown = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setActiveMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [activeMenu]);

  const activeItem = navItems.find((n) => n.type === "mega" && n.label === activeMenu) ?? null;

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
      <div ref={wrapperRef} style={wrapperStyle}>
        <div style={barStyle}>
          {/* Logo */}
          <Link href="/" aria-label="Limespun home" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 } as React.CSSProperties}>
            <LimespunMark size={30} />
            <span className="max-[480px]:!text-[18px]" style={{
              fontFamily: FONT.sans,
              fontSize: 21,
              fontWeight: 700,
              lineHeight: 1,
              color: BRAND.onyx,
              letterSpacing: "-0.03em",
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
                    aria-controls={megaId(item.label)}
                    onClick={() => setActiveMenu((cur) => (cur === item.label ? null : item.label))}
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

                </div>
              );
            })}
          </nav>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 } as React.CSSProperties}>
            <a
              href={ACCOUNT.signInHref}
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
              {ACCOUNT.signInLabel}
            </a>
            <a
              href={ACCOUNT.signUpHref}
              className="max-[480px]:!min-h-10 max-[480px]:!px-3.5 max-[480px]:!text-[14px]"
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
              {ACCOUNT.signUpLabel}<span className="limespun-nav-secondary" aria-hidden="true">&nbsp;&nbsp;→</span>
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

        {/* Desktop mega menu — one panel, aligned to the bar's edges */}
        {activeItem && (
          <div className="limespun-nav-desktop">
            <MegaPanel
              item={activeItem}
              onMouseEnter={() => handleEnter(activeItem.label)}
              onMouseLeave={handleLeave}
            />
          </div>
        )}

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
                href={ACCOUNT.signInHref}
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
                {ACCOUNT.signInLabel}
              </a>
              <a
                href={ACCOUNT.signUpHref}
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
                {ACCOUNT.signUpLabel}
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
