import React from "react";
import { CalendarCheck, Check, ChevronDown, FileSignature, Mail, MessageSquare, Send, Sparkles, Wallet } from "lucide-react";
import { cn } from "@/components/system";
import { FeaturePage } from "@/components/templates/feature-page";
import type { PlanRow } from "@/components/templates/parts";
import {
  AppAvatar,
  AppButton,
  AppFrame,
  AppLabel,
  AppStatus,
  ARTISTS,
  DEPOSITS,
  JO_SUGGESTED_REPLY,
  JO_THREAD,
  MessagesScreen,
  THREADS,
  usd,
  type Channel,
} from "@/components/mockups";
import { getFeature } from "@/lib/data/features";
import { PLAN_CAPS, PLANS } from "@/lib/data/plans";
import { pageMetadata } from "@/lib/seo";

const feature = getFeature("messages");

export const metadata = pageMetadata({
  title: feature.seo.title,
  description: feature.seo.description,
  path: "/product/messages",
});

/* ─── Thread parts, drawn like the Messages mockup (messages/_proto) ─────────
   White inbound bubbles, rust-tinted outbound on a faint rust canvas. Every
   bubble carries its channel, because one thread holds both. */

/** The app's outbound bubble: 8% rust into white. The thread canvas is 3%. */
const OUTBOUND = "bg-[color-mix(in_oklch,var(--color-app-active-fg)_8%,white)]";
const CANVAS = "bg-[color-mix(in_oklch,var(--color-app-active-fg)_3%,white)]";
const CHANNEL_ICON: Record<Channel, typeof Mail> = { SMS: MessageSquare, Email: Mail };

type Entry =
  | { kind: "day"; label: string; className?: string }
  | { kind: "event"; text: string; short: string }
  | {
      kind: "in" | "out";
      text: string;
      time: string;
      channel: Channel;
      by?: string;
      link?: { title: string; sub: string };
      /** Visibility on narrow frames, e.g. "hidden @md:block". */
      className?: string;
    };

function ThreadEntry({ e }: { e: Entry }) {
  if (e.kind === "day") {
    return (
      <div className={cn("flex justify-center", e.className)}>
        <span className="rounded-full bg-app-surface px-2.5 py-0.5 text-[10px] font-semibold text-app-mute ring-1 ring-app-border">
          {e.label}
        </span>
      </div>
    );
  }
  if (e.kind === "event") {
    return (
      <div className="flex items-center gap-2 py-0.5">
        <span className="h-px flex-1 bg-app-border" />
        <span className="inline-flex max-w-[88%] items-center gap-1.5 rounded-full bg-app-success-bg px-2.5 py-1 text-ui-xs font-semibold text-app-success">
          <CalendarCheck size={12} strokeWidth={2} className="shrink-0" />
          <span className="truncate @sm:hidden">{e.short}</span>
          <span className="hidden truncate @sm:inline">{e.text}</span>
        </span>
        <span className="h-px flex-1 bg-app-border" />
      </div>
    );
  }
  const mine = e.kind === "out";
  const Icon = CHANNEL_ICON[e.channel];
  return (
    <div className={e.className}>
      <div className={cn("flex flex-col gap-1", mine ? "items-end" : "items-start")}>
        <div
          className={cn(
            "max-w-[86%] rounded-[14px] px-3 py-2 text-ui leading-snug text-app-text @xl:max-w-[76%]",
            mine ? cn("rounded-br-[4px]", OUTBOUND) : "rounded-bl-[4px] bg-app-surface shadow-[0_1px_2px_rgba(28,25,23,0.07)]",
          )}
        >
          <p>{e.text}</p>
          {e.link && (
            <span className="mt-2 flex items-center gap-2 rounded-app bg-app-surface px-2.5 py-2 ring-1 ring-app-border">
              <FileSignature size={14} strokeWidth={1.9} className="shrink-0 text-app-active-fg" />
              <span className="min-w-0">
                <span className="block truncate text-ui-xs font-semibold text-app-text">{e.link.title}</span>
                <span className="block truncate text-[10px] text-app-mute">{e.link.sub}</span>
              </span>
            </span>
          )}
        </div>
        <span className="inline-flex items-center gap-1 px-1 text-[10px] text-app-mute tabular-nums">
          {e.by ? `${e.by} · ` : ""}
          {e.time} ·
          <Icon size={10} strokeWidth={2} className="shrink-0" />
          {e.channel}
        </span>
      </div>
    </div>
  );
}

function ThreadHead({ initials, name, sub }: { initials: string; name: string; sub: string }) {
  return (
    <div className="flex h-14 shrink-0 items-center gap-2.5 border-b border-app-border px-3.5 @lg:px-5">
      <AppAvatar initials={initials} size="md" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-ui font-semibold text-app-text">{name}</p>
        <p className="truncate text-ui-xs text-app-mute">{sub}</p>
      </div>
    </div>
  );
}

function ReplyTabs() {
  return (
    <div className="flex gap-4 border-b border-app-border">
      <span className="relative pt-1 pb-1.5 text-ui-sm font-semibold text-app-text">
        Reply
        <span className="absolute inset-x-0 -bottom-px h-0.5 bg-app-text" />
      </span>
      <span className="pt-1 pb-1.5 text-ui-sm font-medium text-app-mute">Note</span>
    </div>
  );
}

/** The Send split: the channel rides on the button, the chevron picks the other one. */
function SendSplit({ channel }: { channel: Channel }) {
  return (
    <AppButton variant="primary" icon={Send} className="ml-auto h-7 gap-1.5 pr-1.5 pl-2.5 text-ui-xs">
      Send · {channel}
      <span className="ml-0.5 flex h-full items-center border-l border-white/25 pl-1.5">
        <ChevronDown size={12} strokeWidth={2} />
      </span>
    </AppButton>
  );
}

/** The composer's two in-chat actions, as outlined buttons (icon-only in a narrow frame). */
function ThreadActions({ always = false }: { always?: boolean }) {
  const label = always ? "inline" : "hidden @sm:inline";
  return (
    <>
      <span className="inline-flex h-7 min-w-7 items-center justify-center gap-1.5 rounded-[7px] border border-app-border px-1.5 text-ui-xs font-semibold whitespace-nowrap text-app-text @sm:px-2">
        <Wallet size={12} strokeWidth={1.9} className="text-app-mute" />
        <span className={label}>Request deposit</span>
      </span>
      <span className="inline-flex h-7 min-w-7 items-center justify-center gap-1.5 rounded-[7px] border border-app-border px-1.5 text-ui-xs font-semibold whitespace-nowrap text-app-text @sm:px-2">
        <FileSignature size={12} strokeWidth={1.9} className="text-app-mute" />
        <span className={label}>Send form</span>
      </span>
    </>
  );
}

/* ─── Moment 1: Kira N. texted on Monday, emailed today ───────────────────────
   One conversation, two channels. She asked by text, booked from Mara's page
   and paid the $150 deposit at 8:05, then emailed at 9:48 about an earlier
   slot. The reply goes by email: the Send split's menu is open on "Send as". */
const KIRA_THREAD = THREADS.find((t) => t.client === "Kira N.");
const KIRA_DEPOSIT = DEPOSITS.find((d) => d.client === "Kira N.");
const MARA = ARTISTS.mara;

const KIRA: Entry[] = [
  { kind: "day", label: "Mon, Oct 5" },
  { kind: "in", text: "Do you do small fine-line pieces on the wrist?", time: "6:12 PM", channel: "SMS" },
  {
    kind: "out",
    by: MARA.name,
    text: `I do. Pick a time on my booking page. A ${usd(KIRA_DEPOSIT?.cents ?? 15000)} deposit holds it and goes toward the tattoo.`,
    time: "6:30 PM",
    channel: "SMS",
  },
  { kind: "day", label: "Today" },
  { kind: "event", text: "Booked · Sat, Nov 14, 12:00 · deposit paid 8:05", short: "Booked · Sat, Nov 14" },
  { kind: "in", text: KIRA_THREAD?.preview ?? "Any chance of something before Nov 14?", time: KIRA_THREAD?.time ?? "9:48", channel: "Email" },
];

function RailBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-app-border px-4 py-3.5 last:border-b-0">
      <AppLabel className="mb-2 tracking-[0.08em]">{title}</AppLabel>
      {children}
    </div>
  );
}

function KiraThread() {
  return (
    <AppFrame active="messages" sidebar={false} title="Messages" className="shadow-none">
      <div className="flex min-w-0">
        <div className="flex min-w-0 flex-1 flex-col">
          <ThreadHead initials="KN" name="Kira N." sub={`SMS and email · Fine-line wrist with ${MARA.name}`} />
          <div className={cn("flex flex-col gap-3 px-3.5 py-4 @lg:px-5", CANVAS)}>
            {KIRA.map((e, i) => (
              <ThreadEntry key={i} e={e} />
            ))}
          </div>
          <div className="relative border-t border-app-border bg-app-surface px-3.5 pt-2 pb-3 @lg:px-5">
            {/* The Send split's menu, open: this reply goes by email. */}
            <div className="absolute right-3 bottom-10 z-[1] w-[124px] overflow-hidden rounded-app-lg bg-app-surface py-1 shadow-lift ring-1 ring-app-border @sm:w-[150px] @lg:right-5">
              <p className="px-3 pt-1.5 pb-1 text-kpi-label font-bold tracking-[0.08em] text-app-mute uppercase">Send as</p>
              {(["SMS", "Email"] as const).map((c) => {
                const Icon = CHANNEL_ICON[c];
                const on = c === "Email";
                return (
                  <span
                    key={c}
                    className={cn(
                      "flex h-8 items-center gap-2 px-3 text-ui-sm",
                      on ? "bg-app-sidebar font-semibold text-app-text" : "text-app-soft",
                    )}
                  >
                    <Icon size={13} strokeWidth={1.9} className="text-app-mute" />
                    {c}
                    {on && <Check size={13} strokeWidth={2.4} className="ml-auto text-app-active-fg" />}
                  </span>
                );
              })}
            </div>
            <ReplyTabs />
            <p className="py-2.5 text-ui text-app-mute">Message Kira…</p>
            <div className="flex items-center gap-1.5">
              <ThreadActions />
              <SendSplit channel="Email" />
            </div>
          </div>
        </div>
        <div className="hidden w-[196px] shrink-0 flex-col border-l border-app-border bg-app-surface @xl:flex">
          <RailBlock title="Next">
            <p className="truncate text-ui-sm font-semibold text-app-text">Fine-line wrist</p>
            <p className="truncate text-ui-xs text-app-mute">Sat, Nov 14, 12:00 · {MARA.name}</p>
          </RailBlock>
          <RailBlock title="Deposit">
            <div className="flex items-center gap-2">
              <p className="min-w-0 flex-1 text-ui-sm font-semibold text-app-text tabular-nums">{usd(KIRA_DEPOSIT?.cents ?? 15000)}</p>
              <AppStatus tone="success" dot>
                Paid
              </AppStatus>
            </div>
            <p className="mt-0.5 text-ui-xs text-app-mute">Today, 8:05 AM</p>
          </RailBlock>
        </div>
      </div>
    </AppFrame>
  );
}

/* ─── Moment 2: Owen P.'s side panel, before and after ───────────────────────
   The $150 deposit link went out Wed 7:30 PM and falls due today at 7:30 PM;
   the consent form is sent. Once he pays and signs, the same panel says so. */
const OWEN = DEPOSITS.find((d) => d.client === "Owen P." && d.state === "Pending");

function OwenPanel({ done }: { done: boolean }) {
  return (
    <AppFrame active="messages" sidebar={false} title="Owen P." className="shadow-none">
      <div className="flex flex-col gap-2.5 p-3.5">
        <p className="truncate text-ui-xs text-app-mute">Email · New piece, calf with {ARTISTS.dev.name}</p>
        <div className="flex items-center gap-2.5 rounded-app bg-graphite/[0.03] px-3 py-2.5">
          <div className="min-w-0 flex-1">
            <AppLabel className="tracking-[0.08em]">Deposit</AppLabel>
            <p className="mt-0.5 text-ui-sm font-semibold text-app-text tabular-nums">{usd(OWEN?.cents ?? 15000)}</p>
            <p className={cn("truncate text-ui-xs", done ? "text-app-mute" : "text-app-warning")}>
              {done ? "Sat, Oct 10, 1:00 PM" : `Due · ${OWEN?.dueAt ?? "Today, 7:30 PM"}`}
            </p>
          </div>
          {done ? (
            <AppStatus tone="success" dot>
              Paid
            </AppStatus>
          ) : (
            <AppStatus tone="warning" dot>
              Pending
            </AppStatus>
          )}
        </div>
        <div className="flex items-center gap-2.5 rounded-app bg-graphite/[0.03] px-3 py-2.5">
          <div className="min-w-0 flex-1">
            <AppLabel className="tracking-[0.08em]">Consent forms</AppLabel>
            <p className="mt-0.5 truncate text-ui-sm font-medium text-app-text">Tattoo consent — general</p>
          </div>
          {done ? <AppStatus tone="success">Signed</AppStatus> : <AppStatus tone="info">Sent</AppStatus>}
        </div>
        <div className="flex flex-wrap items-center gap-1.5 border-t border-app-border pt-2.5">
          <ThreadActions always />
        </div>
      </div>
    </AppFrame>
  );
}

/* ─── Moment 3: Jo K. is running late; a suggestion goes into the draft ─────
   The suggestion was tapped into the reply box, where it can be edited.
   Nothing has been sent: the Send button is still waiting. */
const JO: Entry[] = [
  { kind: "day", label: "Tuesday" },
  { kind: "in", text: JO_THREAD[0].text, time: JO_THREAD[0].time.replace("Tue, ", ""), channel: "SMS", className: "hidden @md:block" },
  { kind: "out", by: JO_THREAD[1].by, text: JO_THREAD[1].text, time: JO_THREAD[1].time.replace("Tue, ", ""), channel: "SMS" },
  { kind: "day", label: "Today" },
  { kind: "in", text: JO_THREAD[2].text, time: JO_THREAD[2].time, channel: "SMS" },
];

const JO_DRAFT_HEAD = JO_SUGGESTED_REPLY.split(" ").slice(0, -1).join(" ");
const JO_DRAFT_TAIL = JO_SUGGESTED_REPLY.split(" ").slice(-1)[0];

function JoSuggestion() {
  return (
    <AppFrame active="messages" sidebar={false} title="Messages" className="shadow-none">
      <ThreadHead initials="JK" name="Jo K." sub={`SMS · Consult with ${MARA.name}, 11:00`} />
      <div className={cn("flex flex-col gap-3 px-3.5 py-4 @lg:px-5", CANVAS)}>
        {JO.map((e, i) => (
          <ThreadEntry key={i} e={e} />
        ))}
      </div>
      <div className="border-t border-app-border bg-app-surface px-3.5 pt-2.5 pb-3 @lg:px-5">
        <div className="mb-2 flex flex-wrap gap-1.5">
          <span className="inline-flex h-7 max-w-full items-center gap-1.5 rounded-full bg-app-active px-2.5 text-ui-xs font-semibold text-app-active-fg ring-1 ring-app-active-fg/30">
            <Sparkles size={11} strokeWidth={1.9} className="shrink-0" />
            <span className="truncate">{JO_SUGGESTED_REPLY}</span>
          </span>
          <span className="hidden h-7 items-center gap-1.5 rounded-full bg-graphite/[0.05] px-2.5 text-ui-xs font-medium whitespace-nowrap text-app-text @lg:inline-flex">
            <Sparkles size={11} strokeWidth={1.8} className="text-app-mute" />
            Thanks for the heads-up!
          </span>
        </div>
        <ReplyTabs />
        {/* The caret stays on the draft's last word, so it never wraps onto a line of its own. */}
        <p className="py-2.5 text-ui leading-snug text-app-text">
          {JO_DRAFT_HEAD}{" "}
          <span className="whitespace-nowrap">
            {JO_DRAFT_TAIL}
            <span className="ml-px inline-block h-[1.1em] w-px translate-y-[3px] bg-app-text" />
          </span>
        </p>
        <div className="flex items-center gap-1.5">
          <ThreadActions />
          <SendSplit channel="SMS" />
        </div>
      </div>
    </AppFrame>
  );
}

/* ─── Plan rows: channels on every plan, AI by tier, texts from PLAN_CAPS ──── */
const TEXTS = PLAN_CAPS.find((c) => c.label === "Texts a month");
const textRows: PlanRow[] = PLANS.map((p) => ({ label: `${TEXTS?.values[p.tier] ?? ""} texts a month`, from: p.tier }));

export default function MessagesPage() {
  return (
    <FeaturePage
      feature={feature}
      headings={{
        moments: "Threads, requests and replies",
        details: "What else it does",
        worksWith: "Joined to client records and forms",
        worksWithLead: "A thread sits on the client's record, and a form sent from it files back there once it's signed.",
      }}
      visuals={{
        hero: <MessagesScreen />,
        moments: [
          <KiraThread key="kira" />,
          {
            before: <OwenPanel done={false} />,
            after: <OwenPanel done />,
            beforeLabel: "Links sent",
            afterLabel: "Paid and signed",
          },
          <JoSuggestion key="jo" />,
        ],
        detailLabels: [
          { label: "Quick responses", tone: "quiet" },
          { label: "Schedule", tone: "quiet" },
          { label: "Note", tone: "warning" },
          { label: "Assign to", tone: "quiet" },
          { label: "Unread", tone: "ember" },
          { label: "Auto-replies", tone: "quiet" },
        ],
      }}
      planRows={[
        { label: "SMS and email in one inbox", from: "solo" },
        { label: "Deposit requests and forms from the thread", from: "solo" },
        textRows[0],
        { label: "AI reply suggestions", from: "studio" },
        textRows[1],
        { label: "AI reply drafts, aftercare and consult summaries", from: "pro" },
        textRows[2],
        textRows[3],
      ]}
      inkBand={{ headline: "Send the booking link from the thread.", italicWord: "thread" }}
    />
  );
}
