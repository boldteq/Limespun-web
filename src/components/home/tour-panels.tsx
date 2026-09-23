import React from "react";
import { AlertTriangle, Check, PenLine } from "lucide-react";
import { AppWindow, Chip, SampleTag } from "./ui";

/* Every panel shows the same sample studio on Thursday Oct 8: Dev and Mara (residents)
   and Rio (guest spot Oct 2–9, 70/30 split). Dates read "Oct 8", never zero-padded. */

function PanelHeader({ title, meta }: { title: string; meta: string }) {
  // Keep each "·" part whole so the meta only wraps between parts. In a narrow window
  // (phones under ~375px) the tag moves above the title so the meta gets the full width.
  const parts = meta.split(" · ");
  return (
    <div className="@container border-b border-hair">
      <div className="flex items-center justify-between gap-3 px-5 py-4 @max-[300px]:flex-col-reverse @max-[300px]:items-start @max-[300px]:gap-2">
        <div className="min-w-0">
          <p className="text-[15px] font-semibold text-graphite">{title}</p>
          <p className="text-[12px] text-mute">
            {parts.map((p, i) => (
              <React.Fragment key={p}>
                {i > 0 && " · "}
                <span className="whitespace-nowrap">{p}</span>
              </React.Fragment>
            ))}
          </p>
        </div>
        <SampleTag />
      </div>
    </div>
  );
}

/* ── Calendar ─────────────────────────────────────────────────────────── */
/** Pixels per half hour. Blocks start and span in half hours from 10:00. */
const SLOT = 20;
const artists = ["Dev", "Mara", "Rio · guest"];
const blocks: {
  col: number;
  start: number;
  span: number;
  label: string;
  sub: string;
  /** Shorter sub line for phone-width windows. */
  short?: string;
  note?: string;
  tone: "ember" | "soft" | "flag";
}[] = [
  { col: 0, start: 0, span: 6, label: "Asha M.", sub: "Koi sleeve · session\u00a04\u00a0of\u00a05", short: "Koi sleeve · S4\u00a0of\u00a05", tone: "ember" },
  { col: 0, start: 7, span: 5, label: "Elena R.", sub: "Back piece · session\u00a02\u00a0of\u00a03", short: "Back piece · S2\u00a0of\u00a03", note: "Red ink allergy", tone: "flag" },
  { col: 1, start: 2, span: 2, label: "Jo K.", sub: "Consult", tone: "soft" },
  { col: 1, start: 6, span: 4, label: "Priya S.", sub: "Fine-line florals", tone: "ember" },
  { col: 1, start: 13, span: 1, label: "Sam T.", sub: "Touch-up", tone: "soft" },
  { col: 2, start: 4, span: 10, label: "Walk-in flash", sub: "Guest day · 3\u00a0slots", tone: "soft" },
];
const hours = ["10", "11", "12", "1", "2", "3", "4"];

export function CalendarPanel() {
  return (
    <AppWindow active="Calendar">
      <PanelHeader title="Thursday, Oct 8" meta="3 chairs · 1 guest artist" />
      <div className="@container grid grid-cols-[32px_repeat(3,minmax(0,1fr))] px-2 pt-3 pb-4 sm:px-5">
        <span />
        {artists.map((a) => (
          <span key={a} className="truncate px-0.5 pb-2 text-[11px] font-semibold text-graphite @[280px]:px-1 @[280px]:text-[12px]">
            {a}
          </span>
        ))}
        <div className="relative col-span-4 grid grid-cols-[32px_repeat(3,minmax(0,1fr))]">
          <div className="flex flex-col">
            {hours.map((h) => (
              <span key={h} className="text-[10px] text-mute tabular-nums" style={{ height: SLOT * 2 }}>
                {h}:00
              </span>
            ))}
          </div>
          {artists.map((a, col) => (
            <div key={a} className="relative border-l border-hair" style={{ height: hours.length * SLOT * 2 }}>
              {blocks
                .filter((b) => b.col === col)
                .map((b) => (
                  <div
                    key={b.label}
                    className={`absolute inset-x-0.5 overflow-hidden rounded-[8px] px-1.5 sm:inset-x-1 ${b.span > 1 ? "py-1" : "py-px"} ${
                      b.tone === "ember"
                        ? "bg-ember text-white"
                        : b.tone === "flag"
                          ? "bg-flag-soft text-flag ring-1 ring-flag/30"
                          : "bg-canvas-deep text-graphite"
                    }`}
                    style={{ top: b.start * SLOT + 2, height: b.span * SLOT - 4 }}
                  >
                    {b.span > 1 ? (
                      <>
                        {/* Tall blocks wrap instead of cutting words off; one-hour blocks truncate. */}
                        <p className={`text-[11px] leading-[1.2] font-semibold ${b.span > 2 ? "" : "truncate"}`}>{b.label}</p>
                        <p className={`text-[10px] leading-[1.25] opacity-85 ${b.span > 2 ? "" : "truncate"}`}>
                          {b.short ? (
                            <>
                              <span className="@[280px]:hidden">{b.short}</span>
                              <span className="hidden @[280px]:inline">{b.sub}</span>
                            </>
                          ) : (
                            b.sub
                          )}
                        </p>
                        {b.note && <p className="mt-1 text-[10px] leading-[1.25] font-semibold">{b.note}</p>}
                      </>
                    ) : (
                      <p className="truncate text-[10px] leading-[1.4]">
                        <span className="font-semibold">{b.label}</span>
                        <span className="hidden opacity-85 @[380px]:inline"> · {b.sub}</span>
                      </p>
                    )}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </AppWindow>
  );
}

/* ── Sleeves (projects) ───────────────────────────────────────────────── */
const sessions = [
  { n: 1, label: "Outline", date: "Jun 12", done: true },
  { n: 2, label: "Koi + water", date: "Jul 3", done: true },
  { n: 3, label: "Colour pack", date: "Jul 31", done: true },
  { n: 4, label: "Background", date: "Today", done: false, now: true },
  { n: 5, label: "Finish + heal check", date: "Sat Nov 7", done: false },
];

export function SleevePanel() {
  return (
    <AppWindow active="Projects">
      <PanelHeader title="Asha M. · Koi sleeve" meta="Dev · 5 sessions · started June" />
      <div className="@container"><div className="grid gap-5 px-5 py-5 @[480px]:grid-cols-[1fr_180px]">
        <ol className="flex flex-col">
          {sessions.map((s) => (
            <li key={s.n} className="flex items-center gap-3 border-b border-hair py-2.5 last:border-b-0">
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                  s.done ? "bg-graphite text-white" : s.now ? "bg-ember text-white" : "border border-hair-strong text-mute"
                }`}
              >
                {s.done ? <Check size={12} strokeWidth={3} /> : s.n}
              </span>
              <span className="flex-1 text-[13px] font-medium text-graphite">{s.label}</span>
              <span className={`text-[12px] tabular-nums ${s.now ? "font-semibold text-ember-deep" : "text-mute"}`}>{s.date}</span>
            </li>
          ))}
        </ol>
        <div className="flex flex-col gap-3 rounded-[12px] bg-canvas p-4">
          <p className="text-[11px] font-medium text-mute">Deposit on this project</p>
          <p className="text-[24px] font-semibold tracking-[-0.01em] text-graphite tabular-nums">$300</p>
          <div className="h-2 overflow-hidden rounded-full bg-canvas-deep">
            <div className="h-full w-[80%] rounded-full bg-ember" />
          </div>
          <p className="text-[12px] text-graphite-soft">
            $240 still held · $60 applied to session 3
          </p>
        </div>
      </div></div>
    </AppWindow>
  );
}

/* ── Deposits ─────────────────────────────────────────────────────────── */
// Held = Asha $240 + Jo $100 = $340. Leo's $150 is kept and Priya's $80 is applied, so neither is held.
const ledger: { client: string; piece: string; amount: string; status: React.ReactNode }[] = [
  { client: "Asha M.", piece: "Koi sleeve · S4", amount: "$240", status: <Chip tone="quiet">Held for S4–S5</Chip> },
  { client: "Jo K.", piece: "Consult", amount: "$100", status: <Chip tone="quiet">Held for tattoo</Chip> },
  { client: "Leo B.", piece: "Chest panel · S1", amount: "$150", status: <Chip tone="ember">Late cancel · kept</Chip> },
  { client: "Priya S.", piece: "Fine-line florals", amount: "$80", status: <Chip tone="paid">Applied today</Chip> },
];

export function DepositsPanel() {
  return (
    <AppWindow active="Deposits">
      <PanelHeader title="Deposits" meta="$340 held · $150 kept · $80 applied" />
      {/* Columns follow the window's width: 4 wide, 3 (piece under the name) on phones, 2 at 320. */}
      <div className="@container overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[11px] text-mute">
              <th className="py-2 pr-2 pl-4 font-medium @[420px]:pl-5">Client</th>
              <th className="hidden px-2 py-2 font-medium @[420px]:table-cell">Piece</th>
              <th className="py-2 pr-4 pl-2 text-right font-medium @[300px]:pr-2">Amount</th>
              <th className="hidden py-2 pr-4 pl-2 font-medium @[300px]:table-cell @[420px]:px-5">Status</th>
            </tr>
          </thead>
          <tbody>
            {ledger.map((l) => (
              <tr key={l.client} className="border-t border-hair text-[13px]">
                <td className="py-3 pr-2 pl-4 @[420px]:pl-5">
                  <p className="font-semibold whitespace-nowrap text-graphite">{l.client}</p>
                  <p className="text-[11px] whitespace-nowrap text-mute @[420px]:hidden">{l.piece}</p>
                </td>
                <td className="hidden px-2 py-3 text-graphite-soft @[420px]:table-cell">{l.piece}</td>
                <td className="py-3 pr-4 pl-2 text-right font-semibold text-graphite tabular-nums @[300px]:pr-2">
                  {l.amount}
                  <span className="mt-1 block @[300px]:hidden">{l.status}</span>
                </td>
                <td className="hidden py-3 pr-4 pl-2 @[300px]:table-cell @[420px]:px-5">{l.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-hair px-5 py-3 text-[12px] text-graphite-soft">
        Policy: cancel inside 48 hours and the deposit stays with the studio.
      </p>
    </AppWindow>
  );
}

/* ── Consent ──────────────────────────────────────────────────────────── */
export function ConsentPanel() {
  return (
    <AppWindow active="Consent forms">
      <PanelHeader title="Consent · Elena R." meta="Back piece · session 2 of 3" />
      <div className="flex flex-col gap-3 px-5 py-5">
        {[
          ["I am over 18 and have shown photo ID", true],
          ["I have eaten in the last 4 hours", true],
          ["I understand aftercare instructions", true],
        ].map(([q, ok]) => (
          <label key={String(q)} className="flex items-center gap-3 text-[13px] text-graphite">
            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] ${ok ? "bg-graphite text-white" : "border border-hair-strong"}`}>
              <Check size={12} strokeWidth={3} />
            </span>
            {q}
          </label>
        ))}
        <div className="flex items-start gap-3 rounded-[12px] bg-flag-soft px-4 py-3">
          <AlertTriangle size={16} strokeWidth={2.2} className="mt-0.5 shrink-0 text-flag" />
          <p className="text-[13px] text-graphite">
            <span className="font-semibold text-flag">Allergy: red ink.</span> Reacted after session 1. No red today;
            patch test booked before session 3.
          </p>
        </div>
        <div className="mt-1 flex flex-wrap items-end justify-between gap-x-4 gap-y-2 border-t border-hair pt-4">
          <div>
            <p className="text-[11px] text-mute">Signature</p>
            <p className="font-serif text-[26px] leading-none text-graphite">Elena Ruiz</p>
          </div>
          <Chip tone="paid">
            <PenLine size={11} strokeWidth={2.4} /> Signed 9:42 on her phone
          </Chip>
        </div>
      </div>
    </AppWindow>
  );
}

/* ── Payouts ──────────────────────────────────────────────────────────── */
// Payout = gross × split, or gross − weekly booth rent. Totals: 25 sessions, $7,630 gross, $5,622 paid out.
const payouts = [
  { artist: "Dev", model: "60% commission", sessions: 9, gross: "$3,420", pay: "$2,052" },
  { artist: "Mara", model: "Booth rent $250/wk", sessions: 12, gross: "$2,910", pay: "$2,660" },
  { artist: "Rio · guest", model: "70% guest split", sessions: 4, gross: "$1,300", pay: "$910" },
];

export function PayoutsPanel() {
  return (
    <AppWindow active="Payouts">
      <PanelHeader title="Payday · this week" meta="3 artists · 25 sessions" />
      {/* Columns follow the window's width: the split moves under the name when it gets narrow. */}
      <div className="@container overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[11px] text-mute">
              <th className="py-2 pr-2 pl-4 font-medium @[420px]:pl-5">Artist</th>
              <th className="hidden px-2 py-2 font-medium @[420px]:table-cell">Split</th>
              <th className="px-2 py-2 text-right font-medium">Gross</th>
              <th className="py-2 pr-4 pl-2 text-right font-medium @[420px]:px-5">Payout</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((p) => (
              <tr key={p.artist} className="border-t border-hair text-[13px]">
                <td className="py-3 pr-2 pl-4 @[420px]:pl-5">
                  <p className="font-semibold whitespace-nowrap text-graphite">{p.artist}</p>
                  <p className="text-[11px] text-mute @[420px]:hidden">{p.model}</p>
                  <p className="hidden text-[11px] text-mute @[420px]:block">{p.sessions} sessions</p>
                </td>
                <td className="hidden px-2 py-3 text-graphite-soft @[420px]:table-cell">{p.model}</td>
                <td className="px-2 py-3 text-right text-graphite-soft tabular-nums">{p.gross}</td>
                <td className="py-3 pr-4 pl-2 text-right font-semibold text-graphite tabular-nums @[420px]:px-5">{p.pay}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-hair px-5 py-3">
        <p className="text-[12px] text-graphite-soft">Totals match every session closed this week.</p>
        <span className="rounded-full bg-graphite px-3 py-1.5 text-[12px] font-semibold text-white">Approve payouts</span>
      </div>
    </AppWindow>
  );
}

/* ── Clients ──────────────────────────────────────────────────────────── */
export function ClientsPanel() {
  return (
    <AppWindow active="Clients">
      <PanelHeader title="Elena R." meta="Client since March · 2 projects" />
      <div className="grid gap-4 px-5 py-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-medium text-mute">On file</p>
          <div className="flex flex-wrap gap-1.5">
            <Chip tone="flag">Red ink allergy</Chip>
            <Chip tone="quiet">Latex-free gloves</Chip>
            <Chip tone="quiet">Prefers Dev</Chip>
          </div>
          <p className="mt-2 text-[11px] font-medium text-mute">Notes</p>
          <p className="text-[13px] leading-snug text-graphite-soft">
            Heals fast on the back. Wants the peony a touch larger than the stencil.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-medium text-mute">History</p>
          {[
            ["Back piece · S2", "Today"],
            ["Back piece · S1", "Aug 21"],
            ["Ankle script", "Mar 4"],
          ].map(([what, when]) => (
            <div key={what} className="flex items-center justify-between border-b border-hair pb-2 text-[13px] last:border-b-0">
              <span className="font-medium text-graphite">{what}</span>
              <span className="text-mute tabular-nums">{when}</span>
            </div>
          ))}
        </div>
      </div>
    </AppWindow>
  );
}
