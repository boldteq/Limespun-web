import { Check, Download, ListFilter, Scale, Settings2 } from "lucide-react";
import { cn } from "@/components/system/cn";
import { AppFrame } from "./app-frame";
import {
  AppAvatar,
  AppButton,
  AppCard,
  AppKpiStrip,
  AppStatus,
  AppTable,
  AppTabs,
  type AppTableRow,
} from "./app-parts";
import { ToolbarListRow, ToolbarSelect } from "./projects";
import {
  ARTIST_ORDER,
  ARTIST_STATS,
  artistPayoutCents,
  ARTISTS,
  COMMISSIONS,
  COMMISSIONS_OWED_CENTS,
  DEPOSITS_PENDING,
  DEPOSITS_PENDING_CENTS,
  PAYOUT_WEEK,
  REVENUE_TODAY_CENTS,
  TRANSACTIONS,
  usd,
  WEEK_PAID_OUT_CENTS,
  WEEK_PAYOUTS,
  WEEKLY_REVENUE,
  type ArtistId,
  type Transaction,
} from "./sample-data";

export type PaymentsTab = "transactions" | "commissions" | "payroll" | "disputes";

const TAB_LABEL: Record<PaymentsTab, string> = {
  transactions: "Transactions",
  commissions: "Commissions",
  payroll: "Payroll",
  disputes: "Disputes",
};

function ArtistCell({ id, sub }: { id: ArtistId; sub?: string }) {
  const a = ARTISTS[id];
  return (
    <span className="flex items-center gap-2">
      <AppAvatar initials={a.initials} tone={a.tone} size={sub ? "md" : "sm"} />
      <span className="min-w-0">
        <span className="block font-semibold text-app-text">{a.name}</span>
        {sub && <span className="block text-ui-xs text-app-mute">{sub}</span>}
      </span>
    </span>
  );
}

/* ─── Transactions ────────────────────────────────────────────────────────── */

/**
 * The payments ledger (sample-data TRANSACTIONS), newest first, one row per
 * payment, dated by when it went through. Leo B.'s $150 deposit was paid Mon,
 * Oct 5 and kept by the studio when he cancelled late on Wed, so it sits at its
 * payment date as a Deposit, not as a Wednesday charge (Today's "vs $500
 * yesterday" is Bea L.'s balance alone).
 */
export interface LedgerRow extends Transaction {
  /** Kept by the studio after a late cancel. */
  kept?: boolean;
}

export const PAYMENTS_LEDGER: LedgerRow[] = TRANSACTIONS.map((t) => ({ ...t, kept: t.status === "Kept" }));

/** Payment state chips (components/ui/status-badge.tsx). */
function TxnStatus({ status }: { status: Transaction["status"] }) {
  return status === "Pending" ? (
    <AppStatus tone="warning" dot>
      Pending
    </AppStatus>
  ) : (
    <AppStatus tone="success" dot>
      Succeeded
    </AppStatus>
  );
}

/** The Type column is the app's TYPE_LABEL word alone, with no annotation (Leo B.'s kept deposit reads "Deposit"). */
function txnType(t: LedgerRow): string {
  return t.method;
}

const TXN_COLUMNS = [
  { label: "Date" },
  { label: "Client" },
  { label: "Artist" },
  { label: "Amount", align: "right" as const },
  { label: "Type" },
  { label: "Status" },
];

function Transactions({ view }: { view: "all" | "pending-deposits" }) {
  const rows: AppTableRow[] =
    view === "pending-deposits"
      ? DEPOSITS_PENDING.map((d) => ({
          key: d.client,
          tone: "active" as const,
          cells: [
            <span key="d" className="text-app-mute">
              {d.note}
            </span>,
            <span key="c" className="font-semibold">
              {d.client}
              <span className="block text-ui-xs font-normal text-app-mute">{d.booking}</span>
            </span>,
            <ArtistCell key="a" id={d.artist} />,
            <span key="m" className="font-semibold">
              {usd(d.cents)}
            </span>,
            "Deposit",
            <TxnStatus key="s" status="Pending" />,
          ],
        }))
      : PAYMENTS_LEDGER.map((t) => ({
          key: `${t.when}-${t.client}`,
          cells: [
            <span key="d" className="text-app-mute">
              {t.when}
            </span>,
            <span key="c" className="font-semibold">
              {t.client}
            </span>,
            <ArtistCell key="a" id={t.artist} />,
            <span key="m" className="font-semibold">
              {usd(t.cents)}
            </span>,
            <span key="t" className="text-app-soft">
              {txnType(t)}
            </span>,
            <TxnStatus key="s" status={t.status} />,
          ],
        }));

  return (
    <>
      <AppKpiStrip
        items={[
          { label: "Today's revenue", value: usd(REVENUE_TODAY_CENTS), note: "succeeded today" },
          {
            label: "Pending deposits",
            value: usd(DEPOSITS_PENDING_CENTS),
            note: `${DEPOSITS_PENDING.length} awaiting capture`,
            accent: view === "pending-deposits",
          },
          { label: "Refunds", value: usd(0), note: "0 recorded" },
          { label: "Transactions", value: String(PAYMENTS_LEDGER.length), note: "most recent" },
        ]}
      />
      <AppCard
        padded={false}
        title={
          <>
            <span className="hidden @min-[25rem]:inline">Recent transactions</span>
            <span className="hidden @min-[19rem]:inline @min-[25rem]:hidden">Recent</span>
          </>
        }
        meta={
          <>
            <ToolbarSelect icon={ListFilter} label={view === "pending-deposits" ? "Pending deposits" : "All transactions"} className="h-7" />
            <AppButton icon={Download} className="hidden h-7 @xl:inline-flex">
              Export
            </AppButton>
          </>
        }
      >
        <div className="@xl:hidden">
          {view === "pending-deposits"
            ? DEPOSITS_PENDING.map((d, i) => (
                <ToolbarListRow
                  key={d.client}
                  title={d.client}
                  sub={`${d.booking} · ${d.note}`}
                  value={usd(d.cents)}
                  status={<TxnStatus status="Pending" />}
                  last={i === DEPOSITS_PENDING.length - 1}
                />
              ))
            : PAYMENTS_LEDGER.map((t, i) => (
                <ToolbarListRow
                  key={`${t.when}-${t.client}`}
                  title={t.client}
                  sub={`${t.when.split(", ").slice(0, 2).join(", ")} · ${txnType(t)}`}
                  value={usd(t.cents)}
                  status={<TxnStatus status={t.status} />}
                  last={i === PAYMENTS_LEDGER.length - 1}
                />
              ))}
        </div>
        <AppTable columns={TXN_COLUMNS} rows={rows} minWidth={720} className="hidden @xl:block" />
      </AppCard>
    </>
  );
}

/* ─── Commissions ─────────────────────────────────────────────────────────── */

/**
 * "Artist commissions" as ScrPayments draws it (adapt.ts adaptCommissions): one
 * row per artist across the whole commission ledger (the query has no date
 * filter), Sessions · Gross · Commission · Status, and an Approve button on a
 * row that still has records pending. A row reads Pending while any of its
 * records is (Dev: Tomás V. and Bea L.; Rio: his four Tuesday walk-ins) and
 * Paid once all are. The paid history is every week on record, Aug 10 – Oct 4,
 * settled by its payroll run (the last went out Tue, Oct 6). Card KPIs derive
 * from these rows, as the app's do: "Paid to date" sums only the rows that are
 * wholly paid.
 */
type CommissionState = "Pending" | "Paid";

interface ArtistCommissionRow {
  artist: ArtistId;
  sessions: number;
  grossCents: number;
  commissionCents: number;
  owedCents: number;
  state: CommissionState;
}

const PAID_SESSIONS: Record<ArtistId, number> = {
  dev: ARTIST_STATS.find((s) => s.artist === "dev")?.sessions ?? 0,
  mara: ARTIST_STATS.find((s) => s.artist === "mara")?.sessions ?? 0,
  rio: ARTIST_STATS.find((s) => s.artist === "rio")?.sessions ?? 0,
};

const COMMISSION_ROWS: ArtistCommissionRow[] = ARTIST_ORDER.map((id) => {
  const paidGross = WEEKLY_REVENUE.reduce((total, w) => total + w.cents[id], 0);
  const paidCommission = WEEKLY_REVENUE.reduce((total, w) => total + (w.cents[id] > 0 ? artistPayoutCents(ARTISTS[id].pay, w.cents[id]) : 0), 0);
  const pending = COMMISSIONS.filter((c) => c.artist === id && c.status === "Pending approval");
  const owedCents = pending.reduce((total, c) => total + c.artistCents, 0);
  return {
    artist: id,
    sessions: PAID_SESSIONS[id] + pending.length,
    grossCents: paidGross + pending.reduce((total, c) => total + c.serviceCents, 0),
    commissionCents: paidCommission + owedCents,
    owedCents,
    state: pending.length > 0 ? ("Pending" as const) : ("Paid" as const),
  };
}).sort((a, b) => b.commissionCents - a.commissionCents);

const PENDING_RECORDS = COMMISSIONS.filter((c) => c.status === "Pending approval").length;
const PAID_ROWS = COMMISSION_ROWS.filter((r) => r.state === "Paid");
const PAID_TO_DATE_CENTS = PAID_ROWS.reduce((total, r) => total + r.commissionCents, 0);
const STUDIO_RETAINS_CENTS = COMMISSION_ROWS.reduce((total, r) => total + r.grossCents - r.commissionCents, 0);

function CommissionStatus({ state }: { state: CommissionState }) {
  return (
    <AppStatus tone={state === "Paid" ? "success" : "warning"} dot>
      {state}
    </AppStatus>
  );
}

function ApproveButton({ className }: { className?: string }) {
  return (
    <AppButton icon={Check} className={cn("h-7 px-2.5 text-ui-xs", className)}>
      Approve
    </AppButton>
  );
}

function Commissions() {
  const rows: AppTableRow[] = COMMISSION_ROWS.map((r) => ({
    key: r.artist,
    cells: [
      <ArtistCell key="a" id={r.artist} />,
      r.sessions,
      <span key="g" className="text-app-soft">
        {usd(r.grossCents)}
      </span>,
      <span key="c" className="font-bold">
        {usd(r.commissionCents)}
      </span>,
      <CommissionStatus key="s" state={r.state} />,
      r.state === "Pending" ? <ApproveButton key="x" /> : null,
    ],
  }));

  return (
    <>
      <AppKpiStrip
        items={[
          {
            label: "Commissions owed",
            value: usd(COMMISSIONS_OWED_CENTS),
            // Records awaiting approval, the count Today's tile carries, so the two agree.
            note: `${PENDING_RECORDS} pending approval`,
            accent: true,
          },
          { label: "Approved", value: usd(0), note: "ready to pay" },
          { label: "Paid to date", value: usd(PAID_TO_DATE_CENTS), note: `${PAID_ROWS.length} artist${PAID_ROWS.length === 1 ? "" : "s"}` },
          { label: "Studio retains", value: usd(STUDIO_RETAINS_CENTS), note: "after commission" },
        ]}
      />
      <AppCard
        padded={false}
        title={
          <span className="flex flex-col leading-tight">
            <span>
              <span className="hidden @min-[20rem]:inline">Artist commissions</span>
              <span className="@min-[20rem]:hidden">Commissions</span>
            </span>
            <span className="text-ui-xs font-normal whitespace-normal text-app-mute">
              {COMMISSION_ROWS.length} records · gross vs commission
            </span>
          </span>
        }
        meta={
          <AppButton variant="ghost" icon={Settings2} className="h-7 px-2">
            Rules
          </AppButton>
        }
      >
        <div className="@xl:hidden">
          {COMMISSION_ROWS.map((r, i) => (
            <ToolbarListRow
              key={r.artist}
              lead={<AppAvatar initials={ARTISTS[r.artist].initials} tone={ARTISTS[r.artist].tone} size="md" />}
              title={ARTISTS[r.artist].name}
              sub={`${r.sessions} sessions`}
              value={usd(r.commissionCents)}
              status={r.state === "Pending" ? <ApproveButton className="h-6" /> : <CommissionStatus state={r.state} />}
              last={i === COMMISSION_ROWS.length - 1}
            />
          ))}
        </div>
        <AppTable
          className="hidden @xl:block"
          columns={[
            { label: "Artist" },
            { label: "Sessions", align: "right" },
            { label: "Gross", align: "right" },
            { label: "Commission", align: "right" },
            { label: "Status" },
            { label: "", align: "right" },
          ]}
          rows={rows}
          minWidth={560}
        />
      </AppCard>
    </>
  );
}

/* ─── Payroll ─────────────────────────────────────────────────────────────── */

/**
 * Run steps from components/payroll/PayrollStepper.tsx. A payroll run holds
 * artist pay only (commission + tips), never what clients were billed, so the
 * run table has no gross-billed or studio-share column.
 */
const PAYROLL_STEPS = ["Calculate", "Review", "Approve", "Pay", "Complete"];

/**
 * Tips in the Sep 28 – Oct 4 run, passed to artists in full. Rio's are the
 * Oct 2–4 guest weekend. Analytics' 30-day tips include these.
 */
export const PAYROLL_TIPS_CENTS: Record<ArtistId, number> = { dev: 41000, mara: 37000, rio: 18000 };
const RUN_TIPS_CENTS = ARTIST_ORDER.reduce((total, id) => total + PAYROLL_TIPS_CENTS[id], 0);
/** Commission ($5,622, the week's payouts) plus tips. */
const RUN_TOTAL_CENTS = WEEK_PAID_OUT_CENTS + RUN_TIPS_CENTS;

function Payroll() {
  return (
    <>
      <AppKpiStrip
        items={[
          { label: "Artist earnings this run", value: usd(RUN_TOTAL_CENTS), note: "commission + tips", accent: true },
          { label: "Commission this run", value: usd(WEEK_PAID_OUT_CENTS), note: "paid to artists" },
          { label: "Tips this run", value: usd(RUN_TIPS_CENTS), note: "passed to artists" },
          { label: "Artists", value: String(WEEK_PAYOUTS.length), note: "in this run" },
        ]}
      />
      <span className="-mt-1 text-ui-sm text-app-mute">Most recent run · {PAYOUT_WEEK.label}. Every run is listed below.</span>
      <AppCard padded={false}>
        <AppTabs tabs={["Runs", "Artists Tax Info"]} active="Runs" />
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-app-border px-4 py-3">
          <span className="text-ui font-semibold text-app-text">{PAYOUT_WEEK.label}</span>
          <AppStatus tone="success" dot>
            Paid
          </AppStatus>
          <div className="ml-auto flex flex-wrap items-center gap-x-1 gap-y-1">
            {PAYROLL_STEPS.map((step, i) => (
              <span key={step} className="flex items-center gap-1">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-app-success text-white">
                  <Check size={10} strokeWidth={3} />
                </span>
                <span className="text-ui-xs font-semibold text-app-soft">{step}</span>
                {i < PAYROLL_STEPS.length - 1 && <span className="mx-1 h-px w-3 bg-app-border" />}
              </span>
            ))}
          </div>
        </div>
        <div className="@xl:hidden">
          {WEEK_PAYOUTS.map((p, i) => (
            <ToolbarListRow
              key={p.artist}
              lead={<AppAvatar initials={ARTISTS[p.artist].initials} tone={ARTISTS[p.artist].tone} size="md" />}
              title={ARTISTS[p.artist].name}
              sub={`${usd(p.payoutCents)} + ${usd(PAYROLL_TIPS_CENTS[p.artist])} tips`}
              value={usd(p.payoutCents + PAYROLL_TIPS_CENTS[p.artist])}
              last={i === WEEK_PAYOUTS.length - 1}
            />
          ))}
        </div>
        <AppTable
          className="hidden @xl:block"
          columns={[
            { label: "Artist" },
            { label: "Commission", align: "right" },
            { label: "Tips", align: "right" },
            { label: "Net payout", align: "right" },
            { label: "Paid" },
          ]}
          rows={WEEK_PAYOUTS.map((p) => ({
            key: p.artist,
            cells: [
              <ArtistCell key="a" id={p.artist} sub={p.math} />,
              usd(p.payoutCents),
              usd(PAYROLL_TIPS_CENTS[p.artist]),
              <span key="n" className="font-semibold">
                {usd(p.payoutCents + PAYROLL_TIPS_CENTS[p.artist])}
              </span>,
              <span key="p" className="text-app-mute">
                {PAYOUT_WEEK.paidOn}
              </span>,
            ],
          }))}
          minWidth={640}
        />
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-app-border px-4 py-2.5 text-ui-sm">
          <span className="text-app-mute">
            Run total <span className="hidden @md:inline">· {usd(WEEK_PAID_OUT_CENTS)} commission + {usd(RUN_TIPS_CENTS)} tips</span>
          </span>
          <span className="font-semibold text-app-text tabular-nums">{usd(RUN_TOTAL_CENTS)}</span>
        </div>
      </AppCard>
    </>
  );
}

/* ─── Disputes ────────────────────────────────────────────────────────────── */

function Disputes() {
  return (
    <>
      <AppKpiStrip
        items={[
          { label: "Open disputes", value: "0", note: "nothing due" },
          { label: "At risk", value: usd(0), note: "across open cases" },
          { label: "Win rate", value: "—", note: "0 resolved" },
          { label: "Resolved", value: "0", note: "0 won · 0 lost" },
        ]}
      />
      <AppCard title="Disputes & chargebacks" meta={<span className="hidden @xl:inline">Respond before the deadline to keep the funds</span>}>
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-app-lg bg-app-success-bg text-app-success">
            <Scale size={18} strokeWidth={1.8} />
          </span>
          <span className="text-ui font-semibold text-app-text">No disputes</span>
          <span className="max-w-[300px] text-ui-sm text-app-mute">
            Chargebacks and disputes will appear here if a client contests a payment.
          </span>
        </div>
      </AppCard>
    </>
  );
}

/**
 * Payments (app: /payments?tab=, payments/_proto/ScrPayments.tsx). Transactions
 * (with the Pending deposits view), Commissions (the Sep 28 – Oct 4 payout week
 * under the studio lens's ledger-wide KPIs), the payroll run that paid it with
 * its tips, and Disputes.
 */
export function PaymentsScreen({
  tab = "transactions",
  view = "all",
  className,
}: {
  tab?: PaymentsTab;
  /** Transactions only: the view dropdown. */
  view?: "all" | "pending-deposits";
  className?: string;
}) {
  return (
    <AppFrame
      active="payments"
      className={className}
      actions={<AppButton icon={Download}>Export</AppButton>}
    >
      <AppTabs tabs={Object.values(TAB_LABEL)} active={TAB_LABEL[tab]} className="@lg:px-6" />
      <div className="flex flex-col gap-4 p-4 @lg:p-6">
        {tab === "transactions" && <Transactions view={view} />}
        {tab === "commissions" && <Commissions />}
        {tab === "payroll" && <Payroll />}
        {tab === "disputes" && <Disputes />}
      </div>
    </AppFrame>
  );
}
