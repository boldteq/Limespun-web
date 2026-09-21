"use client";

import React, { useState } from "react";
import { CalendarDays, FileSignature, Layers, Users, Wallet, HandCoins, Check } from "lucide-react";
import { Display, StripedFrame, Toast } from "./ui";
import {
  CalendarPanel,
  ClientsPanel,
  ConsentPanel,
  DepositsPanel,
  PayoutsPanel,
  SleevePanel,
} from "./tour-panels";

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; "aria-hidden"?: boolean }>;
  title: string;
  points: { name: string; text: string }[];
  action: string;
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
      { name: "Guest spots", text: "Give guests their own dates, booking link and split." },
      { name: "Flags on the day", text: "Allergies and unpaid deposits show on the booking." },
    ],
    action: "Oct 9 booked for Asha",
    panel: <CalendarPanel />,
  },
  {
    id: "sleeves",
    label: "Sleeves",
    icon: Layers,
    title: "Multi-session work, tracked as one piece",
    points: [
      { name: "One project", text: "Every session, photo and note lives under the piece." },
      { name: "Next session", text: "Book the next sitting before the client leaves the chair." },
      { name: "Deposit carried", text: "The deposit follows the project from session to session." },
    ],
    action: "Session 5 booked · Oct 9",
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
    action: "$150 deposit kept · Leo B.",
    panel: <DepositsPanel />,
  },
  {
    id: "consent",
    label: "Consent",
    icon: FileSignature,
    title: "Consent forms signed before they sit down",
    points: [
      { name: "Any device", text: "Clients sign from a text link or the front-desk iPad." },
      { name: "Allergy aware", text: "Answers carry to the client file and the next booking." },
      { name: "Always on file", text: "Signed PDFs stored with the session, ready to export." },
    ],
    action: "Form sent to Elena",
    panel: <ConsentPanel />,
  },
  {
    id: "payouts",
    label: "Payouts",
    icon: Wallet,
    title: "Payday without the spreadsheet",
    points: [
      { name: "Any model", text: "Commission, booth rent or guest split, per artist." },
      { name: "Per session", text: "Every closed session counts toward the right artist." },
      { name: "One approval", text: "Check the week, approve, done." },
    ],
    action: "3 payouts approved",
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
    action: "Allergy pinned to Elena\u2019s file",
    panel: <ClientsPanel />,
  },
];

export function Tour() {
  const [active, setActive] = useState(tabs[0].id);
  const tab = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <section className="bg-canvas py-24 sm:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] lg:gap-16">
        <div>
          <Display className="sm:text-[48px]">Built for how tattooing actually works</Display>
          <div role="tablist" aria-label="Product areas" aria-orientation="vertical" className="mt-10 flex flex-col gap-1.5">
            {tabs.map((t) => {
              const Icon = t.icon;
              const selected = t.id === active;
              return (
                <div
                  key={t.id}
                  className={`rounded-[18px] transition-[background-color,box-shadow] duration-300 ${
                    selected ? "bg-white shadow-[var(--shadow-lift)] ring-1 ring-graphite/5" : ""
                  }`}
                >
                  <button
                    role="tab"
                    id={`tab-${t.id}`}
                    aria-selected={selected}
                    aria-controls={`panel-${t.id}`}
                    onClick={() => setActive(t.id)}
                    className="flex min-h-14 w-full items-center gap-3.5 rounded-[18px] px-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite"
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                        selected ? "bg-ember text-white" : "bg-canvas-deep text-graphite-soft"
                      }`}
                    >
                      <Icon size={17} strokeWidth={2} aria-hidden={true} />
                    </span>
                    <span className={`text-[17px] font-semibold ${selected ? "text-graphite" : "text-graphite-soft"}`}>
                      {t.label}
                    </span>
                  </button>
                  {selected && (
                    <div className="ls-panel-in px-4 pb-5 pl-[66px]">
                      <p className="text-[16px] font-medium text-graphite">{t.title}</p>
                      <ul className="mt-2 flex flex-col gap-1.5">
                        {t.points.map((p) => (
                          <li key={p.name} className="text-[15px] leading-[1.5] text-mute">
                            <span className="font-semibold text-graphite-soft">{p.name}.</span> {p.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          className="lg:sticky lg:top-32 lg:self-start"
        >
          <StripedFrame className="relative px-4 pt-12 pb-20 sm:px-12 sm:pt-16 sm:pb-24">
            <div key={`${tab.id}-panel`} className="ls-panel-in" aria-hidden="true">
              {tab.panel}
            </div>
            <Toast
              key={`${tab.id}-toast`}
              tone="paid"
              icon={<Check size={16} strokeWidth={2.6} />}
              title={tab.action}
              body="Just now"
              className="ls-panel-in absolute right-5 bottom-5 sm:right-8"
            />
          </StripedFrame>
        </div>
      </div>
    </section>
  );
}
