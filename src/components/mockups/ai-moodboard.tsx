import type React from "react";
import { ChevronDown, NotebookPen, PencilLine, Presentation, Sparkles } from "lucide-react";
import { cn } from "@/components/system/cn";
import { AppFrame } from "./app-frame";
import { AppAvatar, AppButton, AppCard, AppLabel, AppStatus, PhotoTile } from "./app-parts";
import { AI_BRIEF, ARTISTS, CLIENTS, TODAY_SESSIONS } from "./sample-data";

const ARTIST = ARTISTS[AI_BRIEF.artist];
const CLIENT = CLIENTS.find((c) => c.name === AI_BRIEF.client);
const CONSULT = TODAY_SESSIONS.find((s) => s.client === AI_BRIEF.client && s.kind === "consult");

/** Style chips from the app's style taxonomy; the brief's style is selected. */
const STYLES: { name: string; on: boolean }[] = [
  { name: "Fine-line", on: true },
  { name: "Botanical", on: true },
  { name: "Script", on: false },
  { name: "Blackwork", on: false },
  { name: "Geometric", on: false },
];

/** Black and grey, no fill: four greys from the site tokens. */
const PALETTE = ["bg-graphite", "bg-graphite-soft", "bg-mute", "bg-hair-strong"];

/** The drafted brief, assembled from the consult fields. Text only: nothing here is drawn. */
const DRAFTED_BRIEF = `Peonies with a sprig of lavender on the ${AI_BRIEF.placement.toLowerCase()}, ${AI_BRIEF.size.replace("About", "about")}. ${AI_BRIEF.style}; ${AI_BRIEF.palette.toLowerCase()}. ${AI_BRIEF.notes}`;

function FieldBox({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "flex h-9 min-w-0 items-center justify-between gap-2 rounded-app border border-app-border bg-app-surface px-2.5 text-ui-sm text-app-text",
        className,
      )}
    >
      <span className="truncate">{children}</span>
      <ChevronDown size={13} strokeWidth={1.9} className="shrink-0 text-app-mute" />
    </span>
  );
}

function BriefPanel() {
  return (
    <AppCard className="self-start">
      <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-app bg-app-active text-app-active-fg">
        <Sparkles size={16} strokeWidth={1.9} />
      </span>
      <AppLabel>AI Design Assistant</AppLabel>
      <span className="mt-1 block text-[20px] leading-tight font-bold text-app-text">Fine-line florals</span>
      <span className="mt-1 block text-ui-sm text-app-mute">Revisit {AI_BRIEF.client}&rsquo;s concept.</span>

      <AppLabel className="mt-4 mb-1.5">Client</AppLabel>
      <span className="flex items-center gap-2 rounded-app border border-app-border px-2.5 py-2">
        <AppAvatar initials={CLIENT?.initials ?? "JK"} tone="info" size="sm" />
        <span className="min-w-0 flex-1 truncate text-ui-sm font-semibold text-app-text">{AI_BRIEF.client}</span>
        <AppStatus tone="neutral">Client on file</AppStatus>
      </span>

      <AppLabel className="mt-4 mb-1.5">Request</AppLabel>
      <p className="rounded-app bg-app-sidebar px-3 py-2.5 font-serif text-[15px] leading-snug text-app-text italic">
        &ldquo;{AI_BRIEF.request}&rdquo;
      </p>

      <AppLabel className="mt-4 mb-1.5">Style</AppLabel>
      <div className="flex flex-wrap gap-1.5">
        {STYLES.map((s) => (
          <span
            key={s.name}
            className={cn(
              "inline-flex h-7 items-center rounded-full border px-2.5 text-ui-sm font-semibold",
              s.on ? "border-app-active-fg/30 bg-app-active text-app-active-fg" : "border-app-border text-app-soft",
            )}
          >
            {s.name}
          </span>
        ))}
      </div>

      <AppLabel className="mt-4 mb-1.5">Placement &amp; size</AppLabel>
      <div className="grid gap-2">
        <FieldBox>{AI_BRIEF.placement}</FieldBox>
        <FieldBox>{AI_BRIEF.size}</FieldBox>
      </div>

      <AppLabel className="mt-4 mb-1.5">Suggested palette</AppLabel>
      <div className="flex items-center gap-2.5">
        <span className="flex overflow-hidden rounded-app ring-1 ring-app-border">
          {PALETTE.map((tone) => (
            <span key={tone} className={cn("h-7 w-7", tone)} />
          ))}
        </span>
        <span className="text-ui-sm text-app-soft">{AI_BRIEF.palette}</span>
      </div>
    </AppCard>
  );
}

/**
 * AI design (app: /ai-design, nav "AI"; ai-design/_proto/ScrAI.tsx). Jo K.'s
 * consult: the brief fields, a moodboard of Jo's own reference photos, and a
 * drafted brief Mara edits. AI never draws: there is no generated art here.
 */
export function AiMoodboardScreen({ className }: { className?: string }) {
  return (
    <AppFrame
      active="ai"
      className={className}
      meta={CONSULT ? `Consult today, ${CONSULT.start} · ${ARTIST.name}` : undefined}
      actions={<AppButton icon={Presentation}>Present</AppButton>}
    >
      <div className="grid gap-4 p-4 @lg:p-6 @3xl:grid-cols-[272px_minmax(0,1fr)]">
        <div className="hidden @3xl:block">
          <BriefPanel />
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          <AppCard
            title="Moodboard"
            meta={
              <span className="flex items-center gap-1.5">
                <AppAvatar initials={ARTIST.initials} tone={ARTIST.tone} size="sm" />
                {AI_BRIEF.client} · {ARTIST.name}
              </span>
            }
          >
            <div className="grid grid-cols-2 gap-2.5 @md:grid-cols-4">
              {AI_BRIEF.references.map((r) => (
                <PhotoTile
                  key={r}
                  label={r}
                  aspect="portrait"
                  className="aspect-square @2xl:aspect-[4/5]"
                  caption={`From ${AI_BRIEF.client.split(" ")[0]}`}
                />
              ))}
            </div>
            <div className="mt-3 flex items-start gap-2 rounded-app bg-app-sidebar px-3 py-2.5">
              <NotebookPen size={14} strokeWidth={1.9} className="mt-px shrink-0 text-app-active-fg" />
              <p className="text-ui-sm leading-snug text-app-text">
                <span className="font-semibold">Consult note.</span> {AI_BRIEF.notes}
              </p>
            </div>
          </AppCard>

          <AppCard
            title={
              <span className="flex items-center gap-2">
                <AppStatus tone="active" icon={Sparkles}>
                  Drafted brief
                </AppStatus>
                <span className="hidden text-ui-sm font-medium text-app-mute @md:inline">for {ARTIST.name} to edit</span>
              </span>
            }
            meta={
              <AppButton icon={PencilLine} className="h-7">
                Edit brief
              </AppButton>
            }
          >
            <p className="text-ui leading-relaxed text-app-text">{DRAFTED_BRIEF}</p>
            <dl className="mt-3.5 grid grid-cols-2 gap-x-4 gap-y-2.5 border-t border-app-border pt-3 @2xl:grid-cols-4">
              {[
                ["Placement", AI_BRIEF.placement],
                ["Size", AI_BRIEF.size],
                ["Style", AI_BRIEF.style],
                ["Palette", AI_BRIEF.palette],
              ].map(([k, v]) => (
                <div key={k} className="min-w-0">
                  <dt className="text-kpi-label font-bold text-app-mute uppercase">{k}</dt>
                  <dd className="mt-0.5 text-ui-sm font-medium text-app-text">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-ui-xs text-app-mute">
              Drafted from {AI_BRIEF.client}&rsquo;s request and references. Review it with the client before booking.
            </p>
          </AppCard>
        </div>
      </div>
    </AppFrame>
  );
}
