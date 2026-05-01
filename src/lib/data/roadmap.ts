export interface RoadmapItem {
  title: string;
  description: string;
  modules: string[];
  status: 'shipped' | 'building' | 'next' | 'considering';
  quarter: 'Q1-2026' | 'Q2-2026' | 'Q3-2026' | 'Q4-2026' | 'Future';
}

export const roadmapItems: RoadmapItem[] = [
  // Shipped (Q1-Q2 2026)
  { title: "Multi-session projects", description: "Sleeves as first-class entities. Deposit pool, photo timeline, consent history.", modules: ["Projects"], status: 'shipped', quarter: 'Q1-2026' },
  { title: "EU REACH 2022 compliance", description: "Ink registry, MSDS, batch tracking, inspector reports.", modules: ["Inventory"], status: 'shipped', quarter: 'Q1-2026' },
  { title: "Multi-chair Day view + dnd-kit", description: "Custom calendar built for tattoo workflow.", modules: ["Calendar"], status: 'shipped', quarter: 'Q2-2026' },
  { title: "AI Studio v1", description: "Brief generator, reference assist, watermarked previews.", modules: ["AI Studio"], status: 'shipped', quarter: 'Q2-2026' },
  { title: "Omnichannel Messages", description: "SMS, email, IG, WhatsApp, in-app — one inbox per client.", modules: ["Messages"], status: 'shipped', quarter: 'Q2-2026' },
  // Building (Q2-Q3 2026)
  { title: "Per-location P&L dashboard", description: "Multi-location chains: every shop, one view, monthly auto-reports.", modules: ["Analytics", "Locations"], status: 'building', quarter: 'Q2-2026' },
  { title: "Public booking pages v2", description: "Customisable per-artist, per-residency. Studio-branded.", modules: ["Bookings"], status: 'building', quarter: 'Q3-2026' },
  { title: "SSO + SCIM (Enterprise)", description: "Google, Microsoft, SAML. Auto-provision artists across locations.", modules: ["Auth", "Locations"], status: 'building', quarter: 'Q3-2026' },
  // Next (Q3-Q4 2026)
  { title: "Mobile app for artists", description: "Native iOS + Android. Today, schedule, messages, photo capture.", modules: ["Mobile"], status: 'next', quarter: 'Q3-2026' },
  { title: "Loyalty + referral mechanics", description: "Per-studio loyalty programmes. Referral tracking. Auto-credits.", modules: ["Marketing"], status: 'next', quarter: 'Q4-2026' },
  { title: "Public API + webhooks", description: "REST API for integrations. Webhook events for every state change.", modules: ["API"], status: 'next', quarter: 'Q4-2026' },
  // Considering
  { title: "Skin-tone aware photo capture", description: "Better photo guidance for darker skin tones. Lighting + colour calibration.", modules: ["Photo"], status: 'considering', quarter: 'Future' },
  { title: "Studio marketplace (opt-in)", description: "Optional client-facing studio directory. Drives traffic to your booking page. No fees.", modules: ["Marketing"], status: 'considering', quarter: 'Future' },
  { title: "Voice-driven booking notes", description: "Dictate notes after the chair. Auto-transcribed to client record.", modules: ["AI Studio", "Clients"], status: 'considering', quarter: 'Future' },
];

export const statusLabels: Record<RoadmapItem['status'], string> = {
  shipped: "Shipped",
  building: "Building now",
  next: "Up next",
  considering: "Considering",
};
