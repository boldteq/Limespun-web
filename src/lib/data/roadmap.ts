export interface RoadmapItem {
  title: string;
  description: string;
  modules: string[];
  status: 'shipped' | 'building' | 'next' | 'considering';
  /** Internal planning only. The page never prints it: dates slip, and a missed date reads as a broken promise. */
  quarter: 'Q1-2026' | 'Q2-2026' | 'Q3-2026' | 'Q4-2026' | 'Future';
}

/** Statuses match what pricing sells: anything on a plan in src/lib/data/plans.ts is shipped. */
export const roadmapItems: RoadmapItem[] = [
  // Shipped
  { title: "Multi-session projects", description: "A sleeve or back piece is one project: every session, photo and note, with one deposit pool.", modules: ["Projects"], status: 'shipped', quarter: 'Q1-2026' },
  { title: "EU REACH ink tracking", description: "Ink registry in Settings, a REACH-registered count on Inventory and a REACH ink disclosure on the consent form. On every plan.", modules: ["Inventory", "Forms"], status: 'shipped', quarter: 'Q1-2026' },
  { title: "Every artist on one calendar", description: "A column per artist, drag to reschedule, and clash checks before anything double-books.", modules: ["Calendar"], status: 'shipped', quarter: 'Q2-2026' },
  { title: "Design moodboards", description: "Collect references, placement, size and style notes for each piece on the project.", modules: ["AI design"], status: 'shipped', quarter: 'Q2-2026' },
  { title: "Drafted design briefs", description: "A drafted brief from the client's description that the artist edits. The AI never draws the tattoo.", modules: ["AI design"], status: 'building', quarter: 'Q4-2026' },
  { title: "Messages", description: "SMS and email in one inbox, with the client's record beside every thread.", modules: ["Messages"], status: 'shipped', quarter: 'Q2-2026' },
  { title: "API access and webhooks", description: "An API and webhooks so studios can connect their own tools.", modules: ["API"], status: 'next', quarter: 'Q4-2026' },
  { title: "Reports across locations", description: "Every shop's numbers in one view, on Pro and Multi-Location.", modules: ["Analytics", "Locations"], status: 'shipped', quarter: 'Q3-2026' },
  // Building
  { title: "Public booking pages v2", description: "More ways to make the booking page your own, per artist and per guest spot.", modules: ["Bookings"], status: 'building', quarter: 'Q3-2026' },
  // Next
  { title: "Instagram and WhatsApp in Messages", description: "Instagram and WhatsApp threads in the same inbox as SMS and email.", modules: ["Messages"], status: 'next', quarter: 'Q4-2026' },
  { title: "Mobile app for artists", description: "Native iOS and Android: Today, schedule, messages and photo capture.", modules: ["Mobile"], status: 'next', quarter: 'Q4-2026' },
  // Later
  { title: "SSO and SCIM", description: "Sign in with Google, Microsoft or SAML, and add or remove artists from your identity provider.", modules: ["Team"], status: 'considering', quarter: 'Future' },
  { title: "Skin-tone aware photo capture", description: "Better photo guidance for darker skin tones: lighting and color calibration.", modules: ["Photos"], status: 'considering', quarter: 'Future' },
  { title: "Studio directory (opt-in)", description: "An optional client-facing directory that sends traffic to your booking page. No fees.", modules: ["Marketing"], status: 'considering', quarter: 'Future' },
  { title: "Voice-driven booking notes", description: "Dictate notes after the session; they're transcribed onto the client record.", modules: ["AI design", "Clients"], status: 'considering', quarter: 'Future' },
];

export const statusLabels: Record<RoadmapItem['status'], string> = {
  shipped: "Shipped",
  building: "Building now",
  next: "Up next",
  considering: "Later",
};
