export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  highlights: string[];
  modules: string[];
  type: "release" | "fix" | "improvement";
}

export const changelogEntries: ChangelogEntry[] = [
  {
    version: "v1.13.0",
    date: "2026-04-23",
    title: "Messages v1 — Omnichannel inbox",
    highlights: [
      "SMS, email, Instagram, WhatsApp, in-app — unified per client",
      "3-pane inbox (list + thread + context)",
      "Auto-reply triage during off-hours",
      "Internal notes separated from client thread",
      "Real-time presence via Supabase channels",
    ],
    modules: ["Messages", "Inbox"],
    type: "release",
  },
  {
    version: "v1.12.5",
    date: "2026-04-23",
    title: "Calendar polish — Sprints 1-6 PDF compliance",
    highlights: [
      "Smart-linking: link a new booking to a prior session for the same client",
      "Sterilisation buffers per chair",
      "Detail drawer with progressive disclosure",
      "QR code on the booking confirmation page",
      "NOW line on Day view, anchored to current minute",
    ],
    modules: ["Calendar"],
    type: "improvement",
  },
  {
    version: "v1.12.0",
    date: "2026-04-19",
    title: "Multi-chair Day view + dnd-kit",
    highlights: [
      "Custom Day view replaces FullCalendar for tattoo workflow",
      "Drag-drop bookings between chairs and times",
      "Realtime sync via Supabase channels",
      "WCAG AAA keyboard accessibility",
      "Animated category pills, allergy banners",
    ],
    modules: ["Calendar"],
    type: "release",
  },
  {
    version: "v1.11.2",
    date: "2026-04-15",
    title: "AI Studio launch — Brief generator + reference assist",
    highlights: [
      "Generate structured client briefs from a paragraph (~12s)",
      "9-grid reference pulls by style, era, body part",
      "Style-transfer placement preview (watermarked)",
      "Pro plan only; Solo / Studio see upgrade gate",
    ],
    modules: ["AI Studio"],
    type: "release",
  },
  {
    version: "v1.10.0",
    date: "2026-04-09",
    title: "Inventory + EU REACH 2022 compliance",
    highlights: [
      "Per-bottle CI numbers, MSDS attachments, batch IDs, expiries",
      "Reaction logging on both client and bottle batch",
      "One-click inspector report (PDF, <30s)",
      "Cross-studio batch warning network (opt-in)",
    ],
    modules: ["Inventory", "Compliance"],
    type: "release",
  },
  {
    version: "v1.9.4",
    date: "2026-04-02",
    title: "Forms — Kiosk mode + REACH waivers",
    highlights: [
      "iPad kiosk mode for in-studio consent",
      "EU REACH waivers per ink batch",
      "SHA-256 hashed PDF audit trail (court-admissible)",
      "Studio-branded forms with logo + colour",
    ],
    modules: ["Forms"],
    type: "release",
  },
  {
    version: "v1.9.0",
    date: "2026-03-26",
    title: "Payments + Commission auto-splits",
    highlights: [
      "Stripe Connect on every artist account",
      "Auto-splits at booking time (60/40, 70/30, custom)",
      "1099-K (US), P11D (UK), MV (FR) at year end",
      "Per-artist payout speed < 2 days",
    ],
    modules: ["Payments"],
    type: "release",
  },
  {
    version: "v1.8.0",
    date: "2026-03-19",
    title: "Multi-session projects (the moat)",
    highlights: [
      "Sleeves as projects, not bookings",
      "Deposit pool across sessions",
      "Photo timeline: REF / FRESH / HEAL / HEALED",
      "Consent + allergy history attached to project",
    ],
    modules: ["Projects"],
    type: "release",
  },
];
