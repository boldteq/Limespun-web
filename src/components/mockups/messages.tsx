import type React from "react";
import type { LucideIcon } from "lucide-react";
import {
  CalendarCheck,
  ChevronDown,
  ChevronRight,
  FileSignature,
  Lock,
  Mail,
  MessageSquare,
  MoreHorizontal,
  Paperclip,
  Search,
  Send,
  Sparkles,
  Wallet,
} from "lucide-react";
import { cn } from "@/components/system/cn";
import { AppFrame } from "./app-frame";
import { AppAvatar, AppButton, AppLabel, AppStatus } from "./app-parts";
import { ASHA_PROJECT, ARTISTS, SUBMISSIONS, THREADS, UNREAD_THREADS, usd, type Channel, type Thread } from "./sample-data";

/**
 * Messages (app route /messages). Mirrors messages/_proto: thread list, the
 * open thread on its faint rust canvas (white inbound bubbles, rust-tinted
 * outbound), the composer (suggested replies the artist
 * taps into the draft, Reply | Note tabs, Send with the channel on it) and the
 * context rail (Next · Deposit · Consent forms · Internal notes).
 *
 * The open thread is Asha asking for a Saturday for session 5; Dev sends the
 * booking link and she books Sat, Nov 7, 11:00 with the $240 already on her
 * project. SMS and email are the live channels.
 * Container widths: thread only below @2xl, list from @2xl, context rail from @4xl.
 */

/** Asha's thread (SMS), Wednesday evening. Read, so the unread badge stays at 2. */
const ASHA_LIST_ROW: Thread = {
  client: "Asha M.",
  initials: "AM",
  channel: "SMS",
  preview: "Booked it, thank you! See you tomorrow at 10.",
  time: "Wed",
  unread: false,
};

/** Today's threads, then Asha's and Owen's from Wednesday. */
const LIST: Thread[] = [
  ...THREADS.filter((t) => t.time !== "Wed"),
  ASHA_LIST_ROW,
  ...THREADS.filter((t) => t.time === "Wed"),
];

const SESSION_5 = ASHA_PROJECT.sessions.find((s) => s.n === 5);
const DEV = ARTISTS[ASHA_PROJECT.artist];
const ASHA_CONSENT = SUBMISSIONS.find((s) => s.client === "Asha M.");

type Entry =
  | { kind: "client" | "studio"; text: string; time: string; by?: string; link?: { title: string; sub: string } }
  | { kind: "event"; text: string; short: string; time: string };

const TRANSCRIPT: Entry[] = [
  { kind: "client", text: "Could session 5 be on a Saturday? Weekdays are hard with work.", time: "7:52 PM" },
  {
    kind: "studio",
    by: DEV.name,
    text: `Sat, Nov 7 at 11:00 is open with me. Here's the link to book it. The ${usd(ASHA_PROJECT.pool.availableCents)} already on your project covers the deposit.`,
    time: "8:10 PM",
    link: { title: "Koi sleeve · session 5", sub: "Booking page · Sample studio" },
  },
  {
    kind: "event",
    text: `Booked · Session 5 · ${SESSION_5?.date ?? "Sat, Nov 7, 11:00"}`,
    short: `Booked · ${SESSION_5?.date ?? "Sat, Nov 7, 11:00"}`,
    time: "8:14 PM",
  },
  { kind: "client", text: "Booked it, thank you! See you tomorrow at 10.", time: "8:15 PM" },
];

/** Dev's staff-only note on Asha's record (shown in the context rail). */
const NOTE = { by: DEV.name, text: "Weekdays are hard for her. Offer Saturdays first.", when: "Wed" };

/** Tapping a suggestion drops it into the draft; nothing sends on its own. */
const SUGGESTIONS = ["See you then, Asha!", "Eat before you come in"];

const CHANNEL_ICON: Record<Channel, LucideIcon> = { SMS: MessageSquare, Email: Mail };

/** The app's outbound bubble: 8% rust into white. The thread canvas is 3%. */
const OUTBOUND = "bg-[color-mix(in_oklch,var(--color-app-active-fg)_8%,white)]";
const CANVAS = "bg-[color-mix(in_oklch,var(--color-app-active-fg)_3%,white)]";

/* ─── Thread list ────────────────────────────────────────────────────────── */

function ThreadList() {
  return (
    <div className="hidden w-[248px] shrink-0 flex-col border-r border-app-border @2xl:flex">
      <div className="flex flex-col gap-2.5 border-b border-app-border p-3">
        <div className="flex h-8 items-center gap-2 rounded-app border border-app-border px-2.5 text-ui-sm text-app-mute">
          <Search size={14} strokeWidth={1.8} />
          Search messages
        </div>
        <div className="flex gap-1.5">
          <span className="inline-flex h-6 items-center rounded-full bg-app-text px-2.5 text-ui-xs font-semibold text-white">All</span>
          <span className="inline-flex h-6 items-center gap-1 rounded-full bg-graphite/[0.06] px-2.5 text-ui-xs font-semibold text-app-soft">
            Unread
            <span className="text-app-active-fg tabular-nums">{UNREAD_THREADS}</span>
          </span>
          <span className="inline-flex h-6 items-center rounded-full bg-graphite/[0.06] px-2.5 text-ui-xs font-semibold text-app-soft">
            SMS
          </span>
          <span className="inline-flex h-6 items-center rounded-full bg-graphite/[0.06] px-2.5 text-ui-xs font-semibold text-app-soft">
            Email
          </span>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        {LIST.map((t) => {
          const Icon = CHANNEL_ICON[t.channel];
          const open = t === ASHA_LIST_ROW;
          return (
            <div
              key={t.client}
              className={cn(
                "relative flex gap-2.5 border-b border-app-border px-3 py-2.5",
                open && "bg-app-sidebar before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-app-active-fg",
              )}
            >
              <AppAvatar initials={t.initials} size="md" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className={cn("truncate text-ui-sm text-app-text", t.unread ? "font-bold" : "font-semibold")}>{t.client}</span>
                  <Icon size={11} strokeWidth={2} className="shrink-0 text-app-mute" />
                  <span className="ml-auto shrink-0 text-[10px] text-app-mute tabular-nums">{t.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={cn("truncate text-ui-xs", t.unread ? "font-medium text-app-text" : "text-app-mute")}>{t.preview}</span>
                  {t.unread && <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-app-active-fg" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Thread ─────────────────────────────────────────────────────────────── */

function Bubble({ e }: { e: Entry }) {
  if (e.kind === "event") {
    return (
      <div className="flex items-center gap-2 py-1">
        <span className="h-px flex-1 bg-app-border" />
        <span className="inline-flex max-w-[85%] items-center gap-1.5 rounded-full bg-app-success-bg px-2.5 py-1 text-ui-xs font-semibold text-app-success">
          <CalendarCheck size={12} strokeWidth={2} className="shrink-0" />
          <span className="truncate @sm:hidden">{e.short}</span>
          <span className="hidden truncate @sm:inline">{e.text}</span>
        </span>
        <span className="h-px flex-1 bg-app-border" />
      </div>
    );
  }
  const mine = e.kind !== "client";
  return (
    <div className={cn("flex flex-col gap-1", mine ? "items-end" : "items-start")}>
      <div
        className={cn(
          "max-w-[84%] rounded-[14px] px-3 py-2 text-ui leading-snug text-app-text @xl:max-w-[70%]",
          e.kind === "client" && "rounded-bl-[4px] bg-app-surface shadow-[0_1px_2px_rgba(28,25,23,0.07)]",
          e.kind === "studio" && cn("rounded-br-[4px]", OUTBOUND),
        )}
      >
        <p>{e.text}</p>
        {"link" in e && e.link && (
          <span className="mt-2 hidden items-center gap-2 rounded-app bg-app-surface px-2.5 py-2 ring-1 ring-app-border @sm:flex">
            <CalendarCheck size={14} strokeWidth={1.9} className="shrink-0 text-app-active-fg" />
            <span className="min-w-0">
              <span className="block truncate text-ui-xs font-semibold text-app-text">{e.link.title}</span>
              <span className="block truncate text-[10px] text-app-mute">{e.link.sub}</span>
            </span>
          </span>
        )}
      </div>
      <span className="px-1 text-[10px] text-app-mute tabular-nums">
        {e.by ? `${e.by} · ` : ""}
        {e.time}
        {e.kind === "studio" && " · SMS"}
      </span>
    </div>
  );
}

function Composer() {
  return (
    <div className="shrink-0 border-t border-app-border bg-app-surface px-3 pt-2 pb-3 @lg:px-5">
      <div className="mb-1.5 hidden gap-1.5 overflow-hidden @sm:flex">
        {SUGGESTIONS.map((s) => (
          <span key={s} className="inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full bg-graphite/[0.05] px-2.5 text-ui-xs font-medium whitespace-nowrap text-app-text">
            <Sparkles size={11} strokeWidth={1.8} className="text-app-mute" />
            {s}
          </span>
        ))}
      </div>
      <div className="flex gap-4 border-b border-app-border">
        <span className="relative pt-1 pb-1.5 text-ui-sm font-semibold text-app-text">
          Reply
          <span className="absolute inset-x-0 -bottom-px h-0.5 bg-app-text" />
        </span>
        <span className="pt-1 pb-1.5 text-ui-sm font-medium text-app-mute">Note</span>
      </div>
      <p className="py-2.5 text-ui text-app-mute">Message Asha…</p>
      {/* Below @sm the two quick actions go icon-only so Send always sits inside the frame. */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="hidden h-7 w-7 items-center justify-center rounded-[7px] text-app-mute @sm:flex">
          <Paperclip size={14} strokeWidth={1.8} />
        </span>
        <span className="inline-flex h-7 w-7 items-center justify-center gap-1.5 rounded-[7px] border border-app-border text-ui-xs font-semibold whitespace-nowrap text-app-text @sm:w-auto @sm:px-2">
          <Wallet size={12} strokeWidth={1.9} className="text-app-mute" />
          <span className="hidden @sm:inline">Request deposit</span>
        </span>
        <span className="inline-flex h-7 w-7 items-center justify-center gap-1.5 rounded-[7px] border border-app-border text-ui-xs font-semibold whitespace-nowrap text-app-text @sm:w-auto @sm:px-2">
          <FileSignature size={12} strokeWidth={1.9} className="text-app-mute" />
          <span className="hidden @sm:inline">Send form</span>
        </span>
        {/* The Send split: the channel rides on the button, the chevron picks another. */}
        <AppButton variant="primary" icon={Send} className="ml-auto h-7 gap-1.5 pr-1.5 pl-2.5 text-ui-xs">
          Send<span className="-ml-1 hidden @sm:inline"> · SMS</span>
          <span className="ml-0.5 flex h-full items-center border-l border-white/25 pl-1.5">
            <ChevronDown size={12} strokeWidth={2} />
          </span>
        </AppButton>
      </div>
    </div>
  );
}

function ThreadPane() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="flex h-14 shrink-0 items-center gap-2.5 border-b border-app-border px-4 @lg:px-5">
        <AppAvatar initials="AM" size="md" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-ui font-semibold text-app-text">Asha M.</p>
          <p className="truncate text-ui-xs text-app-mute">
            SMS · {ASHA_PROJECT.title} with {DEV.name}
          </p>
        </div>
        <MoreHorizontal size={16} strokeWidth={1.8} className="shrink-0 text-app-mute" />
      </div>
      <div className={cn("flex min-h-0 flex-1 flex-col justify-end gap-3 overflow-hidden px-4 py-4 @lg:px-6", CANVAS)}>
        <div className="flex justify-center">
          <span className="rounded-full bg-app-surface px-2.5 py-0.5 text-[10px] font-semibold text-app-mute ring-1 ring-app-border">
            Wednesday
          </span>
        </div>
        {TRANSCRIPT.map((e, i) => (
          <Bubble key={i} e={e} />
        ))}
      </div>
      <Composer />
    </div>
  );
}

/* ─── Context rail ───────────────────────────────────────────────────────── */

function RailBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-app-border px-4 py-3.5 last:border-b-0">
      <AppLabel className="mb-2 tracking-[0.08em]">{title}</AppLabel>
      {children}
    </div>
  );
}

function ContextRail() {
  return (
    <div className="hidden w-[248px] shrink-0 flex-col overflow-hidden border-l border-app-border bg-app-surface @4xl:flex">
      <div className="flex items-center gap-2.5 border-b border-app-border px-4 py-3.5">
        <AppAvatar initials="AM" size="lg" />
        <div className="min-w-0">
          <p className="truncate text-ui font-semibold text-app-text">Asha M.</p>
          <p className="text-ui-xs text-app-mute">Client since June</p>
        </div>
      </div>
      <RailBlock title="Next">
        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1">
            <p className="truncate text-ui-sm font-semibold text-app-text">
              {ASHA_PROJECT.title}, session {SESSION_5?.n ?? 5}
            </p>
            <p className="truncate text-ui-xs text-app-mute">{SESSION_5?.date ?? "Sat, Nov 7, 11:00"} · {DEV.name}</p>
          </div>
          <ChevronRight size={14} strokeWidth={1.8} className="shrink-0 text-app-mute" />
        </div>
        <div className="mt-3 flex items-center gap-2">
          <div className="min-w-0 flex-1">
            <AppLabel className="tracking-[0.08em]">Deposit</AppLabel>
            <p className="text-ui-sm font-semibold text-app-text tabular-nums">
              {usd(ASHA_PROJECT.pool.availableCents)} on the project
            </p>
          </div>
          <AppStatus tone="success" dot>
            Paid
          </AppStatus>
        </div>
      </RailBlock>
      <RailBlock title="Consent forms">
        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1">
            <p className="truncate text-ui-sm font-medium text-app-text">{ASHA_CONSENT?.form ?? "Tattoo consent — general"}</p>
            <p className="truncate text-ui-xs text-app-mute">{ASHA_CONSENT ? `${ASHA_CONSENT.when} · ${ASHA_CONSENT.via.toLowerCase()}` : ""}</p>
          </div>
          <AppStatus tone="success">Signed</AppStatus>
        </div>
      </RailBlock>
      <RailBlock title="Internal notes">
        <div className="rounded-app bg-app-warning-bg px-2.5 py-2">
          <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-app-warning px-1.5 text-[10px] leading-4 font-bold text-white">
            <Lock size={9} strokeWidth={2.6} />
            Staff only
          </span>
          <p className="text-ui-sm leading-snug text-app-text">{NOTE.text}</p>
          <p className="mt-1 text-[10px] text-app-warning">
            {NOTE.by} · {NOTE.when}
          </p>
        </div>
      </RailBlock>
    </div>
  );
}

export function MessagesScreen({ className }: { className?: string }) {
  return (
    <AppFrame active="messages" className={className}>
      <div className="flex h-[540px] min-w-0 @2xl:h-[560px]">
        <ThreadList />
        <ThreadPane />
        <ContextRail />
      </div>
    </AppFrame>
  );
}
