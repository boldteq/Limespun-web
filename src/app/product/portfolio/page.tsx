import React from "react";
import { ArrowUpDown, ChevronDown, Clock, CloudUpload, Eye, Palette, Plus, Star, Tag, Undo2, Upload, UserRound } from "lucide-react";
import { cn } from "@/components/system";
import { FeaturePage } from "@/components/templates/feature-page";
import {
  AppAvatar,
  AppButton,
  AppFrame,
  AppKpiStrip,
  AppLabel,
  AppStatus,
  ARTISTS,
  FLASH,
  FlashEventsScreen,
  PhotoTile,
  PORTFOLIO,
  ToolbarPill,
  ToolbarSearch,
  ToolbarSelect,
  usd,
  type AppKpiItem,
  type FlashPiece,
} from "@/components/mockups";
import { getFeature } from "@/lib/data/features";
import { pageMetadata } from "@/lib/seo";

const feature = getFeature("portfolio");

export const metadata = pageMetadata({
  title: feature.seo.title,
  description: feature.seo.description,
  path: "/product/portfolio",
});

/* ─── Hero: the Flash library (app /flash, portfolio/_proto/ScrPortfolio.tsx) ──
   Led by what sells a piece rather than by the artwork: status, edition, price and
   deposit. The app's card is wider than tall (a 212px plate over a ≥236px column),
   so the plates stay short and the numbers carry the screen. Deposits are the app's
   default, 30% of the price; the featured pair and the counts match PortfolioScreen. */
const DEPOSIT_SHARE = 0.3;
const depositCents = (priceCents: number) => Math.round(priceCents * DEPOSIT_SHARE);

const FLASH_META: Record<string, { style: string; repeatable: boolean; featured: boolean }> = {
  F1: { style: "Traditional", repeatable: true, featured: true },
  F2: { style: "Fine-line", repeatable: false, featured: false },
  F3: { style: "Traditional", repeatable: false, featured: true },
  F4: { style: "Fine-line", repeatable: true, featured: false },
  F5: { style: "Traditional", repeatable: true, featured: false },
  F6: { style: "Japanese", repeatable: false, featured: false },
};
const metaOf = (label: string) => FLASH_META[label] ?? { style: "", repeatable: false, featured: false };

const AVAILABLE = FLASH.filter((f) => f.status === "Available");
const FLASH_KPIS: AppKpiItem[] = [
  { label: "Available", value: String(AVAILABLE.length), note: "ready to claim" },
  { label: "Reserved", value: String(FLASH.filter((f) => f.status === "Reserved").length), note: "holds pending" },
  { label: "Featured", value: String(FLASH.filter((f) => metaOf(f.label).featured).length), note: "on public page", accent: true },
  {
    label: "Avg. price",
    value: usd(Math.round(AVAILABLE.reduce((t, f) => t + f.priceCents, 0) / Math.max(AVAILABLE.length, 1))),
    note: "across available pieces",
  },
];

/** A chip on the plate, as the app sets it: dark glass, small caps. */
function PlateChip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "absolute inline-flex h-5 items-center gap-1 rounded-full bg-graphite/70 px-1.5 text-[10px] font-bold tracking-[0.06em] text-white uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}

function FlashCard({ piece }: { piece: FlashPiece }) {
  const artist = ARTISTS[piece.artist];
  const meta = metaOf(piece.label);
  const reserved = piece.status === "Reserved";
  return (
    <div className="@container flex min-w-0 flex-col overflow-hidden rounded-app-lg bg-app-surface ring-1 ring-app-border">
      <PhotoTile label={piece.label} className="aspect-[16/9] rounded-none ring-0 @max-[12rem]:aspect-[4/3]">
        <AppStatus tone={reserved ? "warning" : "success"} dot className="absolute top-2 left-2 h-[18px] px-1.5 text-[10.5px]">
          {piece.status}
        </AppStatus>
        {meta.featured && (
          <span className="absolute top-2 right-2 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white text-app-text shadow-[0_1px_2px_rgba(28,25,23,0.12)]">
            <Star size={10} strokeWidth={2.4} className="fill-current" />
          </span>
        )}
        <PlateChip className="bottom-2 left-2">{meta.repeatable ? "Repeatable" : "1 of 1"}</PlateChip>
      </PhotoTile>
      <div className="flex flex-col gap-1 px-2.5 pt-2 pb-2.5 @[13rem]:px-3">
        {/* Under 8.5rem (two-up at 320) the price drops to the second line and the avatar goes,
            so the title keeps the card's width and nothing is cut. */}
        <span className="flex min-w-0 items-start justify-between gap-2">
          <span className="line-clamp-2 min-w-0 text-ui-sm leading-snug font-semibold text-app-text">{piece.title}</span>
          <span className="hidden shrink-0 text-ui-sm font-extrabold text-app-text tabular-nums @[8.5rem]:inline">{usd(piece.priceCents)}</span>
        </span>
        <span className="flex min-w-0 items-center gap-1.5 text-ui-xs text-app-mute">
          <AppAvatar initials={artist.initials} tone={artist.tone} size="xs" className="hidden @[8.5rem]:inline-flex" />
          <span className="hidden min-w-0 truncate @[8.5rem]:inline">
            {artist.name}
            <span className="hidden @[14rem]:inline"> · {meta.style}</span>
          </span>
          <span className="text-ui-sm font-extrabold text-app-text tabular-nums @[8.5rem]:hidden">{usd(piece.priceCents)}</span>
          <span className="ml-auto shrink-0 tabular-nums">
            <span className="font-semibold text-app-soft">{usd(depositCents(piece.priceCents))}</span>{" "}
            <span className="@[8.5rem]:hidden">dep.</span>
            <span className="hidden @[8.5rem]:inline">deposit</span>
          </span>
        </span>
      </div>
    </div>
  );
}

function FlashLibrary() {
  return (
    <AppFrame
      active="flash"
      actions={
        <>
          <AppButton icon={Eye}>Preview public page</AppButton>
          <AppButton icon={CloudUpload}>Bulk upload</AppButton>
          <AppButton variant="primary" icon={Plus}>
            New flash
          </AppButton>
        </>
      }
    >
      <div className="flex flex-col gap-4 p-4 @lg:p-6">
        {/* Phones go straight to the pieces; the counts return from @md. */}
        <AppKpiStrip items={FLASH_KPIS} className="hidden @md:grid" />
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-wrap gap-2">
            <ToolbarPill active>All</ToolbarPill>
            <span className="hidden @xs:contents">
              <ToolbarPill>Draft</ToolbarPill>
            </span>
            <ToolbarPill>Available</ToolbarPill>
            <ToolbarPill>Reserved</ToolbarPill>
            <span className="hidden @md:contents">
              <ToolbarPill>Sold</ToolbarPill>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ToolbarSearch placeholder="Search flash" className="w-full @xl:w-[220px]" />
            <div className="ml-auto hidden items-center gap-1.5 @2xl:flex">
              <ToolbarSelect icon={UserRound} label="All artists" />
              <ToolbarSelect icon={Palette} label="All styles" />
              <span className="mx-0.5 h-5 w-px bg-app-border" />
              <ToolbarSelect icon={ArrowUpDown} label="Featured first" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2.5 @xl:grid-cols-3 @xl:gap-3.5">
          {FLASH.map((f) => (
            <FlashCard key={f.label} piece={f} />
          ))}
        </div>
      </div>
    </AppFrame>
  );
}

/* ─── Moment 1: "Add to portfolio", filled in for Mara's fine-line peonies ───
   portfolio/_proto/modals.tsx: serif title and sub, Artwork, Caption, Artist,
   Style, the "Feature on public page" switch, Cancel · Add to portfolio. The
   live preview (the gallery card as it will show) sits beside the form where
   the frame has room, as it does in the app from 861px. */
const PEONIES = PORTFOLIO.find((p) => p.label === "P2") ?? PORTFOLIO[0];

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <span className="text-ui-xs font-semibold text-app-text">{label}</span>
      {children}
    </div>
  );
}

function Box({ children, select = false }: { children: React.ReactNode; select?: boolean }) {
  return (
    <span className="flex h-9 min-w-0 items-center justify-between gap-2 rounded-app bg-app-surface px-2.5 text-ui-sm text-app-text ring-1 ring-app-border">
      <span className="truncate">{children}</span>
      {select && <ChevronDown size={14} strokeWidth={1.8} className="shrink-0 text-app-mute" />}
    </span>
  );
}

function Switch({ on }: { on: boolean }) {
  return (
    <span className={cn("relative h-5 w-9 shrink-0 rounded-full", on ? "bg-app-active-fg" : "bg-graphite/15")}>
      <span className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-[0_1px_2px_rgba(28,25,23,0.2)]", on ? "left-[18px]" : "left-0.5")} />
    </span>
  );
}

function AddToPortfolio() {
  const artist = ARTISTS[PEONIES.artist];
  return (
    <AppFrame active="portfolio" sidebar={false} className="shadow-none">
      <div className="border-b border-app-border px-4 pt-4 pb-3.5 @lg:px-5">
        <p className="font-serif text-[22px] leading-[1.15] text-app-text">Add to portfolio</p>
        <p className="mt-1 text-ui-sm leading-snug text-app-mute">Upload a finished piece. Feature it to show it on your public page.</p>
      </div>
      <div className="grid gap-5 px-4 py-4 @lg:grid-cols-[minmax(0,1fr)_152px] @lg:px-5 @2xl:grid-cols-[minmax(0,1fr)_184px]">
        <div className="flex min-w-0 flex-col gap-3.5">
          <Field label="Artwork">
            <span className="flex items-center gap-3 rounded-app px-2.5 py-2 ring-1 ring-app-border">
              <PhotoTile label={PEONIES.label} className="w-12 shrink-0" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-ui-sm font-medium text-app-text">peonies-forearm.jpg</span>
                <span className="block text-ui-xs text-app-mute tabular-nums">2.4 MB</span>
              </span>
              <span className="text-ui-xs font-semibold text-app-soft">Replace</span>
              <span className="hidden text-ui-xs font-semibold text-app-soft @sm:inline">Remove</span>
            </span>
          </Field>
          <Field label="Caption">
            <Box>{PEONIES.title}</Box>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Artist">
              <Box select>{artist.name}</Box>
            </Field>
            <Field label="Style">
              <Box select>{PEONIES.style}</Box>
            </Field>
          </div>
          <div className="flex items-center gap-3 border-t border-app-border pt-3">
            <span className="min-w-0 flex-1">
              <span className="block text-ui-sm font-semibold text-app-text">Feature on public page</span>
              <span className="block text-ui-xs leading-snug text-app-mute">Clients see featured pieces first on your portfolio page.</span>
            </span>
            <Switch on />
          </div>
        </div>
        <div className="hidden min-w-0 flex-col gap-2 @lg:flex">
          <AppLabel className="tracking-[0.08em]">Preview</AppLabel>
          <PhotoTile label={PEONIES.label} aspect="portrait">
            <span className="absolute top-2 left-2 inline-flex h-5 items-center gap-1 rounded-full bg-white/95 px-1.5 text-[10.5px] font-bold text-app-active-fg shadow-[0_1px_2px_rgba(28,25,23,0.08)]">
              <Star size={10} strokeWidth={2.4} className="fill-current" />
              Featured
            </span>
          </PhotoTile>
          <span className="truncate text-ui-sm font-semibold text-app-text">{PEONIES.title}</span>
          <span className="-mt-1 flex min-w-0 items-center gap-1.5 text-ui-xs text-app-mute">
            <AppAvatar initials={artist.initials} tone={artist.tone} size="sm" />
            <span className="truncate">
              {artist.name} · {PEONIES.style}
            </span>
          </span>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 border-t border-app-border px-4 py-3 @lg:px-5">
        <AppButton variant="ghost">Cancel</AppButton>
        <AppButton variant="primary" icon={Upload}>
          Add to portfolio
        </AppButton>
      </div>
    </AppFrame>
  );
}

/* ─── Moment 2: Mara's Moth flash, listed, then claimed from the public page ─
   The flash detail (portfolio/_proto/parts.tsx): Price · Deposit · Edition,
   the hold banner, and Manage (Reserve while it's available; Release hold and
   Mark sold once it's held). The deposit is the app's default, 30% of the price. */
const MOTH = FLASH.find((f) => f.label === "F2") ?? FLASH[0];
const MOTH_DEPOSIT_CENTS = depositCents(MOTH.priceCents);

function FlashDetail({ held }: { held: boolean }) {
  const artist = ARTISTS[MOTH.artist];
  return (
    <AppFrame active="flash" sidebar={false} className="shadow-none">
      <div className="flex flex-col gap-3 p-3.5">
        <div className="flex items-center gap-3">
          <PhotoTile label={MOTH.label} className="w-14 shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 items-center justify-between gap-2">
              <p className="truncate text-ui font-semibold text-app-text">{MOTH.title}</p>
              {held ? (
                <AppStatus tone="warning" dot>
                  Reserved
                </AppStatus>
              ) : (
                <AppStatus tone="success" dot>
                  Available
                </AppStatus>
              )}
            </div>
            <span className="mt-1 flex min-w-0 items-center gap-1.5 text-ui-xs text-app-mute">
              <AppAvatar initials={artist.initials} tone={artist.tone} size="xs" />
              <span className="truncate">{artist.name}</span>
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-app bg-app-border ring-1 ring-app-border">
          {[
            ["Price", usd(MOTH.priceCents)],
            ["Deposit", usd(MOTH_DEPOSIT_CENTS)],
            ["Edition", "1/1"],
          ].map(([k, v]) => (
            <span key={k} className="flex min-w-0 flex-col gap-0.5 bg-app-surface px-2.5 py-2">
              <AppLabel className="text-[10px]">{k}</AppLabel>
              <span className="text-ui font-bold text-app-text tabular-nums">{v}</span>
            </span>
          ))}
        </div>
        {held ? (
          <span className="flex items-center gap-2 rounded-app bg-app-warning-bg px-2.5 py-2 text-ui-sm font-medium text-app-text">
            <Clock size={14} strokeWidth={2} className="shrink-0 text-app-warning" />
            On hold · deposit paid
          </span>
        ) : (
          <span className="flex items-center gap-2 rounded-app bg-graphite/[0.03] px-2.5 py-2 text-ui-sm text-app-soft">
            <Tag size={14} strokeWidth={2} className="shrink-0 text-app-mute" />
            Listed on your flash page
          </span>
        )}
        <div className="flex flex-wrap items-center gap-1.5 border-t border-app-border pt-3">
          <AppLabel className="mr-1 hidden tracking-[0.08em] @xs:block">Manage</AppLabel>
          {held ? (
            <>
              <AppButton icon={Undo2} className="h-7 px-2.5 text-ui-xs">
                Release hold
              </AppButton>
              <AppButton icon={Tag} className="h-7 px-2.5 text-ui-xs">
                Mark sold
              </AppButton>
            </>
          ) : (
            <AppButton icon={Clock} className="h-7 px-2.5 text-ui-xs">
              Reserve
            </AppButton>
          )}
        </div>
      </div>
    </AppFrame>
  );
}

/* ─── Moment 3: Friday the 13th flash filling up ──────────────────────────────
   The Flash events screen, cropped under Dev's slots: KPIs, the event and its
   Slots tab are the proof; Mara's row fades out. */
function FlashDay() {
  return (
    <div className="max-h-[640px] overflow-hidden [mask-image:linear-gradient(to_bottom,#000_calc(100%-96px),transparent)]">
      <FlashEventsScreen className="shadow-none" />
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <FeaturePage
      feature={feature}
      headings={{
        moments: "Pieces, flash and flash days",
        details: "What else it does",
        worksWith: "Joined to projects and deposits",
        worksWithLead: "Healed photos come from finished projects when you choose them, and a claimed flash piece takes its deposit like any booking.",
      }}
      visuals={{
        hero: <FlashLibrary />,
        heroCrop: true,
        moments: [
          <AddToPortfolio key="add" />,
          {
            before: <FlashDetail held={false} />,
            after: <FlashDetail held />,
            beforeLabel: "Listed",
            afterLabel: "Claimed with a deposit",
          },
          <FlashDay key="events" />,
        ],
        detailLabels: [
          { label: "Healed", tone: "success" },
          { label: "Featured", tone: "ember" },
          { label: "All styles", tone: "quiet" },
          { label: "Reserved", tone: "warning" },
          { label: "Bulk upload", tone: "quiet" },
          { label: "Preview public page", tone: "quiet" },
        ],
      }}
      planRows={[
        { label: "Portfolio with featured and healed work", from: "solo" },
        { label: "Flash with a price and a deposit", from: "solo" },
        { label: "Flash events with slots and a fill rate", from: "solo" },
        { label: "Your own booking domain", from: "solo" },
      ]}
      inkBand={{ headline: "Flash that sells from your own page.", italicWord: "sells" }}
    />
  );
}
