/**
 * The one sample studio every product mockup shows.
 *
 * Rules (see MOCKUPS.md):
 * - It is always labelled "Sample studio". Never give it a name, a city or a logo.
 * - Today is Thursday, Oct 8, 2026, 10:40 AM. Every weekday below was checked
 *   against the 2026 calendar; add a date only after checking its weekday.
 * - Totals are derived in code from the rows, so a mockup can't show a sum that
 *   disagrees with its own lines. Change a row and every total follows.
 * - Labels, statuses and tabs are copied from the app (InkOS). The source file
 *   for each is listed in MOCKUPS.md.
 * - AI never draws or drafts: moodboard references are the client's own uploads
 *   and the brief is the artist's own notes.
 */
import type { PlanTier } from "@/lib/data/plans";

/* ─── Studio, day, viewer ─────────────────────────────────────────────────── */

export const STUDIO_LABEL = "Sample studio";
/** Short form for chips and meta lines. */
export const TODAY_LABEL = "Thursday, Oct 8";
/** The app's own date line under the greeting ("Monday, August 17" format). */
export const TODAY_DATE_LINE = "Thursday, October 8";
export const TODAY_YEAR = 2026;
/** Now = 10:40 AM: Asha is in Dev's chair, Jo's consult starts at 11:00. */
export const NOW = { label: "10:40", minutes: 10 * 60 + 40 } as const;
/** The owner lens is Dev's (owner who also tattoos). */
export const VIEWER = { name: "Dev", initials: "D", greeting: "Good morning, Dev" } as const;
/** Guest seats and roles need Pro, so the sample studio is on Pro. */
export const SAMPLE_PLAN: PlanTier = "pro";

/** "$1,236" from cents; `withCents` keeps ".50" style amounts. */
export function usd(cents: number, withCents = false): string {
  const sign = cents < 0 ? "−" : "";
  const abs = Math.abs(cents) / 100;
  return `${sign}$${abs.toLocaleString("en-US", {
    minimumFractionDigits: withCents ? 2 : 0,
    maximumFractionDigits: withCents ? 2 : 0,
  })}`;
}

function sum(values: number[]): number {
  return values.reduce((total, v) => total + v, 0);
}

/* ─── Team ────────────────────────────────────────────────────────────────── */

export type ArtistId = "dev" | "mara" | "rio";
/** Tint used for an artist's avatar and calendar blocks. */
export type SampleTone = "ember" | "info" | "warning" | "success" | "neutral";

export type PayRule =
  | { kind: "commission"; artistPercent: number }
  | { kind: "booth-rent"; weeklyRentCents: number }
  | { kind: "guest-split"; artistPercent: number };

export interface Artist {
  id: ArtistId;
  name: string;
  initials: string;
  kind: "Resident" | "Guest";
  tone: SampleTone;
  specialties: string[];
  pay: PayRule;
  /** Guest residency dates, as the Team page shows them. */
  guestSpot?: { from: string; to: string };
}

export const ARTISTS: Record<ArtistId, Artist> = {
  dev: {
    id: "dev",
    name: "Dev",
    initials: "D",
    kind: "Resident",
    tone: "ember",
    specialties: ["Japanese", "Blackwork"],
    pay: { kind: "commission", artistPercent: 60 },
  },
  mara: {
    id: "mara",
    name: "Mara",
    initials: "M",
    kind: "Resident",
    tone: "info",
    specialties: ["Fine-line", "Florals"],
    pay: { kind: "booth-rent", weeklyRentCents: 25000 },
  },
  rio: {
    id: "rio",
    name: "Rio",
    initials: "R",
    kind: "Guest",
    tone: "warning",
    specialties: ["Traditional", "Flash"],
    pay: { kind: "guest-split", artistPercent: 70 },
    guestSpot: { from: "Fri, Oct 2", to: "Fri, Oct 9" },
  },
};

export const ARTIST_ORDER: ArtistId[] = ["dev", "mara", "rio"];

export function payRuleLabel(rule: PayRule): string {
  switch (rule.kind) {
    case "commission":
      return `${rule.artistPercent}% commission`;
    case "booth-rent":
      return `Booth rent ${usd(rule.weeklyRentCents)}/wk`;
    case "guest-split":
      return `${rule.artistPercent}/${100 - rule.artistPercent} split`;
  }
}

/** What the artist takes home from a week's gross under their rule. */
export function artistPayoutCents(rule: PayRule, grossCents: number): number {
  switch (rule.kind) {
    case "commission":
    case "guest-split":
      return Math.round((grossCents * rule.artistPercent) / 100);
    case "booth-rent":
      return grossCents - rule.weeklyRentCents;
  }
}

/** Team page role labels (app: team/_proto/ScrTeam.tsx). */
export type TeamRole = "Owner" | "Admin" | "Artist" | "Front desk" | "Guest";

export interface TeamMember {
  name: string;
  initials: string;
  role: TeamRole;
  artist?: ArtistId;
  status: "Active" | "Pending";
  detail: string;
  lastActive: string;
}

export const TEAM: TeamMember[] = [
  { name: "Dev", initials: "D", role: "Owner", artist: "dev", status: "Active", detail: "Japanese, blackwork · 60% commission", lastActive: "Now" },
  { name: "Mara", initials: "M", role: "Artist", artist: "mara", status: "Active", detail: "Fine-line, florals · booth rent $250/wk", lastActive: "9:58 AM" },
  { name: "Rio", initials: "R", role: "Guest", artist: "rio", status: "Active", detail: "Guest spot Oct 2 – Oct 9 · 70/30", lastActive: "10:12 AM" },
  { name: "Noor", initials: "N", role: "Front desk", status: "Active", detail: "Bookings, forms, payments", lastActive: "10:31 AM" },
  { name: "Cam", initials: "C", role: "Admin", status: "Pending", detail: "Invite sent Tue, Oct 6", lastActive: "—" },
];

/**
 * A slice of the permissions matrix (app: components/settings/team/PermissionsMatrix.tsx).
 * Row labels are the app's; the ticks are this sample studio's settings.
 */
export const PERMISSION_ROLES = ["Owner", "Admin", "Artist", "Receptionist", "Guest Artist"] as const;
export const PERMISSIONS: { group: string; label: string; grants: [boolean, boolean, boolean, boolean, boolean] }[] = [
  { group: "Bookings", label: "View all bookings", grants: [true, true, false, true, false] },
  { group: "Bookings", label: "Create bookings", grants: [true, true, true, true, true] },
  { group: "Bookings", label: "Cancel bookings", grants: [true, true, false, true, false] },
  { group: "Bookings", label: "View own bookings only", grants: [false, false, true, false, true] },
  { group: "Clients", label: "View clients", grants: [true, true, true, true, false] },
  { group: "Clients", label: "Export client data", grants: [true, true, false, false, false] },
  { group: "Artists", label: "View commission rates", grants: [true, true, true, false, false] },
  { group: "Artists", label: "Edit commission rates", grants: [true, true, false, false, false] },
  { group: "Settings", label: "Manage billing", grants: [true, false, false, false, false] },
];

/* ─── Today ───────────────────────────────────────────────────────────────── */

/** App labels: lib/bookings/constants.ts BOOKING_STATUS_LABELS. */
export type BookingStatus = "pending" | "confirmed" | "in_progress" | "completed" | "cancelled" | "no_show";
export const BOOKING_STATUS_LABEL: Record<BookingStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  in_progress: "In progress",
  completed: "Completed",
  cancelled: "Cancelled",
  no_show: "No-show",
};

export type ConsentState = "signed" | "not-signed" | "not-needed";

export interface TodaySession {
  id: string;
  artist: ArtistId;
  start: string;
  end: string;
  /** Minutes from midnight, for placing blocks on a time grid. */
  startMin: number;
  endMin: number;
  /** null for Rio's open walk-in block. */
  client: string | null;
  piece: string;
  detail: string;
  kind: "session" | "consult" | "touch-up" | "walk-in";
  status: BookingStatus;
  projectId?: ProjectId;
  session?: { n: number; of: number };
  consent: ConsentState;
  consentNote?: string;
  deposit?: { cents: number; note: string };
  flag?: { label: string; note: string };
  /** Walk-in block only. */
  slots?: number;
}

export const TODAY_SESSIONS: TodaySession[] = [
  {
    id: "asha-s4",
    artist: "dev",
    start: "10:00",
    end: "1:00",
    startMin: 600,
    endMin: 780,
    client: "Asha M.",
    piece: "Koi sleeve",
    detail: "Session 4 of 5 · in the chair",
    kind: "session",
    status: "in_progress",
    projectId: "asha-koi",
    session: { n: 4, of: 5 },
    consent: "signed",
    consentNote: "Signed 9:51 on the studio tablet",
    deposit: { cents: 12000, note: "$120 from the deposit pool" },
  },
  {
    id: "jo-consult",
    artist: "mara",
    start: "11:00",
    end: "12:00",
    startMin: 660,
    endMin: 720,
    client: "Jo K.",
    piece: "Consult",
    detail: "Consult · fine-line florals",
    kind: "consult",
    status: "confirmed",
    projectId: "jo-florals",
    consent: "not-needed",
    deposit: { cents: 10000, note: "$100 deposit paid" },
  },
  {
    id: "rio-walkins",
    artist: "rio",
    start: "12:00",
    end: "5:00",
    startMin: 720,
    endMin: 1020,
    client: null,
    piece: "Walk-in flash",
    detail: "Guest day · 3 slots",
    kind: "walk-in",
    status: "confirmed",
    consent: "not-needed",
    slots: 3,
  },
  {
    id: "priya-florals",
    artist: "mara",
    start: "1:00",
    end: "3:00",
    startMin: 780,
    endMin: 900,
    client: "Priya S.",
    // Not "florals": that is Jo K.'s piece (her consult, moodboard and project).
    piece: "Fine-line wildflowers",
    detail: "Fine-line wildflowers · $80 deposit applied today",
    kind: "session",
    status: "confirmed",
    consent: "not-signed",
    consentNote: "Consent form sent, not signed yet",
    deposit: { cents: 8000, note: "$80 deposit applied today" },
  },
  {
    id: "elena-s2",
    artist: "dev",
    start: "1:30",
    end: "4:00",
    startMin: 810,
    endMin: 960,
    client: "Elena R.",
    piece: "Back piece",
    detail: "Session 2 of 3 · no red today",
    kind: "session",
    status: "confirmed",
    projectId: "elena-back",
    session: { n: 2, of: 3 },
    consent: "signed",
    consentNote: "Signed 9:42 on her phone",
    // No deposit on today's session: her pool's $160 is held for session 3, and
    // session 2 is paid at checkout. That keeps today's held total at $340.
    flag: {
      label: "Red ink allergy",
      note: "Reacted after session 1 in August. No red today; patch test before session 3.",
    },
  },
  {
    id: "sam-touchup",
    artist: "mara",
    start: "4:30",
    end: "5:00",
    startMin: 990,
    endMin: 1020,
    client: "Sam T.",
    piece: "Touch-up",
    detail: "Touch-up · forearm script",
    kind: "touch-up",
    status: "confirmed",
    projectId: "sam-script",
    consent: "signed",
    consentNote: "Signed 8:57 on his phone",
  },
];

/** Studio day on the calendar grid: 9:00 to 6:00. */
export const DAY_START_MIN = 9 * 60;
export const DAY_END_MIN = 18 * 60;

/** Client bookings today (Rio's open walk-in block isn't a booking). */
export const TODAY_BOOKINGS = TODAY_SESSIONS.filter((s) => s.client !== null);

/* ─── Deposits ────────────────────────────────────────────────────────────── */

export type DepositState = "Held" | "Pending" | "Kept" | "Applied";

/** The app's default deposit deadline (studios.deposit_deadline_hours DEFAULT 24). */
export const DEPOSIT_DEADLINE_HOURS = 24;
/*
 * No cancellation window here on purpose: the app saves one but doesn't check
 * it. When a client cancels, the studio decides whether the deposit is kept or
 * refunded (Leo B.'s was kept by the studio).
 */

export interface DepositRow {
  client: string;
  artist: ArtistId;
  booking: string;
  cents: number;
  state: DepositState;
  note: string;
  /** Against one of today's bookings (held or applied today). */
  today?: boolean;
  /** Pending only: when the request went out and when it lapses (DEPOSIT_DEADLINE_HOURS later). */
  requestedAt?: string;
  dueAt?: string;
}

/**
 * The homepage's ledger, extended. Held for today = Asha's $240 pool + Jo's $100
 * = $340. Priya's $80 is applied to today's session, so it isn't held. Elena's
 * pool ($160, for session 3) isn't against a booking today.
 */
export const DEPOSITS: DepositRow[] = [
  { client: "Asha M.", artist: "dev", booking: "Koi sleeve, sessions 4–5 · Thu, Oct 8, 10:00", cents: 24000, state: "Held", note: "Deposit pool · $60 applied to session 3", today: true },
  { client: "Jo K.", artist: "mara", booking: "Consult · Thu, Oct 8, 11:00", cents: 10000, state: "Held", note: "Paid Tue, Oct 6 · goes toward the tattoo", today: true },
  { client: "Priya S.", artist: "mara", booking: "Fine-line wildflowers · Thu, Oct 8, 1:00", cents: 8000, state: "Applied", note: "Applied to today's session", today: true },
  {
    client: "Owen P.",
    artist: "dev",
    booking: "New piece, calf · Sat, Oct 10, 1:00",
    cents: 15000,
    state: "Pending",
    note: "Requested Wed, Oct 7, 7:30 PM",
    requestedAt: "Wed, Oct 7, 7:30 PM",
    dueAt: "Today, 7:30 PM",
  },
  { client: "Leo B.", artist: "mara", booking: "Chest panel, session 1 · Fri, Oct 9, 11:00 · cancelled", cents: 15000, state: "Kept", note: "Late cancel · kept by the studio" },
  { client: "Kira N.", artist: "mara", booking: "Fine-line wrist · Sat, Nov 14, 12:00", cents: 15000, state: "Held", note: "Paid today, 8:05 AM" },
  { client: "Bea L.", artist: "dev", booking: "Botanical half sleeve, session 3 · Tue, Nov 10, 2:00", cents: 10000, state: "Held", note: "Paid today, 7:12 AM" },
];

/** $340: Asha $240 + Jo $100. */
export const DEPOSITS_HELD_TODAY_CENTS = sum(DEPOSITS.filter((d) => d.today && d.state === "Held").map((d) => d.cents));
/** $80: Priya's, applied to today's session. */
export const DEPOSITS_APPLIED_TODAY_CENTS = sum(DEPOSITS.filter((d) => d.today && d.state === "Applied").map((d) => d.cents));
/** Owen P. only: requested Wed 7:30 PM, so under the 24-hour default it is still open until 7:30 PM today. */
export const DEPOSITS_PENDING = DEPOSITS.filter((d) => d.state === "Pending");
export const DEPOSITS_PENDING_CENTS = sum(DEPOSITS_PENDING.map((d) => d.cents));

/**
 * Leo B.'s late cancel. He cancelled Wed 6:12 PM for Fri 11:00, under two days
 * out and before now (Thu 10:40), and the studio chose to keep his $150 deposit
 * (paid Mon, Oct 5). Nothing kept it automatically. The freed slot is offered
 * to Nadia H. on the waitlist.
 */
export const LATE_CANCEL = {
  client: "Leo B.",
  artist: "mara" as ArtistId,
  /** As the Appointments "Service" column writes it (homepage: "Chest panel · S1"). */
  piece: "Chest panel · session 1",
  day: "Fri, Oct 9",
  startMin: 11 * 60,
  slot: "Fri, Oct 9, 11:00",
  cancelledAt: "Wed, Oct 7, 6:12 PM",
  cents: 15000,
} as const;

/* ─── Payments ────────────────────────────────────────────────────────────── */

/** The app's Type column words (payments/_proto/adapt.ts TYPE_LABEL). No card or cash method is shown. */
export type TxnTypeLabel = "Deposit" | "Full payment" | "Balance" | "Tip" | "Refund" | "Product";

export interface Transaction {
  when: string;
  /** "Oct 6": the day the payment went through (Analytics builds its daily revenue from it). */
  day: string;
  /** A payment with no client on file reads "Walk-in", as the app's adaptTxns writes it. */
  client: string;
  /** What the payment was for (filters, the Service line). Never printed as the Type. */
  type: "Deposit" | "Session" | "Walk-in";
  artist: ArtistId;
  cents: number;
  /** "Kept": a deposit the studio kept after a late cancel (still a succeeded payment). */
  status: "Paid" | "Kept" | "Pending";
  /** The Type column. The app's Txn carries TYPE_LABEL on a field it calls `method`. */
  method: TxnTypeLabel;
}

/** Minutes past midnight from a ledger stamp's clock ("Tue, Oct 6, 2:40 PM" → 880), to order one day's rows. */
function clockMinutes(when: string): number {
  const m = /(\d{1,2}):(\d{2}) (AM|PM)$/.exec(when);
  if (!m) return 0;
  const h = Number(m[1]) % 12 + (m[3] === "PM" ? 12 : 0);
  return h * 60 + Number(m[2]);
}

/** Rio's walk-ins on Tue, Oct 6 (12:00–3:00): one payment each, $480 in all. */
const RIO_WALK_INS: { when: string; cents: number }[] = [
  { when: "Tue, Oct 6, 3:05 PM", cents: 14000 },
  { when: "Tue, Oct 6, 2:20 PM", cents: 12000 },
  { when: "Tue, Oct 6, 1:35 PM", cents: 12000 },
  { when: "Tue, Oct 6, 12:50 PM", cents: 10000 },
];

/**
 * The payments ledger, one row per payment, newest first. Bea L.'s Wednesday
 * payment is the balance of her $600 session after $100 from her deposit pool.
 * Leo B.'s deposit went through Mon, Oct 5 and the studio kept it when he
 * cancelled late on Wed.
 */
export const TRANSACTIONS: Transaction[] = [
  { when: "Today, 8:05 AM", day: "Oct 8", client: "Kira N.", type: "Deposit", artist: "mara", cents: 15000, status: "Paid", method: "Deposit" },
  { when: "Today, 7:12 AM", day: "Oct 8", client: "Bea L.", type: "Deposit", artist: "dev", cents: 10000, status: "Paid", method: "Deposit" },
  { when: "Wed, Oct 7, 4:40 PM", day: "Oct 7", client: "Bea L.", type: "Session", artist: "dev", cents: 50000, status: "Paid", method: "Balance" },
  { when: "Tue, Oct 6, 5:20 PM", day: "Oct 6", client: "Tomás V.", type: "Session", artist: "dev", cents: 90000, status: "Paid", method: "Full payment" },
  // Jo K. paid her consult deposit at 2:40 PM, after Mara booked her at 2:31 (Messages); it sits among Rio's walk-ins.
  ...[
    ...RIO_WALK_INS.map(
      (w): Transaction => ({ when: w.when, day: "Oct 6", client: "Walk-in", type: "Walk-in", artist: "rio", cents: w.cents, status: "Paid", method: "Full payment" }),
    ),
    { when: "Tue, Oct 6, 2:40 PM", day: "Oct 6", client: "Jo K.", type: "Deposit", artist: "mara", cents: 10000, status: "Paid", method: "Deposit" } as Transaction,
  ].sort((x, y) => clockMinutes(y.when) - clockMinutes(x.when)),
  { when: "Mon, Oct 5, 1:20 PM", day: "Oct 5", client: LATE_CANCEL.client, type: "Deposit", artist: LATE_CANCEL.artist, cents: LATE_CANCEL.cents, status: "Kept", method: "Deposit" },
];

/** Revenue KPI on Today: payments taken today so far ($250). */
export const REVENUE_TODAY_CENTS = sum(TRANSACTIONS.filter((t) => t.day === "Oct 8").map((t) => t.cents));
/** Yesterday's payments ($500: Bea's session balance after $100 from her deposit pool). */
export const REVENUE_YESTERDAY_CENTS = sum(TRANSACTIONS.filter((t) => t.day === "Oct 7").map((t) => t.cents));

/** Commission records this week awaiting approval, one per paid session (Payments › Commissions). */
export interface CommissionRow {
  artist: ArtistId;
  client: string;
  when: string;
  serviceCents: number;
  artistCents: number;
  status: "Pending approval" | "Approved" | "Paid";
}

const RIO_PAY = ARTISTS.rio.pay;

export const COMMISSIONS: CommissionRow[] = [
  { artist: "dev", client: "Tomás V.", when: "Tue, Oct 6", serviceCents: 90000, artistCents: 54000, status: "Pending approval" },
  ...TRANSACTIONS.filter((t) => t.type === "Walk-in").map(
    (t): CommissionRow => ({
      artist: t.artist,
      client: t.client,
      when: "Tue, Oct 6",
      serviceCents: t.cents,
      artistCents: artistPayoutCents(RIO_PAY, t.cents),
      status: "Pending approval",
    }),
  ),
  { artist: "dev", client: "Bea L.", when: "Wed, Oct 7", serviceCents: 60000, artistCents: 36000, status: "Pending approval" },
];

/** "Commissions owed" KPI: $1,236 across 6 records pending approval (Tomás, Rio's 4 walk-ins, Bea). */
export const COMMISSIONS_OWED_CENTS = sum(COMMISSIONS.map((c) => c.artistCents));

/* ─── Analytics: last 8 weeks ─────────────────────────────────────────────── */

export interface WeekRevenue {
  /** Monday the week starts. */
  week: string;
  cents: Record<ArtistId, number>;
}

export const WEEKLY_REVENUE: WeekRevenue[] = [
  { week: "Aug 10", cents: { dev: 305000, mara: 264000, rio: 0 } },
  { week: "Aug 17", cents: { dev: 328000, mara: 272000, rio: 0 } },
  { week: "Aug 24", cents: { dev: 296000, mara: 258000, rio: 0 } },
  { week: "Aug 31", cents: { dev: 314000, mara: 281000, rio: 0 } },
  { week: "Sep 7", cents: { dev: 336000, mara: 269000, rio: 0 } },
  { week: "Sep 14", cents: { dev: 321000, mara: 287000, rio: 0 } },
  { week: "Sep 21", cents: { dev: 339000, mara: 276000, rio: 0 } },
  // Rio's guest spot started Fri, Oct 2.
  { week: "Sep 28", cents: { dev: 342000, mara: 291000, rio: 130000 } },
];

export function weekTotalCents(w: WeekRevenue): number {
  return w.cents.dev + w.cents.mara + w.cents.rio;
}

export const EIGHT_WEEK_REVENUE_CENTS = sum(WEEKLY_REVENUE.map(weekTotalCents));

/* ─── Week payouts (the last full week, Sep 28 – Oct 4) ───────────────────── */

export const PAYOUT_WEEK = { label: "Sep 28 – Oct 4", paidOn: "Tue, Oct 6" } as const;

const LAST_WEEK = WEEKLY_REVENUE[WEEKLY_REVENUE.length - 1];

export interface PayoutRow {
  artist: ArtistId;
  grossCents: number;
  payoutCents: number;
  studioCents: number;
  rule: string;
  /** "60% of $3,420", "$2,910 − $250 rent", "70% of $1,300". */
  math: string;
}

export const WEEK_PAYOUTS: PayoutRow[] = ARTIST_ORDER.map((id) => {
  const artist = ARTISTS[id];
  const grossCents = LAST_WEEK.cents[id];
  const payoutCents = artistPayoutCents(artist.pay, grossCents);
  const math =
    artist.pay.kind === "booth-rent"
      ? `${usd(grossCents)} − ${usd(artist.pay.weeklyRentCents)} rent`
      : `${artist.pay.artistPercent}% of ${usd(grossCents)}`;
  return { artist: id, grossCents, payoutCents, studioCents: grossCents - payoutCents, rule: payRuleLabel(artist.pay), math };
});

/** $7,630 gross · $5,622 paid out · $2,008 kept by the studio. */
export const WEEK_GROSS_CENTS = sum(WEEK_PAYOUTS.map((p) => p.grossCents));
export const WEEK_PAID_OUT_CENTS = sum(WEEK_PAYOUTS.map((p) => p.payoutCents));
export const WEEK_STUDIO_CENTS = WEEK_GROSS_CENTS - WEEK_PAID_OUT_CENTS;

/** Per-artist figures for the 8 weeks (Analytics › Artists). */
export interface ArtistStats {
  artist: ArtistId;
  sessions: number;
  noShows: number;
  /** Percent of clients who booked again; null for a guest on a short spot. */
  rebookPct: number | null;
  fillPct: number;
}

export const ARTIST_STATS: ArtistStats[] = [
  { artist: "dev", sessions: 38, noShows: 1, rebookPct: 71, fillPct: 86 },
  { artist: "mara", sessions: 52, noShows: 2, rebookPct: 64, fillPct: 81 },
  { artist: "rio", sessions: 9, noShows: 0, rebookPct: null, fillPct: 90 },
];

export function artistRevenueCents(id: ArtistId): number {
  return sum(WEEKLY_REVENUE.map((w) => w.cents[id]));
}

/**
 * Sittings each artist ran in the payout week (Payments › Commissions). Rio's
 * guest spot began Fri, Oct 2, so all of Rio's weekend sessions fall in it.
 */
export const PAYOUT_WEEK_SESSIONS: Record<ArtistId, number> = {
  dev: 5,
  mara: 7,
  rio: ARTIST_STATS.find((s) => s.artist === "rio")?.sessions ?? 0,
};

/** 99 sessions, 3 no-shows (3.0%). */
export const SESSIONS_8W = sum(ARTIST_STATS.map((a) => a.sessions));
export const NO_SHOWS_8W = sum(ARTIST_STATS.map((a) => a.noShows));
export const NO_SHOW_PCT_8W = Math.round((NO_SHOWS_8W / SESSIONS_8W) * 1000) / 10;

/** Analytics › Bookings: sessions by weekday (sums to 99). */
export const SESSIONS_BY_WEEKDAY: { day: string; sessions: number }[] = [
  { day: "Mon", sessions: 6 },
  { day: "Tue", sessions: 12 },
  { day: "Wed", sessions: 13 },
  { day: "Thu", sessions: 17 },
  { day: "Fri", sessions: 18 },
  { day: "Sat", sessions: 24 },
  { day: "Sun", sessions: 9 },
];

/** Analytics › Clients: 38 new + 61 returning = 99 sessions. */
export const NEW_VS_RETURNING = { newClients: 38, returning: 61 } as const;
/** Where the 38 new clients came from. */
export const ACQUISITION_SOURCES: { source: string; clients: number }[] = [
  { source: "Instagram", clients: 14 },
  { source: "Referral", clients: 9 },
  { source: "Booking page", clients: 8 },
  { source: "Walk-in", clients: 5 },
  { source: "Other", clients: 2 },
];

/* ─── The last 30 days: Wed, Sep 9 – Thu, Oct 8 (the app's default range) ─── */

/**
 * Completed sittings in the window: the payout week's 5 / 7 / 9 (Payments ›
 * Commissions), five each for Dev in the Sep 14 and Sep 21 weeks and seven for
 * Mara, four and five on Sep 9–13, then this week Tomás V. and Bea L. for Dev
 * and Rio's four walk-ins (13 for Rio, as on Guest artists). Today's bookings
 * are still open.
 */
export const SESSIONS_30D_BY_ARTIST: Record<ArtistId, number> = { dev: 21, mara: 26, rio: 13 };
export const NO_SHOWS_30D_BY_ARTIST: Record<ArtistId, number> = { dev: 0, mara: 1, rio: 0 };
export const CANCELLED_30D_BY_ARTIST: Record<ArtistId, number> = { dev: 1, mara: 2, rio: 0 };

const totalOf = (r: Record<ArtistId, number>) => sum(ARTIST_ORDER.map((id) => r[id]));
/** 60 completed sittings. */
export const SESSIONS_30D = totalOf(SESSIONS_30D_BY_ARTIST);
export const NO_SHOWS_30D = totalOf(NO_SHOWS_30D_BY_ARTIST);
export const CANCELLED_30D = totalOf(CANCELLED_30D_BY_ARTIST);
/** 69 bookings: completed, no-shows, cancellations and today's five still open. */
export const BOOKINGS_30D = SESSIONS_30D + NO_SHOWS_30D + CANCELLED_30D + TODAY_BOOKINGS.length;
/**
 * Bookings by scheduled day, Wed, Sep 9 – today (Analytics › Bookings "Booking
 * trend"; its weekday totals are "By day of week"). They sum to BOOKINGS_30D:
 * each week holds its sittings (9 · 12 · 12 · 21, Rio's nine on Oct 2–4) plus
 * one no-show or cancellation, then this week as the calendar shows it (Tue:
 * Tomás V. and Rio's four walk-ins; Wed: Bea L.; today's five).
 */
export const BOOKINGS_BY_DAY_30D: number[] = [
  2, 2, 2, 3, 1, // Wed Sep 9 – Sun Sep 13
  1, 1, 2, 2, 3, 3, 1, // Sep 14 – 20
  2, 1, 2, 2, 2, 3, 1, // Sep 21 – 27
  1, 1, 3, 3, 5, 6, 3, // Sep 28 – Oct 4
  0, 5, 1, 5, // Mon Oct 5 – today
];

/** New clients in the window: the Analytics KPI and the "New (last 30 days)" segment. */
export const NEW_CLIENTS_30D = 23;

/* ─── Money by day: Wed, Sep 9 – today ────────────────────────────────────── */

/*
 * Three windows, one set of books:
 * - the payout week, Sep 28 – Oct 4: $7,630 gross (WEEK_GROSS_CENTS);
 * - the last 30 days, Sep 9 – Oct 8 (Analytics' default range): REVENUE_30D_CENTS;
 * - this calendar month, Oct 1 – today (the Locations rollup): REVENUE_MONTH_CENTS.
 * All three read DAILY_REVENUE, so they can't disagree.
 */

export interface RevenueDay {
  /** "Sep 9" style. */
  label: string;
  cents: Record<ArtistId, number>;
}

const MONTH_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dayLabel = (d: Date) => `${MONTH_ABBR[d.getUTCMonth()]} ${d.getUTCDate()}`;

/**
 * A week's takings spread over the days each artist worked (weights: the
 * studio's usual weekday split, SESSIONS_BY_WEEKDAY), in $10 steps, the last
 * working day taking the remainder so the week sums exactly. Rio's guest spot
 * began Fri, Oct 2, so Rio's week is Fri–Sun.
 */
function splitWeek(id: ArtistId, weekCents: number): number[] {
  const weights = SESSIONS_BY_WEEKDAY.map((d) => d.sessions);
  const worked = id === "rio" ? [4, 5, 6] : [0, 1, 2, 3, 4, 5, 6];
  const weight = sum(worked.map((d) => weights[d] ?? 0));
  const days = [0, 0, 0, 0, 0, 0, 0];
  let left = weekCents;
  worked.forEach((d, i) => {
    const cents = i === worked.length - 1 ? left : Math.round((weekCents * (weights[d] ?? 0)) / weight / 1000) * 1000;
    days[d] = cents;
    left -= cents;
  });
  return days;
}

/**
 * Daily revenue for the 30 days. Through Sun, Oct 4 it is the weekly takings
 * (WEEKLY_REVENUE) spread by weekday; from Mon, Oct 5 it is the Payments
 * ledger itself (TRANSACTIONS): Leo B.'s deposit, Tuesday's $1,480, Bea L.'s
 * $500 yesterday and today's $250, as Today reports them.
 */
export const DAILY_REVENUE: RevenueDay[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(Date.UTC(TODAY_YEAR, 8, 9 + i));
  const label = dayLabel(date);
  const dow = (date.getUTCDay() + 6) % 7;
  const monday = dayLabel(new Date(Date.UTC(TODAY_YEAR, 8, 9 + i - dow)));
  const week = WEEKLY_REVENUE.find((w) => w.week === monday);
  const cents: Record<ArtistId, number> = { dev: 0, mara: 0, rio: 0 };
  for (const id of ARTIST_ORDER) {
    cents[id] = week
      ? (splitWeek(id, week.cents[id])[dow] ?? 0)
      : sum(TRANSACTIONS.filter((t) => t.day === label && t.artist === id).map((t) => t.cents));
  }
  return { label, cents };
});

const dayTotal = (d: RevenueDay) => sum(ARTIST_ORDER.map((id) => d.cents[id]));

/** Revenue over the last 30 days ($27,190), and each artist's share of it. */
export const REVENUE_30D_CENTS = sum(DAILY_REVENUE.map(dayTotal));
export const REVENUE_30D_BY_ARTIST: Record<ArtistId, number> = {
  dev: sum(DAILY_REVENUE.map((d) => d.cents.dev)),
  mara: sum(DAILY_REVENUE.map((d) => d.cents.mara)),
  rio: sum(DAILY_REVENUE.map((d) => d.cents.rio)),
};

/* ─── This calendar month: Thu, Oct 1 – today (the Locations rollup) ──────── */

/*
 * The app's Locations strip counts the calendar month (lib/locations/queries.ts):
 * every booking scheduled in October, whatever its status, and the succeeded
 * payments on those bookings.
 */

/** Deposits taken this month for November bookings (Kira N. and Bea L., today): not October money. */
const NOVEMBER_BOOKED = new Set(DEPOSITS.filter((d) => /Nov \d/.test(d.booking)).map((d) => d.client));
const NOVEMBER_DEPOSITS_CENTS = sum(
  TRANSACTIONS.filter((t) => t.type === "Deposit" && t.day.startsWith("Oct ") && NOVEMBER_BOOKED.has(t.client)).map((t) => t.cents),
);

/** Revenue on October bookings so far. */
export const REVENUE_MONTH_CENTS =
  sum(DAILY_REVENUE.filter((d) => d.label.startsWith("Oct ")).map(dayTotal)) - NOVEMBER_DEPOSITS_CENTS;

/** Sittings Thu, Oct 1 – Sun, Oct 4: the payout week's last four days (Dev 3 of his 5, Mara 5 of her 7, every one of Rio's). */
const OCT_1_TO_4_SESSIONS: Record<ArtistId, number> = { dev: 3, mara: 5, rio: PAYOUT_WEEK_SESSIONS.rio };
/** Mon, Oct 5 – Wed, Oct 7: every paid sitting in the ledger (Tomás V., Rio's four walk-ins, Bea L.). */
const OCT_5_TO_7_SESSIONS = TRANSACTIONS.filter((t) => t.type !== "Deposit" && ["Oct 5", "Oct 6", "Oct 7"].includes(t.day)).length;
/** Fri, Oct 9 – Sun, Oct 11: Leo B.'s cancelled Friday booking (a cancelled booking still counts) and Owen P.'s Saturday. */
const OCT_9_TO_11_BOOKINGS = [LATE_CANCEL.client, ...DEPOSITS_PENDING.filter((d) => /Oct \d/.test(d.booking)).map((d) => d.client)].length;
/** On the books for Mon, Oct 12 – Sat, Oct 31. */
const BOOKED_LATER_IN_OCTOBER = 19;

/** October bookings (49): Oct 1–7's sittings, today's five, this weekend's two and the rest of the month already booked. */
export const BOOKINGS_MONTH =
  totalOf(OCT_1_TO_4_SESSIONS) + OCT_5_TO_7_SESSIONS + TODAY_BOOKINGS.length + OCT_9_TO_11_BOOKINGS + BOOKED_LATER_IN_OCTOBER;

/* ─── Projects ────────────────────────────────────────────────────────────── */

export type ProjectId = "asha-koi" | "elena-back" | "bea-botanical" | "jo-florals" | "tomas-chest" | "sam-script" | "owen-panther";

/** App labels: projects/_proto/data.ts PROJ_STATUS. */
export type ProjectStatus = "planning" | "deposit_paid" | "active" | "healing" | "completed" | "on_hold" | "cancelled";
export const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
  planning: "Planning",
  deposit_paid: "Deposit Paid",
  active: "Active",
  healing: "Healing",
  completed: "Complete",
  on_hold: "On Hold",
  cancelled: "Cancelled",
};

export interface ProjectSession {
  n: number;
  date: string;
  state: "done" | "today" | "booked" | "not-booked";
  /** Deposit-pool money applied to this session. */
  appliedCents?: number;
  note?: string;
}

/** Client detail › deposit pool: Paid in / Applied / Available / Refundable. */
export interface DepositPool {
  paidInCents: number;
  appliedCents: number;
  availableCents: number;
  refundableCents: number;
}

export interface Project {
  id: ProjectId;
  client: string;
  title: string;
  artist: ArtistId;
  status: ProjectStatus;
  placement: string;
  sessions: ProjectSession[];
  pool: DepositPool;
  /** When the pool's deposit was paid (one deposit for the whole piece, before session 1). */
  poolPaidOn?: string;
}

function pool(paidInCents: number, appliedCents: number, refundableCents = 0): DepositPool {
  return { paidInCents, appliedCents, availableCents: paidInCents - appliedCents, refundableCents };
}

export const PROJECTS: Project[] = [
  {
    id: "asha-koi",
    client: "Asha M.",
    title: "Koi sleeve",
    artist: "dev",
    status: "active",
    placement: "Left arm, full sleeve",
    sessions: [
      { n: 1, date: "Sat, Jun 13", state: "done", note: "Outline" },
      { n: 2, date: "Sat, Jul 18", state: "done", note: "Koi and water" },
      { n: 3, date: "Thu, Sep 10", state: "done", appliedCents: 6000, note: "Color, upper arm" },
      { n: 4, date: "Thu, Oct 8, 10:00", state: "today", note: "Color, forearm" },
      { n: 5, date: "Sat, Nov 7, 11:00", state: "booked", note: "Background and finish" },
    ],
    // One deposit for the whole piece: $300 paid Thu, Jun 4, before session 1 →
    // $60 applied to session 3 → $240 held for sessions 4–5 ($120 each).
    pool: pool(30000, 6000),
    poolPaidOn: "Thu, Jun 4",
  },
  {
    id: "elena-back",
    client: "Elena R.",
    title: "Back piece",
    artist: "dev",
    status: "active",
    placement: "Upper back",
    sessions: [
      { n: 1, date: "Sat, Aug 22", state: "done", appliedCents: 16000, note: "Linework · reacted to red after" },
      { n: 2, date: "Thu, Oct 8, 1:30", state: "today", note: "Shading, no red" },
      { n: 3, date: "Not booked", state: "not-booked", note: "Patch test first, Thu, Nov 5" },
    ],
    // $320 paid in Tue, Aug 11 → $160 applied to session 1 → $160 held for session 3.
    // Session 2 (today) is paid at checkout, so nothing of hers is held for today.
    pool: pool(32000, 16000),
    poolPaidOn: "Tue, Aug 11",
  },
  {
    id: "bea-botanical",
    client: "Bea L.",
    title: "Botanical half sleeve",
    artist: "dev",
    status: "active",
    placement: "Right upper arm",
    sessions: [
      { n: 1, date: "Sat, Sep 12", state: "done", appliedCents: 10000 },
      { n: 2, date: "Wed, Oct 7", state: "done", appliedCents: 10000 },
      { n: 3, date: "Tue, Nov 10, 2:00", state: "booked" },
    ],
    pool: pool(30000, 20000),
  },
  {
    id: "jo-florals",
    client: "Jo K.",
    title: "Fine-line florals",
    artist: "mara",
    // Her $100 consult deposit sits in the pool, so the app files her under Deposit Paid.
    status: "deposit_paid",
    placement: "Forearm, palm-sized",
    sessions: [{ n: 1, date: "Consult today, 11:00", state: "today" }],
    pool: pool(10000, 0),
  },
  {
    id: "tomas-chest",
    client: "Tomás V.",
    title: "Chest panel",
    artist: "dev",
    status: "active",
    placement: "Chest",
    sessions: [
      { n: 1, date: "Tue, Oct 6", state: "done" },
      { n: 2, date: "On the waitlist", state: "not-booked" },
      { n: 3, date: "Not booked", state: "not-booked" },
    ],
    pool: pool(0, 0),
  },
  {
    id: "sam-script",
    client: "Sam T.",
    title: "Forearm script",
    artist: "mara",
    status: "healing",
    placement: "Inner forearm",
    sessions: [
      { n: 1, date: "Sat, Sep 12", state: "done" },
      { n: 2, date: "Touch-up today, 4:30", state: "today" },
    ],
    pool: pool(0, 0),
  },
  {
    id: "owen-panther",
    client: "Owen P.",
    title: "Traditional panther",
    artist: "dev",
    status: "completed",
    placement: "Forearm",
    sessions: [{ n: 1, date: "Sat, Aug 15", state: "done" }],
    pool: pool(0, 0),
  },
];

export const ASHA_PROJECT = PROJECTS[0];
/** "In deposit pools" KPI on Projects: $600. */
export const IN_DEPOSIT_POOLS_CENTS = sum(PROJECTS.map((p) => p.pool.availableCents));

/* ─── Clients ─────────────────────────────────────────────────────────────── */

export interface ClientFlag {
  label: string;
  tone: "danger" | "warning" | "info" | "neutral";
}

export interface ClientRow {
  name: string;
  initials: string;
  artist: ArtistId;
  visits: number;
  lastVisit: string;
  nextVisit: string;
  /** Paid to date, deposits included. */
  spendCents: number;
  flags: ClientFlag[];
}

export const CLIENTS: ClientRow[] = [
  { name: "Asha M.", initials: "AM", artist: "dev", visits: 3, lastVisit: "Thu, Sep 10", nextVisit: "Sat, Nov 7", spendCents: 240000, flags: [] },
  { name: "Elena R.", initials: "ER", artist: "dev", visits: 1, lastVisit: "Sat, Aug 22", nextVisit: "Today, 1:30", spendCents: 80000, flags: [{ label: "Red ink allergy", tone: "danger" }] },
  { name: "Priya S.", initials: "PS", artist: "mara", visits: 0, lastVisit: "—", nextVisit: "Today, 1:00", spendCents: 8000, flags: [{ label: "Consent missing", tone: "warning" }] },
  { name: "Jo K.", initials: "JK", artist: "mara", visits: 0, lastVisit: "—", nextVisit: "Today, 11:00", spendCents: 10000, flags: [{ label: "New client", tone: "info" }] },
  { name: "Sam T.", initials: "ST", artist: "mara", visits: 1, lastVisit: "Sat, Sep 12", nextVisit: "Today, 4:30", spendCents: 26000, flags: [] },
  { name: "Leo B.", initials: "LB", artist: "mara", visits: 1, lastVisit: "Sat, Aug 15", nextVisit: "—", spendCents: 47000, flags: [{ label: "Late cancel", tone: "neutral" }] },
  { name: "Bea L.", initials: "BL", artist: "dev", visits: 2, lastVisit: "Wed, Oct 7", nextVisit: "Tue, Nov 10", spendCents: 130000, flags: [] },
  { name: "Tomás V.", initials: "TV", artist: "dev", visits: 1, lastVisit: "Tue, Oct 6", nextVisit: "Waitlist", spendCents: 90000, flags: [] },
  { name: "Owen P.", initials: "OP", artist: "dev", visits: 1, lastVisit: "Sat, Aug 15", nextVisit: "Sat, Oct 10", spendCents: 52000, flags: [{ label: "Deposit pending", tone: "warning" }] },
  { name: "Kira N.", initials: "KN", artist: "mara", visits: 0, lastVisit: "—", nextVisit: "Sat, Nov 14", spendCents: 15000, flags: [{ label: "New client", tone: "info" }] },
];

/** Asha's number, as the Messages context rail heads her record with it (555-01xx is reserved for fiction). */
export const ASHA_CONTACT = { phone: "(555) 010-2286" } as const;

/** Elena's contact line on her client file (555-01xx and example.com are reserved for fiction). */
export const ELENA_CONTACT = { phone: "(555) 010-4417", email: "elena.r@example.com", instagram: "elena.r.ink" } as const;

/** Elena's allergy note, word for word everywhere it appears. */
export const ELENA_ALLERGY = {
  client: "Elena R.",
  flag: "Red ink allergy",
  note: "Reacted after session 1 in August. No red today. Patch test before session 3.",
  consent: "Consent signed 9:42 on her phone",
} as const;

/* ─── Messages (SMS and email are the live channels) ──────────────────────── */

export type Channel = "SMS" | "Email";

export interface Thread {
  client: string;
  initials: string;
  channel: Channel;
  preview: string;
  time: string;
  unread: boolean;
}

export const THREADS: Thread[] = [
  { client: "Jo K.", initials: "JK", channel: "SMS", preview: "Running 5 min late, sorry!", time: "10:36", unread: true },
  { client: "Kira N.", initials: "KN", channel: "Email", preview: "Any chance of something before Nov 14?", time: "9:48", unread: true },
  { client: "Elena R.", initials: "ER", channel: "SMS", preview: "Signed the form. No red, noted.", time: "9:43", unread: false },
  { client: "Priya S.", initials: "PS", channel: "SMS", preview: "Is there parking near you?", time: "9:15", unread: false },
  { client: "Owen P.", initials: "OP", channel: "Email", preview: "Will pay the deposit tonight.", time: "Wed", unread: false },
];

export const UNREAD_THREADS = THREADS.filter((t) => t.unread).length;

export interface ThreadMessage {
  from: "client" | "studio";
  text: string;
  time: string;
  /** Who sent it from the studio side. */
  by?: string;
}

/** The open thread on the Messages mockup. */
export const JO_THREAD: ThreadMessage[] = [
  { from: "client", text: "Hi! I'd like a consult for fine-line florals on my forearm, about palm-sized.", time: "Tue, 2:14 PM" },
  { from: "studio", by: "Mara", text: "Booked you for Thursday, Oct 8 at 11:00. Bring any references. The $100 deposit goes toward your first session.", time: "Tue, 2:31 PM" },
  { from: "client", text: "Running 5 min late, sorry!", time: "10:36 AM" },
];

/** Suggested reply the artist approves before it sends (never sends on its own). */
export const JO_SUGGESTED_REPLY = "No problem, Jo. Mara will see you at 11:05.";

/* ─── Forms ───────────────────────────────────────────────────────────────── */

export interface Submission {
  client: string;
  form: string;
  session: string;
  status: "Signed" | "Sent";
  when: string;
  via: "Phone" | "Kiosk" | "Link";
}

export const SUBMISSIONS: Submission[] = [
  { client: "Asha M.", form: "Tattoo consent — general", session: "Koi sleeve, session 4", status: "Signed", when: "Today, 9:51", via: "Kiosk" },
  { client: "Elena R.", form: "Tattoo consent — general", session: "Back piece, session 2", status: "Signed", when: "Today, 9:42", via: "Phone" },
  { client: "Sam T.", form: "Tattoo consent — general", session: "Touch-up, forearm script", status: "Signed", when: "Today, 8:57", via: "Phone" },
  { client: "Priya S.", form: "Tattoo consent — general", session: "Fine-line wildflowers", status: "Sent", when: "Sent Tue, Oct 6", via: "Link" },
  { client: "Jo K.", form: "Medical history", session: "Consult", status: "Signed", when: "Tue, Oct 6", via: "Link" },
];

/** Consents signed today so far (Asha, Elena, Sam): before today's sittings. */
const CONSENTS_SIGNED_TODAY = SUBMISSIONS.filter(
  (s) => s.form === "Tattoo consent — general" && s.status === "Signed" && s.when.startsWith("Today"),
).length;

/**
 * Template names from forms/_proto/lib.tsx, with forms signed in the last 30 days.
 * Every sitting needs a consent, so consent = the window's completed sittings plus
 * today's signed so far (63 of its 69 bookings); aftercare is acknowledged at the
 * end of each completed sitting; medical history is each new client's intake.
 * None can exceed the window's bookings.
 */
export const FORM_TEMPLATES: { name: string; kind: string; submissions30d: number }[] = [
  { name: "Tattoo consent — general", kind: "Consent", submissions30d: SESSIONS_30D + CONSENTS_SIGNED_TODAY },
  { name: "Medical history", kind: "Intake", submissions30d: NEW_CLIENTS_30D },
  { name: "Aftercare acknowledgement", kind: "Aftercare", submissions30d: SESSIONS_30D },
  { name: "Touch-up waiver", kind: "Waiver", submissions30d: 4 },
  { name: "Minor / guardian consent", kind: "Consent", submissions30d: 1 },
  { name: "Photo & social release", kind: "Release", submissions30d: 34 },
];

/* ─── Inventory ───────────────────────────────────────────────────────────── */

export interface InventoryItem {
  name: string;
  category: "Ink" | "Needles" | "Supplies";
  onHand: number;
  unit: string;
  reorderAt: number;
  unitCostCents: number;
  /** Inks only: listed in the studio's Ink registry as REACH-registered. */
  reach?: boolean;
  batch?: string;
}

export const INVENTORY: InventoryItem[] = [
  { name: "Black lining ink, 8 oz", category: "Ink", onHand: 1, unit: "bottle", reorderAt: 2, unitCostCents: 3800, reach: true, batch: "B-2291" },
  { name: "Black shading ink, 4 oz", category: "Ink", onHand: 5, unit: "bottle", reorderAt: 2, unitCostCents: 2400, reach: true, batch: "B-2307" },
  { name: "Red, 1 oz", category: "Ink", onHand: 3, unit: "bottle", reorderAt: 1, unitCostCents: 1600, reach: true, batch: "R-0418" },
  { name: "White highlight, 1 oz", category: "Ink", onHand: 4, unit: "bottle", reorderAt: 1, unitCostCents: 1500, reach: true, batch: "W-1120" },
  { name: "Sky blue, 1 oz", category: "Ink", onHand: 2, unit: "bottle", reorderAt: 1, unitCostCents: 1600, reach: false, batch: "S-0093" },
  { name: "Cartridges 3RL", category: "Needles", onHand: 3, unit: "box", reorderAt: 5, unitCostCents: 2200 },
  { name: "Cartridges 9RM", category: "Needles", onHand: 12, unit: "box", reorderAt: 4, unitCostCents: 2400 },
  { name: "Nitrile gloves, M", category: "Supplies", onHand: 8, unit: "box", reorderAt: 4, unitCostCents: 1100 },
];

/** SKUs as this studio set them up (Inventory's SKU column, Today's Low inventory card). */
export const INVENTORY_SKU: Record<string, string> = {
  "Black lining ink, 8 oz": "INK-BLK-L8",
  "Black shading ink, 4 oz": "INK-BLK-S4",
  "Red, 1 oz": "INK-RED-1",
  "White highlight, 1 oz": "INK-WHT-1",
  "Sky blue, 1 oz": "INK-BLU-1",
  "Cartridges 3RL": "NDL-3RL",
  "Cartridges 9RM": "NDL-9RM",
  "Nitrile gloves, M": "SUP-GLV-M",
};

export const INVENTORY_LOW = INVENTORY.filter((i) => i.onHand <= i.reorderAt);
export const INVENTORY_INKS = INVENTORY.filter((i) => i.category === "Ink");
export const INVENTORY_REACH = INVENTORY_INKS.filter((i) => i.reach);
export const INVENTORY_VALUE_CENTS = sum(INVENTORY.map((i) => i.onHand * i.unitCostCents));

/* ─── Needs attention (the /inbox task feed) ──────────────────────────────── */

/**
 * The queue as lib/inbox/queue.ts builds it from this studio's data, in its
 * words (title, subtitle, action). The sidebar badge counts these rows, and
 * the Needs attention screen draws them. Allergies aren't queue items; they sit
 * on Today's banner, the client file and the briefing.
 *
 * Lanes follow lib/inbox/urgency.ts at 10:40 on Thursday: Priya's unsigned
 * consent is for 1:00 today, under 24 hours out, so it is "now" (drawn as
 * Overdue); low stock always lands in Today; Owen's booking is Sat 1:00, 50
 * hours out, so his pending deposit falls to This week.
 */
export interface AttentionItem {
  key: string;
  kind: "form" | "stock" | "deposit";
  title: string;
  sub: string;
  action: "View booking" | "Reorder";
  lane: "overdue" | "today" | "week";
  /** The row's relative stamp (inbox adapt.ts relativeTime): "now", "15h", "2d". */
  time: string;
  unread?: boolean;
}

const PRIYA_FORM = SUBMISSIONS.find((f) => f.client === "Priya S." && f.status === "Sent");
const OWEN_DEPOSIT = DEPOSITS_PENDING.find((d) => d.client === "Owen P.");

export const NEEDS_ATTENTION: AttentionItem[] = [
  ...(PRIYA_FORM
    ? [{ key: "form-priya", kind: "form" as const, title: "Consent form unsigned", sub: PRIYA_FORM.client, action: "View booking" as const, lane: "overdue" as const, time: "2d", unread: true }]
    : []),
  // queue.ts skips an item once current_stock >= min_threshold.
  ...INVENTORY.filter((i) => i.onHand < i.reorderAt).map((i) => ({
    key: `stock-${i.name}`,
    kind: "stock" as const,
    title: `Low inventory · ${i.name}`,
    sub: `Stock ${i.onHand} · threshold ${i.reorderAt}`,
    action: "Reorder" as const,
    lane: "today" as const,
    time: "now",
  })),
  ...(OWEN_DEPOSIT
    ? [{ key: "deposit-owen", kind: "deposit" as const, title: "Deposit pending", sub: OWEN_DEPOSIT.client, action: "View booking" as const, lane: "week" as const, time: "15h" }]
    : []),
];

/* ─── Marketing ───────────────────────────────────────────────────────────── */

/** Preset segments (components/marketing/SegmentPresetChips.tsx) with this studio's counts. */
export const SEGMENTS: { label: string; description: string; clients: number }[] = [
  { label: "All clients", description: "Everyone in your CRM", clients: 412 },
  { label: "Inactive 90 days", description: "No visit in 90 days", clients: 96 },
  { label: "New (last 30 days)", description: "Joined in the last 30 days", clients: NEW_CLIENTS_30D },
  { label: "Top spenders", description: "Lifetime spend over $1,000", clients: 41 },
  { label: "Booked next 14 days", description: "Upcoming appointments", clients: 37 },
];

/** A preset segment's size, so a campaign's recipients always match its audience chip. */
function segmentClients(label: string): number {
  return SEGMENTS.find((s) => s.label === label)?.clients ?? 0;
}

export interface Campaign {
  name: string;
  channel: Channel;
  audience: string;
  recipients: number;
  status: "Sent" | "Scheduled" | "Draft";
  when: string;
  booked?: number;
}

export const CAMPAIGNS: Campaign[] = [
  { name: "Healed, not rebooked", channel: "Email", audience: "Custom segment", recipients: 58, status: "Sent", when: "Tue, Sep 29", booked: 6 },
  { name: "Friday the 13th flash", channel: "SMS", audience: "All clients", recipients: segmentClients("All clients"), status: "Scheduled", when: "Thu, Nov 5" },
  { name: "Openings this month", channel: "Email", audience: "Inactive 90 days", recipients: segmentClients("Inactive 90 days"), status: "Draft", when: "—" },
];

/** Pro includes 2,000 texts a month. */
export const TEXTS_THIS_MONTH = { used: 312, included: 2000 } as const;

/** Waitlist statuses from marketing/_components/WaitlistFilterPills.tsx. */
export interface WaitlistEntry {
  client: string;
  artist: ArtistId;
  wants: string;
  when: string;
  status: "Active" | "Offered" | "Booked" | "Expired" | "Cancelled";
  note: string;
}

export const WAITLIST: WaitlistEntry[] = [
  { client: "Nadia H.", artist: "mara", wants: "Fine-line, small", when: "Fri or Sat", status: "Offered", note: "Offered Fri, Oct 9, 11:00 (Leo B.'s slot)" },
  { client: "Tomás V.", artist: "dev", wants: "Chest panel, session 2", when: "Weekday afternoons", status: "Active", note: "Joined Tue, Oct 6" },
  { client: "Kira N.", artist: "mara", wants: "Fine-line wrist", when: "Before Sat, Nov 14", status: "Active", note: "Booked Nov 14, wants earlier" },
];

/**
 * Nadia H.'s offer went out Wed, Oct 7, 6:40 PM, after Leo B. cancelled, with
 * the app's default 24-hour hold (lib/waitlist/offer.ts DEFAULT_OFFER_HOURS),
 * so it lapses today at 6:40 PM.
 */
export const WAITLIST_OFFER_EXPIRES = { label: "Today, 6:40 PM", minutes: 18 * 60 + 40 } as const;

/** Referral program over the last 8 weeks: 9 referred clients booked (matches ACQUISITION_SOURCES). */
export const REFERRAL = {
  referrerReward: "$25 credit",
  referredReward: "$25 off the first session",
  trigger: "Booking completed",
  codesShared: 31,
  booked: 9,
  creditIssuedCents: 9 * 2500,
} as const;

/* ─── Flash, flash events, portfolio ──────────────────────────────────────── */

export interface FlashEvent {
  name: string;
  date: string;
  artists: ArtistId[];
  slots: number;
  booked: number;
  priceCents: number;
  status: "Scheduled" | "Completed";
}

export const FLASH_EVENTS: FlashEvent[] = [
  { name: "Friday the 13th flash", date: "Fri, Nov 13", artists: ["dev", "mara"], slots: 24, booked: 9, priceCents: 13000, status: "Scheduled" },
  { name: "Summer flash day", date: "Sat, Aug 15", artists: ["dev", "mara"], slots: 20, booked: 18, priceCents: 13000, status: "Completed" },
];

export function flashEventValueCents(e: FlashEvent): number {
  return e.booked * e.priceCents;
}

export interface FlashPiece {
  label: string;
  title: string;
  /** The portfolio's style name (portfolio/_proto/data.ts). */
  style: string;
  artist: ArtistId;
  priceCents: number;
  status: "Available" | "Reserved";
}

/** Flash library. Tiles print the design's name and style ("Dagger and rose", "Traditional"), never drawn art. */
export const FLASH: FlashPiece[] = [
  { label: "F1", title: "Dagger and rose", style: "Traditional", artist: "rio", priceCents: 18000, status: "Available" },
  { label: "F2", title: "Moth", style: "Fine-line", artist: "mara", priceCents: 14000, status: "Reserved" },
  { label: "F3", title: "Snake coil", style: "Traditional", artist: "rio", priceCents: 22000, status: "Available" },
  { label: "F4", title: "Peony sprig", style: "Botanical", artist: "mara", priceCents: 12000, status: "Available" },
  { label: "F5", title: "Swallow pair", style: "Traditional", artist: "rio", priceCents: 15000, status: "Available" },
  { label: "F6", title: "Wave crest", style: "Japanese", artist: "dev", priceCents: 20000, status: "Reserved" },
];

export const FLASH_AVG_PRICE_CENTS = Math.round(sum(FLASH.map((f) => f.priceCents)) / FLASH.length);

export interface PortfolioPiece {
  label: string;
  title: string;
  artist: ArtistId;
  style: string;
  healed: boolean;
  featured: boolean;
}

/** Portfolio. Tiles show the label ("P1"), never drawn art. */
export const PORTFOLIO: PortfolioPiece[] = [
  // Session 2 (Sat, Jul 18): its healed photo came in Aug 1. Session 3's healed photo is still due.
  { label: "P1", title: "Koi sleeve, session 2", artist: "dev", style: "Japanese", healed: true, featured: true },
  { label: "P2", title: "Fine-line peonies", artist: "mara", style: "Fine-line", healed: true, featured: true },
  { label: "P3", title: "Back piece linework", artist: "dev", style: "Blackwork", healed: false, featured: false },
  { label: "P4", title: "Forearm script", artist: "mara", style: "Lettering", healed: true, featured: false },
  { label: "P5", title: "Botanical half sleeve, session 1", artist: "dev", style: "Botanical", healed: true, featured: true },
  { label: "P6", title: "Traditional panther", artist: "dev", style: "Traditional", healed: true, featured: false },
];

/* ─── AI design (Jo K.'s consult) ─────────────────────────────────────────── */

/**
 * Mara's brief for Jo's consult: her own notes (placement, size, style,
 * palette), typed into the brief. Nothing is drafted or drawn by AI; the
 * references are Jo's own uploads.
 */
export const AI_BRIEF = {
  client: "Jo K.",
  artist: "mara" as ArtistId,
  request: "Fine-line florals on my forearm, about palm-sized. Peonies, maybe a sprig of lavender.",
  placement: "Inner forearm",
  size: "About 4 × 3 in",
  style: "Fine-line, single needle",
  palette: "Black and grey, no fill",
  references: ["R1", "R2", "R3", "R4"],
  notes: "Keep stems loose so it can extend toward the wrist later.",
} as const;

/* ─── Locations ───────────────────────────────────────────────────────────── */

export interface LocationRow {
  name: string;
  status: "Open" | "Setting up";
  artists: number;
  /** This calendar month, Oct 1 – today, as the app's Locations rollup counts it. */
  bookings: number;
  revenueCents: number;
  note: string;
}

export const LOCATIONS: LocationRow[] = [
  {
    name: "Downtown",
    status: "Open",
    artists: ARTIST_ORDER.length,
    bookings: BOOKINGS_MONTH,
    revenueCents: REVENUE_MONTH_CENTS,
    note: "Main studio",
  },
  { name: "Eastside", status: "Setting up", artists: 0, bookings: 0, revenueCents: 0, note: "Opens Sat, Nov 14" },
];
