export interface Role {
  title: string;
  team: 'engineering' | 'design' | 'support' | 'sales';
  type: 'full-time' | 'contract';
  location: string;
  description: string;
}

/**
 * Confirmed open roles only. Empty means the careers page shows its
 * "No open roles right now" state; add a role here once it's really open.
 */
export const openRoles: Role[] = [];

export const teamLabels: Record<Role['team'], string> = {
  engineering: "Engineering",
  design: "Design",
  support: "Customer Success",
  sales: "Sales",
};
