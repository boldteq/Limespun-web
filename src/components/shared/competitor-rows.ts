import { CHECKED_ON, FEATURES, getCompetitor, type FeatureCell, type FeatureKey } from "@/lib/data/competitors";

type Cell = boolean | string;

export interface CompetitorRow {
  feature: string;
  values: Record<string, Cell>;
}

/** Where a Limespun feature isn't on every plan, name the plan it starts on (plans.ts). */
const LIMESPUN_PLAN: Partial<Record<FeatureKey, string>> = {
  guestArtists: "Pro and up",
  payoutSplits: "Studio and up",
};

/** "unknown" is shown as "Not published", never as a dash: the vendor may have it. */
function competitorCell(cell: FeatureCell): Cell {
  if (cell.value === "yes") return true;
  if (cell.value === "no") return false;
  if (cell.value === "partial") return "Partial";
  return "Not published";
}

/** Rows for the shared ComparisonTable, built only from the sourced competitor data. */
export function competitorRows(slug: string): CompetitorRow[] {
  const c = getCompetitor(slug);
  if (!c) return [];
  return FEATURES.map((f) => ({
    feature: f.label,
    values: { [slug]: competitorCell(c.features[f.key]), limespun: LIMESPUN_PLAN[f.key] ?? true },
  }));
}

/** CHECKED_ON is stored as "22 September 2026"; the site writes US dates ("September 22, 2026"). */
function usDate(date: string): string {
  const m = /^(\d{1,2}) ([A-Za-z]+) (\d{4})$/.exec(date);
  return m ? `${m[2]} ${m[1]}, ${m[3]}` : date;
}

export function competitorCaption(slug: string): string {
  const c = getCompetitor(slug);
  if (!c) return "";
  return `Source: ${c.name}'s public pages, checked ${usDate(CHECKED_ON)}. "Not published" means their pages don't describe it; it may still exist.`;
}

/** The vendor's published pricing, as recorded in competitors.ts. */
export function competitorPricing(slug: string): string {
  return getCompetitor(slug)?.pricingSummary ?? "";
}
