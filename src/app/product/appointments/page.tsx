import React from "react";
import { Check, Clock, Link2, Mail, MessageSquare } from "lucide-react";
import { AppShellPhone, SampleTag, cn } from "@/components/system";
import { FeaturePage } from "@/components/templates/feature-page";
import {
  AppAvatar,
  AppButton,
  AppFrame,
  AppLabel,
  AppStatus,
  AppointmentsScreen,
  ARTISTS,
  DEPOSITS,
  TODAY_SESSIONS,
  usd,
} from "@/components/mockups";
import { getFeature } from "@/lib/data/features";
import { PLAN_CAPS } from "@/lib/data/plans";
import { pageMetadata } from "@/lib/seo";

const feature = getFeature("appointments");

export const metadata = pageMetadata({
  title: feature.seo.title,
  description: feature.seo.description,
  path: "/product/appointments",
});

const BOOKINGS_ON_SOLO = PLAN_CAPS.find((c) => c.label === "Bookings a month")?.values.solo ?? "";

/* ─── Moment 1: Kira N. books on the studio's page ──────────────────────────
   Kira is new: a fine-line wrist piece with Mara, Sat, Nov 14, 12:00, and the
   service asks for a $150 deposit (she paid it at 8:05 this morning). The words
   are the public funnel's: the "$150 deposit" badge under the service name, the
   "Deposit required" notice with "You'll be prompted to pay the deposit on the
   confirmation page", then "You're booked" and "Pay deposit — $150.00"
   (app/book/[studioSlug]/[serviceId], confirmation/[token]). */
const KIRA = DEPOSITS.find((d) => d.client === "Kira N.");
const KIRA_PIECE = KIRA?.booking.split(" · ")[0] ?? "";
const KIRA_ARTIST = ARTISTS[KIRA?.artist ?? "mara"].name;
const KIRA_DEPOSIT = usd(KIRA?.cents ?? 0);
const KIRA_WHEN = "Sat, Nov 14 · 12:00 PM";
const STEPS = ["Artist", "Time", "Details", "Intake"] as const;

function StepDots({ step }: { step: number }) {
  return (
    <div className="flex items-start justify-between px-1">
      {STEPS.map((label, i) => {
        const n = i + 1;
        const done = n < step;
        const active = n === step;
        return (
          <div key={label} className="flex flex-1 flex-col items-center gap-1">
            <div className="flex w-full items-center">
              <span className={cn("h-px flex-1", i === 0 ? "bg-transparent" : n <= step ? "bg-app-text" : "bg-app-border")} />
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
                  done && "bg-app-text text-white",
                  active && "border-[1.5px] border-app-text text-app-text",
                  !done && !active && "border-[1.5px] border-app-border text-app-mute",
                )}
              >
                {done ? <Check size={11} strokeWidth={3} /> : n}
              </span>
              <span className={cn("h-px flex-1", i === STEPS.length - 1 ? "bg-transparent" : n < step ? "bg-app-text" : "bg-app-border")} />
            </div>
            <span className={cn("text-[10px] font-medium", active ? "text-app-text" : "text-app-mute")}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

function PhoneTop({ left }: { left: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <p className="text-[10px] text-app-mute">{left}</p>
      <SampleTag className="px-1.5 text-[10px]" />
    </div>
  );
}

function KiraDetails() {
  return (
    <AppShellPhone>
      <div className="flex h-[440px] flex-col gap-3 px-3.5 pt-3 pb-4 text-left">
        <div>
          <PhoneTop left={`Book with ${KIRA_ARTIST}`} />
          <div className="flex items-center gap-1.5">
            <p className="truncate text-[13px] font-semibold text-app-text">{KIRA_PIECE}</p>
            <span className="shrink-0 rounded-app bg-app-warning-bg px-1.5 py-px text-[10px] font-semibold text-app-warning tabular-nums">
              {KIRA_DEPOSIT} deposit
            </span>
          </div>
        </div>
        <StepDots step={3} />
        <p className="font-serif text-[21px] leading-[1.1] text-app-text">Your details</p>
        <div className="rounded-app px-2.5 py-2 ring-1 ring-app-border">
          <p className="text-[10px] font-bold tracking-[0.08em] text-app-mute uppercase">Summary</p>
          <p className="text-[12px] font-semibold text-app-text">{KIRA_PIECE}</p>
          <p className="text-[11px] text-app-mute tabular-nums">
            {KIRA_WHEN} · {KIRA_ARTIST}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            ["First name", "Kira"],
            ["Last name", "N."],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="mb-1 text-[10px] font-medium text-app-soft">{label}</p>
              <p className="flex h-8 items-center rounded-app px-2.5 text-[12px] text-app-text ring-1 ring-app-border">{value}</p>
            </div>
          ))}
        </div>
        <div className="rounded-app border border-app-warning/25 bg-app-warning-bg/60 px-2.5 py-2">
          <p className="text-[12px] font-semibold text-app-warning tabular-nums">Deposit required: {KIRA_DEPOSIT}</p>
          <p className="mt-0.5 text-[10px] leading-snug text-app-soft">You’ll be prompted to pay the deposit on the confirmation page.</p>
        </div>
        <span className="mt-auto flex h-9 shrink-0 items-center justify-center rounded-app bg-app-text text-[12px] font-semibold text-white">
          Continue
        </span>
      </div>
    </AppShellPhone>
  );
}

function KiraConfirmation({ className }: { className?: string }) {
  const rows: [string, string][] = [
    ["Service", KIRA_PIECE],
    ["Date & time", KIRA_WHEN],
    ["Artist", KIRA_ARTIST],
  ];
  return (
    <AppShellPhone className={className}>
      <div className="flex h-[440px] flex-col gap-3 px-3.5 pt-3 pb-4 text-left">
        <PhoneTop left="Booking" />
        <div className="flex flex-col items-center pt-2 text-center">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-app-success-bg text-app-success">
            <Check size={17} strokeWidth={2.6} />
          </span>
          <p className="mt-2.5 font-serif text-[24px] leading-none text-app-text">You’re booked</p>
          <p className="mt-1.5 text-[11px] text-app-mute">We’ve received your booking request.</p>
        </div>
        <div className="rounded-[12px] px-3 py-2 ring-1 ring-app-border">
          <p className="pb-1 text-[10px] font-bold tracking-[0.08em] text-app-mute uppercase">Booking details</p>
          {rows.map(([label, value]) => (
            <div key={label} className="border-b border-app-border py-1.5 last:border-b-0">
              <p className="text-[10px] leading-tight text-app-mute">{label}</p>
              <p className="text-[11px] leading-snug font-semibold text-app-text tabular-nums">{value}</p>
            </div>
          ))}
          <div className="border-t border-app-border py-1.5">
            <p className="text-[10px] leading-tight text-app-mute">Deposit</p>
            <p className="text-[11px] leading-snug font-semibold text-app-warning tabular-nums">{KIRA_DEPOSIT} due</p>
          </div>
        </div>
        <span className="mt-auto flex h-9 shrink-0 items-center justify-center rounded-app bg-app-text text-[12px] font-semibold text-white tabular-nums">
          Pay deposit — {usd(KIRA?.cents ?? 0, true)}
        </span>
      </div>
    </AppShellPhone>
  );
}

/** Phones and narrow stages show the details step; wide stages add the confirmation beside it. */
function KiraBooking() {
  return (
    <div className="flex items-start justify-center gap-6 @xl:gap-10">
      <KiraDetails />
      <KiraConfirmation className="mt-10 hidden @xl:flex" />
    </div>
  );
}

/* ─── Moment 2: Owen P.'s deposit, due tonight ───────────────────────────────
   Requested Wed, Oct 7, 7:30 PM; under the 24-hour default it's due today at
   7:30 PM, so the 12-hour reminder went at 7:30 this morning (text and email)
   and the 4-hour one goes at 3:30. The card uses the appointment screen's words:
   the Unpaid chip, "Awaiting payment", the deadline line with "cancels
   automatically if unpaid", Copy pay link and Extend deadline
   (appointments/[id]/_proto/sections.tsx, lib/deposits/deadline.ts). The text is
   the deposit reminder's own body (workers/cron/deposit-deadline-reminders.ts). */
const OWEN = DEPOSITS.find((d) => d.client === "Owen P." && d.state === "Pending");
const OWEN_PIECE = OWEN?.booking.split(" · ")[0] ?? "";

function OwenDeadline() {
  return (
    <div className="flex flex-col">
      <AppFrame active="appointments" sidebar={false} title="Appointment" meta="Sat, Oct 10 · 1:00 PM" className="shadow-none">
        <div className="flex flex-col gap-3 p-4 @lg:p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <AppAvatar initials="OP" size="md" />
              <div className="min-w-0">
                <p className="truncate text-ui font-semibold text-app-text">Owen P.</p>
                <p className="truncate text-ui-xs text-app-mute">
                  {OWEN_PIECE} · {ARTISTS.dev.name}
                </p>
              </div>
            </div>
            <AppStatus tone="warning" dot>
              Pending
            </AppStatus>
          </div>
          <div className="rounded-app bg-graphite/[0.03] p-3.5">
            <div className="flex items-center justify-between gap-2">
              <AppLabel>Deposit</AppLabel>
              <AppStatus tone="warning">Unpaid</AppStatus>
            </div>
            <p className="mt-1 text-[24px] leading-tight font-extrabold text-app-text tabular-nums">{usd(OWEN?.cents ?? 0)}</p>
            <p className="text-ui-xs font-semibold text-app-warning">Awaiting payment</p>
            <p className="mt-1 text-ui-xs leading-snug text-app-mute">
              Deposit due by {OWEN?.dueAt} · the studio’s standard deposit window · cancels automatically if unpaid
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <AppButton icon={Link2}>Copy pay link</AppButton>
            <AppButton icon={Clock}>Extend deadline</AppButton>
          </div>
        </div>
      </AppFrame>
      {/* The client's comms log row for the 12-hour reminder, lifted over the frame's foot like a toast. */}
      <div
        aria-hidden="true"
        className="relative z-10 mx-auto -mt-3 w-[calc(100%-1.5rem)] rounded-[16px] bg-white p-3.5 text-left shadow-[var(--shadow-lift)] ring-1 ring-graphite/5 @xl:mr-5 @xl:ml-auto @xl:w-[330px]"
      >
        <p className="flex items-center gap-1.5 text-ui-xs text-app-mute">
          <MessageSquare size={12} strokeWidth={1.9} /> SMS · Sent · Today, 7:30 AM
        </p>
        <p className="mt-1 text-ui-sm leading-snug text-app-text">
          Hi Owen, just a reminder: your deposit for {OWEN_PIECE} at Sample studio is due in 12 hours. Please pay to keep your slot.
        </p>
      </div>
    </div>
  );
}

/* ─── Moment 3: Asha M.'s two reminders ──────────────────────────────────────
   Session 4 of her koi sleeve is today at 10:00, three hours. The reminder emails
   go 24 hours and 2 hours before (workers/cron/appointment-reminders.ts), so
   Wed 10:00 AM and today 8:00 AM, both before 10:40. Subjects, headings and rows
   are the templates' own (lib/email/resend.ts, templates/reminder-24h.tsx and
   reminder-2h.tsx). */
const ASHA = TODAY_SESSIONS.find((s) => s.id === "asha-s4");
const ASHA_SERVICE = `${ASHA?.piece ?? ""} · session ${ASHA?.session?.n ?? 4}`;
const ASHA_MINUTES = (ASHA?.endMin ?? 0) - (ASHA?.startMin ?? 0);

function ReminderEmail({ kind }: { kind: "24h" | "2h" }) {
  const day = kind === "24h";
  const rows: [string, string][] = day
    ? [
        ["Service", ASHA_SERVICE],
        ["Artist", ARTISTS.dev.name],
        ["Date", "Thursday, Oct 8"],
        ["Time", `10:00 AM – 1:00 PM (${ASHA_MINUTES} min)`],
      ]
    : [
        ["Service", ASHA_SERVICE],
        ["Artist", ARTISTS.dev.name],
        ["Time", `10:00 AM (${ASHA_MINUTES} min)`],
      ];
  return (
    <div aria-hidden="true" className="overflow-hidden rounded-window bg-app-surface text-left ring-1 ring-graphite/5">
      <div className="flex items-center gap-2.5 border-b border-app-border px-4 py-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-app bg-graphite/[0.05] text-app-mute">
          <Mail size={14} strokeWidth={1.8} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-ui-sm leading-snug font-semibold text-app-text">
            {day ? "Reminder: Your appointment is tomorrow" : "Reminder: Your appointment is in 2 hours"}
          </p>
          <p className="truncate text-ui-xs text-app-mute">To Asha M. · {day ? "Wed, Oct 7, 10:00 AM" : "Today, 8:00 AM"}</p>
        </div>
      </div>
      <div className="px-4 pt-3.5 pb-4">
        <p className="text-[17px] leading-snug font-semibold text-app-text">
          {day ? "See you tomorrow, Asha!" : "Starting in 2 hours, Asha!"}
        </p>
        {/* Narrow stages keep the heading and the rows; the intro line joins from @md. */}
        <p className="mt-1 hidden text-ui-sm leading-snug text-app-mute @md:block">
          {day ? "Just a reminder that your appointment is coming up tomorrow." : "Your appointment is coming up soon — here’s your quick summary."}
        </p>
        <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 border-t border-app-border pt-3 text-ui-sm">
          {rows.map(([label, value]) => (
            <React.Fragment key={label}>
              <dt className="text-app-mute">{label}</dt>
              <dd className="min-w-0 text-app-text tabular-nums">{value}</dd>
            </React.Fragment>
          ))}
        </dl>
        <SampleTag className="mt-3 inline-block" />
      </div>
    </div>
  );
}

export default function AppointmentsPage() {
  return (
    <FeaturePage
      feature={feature}
      headings={{
        moments: "From the booking page to the chair",
        details: "What else it does",
        worksWith: "Joined to projects and payments",
        worksWithLead: "A deposit is taken once and shows up wherever it’s needed, so nobody types it twice.",
      }}
      visuals={{
        hero: (
          <>
            {/* Phones get the Needs action tab, where the stacked rows name the deposit that's due,
                whole (it's two rows, so no crop); wider frames get the week's table with its Deposit column. */}
            <AppointmentsScreen tab="needs-action" className="sm:hidden" />
            <AppointmentsScreen tab="this-week" className="hidden sm:flex" />
          </>
        ),
        moments: [
          <KiraBooking key="book" />,
          <OwenDeadline key="deadline" />,
          {
            before: <ReminderEmail kind="24h" />,
            after: <ReminderEmail kind="2h" />,
            beforeLabel: "24 hours before",
            afterLabel: "2 hours before",
          },
        ],
        detailLabels: [
          { label: `${KIRA_DEPOSIT} deposit`, tone: "warning" },
          { label: "Deposit due by", tone: "quiet" },
          { label: "Pending", tone: "warning" },
          { label: "Deposits pending", tone: "ember" },
          { label: "Booking page", tone: "quiet" },
          { label: "Request deposit", tone: "quiet" },
        ],
      }}
      planRows={[
        { label: "Booking page with a deposit per service", from: "solo" },
        { label: "Unpaid deposits cancel on your deadline", from: "solo" },
        { label: "Reminder emails before each session", from: "solo" },
        { label: `${BOOKINGS_ON_SOLO} bookings a month`, from: "solo" },
        { label: "Unlimited bookings", from: "studio" },
        { label: "White-label booking page", from: "pro" },
      ]}
      inkBand={{ headline: "Hold the chair with a deposit.", italicWord: "deposit" }}
    />
  );
}
