import type React from "react";
import { ChevronDown, ImageOff, Save, Share2, Sparkles } from "lucide-react";
import { cn } from "@/components/system/cn";
import { AppFrame } from "./app-frame";
import { AppAvatar, AppButton, AppCard, AppLabel } from "./app-parts";
import { AI_BRIEF, ARTISTS, CLIENTS, TODAY_SESSIONS } from "./sample-data";

const ARTIST = ARTISTS[AI_BRIEF.artist];
const CLIENT = CLIENTS.find((c) => c.name === AI_BRIEF.client);
const CONSULT = TODAY_SESSIONS.find((s) => s.client === AI_BRIEF.client && s.kind === "consult");

/** The composer's style chips (ai-design/_proto/data.ts STYLE_TOKENS); Mara picked two. */
const STYLE_TOKENS = ["Neo-traditional", "Fine-line", "Blackwork", "Japanese", "Geometric", "Botanical", "Surrealist"];
const PICKED_STYLES = new Set(["Fine-line", "Botanical"]);

/** PLACEMENT_OPTIONS / SIZE_OPTIONS picks for a palm-sized inner-forearm piece. */
const PLACEMENT = "Forearm";
const SIZE = "Medium";

/** "The brief", as Mara typed it before Jo's consult. Nothing here is drafted or drawn by AI. */
const BRIEF_TEXT = `Peonies with a sprig of lavender on the ${AI_BRIEF.placement.toLowerCase()}, about palm-sized. ${AI_BRIEF.palette}. ${AI_BRIEF.notes}`;

function Select({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-9 min-w-0 flex-1 items-center justify-between gap-2 rounded-app border border-app-border bg-app-surface px-2.5 text-ui-sm text-app-text">
      <span className="truncate">{children}</span>
      <ChevronDown size={13} strokeWidth={1.9} className="shrink-0 text-app-mute" />
    </span>
  );
}

/** ScrAI.tsx composer: Client · The brief · Style · Placement & size, then Save draft and Generate. */
function Composer() {
  return (
    <AppCard className="self-start">
      <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-app bg-app-active text-app-active-fg">
        <Sparkles size={16} strokeWidth={1.9} />
      </span>
      <AppLabel>AI Design Assistant</AppLabel>
      <span className="mt-1 block text-[20px] leading-tight font-bold text-app-text">Fine-line florals</span>
      <span className="mt-1 block text-ui-sm text-app-mute">Revisit {AI_BRIEF.client}&rsquo;s concept.</span>

      <AppLabel className="mt-4 mb-1.5">Client</AppLabel>
      <span className="flex h-9 items-center gap-2 rounded-app border border-app-border px-2.5">
        <AppAvatar initials={CLIENT?.initials ?? "JK"} tone="info" size="sm" />
        <span className="min-w-0 flex-1 truncate text-ui-sm font-semibold text-app-text">{AI_BRIEF.client}</span>
        <ChevronDown size={13} strokeWidth={1.9} className="shrink-0 text-app-mute" />
      </span>

      <AppLabel className="mt-4 mb-1.5">The brief</AppLabel>
      <p className="rounded-app border border-app-border px-3 py-2.5 text-ui-sm leading-relaxed text-app-text">{BRIEF_TEXT}</p>

      <AppLabel className="mt-4 mb-1.5">Style</AppLabel>
      <div className="flex flex-wrap gap-1.5">
        {STYLE_TOKENS.map((s) => (
          <span
            key={s}
            className={cn(
              "inline-flex h-7 items-center rounded-full border px-2.5 text-ui-sm font-semibold whitespace-nowrap",
              PICKED_STYLES.has(s) ? "border-app-active-fg/30 bg-app-active text-app-active-fg" : "border-app-border text-app-soft",
            )}
          >
            {s}
          </span>
        ))}
      </div>

      <AppLabel className="mt-4 mb-1.5">Placement &amp; size</AppLabel>
      {/* Side by side once the card has room for both words whole. */}
      <div className="flex flex-col gap-2 @sm:flex-row">
        <Select>{PLACEMENT}</Select>
        <Select>{SIZE}</Select>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <AppButton icon={Save} className="h-8 min-w-0 justify-center px-2">
          Save draft
        </AppButton>
        <AppButton icon={Share2} className="h-8 min-w-0 justify-center px-2 text-app-mute">
          Share
        </AppButton>
      </div>
      <span className="mt-2 flex h-9 items-center justify-center gap-1.5 rounded-app bg-graphite/[0.06] text-ui-sm font-semibold text-app-mute">
        <Sparkles size={14} strokeWidth={1.9} />
        AI generation not available
      </span>
      <p className="mt-2 text-center text-ui-xs leading-snug text-app-mute">
        Moodboard generation isn&rsquo;t connected yet. You can still write the brief and save it as a draft.
      </p>
    </AppCard>
  );
}

/** The saved design's board: no references until generation is connected, so no Present either. */
function EmptyBoard() {
  return (
    <AppCard
      title={
        <>
          Moodboard <span className="hidden font-normal text-app-mute @sm:inline">· Fine-line florals</span>
        </>
      }
      meta={
        <span className="hidden items-center gap-1.5 @md:flex">
          <AppAvatar initials={ARTIST.initials} tone={ARTIST.tone} size="sm" />
          {ARTIST.name}
        </span>
      }
    >
      <div className="flex min-h-[180px] flex-col items-center justify-center gap-2.5 rounded-app border border-dashed border-app-border bg-app-sidebar px-6 py-8 text-center @3xl:min-h-[420px]">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-app-surface text-app-mute ring-1 ring-app-border">
          <ImageOff size={17} strokeWidth={1.8} />
        </span>
        <p className="max-w-[340px] text-ui-sm leading-relaxed text-app-soft">
          No references on this moodboard. Generation isn&rsquo;t connected yet, so references appear here once it is.
        </p>
      </div>
    </AppCard>
  );
}

/**
 * AI design (app: /ai-design, nav "AI"; ai-design/_proto/ScrAI.tsx). Jo K.'s
 * saved request, reopened before her consult with Mara: the composer holds
 * Mara's own brief, the two styles she picked, placement and size. The board
 * beside it is empty, as the app shows a saved design today (moodboard
 * generation isn't connected, JOBS_WITHOUT_PROCESSOR). Nothing on this screen
 * is drafted or drawn by AI.
 */
export function AiMoodboardScreen({ className }: { className?: string }) {
  return (
    <AppFrame active="ai" className={className} meta={CONSULT ? `Consult today, ${CONSULT.start} · ${ARTIST.name}` : undefined}>
      <div className="grid gap-4 p-4 @lg:p-6 @3xl:grid-cols-[300px_minmax(0,1fr)]">
        <Composer />
        <EmptyBoard />
      </div>
    </AppFrame>
  );
}
