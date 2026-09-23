"use client";

import Link from "next/link";
import { useState, useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { LimespunMark } from "@/components/brand/limespun-mark";
import {
  CalendarDays, HandCoins, MessagesSquare, UserRound,
  FileSignature, Layers, Images, Wand2,
  Banknote, UsersRound, Droplet, ChartColumn,
  User, Store, Building2, ArrowLeftRight,
  BookOpen, Calculator, Map, ShieldCheck,
  LifeBuoy, Mail, Sparkles, Heart,
  ArrowRight, Menu, X, ChevronDown,
} from "lucide-react";
import { ACCOUNT, CTA } from "@/lib/brand";
import { PLANS, formatPrice, type PlanTier } from "@/lib/data/plans";
import { cn } from "@/lib/utils";
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
          { icon: UsersRound,  name: "Team & guest artists", desc: "Residents, booth rent, guests on Pro", href: "/product/team" },
          { icon: Droplet,     name: "Inventory",           desc: "Ink, needles and EU REACH",        href: "/product/inventory" },
          { icon: ChartColumn, name: "Reports",             desc: "Revenue, rebookings and busy days", href: "/product/analytics" },
        ],
      },
    ] satisfies NavColumn[],
    footer: {
      title: "One app for the whole shop",
      desc: "Bookings, forms, payouts and stock in one place. One login instead of seven apps.",
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
          { icon: LifeBuoy, name: "Book a demo", desc: "A 30-minute walkthrough", href: CTA.demoHref },
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

const MOBILE_MENU_ID = "mobile-menu";

/**
 * Hover opens and closes the mega menus for a mouse only. A tap on a touch screen
 * (iPad landscape gets the desktop nav) also fires emulated mouse events, which would
 * open the menu just before the click toggles it shut; taps go through onClick instead.
 */
const isMouse = (e: ReactPointerEvent): boolean => e.pointerType === "mouse";

/** Keyboard focus ring used across the site: graphite, never the browser's blue. */
const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite";

/** Column heading inside a menu: small caps label in mute. */
const COL_LABEL = "text-[12px] font-semibold uppercase tracking-[0.08em] text-mute";

// ─── NavColumnItem component ──────────────────────────────────────────────────

/** Small ember dot flagging something new, e.g. a fresh changelog entry. */
function NewDot() {
  return <span role="img" aria-label="New" className="inline-block size-[5px] shrink-0 rounded-full bg-ember" />;
}

function MegaItem({ item }: { item: NavColumnItem }) {
  const Icon = item.icon;

  return (
    <a
      href={item.href}
      className={cn("group flex items-start gap-2.5 rounded-lg px-2.5 py-2 transition-colors duration-150 hover:bg-canvas", FOCUS)}
    >
      <span className="flex size-[30px] shrink-0 items-center justify-center rounded-md bg-canvas-deep transition-colors duration-150 group-hover:bg-ember-soft group-focus-visible:bg-ember-soft">
        <Icon size={15} strokeWidth={1.6} className="text-graphite-soft transition-colors duration-150 group-hover:text-ember group-focus-visible:text-ember" />
      </span>
      <span className="flex flex-col gap-px">
        <span className="inline-flex items-center gap-1.5 text-[14px] font-medium leading-[1.3] text-graphite">
          {item.name}
          {item.dot && <NewDot />}
        </span>
        <span className="text-[13px] leading-[1.4] text-mute">{item.desc}</span>
      </span>
    </a>
  );
}

// ─── Mega menu panel ──────────────────────────────────────────────────────────

interface MegaPanelProps {
  item: NavItem;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

function MegaPanel({ item, onHoverStart, onHoverEnd }: MegaPanelProps) {
  const cols = megaGridCols(item.label);

  return (
    // Outer layer hangs off the bar: same left/right edges, and its top padding is an
    // invisible bridge across the gap so the pointer can travel down without closing it.
    <div
      id={megaId(item.label)}
      onPointerEnter={(e) => isMouse(e) && onHoverStart()}
      onPointerLeave={(e) => isMouse(e) && onHoverEnd()}
      className="absolute inset-x-0 top-full z-[1000] pt-2.5"
    >
      <div
        role="region"
        aria-label={`${item.label} menu`}
        className="max-h-[calc(100vh-110px)] overflow-y-auto overflow-x-hidden rounded-[20px] border border-hair bg-white shadow-[0_24px_60px_-16px_rgba(29,30,28,0.20),0_4px_16px_-4px_rgba(29,30,28,0.06)]"
      >
        {/* Columns */}
        <div className="grid px-[22px] pt-[22px]" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {item.columns?.map((col) => (
            <div key={col.title} className="px-3 pb-5">
              <div className={cn(COL_LABEL, "mb-2 pl-2.5")}>{col.title}</div>
              {col.items.map((it) => (
                <MegaItem key={it.name} item={it} />
              ))}
            </div>
          ))}
        </div>

        {/* Footer band */}
        {item.footer && (
          <div className="flex items-center justify-between gap-6 border-t border-hair bg-canvas px-8 py-4">
            <div>
              <div className="mb-0.5 text-[15px] font-semibold leading-snug text-graphite">{item.footer.title}</div>
              <div className="text-[13px] leading-normal text-mute">{item.footer.desc}</div>
            </div>
            <a
              href={item.footer.ctaHref}
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-graphite px-5 text-[13px] font-semibold text-white transition-colors duration-150 hover:bg-graphite-soft",
                FOCUS,
              )}
            >
              {item.footer.ctaLabel}
              <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
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

/** Top-level row in the mobile menu: 16px, full width, at least 52px tall. */
const MOBILE_ROW = "flex min-h-[52px] w-full items-center py-3.5 text-[16px] font-medium text-graphite";

function MobileNavItem({ item, expanded, onToggle }: MobileNavItemProps) {
  if (item.type === "link") {
    return (
      <a href={item.href} className={cn(MOBILE_ROW, "gap-2 border-b border-hair", FOCUS)}>
        {item.label}
        {item.dot && <NewDot />}
      </a>
    );
  }

  const panelId = `${megaId(item.label)}-mobile`;

  return (
    <div className="border-b border-hair">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={panelId}
        className={cn(MOBILE_ROW, "cursor-pointer justify-between bg-transparent text-left", FOCUS)}
      >
        {item.label}
        <ChevronDown
          size={16}
          strokeWidth={2}
          aria-hidden="true"
          className={cn("text-mute transition-transform duration-200", expanded && "rotate-180")}
        />
      </button>
      {expanded && (
        <div id={panelId} className="pb-3">
          {item.columns?.map((col) => (
            <div key={col.title} className="mb-4">
              <div className={cn(COL_LABEL, "mb-1 pl-1")}>{col.title}</div>
              {col.items.map((it) => {
                const Icon = it.icon;
                return (
                  <a
                    key={it.name}
                    href={it.href}
                    className={cn("flex min-h-11 items-center gap-2.5 rounded-lg px-1 py-2.5", FOCUS)}
                  >
                    <Icon size={15} strokeWidth={1.6} className="shrink-0 text-mute" />
                    <span className="text-[15px] text-graphite">{it.name}</span>
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
  const burgerRef = useRef<HTMLButtonElement | null>(null);

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

  const closeMobile = () => {
    setOpen(false);
    setMobileExpanded(null);
  };

  // While the mobile menu is open: the page behind can't scroll, Escape closes it
  // (focus goes back to the burger), and growing to the desktop nav closes it.
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setMobileExpanded(null);
      burgerRef.current?.focus();
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  const activeItem = navItems.find((n) => n.type === "mega" && n.label === activeMenu) ?? null;

  const toggleMobile = (label: string) => {
    setMobileExpanded((prev) => (prev === label ? null : label));
  };

  return (
    <>
      {/* Mobile scrim: dims the page behind the open menu; a tap closes it */}
      {open && (
        <div
          aria-hidden="true"
          onClick={closeMobile}
          className="limespun-nav-mobile fixed inset-0 z-[899] hidden bg-graphite/20"
        />
      )}

      {/* Always a floating white bar; only the shadow deepens once the page scrolls */}
      <div ref={wrapperRef} className="fixed inset-x-3.5 top-3.5 z-[900] mx-auto max-w-[1296px] max-sm:top-2.5">
        <div
          className={cn(
            "flex h-16 items-center justify-between rounded-[20px] border bg-white pl-5 pr-2.5 transition-[box-shadow,border-color] duration-[250ms] ease-out max-sm:h-14 max-[400px]:pl-3.5 max-[400px]:pr-2",
            scrolled
              ? "border-hair shadow-[0_10px_30px_-12px_rgba(29,30,28,0.18),0_2px_6px_-2px_rgba(29,30,28,0.08)]"
              : "border-hair/60 shadow-[0_4px_18px_-10px_rgba(29,30,28,0.14)]",
          )}
        >
          {/* Logo — the wordmark drops below 360px so the bar never overflows; 44px tall to tap */}
          <Link href="/" aria-label="Limespun home" className={cn("flex min-h-11 items-center gap-2.5 rounded-lg max-[400px]:gap-2", FOCUS)}>
            <LimespunMark size={30} />
            <span className="text-[21px] font-bold leading-none tracking-[-0.03em] text-graphite max-[480px]:text-[18px] max-[359px]:hidden">
              Limespun
            </span>
          </Link>

          {/* Desktop nav items — 44px tall so iPad-landscape taps land */}
          <nav aria-label="Primary" className="limespun-nav-desktop relative flex items-center gap-0.5">
            {navItems.map((item) => {
              if (item.type === "link") {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "inline-flex min-h-11 items-center gap-[5px] whitespace-nowrap rounded-lg px-3 py-1.5 text-[14px] font-[450] text-graphite transition-colors duration-[120ms] hover:bg-canvas-deep",
                      FOCUS,
                    )}
                  >
                    {item.label}
                    {item.dot && <NewDot />}
                  </a>
                );
              }

              // Mega menu trigger
              const isActive = activeMenu === item.label;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onPointerEnter={(e) => isMouse(e) && handleEnter(item.label)}
                  onPointerLeave={(e) => isMouse(e) && handleLeave()}
                >
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={isActive}
                    aria-controls={megaId(item.label)}
                    onClick={() => setActiveMenu((cur) => (cur === item.label ? null : item.label))}
                    className={cn(
                      "inline-flex min-h-11 cursor-pointer items-center gap-1 whitespace-nowrap rounded-lg px-3 py-1.5 text-[14px] font-[450] text-graphite transition-colors duration-[120ms]",
                      isActive ? "bg-canvas-deep" : "bg-transparent",
                      FOCUS,
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      size={13}
                      strokeWidth={2}
                      aria-hidden="true"
                      className={cn("text-mute transition-transform duration-200", isActive && "rotate-180")}
                    />
                  </button>
                </div>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 max-[400px]:gap-1.5">
            <a
              href={ACCOUNT.signInHref}
              className={cn(
                "limespun-nav-secondary inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-3.5 text-[15px] font-semibold text-graphite transition-colors duration-150 hover:bg-canvas-deep",
                FOCUS,
              )}
            >
              {ACCOUNT.signInLabel}
            </a>
            <a
              href={ACCOUNT.signUpHref}
              className={cn(
                "inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full bg-graphite px-[18px] text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-graphite-soft max-[480px]:px-3.5 max-[480px]:text-[14px] max-[400px]:px-3",
                FOCUS,
              )}
            >
              {ACCOUNT.signUpLabel}
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" className="limespun-nav-secondary" />
            </a>

            {/* Mobile burger */}
            <button
              ref={burgerRef}
              type="button"
              onClick={() => (open ? closeMobile() : setOpen(true))}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls={MOBILE_MENU_ID}
              className={cn(
                "limespun-nav-burger hidden size-11 cursor-pointer items-center justify-center rounded-[10px] bg-canvas-deep text-graphite",
                FOCUS,
              )}
            >
              {open ? <X size={18} strokeWidth={2} aria-hidden="true" /> : <Menu size={18} strokeWidth={2} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Desktop mega menu — one panel, aligned to the bar's edges */}
        {activeItem && (
          <div className="limespun-nav-desktop">
            <MegaPanel
              item={activeItem}
              onHoverStart={() => handleEnter(activeItem.label)}
              onHoverEnd={handleLeave}
            />
          </div>
        )}

        {/* Mobile drawer — shown via CSS below 1024px; scrolls inside the viewport */}
        {open && (
          <div
            id={MOBILE_MENU_ID}
            className="limespun-nav-mobile mt-2 hidden max-h-[calc(100dvh-96px)] overflow-y-auto overscroll-contain rounded-2xl border border-hair bg-white px-6 pb-5 pt-2 shadow-[0_12px_32px_-8px_rgba(29,30,28,0.14)] max-[400px]:px-5"
          >
            <nav aria-label="Mobile">
              {navItems.map((item) => (
                <MobileNavItem
                  key={item.label}
                  item={item}
                  expanded={mobileExpanded === item.label}
                  onToggle={() => toggleMobile(item.label)}
                />
              ))}
            </nav>
            <div className="mt-5 flex flex-col gap-2.5">
              <a
                href={CTA.primaryHref}
                className={cn(
                  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-graphite px-6 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-graphite-soft",
                  FOCUS,
                )}
              >
                {CTA.primaryLabel}
                <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
              </a>
              <a
                href={CTA.demoHref}
                className={cn(
                  "inline-flex min-h-12 items-center justify-center rounded-full border border-graphite/80 px-6 text-[15px] font-semibold text-graphite transition-colors duration-200 hover:bg-canvas",
                  FOCUS,
                )}
              >
                {CTA.demoLabel}
              </a>
            </div>
            <p className="mt-2 flex flex-wrap items-center justify-center gap-x-1.5 text-[14px] text-mute">
              Already have an account?
              <a
                href={ACCOUNT.signInHref}
                className={cn("inline-flex min-h-11 items-center rounded-md px-1 font-semibold text-graphite underline decoration-hair-strong underline-offset-4 hover:decoration-graphite", FOCUS)}
              >
                {ACCOUNT.signInLabel}
              </a>
            </p>
          </div>
        )}
      </div>

      {/* Spacer so content doesn't sit under the fixed nav */}
      <div className="h-[92px] max-sm:h-20" aria-hidden="true" />
    </>
  );
}
