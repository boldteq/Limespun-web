import React from "react";
import { ChevronDown, ChevronRight, Link2, Plus, Sparkles, Upload } from "lucide-react";
import { cn } from "@/components/system";
import { FeaturePage } from "@/components/templates/feature-page";
import { AppFrame } from "@/components/mockups/app-frame";
import { AppAvatar, AppButton, AppCard, AppLabel, AppProjectStatus, AppTabs, PhotoTile } from "@/components/mockups/app-parts";
import { AI_BRIEF, ARTISTS, CLIENTS, PROJECTS } from "@/components/mockups/sample-data";
import { getFeature } from "@/lib/data/features";
import { pageMetadata } from "@/lib/seo";

const feature = getFeature("ai-design");

export const metadata = pageMetadata({
  title: feature.seo.title,
  description: feature.seo.description,
  path: "/product/ai-design",
});

/*
 * Jo K.'s fine-line florals, before her consult with Mara today at 11:00. Every screen is
 * one the artist fills in by hand; nothing on this page is generated.
 *   hero      the project's Moodboard tab (components/projects/MoodboardTab.tsx) with its
 *             Project specs card (ProjectDetailSidebar.tsx SpecsCard)
 *   moment 1  the same tab empty, then with Jo's four references (two uploads, two links)
 *   moment 2  the New project form's specs (projects/new/_proto/ScrNewProject.tsx)
 *   moment 3  the AI screen's brief, written by Mara (ai-design/_proto/ScrAI.tsx composer)
 */

const PROJECT = PROJECTS.find((p) => p.id === "jo-florals") ?? PROJECTS[0];
const ARTIST = ARTISTS[AI_BRIEF.artist];
const CLIENT = CLIENTS.find((c) => c.name === AI_BRIEF.client);

/** The app's size option for a palm-sized piece (lib/projects/schemas.ts SIZE_LABELS). */
const SIZE = "Medium (10–20cm)";
/** Color mode (COLOR_MODE_LABELS); Jo asked for black and grey, no fill. */
const COLOR_MODE = "Black & Grey";
const COLOR_MODES = ["Color", "Black & Grey", "Both"];
/** Project style tags (lib/projects/labels.ts STYLE_LABELS), Fine line picked. */
const PROJECT_STYLES = ["Traditional", "Neo-traditional", "Fine line", "Blackwork", "Dotwork", "Geometric", "Lettering", "Watercolor"];
const PROJECT_STYLE = "Fine line";

/** Jo's references: her two photos, then two links she sent (the tile badge names the source; uploads carry none). */
const SOURCES: (string | null)[] = [null, null, "Pinterest", "Instagram"];
const ASPECTS = ["portrait", "square", "landscape", "portrait"] as const;
const REFERENCES = AI_BRIEF.references.map((label, i) => ({ label, source: SOURCES[i] ?? null, aspect: ASPECTS[i] ?? "square" }));

const SPECS: [string, string][] = [
  ["Size", SIZE],
  ["Placement", PROJECT.placement],
  ["Style", PROJECT_STYLE],
  ["Color", COLOR_MODE],
  ["Artist", ARTIST.name],
  ["Apply rule", "Last session"],
];

/* ─── Shared pieces ─────────────────────────────────────────────────────────── */

/** A closed form field as the app draws it. */
function Field({ label, children, select, className }: { label: string; children: React.ReactNode; select?: boolean; className?: string }) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <AppLabel>{label}</AppLabel>
      <span className="flex h-9 min-w-0 items-center justify-between gap-2 rounded-app border border-app-border bg-app-surface px-2.5 text-ui-sm text-app-text">
        <span className="truncate">{children}</span>
        {select && <ChevronDown size={13} strokeWidth={1.9} className="shrink-0 text-app-mute" />}
      </span>
    </div>
  );
}

function StyleChip({ on, children }: { on: boolean; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-full border px-2.5 text-ui-sm font-semibold whitespace-nowrap",
        on ? "border-app-active-fg/30 bg-app-active text-app-active-fg" : "border-app-border text-app-soft",
      )}
    >
      {children}
    </span>
  );
}

/** Upload images + Paste URL, the two inputs above every moodboard. */
function AddReferences({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-3 @2xl:grid-cols-2", className)}>
      <div className="flex min-w-0 flex-col gap-1.5">
        <AppLabel>Upload images</AppLabel>
        <span className="flex h-9 items-center justify-center gap-2 rounded-app border border-dashed border-app-border bg-app-sidebar px-3 text-ui-sm text-app-mute">
          <Upload size={14} strokeWidth={1.9} className="shrink-0" />
          <span className="truncate">Drop an image or click to upload</span>
        </span>
      </div>
      <div className="flex min-w-0 flex-col gap-1.5">
        <AppLabel>Paste URL</AppLabel>
        <span className="flex min-w-0 gap-2">
          <span className="flex h-9 min-w-0 flex-1 items-center rounded-app border border-app-border bg-app-surface px-2.5 text-ui-sm text-app-mute">
            <span className="truncate">Pinterest, Instagram, or Behance link…</span>
          </span>
          <AppButton icon={Link2} className="h-9">
            Add
          </AppButton>
        </span>
      </div>
    </div>
  );
}

/** On a wide board the tiles take their own shapes; narrow frames keep a tidy landscape grid. */
const WIDE_ASPECT: Record<(typeof ASPECTS)[number], string> = {
  portrait: "@xl:aspect-[4/5]",
  square: "@xl:aspect-square",
  landscape: "",
};

/**
 * Reference tiles, each with its source badge. The board staggers them like the app's
 * masonry (top-aligned, mixed shapes); compact is a tidy row
 * of four (2 × 2 in narrow frames).
 */
function ReferenceGrid({ variant = "board" }: { variant?: "board" | "compact" }) {
  return (
    <div className={cn("grid grid-cols-2 items-start gap-2.5", variant === "board" ? "@xl:grid-cols-4" : "@lg:grid-cols-4")}>
      {REFERENCES.map((r) => (
        <PhotoTile key={r.label} label={r.label} aspect="landscape" className={variant === "board" ? WIDE_ASPECT[r.aspect] : undefined}>
          {r.source && (
            <span className="absolute top-1.5 left-1.5 rounded-[6px] bg-graphite/60 px-2 py-0.5 text-[10px] font-semibold tracking-[0.04em] text-white">
              {r.source}
            </span>
          )}
        </PhotoTile>
      ))}
    </div>
  );
}

/** The count line under the inputs. (The app's "Download all" beside it is a disabled, unbuilt control, so it's left out.) */
function ReferenceCount() {
  return <span className="text-ui-sm text-app-mute">{REFERENCES.length} references</span>;
}

const PROJECT_TABS = ["Sessions", "Photos", "Moodboard", "Activity"];

/* ─── Hero: the project's Moodboard tab ─────────────────────────────────────── */

function MoodboardHome() {
  return (
    <AppFrame
      active="projects"
      greeting={PROJECT.title}
      meta={
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="flex items-center gap-1 text-app-mute">
            Projects <ChevronRight size={12} strokeWidth={2} />
          </span>
          <AppProjectStatus status={PROJECT.status} />
          <span>
            <span className="font-serif text-[13px] italic">{PROJECT.client}</span> · {ARTIST.name} · {PROJECT.placement}
          </span>
        </span>
      }
    >
      <div className="flex flex-col gap-4 px-4 pt-1 pb-5 @lg:px-6 @lg:pb-6">
        <AppTabs tabs={PROJECT_TABS} active="Moodboard" className="-mx-4 @lg:-mx-6 @lg:px-6" />
        <div className="grid gap-4 @3xl:grid-cols-[minmax(0,1fr)_236px]">
          <div className="flex min-w-0 flex-col gap-4">
            {/* Narrow frames (phones) go straight to the references; the inputs join from @xl */}
            <AddReferences className="hidden @xl:grid" />
            <ReferenceCount />
            <ReferenceGrid />
          </div>
          <div className="flex flex-col gap-4">
            <AppCard>
              <AppLabel className="mb-3">Project specs</AppLabel>
              <dl className="flex flex-col gap-2">
                {SPECS.map(([k, v]) => (
                  <div key={k} className="flex items-baseline gap-2.5">
                    <dt className="w-[66px] shrink-0 text-[11px] text-app-mute">{k}</dt>
                    <dd className="min-w-0 text-ui-sm text-app-text">{v}</dd>
                  </div>
                ))}
              </dl>
            </AppCard>
            <AppCard className="hidden @3xl:block">
              <AppLabel className="mb-2">Client</AppLabel>
              <span className="flex items-center gap-2">
                <AppAvatar initials={CLIENT?.initials ?? "JK"} tone="info" size="md" />
                <span className="min-w-0">
                  <span className="block truncate text-ui font-semibold text-app-text">{AI_BRIEF.client}</span>
                  <span className="block truncate text-ui-xs text-app-mute">Consult today, 11:00 · {ARTIST.name}</span>
                </span>
              </span>
            </AppCard>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

/* ─── Moment 1: the moodboard empty, then with Jo's references ──────────────── */

function MoodboardTab({ filled }: { filled: boolean }) {
  return (
    <AppFrame active="projects" sidebar={false} title={PROJECT.title} className="shadow-none">
      <div className="flex flex-col gap-3.5 px-4 pb-4">
        <AppTabs tabs={PROJECT_TABS} active="Moodboard" className="-mx-4" />
        {filled ? (
          <>
            <ReferenceCount />
            <ReferenceGrid variant="compact" />
          </>
        ) : (
          <>
            {/* Phones stack the two states, so only the empty board shows there */}
            <AddReferences className="max-sm:hidden" />
            <div className="flex flex-col items-center gap-1.5 rounded-app-lg px-4 py-8 text-center ring-1 ring-app-border">
              <span className="font-serif text-[19px] leading-tight text-app-text italic">The moodboard.</span>
              <span className="max-w-[16rem] text-ui-sm text-app-mute">Upload reference images or paste links to build the vision.</span>
            </div>
          </>
        )}
      </div>
    </AppFrame>
  );
}

/* ─── Moment 2: placement, size, style and color on the New project form ─────── */

function ProjectSpecsForm() {
  return (
    <AppFrame active="projects" sidebar={false} title="New project" className="shadow-none">
      <div className="flex flex-col gap-4 p-4 @lg:p-5">
        <div className="grid gap-3 @xl:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-1.5">
            <AppLabel>Client</AppLabel>
            <span className="flex h-9 min-w-0 items-center gap-2 rounded-app border border-app-border bg-app-surface px-2.5">
              <AppAvatar initials={CLIENT?.initials ?? "JK"} tone="info" size="xs" />
              <span className="truncate text-ui-sm font-semibold text-app-text">{AI_BRIEF.client}</span>
            </span>
          </div>
          <Field label="Project name">{PROJECT.title}</Field>
          <Field label="Placement">{PROJECT.placement}</Field>
          <Field label="Size" select>
            {SIZE}
          </Field>
        </div>

        <div className="flex flex-col gap-1.5">
          <AppLabel>Color / B&amp;G</AppLabel>
          <span className="inline-flex self-start rounded-app bg-graphite/[0.05] p-[3px]">
            {COLOR_MODES.map((m) => (
              <span
                key={m}
                className={cn(
                  "flex h-[26px] items-center rounded-[6px] px-3 text-ui-sm font-semibold whitespace-nowrap",
                  m === COLOR_MODE ? "bg-app-surface text-app-text shadow-[0_1px_2px_rgba(28,25,23,0.08)]" : "text-app-soft",
                )}
              >
                {m}
              </span>
            ))}
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <AppLabel>Style</AppLabel>
          <div className="flex flex-wrap gap-1.5">
            {PROJECT_STYLES.map((s, i) => (
              <span key={s} className={cn(i >= 5 && "hidden @md:contents")}>
                <StyleChip on={s === PROJECT_STYLE}>{s}</StyleChip>
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <AppLabel>Reference notes</AppLabel>
          <p className="rounded-app border border-app-border bg-app-surface px-3 py-2.5 text-ui-sm leading-relaxed text-app-text">
            {AI_BRIEF.request}
          </p>
        </div>

        <div className="flex justify-end gap-2 border-t border-app-border pt-3.5">
          <AppButton variant="ghost">Cancel</AppButton>
          <AppButton variant="primary" icon={Plus}>
            Create project
          </AppButton>
        </div>
      </div>
    </AppFrame>
  );
}

/* ─── Moment 3: Mara writes the brief on the AI screen ───────────────────────── */

/** The composer's style chips (ai-design/_proto/data.ts STYLE_TOKENS). */
const BRIEF_STYLES: { name: string; on: boolean }[] = [
  { name: "Fine-line", on: true },
  { name: "Botanical", on: true },
  { name: "Neo-traditional", on: false },
  { name: "Blackwork", on: false },
  { name: "Japanese", on: false },
  { name: "Geometric", on: false },
];

/** Mara's brief, in her words: the consult fields as she wrote them. */
const WRITTEN_BRIEF = `Peonies with a sprig of lavender on the ${AI_BRIEF.placement.toLowerCase()}, palm-sized. ${AI_BRIEF.style}; ${AI_BRIEF.palette.toLowerCase()}. ${AI_BRIEF.notes}`;

function BriefComposer() {
  return (
    <AppFrame active="ai" sidebar={false} className="shadow-none">
      <div className="p-4 @lg:p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-app bg-app-active text-app-active-fg">
            <Sparkles size={16} strokeWidth={1.9} />
          </span>
          <span className="min-w-0">
            <AppLabel>AI Design Assistant</AppLabel>
            <span className="mt-0.5 block text-[20px] leading-tight font-bold text-app-text">{PROJECT.title}</span>
            <span className="mt-1 block text-ui-sm text-app-mute">Revisit {AI_BRIEF.client}&rsquo;s concept.</span>
          </span>
        </div>

        <div className="mt-4 grid gap-4 border-t border-app-border pt-4 @2xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] @2xl:gap-6">
          <div className="flex min-w-0 flex-col">
            <AppLabel className="mb-1.5">Client</AppLabel>
            <span className="flex items-center gap-2 rounded-app border border-app-border px-2.5 py-2">
              <AppAvatar initials={CLIENT?.initials ?? "JK"} tone="info" size="sm" />
              <span className="min-w-0 flex-1 truncate text-ui-sm font-semibold text-app-text">{AI_BRIEF.client}</span>
              <span className="flex shrink-0 items-center gap-1.5 text-ui-xs text-app-mute">
                <AppAvatar initials={ARTIST.initials} tone={ARTIST.tone} size="xs" />
                {ARTIST.name}
              </span>
            </span>

            <AppLabel className="mt-4 mb-1.5">Description</AppLabel>
            <p className="rounded-app border border-app-text/40 bg-app-surface px-3 py-2.5 text-ui-sm leading-relaxed text-app-text ring-2 ring-app-active">
              {WRITTEN_BRIEF}
              {/* The caret: Mara is still typing. */}
              <span className="ml-px inline-block h-[1.05em] w-px translate-y-[2px] bg-app-text" />
            </p>
          </div>

          <div className="flex min-w-0 flex-col">
            <AppLabel className="mb-1.5">Style</AppLabel>
            <div className="flex flex-wrap gap-1.5">
              {BRIEF_STYLES.map((s) => (
                <StyleChip key={s.name} on={s.on}>
                  {s.name}
                </StyleChip>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <Field label="Placement" select>
                Forearm
              </Field>
              <Field label="Size" select>
                Medium
              </Field>
            </div>

            <div className="mt-5 flex justify-end border-t border-app-border pt-3.5 @2xl:mt-auto">
              <AppButton variant="primary">Save draft</AppButton>
            </div>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

/** Phones: tall forms show their top half and fade into the stage, so the moments swipe at one height. */
function PhoneCrop({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-sm:max-h-[640px] max-sm:overflow-hidden max-sm:[mask-image:linear-gradient(to_bottom,#000_calc(100%-90px),transparent)]">
      {children}
    </div>
  );
}

export default function AiDesignPage() {
  return (
    <FeaturePage
      feature={feature}
      headings={{
        moments: "References, notes and the brief",
        details: "What else the moodboard holds",
        worksWith: "Kept with the project and the client",
        worksWithLead: "References sit on the project beside its sessions, and the project sits on the client’s record.",
      }}
      visuals={{
        hero: <MoodboardHome />,
        heroCrop: true,
        moments: [
          {
            before: <MoodboardTab filled={false} />,
            after: <MoodboardTab filled />,
            beforeLabel: "New project",
            afterLabel: `${REFERENCES.length} references`,
          },
          <PhoneCrop key="specs">
            <ProjectSpecsForm />
          </PhoneCrop>,
          <PhoneCrop key="brief">
            <BriefComposer />
          </PhoneCrop>,
        ],
        detailLabels: [
          { label: "Paste URL", tone: "quiet" },
          { label: SIZE, tone: "quiet" },
          { label: PROJECT_STYLE, tone: "ember" },
          { label: COLOR_MODE, tone: "quiet" },
          { label: "New project", tone: "quiet" },
          { label: AI_BRIEF.client, tone: "info" },
        ],
      }}
      planRows={[
        { label: "A moodboard on every project", from: "solo" },
        { label: "Reference images and links", from: "solo" },
        { label: "Placement, size, style and color notes", from: "solo" },
      ]}
      inkBand={{ headline: "Walk into the consult prepared.", italicWord: "prepared" }}
    />
  );
}
