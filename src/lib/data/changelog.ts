import { ANNUAL_DISCOUNT_PERCENT, PLAN_CAPS, PLANS, formatPrice, type PlanTier } from "./plans";

export type ChangelogKind = "feature" | "improvement" | "fix";

/** A screen from the mockup library that shows what the entry changed (the page maps it). */
export type ChangelogScreen = "messages" | "inventory" | "calendar" | "kiosk" | "project";

export interface ChangelogEntry {
  /** Anchor on /changelog, stable once published. */
  id: string;
  /** ISO date the change landed in the app. */
  date: string;
  kind: ChangelogKind;
  title: string;
  /** One line under the title: what a studio can now do. */
  summary: string;
  highlights: string[];
  /** The page that covers this part of the app, labelled as the nav names it. */
  feature?: { label: string; href: string };
  screen?: ChangelogScreen;
  /** Where each claim was checked: InkOS commits (never printed). */
  evidence: string[];
}

export const CHANGELOG_KIND_LABEL: Record<ChangelogKind, string> = {
  feature: "Feature",
  improvement: "Improvement",
  fix: "Fix",
};

/** Plural labels for the type filter. */
export const CHANGELOG_KIND_PLURAL: Record<ChangelogKind, string> = {
  feature: "Features",
  improvement: "Improvements",
  fix: "Fixes",
};

const cap = (label: string, tier: PlanTier) => PLAN_CAPS.find((c) => c.label === label)?.values[tier] ?? "";

function planLine(tier: PlanTier): string {
  const plan = PLANS.find((p) => p.tier === tier);
  if (!plan) return "";
  const artists = cap("Artists", tier);
  const locations = cap("Locations", tier);
  const who =
    artists === "1"
      ? "one artist"
      : artists === "Unlimited"
        ? "unlimited artists and locations"
        : `${artists.toLowerCase()} artists${locations !== "1" ? ` and ${locations} locations` : ""}`;
  return `${plan.name}, ${formatPrice(plan.monthlyCents)} a month: ${who}`;
}

const fromPrice = formatPrice(Math.min(...PLANS.map((p) => p.monthlyCents)));

/**
 * What changed in the app, newest first, in studio language.
 *
 * Every entry was checked against the InkOS repo: the date is the day the change was committed
 * there, the highlights describe what the app does today, and `evidence` lists the commits.
 * Out of bounds (the app doesn't do them): drafted AI briefs, an API or webhooks, an enforced
 * cancellation window, Instagram or WhatsApp messages (SMS and email only), live calendar sync.
 */
export const changelogEntries: ChangelogEntry[] = [
  {
    id: "messages-photos-quiet-hours",
    date: "2026-09-20",
    kind: "feature",
    title: "Messages: photos, quiet hours and STOP replies",
    summary: "Send photos in a thread, hold late-night texts until morning and respect a client who opts out.",
    highlights: [
      "Attach photos to a message, like a stencil or an aftercare sheet",
      "A text that would land late at night waits until morning, by your studio’s clock",
      "A client who replies STOP gets no more texts; START turns them back on, and HELP gets an answer",
      "An email from a new client opens its own thread",
      "Instagram and WhatsApp come next; they’re on the roadmap",
    ],
    feature: { label: "Messages", href: "/product/messages" },
    screen: "messages",
    evidence: ["a5956d3a messaging: send, route and comply"],
  },
  {
    id: "fixes-september",
    date: "2026-09-19",
    kind: "fix",
    title: "Fixes: message search, calendar hours and scheduled campaigns",
    summary: "Search reads what clients wrote, and the calendar shows every booking whatever the hour.",
    highlights: [
      "Messages search looks through what was written, not only names and handles",
      "The day grid stretches to fit early and late bookings instead of cutting them off",
      "Guest artists and artists on leave keep their column while they have bookings",
      "Campaigns scheduled for later go out at the time you picked",
      "A refund can’t be sent twice for the same payment",
    ],
    evidence: [
      "420c1054 messages search covers message text",
      "cb643707 calendar grid hours + guest/on-leave chairs",
      "50aac445 marketing schedule for later",
      "217d0360 refund idempotency",
    ],
  },
  {
    id: "account-email-ownership",
    date: "2026-09-15",
    kind: "improvement",
    title: "Account: change your email, hand the studio over",
    summary: "Change the email you sign in with, transfer ownership or leave a studio from Settings.",
    highlights: [
      "Change your sign-in email; nothing changes until you confirm it from your inbox",
      "Owners can transfer the studio to another member of the team, confirmed with their password",
      "Artists can leave a studio; the client history stays with the studio",
    ],
    evidence: ["e31f16f0 account lifecycle", "settings/_proto/panels-personal.tsx (Change email, Transfer ownership, Leave this studio)"],
  },
  {
    id: "inventory-reorder",
    date: "2026-08-18",
    kind: "improvement",
    title: "Inventory: low stock straight into a purchase order",
    summary: "Add items and suppliers, correct a count, and turn what’s running low into a purchase order.",
    highlights: [
      "Add items and suppliers from the Inventory screen",
      "Adjust a count and the change is logged under Movements",
      "Reorder one item, or select several, into a draft purchase order for the supplier",
    ],
    feature: { label: "Inventory", href: "/product/inventory" },
    screen: "inventory",
    evidence: ["3e629235 add item", "9e03528a adjust stock", "f3b0b574 reorder → draft PO", "4791e803 add supplier"],
  },
  {
    id: "public-page-artists-flash",
    date: "2026-08-17",
    kind: "feature",
    title: "Your public page: artist profiles and a page for every flash piece",
    summary: "The studio’s public page has a new layout, with a profile for each artist and each flash design.",
    highlights: [
      "Set the cover image and intro in Settings",
      "Each artist gets a profile with their photo and their work",
      "Every flash piece has a page of its own",
      "Your socials and contact details sit at the foot of the page",
      "Flash and Portfolio are now separate screens in the app",
    ],
    feature: { label: "Portfolio & flash", href: "/product/portfolio" },
    evidence: [
      "ca2af462 /p redesign",
      "02c9ecce artist-profile hero",
      "1192e0cc flash detail page",
      "0bde72ed socials + contact footer",
      "9341fc5f cover + intro editor",
      "77bec71b /flash and /portfolio split",
    ],
  },
  {
    id: "waitlist-queue",
    date: "2026-08-14",
    kind: "feature",
    title: "Waitlist: a queue, with a countdown on every offer",
    summary: "Clients wait in the order they joined, and an offered slot counts down until it expires.",
    highlights: [
      "The longest wait sits at the top, tagged Next up",
      "A Waiting column shows how many days each client has waited",
      "Offered rows count down until the offer expires",
      "Offer the slot, message the client or remove them from the row",
    ],
    feature: { label: "Marketing", href: "/product/marketing" },
    evidence: ["e96f2bfc waitlist queue order, waiting time, offer countdown"],
  },
  {
    id: "fixes-august",
    date: "2026-08-13",
    kind: "fix",
    title: "Fixes: flash walk-ins, sign‑in codes and client totals",
    summary: "Walk-ins at a flash event book cleanly, and a sign-in code keeps every digit.",
    highlights: [
      "A walk-in at a flash event books without an error, with or without a design picked",
      "Sign-in code boxes keep every digit, however fast it’s typed or pasted",
      "Portfolio says when it can’t load instead of looking empty",
      "A client’s lifetime value matches the transactions beside it",
    ],
    evidence: [
      "01ad688a flash walk-in with a design",
      "b9fb6c1d OTP boxes take fast input",
      "45f00598 portfolio load failures",
      "5575a6ed client lifetime value",
    ],
  },
  {
    id: "two-step-sign-in",
    date: "2026-08-11",
    kind: "feature",
    title: "Two-step sign-in, with recovery codes",
    summary: "Protect your account with an authenticator app, and see every device you’re signed in on.",
    highlights: [
      "Turn two-step sign-in on or off in your security settings; it’s never forced",
      "Scan a QR code with your authenticator app to set it up",
      "Single-use recovery codes, in case you lose your phone",
      "Every device you’re signed in on, with sign-out for one or all of them",
    ],
    feature: { label: "Security", href: "/legal/security" },
    evidence: ["fa62451a recovery codes + sessions list", "f6d15957 on/off toggle, never forced"],
  },
  {
    id: "clients-columns-intake",
    date: "2026-07-30",
    kind: "improvement",
    title: "Clients: your columns, and a welcome as you add someone",
    summary: "Choose what the client list shows, and email a new client your booking link as you add them.",
    highlights: [
      "Pick and reorder the columns on the client list",
      "Add & send intake form adds the client and emails them a welcome with your booking link",
      "Add, replace or remove a client’s photo",
    ],
    feature: { label: "Clients", href: "/product/clients" },
    evidence: ["80676887 column manager", "ed4c8649 welcome/intake email", "c8f2f7f5 client avatar"],
  },
  {
    id: "four-plans",
    date: "2026-07-22",
    kind: "feature",
    title: "Four plans, from Solo to Multi-Location",
    summary: `Flat monthly prices from ${fromPrice}, and ${ANNUAL_DISCOUNT_PERCENT}% off when you pay yearly.`,
    highlights: [
      ...PLANS.map((p) => planLine(p.tier)),
      "Compare the plans in Settings, monthly or yearly",
    ],
    feature: { label: "Pricing", href: "/pricing" },
    evidence: ["a9cf8d91 4-tier pricing + in-app compare-plans UI", "src/lib/data/plans.ts"],
  },
  {
    id: "forms-nudge-pdf-qr",
    date: "2026-07-14",
    kind: "improvement",
    title: "Forms: nudge, signed PDFs and QR codes",
    summary: "Remind a client who hasn’t signed, open the signed PDF, and print a QR code for the desk.",
    highlights: [
      "Nudge a client who hasn’t signed and the form goes out again",
      "Open the signed PDF from Submissions",
      "Download a QR code for your booking page, a form or a service, ready to print",
    ],
    feature: { label: "Consent forms", href: "/product/forms" },
    evidence: ["22005f7b submission nudge + PDF", "392c42b1 QR-code PNG downloads"],
  },
  {
    id: "calendar-week-month-agenda",
    date: "2026-07-13",
    kind: "feature",
    title: "Calendar: Week, Month and Agenda",
    summary: "Three more views of the same bookings, and a column for every artist on Day.",
    highlights: [
      "Week, Month and Agenda views beside Day",
      "Day gives every artist a column of their own",
      "Week puts every artist’s bookings side by side",
    ],
    feature: { label: "Calendar", href: "/product/calendar" },
    screen: "calendar",
    evidence: ["4ba1a9d1 Week/Month/Agenda views", "81f14530 day view with artist chairs"],
  },
  {
    id: "needs-attention",
    date: "2026-04-24",
    kind: "feature",
    title: "Needs attention: one list for what’s slipping",
    summary: "Unpaid deposits, unsigned forms and low stock gather in one queue, most urgent first.",
    highlights: [
      "Unpaid deposits, unsigned forms and low stock in one list",
      "Grouped by how urgent each one is",
      "Resolve, Snooze or Mark read, one item or several at once",
      "Keyboard shortcuts to work down the list",
    ],
    feature: { label: "All features", href: "/product" },
    evidence: ["2072de76 Inbox v2: item kinds, urgency groups, batch actions, shortcuts"],
  },
  {
    id: "forms-kiosk-auto-send",
    date: "2026-04-22",
    kind: "feature",
    title: "Forms: kiosk mode, and forms that go out with the booking",
    summary: "Walk-ins sign on the studio tablet, and the forms you choose go out with every new booking.",
    highlights: [
      "Kiosk mode, so walk-ins sign on the studio tablet",
      "Mark a template Auto-sent and it goes out with every new booking",
      "Aftercare acknowledgement and photo & social release templates",
      "A REACH ink disclosure for your consent form",
      "Signed copies can’t be edited and are stored as PDFs",
    ],
    feature: { label: "Consent forms", href: "/product/forms" },
    screen: "kiosk",
    evidence: [
      "a703622f kiosk mode",
      "48563e20 auto-send rules (today: per-template Auto-sent, forms/_proto/TemplatesTab.tsx)",
      "913ed6a0 photo, aftercare and REACH templates",
    ],
  },
  {
    id: "projects",
    date: "2026-04-20",
    kind: "feature",
    title: "Projects: a sleeve is one project",
    summary: "A multi-session piece is one project with one deposit pool, not a string of bookings.",
    highlights: [
      "Every session, photo and note of a sleeve or back piece in one place",
      "One deposit pool across sessions: Paid in, Applied, Available and Refundable",
      "Reference, stencil, fresh and healed photos on the project",
      "Statuses from Planning through Healing to Complete",
    ],
    feature: { label: "Projects", href: "/product/projects" },
    screen: "project",
    evidence: ["44b127ba multi-session projects", "lib/projects/photo-slots.ts (refs, stencil, fresh, healed)"],
  },
];

/** "2026-09-20" → "Sep 20, 2026" (UTC, so the server and the browser agree). */
export function formatChangelogDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
