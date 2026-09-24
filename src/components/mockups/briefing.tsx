import type React from "react";
import type { LucideIcon } from "lucide-react";
import { Check, ChevronLeft, FileSignature, GitCommitHorizontal, Play, Stethoscope, Wallet } from "lucide-react";
import { AppShellPhone, SampleTag } from "@/components/system";
import { PhotoLabel } from "./app-parts";
import { ARTISTS, ELENA_ALLERGY, NOW, PROJECTS, TODAY_SESSIONS, usd } from "./sample-data";

/**
 * The pre-session briefing on the artist's phone (app route /briefing/[bookingId]).
 * Mirrors app/briefing: the onyx header (Pre-session briefing, starts-in pill,
 * client, session, time), the allergies banner first, last sessions with fresh
 * and healed photo slots, the facts card (Project state · Deposit · Forms) and
 * Start session. Dev's briefing for Elena R. at 1:30.
 */

const SESSION = TODAY_SESSIONS.find((s) => s.id === "elena-s2");
const PROJECT = PROJECTS.find((p) => p.id === "elena-back");
const ARTIST = ARTISTS.dev;
const LAST = PROJECT?.sessions.find((s) => s.n === 1);
const TOTAL = PROJECT?.sessions.length ?? 3;

/** BriefingHeader startsInLabel: minutes under an hour, else whole hours rounded ("in 3 hr" at 10:40 for 1:30). */
function startsIn(): string {
  if (!SESSION) return "";
  const mins = SESSION.startMin - NOW.minutes;
  if (mins <= 0) return "now";
  return mins < 60 ? `in ${mins} min` : `in ${Math.round(mins / 60)} hr`;
}

/** durationLabel: "2.5 hr", "4 hr". */
function hours(): string {
  if (!SESSION) return "";
  const h = (SESSION.endMin - SESSION.startMin) / 60;
  return Number.isInteger(h) ? `${h} hr` : `${h.toFixed(1)} hr`;
}

/** A 32px photo slot: canvas-deep with the session label, never drawn art. */
function Slot({ label, kind }: { label: string; kind: string }) {
  return (
    <span className="flex flex-col items-center gap-0.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-app bg-canvas-deep text-graphite-soft/70 ring-1 ring-graphite/5 ring-inset">
        <PhotoLabel label={label} size="sm" />
      </span>
      <span className="text-[10px] text-app-mute">{kind}</span>
    </span>
  );
}

function Fact({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 border-b border-app-border py-1 last:border-b-0">
      <Icon size={13} strokeWidth={1.8} className="mt-px shrink-0 text-app-mute" />
      <div className="min-w-0 flex-1 text-[10.5px] leading-snug text-app-text">{children}</div>
    </div>
  );
}

export function BriefingPhone({ label, className }: { label?: string; className?: string }) {
  const pool = PROJECT?.pool;
  return (
    <AppShellPhone label={label} className={className}>
      <div className="flex h-[440px] flex-col gap-1.5 px-3 pt-2 pb-3 text-left">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-[10px] text-app-mute">
            <ChevronLeft size={11} strokeWidth={2} /> Today
          </span>
          <SampleTag className="px-1.5 text-[10px]" />
        </div>

        {/* Onyx header */}
        <div className="rounded-[14px] bg-app-text px-3 py-2.5 text-white">
          <span className="text-[10px] font-bold tracking-[0.1em] text-white/60 uppercase">Pre-session briefing</span>
          <div className="mt-1.5 flex items-end justify-between gap-2">
            <div className="min-w-0">
              <p className="font-serif text-[22px] leading-none">{ELENA_ALLERGY.client}</p>
              <p className="mt-1 truncate text-[10px] text-white/70">
                {SESSION?.piece} · {SESSION?.session?.n} of {TOTAL}
              </p>
            </div>
            <div className="-mt-5 flex shrink-0 flex-col items-end gap-1">
              <span className="rounded-full bg-app-active-fg px-1.5 py-px text-[10px] font-bold whitespace-nowrap tabular-nums">{startsIn()}</span>
              <p className="text-[15px] leading-none font-bold tabular-nums">{SESSION?.start} PM</p>
              <p className="text-[10px] leading-none text-white/60">
                {hours()} · {ARTIST.name}
              </p>
            </div>
          </div>
        </div>

        {/* Allergies first */}
        <div className="flex items-start gap-2 rounded-app border border-app-danger/30 bg-app-danger-bg px-2.5 py-1.5">
          <Stethoscope size={13} strokeWidth={2} className="mt-px shrink-0 text-app-danger" />
          <p className="text-[10px] leading-snug text-app-text">
            <span className="font-bold tracking-[0.04em] text-app-danger uppercase">Allergies:</span> Red ink. {ELENA_ALLERGY.note}
          </p>
        </div>

        {/* Last sessions */}
        <div>
          <p className="mb-0.5 text-[10px] font-bold tracking-[0.08em] text-app-mute uppercase">Last sessions</p>
          <div className="flex items-center gap-2 rounded-[10px] bg-graphite/[0.04] p-1.5">
            <span className="flex shrink-0 gap-1">
              <Slot label="S1" kind="Fresh" />
              <Slot label="S1" kind="Healed" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-app-text">
                S{LAST?.n} <span className="font-normal text-app-mute">· {LAST?.date}</span>
              </p>
              <p className="line-clamp-2 text-[10px] leading-snug text-app-mute">{LAST?.note}</p>
            </div>
          </div>
        </div>

        {/* Facts card */}
        <div className="rounded-[12px] px-2.5 ring-1 ring-app-border">
          <Fact icon={GitCommitHorizontal}>
            <span className="font-semibold">Project state:</span> {SESSION?.session?.n} of {TOTAL}
          </Fact>
          {/* DepositRow: "Pool $320 in · $160 applied · $160 available." */}
          <Fact icon={Wallet}>
            <span className="tabular-nums">
              <span className="font-semibold">Deposit:</span> Pool {usd(pool?.paidInCents ?? 0)} in · {usd(pool?.appliedCents ?? 0)} applied ·{" "}
              <span className="font-semibold text-app-success">{usd(pool?.availableCents ?? 0)} available</span>.
            </span>
          </Fact>
          {/* FormsRow: the "Forms" label, then the all-signed chip. */}
          <Fact icon={FileSignature}>
            <span className="font-semibold">Forms</span>{" "}
            <span className="inline-flex items-center gap-1 rounded-full bg-app-success-bg px-1.5 text-[10px] leading-4 font-semibold text-app-success">
              <Check size={10} strokeWidth={3} /> All forms signed
            </span>
          </Fact>
        </div>

        <span className="mt-auto flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-app bg-app-text text-[12px] font-semibold text-white">
          <Play size={12} strokeWidth={2.4} className="fill-white" /> Start session
        </span>
      </div>
    </AppShellPhone>
  );
}
