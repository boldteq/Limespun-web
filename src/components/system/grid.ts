/*
 * Row-filling spans for card grids whose item count varies (related links, feature details).
 * From lg the grid runs on 12 columns: up to four items share one row, five, six and nine go
 * three across, other counts four across, and a short last row splits the full width instead
 * of leaving an empty cell. Pair with `lg:grid-cols-12` on the grid. Class names are literal
 * so Tailwind generates them.
 */
const LG_SPAN: Record<number, string> = {
  1: "lg:col-span-12",
  2: "lg:col-span-6",
  3: "lg:col-span-4",
  4: "lg:col-span-3",
};

/** Items per full row at lg for a grid of `count`. */
export function lgPerRow(count: number): number {
  if (count <= 4) return Math.max(count, 1);
  return count % 3 === 0 || count === 5 ? 3 : 4;
}

/** The lg column span for item `index` of `count` on a 12-column grid. */
export function lgRowSpan(count: number, index: number): string {
  const perRow = lgPerRow(count);
  const lastRow = count % perRow || perRow;
  return LG_SPAN[index >= count - lastRow ? lastRow : perRow];
}

/** Two-column grids (phones and sm): the odd last item spans the row. Pass the variant prefix. */
export function lastSpansTwo(count: number, index: number, variant: "" | "sm:" = ""): string {
  if (count % 2 === 0 || index !== count - 1) return "";
  return variant === "sm:" ? "sm:col-span-2" : "col-span-2";
}
