import type { LucideIcon } from "lucide-react";
import { Bookmark, ChevronLeft, ChevronRight, CircleDot, Download, MoreHorizontal, Plus, Search, Users, Wallet } from "lucide-react";
import { cn } from "@/components/system/cn";
import { AppFrame } from "./app-frame";
import { AppAvatar, AppBookingStatus, AppButton, AppTable, AppTabs, type AppColumn, type AppTableRow } from "./app-parts";
import {
  ARTISTS,
  DEPOSITS,
  LATE_CANCEL,
  TODAY_BOOKINGS,
  usd,
  type ArtistId,
  type BookingStatus,
} from "./sample-data";

/**
 * Appointments (app route /appointments). Mirrors appointments/_proto/Appointments.tsx:
 * board tabs Today · Needs action · This week · Pending · Completed with counts,
 * the search + Artist / Status / Deposit filter bar, and the table
 * When · Client · Artist · Service · Status · Deposit · Price.
 * Columns fold away as the table narrows; under 480px it scrolls inside the frame, never the page.
 */

export type AppointmentsTab = "today" | "needs-action" | "this-week" | "pending" | "completed";

/**
 * The board's deposit words (appointments/_proto/data.ts DEPOSIT_STANDING_WORD:
 * Held · Due), plus Applied for a deposit already taken into a session, so
 * Priya's $80 never reads as held.
 */
type DepositCell = { kind: "held" | "due" | "applied"; cents: number } | { kind: "none" };

interface Appt {
  id: string;
  /** "Today" or the weekday, e.g. "Tue, Oct 6". */
  day: string;
  today: boolean;
  startMin: number;
  client: string;
  artist: ArtistId;
  service: string;
  status: BookingStatus;
  deposit: DepositCell;
  /** Session total in cents; null for a free consult or touch-up. */
  priceCents: number | null;
  /** Why the row is in Needs action (the app's needsActionReasons). */
  reasons?: string[];
}

function depositFor(client: string): DepositCell {
  const d = DEPOSITS.find((x) => x.client === client);
  if (!d) return { kind: "none" };
  if (d.state === "Pending") return { kind: "due", cents: d.cents };
  if (d.state === "Applied") return { kind: "applied", cents: d.cents };
  // Held, and Leo's kept late-cancel deposit: paid money the studio holds, which
  // the board writes as Held beside the Cancelled status.
  return { kind: "held", cents: d.cents };
}

/**
 * Session totals for this week's bookings. Tomás V. and Bea L. match their
 * Payments rows ($900; $500 paid + $100 from Bea's deposit pool); consults
 * and touch-ups carry no price.
 */
const PRICE: Record<string, number | null> = {
  "Asha M.": 72000,
  "Jo K.": null,
  "Priya S.": 32000,
  "Elena R.": 60000,
  "Sam T.": null,
  "Owen P.": 45000,
  "Tomás V.": 90000,
  "Bea L.": 60000,
  "Leo B.": null,
};

const OWEN_DEPOSIT_CENTS = DEPOSITS.find((d) => d.client === "Owen P.")?.cents ?? 0;

const TODAY_ROWS: Appt[] = TODAY_BOOKINGS.map((s) => {
  const client = s.client ?? "";
  // Asha's $240 is her pool, held for sessions 4–5; Priya's $80 is applied today.
  const deposit = depositFor(client);
  return {
    id: s.id,
    day: "Today",
    today: true,
    startMin: s.startMin,
    client,
    artist: s.artist,
    service: s.session ? `${s.piece} · session ${s.session.n}` : s.piece,
    status: s.status,
    deposit,
    priceCents: PRICE[client] ?? null,
    reasons: s.consent === "not-signed" ? ["Consent form outstanding"] : undefined,
  };
});

const WEEK_ROWS: Appt[] = [
  { id: "tomas-s1", day: "Tue, Oct 6", today: false, startMin: 780, client: "Tomás V.", artist: "dev", service: "Chest panel · session 1", status: "completed", deposit: { kind: "none" }, priceCents: PRICE["Tomás V."] },
  { id: "bea-s2", day: "Wed, Oct 7", today: false, startMin: 720, client: "Bea L.", artist: "dev", service: "Botanical half sleeve · session 2", status: "completed", deposit: { kind: "applied", cents: 10000 }, priceCents: PRICE["Bea L."] },
  ...TODAY_ROWS,
  {
    id: "leo",
    day: LATE_CANCEL.day,
    today: false,
    startMin: LATE_CANCEL.startMin,
    client: LATE_CANCEL.client,
    artist: LATE_CANCEL.artist,
    service: LATE_CANCEL.piece,
    status: "cancelled",
    deposit: depositFor(LATE_CANCEL.client),
    priceCents: PRICE["Leo B."],
  },
  {
    id: "owen",
    day: "Sat, Oct 10",
    today: false,
    startMin: 780,
    client: "Owen P.",
    artist: "dev",
    service: "New piece, calf",
    status: "pending",
    deposit: depositFor("Owen P."),
    priceCents: PRICE["Owen P."],
    reasons: [`Deposit due · ${usd(OWEN_DEPOSIT_CENTS)}`, "Pending — not yet confirmed"],
  },
];

const FILTER: Record<AppointmentsTab, (a: Appt) => boolean> = {
  today: (a) => a.today,
  "needs-action": (a) => Boolean(a.reasons?.length),
  "this-week": () => true,
  pending: (a) => a.status === "pending",
  completed: (a) => a.status === "completed",
};

const TAB_LABEL: Record<AppointmentsTab, string> = {
  today: "Today",
  "needs-action": "Needs action",
  "this-week": "This week",
  pending: "Pending",
  completed: "Completed",
};

function clock(min: number): string {
  const h = Math.floor(min / 60);
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(min % 60).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .replace(".", "");
}

/* As the board draws them: settled money recedes to stone, money still owed
   advances to ink at bold. No second hue; the word carries the meaning. */
const DEPOSIT_TEXT: Record<Exclude<DepositCell["kind"], "none">, { label: string; dot: string; text: string }> = {
  held: { label: "Held", dot: "bg-app-mute", text: "text-app-mute" },
  applied: { label: "Applied", dot: "border border-app-mute", text: "text-app-mute" },
  due: { label: "Due", dot: "bg-app-text", text: "text-app-text font-bold" },
};

function Deposit({ d }: { d: DepositCell }) {
  if (d.kind === "none") return <span className="text-app-mute">—</span>;
  const t = DEPOSIT_TEXT[d.kind];
  return (
    <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap tabular-nums", t.text)}>
      <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", t.dot)} />
      {t.label} {usd(d.cents)}
    </span>
  );
}

const SERVICE_DOT: Record<ArtistId, string> = {
  dev: "bg-app-active-fg",
  mara: "bg-app-info",
  rio: "bg-app-warning",
};

function FilterButton({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <span className="hidden h-8 items-center gap-1.5 rounded-app border border-app-border bg-app-surface px-2.5 text-ui-sm font-semibold text-app-text @xl:inline-flex">
      <Icon size={13} strokeWidth={1.8} className="text-app-mute" />
      {label}
    </span>
  );
}

/* Columns drop away with the table's own width (it's a container): Service
   folds under the client name, then Artist, Deposit and the row menu go. */
const COLUMNS: AppColumn[] = [
  { label: "When" },
  { label: "Client" },
  { label: "Artist", className: "hidden @2xl:table-cell" },
  { label: "Service", className: "hidden @3xl:table-cell" },
  { label: "Status" },
  { label: "Deposit", className: "hidden @lg:table-cell" },
  { label: "Price", align: "right" },
  { label: "", className: "hidden w-8 @xl:table-cell" },
];

export function AppointmentsScreen({ tab = "today", className }: { tab?: AppointmentsTab; className?: string }) {
  const rows = WEEK_ROWS.filter(FILTER[tab]);
  const showDay = tab !== "today";
  const count = (t: AppointmentsTab) => WEEK_ROWS.filter(FILTER[t]).length;

  const tableRows: AppTableRow[] = rows.map((a) => ({
    key: a.id,
    tone: a.status === "cancelled" ? "muted" : "default",
    cells: [
      <span key="when" className="flex flex-col leading-tight">
        <span className="font-bold text-app-text">{clock(a.startMin)}</span>
        {showDay && <span className="text-ui-xs text-app-mute">{a.day}</span>}
      </span>,
      <span key="client" className="flex items-center gap-2">
        <AppAvatar initials={initials(a.client)} size="sm" />
        <span className="flex flex-col leading-tight">
          <span className="font-semibold text-app-text">{a.client}</span>
          {tab === "needs-action" && a.reasons ? (
            <span className="text-ui-xs font-medium text-app-warning">{a.reasons.join(" · ")}</span>
          ) : (
            <span className="text-ui-xs text-app-mute @3xl:hidden">{a.service}</span>
          )}
        </span>
      </span>,
      <span key="artist" className="text-app-soft">
        {ARTISTS[a.artist].name}
      </span>,
      <span key="service" className="inline-flex items-center gap-1.5 text-app-text">
        <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", SERVICE_DOT[a.artist])} />
        {a.service}
      </span>,
      <AppBookingStatus key="status" status={a.status} />,
      <Deposit key="deposit" d={a.deposit} />,
      <span key="price" className="font-bold text-app-text">
        {a.priceCents === null ? <span className="font-normal text-app-mute">—</span> : usd(a.priceCents)}
      </span>,
      <MoreHorizontal key="more" size={15} strokeWidth={1.8} className="text-app-mute" />,
    ],
  }));

  const tabs: { label: string; count?: number }[] = (Object.keys(TAB_LABEL) as AppointmentsTab[]).map((t) => ({
    label: TAB_LABEL[t],
    // Completed is all-time in the app; the sample only knows this week, so it shows no count.
    count: t === "completed" ? undefined : count(t),
  }));

  return (
    <AppFrame
      active="appointments"
      actions={
        <>
          <AppButton icon={Download}>Export</AppButton>
          <AppButton variant="primary" icon={Plus}>
            New
          </AppButton>
        </>
      }
      className={className}
    >
      <AppTabs tabs={tabs} active={TAB_LABEL[tab]} className="mt-1" />
      <div className="px-4 py-4 @lg:px-5">
        <div className="overflow-hidden rounded-app-lg bg-app-surface ring-1 ring-app-border">
          <div className="flex items-center gap-2 border-b border-app-border p-3">
            <span className="flex h-8 min-w-0 flex-1 items-center gap-2 rounded-app border border-app-border px-2.5 text-ui-sm text-app-mute @xl:max-w-[300px]">
              <Search size={14} strokeWidth={1.8} className="shrink-0" />
              <span className="truncate">Search bookings…</span>
            </span>
            <FilterButton icon={Users} label="Artist" />
            <FilterButton icon={CircleDot} label="Status" />
            <FilterButton icon={Wallet} label="Deposit" />
            <span className="hidden h-8 w-8 items-center justify-center rounded-app border border-app-border text-app-mute @xl:flex">
              <Bookmark size={13} strokeWidth={1.8} />
            </span>
          </div>
          {/* Wide frames get the app's table; narrow ones get the same rows stacked, status in view. */}
          <AppTable columns={COLUMNS} rows={tableRows} minWidth={480} className="hidden @lg:block" />
          <div className="divide-y divide-app-border @lg:hidden">
            {rows.map((a) => {
              /* Cancelled reads as struck time and softer text, never as faded (sub-4.5:1) text. */
              const cancelled = a.status === "cancelled";
              return (
                <div key={a.id} className="flex items-start gap-3 px-3.5 py-2.5 @sm:items-center">
                  <span className="flex w-[62px] shrink-0 flex-col leading-tight">
                    <span className={cn("text-ui-sm font-bold tabular-nums", cancelled ? "text-app-mute line-through" : "text-app-text")}>
                      {clock(a.startMin)}
                    </span>
                    {showDay && <span className="text-ui-xs text-app-mute">{a.day.replace(/^\w+, /, "")}</span>}
                  </span>
                  {/* Below @sm the status drops under the name, so name and service keep the width. */}
                  <span className="flex min-w-0 flex-1 flex-col items-start leading-tight">
                    <span className={cn("text-ui-sm font-semibold", cancelled ? "text-app-soft" : "text-app-text")}>{a.client}</span>
                    <span className={cn("text-ui-xs", tab === "needs-action" ? "font-medium text-app-warning" : "text-app-mute")}>
                      {tab === "needs-action" && a.reasons ? a.reasons[0] : `${a.service} · ${ARTISTS[a.artist].name}`}
                    </span>
                    <AppBookingStatus status={a.status} className="mt-1.5 @sm:hidden" />
                  </span>
                  <AppBookingStatus status={a.status} className="hidden @sm:inline-flex" />
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 text-ui-sm text-app-mute">
          <span className="tabular-nums">
            Showing 1–{rows.length} of {rows.length}
          </span>
          <span className="flex items-center gap-1">
            <span className="flex h-7 w-7 items-center justify-center rounded-app text-app-mute/60">
              <ChevronLeft size={14} strokeWidth={1.8} />
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-app bg-app-text text-ui-sm font-semibold text-white">1</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-app text-app-mute/60">
              <ChevronRight size={14} strokeWidth={1.8} />
            </span>
          </span>
        </div>
      </div>
    </AppFrame>
  );
}
