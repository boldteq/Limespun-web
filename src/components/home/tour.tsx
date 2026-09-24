"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  CalendarCheck,
  CalendarDays,
  CalendarPlus,
  Check,
  FileSignature,
  HandCoins,
  Layers,
  PenLine,
  Users,
  Wallet,
} from "lucide-react";
import { Display, StripedFrame, Toast } from "./ui";
import {
  CalendarPanel,
  ClientsPanel,
  ConsentPanel,
  DepositsPanel,
  PayoutsPanel,
  SleevePanel,
} from "./tour-panels";

type Icon = React.ComponentType<{ size?: number; strokeWidth?: number; "aria-hidden"?: boolean }>;

interface Tab {
  id: string;
  label: string;
  icon: Icon;
  title: string;
  points: { name: string; text: string }[];
  /** What the app confirms in this view. Tone by event: paid = success, flag = allergy or warning, ember = neutral info. */
  toast: { icon: Icon; title: string; body: string; tone: "ember" | "flag" | "paid" };
  panel: React.ReactNode;
}

const tabs: Tab[] = [
  {
    id: "calendar",
    label: "Calendar",
    icon: CalendarDays,
    title: "A calendar that knows a session from a consult",
    points: [
      { name: "Every chair", text: "Artists side by side, with long sessions blocked properly." },
      { name: "Guest spots", text: "On Pro, guests get their own dates, booking link and split." },
      { name: "Flags on the day", text: "Allergies and unpaid deposits show on the booking." },
    ],
    toast: { icon: CalendarCheck, title: "No clashes today", body: "Dev, Mara and Rio · Thu Oct 8", tone: "ember" },
    panel: <CalendarPanel />,
  },
  {
    id: "sleeves",
    label: "Projects",
    icon: Layers,
    title: "Multi-session work, tracked as one piece",
    points: [
      { name: "One project", text: "Every session, photo and note lives under the piece." },
      { name: "Next session", text: "Book the next session before the client leaves the chair." },
      { name: "Deposit carried", text: "The deposit follows the project from session to session." },
    ],
    toast: { icon: CalendarPlus, title: "Session 5 booked · Sat Nov 7", body: "11:00 with Dev · $240 still held", tone: "paid" },
    panel: <SleevePanel />,
  },
  {
    id: "deposits",
    label: "Deposits",
    icon: HandCoins,
    title: "Deposits that protect your time",
    points: [
      { name: "Taken at booking", text: "No deposit, no slot. Clients pay when they book." },
      { name: "Your policy", text: "Late cancels and no-shows handled the way you set them." },
      { name: "Clear balances", text: "See what's held, what's applied and what's kept." },
    ],
    toast: { icon: HandCoins, title: "$150 deposit kept · Leo B.", body: "Late cancel, inside 48 hours", tone: "ember" },
    panel: <DepositsPanel />,
  },
  {
    id: "consent",
    label: "Consent",
    icon: FileSignature,
    title: "Consent forms signed before they sit down",
    points: [
      { name: "Any device", text: "Clients sign on their phone from a text link, or on a front-desk tablet." },
      { name: "Allergy aware", text: "Answers carry to the client file and the next booking." },
      { name: "Always on file", text: "Signed PDFs stored with the session, ready to export." },
    ],
    toast: { icon: PenLine, title: "Elena signed her consent form", body: "9:42 · on her phone", tone: "paid" },
    panel: <ConsentPanel />,
  },
  {
    id: "payouts",
    label: "Payouts",
    icon: Wallet,
    title: "Payday without the spreadsheet",
    points: [
      { name: "Any model", text: "Commission or booth rent per artist, plus guest splits on Pro." },
      { name: "Per session", text: "Every closed session counts toward the right artist." },
      { name: "One approval", text: "Check the week, approve, done." },
    ],
    toast: { icon: Check, title: "3 payouts approved", body: "$5,622 to Dev, Mara and Rio", tone: "paid" },
    panel: <PayoutsPanel />,
  },
  {
    id: "clients",
    label: "Clients",
    icon: Users,
    title: "Know the client before they walk in",
    points: [
      { name: "Health notes", text: "Allergies and skin notes pinned where artists see them." },
      { name: "Full history", text: "Every piece, session and photo in one timeline." },
      { name: "Preferences", text: "Favourite artist, style notes and aftercare replies." },
    ],
    toast: { icon: AlertTriangle, title: "Allergy pinned to Elena’s file", body: "Red ink · shows on her bookings", tone: "flag" },
    panel: <ClientsPanel />,
  },
];

/** Where a picked tab lands under the floating nav when it has to be scrolled into view. */
const NAV_CLEARANCE = 96;

/** Row placement that differs below lg (product view inline) and at lg (product view in its own column). */
function rows(base: string | number, lg: string | number): React.CSSProperties {
  return { "--row": String(base), "--row-lg": String(lg) } as React.CSSProperties;
}

export function Tour() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // Viewport top of the tab just picked, on phones and tablets only.
  const anchorTop = useRef<number | null>(null);
  const tab = tabs[active];
  const ToastIcon = tab.toast.icon;

  function select(i: number, moveFocus = false) {
    if (i === active) return;
    const el = tabRefs.current[i];
    const stacked = !window.matchMedia("(min-width: 64rem)").matches;
    anchorTop.current = stacked && el ? el.getBoundingClientRect().top : null;
    setActive(i);
    if (moveFocus) el?.focus({ preventScroll: stacked });
  }

  // Below lg the product view opens under the picked tab. Hold that tab where it was tapped
  // (the view closing above it would otherwise pull the page up), and if it sits low on
  // screen, bring it up under the nav so its product view is in sight.
  useLayoutEffect(() => {
    const from = anchorTop.current;
    const el = tabRefs.current[active];
    anchorTop.current = null;
    if (from === null || !el) return;
    window.scrollBy({ top: el.getBoundingClientRect().top - from, behavior: "instant" });
    if (from < NAV_CLEARANCE || from > window.innerHeight * 0.45) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollBy({ top: from - NAV_CLEARANCE, behavior: reduce ? "instant" : "smooth" });
    }
  }, [active]);

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, i: number) {
    const last = tabs.length - 1;
    const next =
      e.key === "ArrowDown" ? (i === last ? 0 : i + 1)
      : e.key === "ArrowUp" ? (i === 0 ? last : i - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    select(next, true);
  }

  // Grid rows: 1 heading, then the tabs with the open tab's copy right after it and, below lg,
  // its product view after that. Tabs past the open one shift down by those extra rows.
  const tabRow = (i: number, extra: number) => (i <= active ? i + 2 : i + 2 + extra);

  return (
    <section className="bg-canvas py-24 sm:py-28">
      <div className="mx-auto grid max-w-[1280px] grid-cols-[minmax(0,1fr)] grid-rows-[repeat(9,auto)] gap-y-1.5 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] lg:grid-rows-[repeat(8,auto)_1fr] lg:gap-x-16">
        <Display className="col-start-1 row-start-1 mb-[34px]">Built for how tattooing works</Display>

        <div
          role="tablist"
          aria-label="Product areas"
          aria-orientation="vertical"
          className="col-start-1 grid min-w-0 grid-cols-1 grid-rows-subgrid [grid-row:2/-1]"
        >
          {tabs.map((t, i) => {
            const Icon = t.icon;
            const selected = i === active;
            const span = selected ? 2 : 1;
            // Rows inside the tablist count from its own first row.
            const r = tabRow(i, 2) - 1;
            const rLg = tabRow(i, 1) - 1;
            return (
              <React.Fragment key={t.id}>
                <div
                  role="presentation"
                  className={`col-start-1 rounded-[18px] transition-[background-color,box-shadow] duration-300 [grid-row:var(--row)] lg:[grid-row:var(--row-lg)] ${
                    selected ? "bg-white shadow-[var(--shadow-lift)] ring-1 ring-graphite/5" : ""
                  }`}
                  style={rows(`${r} / span ${span}`, `${rLg} / span ${span}`)}
                />
                <button
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`tour-tab-${t.id}`}
                  aria-selected={selected}
                  aria-controls={`tour-panel-${t.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className="relative col-start-1 flex min-h-14 w-full items-center gap-3.5 rounded-[18px] px-4 text-left [grid-row:var(--row)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite lg:[grid-row:var(--row-lg)]"
                  style={rows(r, rLg)}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                      selected ? "bg-ember text-white" : "bg-canvas-deep text-graphite-soft"
                    }`}
                  >
                    <Icon size={17} strokeWidth={2} aria-hidden={true} />
                  </span>
                  <span className={`text-[16px] font-semibold ${selected ? "text-graphite" : "text-graphite-soft"}`}>
                    {t.label}
                  </span>
                </button>
              </React.Fragment>
            );
          })}
        </div>

        {tabs.map((t, i) => (
          <div
            key={t.id}
            role="tabpanel"
            id={`tour-panel-${t.id}`}
            aria-labelledby={`tour-tab-${t.id}`}
            hidden={i !== active}
            tabIndex={0}
            className="ls-panel-in relative col-start-1 -mt-1.5 rounded-b-[18px] px-4 pb-5 pl-[66px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite"
            style={{ gridRow: active + 3 }}
          >
            <h3 className="text-[20px] leading-snug font-medium tracking-[-0.01em] text-balance text-graphite">{t.title}</h3>
            <ul className="mt-2.5 flex flex-col gap-1.5">
              {t.points.map((p) => (
                <li key={p.name} className="text-[15px] leading-[1.5] text-mute">
                  <span className="font-semibold text-graphite-soft">{p.name}.</span> {p.text}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Product view: under the open tab's copy below lg, sticky in the right column from lg. */}
        <div
          aria-hidden="true"
          className="relative col-start-1 mt-2 mb-4 min-w-0 [grid-row:var(--row)] lg:sticky lg:top-32 lg:col-start-2 lg:m-0 lg:self-start lg:[grid-row:var(--row-lg)]"
          style={rows(active + 4, "1 / -1")}
        >
          <StripedFrame className="relative px-4 pt-12 pb-20 sm:px-12 sm:pt-16 sm:pb-24">
            <div key={`${tab.id}-panel`} className="ls-panel-in">
              {tab.panel}
            </div>
            <Toast
              key={`${tab.id}-toast`}
              tone={tab.toast.tone}
              icon={<ToastIcon size={16} strokeWidth={2.4} />}
              title={tab.toast.title}
              body={tab.toast.body}
              className="ls-panel-in absolute right-5 bottom-5 sm:right-8"
            />
          </StripedFrame>
        </div>
      </div>
    </section>
  );
}
