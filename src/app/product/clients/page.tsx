import React from "react";
import type { LucideIcon } from "lucide-react";
import { Download, FileSignature, Plus, TriangleAlert, UploadCloud, Wallet } from "lucide-react";
import { FeaturePage } from "@/components/templates/feature-page";
import {
  AppAvatar,
  AppButton,
  AppFrame,
  AppLabel,
  AppStatus,
  AppTable,
  AppTabs,
  ARTISTS,
  BriefingPhone,
  ClientFileScreen,
  CLIENTS,
  ELENA_ALLERGY,
  PROJECTS,
  SEGMENTS,
  ToolbarSearch,
  ToolbarSelect,
  usd,
  type AppColumn,
  type AppTableRow,
  type ClientRow,
} from "@/components/mockups";
import { cn } from "@/components/system";
import { getFeature } from "@/lib/data/features";
import { pageMetadata } from "@/lib/seo";

const feature = getFeature("clients");

export const metadata = pageMetadata({
  title: feature.seo.title,
  description: feature.seo.description,
  path: "/product/clients",
});

/* ─── Hero: the client list ──────────────────────────────────────────────────
   Mirrors clients/_proto/ClientsList.tsx: the "N clients" count with Import ·
   Export · New client, saved views (All clients · VIP · Active · New this month ·
   Needs follow-up · Pinned), "Search by name, phone, or email…", Sort, Columns,
   and the table's Last visit · Next appointment · Spent · Sessions · Status ·
   Flags. Flags are the app's three (data.ts FLAG_META): Allergy, Deposit due,
   Consent. Sorted by next appointment, so today's clients and their flags lead. */
type FlagKey = "allergy" | "deposit" | "consent";

const FLAG: Record<FlagKey, { label: string; icon: LucideIcon; tone: string }> = {
  allergy: { label: "Allergy", icon: TriangleAlert, tone: "text-app-warning" },
  deposit: { label: "Deposit due", icon: Wallet, tone: "text-app-active-fg" },
  consent: { label: "Consent", icon: FileSignature, tone: "text-app-mute" },
};

/** sample-data flag labels → the list's flag keys ("New client" is a status, "Late cancel" isn't a flag). */
const FLAG_OF: Record<string, FlagKey> = {
  "Red ink allergy": "allergy",
  "Deposit pending": "deposit",
  "Consent missing": "consent",
};

const NEXT_ORDER = ["Jo K.", "Priya S.", "Elena R.", "Sam T.", "Owen P.", "Asha M.", "Bea L.", "Kira N.", "Tomás V.", "Leo B."];
/** The studio's whole book (sample-data SEGMENTS "All clients"), so this header, /product/analytics and /product/marketing agree. */
const CLIENT_TOTAL = SEGMENTS.find((s) => s.label === "All clients")?.clients ?? CLIENTS.length;

const LIST = NEXT_ORDER.map((name) => CLIENTS.find((c) => c.name === name)).filter((c): c is ClientRow => Boolean(c));

const flagsOf = (c: ClientRow): FlagKey[] => c.flags.map((f) => FLAG_OF[f.label]).filter((k): k is FlagKey => Boolean(k));

function Flags({ keys, labels = false }: { keys: FlagKey[]; labels?: boolean }) {
  if (keys.length === 0) return <span className="text-app-mute">—</span>;
  return (
    <span className="flex gap-1.5">
      {keys.map((k) => {
        const f = FLAG[k];
        return (
          <span
            key={k}
            className={cn(
              "inline-flex h-6 shrink-0 items-center justify-center gap-1 rounded-[7px] bg-graphite/[0.05]",
              labels ? "px-1.5" : "w-6",
            )}
          >
            <f.icon size={13} strokeWidth={2} className={f.tone} />
            {labels && <span className="text-ui-xs font-semibold whitespace-nowrap text-app-soft">{f.label}</span>}
          </span>
        );
      })}
    </span>
  );
}

function Status({ c }: { c: ClientRow }) {
  return c.visits === 0 ? (
    <AppStatus tone="warning" dot>
      New
    </AppStatus>
  ) : (
    <AppStatus tone="success" dot>
      Active
    </AppStatus>
  );
}

const COLUMNS: AppColumn[] = [
  { label: "Client" },
  { label: "Last visit", className: "hidden @3xl:table-cell" },
  { label: "Next appointment" },
  { label: "Spent", align: "right" },
  { label: "Sessions", align: "right", className: "hidden @3xl:table-cell" },
  { label: "Status" },
  { label: "Flags" },
];

function ClientList() {
  const rows: AppTableRow[] = LIST.map((c) => ({
    key: c.name,
    tone: c.name === ELENA_ALLERGY.client ? "active" : "default",
    cells: [
      <span key="client" className="flex items-center gap-2">
        <AppAvatar initials={c.initials} size="sm" />
        <span className="font-semibold text-app-text">{c.name}</span>
      </span>,
      <span key="last" className="text-app-soft">
        {c.lastVisit}
      </span>,
      <span key="next" className="flex flex-col leading-tight">
        <span className={c.nextVisit === "—" ? "text-app-mute" : "font-semibold text-app-text"}>{c.nextVisit}</span>
        {c.nextVisit !== "—" && c.nextVisit !== "Waitlist" && <span className="text-ui-xs text-app-mute">{ARTISTS[c.artist].name}</span>}
      </span>,
      <span key="spent" className="font-semibold text-app-text">
        {usd(c.spendCents)}
      </span>,
      <span key="sessions" className="text-app-soft">
        {c.visits}
      </span>,
      <Status key="status" c={c} />,
      <Flags key="flags" keys={flagsOf(c)} labels />,
    ],
  }));

  return (
    <AppFrame
      active="clients"
      meta={`${CLIENT_TOTAL} clients`}
      actions={
        <>
          <AppButton icon={UploadCloud}>Import</AppButton>
          <AppButton icon={Download}>Export</AppButton>
          <AppButton variant="primary" icon={Plus}>
            New client
          </AppButton>
        </>
      }
    >
      <AppTabs tabs={["All clients", "VIP", "Active", "New this month", "Needs follow-up", "Pinned"]} active="All clients" className="mt-1" />
      <div className="px-4 py-4 @lg:px-5">
        <div className="overflow-hidden rounded-app-lg bg-app-surface ring-1 ring-app-border">
          <div className="hidden items-center gap-2 border-b border-app-border p-3 @md:flex">
            <ToolbarSearch placeholder="Search by name, phone, or email…" className="flex-1 @xl:max-w-[300px]" />
            <ToolbarSelect label="Sort: Next appointment" className="hidden @2xl:inline-flex" />
            <ToolbarSelect label="Columns" className="hidden @xl:inline-flex" />
          </div>
          <AppTable columns={COLUMNS} rows={rows} minWidth={640} className="hidden @2xl:block" />
          {/* Narrow frames: the same clients stacked (the toolbar steps aside), next appointment and flags in view. */}
          <div className="divide-y divide-app-border @2xl:hidden">
            {LIST.map((c) => (
              <div
                key={c.name}
                className={cn("flex items-center gap-2.5 px-3.5 py-2", c.name === ELENA_ALLERGY.client && "bg-app-sidebar")}
              >
                <AppAvatar initials={c.initials} size="sm" />
                <span className="flex min-w-0 flex-1 flex-col leading-tight">
                  <span className="truncate text-ui-sm font-semibold text-app-text">{c.name}</span>
                  <span className="truncate text-ui-xs text-app-mute">
                    Next: {c.nextVisit}
                    {c.nextVisit !== "—" && c.nextVisit !== "Waitlist" ? ` · ${ARTISTS[c.artist].name}` : ""}
                  </span>
                </span>
                {flagsOf(c).length > 0 && <Flags keys={flagsOf(c)} labels />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

/* ─── Moment 1: Elena R.'s record ────────────────────────────────────────────
   The allergy banner sits on top of every tab of her record; the pinned note is
   Dev's from Tue, Aug 25, still there on Thu, Oct 8. The record fades out under
   its activity (under the identity card on phones). */
function ElenaRecord() {
  return (
    <div className="max-h-[470px] overflow-hidden [mask-image:linear-gradient(to_bottom,#000_calc(100%-90px),transparent)] sm:max-h-[780px] sm:[mask-image:linear-gradient(to_bottom,#000_calc(100%-140px),transparent)]">
      <ClientFileScreen tab="overview" />
    </div>
  );
}

/* ─── Moment 2: the same record on its Financial tab ─────────────────────────
   The seven tabs as the record prints them (client-file.tsx, with its counts),
   Financial open: the back piece's deposit pool, $320 paid in Tue, Aug 11, $160
   applied to session 1 on Sat, Aug 22, $160 available for session 3. Composed
   here without the record's header, so the tabs and the pool stay in view on a
   phone. */
const ELENA = CLIENTS.find((c) => c.name === ELENA_ALLERGY.client);
const ELENA_PROJECT = PROJECTS.find((p) => p.id === "elena-back");
const ELENA_POOL = ELENA_PROJECT?.pool ?? { paidInCents: 0, appliedCents: 0, availableCents: 0, refundableCents: 0 };
const ELENA_S1 = ELENA_PROJECT?.sessions.find((s) => s.n === 1);
const RECORD_TABS = [
  { label: "Overview" },
  { label: "Sessions", count: 2 },
  { label: "Gallery", count: 4 },
  { label: "Notes", count: 2 },
  { label: "Comms", count: 3 },
  { label: "Consent" },
  { label: "Financial" },
];

function ElenaFinancial() {
  const pool: [string, number, boolean?][] = [
    ["Paid in", ELENA_POOL.paidInCents],
    ["Applied", ELENA_POOL.appliedCents],
    ["Available", ELENA_POOL.availableCents, true],
    ["Refundable", ELENA_POOL.refundableCents],
  ];
  const ledger = [
    { label: "Deposit · back piece", when: "Tue, Aug 11 · card", cents: ELENA_POOL.paidInCents },
    { label: "Applied to session 1", when: ELENA_S1?.date ?? "", cents: -(ELENA_S1?.appliedCents ?? 0) },
  ];
  return (
    <AppFrame active="clients" sidebar={false} className="shadow-none">
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        <AppAvatar initials={ELENA?.initials ?? "ER"} size="lg" />
        <div className="min-w-0">
          <p className="font-serif text-[22px] leading-[1.1] text-app-text">{ELENA_ALLERGY.client}</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            <AppStatus tone="success" dot>
              Active
            </AppStatus>
            <AppStatus tone="danger">{ELENA_ALLERGY.flag}</AppStatus>
          </div>
        </div>
      </div>
      <AppTabs tabs={RECORD_TABS} active="Financial" />
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <AppLabel className="tracking-[0.08em]">Deposit pool</AppLabel>
          <span className="text-ui-xs text-app-mute">{ELENA_PROJECT?.title}</span>
        </div>
        <div className="grid grid-cols-2 gap-2.5 @xl:grid-cols-4">
          {pool.map(([label, cents, strong]) => (
            <div key={label} className={cn("rounded-app px-3 py-2.5", strong ? "bg-app-success-bg" : "bg-graphite/[0.04]")}>
              <AppLabel className={strong ? "text-app-success" : undefined}>{label}</AppLabel>
              <p className="text-[20px] font-extrabold text-app-text tabular-nums">{usd(cents)}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col border-t border-app-border pt-2">
          {ledger.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-3 py-1.5">
              <span className="min-w-0">
                <span className="block truncate text-ui-sm font-semibold text-app-text">{row.label}</span>
                <span className="block text-ui-xs text-app-mute">{row.when}</span>
              </span>
              <span className={cn("shrink-0 text-ui-sm font-bold tabular-nums", row.cents > 0 ? "text-app-success" : "text-app-text")}>
                {row.cents > 0 ? "+" : ""}
                {usd(row.cents)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AppFrame>
  );
}

export default function ClientsPage() {
  return (
    <FeaturePage
      feature={feature}
      headings={{
        moments: "Noted once, seen at every booking",
        details: "What else it does",
        worksWith: "Joined to consent forms and projects",
        worksWithLead: "Signed forms and every project land on the same record, so a client’s history lives in one place.",
      }}
      visuals={{
        hero: <ClientList />,
        heroCrop: true,
        moments: [
          <ElenaRecord key="record" />,
          <ElenaFinancial key="financial" />,
          <div key="briefing" className="flex justify-center">
            <BriefingPhone />
          </div>,
        ],
        detailLabels: [
          { label: "Allergy", tone: "warning" },
          { label: "Columns", tone: "quiet" },
          { label: "Import CSV", tone: "quiet" },
          { label: "Your projects", tone: "quiet" },
          { label: "Marketing SMS", tone: "quiet" },
          { label: "Tags", tone: "quiet" },
        ],
      }}
      planRows={[
        { label: "Client records with allergy flags", from: "solo" },
        { label: "Import from a CSV, or we move your list", from: "solo" },
        { label: "Briefing email before each session", from: "solo" },
        { label: "Client portal for project deposits", from: "solo" },
        { label: "Roles decide who can export client data", from: "pro" },
        { label: "White-label client portal", from: "pro" },
      ]}
      inkBand={{ headline: "Bring your client list over.", italicWord: "list" }}
    />
  );
}
