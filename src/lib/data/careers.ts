export interface Role {
  title: string;
  team: 'engineering' | 'design' | 'support' | 'sales';
  type: 'full-time' | 'contract' | 'apprentice';
  location: string;
  description: string;
}

export const openRoles: Role[] = [
  {
    title: "Senior Full-Stack Engineer (Stack A: Next.js + Supabase)",
    team: 'engineering',
    type: 'full-time',
    location: "Remote · 3 timezones (UTC-5 to UTC+5)",
    description: "Ship product. Read Limespun lessons in our memory brain — that's the bar. Need React 19, Supabase RLS, TypeScript strict, and an opinion on naming things.",
  },
  {
    title: "Product Designer (Tattoo & Craft Industries)",
    team: 'design',
    type: 'full-time',
    location: "Remote · Europe-friendly",
    description: "Design with the artist in mind. Read decoder briefs. Translate craft intuition into UI patterns. Figma + a portfolio that doesn't look like SaaS.",
  },
  {
    title: "Customer Success — Studio Operations",
    team: 'support',
    type: 'full-time',
    location: "Remote · US East friendly",
    description: "Onboard studios. Run migration calls. Answer chat in <4h. Need experience inside an actual tattoo studio (not just a SaaS background).",
  },
  {
    title: "Engineering Apprentice",
    team: 'engineering',
    type: 'apprentice',
    location: "Remote · global",
    description: "Six-month paid apprenticeship. Pair on real production work. Open to people changing careers, self-taught, or finishing a bootcamp. We hire from this every year.",
  },
];

export const teamLabels: Record<Role['team'], string> = {
  engineering: "Engineering",
  design: "Design",
  support: "Customer Success",
  sales: "Sales",
};
