import type React from "react";
import type { LucideIcon } from "lucide-react";
import {
  CalendarClock,
  CalendarPlus,
  Camera,
  ChevronLeft,
  ClipboardList,
  FileSignature,
  FileText,
  Mail,
  MessageSquare,
  Palette,
  Phone,
  Pin,
  Stethoscope,
  Wallet,
} from "lucide-react";
import { cn } from "@/components/system/cn";
import { AppFrame } from "./app-frame";
import { AppAvatar, AppButton, AppLabel, AppStatus, AppTabs, PhotoTile } from "./app-parts";
import { ARTISTS, CLIENTS, ELENA_ALLERGY, ELENA_CONTACT, PROJECTS, SUBMISSIONS, THREADS, TODAY_SESSIONS, usd } from "./sample-data";

/**
 * A client record (app route /clients, detail). Mirrors clients/_proto/ClientDetail.tsx:
 * the sticky "Allergies & medical" banner, the identity card (serif name, status
 * chip, Briefing · Message · Book), the briefing strip (Next session · Project ·
 * Deposit · Forms) and the tabs Overview · Sessions · Gallery · Notes · Comms ·
 * Consent · Financial. The client is Elena R., red ink allergy, back piece
 * session 2 of 3 at 1:30 today.
 */

export type ClientFileTab = "overview" | "sessions" | "gallery" | "notes" | "comms" | "consent" | "financial";

const ELENA = CLIENTS.find((c) => c.name === ELENA_ALLERGY.client);
const PROJECT = PROJECTS.find((p) => p.id === "elena-back");
const TODAY = TODAY_SESSIONS.find((s) => s.id === "elena-s2");
const ARTIST = ARTISTS.dev;
const POOL = PROJECT?.pool ?? { paidInCents: 0, appliedCents: 0, availableCents: 0, refundableCents: 0 };

/**
 * Elena's money, consistent with the canon: $800 paid to date = the $320
 * deposit (Tue, Aug 11) + the $480 balance of session 1 ($640 less $160 from
 * the pool). Session 2 is $600.
 */
const SESSION_1_PRICE = 64000;
const SESSION_2_PRICE = 60000;
const DEPOSIT_PAID_ON = "Tue, Aug 11";

const TABS: { id: ClientFileTab; label: string; count?: number }[] = [
  { id: "overview", label: "Overview" },
  { id: "sessions", label: "Sessions", count: 2 },
  { id: "gallery", label: "Gallery", count: 4 },
  { id: "notes", label: "Notes", count: 2 },
  { id: "comms", label: "Comms", count: 3 },
  { id: "consent", label: "Consent" },
  { id: "financial", label: "Financial" },
];

const ELENA_FORMS = SUBMISSIONS.filter((s) => s.client === ELENA_ALLERGY.client);

/* ─── Shared pieces ──────────────────────────────────────────────────────── */

function Card({ title, meta, className, children }: { title?: string; meta?: React.ReactNode; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("min-w-0 rounded-app-lg bg-app-surface p-4 ring-1 ring-app-border", className)}>
      {(title || meta) && (
        <div className="mb-3 flex items-center justify-between gap-2">
          {title && <AppLabel className="tracking-[0.08em]">{title}</AppLabel>}
          {meta && <span className="text-ui-xs text-app-mute">{meta}</span>}
        </div>
      )}
      {children}
    </div>
  );
}

function BriefStat({ icon: Icon, label, value, tone }: { icon: LucideIcon; label: string; value: string; tone?: "rust" | "success" }) {
  return (
    <div className="flex min-w-0 items-start gap-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-app bg-graphite/[0.05] text-app-mute">
        <Icon size={14} strokeWidth={1.8} />
      </span>
      <div className="min-w-0">
        <AppLabel className="tracking-[0.07em]">{label}</AppLabel>
        <p
          className={cn(
            "text-ui-sm leading-snug font-semibold",
            tone === "rust" ? "text-app-active-fg" : tone === "success" ? "text-app-success" : "text-app-text",
          )}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

/** Title and meta wrap rather than clip, so a date or a time is never cut short. */
function ListRow({ title, sub, right }: { title: React.ReactNode; sub?: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 border-b border-app-border py-2.5 last:border-b-0 last:pb-0 first:pt-0">
      <div className="min-w-0 flex-1">
        <p className="text-ui-sm leading-snug font-semibold text-app-text">{title}</p>
        {sub && <p className="text-ui-xs leading-snug text-app-mute">{sub}</p>}
      </div>
      {right}
    </div>
  );
}

function When({ children }: { children: React.ReactNode }) {
  return <span className="shrink-0 text-ui-xs whitespace-nowrap text-app-mute">{children}</span>;
}

/* ─── Tabs ───────────────────────────────────────────────────────────────── */

function Overview() {
  return (
    <div className="grid gap-4 @2xl:grid-cols-[minmax(0,1fr)_260px]">
      <div className="flex min-w-0 flex-col gap-4">
        <Card title="Pinned note" meta={`${ARTIST.name} · Tue, Aug 25`}>
          <p className="text-ui leading-snug text-app-text">
            <span className="font-semibold">Allergies:</span> {ELENA_ALLERGY.note}
          </p>
        </Card>
        <Card title="Activity">
          <ListRow title="Consent form signed" sub="Tattoo consent — general · on her phone" right={<When>Today, 9:42</When>} />
          <ListRow title="Allergy added" sub="Red ink, after session 1" right={<When>Tue, Aug 25</When>} />
          {/* The pool's other $160 stays for session 3; today's session 2 is paid at checkout. */}
          <ListRow
            title={`Deposit applied · ${usd(POOL.appliedCents)}`}
            sub={`Back piece, session 1 · ${usd(POOL.availableCents)} stays in the pool for session 3`}
            right={<When>Sat, Aug 22</When>}
          />
          <ListRow title="Session 1 completed" sub="Back piece · linework" right={<When>Sat, Aug 22</When>} />
        </Card>
      </div>
      <div className="flex min-w-0 flex-col gap-4">
        <Card title="Details" className="hidden @2xl:block">
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-ui-sm">
            <dt className="text-app-mute">Regular artist</dt>
            <dd className="text-right font-medium text-app-text">{ARTIST.name}</dd>
            <dt className="text-app-mute">Sessions</dt>
            <dd className="text-right font-medium text-app-text tabular-nums">{ELENA?.visits ?? 1}</dd>
            <dt className="text-app-mute">Last visit</dt>
            <dd className="text-right font-medium text-app-text">{ELENA?.lastVisit ?? "Sat, Aug 22"}</dd>
          </dl>
        </Card>
        <Card title="Consent & forms">
          {ELENA_FORMS.map((f) => (
            <ListRow key={f.form} title={f.form} sub={f.when} right={<AppStatus tone="success">Signed</AppStatus>} />
          ))}
        </Card>
      </div>
    </div>
  );
}

/**
 * Booked sessions only, in the app's words (clients/_proto/dossier.ts
 * SESSION_STATE_META: Upcoming · Done · Cancelled · No-show). Session 3 isn't
 * booked yet; its patch test lives in the pinned note.
 */
function Sessions() {
  const rows = [
    { when: "Today, 1:30 PM", what: "Back piece · session 2", note: "Shading, no red", price: usd(SESSION_2_PRICE), status: <AppStatus tone="active">Upcoming</AppStatus> },
    { when: "Sat, Aug 22", what: "Back piece · session 1", note: "Linework · reacted to red after", price: usd(SESSION_1_PRICE), status: <AppStatus tone="success">Done</AppStatus> },
  ];
  return (
    <Card title="Session history">
      {rows.map((r) => (
        <ListRow
          key={r.what}
          title={r.what}
          sub={`${r.when} · ${ARTIST.name} · ${r.note}`}
          right={
            <span className="flex shrink-0 items-center gap-3">
              <span className="hidden text-ui-sm font-semibold text-app-text tabular-nums @md:inline">{r.price}</span>
              {r.status}
            </span>
          }
        />
      ))}
    </Card>
  );
}

function Gallery() {
  const filters = ["All", "Reference", "Before", "During", "After", "Healed"];
  const tiles = [
    { label: "S1", caption: "After · session 1" },
    { label: "S1", caption: "Healed · session 1" },
    { label: "R1", caption: "Reference" },
    { label: "R2", caption: "Reference" },
  ];
  return (
    <Card>
      <div className="mb-3 flex flex-wrap gap-1.5">
        {filters.map((f) => (
          <span
            key={f}
            className={cn(
              "inline-flex h-6 items-center rounded-full px-2.5 text-ui-xs font-semibold",
              f === "All" ? "bg-app-text text-white" : "bg-graphite/[0.06] text-app-soft",
            )}
          >
            {f}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 @md:grid-cols-4">
        {tiles.map((t) => (
          <PhotoTile key={`${t.label}-${t.caption}`} label={t.label} caption={t.caption} aspect="portrait" />
        ))}
      </div>
    </Card>
  );
}

function Notes() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex h-9 items-center rounded-app px-3 text-ui-sm text-app-mute ring-1 ring-app-border">Add a note…</div>
      <Card>
        <p className="mb-1 flex items-center gap-1.5 text-ui-xs font-semibold text-app-active-fg">
          <Pin size={11} strokeWidth={2} /> Pinned
        </p>
        <p className="text-ui leading-snug text-app-text">
          <span className="font-semibold">Allergies:</span> {ELENA_ALLERGY.note}
        </p>
        <p className="mt-1.5 text-ui-xs text-app-mute">{ARTIST.name} · Tue, Aug 25</p>
      </Card>
      <Card>
        <p className="text-ui leading-snug text-app-text">Keep the shading soft toward the shoulder. Heals fast on the back.</p>
        <p className="mt-1.5 text-ui-xs text-app-mute">{ARTIST.name} · Sat, Aug 22</p>
      </Card>
    </div>
  );
}

function Comms() {
  const lastSms = THREADS.find((t) => t.client === ELENA_ALLERGY.client);
  const rows: { icon: LucideIcon; channel: string; dir: "Received" | "Sent"; text: string; when: string }[] = [
    { icon: MessageSquare, channel: "SMS", dir: "Received", text: lastSms?.preview ?? "", when: `Today, ${lastSms?.time ?? "9:43"}` },
    { icon: MessageSquare, channel: "SMS", dir: "Sent", text: "Your consent form for Thursday. Takes two minutes.", when: "Wed, Oct 7" },
    // The automatic reminder, 24 hours before (the 2-hour one goes at 11:30 today).
    { icon: Mail, channel: "Email", dir: "Sent", text: "Reminder: back piece, session 2, Thu, Oct 8 at 1:30", when: "Wed, Oct 7, 1:30 PM" },
  ];
  return (
    <Card title="Communication log">
      {rows.map((r) => (
        <div key={r.text} className="flex items-start gap-3 border-b border-app-border py-2.5 last:border-b-0 last:pb-0 first:pt-0">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-app bg-graphite/[0.05] text-app-mute">
            <r.icon size={13} strokeWidth={1.8} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-ui-xs text-app-mute">
              {r.channel} · {r.dir} · {r.when}
            </p>
            <p className="text-ui-sm text-app-text">{r.text}</p>
          </div>
        </div>
      ))}
    </Card>
  );
}

function Consent() {
  const rows = [
    /* Date first, so a narrow frame wraps the session text, never the time. */
    ...ELENA_FORMS.map((f) => ({ form: f.form, sub: `${f.when} · ${f.via === "Phone" ? "on her phone" : f.via.toLowerCase()} · ${f.session}` })),
    { form: "Tattoo consent — general", sub: "Sat, Aug 22 · kiosk · Back piece, session 1" },
    { form: "Medical history", sub: "Sat, Aug 22 · kiosk" },
  ];
  return (
    <Card title="Signed forms" meta="Stored as PDFs that can't be edited">
      {rows.map((r) => (
        <ListRow
          key={r.sub}
          title={r.form}
          sub={r.sub}
          right={
            <span className="flex shrink-0 items-center gap-2">
              <span className="hidden items-center gap-1 text-ui-xs font-semibold text-app-mute @md:inline-flex">
                <FileText size={12} strokeWidth={1.8} /> PDF
              </span>
              <AppStatus tone="success">Signed</AppStatus>
            </span>
          }
        />
      ))}
    </Card>
  );
}

function Financial() {
  const pool: [string, number, boolean?][] = [
    ["Paid in", POOL.paidInCents],
    ["Applied", POOL.appliedCents],
    ["Available", POOL.availableCents, true],
    ["Refundable", POOL.refundableCents],
  ];
  return (
    <div className="flex flex-col gap-4">
      <Card title="Deposit pool" meta="Back piece">
        <div className="grid grid-cols-2 gap-3 @xl:grid-cols-4">
          {pool.map(([label, cents, strong]) => (
            <div key={label} className={cn("rounded-app px-3 py-2.5", strong ? "bg-app-success-bg" : "bg-graphite/[0.04]")}>
              <AppLabel className={strong ? "text-app-success" : undefined}>{label}</AppLabel>
              <p className="text-[20px] font-extrabold text-app-text tabular-nums">{usd(cents)}</p>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Transactions" meta={`Lifetime value ${usd(ELENA?.spendCents ?? 0)}`}>
        <ListRow title="Session 1 balance" sub={`Sat, Aug 22 · ${usd(SESSION_1_PRICE)} less ${usd(POOL.appliedCents)} from the pool`} right={<span className="text-ui-sm font-bold text-app-text tabular-nums">{usd(SESSION_1_PRICE - POOL.appliedCents)}</span>} />
        <ListRow title="Deposit · back piece" sub={`${DEPOSIT_PAID_ON} · card`} right={<span className="text-ui-sm font-bold text-app-text tabular-nums">{usd(POOL.paidInCents)}</span>} />
      </Card>
    </div>
  );
}

const PANELS: Record<ClientFileTab, () => React.ReactNode> = {
  overview: Overview,
  sessions: Sessions,
  gallery: Gallery,
  notes: Notes,
  comms: Comms,
  consent: Consent,
  financial: Financial,
};

export function ClientFileScreen({ tab = "overview", className }: { tab?: ClientFileTab; className?: string }) {
  const Panel = PANELS[tab];
  const active = TABS.find((t) => t.id === tab)?.label ?? "Overview";
  const nextLabel = TODAY ? `Today, ${TODAY.start} PM` : "Today";

  return (
    <AppFrame active="clients" className={className}>
      {/* Sticky allergy banner: the most dangerous fact, first. */}
      <div className="flex items-start gap-2.5 border-b border-app-danger/20 bg-app-danger-bg px-4 py-2.5 @lg:px-6">
        <Stethoscope size={15} strokeWidth={1.9} className="mt-0.5 shrink-0 text-app-danger" />
        <div className="min-w-0">
          <p className="text-kpi-label font-bold tracking-[0.08em] text-app-danger uppercase">Allergies &amp; medical</p>
          <p className="text-ui-sm leading-snug text-app-text">
            {ELENA_ALLERGY.flag}. {ELENA_ALLERGY.note}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 py-4 @lg:px-6 @lg:py-5">
        <span className="inline-flex items-center gap-1 text-ui-sm text-app-mute">
          <ChevronLeft size={14} strokeWidth={1.8} /> Clients
        </span>

        {/* Identity card + briefing strip */}
        <div className="rounded-app-lg bg-app-surface ring-1 ring-app-border">
          <div className="flex flex-wrap items-start gap-x-4 gap-y-3 p-4 @lg:p-5">
            <AppAvatar initials={ELENA?.initials ?? "ER"} size="lg" className="h-12 w-12 text-ui" />
            <div className="min-w-0 flex-1">
              <p className="font-serif text-[26px] leading-[1.1] text-app-text">{ELENA_ALLERGY.client}</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                <AppStatus tone="success" dot>
                  Active
                </AppStatus>
                <AppStatus tone="danger">{ELENA_ALLERGY.flag}</AppStatus>
              </div>
            </div>
            <div className="flex w-full flex-wrap items-center gap-2 @xl:w-auto">
              <span className="relative">
                <AppButton icon={ClipboardList} className="h-7 px-2.5 text-ui-xs">
                  Briefing
                </AppButton>
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-app-active-fg ring-2 ring-white" />
              </span>
              <AppButton variant="ghost" icon={MessageSquare} className="h-7 px-2 text-ui-xs">
                Message
              </AppButton>
              <AppButton variant="primary" icon={CalendarPlus} className="h-7 px-2.5 text-ui-xs">
                Book
              </AppButton>
            </div>
            {/* ClientDetail.tsx identity line: phone, email, Instagram handle. */}
            <div className="flex w-full min-w-0 flex-wrap gap-x-4 gap-y-1 text-ui-sm text-app-mute">
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap tabular-nums">
                <Phone size={12} strokeWidth={1.8} /> {ELENA_CONTACT.phone}
              </span>
              <span className="inline-flex min-w-0 items-center gap-1.5">
                <Mail size={12} strokeWidth={1.8} className="shrink-0" />
                <span className="truncate">{ELENA_CONTACT.email}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <Camera size={12} strokeWidth={1.8} /> @{ELENA_CONTACT.instagram}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 border-t border-app-border p-4 @3xl:grid-cols-4 @lg:px-5">
            <BriefStat icon={CalendarClock} label="Next session" value={nextLabel} tone="rust" />
            <BriefStat icon={Palette} label="Project" value={`${PROJECT?.title ?? "Back piece"} · ${TODAY?.session?.n ?? 2}\u00a0of\u00a0${TODAY?.session?.of ?? 3}`} />
            <BriefStat icon={Wallet} label="Deposit" value={`${usd(POOL.availableCents)} available`} />
            <BriefStat icon={FileSignature} label="Forms" value="All signed" tone="success" />
          </div>
        </div>

        <div className="-mx-4 @lg:-mx-6">
          <AppTabs tabs={TABS.map((t) => ({ label: t.label, count: t.count }))} active={active} className="@lg:px-6" />
        </div>
        <Panel />
      </div>
    </AppFrame>
  );
}
