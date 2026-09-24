import type React from "react";
import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  CalendarRange,
  Check,
  ChevronDown,
  ChevronLeft,
  Eye,
  Hourglass,
  Menu,
  MessageSquare,
  Minus,
  Percent,
  Phone,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";
import { AppShellPhone, SampleTag, cn } from "@/components/system";
import { AppAvatar, AppButton, AppStatus } from "@/components/mockups/app-parts";
import { PAYROLL_TIPS_CENTS } from "@/components/mockups/payments";
import {
  ARTISTS,
  JO_SUGGESTED_REPLY,
  JO_THREAD,
  PAYOUT_WEEK,
  PERMISSIONS,
  THREADS,
  WEEK_PAYOUTS,
  payRuleLabel,
  usd,
  type TeamRole,
} from "@/components/mockups/sample-data";

/*
 * Screens for /for/multi-chair (Busy shops, Pro), from the sample studio as it is: Dev
 * (owner, 60%), Mara (artist, booth rent), Rio (guest spot Fri Oct 2 – Fri Oct 9, 70/30)
 * and Noor on the front desk. Labels are the app's (InkOS guest-artists/[id]
 * GuestEngagementTabs, components/payroll/PayrollStepper.tsx and PayrollHub,
 * messages/_proto composer, settings/team PermissionsMatrix); numbers come from
 * sample-data.ts and the payments mockup.
 */

/** The app's top bar over the work area, as the app lays a screen out behind its drawer. */
function StaffPhone({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <AppShellPhone>
      <div className="flex h-[440px] flex-col text-left">
        <div className="flex h-10 shrink-0 items-center gap-2 border-b border-app-border px-3">
          <Menu size={14} strokeWidth={1.8} className="shrink-0 text-app-mute" />
          <span className="min-w-0 flex-1 truncate text-[12px] font-semibold text-app-text">{title}</span>
          <SampleTag className="px-1.5 text-[10px]" />
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden px-3 pt-3 pb-3.5">{children}</div>
      </div>
    </AppShellPhone>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <span className={cn("relative h-4 w-7 shrink-0 rounded-full", on ? "bg-app-active-fg" : "bg-graphite/15")}>
      <span className={cn("absolute top-0.5 h-3 w-3 rounded-full bg-white shadow-[0_1px_2px_rgba(28,25,23,0.2)]", on ? "left-[14px]" : "left-0.5")} />
    </span>
  );
}

/* ─── Week 1: Rio's guest spot ──────────────────────────────────────────────
   The engagement page: dates, split, the days of the spot (today is Thu, Oct 8;
   Fri, Oct 9 is the last), who can book him, what he can open, and the seat
   ending with the spot. */

const RIO = ARTISTS.rio;
const SPOT = RIO.guestSpot ?? { from: "Fri, Oct 2", to: "Fri, Oct 9" };
const SPOT_DAYS: { dow: string; day: number; state: "worked" | "off" | "today" | "last" }[] = [
  { dow: "Fri", day: 2, state: "worked" },
  { dow: "Sat", day: 3, state: "worked" },
  { dow: "Sun", day: 4, state: "worked" },
  { dow: "Mon", day: 5, state: "off" },
  { dow: "Tue", day: 6, state: "worked" },
  { dow: "Wed", day: 7, state: "off" },
  { dow: "Thu", day: 8, state: "today" },
  { dow: "Fri", day: 9, state: "last" },
];

/** GuestEngagementTabs.tsx access toggles, as the guest-artists mockup sets them. */
const ACCESS: { label: string; icon: LucideIcon; on: boolean }[] = [
  { label: "View client history", icon: Eye, on: true },
  { label: "View other bookings", icon: CalendarRange, on: false },
  { label: "Send messages", icon: MessageSquare, on: true },
];

export function GuestSpotPhone() {
  return (
    <StaffPhone title="Team">
      <p className="-mb-1 flex items-center gap-0.5 text-[10px] font-semibold text-app-mute">
        <ChevronLeft size={11} strokeWidth={2.2} />
        Guest Artists
      </p>
      <div className="flex items-start gap-2.5">
        <AppAvatar initials={RIO.initials} tone={RIO.tone} size="lg" />
        <div className="min-w-0">
          <span className="flex items-center gap-1.5">
            <span className="font-serif text-[22px] leading-none text-app-text">{RIO.name}</span>
            <span className="rounded-full bg-app-text px-1.5 text-[10px] leading-4 font-semibold text-white">Active</span>
          </span>
          <span className="mt-1 flex items-center gap-1 text-[10px] text-app-mute">
            <CalendarDays size={11} strokeWidth={1.9} />
            {SPOT.from} — {SPOT.to}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-app-mute">
            <Percent size={11} strokeWidth={1.9} />
            {payRuleLabel(RIO.pay)}
          </span>
        </div>
      </div>

      <div className="-mx-1 grid grid-cols-8 gap-px">
        {SPOT_DAYS.map((d) => (
          <span
            key={d.day}
            className={cn(
              "flex min-w-0 flex-col items-center rounded-[6px] pt-1 pb-[5px] text-center",
              d.state === "worked" && "bg-app-sidebar text-app-soft",
              d.state === "off" && "text-app-mute",
              d.state === "today" && "bg-app-active text-app-active-fg ring-1 ring-app-active-fg/30",
              d.state === "last" && "border border-dashed border-app-border text-app-text",
            )}
          >
            <span className="text-[10px] leading-tight font-semibold">{d.dow}</span>
            <span className="text-[11px] leading-tight font-bold tabular-nums">{d.day}</span>
          </span>
        ))}
      </div>

      {/* Booking page visibility, with Visible chosen (the other choice, Hidden, is staff-only) */}
      <div className="flex items-center gap-2 rounded-app-lg bg-app-active/50 px-2.5 py-1.5 ring-1 ring-app-active-fg/25">
        <span className="flex h-3 w-3 shrink-0 items-center justify-center rounded-full border border-app-active-fg">
          <span className="h-1.5 w-1.5 rounded-full bg-app-active-fg" />
        </span>
        <span className="min-w-0 text-[10.5px] leading-snug text-app-text">
          <span className="font-semibold">Visible</span> <span className="text-app-mute">· clients can book online</span>
        </span>
      </div>

      <div className="overflow-hidden rounded-app-lg ring-1 ring-app-border">
        <p className="border-b border-app-border px-2.5 py-1.5 text-[11px] font-semibold text-app-text">App permissions</p>
        {ACCESS.map((p, i) => (
          <div key={p.label} className={cn("flex items-center gap-2 px-2.5 py-[5px]", i < ACCESS.length - 1 && "border-b border-app-border")}>
            <p.icon size={12} strokeWidth={1.9} className="shrink-0 text-app-soft" />
            <span className="min-w-0 flex-1 truncate text-[10.5px] font-medium text-app-text">{p.label}</span>
            <Toggle on={p.on} />
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-start gap-1.5 rounded-app bg-app-warning-bg px-2.5 py-2">
        <Hourglass size={12} strokeWidth={1.9} className="mt-px shrink-0 text-app-warning" />
        <span className="text-[10px] leading-snug text-app-text">
          <span className="font-semibold">Access ends with the engagement.</span> {RIO.name}&rsquo;s seat deactivates after {SPOT.to}.
        </span>
      </div>
    </StaffPhone>
  );
}

/* ─── Week 2: the payroll run that paid Sep 28 – Oct 4 ──────────────────────
   A run holds artist pay only (commission + tips, never what clients were billed);
   PayrollStepper's five steps are all done. Totals are computed from the rows. */

const STEPS = ["Calculate", "Review", "Approve", "Pay", "Complete"];
const RUN = WEEK_PAYOUTS.map((p) => ({ ...p, tipsCents: PAYROLL_TIPS_CENTS[p.artist] }));
const RUN_TOTAL_CENTS = RUN.reduce((total, r) => total + r.payoutCents + r.tipsCents, 0);

export function PayrollRunPhone() {
  return (
    <StaffPhone title="Payments">
      {/* Payroll's own tabs; whole tabs only, one line. The app labels the third tab
          "1099-K Forms"; contractor pay is reported on 1099-NEC (the app's own Terms say
          "1099-NEC data"), so the site says "1099" until the app's label is settled. */}
      <div className="-mx-3 -mt-3 flex h-[33px] flex-wrap gap-x-3.5 overflow-hidden border-b border-app-border px-3">
        {["Runs", "Artists Tax Info", "1099 Forms"].map((t) => (
          <span
            key={t}
            className={cn(
              "h-[33px] border-b-2 text-[10.5px] leading-[31px] font-semibold whitespace-nowrap",
              t === "Runs" ? "border-app-active-fg text-app-text" : "border-transparent text-app-mute",
            )}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between gap-2">
        <span className="text-[13px] font-semibold text-app-text tabular-nums">{PAYOUT_WEEK.label}</span>
        <AppStatus tone="success" dot className="h-[18px] px-1.5 text-[10px]">
          Paid
        </AppStatus>
      </div>

      <div>
        <div className="flex items-center">
          {STEPS.map((step, i) => (
            <span key={step} className="flex flex-1 items-center last:flex-none">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-app-success text-white">
                <Check size={9} strokeWidth={3.2} />
              </span>
              {i < STEPS.length - 1 && <span className="mx-1 h-px flex-1 bg-app-success/40" />}
            </span>
          ))}
        </div>
        <p className="mt-1.5 text-[10px] text-app-mute">
          <span className="font-semibold text-app-text">Complete</span> · All artists paid {PAYOUT_WEEK.paidOn}
        </p>
      </div>

      <div className="overflow-hidden rounded-app-lg ring-1 ring-app-border">
        {RUN.map((r) => (
          <div key={r.artist} className="flex items-center gap-1.5 border-b border-app-border px-2 py-2">
            <AppAvatar initials={ARTISTS[r.artist].initials} tone={ARTISTS[r.artist].tone} size="xs" className="text-[10px]" />
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-semibold text-app-text">
                {ARTISTS[r.artist].name}
                {ARTISTS[r.artist].kind === "Guest" && <span className="font-normal text-app-mute"> · guest</span>}
              </span>
              <span className="block text-[10px] whitespace-nowrap text-app-mute tabular-nums">
                {usd(r.payoutCents)} + {usd(r.tipsCents)} tips
              </span>
            </span>
            <span className="text-[11px] font-semibold text-app-text tabular-nums">{usd(r.payoutCents + r.tipsCents)}</span>
          </div>
        ))}
        <div className="flex items-center justify-between bg-graphite/[0.03] px-2.5 py-2 text-[11px]">
          <span className="text-app-mute">Run total</span>
          <span className="font-semibold text-app-text tabular-nums">{usd(RUN_TOTAL_CENTS)}</span>
        </div>
      </div>
    </StaffPhone>
  );
}

/* ─── Week 3: a suggested reply waits in Mara's reply box ───────────────────
   Jo K. texts at 10:36 that she's late for her 11:00 consult. The suggestion chip
   drops the reply into the composer to edit (never sends by itself); Send carries
   the channel. */

const JO = THREADS.find((t) => t.client === "Jo K.");
const OUTBOUND = "bg-[color-mix(in_oklch,var(--color-app-active-fg)_8%,white)]";

export function SuggestedReplyPhone() {
  const last = JO_THREAD[JO_THREAD.length - 1];
  const before = JO_THREAD[JO_THREAD.length - 2];
  return (
    <StaffPhone title="Messages">
      <div className="-mx-3 -mt-3 flex items-center gap-2 border-b border-app-border px-3 py-2">
        <ChevronLeft size={13} strokeWidth={2} className="shrink-0 text-app-mute" />
        <AppAvatar initials={JO?.initials ?? "JK"} size="sm" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[11.5px] font-semibold text-app-text">{JO?.client ?? "Jo K."}</span>
          <span className="block text-[10px] text-app-mute">{JO?.channel ?? "SMS"}</span>
        </span>
        <span className="inline-flex h-6 shrink-0 items-center gap-1 rounded-full px-2 text-[10px] font-semibold text-app-text ring-1 ring-app-border">
          <AppAvatar initials={ARTISTS.mara.initials} tone={ARTISTS.mara.tone} size="xs" className="h-4 w-4 text-[10px]" />
          {ARTISTS.mara.name}
          <ChevronDown size={10} strokeWidth={2} />
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        {before && (
          <div className="flex flex-col items-end gap-0.5">
            <p className={cn("max-w-[88%] rounded-[12px] rounded-br-[4px] px-2.5 py-1.5 text-[10.5px] leading-snug text-app-text", OUTBOUND)}>
              {before.text}
            </p>
            <span className="text-[10px] text-app-mute tabular-nums">
              {before.by} · {before.time}
            </span>
          </div>
        )}
        {last && (
          <div className="flex flex-col items-start gap-0.5">
            <p className="max-w-[88%] rounded-[12px] rounded-bl-[4px] bg-white px-2.5 py-1.5 text-[10.5px] leading-snug text-app-text shadow-[0_1px_2px_rgba(28,25,23,0.07)] ring-1 ring-app-border">
              {last.text}
            </p>
            <span className="text-[10px] text-app-mute tabular-nums">{last.time}</span>
          </div>
        )}
      </div>

      <div className="mt-auto overflow-hidden rounded-app-lg ring-1 ring-app-border">
        <div className="border-b border-app-border px-2 py-1.5">
          <span className="inline-flex h-6 max-w-full items-center gap-1 rounded-full bg-graphite/[0.05] px-2 text-[10px] font-medium text-app-text">
            <Sparkles size={10} strokeWidth={1.8} className="shrink-0 text-app-mute" />
            <span className="truncate">{JO_SUGGESTED_REPLY}</span>
          </span>
        </div>
        <p className="px-2.5 pt-2 pb-1 text-[10.5px] leading-snug text-app-text">
          {JO_SUGGESTED_REPLY}
          <span className="ml-px inline-block h-3 w-px translate-y-0.5 bg-app-text" />
        </p>
        <div className="flex justify-end px-2 pb-2">
          <AppButton variant="onyx" icon={Send} className="h-7 px-2.5 text-[10.5px]">
            Send · {JO?.channel ?? "SMS"}
          </AppButton>
        </div>
      </div>
    </StaffPhone>
  );
}

/* ─── Before / after: what two roles can open ───────────────────────────────
   Team › Roles & permissions (PermissionsMatrix): the grants each preset role
   starts with, read from sample-data PERMISSIONS (column order Owner, Admin,
   Artist, Front desk, Guest). */

const MATRIX_ROLES: TeamRole[] = ["Owner", "Admin", "Artist", "Front desk", "Guest"];
const ROLE_META: Partial<Record<TeamRole, { note: string; icon: LucideIcon; who: string }>> = {
  Artist: { note: "Own work & pay", icon: UserRound, who: ARTISTS.mara.name },
  "Front desk": { note: "Booking only, no financials", icon: Phone, who: "Noor" },
};

export function RolePhone({ role }: { role: "Artist" | "Front desk" }) {
  const col = MATRIX_ROLES.indexOf(role);
  const meta = ROLE_META[role];
  const groups = [...new Set(PERMISSIONS.map((p) => p.group))];
  const Icon = meta?.icon ?? UserRound;
  return (
    <StaffPhone title="Team">
      <p className="-mb-1 flex items-center gap-0.5 text-[10px] font-semibold text-app-mute">
        <ChevronLeft size={11} strokeWidth={2.2} />
        Roles &amp; permissions
      </p>
      <div className="flex items-center gap-2.5 rounded-app-lg bg-app-sidebar p-2.5 ring-1 ring-app-border">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-app bg-white text-app-soft ring-1 ring-app-border">
          <Icon size={14} strokeWidth={1.9} />
        </span>
        <span className="min-w-0">
          <span className="flex items-center gap-1.5 text-[12px] font-bold text-app-text">
            {role}
            <span className="font-medium text-app-mute">· {meta?.who}</span>
          </span>
          <span className="block text-[10px] leading-snug text-app-mute">{meta?.note}</span>
        </span>
      </div>
      <div className="-mx-3 flex flex-col">
        {groups.map((g) => (
          <div key={g}>
            <p className="bg-app-sidebar px-3 py-0.5 text-[10px] font-bold tracking-[0.08em] text-app-mute uppercase">{g}</p>
            {PERMISSIONS.filter((p) => p.group === g).map((p) => {
              const on = p.grants[col];
              return (
                <div key={p.label} className="flex items-center gap-2 border-b border-app-border px-3 py-1 last:border-b-0">
                  <span className={cn("min-w-0 flex-1 truncate text-[10.5px]", on ? "text-app-text" : "text-app-mute")}>{p.label}</span>
                  {on ? (
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-app-success-bg text-app-success">
                      <Check size={9} strokeWidth={3} />
                    </span>
                  ) : (
                    <Minus size={12} strokeWidth={2} className="shrink-0 text-app-border" />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </StaffPhone>
  );
}
