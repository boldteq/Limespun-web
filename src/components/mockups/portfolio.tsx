import { ArrowUpDown, CloudUpload, Eye, Palette, Plus, Star, Upload, UserRound } from "lucide-react";
import { cn } from "@/components/system/cn";
import { AppFrame } from "./app-frame";
import { AppAvatar, AppButton, AppKpiStrip, AppStatus, PhotoTile, type AppKpiItem } from "./app-parts";
import { ToolbarPill, ToolbarSearch, ToolbarSelect } from "./projects";
import { ARTISTS, FLASH, PORTFOLIO, usd, type FlashPiece, type PortfolioPiece } from "./sample-data";

/** Flash pieces this studio features on its public page (the portfolio carries its own flag). */
const FEATURED_FLASH = new Set(["F1", "F3"]);

const AVAILABLE_FLASH = FLASH.filter((f) => f.status === "Available");
/** "Avg. price · across available pieces", as the app computes it. */
const AVG_AVAILABLE_PRICE_CENTS = Math.round(
  AVAILABLE_FLASH.reduce((total, f) => total + f.priceCents, 0) / AVAILABLE_FLASH.length,
);

function portfolioKpis(): AppKpiItem[] {
  return [
    { label: "Pieces", value: String(PORTFOLIO.length), note: "in portfolio" },
    { label: "Featured", value: String(PORTFOLIO.filter((p) => p.featured).length), note: "on public page", accent: true },
    { label: "Healed", value: String(PORTFOLIO.filter((p) => p.healed).length), note: "ready to showcase" },
    { label: "Styles", value: String(new Set(PORTFOLIO.map((p) => p.style)).size), note: "represented" },
  ];
}

function flashKpis(): AppKpiItem[] {
  return [
    { label: "Available", value: String(AVAILABLE_FLASH.length), note: "ready to claim" },
    { label: "Reserved", value: String(FLASH.filter((f) => f.status === "Reserved").length), note: "holds pending" },
    { label: "Featured", value: String(FEATURED_FLASH.size), note: "on public page", accent: true },
    { label: "Avg. price", value: usd(AVG_AVAILABLE_PRICE_CENTS), note: "across available pieces" },
  ];
}

function FeaturedMark() {
  return (
    <span className="absolute top-2 left-2 inline-flex h-5 items-center gap-1 rounded-full bg-white/95 px-1.5 text-[10.5px] font-bold text-app-active-fg shadow-[0_1px_2px_rgba(28,25,23,0.08)]">
      <Star size={10} strokeWidth={2.4} className="fill-current" />
      Featured
    </span>
  );
}

function WorkCard({ piece, className }: { piece: PortfolioPiece; className?: string }) {
  const artist = ARTISTS[piece.artist];
  return (
    <div className={cn("@container min-w-0", className)}>
      <PhotoTile label={piece.label} aspect="portrait">
        {piece.featured && <FeaturedMark />}
        <AppStatus tone={piece.healed ? "success" : "warning"} dot className="absolute bottom-2 left-2">
          {piece.healed ? "Healed" : "Fresh"}
        </AppStatus>
      </PhotoTile>
      {/* Two lines before it clips, so "Koi sleeve, session 2" reads whole in a two-up phone grid. */}
      <span className="mt-2 line-clamp-2 text-ui-sm leading-snug font-semibold text-app-text">{piece.title}</span>
      <span className="mt-1 flex min-w-0 items-center gap-1.5 text-ui-xs text-app-mute">
        <AppAvatar initials={artist.initials} tone={artist.tone} size="sm" />
        {/* A narrow card lets the avatar carry the artist, so the style stays whole. */}
        <span className="truncate">
          <span className="hidden @min-[10rem]:inline">{artist.name} · </span>
          {piece.style}
        </span>
      </span>
    </div>
  );
}

/**
 * The app's flash card (portfolio/_proto/parts.tsx) keeps the price off the photo.
 * The tile is a short 3:2 plate with the design's name and style printed large
 * (never drawn art), its status chip on top and a star when it's featured; the
 * artist and price close the line under it, so the sheet reads as a priced list.
 */
function FlashCard({ piece, className }: { piece: FlashPiece; className?: string }) {
  const artist = ARTISTS[piece.artist];
  return (
    <div className={cn("@container min-w-0", className)}>
      <PhotoTile label={piece.label} title={piece.title} subtitle={piece.style} aspect="wide" className="@max-[10rem]:aspect-[4/3]">
        <AppStatus tone={piece.status === "Available" ? "success" : "warning"} dot className="absolute top-2 left-2">
          {piece.status}
        </AppStatus>
        {FEATURED_FLASH.has(piece.label) && (
          /* The star goes in the narrowest tiles, where it would sit against the status chip. */
          <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white/95 text-app-active-fg shadow-[0_1px_2px_rgba(28,25,23,0.08)] @max-[10rem]:hidden">
            <Star size={10} strokeWidth={2.4} className="fill-current" />
          </span>
        )}
      </PhotoTile>
      <span className="mt-2 flex min-w-0 items-center gap-1.5 text-ui-xs text-app-mute">
        <AppAvatar initials={artist.initials} tone={artist.tone} size="sm" />
        <span className="min-w-0 truncate">{artist.name}</span>
        <span className="ml-auto shrink-0 text-ui-sm font-extrabold text-app-text tabular-nums">{usd(piece.priceCents)}</span>
      </span>
    </div>
  );
}

/** Four tiles on a phone, then two rows of three, then one row of six. */
const tileVisibility = (i: number) => (i >= 4 ? "hidden @xl:block" : undefined);

/**
 * Portfolio and Flash (app: /portfolio and /flash, one screen in
 * portfolio/_proto/ScrPortfolio.tsx). Tiles are PhotoTiles with the piece's
 * label: the mockup never draws tattoo art.
 */
export function PortfolioScreen({ library = "portfolio", className }: { library?: "portfolio" | "flash"; className?: string }) {
  const isFlash = library === "flash";
  return (
    <AppFrame
      active={isFlash ? "flash" : "portfolio"}
      className={className}
      meta={isFlash ? `${FLASH.length} designs` : `${PORTFOLIO.length} pieces`}
      actions={
        <>
          <AppButton icon={Eye}>Preview public page</AppButton>
          {isFlash && <AppButton icon={CloudUpload}>Bulk upload</AppButton>}
          <AppButton variant="primary" icon={isFlash ? Plus : Upload}>
            {isFlash ? "New flash" : "Add work"}
          </AppButton>
        </>
      }
    >
      <div className="flex flex-col gap-4 p-4 @lg:p-6">
        <AppKpiStrip items={isFlash ? flashKpis() : portfolioKpis()} />

        <div className="flex flex-col gap-2.5">
          <div className="flex flex-wrap gap-2">
            {isFlash ? (
              <>
                <ToolbarPill active>All</ToolbarPill>
                <ToolbarPill>Draft</ToolbarPill>
                <ToolbarPill>Available</ToolbarPill>
                <ToolbarPill>Reserved</ToolbarPill>
                <span className="hidden @md:contents">
                  <ToolbarPill>Sold</ToolbarPill>
                </span>
              </>
            ) : (
              <>
                <ToolbarPill active>All work</ToolbarPill>
                <ToolbarPill>Featured</ToolbarPill>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <ToolbarSearch placeholder={isFlash ? "Search flash" : "Search work"} className="w-full @xl:w-[220px]" />
            <div className="ml-auto hidden items-center gap-1.5 @2xl:flex">
              <ToolbarSelect icon={UserRound} label="All artists" />
              <ToolbarSelect icon={Palette} label="All styles" />
              <span className="mx-0.5 h-5 w-px bg-app-border" />
              <ToolbarSelect icon={ArrowUpDown} label="Featured first" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-4 @xl:grid-cols-3 @5xl:grid-cols-6">
          {isFlash
            ? FLASH.map((f, i) => <FlashCard key={f.label} piece={f} className={tileVisibility(i)} />)
            : PORTFOLIO.map((p, i) => <WorkCard key={p.label} piece={p} className={tileVisibility(i)} />)}
        </div>
      </div>
    </AppFrame>
  );
}
