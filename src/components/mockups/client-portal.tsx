import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { LimespunMark } from "@/components/brand/limespun-mark";
import { AppShellPhone, SampleTag } from "@/components/system";
import { cn } from "@/components/system/cn";
import { ARTISTS, ASHA_PROJECT, CLIENTS, PROJECT_STATUS_LABEL, PROJECTS, usd, type Project } from "./sample-data";

/**
 * The client portal on the client's phone (app route /portal, then
 * /portal/[projectId]), reached by a magic link. Mirrors app/portal/page.tsx
 * ("Hello, Asha.", the "Your history" summary, the Projects list, Sign out in
 * the top bar) and components/portal/FinancialSection: the project page
 * (serif title, status line) and "The numbers." with the deposit pool
 * (In · Applied · Forfeited · Available) and receipts. Asha M.'s koi sleeve:
 * session 4 today, session 5 on Sat, Nov 7; $240 of her $300 deposit available.
 */

export type ClientPortalView = "projects" | "project";

const P = ASHA_PROJECT;
const ARTIST = ARTISTS[P.artist];
const ASHA = CLIENTS.find((c) => c.name === P.client);
const FIRST_NAME = P.client.split(" ")[0];
/** Asha's projects: the koi sleeve is her only one, still active, so none completed yet. */
const ASHA_PROJECTS = PROJECTS.filter((p) => p.client === P.client);
const COMPLETED = ASHA_PROJECTS.filter((p) => p.status === "completed").length;
/** Portal status line (app/portal/page.tsx projectStatusCopy). */
const STATUS_COPY: Partial<Record<Project["status"], string>> = {
  active: "Active project",
  completed: "Completed",
  on_hold: "On hold",
  cancelled: "Cancelled",
};
/** The one receipt on the pool: the $300 deposit, paid before session 1. */
const DEPOSIT_RECEIPT = { date: P.poolPaidOn ?? "", label: "Deposit", cents: P.pool.paidInCents };

function Top({ back, signOut = false }: { back?: string; signOut?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2">
      {back ? (
        <span className="inline-flex items-center gap-1 text-[10px] whitespace-nowrap text-app-mute">
          <ChevronLeft size={11} strokeWidth={2} /> {back}
        </span>
      ) : (
        <LimespunMark size={18} />
      )}
      <span className="flex items-center gap-2">
        {signOut && <span className="text-[10px] font-medium text-app-soft">Sign out</span>}
        <SampleTag className="px-1.5 text-[10px]" />
      </span>
    </div>
  );
}

/** app/portal/page.tsx: greeting, the "Your history" summary, then the Projects list (name and status line). */
function ProjectsList() {
  return (
    <>
      <Top signOut />
      <div className="mt-1">
        <p className="font-serif text-[26px] leading-none text-app-text">Hello, {FIRST_NAME}.</p>
        <p className="mt-1.5 text-[11px] leading-snug text-app-mute">Sessions, photos, receipts. All in one place.</p>
      </div>
      <div className="rounded-[12px] p-3 ring-1 ring-app-border">
        <p className="text-[10px] font-bold tracking-[0.08em] text-app-mute uppercase">Your history</p>
        <p className="mt-1 text-[18px] leading-tight font-bold text-app-text tabular-nums">
          {usd(ASHA?.spendCents ?? 0)}
          <span className="ml-1.5 text-[11px] font-normal text-app-mute">· {COMPLETED} completed</span>
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-[10px] font-bold tracking-[0.08em] text-app-mute uppercase">Projects</p>
        {ASHA_PROJECTS.map((p) => (
          <div key={p.id} className="flex items-center gap-3 rounded-[12px] p-3 ring-1 ring-app-border">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] leading-tight font-medium text-app-text">{p.title}</p>
              <p className="mt-1 text-[10px] leading-tight text-app-mute">{STATUS_COPY[p.status] ?? PROJECT_STATUS_LABEL[p.status]}</p>
            </div>
            <ChevronRight size={14} strokeWidth={1.8} className="shrink-0 text-app-mute" />
          </div>
        ))}
      </div>
    </>
  );
}

function ProjectPage() {
  const pool: [string, number, boolean?][] = [
    ["In", P.pool.paidInCents],
    ["Applied", P.pool.appliedCents],
    ["Forfeited", 0],
    ["Available", P.pool.availableCents, true],
  ];
  return (
    <>
      <Top back="Your projects" />
      <div>
        <p className="font-serif text-[24px] leading-none text-app-text">{P.title}</p>
        <p className="mt-1 text-[11px] text-app-mute">Active project. With {ARTIST.name}.</p>
      </div>

      <div className="flex flex-col">
        {P.sessions.map((s) => {
          const today = s.state === "today";
          const done = s.state === "done";
          return (
            <div key={s.n} className="flex items-center gap-2 border-b border-app-border py-1 last:border-b-0">
              <span
                className={cn(
                  "flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
                  done && "bg-app-text text-white",
                  today && "bg-app-active-fg text-white",
                  !done && !today && "text-app-mute ring-1 ring-app-border",
                )}
              >
                {done ? <Check size={9} strokeWidth={3} /> : s.n}
              </span>
              <span className={cn("min-w-0 flex-1 truncate text-[11px]", today ? "font-semibold text-app-text" : "text-app-soft")}>
                Session {s.n}
              </span>
              <span className={cn("shrink-0 text-[10px] tabular-nums", today ? "font-semibold text-app-active-fg" : "text-app-mute")}>
                {today ? "Today, 10:00" : s.date}
              </span>
            </div>
          );
        })}
      </div>

      <div>
        <p className="mb-1.5 font-serif text-[16px] leading-none text-app-text">The numbers.</p>
        <div className="rounded-[12px] p-2.5 ring-1 ring-app-border">
          <p className="text-[10px] font-bold tracking-[0.08em] text-app-mute uppercase">Deposit pool</p>
          <div className="mt-1.5 grid grid-cols-2 gap-x-3 gap-y-1.5">
            {pool.map(([l, cents, strong]) => (
              <div key={l} className="min-w-0">
                <p className="text-[10px] font-bold tracking-[0.04em] text-app-mute uppercase">{l}</p>
                <p className={cn("leading-tight font-bold text-app-text tabular-nums", strong ? "text-[13px] text-app-success" : "text-[12px]")}>
                  {usd(cents)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-[10px] bg-graphite/[0.04] px-2.5 py-2">
        <div>
          <p className="text-[11px] text-app-text">
            {DEPOSIT_RECEIPT.date} · {DEPOSIT_RECEIPT.label}
          </p>
          <p className="text-[10px] text-app-mute">Paid in full</p>
        </div>
        <p className="text-[12px] font-bold text-app-text tabular-nums">{usd(DEPOSIT_RECEIPT.cents)}</p>
      </div>
    </>
  );
}

export function ClientPortalPhone({ view = "project", label, className }: { view?: ClientPortalView; label?: string; className?: string }) {
  return (
    <AppShellPhone label={label} className={className}>
      <div className="flex h-[440px] flex-col gap-2.5 px-3.5 pt-2.5 pb-4 text-left">{view === "projects" ? <ProjectsList /> : <ProjectPage />}</div>
    </AppShellPhone>
  );
}
