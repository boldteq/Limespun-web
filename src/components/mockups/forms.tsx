import type React from "react";
import type { LucideIcon } from "lucide-react";
import {
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  Download,
  ExternalLink,
  FileText,
  FlaskConical,
  HeartPulse,
  Link2,
  MoreHorizontal,
  Pencil,
  PenLine,
  Plus,
  QrCode,
  RotateCcw,
  Smartphone,
  Stethoscope,
  Users,
  X,
} from "lucide-react";
import { LimespunMark } from "@/components/brand/limespun-mark";
import { AppShellPhone, SampleTag } from "@/components/system";
import { cn } from "@/components/system/cn";
import { AppFrame } from "./app-frame";
import { AppAvatar, AppButton, AppStatus, AppTable, AppTabs, type AppColumn, type AppStatusTone, type AppTableRow } from "./app-parts";
import { ELENA_ALLERGY, FORM_TEMPLATES, STUDIO_LABEL, SUBMISSIONS, TODAY_SESSIONS, type Submission } from "./sample-data";

/**
 * Forms (app route /forms) and the client's signing page (/consent/[token]).
 * FormsScreen mirrors forms/_proto: the Templates tab (kind tile, name, kind ·
 * fields, Auto-sent / Required chips, uses, Edit), the Submissions tab (status
 * chips All · Signed · Sent · Expired · Voided, no counts, as the app draws
 * them) and the live front-desk kiosk ("Kiosk is live"), which covers the
 * whole app as it does in the product.
 * ConsentSignPhone is Elena R. signing "Tattoo consent — general" on her phone
 * at 9:42: the tattoo preset's checks (over 18, placement & design agreed, no
 * contraindications, aftercare understood) and her signature. Allergies are a
 * Medical history question, not part of this form.
 */

export type FormsTab = "templates" | "submissions" | "kiosk";

/* ─── Templates ──────────────────────────────────────────────────────────── */

interface TemplateRow {
  name: string;
  /** The app's kind label (forms/_proto/data.ts KIND_LABEL). */
  kind: string;
  icon: LucideIcon;
  /** Field count of the app's preset for this kind (PRESET_FIELDS). */
  fields: number;
  uses: number;
  autoSent?: boolean;
  required?: boolean;
}

const KIND_META: Record<string, { kind: string; icon: LucideIcon; fields: number; autoSent?: boolean; required?: boolean }> = {
  "Tattoo consent — general": { kind: "Tattoo consent", icon: PenLine, fields: 7, autoSent: true, required: true },
  "Medical history": { kind: "Custom", icon: Stethoscope, fields: 6, autoSent: true, required: true },
  "Aftercare acknowledgement": { kind: "Aftercare", icon: HeartPulse, fields: 3 },
  "Touch-up waiver": { kind: "Touch-up", icon: RotateCcw, fields: 3 },
  "Minor / guardian consent": { kind: "Minor / guardian", icon: Users, fields: 5 },
  "Photo & social release": { kind: "Photo & social release", icon: Camera, fields: 4 },
};

/** The studio's six templates from sample-data, plus the REACH ink disclosure added this week. */
const TEMPLATES: TemplateRow[] = [
  ...FORM_TEMPLATES.map((t) => {
    const meta = KIND_META[t.name] ?? { kind: "Custom", icon: FileText, fields: 2 };
    return { name: t.name, uses: t.submissions30d, ...meta };
  }),
  { name: "REACH ink disclosure", kind: "REACH ink disclosure", icon: FlaskConical, fields: 3, uses: 0 },
];

function KindTile({ icon: Icon, size = "md" }: { icon: LucideIcon; size?: "md" | "sm" }) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-app bg-app-active text-app-active-fg",
        size === "md" ? "h-9 w-9" : "h-7 w-7",
      )}
    >
      <Icon size={size === "md" ? 16 : 13} strokeWidth={1.8} />
    </span>
  );
}

function TemplatesCard() {
  return (
    <div className="overflow-hidden rounded-app-lg bg-app-surface ring-1 ring-app-border">
      <div className="flex items-center justify-between gap-3 border-b border-app-border px-4 py-3">
        <div>
          <p className="text-ui font-semibold text-app-text">Form templates</p>
          <p className="text-ui-xs text-app-mute">{TEMPLATES.length} active</p>
        </div>
        <div className="flex rounded-app bg-graphite/[0.05] p-0.5">
          <span className="rounded-[6px] bg-app-surface px-2.5 py-1 text-ui-xs font-semibold text-app-text shadow-[0_1px_2px_rgba(28,25,23,0.08)]">Active</span>
          <span className="px-2.5 py-1 text-ui-xs font-medium text-app-soft">Archived</span>
        </div>
      </div>
      {TEMPLATES.map((t) => (
        <div key={t.name} className="flex items-center gap-3 border-b border-app-border px-4 py-2.5 last:border-b-0">
          <KindTile icon={t.icon} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-ui font-semibold text-app-text">{t.name}</p>
            <p className="truncate text-ui-xs text-app-mute">
              {t.kind} · {t.fields} fields
            </p>
          </div>
          <div className="hidden shrink-0 items-center gap-1.5 @xl:flex">
            {t.autoSent && (
              <AppStatus tone="neutral" dot>
                Auto-sent
              </AppStatus>
            )}
            {t.required && <AppStatus tone="active">Required</AppStatus>}
          </div>
          <div className="shrink-0 text-right">
            <p className="text-ui font-bold text-app-text tabular-nums">{t.uses}</p>
            <p className="text-[10px] whitespace-nowrap text-app-mute">30 days</p>
          </div>
          <span className="hidden shrink-0 items-center gap-1 @2xl:flex">
            <AppButton icon={Pencil} className="h-7 px-2.5 text-ui-xs">
              Edit
            </AppButton>
            <MoreHorizontal size={16} strokeWidth={1.8} className="text-app-mute" />
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── Submissions ────────────────────────────────────────────────────────── */

type SubStatus = Submission["status"] | "Expired";

type SubRow = {
  client: string;
  form: string;
  session: string;
  status: SubStatus;
  when: string;
  via: Submission["via"];
  /** The line under the date when it isn't "on the kiosk" / "on their phone" / "by link". */
  how?: string;
};

/** Owen P.'s medical history link, sent Tue, Sep 29 before he had a booking, lapsed unsigned after seven days. */
const EXPIRED: SubRow = {
  client: "Owen P.",
  form: "Medical history",
  session: "—",
  status: "Expired",
  when: "Sent Tue, Sep 29",
  via: "Link",
};

/** The same form, filled in as the Intake step when he booked his calf piece on Dev's page (BookingFlowPhone). */
const OWEN_INTAKE: SubRow = {
  client: "Owen P.",
  form: "Medical history",
  session: "New piece, calf",
  status: "Signed",
  when: "Wed, 7:28 PM",
  via: "Link",
  how: "at booking",
};

/** Bea L.'s consent for session 2, signed on the kiosk before Wednesday's sitting. */
const BEA_CONSENT: SubRow = {
  client: "Bea L.",
  form: "Tattoo consent — general",
  session: "Botanical half sleeve, session 2",
  status: "Signed",
  when: "Wed, 11:52 AM",
  via: "Kiosk",
};

/**
 * Page one of every submission, in the app's order (the list sorts on
 * signed_at, newest first, so the unsigned ones lead): Priya's open link and
 * Owen's lapsed one, then today's three signatures and Wednesday's two (Owen's
 * intake when he booked, Bea's consent before her sitting). The list
 * runs on past the frame; the app shows no totals on the tabs or chips.
 */
const SUB_ROWS: SubRow[] = [
  ...SUBMISSIONS.filter((x) => x.status !== "Signed"),
  EXPIRED,
  ...SUBMISSIONS.filter((x) => x.status === "Signed" && x.when.startsWith("Today")),
  OWEN_INTAKE,
  BEA_CONSENT,
];

const SUB_TONE: Record<SubStatus, AppStatusTone> = { Signed: "success", Sent: "info", Expired: "neutral" };
const SUB_FILTERS = ["All", "Signed", "Sent", "Expired", "Voided"];

const SUB_COLUMNS: AppColumn[] = [
  { label: "Client" },
  { label: "Form" },
  { label: "Linked booking", className: "hidden @2xl:table-cell" },
  { label: "Status" },
  { label: "Date", align: "right" },
];

function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .replace(".", "");
}

function SubmissionsCard() {
  const rows: AppTableRow[] = SUB_ROWS.map((s) => ({
    key: `${s.client}-${s.form}-${s.status}`,
    cells: [
      <span key="c" className="flex items-center gap-2">
        <AppAvatar initials={initials(s.client)} size="sm" />
        <span className="font-semibold text-app-text">{s.client}</span>
      </span>,
      <span key="f" className="text-app-text">
        {s.form}
      </span>,
      <span key="b" className="text-app-soft">
        {s.session}
      </span>,
      <AppStatus key="s" tone={SUB_TONE[s.status]}>
        {s.status}
      </AppStatus>,
      <span key="d" className="flex flex-col leading-tight">
        <span className="text-app-text">{s.when}</span>
        <span className="text-ui-xs text-app-mute">{s.how ?? (s.status === "Signed" ? `on ${s.via === "Kiosk" ? "the kiosk" : s.via === "Phone" ? "their phone" : "the link"}` : "by link")}</span>
      </span>,
    ],
  }));
  return (
    <div className="overflow-hidden rounded-app-lg bg-app-surface ring-1 ring-app-border">
      <div className="flex flex-wrap items-center gap-1.5 border-b border-app-border px-4 py-3">
        {SUB_FILTERS.map((f, i) => (
          <span
            key={f}
            className={cn(
              "inline-flex h-6 items-center rounded-full px-2.5 text-ui-xs font-semibold",
              i === 0 ? "bg-app-text text-white" : "bg-graphite/[0.06] text-app-soft",
            )}
          >
            {f}
          </span>
        ))}
        <span className="ml-auto hidden items-center gap-1.5 @2xl:flex">
          <span className="inline-flex h-7 items-center gap-1 rounded-app border border-app-border px-2.5 text-ui-xs font-semibold text-app-text">
            All forms <ChevronDown size={12} strokeWidth={2} className="text-app-mute" />
          </span>
          <span className="inline-flex h-7 items-center gap-1 rounded-app border border-app-border px-2.5 text-ui-xs font-semibold text-app-text">
            All dates <ChevronDown size={12} strokeWidth={2} className="text-app-mute" />
          </span>
        </span>
      </div>
      {/* The list runs on (25 a page): the last row fades out rather than ending the set. */}
      <div className="relative">
        <AppTable columns={SUB_COLUMNS} rows={rows} minWidth={560} className="hidden @xl:block" />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-app-surface to-transparent" />
      </div>
      {/* Narrow frames: the same rows stacked, status in view. */}
      <div className="relative divide-y divide-app-border @xl:hidden">
        {SUB_ROWS.map((s) => (
          <div key={`${s.client}-${s.form}-${s.status}`} className="flex items-center gap-2.5 px-3.5 py-2.5">
            <AppAvatar initials={initials(s.client)} size="sm" />
            <span className="flex min-w-0 flex-1 flex-col leading-tight">
              <span className="truncate text-ui-sm font-semibold text-app-text">{s.client}</span>
              <span className="text-ui-xs leading-snug text-app-mute">
                {s.when} · {s.form}
              </span>
            </span>
            <AppStatus tone={SUB_TONE[s.status]}>{s.status}</AppStatus>
          </div>
        ))}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-app-surface to-transparent" />
      </div>
    </div>
  );
}

/* ─── Kiosk ──────────────────────────────────────────────────────────────── */

/**
 * forms/_proto/KioskFlow.tsx, live: a full-screen dark overlay over the whole
 * app, the mark, "Kiosk is live", the template, the kiosk link and its actions.
 */
const KIOSK_URL = "https://app.limespun.com/consent/kiosk/k7q2hw9m";

function KioskButton({ icon: Icon, className, children }: { icon?: LucideIcon; className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex h-9 items-center justify-center gap-1.5 rounded-app-lg border border-ink-line px-3.5 text-ui-sm font-semibold whitespace-nowrap text-ink-text",
        className,
      )}
    >
      {Icon && <Icon size={14} strokeWidth={1.8} />}
      {children}
    </span>
  );
}

function KioskScreen({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "@container relative flex w-full max-w-full min-w-0 flex-col items-center justify-center overflow-hidden rounded-window bg-ink px-5 pt-14 pb-10 text-center shadow-lift ring-1 ring-graphite/5 sm:min-h-[420px]",
        className,
      )}
    >
      <SampleTag className="absolute top-4 left-4 border-ink-line text-ink-muted" />
      <span className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-app border border-ink-line text-ink-muted">
        <X size={15} strokeWidth={1.8} />
      </span>
      <div className="flex w-full max-w-[460px] flex-col items-center gap-3">
        <LimespunMark size={32} />
        <p className="text-[11px] font-bold tracking-[0.14em] text-ember uppercase">Kiosk is live</p>
        <p className="font-serif text-[26px] leading-tight text-ink-text @md:text-[30px]">Tattoo consent — general</p>
        <p className="max-w-[400px] text-ui-sm leading-relaxed text-ink-muted">
          Open this link on the front-desk iPad. Clients look themselves up and sign, and the signature is stored with their record.
        </p>
        <p className="mt-1 w-full rounded-app-lg border border-ink-line bg-ink-pill px-3.5 py-3 text-left text-ui-sm break-all text-ink-text">
          {KIOSK_URL}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <KioskButton icon={Link2}>Copy link</KioskButton>
          <KioskButton icon={QrCode}>Download QR</KioskButton>
          <KioskButton icon={ExternalLink}>Open</KioskButton>
        </div>
        <KioskButton className="mt-1">End session</KioskButton>
      </div>
    </div>
  );
}

export function FormsScreen({ tab = "templates", className }: { tab?: FormsTab; className?: string }) {
  if (tab === "kiosk") return <KioskScreen className={className} />;
  const onSubs = tab === "submissions";
  return (
    // ScrForms.tsx header: the template count, Launch kiosk, and New template on the Templates tab only.
    <AppFrame
      active="forms"
      meta={`${TEMPLATES.length} templates`}
      actions={
        onSubs ? (
          <AppButton icon={Smartphone}>Launch kiosk</AppButton>
        ) : (
          <>
            <AppButton icon={Smartphone}>Launch kiosk</AppButton>
            <AppButton variant="primary" icon={Plus}>
              New template
            </AppButton>
          </>
        )
      }
      className={className}
    >
      <AppTabs
        tabs={[{ label: "Templates" }, { label: "Submissions" }]}
        active={onSubs ? "Submissions" : "Templates"}
        className="mt-1"
      />
      <div className="px-4 py-4 @lg:px-5">{onSubs ? <SubmissionsCard /> : <TemplatesCard />}</div>
    </AppFrame>
  );
}

/* ─── The client's phone: /consent/[token] ───────────────────────────────── */

const ELENA_SESSION = TODAY_SESSIONS.find((s) => s.id === "elena-s2");
/** The tattoo preset's seven fields (forms/_proto/data.ts PRESET_FIELDS.tattoo): one progress segment each. */
const TATTOO_FIELDS = [
  "Full legal name",
  "Date of birth",
  "I confirm I am over 18",
  "Placement & design agreed",
  "I have no contraindications",
  "Aftercare understood",
  "Client signature",
];
/** "9:42", from "Consent signed 9:42 on her phone". */
const SIGNED_AT = ELENA_ALLERGY.consent.match(/\d{1,2}:\d{2}/)?.[0] ?? "9:42";

function Tick({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 rounded-app px-2.5 py-2 ring-1 ring-app-border">
      <span className="mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] bg-app-text text-white">
        <Check size={10} strokeWidth={3} />
      </span>
      <span className="text-[11px] leading-snug text-app-text">{children}</span>
    </div>
  );
}

export type ConsentSignState = "form" | "done";

export function ConsentSignPhone({ state = "form", label, className }: { state?: ConsentSignState; label?: string; className?: string }) {
  return (
    <AppShellPhone label={label} className={className}>
      <div className="flex h-[440px] flex-col text-left">
        <div className="flex flex-col items-center gap-2 border-b border-app-border bg-app-sidebar px-3.5 pt-3 pb-3">
          <div className="flex w-full items-center justify-between">
            <LimespunMark size={20} />
            <SampleTag className="px-1.5 text-[10px]" />
          </div>
          <p className="font-serif text-[22px] leading-none text-app-text">
            {state === "done" ? (
              <>
                All <em className="text-app-active-fg">signed</em>
              </>
            ) : (
              "Tattoo consent"
            )}
          </p>
          <p className="truncate text-[10px] text-app-mute">
            {ELENA_SESSION ? `${ELENA_SESSION.piece}, session ${ELENA_SESSION.session?.n} · Oct 8, ${ELENA_SESSION.start}` : ""}
          </p>
        </div>

        {state === "form" ? (
          <div className="flex flex-1 flex-col gap-2 px-3.5 pt-3 pb-4">
            <div className="flex items-center gap-1">
              {TATTOO_FIELDS.map((f) => (
                <span key={f} className="h-1 flex-1 rounded-full bg-app-text" />
              ))}
            </div>
            <Tick>I confirm I am over 18</Tick>
            <Tick>Placement &amp; design agreed</Tick>
            <Tick>I have no contraindications</Tick>
            <Tick>Aftercare understood</Tick>
            <div className="rounded-app px-2.5 pt-1 pb-1.5 ring-1 ring-app-border">
              <p className="text-[10px] font-medium text-app-soft">Client signature</p>
              <svg viewBox="0 0 160 34" className="h-7 w-auto text-app-text" fill="none" aria-hidden="true">
                <path
                  d="M5 22c4-9 9-15 12-13s-5 15-1 14 7-12 11-12-1 9 3 9 5-7 8-7 0 7 4 6 4-8 8-8-2 9 2 9 7-5 10-7m8 9c12-2 30-5 44-2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="mt-auto flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-app bg-app-success-bg text-[12px] font-semibold text-app-success">
              <CheckCircle2 size={14} strokeWidth={2.2} />
              Signed {SIGNED_AT}
            </span>
          </div>
        ) : (
          <div className="flex flex-1 flex-col gap-3 px-3.5 pt-4 pb-4">
            <p className="text-center text-[11px] leading-snug text-app-soft">
              Your consent form for <span className="font-semibold text-app-text">{STUDIO_LABEL}</span> has been signed and recorded.
            </p>
            <div className="rounded-app bg-graphite/[0.04] px-3 py-2.5">
              <p className="text-[10px] font-bold tracking-[0.08em] text-app-mute uppercase">Receipt</p>
              <p className="mt-0.5 text-[12px] font-semibold text-app-text tabular-nums">Oct 8, 2026, {SIGNED_AT} AM</p>
            </div>
            <p className="text-[10px] font-bold tracking-[0.08em] text-app-mute uppercase">Your copy</p>
            <span className="flex h-9 items-center justify-center gap-1.5 rounded-app bg-app-text text-[12px] font-semibold text-white">
              <Download size={13} strokeWidth={2} /> Download PDF
            </span>
            <span className="flex h-9 items-center justify-center gap-1.5 rounded-app text-[12px] font-semibold text-app-text ring-1 ring-app-border">
              <ExternalLink size={13} strokeWidth={2} /> View signed form
            </span>
            <p className="mt-auto text-center text-[10px] text-app-mute">A confirmation goes to your email.</p>
          </div>
        )}
      </div>
    </AppShellPhone>
  );
}
