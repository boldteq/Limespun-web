import { PLANS, PLAN_CAPS, ANNUAL_DISCOUNT_PERCENT, MONEY_BACK_DAYS, ONBOARDING_SUPPORT_DAYS, formatPrice, type PlanTier } from "./plans";
import type { FeatureSlug } from "./features";
import type { CompareSlug } from "@/lib/site-links";

/**
 * Copy for the four /for/<slug> pages. Each segment buys one plan; every number is
 * read from src/lib/data/plans.ts and every feature claim matches features.ts (and so
 * the app). No invented shops, people or stats: sub-segments describe kinds of
 * studio, not customers.
 */

export const SEGMENT_SLUGS = ["solo-artists", "small-studios", "multi-chair", "multi-location"] as const;

export type SegmentSlug = (typeof SEGMENT_SLUGS)[number];

/** The mockup the PageIntro shows (src/components/mockups). */
export type SegmentHeroScreen = "BookingFlowPhone" | "CalendarScreen" | "TeamScreen" | "LocationsScreen";

export interface SegmentJob {
  title: string;
  body: string;
  /** The feature page this job links to. */
  feature: FeatureSlug;
}

export interface Segment {
  slug: SegmentSlug;
  /** "/for/<slug>" */
  href: string;
  /** Page name, as the nav’s "Who it’s for" menu shows it. */
  name: string;
  /** One line for link cards. */
  card: string;
  plan: PlanTier;
  eyebrow: string;
  /** Outcome headline, ≤ 8 words. */
  h1: string;
  /** One word of h1, set in italic ember. */
  italicWord: string;
  sub: string;
  heroScreen: SegmentHeroScreen;
  /** The state the hero mockup should show. */
  heroNote: string;
  /** Heading for the "Your week" section; italicWord is a word of title. */
  week: { title: string; italicWord: string; lead: string };
  /** "Your week": three jobs, each tied to the feature page that does it. */
  jobs: [SegmentJob, SegmentJob, SegmentJob];
  /** Beside the plan card: why this plan fits. */
  planPitch: { title: string; body: string };
  /** When they’d move up, naming the next plan. None on the top plan. */
  outgrow?: string;
  subSegmentsHeading: string;
  /** Kinds of tattoo studio this page speaks to, shown as chips. */
  subSegments: [string, string, string];
  /** Two comparisons for the switching band. */
  compare: [CompareSlug, CompareSlug];
  faqs: [{ q: string; a: string }, { q: string; a: string }, { q: string; a: string }];
  /**
   * title: the page’s own title without the brand; pageMetadata() adds " | Limespun"
   * and the full title stays ≤ 60 characters. description: 120–160 characters.
   */
  seo: { title: string; description: string };
}

// ─── Plan facts, read from plans.ts ──────────────────────────────────────────

const planName = (tier: PlanTier): string => PLANS.find((p) => p.tier === tier)?.name ?? tier;
const monthly = (tier: PlanTier): string => formatPrice(PLANS.find((p) => p.tier === tier)?.monthlyCents ?? 0);
const cap = (label: string, tier: PlanTier): string => PLAN_CAPS.find((c) => c.label === label)?.values[tier] ?? "";
/** "Up to 5" → "up to 5", "Unlimited" → "unlimited"; numbers pass through. */
const lower = (value: string): string => value.charAt(0).toLowerCase() + value.slice(1);
/** Card price: the word before, the dot and the price never split across lines. */
const priced = (text: string, tier: PlanTier): string => `${text}\u00A0·\u00A0${monthly(tier)}/mo`;

// ─── Pages ───────────────────────────────────────────────────────────────────

const CONTENT: Record<SegmentSlug, Omit<Segment, "slug" | "href">> = {
  "solo-artists": {
    name: "Solo artists",
    card: priced("Just you and one chair", "solo"),
    plan: "solo",
    eyebrow: "For solo artists",
    h1: "Clients book, pay and sign while you tattoo.",
    italicWord: "tattoo",
    sub: `Your booking page takes the deposit, the consent form goes to the client’s phone, and the session lands on your calendar. ${planName("solo")} is ${monthly("solo")} a month, with no fee on bookings or deposits.`,
    heroScreen: "BookingFlowPhone",
    heroNote: "Public booking page on the Time step, with the deposit that holds the slot.",
    week: {
      title: "A week with one chair",
      italicWord: "one",
      lead: "The work between sessions, taken care of by your booking page, your consent forms and the deposit pool.",
    },
    jobs: [
      {
        title: "Booked from one link",
        body: "Put your booking link in your bio. Clients pick a time, fill in the intake and pay the deposit. The booking shows Pending until it’s paid, then Confirmed.",
        feature: "appointments",
      },
      {
        title: "Consent signed before they arrive",
        body: "The consent form goes to the client’s phone with the booking. A red ink allergy noted last time flags the booking and your briefing before the session.",
        feature: "forms",
      },
      {
        title: "A sleeve tracked as one project",
        body: "Take one deposit for the whole piece and apply it session by session. The client sees what’s applied and what’s still held.",
        feature: "projects",
      },
    ],
    planPitch: {
      title: `${planName("solo")}, ${monthly("solo")} a month`,
      body: `Everything a one-artist studio uses, with ${cap("Bookings a month", "solo")} bookings and ${cap("Texts a month", "solo")} texts a month. No fee on bookings or deposits, and our team moves your clients over.`,
    },
    outgrow: `When a second artist joins, ${planName("studio")} adds ${lower(cap("Artists", "studio"))} artists, clash checks and commission splits for ${monthly("studio")} a month.`,
    subSegmentsHeading: "For artists who work alone",
    subSegments: ["Fine-line specialists", "Private one-chair studios", "Artists going independent"],
    compare: ["square", "glossgenius"],
    faqs: [
      {
        q: `Is ${planName("solo")} a cut-down version?`,
        a: `No. It has everything a one-artist studio uses: booking page, deposits, consent forms, projects, inventory with EU REACH, reports and marketing. What it leaves out is mostly for teams. ${planName("studio")} adds commission and booth-rent splits, advanced marketing segments and AI reply suggestions. ${planName("pro")} adds payroll, guest seats, roles, AI drafts, aftercare and consult summaries and removing Limespun branding.`,
      },
      {
        q: `How many bookings does ${planName("solo")} include?`,
        a: `${cap("Bookings a month", "solo")} bookings and ${cap("Texts a month", "solo")} texts a month, for one artist at one location. If you outgrow it, ${planName("studio")} has ${lower(cap("Bookings a month", "studio"))} bookings.`,
      },
      {
        q: "Is there a free trial?",
        a: `No. There’s a ${MONEY_BACK_DAYS}-day money-back guarantee instead, and ${ONBOARDING_SUPPORT_DAYS} days of onboarding help. Our team moves your clients and bookings over on every plan.`,
      },
    ],
    seo: {
      title: "Tattoo booking software for solo artists",
      description: `For solo tattoo artists: your own booking page, deposits, consent forms and multi-session projects for ${monthly("solo")} a month. No fee on bookings or deposits.`,
    },
  },

  "small-studios": {
    name: "Small studios",
    card: priced(`${cap("Artists", "studio")} artists`, "studio"),
    plan: "studio",
    eyebrow: "For small studios",
    h1: "Share the shop, not a spreadsheet.",
    italicWord: "shop",
    sub: `${planName("studio")} puts ${lower(cap("Artists", "studio"))} artists on one calendar with clash checks, and works out each artist’s commission or booth rent per session. ${monthly("studio")} a month, with ${lower(cap("Bookings a month", "studio"))} bookings.`,
    heroScreen: "CalendarScreen",
    heroNote: "Week view with every artist’s column and a move refused because the chair is taken.",
    week: {
      title: "A week with the whole team",
      italicWord: "whole",
      lead: "Bookings, splits and client threads shared by the whole team, without a group chat or a spreadsheet.",
    },
    jobs: [
      {
        title: "No double-booked chair",
        body: "Every artist has a column. Move a session and Limespun checks the chair first. If it’s taken, the move is refused and the booking stays put.",
        feature: "calendar",
      },
      {
        title: "Commission and booth rent, per session",
        body: "Set each artist’s commission rate or flat fee once. What’s owed builds up as sessions finish and waits on Today for approval.",
        feature: "payments",
      },
      {
        title: "One inbox for the whole shop",
        body: "Client texts and email land in one shared inbox. Assign a thread to an artist or the front desk, and leave notes the client never sees.",
        feature: "messages",
      },
    ],
    planPitch: {
      title: `${planName("studio")}, ${monthly("studio")} a month`,
      body: `${cap("Artists", "studio")} artists, ${lower(cap("Bookings a month", "studio"))} bookings and ${cap("Texts a month", "studio")} texts a month, with every artist on one calendar and commission or booth rent worked out per session.`,
    },
    outgrow: `When guest artists start visiting, ${planName("pro")} adds unlimited guest-artist seats, payroll and roles for ${monthly("pro")} a month.`,
    subSegmentsHeading: "For shops of two to five artists",
    subSegments: ["Walk-in heavy shops", "Custom-only private studios", "Shops mixing commission and booth rent"],
    compare: ["vagaro", "fresha"],
    faqs: [
      {
        q: `What does ${planName("studio")} add to ${planName("solo")}?`,
        a: `${cap("Artists", "studio")} artists on one calendar with clash checks, commission and booth-rent splits, ${lower(cap("Bookings a month", "studio"))} bookings, ${cap("Texts a month", "studio")} texts a month and AI reply suggestions in Messages.`,
      },
      {
        q: "Can each artist have a different split?",
        a: "Yes. Each artist gets their own commission rate or flat fee, and you can set it per service.",
      },
      {
        q: `Do guest artists need ${planName("pro")}?`,
        a: `Yes. Guest-artist seats, each with their own dates, split and booking page visibility, come with ${planName("pro")}. On ${planName("studio")}, everyone on the team is a resident.`,
      },
    ],
    seo: {
      title: "Tattoo studio software for 2–5 artists",
      description: `${planName("studio")} plan for tattoo studios with 2–5 artists: one calendar with clash checks, commission and booth-rent splits, unlimited bookings. ${monthly("studio")} a month.`,
    },
  },

  "multi-chair": {
    name: "Busy shops",
    card: priced(`${cap("Artists", "pro")} artists, plus guests`, "pro"),
    plan: "pro",
    eyebrow: "For busy shops",
    h1: "Fifteen chairs, guest spots and payday, handled.",
    italicWord: "payday",
    sub: `${planName("pro")} runs ${lower(cap("Artists", "pro"))} artists with unlimited guest-artist seats, roles and permissions for the front desk, and payroll with 1099s. ${monthly("pro")} a month, with ${cap("Locations", "pro")} locations included.`,
    heroScreen: "TeamScreen",
    heroNote: "Roster with residents, the front desk and a guest artist whose spot has an end date.",
    week: {
      title: "A week on a full floor",
      italicWord: "full",
      lead: "Residents, guests and the front desk working from the same book, each seeing what their role allows.",
    },
    jobs: [
      {
        title: "Guest spots with an end date",
        body: "Add a guest with dates, a split and booking page visibility. Their split and their access end with the spot.",
        feature: "team",
      },
      {
        title: "Payday from one payroll run",
        body: "A payroll run totals commission, tips and what the studio keeps for each artist, with artist summaries and 1099s alongside.",
        feature: "payments",
      },
      {
        title: "Replies drafted, consults summarized",
        body: "AI drafts replies, aftercare notes and consult summaries for an artist to check. Nothing goes out until a person presses send.",
        feature: "messages",
      },
    ],
    planPitch: {
      title: `${planName("pro")}, ${monthly("pro")} a month`,
      body: `${cap("Artists", "pro")} artists and ${cap("Locations", "pro")} locations, unlimited guest-artist seats, payroll and 1099s, AI drafts, and roles and permissions. ${cap("Texts a month", "pro")} texts a month.`,
    },
    outgrow: `Past ${cap("Artists", "pro").replace("Up to ", "")} artists or ${cap("Locations", "pro")} locations, ${planName("enterprise")} is ${monthly("enterprise")} a month flat, with no cap on either.`,
    subSegmentsHeading: "For shops with a busy floor",
    subSegments: ["Street shops with a front desk", "Studios hosting traveling guest artists", "Shops with a rotating guest chair"],
    compare: ["tattoogenda", "daysmart"],
    faqs: [
      {
        q: `What does ${planName("pro")} add to ${planName("studio")}?`,
        a: `${cap("Artists", "pro")} artists and ${cap("Locations", "pro")} locations, unlimited guest-artist seats, payroll and 1099s, AI replies, aftercare and consult summaries, roles and permissions, your branding in place of ours and priority support.`,
      },
      {
        q: "What can the front desk see?",
        a: "What you allow. The Front desk role takes bookings, checks clients in, sends forms and marks deposits paid at the counter. Commission rates, payroll and billing stay with owners and admins.",
      },
      {
        q: "Can guest artists take bookings online?",
        a: "Yes, if you choose. Each guest can be visible on your booking page or bookable by staff only, and you decide whether they can see client history or message clients.",
      },
    ],
    seo: {
      title: "Tattoo shop software for guests and payroll",
      description: `${planName("pro")} plan for busy tattoo shops: up to ${cap("Artists", "pro").replace("Up to ", "")} artists, unlimited guest-artist seats, roles and permissions, payroll and 1099s. ${monthly("pro")} a month, flat.`,
    },
  },

  "multi-location": {
    name: "Multiple locations",
    card: priced("Every shop in one account", "enterprise"),
    plan: "enterprise",
    eyebrow: "For multiple locations",
    h1: "Every shop in one account, one flat price.",
    italicWord: "flat",
    sub: `${planName("enterprise")} is ${monthly("enterprise")} a month flat, with unlimited artists and locations, reports across every shop and a dedicated account manager.`,
    heroScreen: "LocationsScreen",
    heroNote: "Locations with each shop’s artists, bookings and revenue for the month, and totals across all sites.",
    week: {
      title: "A week across every shop",
      italicWord: "every",
      lead: "Each location runs its own day. You see all of them from one account.",
    },
    jobs: [
      {
        title: "Reports for one shop or all of them",
        body: "Filter revenue, bookings and the artist leaderboard by location, or read every shop together. Locations totals artists, bookings and revenue for the month across all sites.",
        feature: "analytics",
      },
      {
        title: "Artists and services per shop",
        body: "Give each location its own hours and timezone, assign artists to it, and override a service where one shop does things differently.",
        feature: "team",
      },
      {
        title: "Your brand on every page",
        body: "Remove Limespun branding and run the booking pages and client portal under your own name.",
        feature: "appointments",
      },
    ],
    planPitch: {
      title: `${planName("enterprise")}, ${monthly("enterprise")} a month flat`,
      body: `${cap("Artists", "enterprise")} artists and locations, ${cap("Texts a month", "enterprise")} texts a month and a dedicated account manager. One price, however many shops you run.`,
    },
    subSegmentsHeading: "For studio groups",
    subSegments: ["Owners opening a second shop", "Studio groups across several cities", "Flagship shops with a satellite studio"],
    compare: ["vagaro", "mangomint"],
    faqs: [
      {
        q: `Is ${planName("enterprise")} priced per location?`,
        a: `No. It’s one flat price, ${monthly("enterprise")} a month, for unlimited artists and locations. Annual billing takes ${ANNUAL_DISCOUNT_PERCENT}% off.`,
      },
      {
        q: `Do I need ${planName("enterprise")} for two shops?`,
        a: `Not always. ${planName("pro")} covers ${cap("Locations", "pro")} locations and ${lower(cap("Artists", "pro"))} artists. ${planName("enterprise")} is for groups past that, or that want a dedicated account manager.`,
      },
      {
        q: "Can you move several shops over at once?",
        a: "Yes. Migration is included on every plan, and our team moves each shop’s clients, bookings, deposits and signed forms. You keep your old tool running until everything has been checked.",
      },
    ],
    seo: {
      title: "Tattoo software for multi-location studios",
      description: `Run every tattoo shop from one account for ${monthly("enterprise")} a month flat: unlimited artists and locations, reports across shops and a dedicated account manager.`,
    },
  },
};

export const segmentHref = (slug: SegmentSlug): string => `/for/${slug}`;

export const SEGMENTS: Segment[] = SEGMENT_SLUGS.map((slug) => ({ slug, href: segmentHref(slug), ...CONTENT[slug] }));

export function isSegmentSlug(value: string): value is SegmentSlug {
  return (SEGMENT_SLUGS as readonly string[]).includes(value);
}

export function getSegment(slug: SegmentSlug): Segment;
export function getSegment(slug: string): Segment | undefined;
export function getSegment(slug: string): Segment | undefined {
  return isSegmentSlug(slug) ? { slug, href: segmentHref(slug), ...CONTENT[slug] } : undefined;
}
