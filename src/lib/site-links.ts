import { ACCOUNT, CTA } from "@/lib/brand";

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

export const FOOTER_GROUPS: LinkGroup[] = [
  {
    heading: "Product",
    links: [
      { label: "Calendar", href: "/product/calendar" },
      { label: "Sleeves & projects", href: "/product/projects" },
      { label: "Clients", href: "/product/clients" },
      { label: "Consent forms", href: "/product/forms" },
      { label: "Payments", href: "/product/payments" },
      { label: "Inventory", href: "/product/inventory" },
      { label: "Changelog", href: "/changelog" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "For studios",
    links: [
      { label: "Solo artists", href: "/for/solo-artists" },
      { label: "Small studios", href: "/for/small-studios" },
      { label: "Multi-chair shops", href: "/for/multi-chair" },
      { label: "Multi-location", href: "/for/multi-location" },
      { label: "EU REACH", href: "/reach-compliance" },
      { label: "Switching tools", href: "/migrate" },
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
    heading: "Free tools",
    links: [
      ...TOOLS_INDEX.map((t) => ({ label: t.short, href: `/tools/${t.slug}` })),
      { label: "All tools", href: "/tools" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Migration guide", href: "/migrate" },
      { label: "REACH hub", href: "/reach-compliance" },
      { label: "Roadmap", href: "/roadmap" },
      { label: CTA.demoLabel, href: CTA.demoHref },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press kit", href: "/press" },
      { label: "Security", href: "/legal/security" },
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
  "What is Limespun (limespun.com), the software for tattoo studios? Summarise what it does for bookings, deposits, consent forms and artist payouts, and who it suits.";

/** "Ask AI about Limespun" — opens each assistant with a neutral, prefilled question. */
export const ASK_AI_LINKS: SiteLink[] = [
  { label: "ChatGPT", href: `https://chatgpt.com/?q=${encodeURIComponent(AI_PROMPT)}` },
  { label: "Claude", href: `https://claude.ai/new?q=${encodeURIComponent(AI_PROMPT)}` },
  { label: "Perplexity", href: `https://www.perplexity.ai/search?q=${encodeURIComponent(AI_PROMPT)}` },
];
