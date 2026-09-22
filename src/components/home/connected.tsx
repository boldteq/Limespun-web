import React from "react";
import { AlertTriangle, ArrowRight, Check } from "lucide-react";
import { LimespunMark } from "@/components/brand/limespun-mark";
import { Chip, Display, Toast } from "./ui";

/* Bento grid: each tile carries its own copy, with the product moment underneath. */
function Tile({
  title,
  body,
  children,
  className = "",
  visualClass = "h-[230px]",
}: {
  title: string;
  body: string;
  children: React.ReactNode;
  className?: string;
  visualClass?: string;
}) {
  return (
    <article className={`flex flex-col overflow-hidden rounded-[24px] bg-canvas ${className}`}>
      <div className="px-7 pt-7 sm:px-8 sm:pt-8">
        <h3 className="text-[24px] leading-[1.25] font-medium tracking-[-0.01em] text-graphite">{title}</h3>
        <p className="mt-2 max-w-[440px] text-[16px] leading-[1.55] text-mute">{body}</p>
      </div>
      <div aria-hidden="true" className={`relative mt-6 shrink-0 grow ${visualClass}`}>
        {children}
      </div>
    </article>
  );
}

function AllergyVisual() {
  return (
    <div className="absolute inset-x-7 inset-y-0 flex flex-col justify-center gap-4 pb-6 sm:inset-x-8">
      <div className="rounded-[14px] bg-white p-4 shadow-[var(--shadow-lift)]">
        <p className="pb-2 text-[12px] font-medium text-mute">Thursday · Dev</p>
        {[
          ["10:00", "Asha M. · Koi sleeve", false],
          ["11:30", "Jo K. · Consult", false],
          ["1:30", "Elena R. · Back piece", true],
          ["3:00", "Priya S. · Fine-line florals", false],
          ["4:30", "Sam T. · Touch-up", false],
          ["5:30", "Walk-in · flash", false],
        ].map(([t, w, flag]) => (
          <div
            key={String(t)}
            className={`flex items-center gap-3 border-t border-hair py-2.5 text-[13px] ${flag ? "-mx-2 rounded-[8px] border-transparent bg-flag-soft px-2" : ""}`}
          >
            <span className="w-10 font-semibold text-graphite tabular-nums">{t}</span>
            <span className="flex-1 text-graphite-soft">{w}</span>
            {flag && <Chip tone="flag">Allergy</Chip>}
          </div>
        ))}
      </div>
      <div className="ml-6 flex items-start gap-2.5 rounded-[12px] bg-flag px-4 py-3 text-white shadow-[var(--shadow-lift)]">
        <AlertTriangle size={16} strokeWidth={2.4} className="mt-0.5 shrink-0" />
        <span className="text-[13px] leading-snug">
          <span className="block font-semibold">Red pigment allergy · 1:30</span>
          <span className="text-white/90">Noted at her June consult. Patch test booked with Dev.</span>
        </span>
      </div>
    </div>
  );
}

function PolicyVisual() {
  return (
    <>
      <div className="absolute top-0 right-0 left-8 rounded-tl-[14px] bg-white p-4 shadow-[var(--shadow-lift)]">
        <p className="text-[12px] font-medium text-mute">Cancellation policy</p>
        <div className="mt-3 flex items-center justify-between border-t border-hair pt-3 text-[14px]">
          <span className="text-graphite">Cancel within</span>
          <span className="rounded-[8px] border border-hair-strong px-2 py-1 font-semibold text-graphite tabular-nums">48 hours</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-[14px]">
          <span className="text-graphite">Deposit</span>
          <span className="font-semibold text-graphite">Kept by studio</span>
        </div>
      </div>
      <Toast
        icon={<Check size={15} strokeWidth={2.6} />}
        title="Applied to 38 upcoming bookings"
        className="absolute bottom-5 left-8"
      />
    </>
  );
}

function GuestVisual() {
  return (
    <div className="absolute right-0 bottom-0 left-8 rounded-tl-[14px] bg-white p-4 shadow-[var(--shadow-lift)]">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[12px] font-medium text-mute">Guest spots</span>
        <Chip tone="quiet">Oct – Nov</Chip>
      </div>
      <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-2.5 text-[12px]">
        <span className="font-semibold text-graphite">Rio V.</span>
        <span className="text-graphite-soft tabular-nums">Oct 2–9</span>
        <Chip tone="ember">70 / 30</Chip>
        <span className="font-semibold text-graphite">Noor A.</span>
        <span className="text-graphite-soft tabular-nums">Nov 14–20</span>
        <Chip tone="quiet">65 / 35</Chip>
      </div>
    </div>
  );
}

const tools = ["Vagaro", "Fresha", "Square Appointments", "DaySmart", "TattooGenda", "Spreadsheets"];

function MigrationVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-5 px-6 sm:gap-10">
      <ul className="grid grid-cols-2 gap-2">
        {tools.map((t) => (
          <li
            key={t}
            className="rounded-full bg-white px-4 py-1.5 text-center text-[13px] font-semibold text-graphite shadow-[0_1px_2px_rgba(29,30,28,0.06)] ring-1 ring-graphite/5"
          >
            {t}
          </li>
        ))}
      </ul>
      <ArrowRight size={28} strokeWidth={1.8} className="shrink-0 text-ember" />
      <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[26px] bg-white shadow-[var(--shadow-warm)]">
        <LimespunMark size={48} />
      </span>
    </div>
  );
}

function InboxVisual() {
  return (
    <div className="absolute inset-x-6 top-0 flex flex-col gap-2.5">
      <div className="max-w-[88%] self-start rounded-[16px] rounded-bl-[4px] bg-white px-4 py-2.5 text-[13px] text-graphite shadow-[0_1px_2px_rgba(29,30,28,0.06)]">
        Any chance of a Saturday for the rest of my sleeve?
        <span className="mt-1 block text-[11px] text-mute">Instagram · Asha M.</span>
      </div>
      <div className="max-w-[88%] self-end rounded-[16px] rounded-br-[4px] bg-graphite px-4 py-2.5 text-[13px] text-white">
        Dev has Oct 9 at 11. Your $240 deposit is already on the project.
      </div>
    </div>
  );
}

export function Connected() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
          <Display className="max-w-[720px]">The details salon software never thought about</Display>
          <p className="max-w-[420px] text-[18px] leading-[1.6] text-mute lg:justify-self-end">
            Small things that decide whether a day at the shop runs on time, and whether you keep the money you&apos;re
            owed.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-6">
          <Tile
            className="md:col-span-3 md:row-span-2"
            visualClass="min-h-[340px]"
            title="Allergy and skin flags"
            body="What a client tells you once shows up on every booking after, before the needle comes out."
          >
            <AllergyVisual />
          </Tile>
          <Tile
            className="md:col-span-3"
            title="No-show protection"
            body="Set your deposit and cancellation rules once. Limespun applies them to every booking."
          >
            <PolicyVisual />
          </Tile>
          <Tile
            className="md:col-span-3"
            visualClass="h-[130px] md:h-[150px]"
            title="Guest artists, handled"
            body="Their own dates, booking link and split, paid out with everyone else."
          >
            <GuestVisual />
          </Tile>
          <Tile
            className="md:col-span-4"
            title="We move you over"
            body="Clients, upcoming bookings, deposits and consent forms come across with you. Our team does the move on every plan."
          >
            <MigrationVisual />
          </Tile>
          <Tile
            className="md:col-span-2"
            title="One inbox"
            body="DMs, texts and email next to the booking they're about."
          >
            <InboxVisual />
          </Tile>
        </div>
      </div>
    </section>
  );
}
