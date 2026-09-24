import { ACCOUNT } from "@/lib/brand";

export interface SiteLink {
  label: string;
  href: string;
}

export interface LinkGroup {
  heading: string;
  links: SiteLink[];
}

/** Competitors with a /compare page. Slugs must match src/lib/data/competitors.ts. */
export const COMPARE_INDEX = [
  { slug: "square", name: "Square Appointments", short: "Square" },
  { slug: "vagaro", name: "Vagaro", short: "Vagaro" },
  { slug: "fresha", name: "Fresha", short: "Fresha" },
  { slug: "glossgenius", name: "GlossGenius", short: "GlossGenius" },
  { slug: "tattoogenda", name: "TattooGenda", short: "TattooGenda" },
  { slug: "daysmart", name: "DaySmart Body Art", short: "DaySmart" },
  { slug: "mangomint", name: "Mangomint", short: "Mangomint" },
] as const;

export type CompareSlug = (typeof COMPARE_INDEX)[number]["slug"];

/** Free tools under /tools. */
export const TOOLS_INDEX = [
  {
    slug: "deposit-calculator",
    name: "Deposit & no-show calculator",
    short: "Deposit calculator",
    blurb: "See how much a deposit policy protects each month.",
  },
  {
    slug: "payout-calculator",
    name: "Artist payout calculator",
    short: "Payout calculator",
    blurb: "Work out commission, booth rent and guest splits.",
  },
  {
    slug: "consent-form-template",
    name: "Tattoo consent form template",
    short: "Consent form template",
    blurb: "A printable starting point for your release form.",
  },
] as const;

/**
 * Footer link columns. Labels are the app's own nouns (Messages, Clients, Projects, Payments, Team)
 * or the nav's where the app has none (Deposits, Design moodboards, Reports). Only live routes:
 * no /product/today, /product/inbox or /migrate/<vendor> (those redirect), no demo booking.
 * Keep each column at 8 links or fewer so the desktop grid stays even.
 */
export const FOOTER_GROUPS: LinkGroup[] = [
  {
    heading: "Features",
    links: [
      { label: "Calendar", href: "/product/calendar" },
      { label: "Deposits", href: "/product/appointments" },
      { label: "Messages", href: "/product/messages" },
      { label: "Clients", href: "/product/clients" },
      { label: "Consent forms", href: "/product/forms" },
      { label: "Projects", href: "/product/projects" },
      { label: "Portfolio & flash", href: "/product/portfolio" },
      { label: "Design moodboards", href: "/product/ai-design" },
    ],
  },
  {
    heading: "Run the shop",
    links: [
      { label: "Payments", href: "/product/payments" },
      { label: "Team", href: "/product/team" },
      { label: "Inventory", href: "/product/inventory" },
      { label: "Reports", href: "/product/analytics" },
      { label: "Marketing", href: "/product/marketing" },
      { label: "All features", href: "/product" },
    ],
  },
  {
    heading: "For studios",
    links: [
      { label: "Solo artists", href: "/for/solo-artists" },
      { label: "Small studios", href: "/for/small-studios" },
      { label: "Busy shops", href: "/for/multi-chair" },
      { label: "Multiple locations", href: "/for/multi-location" },
      { label: "Pricing", href: "/pricing" },
      { label: "Switching guide", href: "/migrate" },
    ],
  },
  {
    heading: "Compare",
    links: [
      ...COMPARE_INDEX.map((c) => ({ label: `vs ${c.short}`, href: `/compare/${c.slug}` })),
      { label: "All comparisons", href: "/compare" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      ...TOOLS_INDEX.map((t) => ({ label: t.short, href: `/tools/${t.slug}` })),
      { label: "All free tools", href: "/tools" },
      { label: "EU REACH hub", href: "/reach-compliance" },
      { label: "Changelog", href: "/changelog" },
      { label: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press kit", href: "/press" },
      { label: "Security", href: "/legal/security" },
      { label: "Contact", href: "/contact" },
      { label: ACCOUNT.signInLabel, href: ACCOUNT.signInHref },
    ],
  },
];

export const LEGAL_LINKS: SiteLink[] = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Security", href: "/legal/security" },
  { label: "GDPR", href: "/legal/gdpr" },
  { label: "Cookies", href: "/legal/cookies" },
];

const AI_PROMPT =
  "What is Limespun (limespun.com), the software for tattoo studios? Summarize what it does for bookings, deposits, consent forms and artist payouts, and who it suits.";

/** "Ask AI about Limespun" — opens each assistant with a neutral, prefilled question. */
export const ASK_AI_LINKS: SiteLink[] = [
  { label: "ChatGPT", href: `https://chatgpt.com/?q=${encodeURIComponent(AI_PROMPT)}` },
  { label: "Claude", href: `https://claude.ai/new?q=${encodeURIComponent(AI_PROMPT)}` },
  { label: "Perplexity", href: `https://www.perplexity.ai/search?q=${encodeURIComponent(AI_PROMPT)}` },
];
