import React from "react";
import { AlertTriangle, Check, PenLine } from "lucide-react";
import { AppWindow, Chip, SampleTag } from "./ui";

function PanelHeader({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-hair px-5 py-4">
      <div>
        <p className="text-[15px] font-semibold text-graphite">{title}</p>
        <p className="text-[12px] text-mute">{meta}</p>
      </div>
      <SampleTag />
    </div>
  );
}

/* ── Calendar ─────────────────────────────────────────────────────────── */
const artists = ["Dev", "Mara", "Rio · guest"];
const blocks: { col: number; start: number; span: number; label: string; sub: string; tone: "ember" | "soft" | "flag" }[] = [
  { col: 0, start: 0, span: 6, label: "Asha M.", sub: "Koi sleeve · S4", tone: "ember" },
  { col: 0, start: 7, span: 5, label: "Elena R.", sub: "Back piece · S2", tone: "flag" },
  { col: 1, start: 1, span: 2, label: "Jo K.", sub: "Consult", tone: "soft" },
  { col: 1, start: 5, span: 4, label: "Priya S.", sub: "Fine-line florals", tone: "ember" },
  { col: 2, start: 2, span: 7, label: "Walk-in flash", sub: "Guest day · 3 slots", tone: "soft" },
];
const hours = ["10", "11", "12", "1", "2", "3", "4"];

export function CalendarPanel() {
  return (
    <AppWindow active="Calendar">
      <PanelHeader title="Thursday" meta="3 chairs · 1 guest artist" />
      <div className="grid grid-cols-[36px_repeat(3,minmax(0,1fr))] px-3 pt-3 pb-4 sm:px-5">
        <span />
        {artists.map((a) => (
          <span key={a} className="px-1.5 pb-2 text-[12px] font-semibold text-graphite">
            {a}
          </span>
        ))}
        <div className="relative col-span-4 grid grid-cols-[36px_repeat(3,minmax(0,1fr))]">
          <div className="flex flex-col">
            {hours.map((h) => (
              <span key={h} className="h-[34px] text-[10px] text-mute tabular-nums">
                {h}:00
              </span>
            ))}
          </div>
          {artists.map((a, col) => (
            <div key={a} className="relative border-l border-hair" style={{ height: hours.length * 34 }}>
              {blocks
                .filter((b) => b.col === col)
                .map((b) => (
                  <div
                    key={b.label}
                    className={`absolute inset-x-1 rounded-[8px] px-2 py-1.5 ${
                      b.tone === "ember"
                        ? "bg-ember text-white"
                        : b.tone === "flag"
                          ? "bg-flag-soft text-flag ring-1 ring-flag/30"
                          : "bg-canvas-deep text-graphite"
                    }`}
                    style={{ top: b.start * 17 + 2, height: b.span * 17 - 4 }}
                  >
                    <p className="truncate text-[11px] font-semibold">{b.label}</p>
                    <p className="truncate text-[10px] opacity-85">{b.sub}</p>
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
  { n: 2, label: "Koi + water", date: "Jul 03", done: true },
  { n: 3, label: "Colour pack", date: "Jul 31", done: true },
  { n: 4, label: "Background", date: "Today", done: false, now: true },
  { n: 5, label: "Finish + heal check", date: "Oct 09", done: false },
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
const ledger: { client: string; piece: string; amount: string; status: React.ReactNode }[] = [
  { client: "Asha M.", piece: "Koi sleeve · S4", amount: "$240", status: <Chip tone="quiet">Held for S4–S5</Chip> },
  { client: "Jo K.", piece: "Consult", amount: "$100", status: <Chip tone="paid">Paid</Chip> },
  { client: "Leo B.", piece: "Chest panel · S1", amount: "$150", status: <Chip tone="ember">Late cancel · kept</Chip> },
  { client: "Priya S.", piece: "Fine-line florals", amount: "$80", status: <Chip tone="paid">Applied today</Chip> },
];

export function DepositsPanel() {
  return (
    <AppWindow active="Deposits">
      <PanelHeader title="Deposits" meta="$570 held across 4 clients" />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] text-left">
          <thead>
            <tr className="text-[11px] text-mute">
              <th className="px-5 py-2 font-medium">Client</th>
              <th className="px-2 py-2 font-medium">Piece</th>
              <th className="px-2 py-2 text-right font-medium">Amount</th>
              <th className="px-5 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {ledger.map((l) => (
              <tr key={l.client} className="border-t border-hair text-[13px]">
                <td className="px-5 py-3 font-semibold text-graphite">{l.client}</td>
                <td className="px-2 py-3 text-graphite-soft">{l.piece}</td>
                <td className="px-2 py-3 text-right font-semibold text-graphite tabular-nums">{l.amount}</td>
                <td className="px-5 py-3">{l.status}</td>
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
      <PanelHeader title="Consent · Elena R." meta="Back piece · session 2" />
      <div className="flex flex-col gap-3 px-5 py-5">
        {[
          ["I am over 18 and have shown photo ID", true],
          ["I have eaten in the last 4 hours", true],
          ["I understand aftercare instructions", true],
        ].map(([q, ok]) => (
          <label key={String(q)} className="flex items-center gap-3 text-[13px] text-graphite">
            <span className={`flex h-5 w-5 items-center justify-center rounded-[6px] ${ok ? "bg-graphite text-white" : "border border-hair-strong"}`}>
              <Check size={12} strokeWidth={3} />
            </span>
            {q}
          </label>
        ))}
        <div className="flex items-start gap-3 rounded-[12px] bg-flag-soft px-4 py-3">
          <AlertTriangle size={16} strokeWidth={2.2} className="mt-0.5 shrink-0 text-flag" />
          <p className="text-[13px] text-graphite">
            <span className="font-semibold text-flag">Allergy: red pigment.</span> Reaction after session 1. Patch test
            required before work continues.
          </p>
        </div>
        <div className="mt-1 flex items-end justify-between gap-4 border-t border-hair pt-4">
          <div>
            <p className="text-[11px] text-mute">Signature</p>
            <p className="font-serif text-[26px] leading-none text-graphite">Elena Ruiz</p>
          </div>
          <Chip tone="paid">
            <PenLine size={11} strokeWidth={2.4} /> Signed 9:42 on iPad
          </Chip>
        </div>
      </div>
    </AppWindow>
  );
}

/* ── Payouts ──────────────────────────────────────────────────────────── */
const payouts = [
  { artist: "Dev", model: "60% commission", sessions: 9, gross: "$3,420", pay: "$2,052" },
  { artist: "Mara", model: "Booth rent $250/wk", sessions: 12, gross: "$2,910", pay: "$1,910" },
  { artist: "Rio · guest", model: "70% guest split", sessions: 4, gross: "$1,300", pay: "$910" },
];

export function PayoutsPanel() {
  return (
    <AppWindow active="Payouts">
      <PanelHeader title="Payday · this week" meta="3 artists · 25 sessions" />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[440px] text-left">
          <thead>
            <tr className="text-[11px] text-mute">
              <th className="px-5 py-2 font-medium">Artist</th>
              <th className="px-2 py-2 font-medium">Split</th>
              <th className="px-2 py-2 text-right font-medium">Gross</th>
              <th className="px-5 py-2 text-right font-medium">Payout</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((p) => (
              <tr key={p.artist} className="border-t border-hair text-[13px]">
                <td className="px-5 py-3">
                  <p className="font-semibold text-graphite">{p.artist}</p>
                  <p className="text-[11px] text-mute">{p.sessions} sessions</p>
                </td>
                <td className="px-2 py-3 text-graphite-soft">{p.model}</td>
                <td className="px-2 py-3 text-right text-graphite-soft tabular-nums">{p.gross}</td>
                <td className="px-5 py-3 text-right font-semibold text-graphite tabular-nums">{p.pay}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-hair px-5 py-3">
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
            <Chip tone="flag">Red pigment allergy</Chip>
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
            ["Ankle script", "Mar 04"],
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
