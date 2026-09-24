import type React from "react";
import { Check, ChevronRight, Clock, UserRound } from "lucide-react";
import { AppShellPhone, SampleTag } from "@/components/system";
import { cn } from "@/components/system/cn";
import { ARTISTS, ARTIST_ORDER, DEPOSITS, usd } from "./sample-data";

/**
 * The public booking page in a phone (app route /book/[studioSlug]/[serviceId]).
 * It books a menu service: Owen P.'s "New piece, calf" with Dev, 180 min, $450,
 * with a $150 deposit, for Sat, Oct 10 at 1:00 PM (booked Wed evening; the
 * deposit request went out with the booking, so it is still Pending on
 * Appointments, Today and Payments). The page has no project or deposit-pool
 * logic and doesn't know the client, so nothing reads "on file" or "already on
 * your project": the words are the funnel's own ("Deposit required: $150",
 * "You'll be prompted to pay the deposit on the confirmation page").
 *
 * Stages as the app builds them: Artist · Time · Details · Intake, but the
 * Artist stage is skipped when the link names an artist (skipArtistStage). Step
 * 1 is the studio's link, so the rail has four stages; steps 2–4 are Dev's own
 * link ("Book with Dev"), so the rail is Time · Details · Intake. A solo
 * artist's page never shows the Artist stage.
 */

export type BookingStep = 1 | 2 | 3 | 4;

type Stage = "Artist" | "Time" | "Details" | "Intake";

const OWEN = DEPOSITS.find((d) => d.client === "Owen P.");
const ARTIST = ARTISTS[OWEN?.artist ?? "dev"];
/** The menu service, as Appointments and Messages name Owen's booking. */
const SERVICE = OWEN?.booking.split(" · ")[0] ?? "New piece, calf";
const DEPOSIT = usd(OWEN?.cents ?? 15000);
/** The service's menu price and length (Appointments' Price column: $450; the calendar's 1:00–4:00 card). */
const PRICE = usd(45000);
const DURATION_MIN = 180;
const PICKED = { dow: "Sat", day: 10, time: "1:00 PM" };
const PICKED_LINE = `${PICKED.dow}, Oct ${PICKED.day} · ${PICKED.time}`;

/** October dates with openings for Dev, from Wednesday evening. Every weekday checked against 2026. */
const DATES = [
  { dow: "Fri", day: 9 },
  { dow: "Sat", day: 10 },
  { dow: "Tue", day: 13 },
  { dow: "Wed", day: 14 },
];
const TIMES = ["10:00 AM", "1:00 PM"];

function stagesFor(step: BookingStep): Stage[] {
  return step === 1 ? ["Artist", "Time", "Details", "Intake"] : ["Time", "Details", "Intake"];
}

const STEP_STAGE: Record<BookingStep, Stage> = { 1: "Artist", 2: "Time", 3: "Details", 4: "Intake" };

function StepRail({ step }: { step: BookingStep }) {
  const stages = stagesFor(step);
  const at = stages.indexOf(STEP_STAGE[step]);
  return (
    <div className="flex items-start justify-between px-1">
      {stages.map((label, i) => {
        const done = i < at;
        const active = i === at;
        return (
          <div key={label} className="flex flex-1 items-start">
            <div className="flex w-full flex-col items-center gap-1">
              <div className="flex w-full items-center">
                <span className={cn("h-px flex-1", i === 0 ? "bg-transparent" : i <= at ? "bg-app-text" : "bg-app-border")} />
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
                    done && "bg-app-text text-white",
                    active && "border-[1.5px] border-app-text text-app-text",
                    !done && !active && "border-[1.5px] border-app-border text-app-mute",
                  )}
                >
                  {done ? <Check size={11} strokeWidth={3} /> : i + 1}
                </span>
                <span className={cn("h-px flex-1", i === stages.length - 1 ? "bg-transparent" : i < at ? "bg-app-text" : "bg-app-border")} />
              </div>
              <span className={cn("text-[10px] font-medium", active ? "text-app-text" : "text-app-mute")}>{label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return <p className="font-serif text-[21px] leading-[1.1] text-app-text">{children}</p>;
}

function Cta({ children, next }: { children: React.ReactNode; next?: boolean }) {
  return (
    <span className="mt-auto flex h-9 shrink-0 items-center justify-center gap-1 rounded-app bg-app-text text-[12px] font-semibold text-white">
      {children}
      {next && <ChevronRight size={14} strokeWidth={2.2} />}
    </span>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1 text-[10px] font-medium text-app-soft">{label}</p>
      <p className="flex h-8 items-center rounded-app px-2.5 text-[12px] text-app-text ring-1 ring-app-border">{value}</p>
    </div>
  );
}

function ArtistStage() {
  return (
    <>
      <Heading>Choose an artist</Heading>
      <div className="flex flex-col gap-1.5">
        {ARTIST_ORDER.map((id) => {
          const a = ARTISTS[id];
          const on = a === ARTIST;
          return (
            <div
              key={id}
              className={cn("flex items-center gap-2.5 rounded-app p-2 ring-1", on ? "bg-graphite/[0.03] ring-app-text" : "ring-app-border")}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-graphite/[0.06] text-app-mute">
                <UserRound size={14} strokeWidth={1.5} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-semibold text-app-text">{a.name}</p>
                <p className="truncate text-[10px] text-app-mute">{a.specialties.slice(0, 2).join(", ")}</p>
              </div>
              {on && <Check size={14} strokeWidth={2.5} className="shrink-0 text-app-text" />}
            </div>
          );
        })}
      </div>
      <Cta next>Next</Cta>
    </>
  );
}

function TimeStage() {
  return (
    <>
      <Heading>Pick a time</Heading>
      <div>
        <p className="mb-1.5 text-[11px] font-medium text-app-mute">October</p>
        <div className="grid grid-cols-4 gap-1.5 text-center">
          {DATES.map((d) => (
            <span
              key={d.day}
              className={cn(
                "flex flex-col rounded-app py-1.5 leading-tight",
                d.day === PICKED.day ? "bg-app-text text-white" : "bg-graphite/[0.05] text-app-text",
              )}
            >
              <span className="text-[10px] opacity-75">{d.dow}</span>
              <span className="text-[13px] font-semibold tabular-nums">{d.day}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {TIMES.map((t) => (
          <span
            key={t}
            className={cn(
              "flex h-8 items-center justify-center rounded-app text-[12px] font-semibold tabular-nums",
              t === PICKED.time ? "bg-app-text text-white" : "text-app-text ring-1 ring-app-border",
            )}
          >
            {t}
          </span>
        ))}
      </div>
      <Cta next>Next</Cta>
    </>
  );
}

function DetailsStage() {
  return (
    <>
      <Heading>Your details</Heading>
      <div className="rounded-app px-2.5 py-2 ring-1 ring-app-border">
        <p className="text-[10px] font-bold tracking-[0.08em] text-app-mute uppercase">Summary</p>
        <p className="flex items-baseline justify-between gap-2 text-[12px] font-semibold text-app-text">
          {SERVICE}
          <span className="tabular-nums">{PRICE}</span>
        </p>
        <p className="text-[11px] text-app-mute tabular-nums">
          {PICKED_LINE} · {ARTIST.name}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        <Field label="First name" value="Owen" />
        <Field label="Last name" value="P." />
      </div>
      <div className="rounded-app border border-app-warning/25 bg-app-warning-bg/60 px-2.5 py-2">
        <p className="text-[12px] font-semibold text-app-warning tabular-nums">Deposit required: {DEPOSIT}</p>
        <p className="mt-0.5 text-[10px] leading-snug text-app-soft">You&rsquo;ll be prompted to pay the deposit on the confirmation page.</p>
      </div>
      <Cta>Next: Intake form</Cta>
    </>
  );
}

function IntakeStage() {
  return (
    <>
      <Heading>Medical history</Heading>
      <div className="rounded-app px-2.5 py-2 ring-1 ring-app-border">
        <p className="text-[10px] leading-snug font-medium text-app-soft">Allergies (incl. latex, pigment, prior ink reactions)</p>
        <p className="mt-0.5 text-[12px] font-semibold text-app-text">None</p>
      </div>
      <div className="rounded-app px-2.5 py-2 ring-1 ring-app-border">
        <p className="text-[10px] leading-snug font-medium text-app-soft">Current medications</p>
        <p className="mt-0.5 text-[12px] font-semibold text-app-text">None</p>
      </div>
      <div className="rounded-app px-2.5 pt-1 pb-1.5 ring-1 ring-app-border">
        <p className="text-[10px] font-medium text-app-soft">Signature</p>
        <svg viewBox="0 0 160 34" className="h-6 w-auto text-app-text" fill="none" aria-hidden="true">
          <path
            d="M4 24c6-14 12-18 14-12s-4 14 0 12 8-16 12-14-2 12 2 12 6-8 9-8 1 8 5 7 5-9 9-9-1 8 3 8 8-6 12-7m6 5c10-2 26-4 40-3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-[10px] font-medium text-app-success">Signature captured</p>
      </div>
      <Cta>Submit &amp; continue</Cta>
    </>
  );
}

const STAGES: Record<BookingStep, () => React.ReactNode> = {
  1: ArtistStage,
  2: TimeStage,
  3: DetailsStage,
  4: IntakeStage,
};

export function BookingFlowPhone({ step = 2, label, className }: { step?: BookingStep; label?: string; className?: string }) {
  const Stage = STAGES[step];
  return (
    <AppShellPhone label={label} className={className}>
      <div className="flex h-[440px] flex-col gap-3 px-3.5 pt-3 pb-4 text-left">
        <div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] text-app-mute">{step === 1 ? "Book online" : `Book with ${ARTIST.name}`}</p>
            <SampleTag className="px-1.5 text-[10px]" />
          </div>
          <div className="flex items-center gap-1.5">
            <p className="truncate text-[13px] font-semibold text-app-text">{SERVICE}</p>
            <span className="shrink-0 rounded-app bg-app-warning-bg px-1.5 py-px text-[10px] font-semibold text-app-warning tabular-nums">
              {DEPOSIT} deposit
            </span>
          </div>
          <p className="mt-0.5 flex items-center gap-1 text-[10px] text-app-mute tabular-nums">
            <Clock size={10} strokeWidth={1.8} className="shrink-0" />
            {DURATION_MIN} min · {PRICE}
          </p>
          {/* The running selection, as the app restates it once a slot is picked (not on Details, whose card says it). */}
          {step === 2 && <p className="text-[10px] font-medium text-app-text tabular-nums">{PICKED_LINE}</p>}
        </div>
        <StepRail step={step} />
        <Stage />
      </div>
    </AppShellPhone>
  );
}
