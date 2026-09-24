import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { LimespunMark } from "@/components/brand/limespun-mark";
import { AppShellPhone, SampleTag } from "@/components/system";
import { cn } from "@/components/system/cn";
import { ARTISTS, ASHA_PROJECT, CLIENTS, usd } from "./sample-data";

/**
 * The client portal on the client's phone (app route /portal, then
 * /portal/[projectId]), reached by a magic link. Mirrors app/portal and
 * components/portal/FinancialSection: "Your projects", the project page
 * (serif title, status line) and "The numbers." with the deposit pool
 * (In · Applied · Forfeited · Available) and receipts. Asha M.'s koi sleeve:
 * session 4 today, session 5 on Sat, Nov 7; $240 of her $300 deposit available.
 */

export type ClientPortalView = "projects" | "project";

const P = ASHA_PROJECT;
const ARTIST = ARTISTS[P.artist];
const DONE = P.sessions.filter((s) => s.state === "done").length;
const ASHA = CLIENTS.find((c) => c.name === P.client);
/** The one receipt on the pool: the $300 deposit, paid Thu, Aug 13. */
const DEPOSIT_RECEIPT = { date: "Thu, Aug 13", label: "Deposit", cents: P.pool.paidInCents };

function Top({ back }: { back?: string }) {
  return (
    <div className="flex items-center justify-between">
      {back ? (
        <span className="inline-flex items-center gap-1 text-[10px] text-app-mute">
          <ChevronLeft size={11} strokeWidth={2} /> {back}
        </span>
      ) : (
        <LimespunMark size={18} />
      )}
      <SampleTag className="px-1.5 text-[10px]" />
    </div>
  );
}

function ProjectsList() {
  return (
    <>
      <Top />
      <div>
        <p className="font-serif text-[24px] leading-none text-app-text">Your projects</p>
        <p className="mt-1 text-[10px] text-app-mute">Signed in with your link and a code by text.</p>
      </div>
      <div className="rounded-[12px] p-3 ring-1 ring-app-border">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[13px] font-semibold text-app-text">{P.title}</p>
          <ChevronRight size={14} strokeWidth={1.8} className="text-app-mute" />
        </div>
        <p className="text-[10px] text-app-mute">
          With {ARTIST.name} · {P.placement.toLowerCase()}
        </p>
        <div className="mt-2.5 flex gap-1">
          {P.sessions.map((s) => (
            <span
              key={s.n}
              className={cn(
                "h-1.5 flex-1 rounded-full",
                s.state === "done" ? "bg-app-text" : s.state === "today" ? "bg-app-active-fg" : "bg-graphite/[0.1]",
              )}
            />
          ))}
        </div>
        <div className="mt-2.5 flex items-baseline justify-between text-[11px]">
          <span className="text-app-mute">
            {DONE} of {P.sessions.length} done
          </span>
          <span className="font-semibold text-app-success tabular-nums">{usd(P.pool.availableCents)} available</span>
        </div>
      </div>
      <div className="rounded-[12px] bg-graphite/[0.04] p-3">
        <p className="text-[10px] font-bold tracking-[0.08em] text-app-mute uppercase">Lifetime paid</p>
        <p className="mt-0.5 text-[18px] font-bold text-app-text tabular-nums">{usd(ASHA?.spendCents ?? 0)}</p>
      </div>
      <span className="mt-auto flex h-9 shrink-0 items-center justify-center rounded-app text-[12px] font-medium text-app-text ring-1 ring-app-border">
        Sign out
      </span>
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
