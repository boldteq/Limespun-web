import React from "react";
import { AlertTriangle, ArrowDown, Check } from "lucide-react";
import { LimespunMark } from "@/components/brand/limespun-mark";
import { Chip, Display, SampleTag, Toast } from "./ui";

/*
 * Bento grid. One placement rule for every tile: the product moment starts 24px under the copy (mt-6)
 * and is top-anchored. App panels line up with the copy and run off the right and bottom edges, so a
 * tile stretched by its row grows the panel instead of leaving empty space.
 */
function Tile({
  title,
  body,
  badge,
  children,
  className = "",
  bodyClass = "",
}: {
  title: string;
  body: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClass?: string;
}) {
  return (
    <article className={`flex flex-col overflow-hidden rounded-[24px] bg-canvas ${className}`}>
      <div className="px-7 pt-7 sm:px-8 sm:pt-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <h3 className="text-[24px] leading-[1.25] font-medium tracking-[-0.01em] text-balance text-graphite">{title}</h3>
          {badge}
        </div>
        <p className={`mt-2 max-w-[440px] text-[16px] leading-[1.55] text-pretty text-mute ${bodyClass}`}>{body}</p>
      </div>
      <div aria-hidden="true" className="mt-6 flex grow flex-col">
        {children}
      </div>
    </article>
  );
}

/* A slice of the app: starts at the copy's left edge, runs off the right and bottom of the tile. */
function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="ml-7 flex grow flex-col rounded-tl-[14px] bg-white p-4 pb-6 shadow-[var(--shadow-lift)] sm:ml-8">
      {children}
    </div>
  );
}

/* Toasts float half off the panel's left edge, the way the app's notifications sit over the page. */
const panelToast = "-ml-7 self-start sm:-ml-8";

/* Canonical sample studio, Thu Oct 8: every booked chair, nobody double-booked. */
const chairs: { time: string; who: string; what: string; flagged?: boolean }[] = [
  { time: "10:00", who: "Asha M. · Dev", what: "Koi sleeve · session 4 of 5" },
  { time: "11:00", who: "Jo K. · Mara", what: "Consult · fine-line florals" },
  { time: "12:00", who: "Walk-in flash · Rio", what: "Guest day · 3 slots" },
  { time: "1:00", who: "Priya S. · Mara", what: "Fine-line florals" },
  { time: "1:30", who: "Elena R. · Dev", what: "Back piece · session 2 of 3", flagged: true },
  { time: "4:30", who: "Sam T. · Mara", what: "Touch-up · forearm script" },
];

function AllergyVisual() {
  return (
    <Panel>
      {/* Label never breaks mid-phrase; on the narrowest phones the tag drops under it instead. */}
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 pb-2">
        <p className="text-[12px] font-medium whitespace-nowrap text-mute">Thursday · all chairs</p>
        <SampleTag />
      </div>
      {chairs.map((c) => (
        <div
          key={c.time}
          className={`grid grid-cols-[40px_minmax(0,1fr)] gap-x-3 border-t border-hair py-2.5 ${c.flagged ? "-mx-2 rounded-[8px] border-transparent bg-flag-soft px-2" : ""}`}
        >
          <span className="text-[13px] leading-[1.4] font-semibold text-graphite tabular-nums">{c.time}</span>
          <span>
            <span className="flex items-center justify-between gap-2">
              <span className="text-[13px] leading-[1.4] font-medium text-graphite">{c.who}</span>
              {c.flagged && <Chip tone="flag" className="bg-white">Allergy</Chip>}
            </span>
            <span className="block text-[12px] leading-[1.4] text-mute">{c.what}</span>
          </span>
        </div>
      ))}
      <Toast
        tone="flag"
        icon={<AlertTriangle size={16} strokeWidth={2.2} />}
        title="Red ink allergy · 1:30"
        body="Reacted after session 1 in August. No red today; patch test booked before session 3."
        className={`mt-4 ${panelToast}`}
      />
    </Panel>
  );
}

function PolicyVisual() {
  return (
    <Panel>
      <p className="text-[12px] font-medium text-mute">Owen P. · New piece, calf</p>
      <div className="mt-3 flex items-center justify-between border-t border-hair pt-3 text-[14px]">
        <span className="text-graphite">Deposit</span>
        <span className="rounded-[8px] border border-hair-strong px-2 py-1 font-semibold text-graphite tabular-nums">$150</span>
      </div>
      <div className="mt-2 flex items-center justify-between text-[14px]">
        <span className="text-graphite">Booking</span>
        <span className="font-semibold text-graphite">Pending until paid</span>
      </div>
      <Toast
        icon={<Check size={15} strokeWidth={2.6} />}
        title="Deposit paid · Sat, Oct 10 confirmed"
        className={`mt-5 ${panelToast}`}
      />
    </Panel>
  );
}

function GuestVisual() {
  return (
    <Panel>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[12px] font-medium text-mute">Guest spots</span>
        <Chip tone="quiet">October</Chip>
      </div>
      {/* Canonical sample studio: Rio's guest spot and his walk-in flash day (Thu Oct 8). */}
      <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 gap-y-2.5 text-[12px]">
        <span className="font-semibold text-graphite">Rio</span>
        <span className="text-graphite-soft tabular-nums">Oct 2–9</span>
        <Chip tone="ember">70 / 30</Chip>
        <span className="font-semibold text-graphite">Walk-in flash</span>
        <span className="text-graphite-soft tabular-nums">Thu Oct 8</span>
        <Chip tone="quiet">3 slots</Chip>
      </div>
    </Panel>
  );
}

const tools = ["Vagaro", "Fresha", "Square", "DaySmart", "TattooGenda", "Spreadsheets"];

/*
 * Every tool funnels into Limespun. Chips never break or clip: they wrap as a centred cluster on phones,
 * sit in a 3 x 2 grid where one row won't fit (sm, 1024-1079) and in a single row where it will.
 */
function MigrationVisual() {
  return (
    <div className="flex flex-col items-center gap-3 px-7 pb-7 sm:px-8 sm:pb-8">
      <ul className="flex flex-wrap justify-center gap-2 sm:grid sm:grid-cols-[repeat(3,max-content)] md:flex lg:max-[1079px]:grid">
        {tools.map((t) => (
          <li
            key={t}
            className="rounded-full bg-white px-4 py-1.5 text-center text-[13px] font-semibold whitespace-nowrap text-graphite shadow-[0_1px_2px_rgba(29,30,28,0.06)] ring-1 ring-graphite/5"
          >
            {t}
          </li>
        ))}
      </ul>
      <ArrowDown size={24} strokeWidth={1.8} className="shrink-0 text-ember" />
      <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[20px] bg-white shadow-[var(--shadow-warm)] sm:h-20 sm:w-20 sm:rounded-[24px] [&>svg]:h-auto [&>svg]:w-8 sm:[&>svg]:w-10">
        <LimespunMark size={40} />
      </span>
    </div>
  );
}

function InboxVisual() {
  return (
    <div className="flex flex-col gap-2.5 px-7 pb-7 sm:px-8 sm:pb-8">
      <div className="max-w-[min(88%,360px)] self-start rounded-[16px] rounded-bl-[4px] bg-white px-4 py-2.5 text-[13px] text-graphite shadow-[0_1px_2px_rgba(29,30,28,0.06)]">
        Any chance of a Saturday for the rest of my sleeve?
        <span className="mt-1 block text-[11px] text-mute">SMS · Asha M.</span>
      </div>
      <div className="max-w-[min(88%,360px)] self-end rounded-[16px] rounded-br-[4px] bg-graphite px-4 py-2.5 text-[13px] text-white">
        Dev has Sat Nov 7 at 11. Your $240 deposit is already on the project.
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
            title="Allergy and skin flags"
            body="What a client tells you once shows up on every booking after, before the needle comes out."
          >
            <AllergyVisual />
          </Tile>
          <Tile
            className="md:col-span-3"
            title="No-show protection"
            body="A booking stays Pending until the client pays the deposit, so the chair is only held for people who have paid."
          >
            <PolicyVisual />
          </Tile>
          <Tile
            className="md:col-span-3"
            title="Guest artists, handled"
            badge={<Chip tone="quiet">Pro plan</Chip>}
            body="Their own dates, booking link and split, paid out with everyone else."
          >
            <GuestVisual />
          </Tile>
          <Tile
            className="md:col-span-6 lg:col-span-4"
            bodyClass="md:max-w-[560px]"
            title="We move you over"
            body="Clients, upcoming bookings, deposits and consent forms come across with you. Our team does the move on every plan."
          >
            <MigrationVisual />
          </Tile>
          <Tile
            className="md:col-span-6 lg:col-span-2"
            title="One inbox"
            body="Texts and email next to the booking they're about."
          >
            <InboxVisual />
          </Tile>
        </div>
      </div>
    </section>
  );
}
