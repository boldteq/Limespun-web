export type RoadmapStage = "now" | "next" | "later";

export interface RoadmapItem {
  title: string;
  description: string;
  /** What a studio does about it today, where that helps. */
  today?: string;
  /** The part of the app it belongs to, as the nav names it. */
  area: string;
  stage: RoadmapStage;
  /** Why it's on this list and in this column (never printed). */
  basis: string;
}

/**
 * The three columns. The page never prints a date or a quarter: dates slip, and a missed date
 * reads as a broken promise. Shipped work lives in the changelog, not here.
 */
export const ROADMAP_STAGES: { id: RoadmapStage; label: string; line: string }[] = [
  { id: "now", label: "Now", line: "Being built" },
  { id: "next", label: "Next", line: "Queued up after Now" },
  { id: "later", label: "Later", line: "We’re weighing these up" },
];

/**
 * Reconciled with what the app does (InkOS) and what pricing sells (src/lib/data/plans.ts):
 * nothing here is on a plan today. Instagram and WhatsApp messages, an API, enforced booking
 * rules and live calendar sync are not built; the "today" lines say what studios use instead.
 */
export const roadmapItems: RoadmapItem[] = [
  // Now
  {
    stage: "now",
    area: "Design moodboards",
    title: "Drafted design briefs",
    description:
      "A first draft of the brief from the client’s description and references: placement, size and style, for the artist to edit before anyone sees it. The AI never draws the tattoo.",
    today: "Moodboards with the artist’s own placement, size and style notes.",
    basis: "Founder decision: drafted briefs are 'coming'; the AI screen today holds the artist's own brief (ai-design/_proto).",
  },
  {
    stage: "now",
    area: "Calendar",
    title: "One booking sheet everywhere",
    description:
      "The same new-booking sheet from Calendar, Appointments and a client’s record. Pick the service, and the artist, length, price and deposit fill in from it.",
    basis: "InkOS Appointments 360 program (Sep 2026): _proto-kit/booking-sheet (service → artist → rates, deposit from the service).",
  },

  // Next
  {
    stage: "next",
    area: "Messages",
    title: "Instagram and WhatsApp in Messages",
    description: "Instagram DMs and WhatsApp chats in the same inbox as texts and email, threaded on the client’s record.",
    today: "SMS and email, one thread per client.",
    basis: "Channel adapters exist in InkOS; the studio connect flow is pending (integrations registry connectFlow: 'pending').",
  },
  {
    stage: "next",
    area: "Calendar",
    title: "Live calendar sync",
    description: "Two-way sync with Google, Apple and Outlook calendars, so a new booking lands on the artist’s phone on its own.",
    today: "Download an .ics file from Calendar. It’s a snapshot, so download it again after changes.",
    basis: "Settings → Integrations lists Google Calendar, Apple Calendar and Outlook as 'Soon'; only the .ics export exists.",
  },
  {
    stage: "next",
    area: "Deposits",
    title: "Booking rules that check themselves",
    description:
      "Your cancellation window, minimum notice and buffers between sessions, checked when a client books or cancels.",
    today: "The cancellation window is saved in Booking policies, and you decide whether a deposit is kept or refunded.",
    basis: "FACTS: the window is saved but not checked; min-notice and buffer enforcement are not built.",
  },

  // Later
  {
    stage: "later",
    area: "Payments",
    title: "Accounting exports",
    description: "Send revenue, commissions and tax to QuickBooks or Xero instead of typing them in again.",
    basis: "Settings → Integrations tiles (QuickBooks, Xero) marked 'Soon'.",
  },
  {
    stage: "later",
    area: "Payments",
    title: "Tap to pay at the front desk",
    description: "Take a card on a reader at the counter, recorded against the booking like any other payment.",
    basis: "Settings → Integrations tile (card reader) marked 'Soon'.",
  },
  {
    stage: "later",
    area: "Portfolio & flash",
    title: "Post flash to Instagram",
    description: "Share a flash piece to your Instagram feed straight from Limespun.",
    basis: "Settings → Integrations Instagram tile: 'auto-post flash pieces to your feed', marked 'Soon'.",
  },
  {
    stage: "later",
    area: "Integrations",
    title: "API and webhooks",
    description: "An API and webhooks, so a studio can connect its own tools and automations to Limespun.",
    today: "CSV exports from Reports and Inventory.",
    basis:
      "Not built, and removed from pricing (founder decision), so it is not a queued commitment: Later ('weighing these up'), not Next. Move to Next only on Yash's explicit call. The Zapier/Make card that depended on it was dropped.",
  },
];
