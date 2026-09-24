import React from "react";
import { Check, ExternalLink, RotateCcw } from "lucide-react";
import { cn } from "@/components/system";
import { FeaturePage } from "@/components/templates/feature-page";
import { AppFrame } from "@/components/mockups/app-frame";
import { AppAvatar, AppButton, AppKpiStrip, AppLabel, AppStatus, AppTabs } from "@/components/mockups/app-parts";
import { PAYROLL_TIPS_CENTS, PaymentsScreen } from "@/components/mockups/payments";
import { ToolbarListRow } from "@/components/mockups/projects";
import {
  ARTISTS,
  ARTIST_ORDER,
  COMMISSIONS,
  PAYOUT_WEEK,
  PROJECTS,
  TRANSACTIONS,
  WEEK_PAID_OUT_CENTS,
  WEEK_PAYOUTS,
  usd,
  type ArtistId,
  type Transaction,
} from "@/components/mockups/sample-data";
import { getFeature } from "@/lib/data/features";
import { pageMetadata } from "@/lib/seo";

const feature = getFeature("payments");

export const metadata = pageMetadata({
  title: feature.seo.title,
  description: feature.seo.description,
  path: "/product/payments",
});

/* ─── Moment 1: a deposit and a full payment, each with its receipt and refund ─
   The transaction drawer (payments/_proto/ScrPayments.tsx TxnDrawer) prints only the
   recorded fields: Amount, Type, Artist, Service, Date, then View receipt and Refund.
   Bea L.'s session 2 on Wed was $600: $500 by card here (Type "Balance"), $100 from
   her deposit pool. Tomás V. paid his first session in full ("Full payment"). */
const PAID = TRANSACTIONS.filter((t) => t.status === "Paid").slice(0, 4);
const BEA_SESSION = TRANSACTIONS.find((t) => t.client === "Bea L." && t.type === "Session");
const BEA_PROJECT = PROJECTS.find((p) => p.id === "bea-botanical");

const txnKey = (t: Transaction) => `${t.when}-${t.client}`;
/** The app's Type (payments/_proto/adapt.ts TYPE_LABEL): a session paid after its deposit is the Balance. */
function typeLabel(t: Transaction): string {
  if (t.type === "Deposit") return "Deposit";
  const project = PROJECTS.find((p) => p.client === t.client);
  return project && project.pool.appliedCents > 0 ? "Balance" : "Full payment";
}
const serviceFor = (t: Transaction) => (t === BEA_SESSION ? `${BEA_PROJECT?.title ?? ""}, session 2` : t.type);

function PaymentDetail() {
  const t = BEA_SESSION;
  if (!t) return null;
  const rows: [string, string][] = [
    ["Amount", usd(t.cents, true)],
    ["Type", typeLabel(t)],
    ["Artist", ARTISTS[t.artist].name],
    ["Service", serviceFor(t)],
    ["Date", t.when],
  ];
  return (
    <AppFrame active="payments" sidebar={false} title="Payments" meta="Transactions" className="shadow-none">
      <div className="grid @xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
        {/* The ledger the drawer opened from: deposits and a full session payment side by side */}
        <div className="hidden border-r border-app-border @xl:block">
          <p className="px-4 pt-3 pb-1">
            <AppLabel>Recent transactions</AppLabel>
          </p>
          {PAID.map((p, i) => (
            <div key={txnKey(p)} className={cn(p === t && "bg-app-sidebar shadow-[inset_2px_0_0_var(--color-app-active-fg)]")}>
              <ToolbarListRow
                title={p.client}
                sub={`${typeLabel(p)} · ${p.when.replace(/, \d{1,2}:\d{2} [AP]M$/, "")}`}
                value={usd(p.cents)}
                last={i === PAID.length - 1}
              />
            </div>
          ))}
        </div>

        <div className="flex min-w-0 flex-col">
          <div className="border-b border-app-border px-4 pt-4 pb-3.5">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <span className="text-[26px] leading-none font-extrabold tracking-[-0.02em] text-app-text tabular-nums">
                {usd(t.cents, true)}
              </span>
              <AppStatus tone="success" dot>
                Succeeded
              </AppStatus>
            </div>
            <p className="mt-1.5 text-ui-sm text-app-mute">
              {t.client} · {serviceFor(t)}
            </p>
          </div>
          <div className="px-4 pt-3 pb-2">
            <AppLabel>Transaction</AppLabel>
            <div className="mt-1">
              {rows.map(([k, v], i) => (
                <div
                  key={k}
                  className={cn("flex items-baseline justify-between gap-4 py-2 text-ui-sm", i < rows.length - 1 && "border-b border-app-border")}
                >
                  <span className="shrink-0 text-app-mute">{k}</span>
                  <span className="min-w-0 text-right font-semibold text-app-text tabular-nums">{v}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Side by side from 17rem; stacked in the narrowest frames (320px phones) so neither button is cut */}
          <div className="mt-auto flex gap-2 border-t border-app-border px-4 py-3 @max-[17rem]:flex-col">
            <AppButton icon={ExternalLink} className="min-w-0 flex-1 shrink">
              View receipt
            </AppButton>
            <AppButton icon={RotateCcw} className="min-w-0 flex-1 shrink">
              Refund
            </AppButton>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

/* ─── Moment 2: commissions owed per artist, then Dev's approved ─────────────
   The app's Commissions tab (payments/_proto/ScrPayments.tsx PaymentsCommissions,
   adapt.ts adaptCommissions) rolls each artist's session records into one row:
   Artist · Sessions · Gross · Commission · Status, with Approve on each pending row
   and "Approved <name>" as the toast. This week's records (sample-data COMMISSIONS,
   $1,236 owed): Dev for Tomás V. and Bea L. ($900), Rio for four walk-ins ($336).
   Approving Dev moves $900 to Approved and leaves Rio's $336 pending. The caption
   counts records, as Today and the Payments screen do: 6 pending, then Rio's 4. */
interface ArtistCommission {
  artist: ArtistId;
  sessions: number;
  grossCents: number;
  commissionCents: number;
}

/** "Walk-ins (4)" is four sessions; every other record is one. */
const sessionsIn = (client: string) => Number(/\((\d+)\)/.exec(client)?.[1] ?? 1);
const total = (values: number[]) => values.reduce((t, v) => t + v, 0);

const BY_ARTIST: ArtistCommission[] = ARTIST_ORDER.flatMap((id) => {
  const records = COMMISSIONS.filter((c) => c.artist === id);
  if (records.length === 0) return [];
  return [
    {
      artist: id,
      sessions: total(records.map((c) => sessionsIn(c.client))),
      grossCents: total(records.map((c) => c.serviceCents)),
      commissionCents: total(records.map((c) => c.artistCents)),
    },
  ];
});
const APPROVED_ARTIST: ArtistId = "dev";

function CommissionStatus({ approved }: { approved: boolean }) {
  return approved ? (
    <AppStatus tone="info" dot>
      Approved
    </AppStatus>
  ) : (
    <AppStatus tone="warning" dot>
      Pending
    </AppStatus>
  );
}

function ApproveButton({ className }: { className?: string }) {
  return (
    <AppButton variant="primary" icon={Check} className={cn("h-7 px-2.5 text-ui-xs", className)}>
      Approve
    </AppButton>
  );
}

const sessionsLabel = (n: number) => `${n} session${n === 1 ? "" : "s"}`;

function CommissionQueue({ approved }: { approved: boolean }) {
  const isApproved = (r: ArtistCommission) => approved && r.artist === APPROVED_ARTIST;
  const pending = BY_ARTIST.filter((r) => !isApproved(r));
  const owedCents = total(pending.map((r) => r.commissionCents));
  const approvedCents = total(BY_ARTIST.filter(isApproved).map((r) => r.commissionCents));
  const pendingRecords = COMMISSIONS.filter(
    (c) => c.status === "Pending approval" && !(approved && c.artist === APPROVED_ARTIST),
  );
  const pendingNote = `${pendingRecords.length} pending approval`;
  return (
    <AppFrame active="payments" sidebar={false} title="Payments" meta="Commissions" className="shadow-none">
      <div className="flex flex-col gap-3 p-3.5 @md:p-4">
        <div className="hidden sm:block">
          <AppKpiStrip
            items={[
              { label: "Commissions owed", value: usd(owedCents), note: pendingNote, accent: true },
              { label: "Approved", value: usd(approvedCents), note: "ready to pay" },
            ]}
          />
        </div>
        <div className="overflow-hidden rounded-app-lg bg-app-surface ring-1 ring-app-border">
          {/* Phones: the owed figure as one header line instead of the KPI strip, so the pair stays short */}
          <div className="flex items-center justify-between gap-2 border-b border-app-border bg-app-sidebar px-3 py-2 sm:hidden">
            <span className="min-w-0">
              <span className="block text-ui-xs font-semibold text-app-text">Commissions owed</span>
              <span className="block text-[11px] text-app-mute">{pendingNote}</span>
            </span>
            <span className="text-[20px] leading-none font-extrabold tracking-[-0.02em] text-app-active-fg tabular-nums">
              {usd(owedCents)}
            </span>
          </div>

          {/* One row per artist, as the tab rolls them up: the status beside the name, Approve on
              each pending row, then sessions and gross against the commission. */}
          {BY_ARTIST.map((r, i) => {
            const a = ARTISTS[r.artist];
            const done = isApproved(r);
            return (
              <div
                key={r.artist}
                className={cn(
                  "grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-2.5 gap-y-1 px-3 py-2.5 @md:px-3.5 @max-[16rem]:grid-cols-1",
                  i < BY_ARTIST.length - 1 && "border-b border-app-border",
                )}
              >
                <AppAvatar initials={a.initials} tone={a.tone} size="md" className="row-span-2 @max-[16rem]:hidden" />
                <span className="flex min-h-7 min-w-0 items-center justify-between gap-2">
                  <span className="flex min-w-0 items-center gap-1.5">
                    <span className="truncate text-ui-sm font-semibold text-app-text">{a.name}</span>
                    <CommissionStatus approved={done} />
                  </span>
                  {!done && <ApproveButton className="@max-[16rem]:hidden" />}
                </span>
                <span className="flex min-w-0 items-baseline justify-between gap-2">
                  <span className="truncate text-ui-xs text-app-mute tabular-nums @max-[16rem]:whitespace-normal">
                    {sessionsLabel(r.sessions)} · {usd(r.grossCents)} gross
                  </span>
                  <span className="shrink-0 text-ui-sm font-bold text-app-text tabular-nums">{usd(r.commissionCents)}</span>
                </span>
                {/* The narrowest frames (320px phones): Approve drops under the figures, full width */}
                {!done && <ApproveButton className="mt-1 hidden w-full @max-[16rem]:inline-flex" />}
              </div>
            );
          })}
        </div>
        {approved && (
          <p className="flex items-center gap-1.5 text-ui-xs font-semibold text-app-success">
            <Check size={13} strokeWidth={2.6} />
            Approved {ARTISTS[APPROVED_ARTIST].name}
          </p>
        )}
      </div>
    </AppFrame>
  );
}

/* ─── Moment 3 on phones: the same payroll run, artists first ─────────────────
   The full Payroll tab leads with four KPI tiles, which fill a phone before the run's
   artists appear. Phones get the run card itself (PayrollStepper's five steps, then
   commission + tips per artist and the run total) under the same tabs. */
const RUN_TIPS_CENTS = WEEK_PAYOUTS.reduce((total, p) => total + PAYROLL_TIPS_CENTS[p.artist], 0);

function PayrollRunPhone() {
  return (
    <AppFrame active="payments" title="Payments" meta="Payroll" className="sm:hidden">
      <AppTabs tabs={["Transactions", "Commissions", "Payroll", "Disputes"]} active="Payroll" />
      <div className="p-3">
        <div className="overflow-hidden rounded-app-lg bg-app-surface ring-1 ring-app-border">
          <AppTabs tabs={["Runs", "Artists Tax Info"]} active="Runs" />
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-app-border px-3.5 py-2.5">
            <span className="text-ui-sm font-semibold text-app-text">{PAYOUT_WEEK.label}</span>
            <AppStatus tone="success" dot>
              Paid {PAYOUT_WEEK.paidOn.replace(/^\w+, /, "")}
            </AppStatus>
            <span className="flex w-full items-center gap-1.5 text-ui-xs text-app-mute">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-app-success text-white">
                  <Check size={9} strokeWidth={3} />
                </span>
              ))}
              <span className="ml-1">5 of 5 steps</span>
            </span>
          </div>
          {WEEK_PAYOUTS.map((p) => {
            const a = ARTISTS[p.artist];
            return (
              <div key={p.artist} className="flex items-center gap-2.5 border-b border-app-border px-3.5 py-2.5">
                <AppAvatar initials={a.initials} tone={a.tone} size="md" />
                <span className="min-w-0 flex-1">
                  <span className="block text-ui-sm font-semibold text-app-text">{a.name}</span>
                  <span className="block truncate text-ui-xs text-app-mute">
                    {usd(p.payoutCents)} + {usd(PAYROLL_TIPS_CENTS[p.artist])} tips
                  </span>
                </span>
                <span className="text-ui-sm font-bold text-app-text tabular-nums">{usd(p.payoutCents + PAYROLL_TIPS_CENTS[p.artist])}</span>
              </div>
            );
          })}
          <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 text-ui-sm">
            <span className="text-app-mute">Run total</span>
            <span className="font-semibold text-app-text tabular-nums">{usd(WEEK_PAID_OUT_CENTS + RUN_TIPS_CENTS)}</span>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

export default function PaymentsPage() {
  return (
    <FeaturePage
      feature={feature}
      headings={{
        moments: "Taken, owed and paid out",
        details: "What else it does",
        worksWith: "Joined to bookings and the roster",
        worksWithLead: "Deposits arrive from bookings and each artist’s split comes from Team, so no figure is typed twice.",
      }}
      visuals={{
        hero: <PaymentsScreen tab="transactions" />,
        heroCrop: true,
        moments: [
          <PaymentDetail key="payment" />,
          {
            before: <CommissionQueue approved={false} />,
            after: <CommissionQueue approved />,
            beforeLabel: "Pending approval",
            afterLabel: "Dev approved",
          },
          <React.Fragment key="payroll">
            <PayrollRunPhone />
            <PaymentsScreen tab="payroll" className="hidden sm:flex" />
          </React.Fragment>,
        ],
        detailLabels: [
          { label: "Transactions", tone: "quiet" },
          { label: "Tip pool", tone: "quiet" },
          { label: "Processing fees", tone: "quiet" },
          { label: "Tax registrations", tone: "quiet" },
          { label: "Respond before", tone: "warning" },
          { label: "Owed to you", tone: "ember" },
        ],
      }}
      planRows={[
        { label: "Deposits and card payments", from: "solo" },
        { label: "A receipt and refund on every payment", from: "solo" },
        { label: "Commission and booth-rent splits", from: "studio" },
        { label: "Commissions owed, shown on Today", from: "studio" },
        { label: "Payroll runs and 1099s", from: "pro" },
        { label: "Guest-artist splits", from: "pro" },
      ]}
      inkBand={{ headline: "Close the week with one approval.", italicWord: "approval" }}
    />
  );
}
