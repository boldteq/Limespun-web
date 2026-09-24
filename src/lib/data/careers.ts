export interface Role {
  title: string;
  team: "engineering" | "design" | "support" | "sales";
  type: "full-time" | "contract";
  /** Where the work happens, as the listing should read it: "Remote", "Remote (UK hours)". */
  location: string;
  /** Two or three sentences: what the work is, in plain words. No perks, no salary claims. */
  description: string;
  /** ISO date the role opened (YYYY-MM-DD). Feeds JobPosting JSON-LD. */
  postedOn: string;
  /** For remote roles: the countries you can apply from (ISO names, e.g. "United Kingdom"). */
  countries?: string[];
}

/**
 * Confirmed open roles only. Empty means the careers page shows its "No open roles right
 * now" state and emits no JobPosting data; add a role here only once it's really open.
 */
export const openRoles: Role[] = [];

export const teamLabels: Record<Role["team"], string> = {
  engineering: "Engineering",
  design: "Design",
  support: "Customer success",
  sales: "Sales",
};

export const roleTypeLabels: Record<Role["type"], string> = {
  "full-time": "Full-time",
  contract: "Contract",
};
