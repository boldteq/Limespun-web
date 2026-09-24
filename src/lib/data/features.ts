import { PLANS, PLAN_CAPS, formatPrice, type PlanTier } from "./plans";
import type { SegmentSlug } from "./segments";
import type { TOOLS_INDEX } from "@/lib/site-links";

/**
 * Copy for the 13 feature pages (/product/<slug>), the /product overview and every
 * RelatedGrid that points at a feature.
 *
 * Every claim here is checked against the app (InkOS repo) or src/lib/data/plans.ts:
 *   - plan gating:   InkOS lib/billing/feature-gate.ts (FEATURE_MIN_PLAN)
 *   - labels:        InkOS app/(app)/<screen>/_proto/*, same words as the app
 *   - prices, caps:  read from PLANS / PLAN_CAPS below, never typed by hand
 * Things the app does not have stay out: no-show fee, points schemes, calendar
 * sync (the app exports a .ics snapshot only), AI that draws.
 *
 * Voice: outcome first in the studio’s nouns, h1 ≤ 8 words with one italic word,
 * bodies ≤ 45 words, no question headlines. Banned words: .design-audit/banned.json.
 */

export const FEATURE_SLUGS = [
  "calendar",
  "appointments",
  "messages",
  "clients",
  "forms",
  "projects",
  "portfolio",
  "ai-design",
  "payments",
  "team",
  "inventory",
  "analytics",
  "marketing",
] as const;

export type FeatureSlug = (typeof FEATURE_SLUGS)[number];

type ToolSlug = (typeof TOOLS_INDEX)[number]["slug"];

export interface FeatureMoment {
  title: string;
  body: string;
  /** Suggested mockup and props from src/components/mockups, e.g. "CalendarScreen view=day". */
  screen?: string;
}

export interface FeatureNote {
  title: string;
  body: string;
}

export interface FeatureFaq {
  q: string;
  a: string;
}

export interface Feature {
  slug: FeatureSlug;
  /** "/product/<slug>" */
  href: string;
  /** Page name, used in breadcrumbs and cards. */
  name: string;
  /** Name in the nav’s Product menu. */
  navLabel: string;
  /** One line for link cards (RelatedGrid, /product). */
  card: string;
  eyebrow: string;
  /** Outcome headline, ≤ 8 words. */
  h1: string;
  /** One word of h1, set in italic ember. */
  italicWord: string;
  sub: string;
  /** The lowest plan the page’s core feature is on; note names what sits higher. */
  plan: { min: PlanTier; note?: string };
  /** The three moments: how it works, in order. */
  moments: [FeatureMoment, FeatureMoment, FeatureMoment];
  /** Six smaller things, each a real tab, status or toggle in the app. */
  miniFeatures: [FeatureNote, FeatureNote, FeatureNote, FeatureNote, FeatureNote, FeatureNote];
  worksWith: [{ slug: FeatureSlug; line: string }, { slug: FeatureSlug; line: string }];
  related: [FeatureSlug, FeatureSlug, FeatureSlug, FeatureSlug];
  segments: [SegmentSlug, SegmentSlug];
  /** A free tool under /tools that fits the page, for the RelatedGrid. */
  tool?: ToolSlug;
  faqs: [FeatureFaq, FeatureFaq, FeatureFaq];
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

const SOLO = monthly("solo");
/** "75 on Solo, 500 on Studio, 2,000 on Pro, 5,000 on Multi-Location" */
const TEXTS_BY_PLAN = PLANS.map((p) => `${cap("Texts a month", p.tier)} on ${p.name}`).join(", ");

// ─── Pages ───────────────────────────────────────────────────────────────────

const CONTENT: Record<FeatureSlug, Omit<Feature, "slug" | "href">> = {
  calendar: {
    name: "Calendar",
    navLabel: "Calendar",
    card: "Every artist’s chair on one calendar.",
    eyebrow: "Calendar",
    h1: "Every chair on one calendar, no clashes.",
    italicWord: "clashes",
    sub: "Sessions, consults and touch-ups for every artist in Day, Week, Month or Agenda view. Move a booking and Limespun checks the chair before it lands.",
    plan: {
      min: "solo",
      note: `One artist on ${planName("solo")}. Every artist on one calendar, with clash checks, from ${planName("studio")}.`,
    },
    moments: [
      {
        title: "Drag a session to another chair",
        body: "Pick up a booking in Day or Week view and drop it on another artist or time. Limespun checks that chair first. If it’s taken, the move is refused and the booking stays put.",
        screen: "CalendarScreen view=day",
      },
      {
        title: "Pending until the deposit lands",
        body: "A booking that asks for a deposit shows Pending, then Confirmed once the client pays. Left unpaid past your deadline, it cancels itself and the slot opens again.",
        screen: "CalendarScreen view=week",
      },
      {
        title: "Time off closes the gap",
        body: "Approved time off, breaks and blocked time sit in the artist’s column, so the front desk sees the gap before offering that slot to a client.",
        screen: "CalendarScreen view=week",
      },
    ],
    miniFeatures: [
      { title: "Day, Week, Month, Agenda", body: "Four views of the same bookings. Week puts every artist side by side; Agenda lists the day in order for the front desk." },
      { title: "Book from an empty slot", body: "Click a free cell to start a booking with the artist and the time already filled in." },
      { title: "Red ink on the booking", body: "Allergy notes from the client record show on the booking itself, so a red ink reaction is visible before anyone sets up the station." },
      { title: "Clashes go to Needs attention", body: "If two bookings ever overlap, the clash lands in Needs attention with a Resolve link that opens that day on the calendar." },
      { title: "Now line", body: "A line tracks the current time across every artist’s column, so the desk can see who is mid-session and who is free." },
      { title: "Day sheet and .ics file", body: "Export the day as a CSV sheet, or download bookings as an .ics file for your phone’s calendar. The file is a snapshot; download it again after changes." },
    ],
    worksWith: [
      { slug: "appointments", line: "The deposit request goes out with the booking, and the calendar shows Pending until it’s paid." },
      { slug: "projects", line: "Every session of a project sits on the calendar with its number, like session 4 of 5." },
    ],
    related: ["appointments", "projects", "messages", "team"],
    segments: ["small-studios", "multi-chair"],
    faqs: [
      {
        q: "Can a chair get double-booked?",
        a: `No. A booking or a move that overlaps another booking for the same artist is refused, and the booking stays where it was. Every artist on one calendar with clash checks comes with ${planName("studio")} and up.`,
      },
      {
        q: "Can an artist see only their own bookings?",
        a: `Yes. Artists work in the Artist view of the app. On ${planName("pro")}, the roles and permissions matrix decides whether each role sees every booking or only its own.`,
      },
      {
        q: "Does it sync with my phone’s calendar?",
        a: "Not live yet. You can download your bookings as an .ics file that opens in Apple Calendar, Google Calendar or Outlook. It’s a snapshot, so download it again after changes.",
      },
    ],
    seo: {
      title: "Tattoo studio calendar for every artist",
      description: `Day, Week, Month and Agenda views, deposit status on each booking, time off and an .ics export from ${SOLO} a month. Every artist with clash checks on ${planName("studio")}.`,
    },
  },

  appointments: {
    name: "Deposits & booking",
    navLabel: "Deposits",
    card: "Deposits taken before the chair is held.",
    eyebrow: "Deposits & booking",
    h1: "Deposits taken before the chair is held.",
    italicWord: "chair",
    sub: "Clients book from your own page and pay the deposit to hold the slot. Unpaid deposits cancel on your deadline, and Limespun takes no fee from bookings or deposits.",
    plan: {
      min: "solo",
      note: "Deposits on every plan. No Limespun fee on bookings or deposits; card payments carry the provider’s standard fee.",
    },
    moments: [
      {
        title: "The client books on your page",
        body: "Your booking page takes the client through artist, time, their details and an intake. Each service carries its own deposit, so a consult and a full day can ask for different amounts.",
        screen: "BookingFlowPhone step=2",
      },
      {
        title: "Pending until the deposit is paid",
        body: "The booking waits as Pending. Reminders go out 12 hours and 4 hours before the deposit deadline. Still unpaid at the deadline, the booking cancels and the slot opens again.",
        screen: "AppointmentsScreen",
      },
      {
        title: "Reminders before the session",
        body: "Clients get a reminder 24 hours and 2 hours before they sit down. If they cancel, the deposit stays with the studio unless you choose to refund it.",
        screen: "TodayScreen",
      },
    ],
    miniFeatures: [
      { title: "Deposit per service", body: "Set the amount on the service. A consult, a half day and a flash piece can each ask for a different deposit." },
      { title: "Unpaid deposits auto-cancel", body: "A pending booking whose deposit isn’t paid by the deadline is cancelled automatically, but only once the client has actually been asked to pay." },
      { title: "Six statuses", body: "Pending, Confirmed, In progress, Completed, Cancelled and No-show, the same on the calendar, the Appointments list and Today." },
      { title: "Deposits pending on Today", body: "Today totals the deposits still owed and marks the ones at risk, so the desk can chase them before the day starts." },
      { title: "Your own booking domain", body: "Run the booking page on your studio’s own domain, with your logo, intro and accent color." },
      { title: "Deposit requests in Messages", body: "Ask for a deposit from inside a client’s thread. The client pays from the link, and the thread’s side panel shows it paid." },
    ],
    worksWith: [
      { slug: "projects", line: "On a multi-session piece, the deposit goes into the project’s deposit pool and is applied session by session." },
      { slug: "payments", line: "Every deposit shows in Payments as a transaction, with its receipt and a refund button." },
    ],
    related: ["calendar", "projects", "payments", "messages"],
    segments: ["solo-artists", "small-studios"],
    tool: "deposit-calculator",
    faqs: [
      {
        q: "Does Limespun take a cut of deposits?",
        a: "No. Limespun is a flat monthly plan and takes no fee from bookings or deposits. Card payments carry the payment provider’s standard processing fee.",
      },
      {
        q: "What happens when a client no-shows?",
        a: "Mark the booking No-show. There’s no automatic no-show fee; the deposit stays with the studio unless you refund it. Reports show each artist’s no-show rate.",
      },
      {
        q: "Who sets the deposit amount and the deadline?",
        a: "You set the amount on each service. An unpaid deposit cancels its booking after the studio’s payment deadline, 24 hours by default, and only for services that ask for a deposit.",
      },
    ],
    seo: {
      title: "Tattoo deposits and online booking",
      description: "Clients book from your page and pay a deposit to hold the chair. Unpaid deposits cancel on your deadline. No Limespun fee on bookings or deposits.",
    },
  },

  messages: {
    name: "Messages",
    navLabel: "Client messages",
    card: "Texts and email in one inbox.",
    eyebrow: "Messages",
    h1: "Every client thread in one inbox.",
    italicWord: "inbox",
    sub: "SMS and email land beside the client’s bookings, deposit and forms. Ask for a deposit or send a consent form without leaving the thread. Instagram and WhatsApp are coming next.",
    plan: {
      min: "solo",
      note: `AI reply suggestions from ${planName("studio")}. AI drafts, aftercare notes and consult summaries on ${planName("pro")}.`,
    },
    moments: [
      {
        title: "Text and email, one thread",
        body: "A client’s texts and emails sit in one conversation, with their next booking, deposit and forms in the side panel. Pick the channel per message; texts go from the studio’s own number.",
        screen: "MessagesScreen",
      },
      {
        title: "Deposit and consent from the thread",
        body: "Request a deposit or send a consent form from the composer. The client pays or signs from the link, and the side panel shows when it’s done.",
        screen: "MessagesScreen",
      },
      {
        title: "Suggested replies you approve",
        body: "Reply suggestions appear above the composer. Tap one, edit it, send it. Nothing sends by itself except the keyword auto-replies you write yourself.",
        screen: "MessagesScreen",
      },
    ],
    miniFeatures: [
      { title: "Quick responses", body: "Save the answers you type every day, like aftercare or deposit terms, and insert them with merge tags such as the client’s first name." },
      { title: "Send later", body: "Schedule a message for a date and time. It waits in Scheduled messages until then." },
      { title: "Internal notes", body: "Leave a note in the thread for the team. The client never sees it." },
      { title: "Assign and label", body: "Assign a conversation to an artist or the front desk, and label it so the right person picks it up." },
      { title: "All, Unread, Starred, Archived", body: "Filter the inbox down to what needs a reply, what you’ve starred and what’s done." },
      { title: "Keyword auto-replies", body: "Match a keyword like “price” to one of your quick responses. It sends on its own, at most once per conversation in the window you set." },
    ],
    worksWith: [
      { slug: "clients", line: "Every thread is tied to the client record, so past sessions and allergy notes are one click away." },
      { slug: "forms", line: "Send a consent form from the thread; the signed copy lands on the client’s record." },
    ],
    related: ["appointments", "clients", "forms", "calendar"],
    segments: ["small-studios", "multi-chair"],
    faqs: [
      {
        q: "Which channels does Messages cover?",
        a: "SMS and email today, from your studio’s own number and email address. Instagram and WhatsApp are coming next.",
      },
      {
        q: "Can the whole team work from one inbox?",
        a: "Yes. Messages is shared across the studio. Assign a conversation to an artist or the front desk, and leave internal notes the client never sees.",
      },
      {
        q: "Do AI replies send by themselves?",
        a: `No. Suggestions wait above the composer until someone picks one and presses send. AI reply suggestions come with ${planName("studio")}; AI drafts and consult summaries with ${planName("pro")}.`,
      },
    ],
    seo: {
      title: "Client messages: SMS and email in one inbox",
      description: `Client texts and email in one inbox beside bookings and deposits. Request a deposit or send a consent form from the thread. From ${SOLO} a month.`,
    },
  },

  clients: {
    name: "Client records",
    navLabel: "Client records",
    card: "History, photos and allergy alerts.",
    eyebrow: "Client records",
    h1: "Know the allergy before they sit down.",
    italicWord: "allergy",
    sub: "One record per client: sessions, photos, consent, messages and money. Allergy notes follow the client onto every booking and into the artist’s briefing before the session.",
    plan: { min: "solo" },
    moments: [
      {
        title: "Note it once",
        body: "Add an allergy to the record and it flags every booking for that client: on the calendar, on Today and in the artist’s briefing. A red ink reaction noted in August still shows in October.",
        screen: "ClientFileScreen tab=overview",
      },
      {
        title: "One record, seven tabs",
        body: "Overview, Sessions, Gallery, Notes, Comms, Consent and Financial. The deposit pool reads Paid in, Applied, Available and Refundable, so nobody adds it up by hand.",
        screen: "ClientFileScreen tab=financial",
      },
      {
        title: "A briefing before each session",
        body: "About 30 minutes before a session, the artist gets an email briefing: pinned notes, the deposit, the forms and the last sessions.",
        screen: "BriefingPhone",
      },
    ],
    miniFeatures: [
      { title: "Flags on the list", body: "Allergy, Deposit due and Consent flags show in the client list, so the desk can sort out the day before it starts." },
      { title: "Columns you choose", body: "Show or hide Last visit, Next appointment, Spent, Sessions, Source, Artist and Tags, then save the view." },
      { title: "Import from a CSV", body: "Bring your list over from a spreadsheet and check the preview before anything saves." },
      { title: "Client portal", body: "Clients sign in with a one-time code to see a project’s deposit pool: what’s been applied and what’s still available." },
      { title: "Marketing and photo consent", body: "Each client’s choices on marketing texts, marketing email and photo use sit on their record." },
      { title: "Tags", body: "Tag clients your way and filter the list by tag." },
    ],
    worksWith: [
      { slug: "forms", line: "Signed consent lands on the Consent tab with the session it covers." },
      { slug: "projects", line: "Every project and its sessions sit on the client’s record, with the deposit pool on Financial." },
    ],
    related: ["forms", "projects", "messages", "appointments"],
    segments: ["solo-artists", "small-studios"],
    faqs: [
      {
        q: "Does the allergy note show on the day?",
        a: "Yes. It flags every booking for that client, shows on Today and sits at the top of the artist’s briefing, which arrives by email about 30 minutes before the session.",
      },
      {
        q: "Can clients see their own record?",
        a: "Part of it. Through the client portal, a client signs in with a one-time code and sees a project’s deposit pool and next session. Notes and medical details stay with the studio.",
      },
      {
        q: "Can I import my client list?",
        a: "Yes. Upload a CSV and check the preview before it saves, or send us your export and our team moves it for you. Migration is included on every plan.",
      },
    ],
    seo: {
      title: "Tattoo client records with allergy alerts",
      description: `Every client’s sessions, photos, consent and payments in one record. Allergy notes flag each booking and the artist’s briefing. From ${SOLO} a month.`,
    },
  },

  forms: {
    name: "Consent forms",
    navLabel: "Consent forms",
    card: "Signed on a phone, stored as a PDF.",
    eyebrow: "Consent forms",
    h1: "Signed on their phone, before the chair.",
    italicWord: "before",
    sub: "Send the consent form with the booking or from Messages, or hand over the studio tablet. The signed copy can’t be edited and is stored as a PDF with the session.",
    plan: { min: "solo", note: "Consent forms and kiosk mode on every plan." },
    moments: [
      {
        title: "Sent before they arrive",
        body: "Send a form from the booking or a message thread, or share a public link or QR code. The client fills it in and signs on their own phone.",
        screen: "ConsentSignPhone",
      },
      {
        title: "Kiosk on the studio tablet",
        body: "Start kiosk on the front-desk tablet and walk-ins sign there. The kiosk includes the ink disclosure, read from your ink registry.",
        screen: "FormsScreen tab=kiosk",
      },
      {
        title: "Locked to the session",
        body: "Once signed, the form shows Signed on the booking and the client record. The copy can’t be edited. If something changes, void it and send a new one.",
        screen: "FormsScreen tab=submissions",
      },
    ],
    miniFeatures: [
      { title: "Six starter templates", body: "General tattoo consent, medical history, aftercare acknowledgement, touch-up waiver, minor / guardian consent, and photo & social release." },
      { title: "Form builder", body: "Edit a starter template or build your own from a blank form." },
      { title: "Submissions", body: "Every form with its status, Sent, Signed, Expired or Voided, and the booking it’s linked to." },
      { title: "Minor / guardian consent", body: "A separate template for clients under age, signed by their parent or guardian." },
      { title: "Unsigned in Needs attention", body: "Forms that haven’t been signed show in Needs attention until they are, so nobody finds out at the chair." },
      { title: "Void, owners and admins only", body: "Only owners and admins can void a signed form, and the voided copy stays on file." },
    ],
    worksWith: [
      { slug: "clients", line: "Signed forms file under the Consent tab of the client’s record." },
      { slug: "inventory", line: "The ink disclosure reads brand, color and batch from your ink registry." },
    ],
    related: ["clients", "inventory", "messages", "projects"],
    segments: ["solo-artists", "small-studios"],
    tool: "consent-form-template",
    faqs: [
      {
        q: "What happens to a signed form?",
        a: "It’s stored as a PDF on the client’s record and the session it covers. Signed copies can’t be edited. If details change, void it and send a fresh one.",
      },
      {
        q: "Is there a minor / guardian form?",
        a: "Yes. Minor / guardian consent is one of the six starter templates, signed by the parent or guardian. Check the rules where you work before tattooing anyone under age.",
      },
      {
        q: "Can clients sign before they arrive?",
        a: "Yes. Send the form with the booking or from Messages and they sign on their own phone. Anyone who hasn’t signed shows in Needs attention, and the kiosk covers walk-ins.",
      },
    ],
    seo: {
      title: "Digital tattoo consent forms",
      description: "Tattoo consent forms signed on the client’s phone or the studio tablet. Signed copies can’t be edited and are stored as PDFs. On every Limespun plan.",
    },
  },

  projects: {
    name: "Projects",
    navLabel: "Multi-session projects",
    card: "A sleeve or back piece, session by session.",
    eyebrow: "Projects",
    h1: "A sleeve is one project, not five bookings.",
    italicWord: "project",
    sub: "Keep every session, photo, note and payment of a large piece together. One deposit pool funds the sessions, and the client sees what’s applied and what’s still held.",
    plan: { min: "solo", note: `Multi-session projects on every plan, ${planName("solo")} included.` },
    moments: [
      {
        title: "One project, one deposit",
        body: "Create the project for the whole piece and take one deposit. The deposit pool shows it as Paid in, ready to apply across the sessions.",
        screen: "ProjectsScreen view=detail",
      },
      {
        title: "Applied session by session",
        body: "Book the next session and apply part of the pool. Applied goes up, Available comes down, and the client sees the same numbers in their portal.",
        screen: "ClientPortalPhone",
      },
      {
        title: "Healing, then complete",
        body: "After the last session the project moves to Healing. Add healed photos as they come in. It completes once they’re all in, or eight weeks after the final session.",
        screen: "ProjectsScreen view=board",
      },
    ],
    miniFeatures: [
      { title: "Seven statuses", body: "Planning, Deposit Paid, Active, Healing, Complete, On Hold and Cancelled, laid out as columns on the Board." },
      { title: "Gallery, Board, List", body: "Three views of the same projects: photos first, by status, or as a table." },
      { title: "In deposit pools", body: "The Projects screen totals what’s held across every open project, so you know how much work is already paid for." },
      { title: "Stalled projects flagged", body: "A project that sits active with no confirmed session gets flagged, so a half-finished piece doesn’t drift." },
      { title: "Healed photo reminders", body: "When a healed photo is overdue, a reminder lands in Needs attention." },
      { title: "Moodboard tab", body: "The client’s references and the design brief live on the project, next to its sessions." },
    ],
    worksWith: [
      { slug: "appointments", line: "The client pays the project deposit once; each session draws from it." },
      { slug: "clients", line: "The project sits on the client’s record, with its deposit pool on the Financial tab." },
    ],
    related: ["appointments", "calendar", "clients", "portfolio"],
    segments: ["solo-artists", "small-studios"],
    faqs: [
      {
        q: "Can one deposit cover several sessions?",
        a: "Yes. That’s what the deposit pool is for. It’s paid in once and applied session by session, and the client can see Applied and Available in their portal.",
      },
      {
        q: "Can I refund what’s left in the pool?",
        a: "Yes. The deposit pool shows what’s Refundable. You decide whether to refund it, and the refund goes back against the original card payment.",
      },
      {
        q: "Does a single-session piece need a project?",
        a: "No. A one-off tattoo can stay a plain booking with its own deposit. Projects are for pieces that take more than one sitting.",
      },
    ],
    seo: {
      title: "Multi-session tattoo projects",
      description: `Track a sleeve or back piece as one project, with every session, photo and payment, and one deposit pool applied session by session. From ${SOLO} a month.`,
    },
  },

  portfolio: {
    name: "Portfolio & flash",
    navLabel: "Portfolio & flash",
    card: "Show your work, sell your flash.",
    eyebrow: "Portfolio & flash",
    h1: "Show the work. Sell the flash.",
    italicWord: "Sell",
    sub: "Publish fresh and healed work to your public page, and list flash with a price and a deposit. Clients claim a piece from the page. You choose everything that goes up.",
    plan: { min: "solo", note: "Portfolio, flash and Flash events on every plan." },
    moments: [
      {
        title: "Add the work you choose",
        body: "Upload pieces, mark them Fresh or Healed, tag the style and feature the best on your public page. Nothing is published until you publish it.",
        screen: "PortfolioScreen library=portfolio",
      },
      {
        title: "Price a flash piece",
        body: "List a design with a price, a deposit and whether it’s one-off or repeatable. A client reserves it from your page and pays the deposit; it shows Reserved, then Sold.",
        screen: "PortfolioScreen library=flash",
      },
      {
        title: "Run a Flash event",
        body: "Set dates and slots for a flash day. Flash events tracks slots booked, fill rate and booked value as the day fills.",
        screen: "FlashEventsScreen",
      },
    ],
    miniFeatures: [
      { title: "Fresh or Healed", body: "Label every piece, so clients can tell a new tattoo from a settled one." },
      { title: "Featured on public page", body: "Choose the pieces clients see first on your page." },
      { title: "Styles", body: "Tag each piece with its style, from Blackwork and Japanese to Script and Dotwork, and filter your library by it." },
      { title: "Available, Reserved, Sold", body: "Every flash piece shows where it stands. Release a hold, mark it sold or relist it." },
      { title: "Upload a whole sheet", body: "Add a sheet of flash designs in one upload, then price each piece." },
      { title: "Preview public page", body: "See what clients will see before you share the link." },
    ],
    worksWith: [
      { slug: "projects", line: "When a project heals, add its healed photo to the portfolio yourself." },
      { slug: "appointments", line: "A reserved flash piece becomes a booking with its deposit, on the artist’s calendar." },
    ],
    related: ["projects", "appointments", "marketing", "clients"],
    segments: ["solo-artists", "small-studios"],
    faqs: [
      {
        q: "Does the portfolio fill itself from my projects?",
        a: "No, on purpose. You choose every piece that goes public. Healed photos from a project can be added to the portfolio when you’re happy with them.",
      },
      {
        q: "Can a flash piece take a deposit?",
        a: "Yes. Set a price and a deposit on the piece. The client reserves it from your public page and pays the deposit to hold it.",
      },
      {
        q: "What’s a Flash event?",
        a: "A flash day with its own dates and slots, like a Friday the 13th sale. You set the designs and slots; Limespun tracks slots booked, fill rate and booked value.",
      },
    ],
    seo: {
      title: "Tattoo portfolio and flash sales",
      description: `Publish fresh and healed work, sell flash with a price and a deposit, and run flash events with slots and a fill rate. On every plan from ${SOLO} a month.`,
    },
  },

  "ai-design": {
    name: "AI design briefs",
    navLabel: "AI design briefs",
    card: "Turn a client’s idea into a clear brief.",
    eyebrow: "AI design briefs",
    h1: "Turn a client’s idea into a clear brief.",
    italicWord: "brief",
    sub: "The client’s description and reference photos go onto a moodboard. Limespun drafts placement, size, style and a suggested palette for the artist to edit. It never draws the tattoo.",
    plan: { min: "solo", note: `AI design briefs on every plan, ${planName("solo")} included.` },
    moments: [
      {
        title: "Start from what they asked for",
        body: "Open a new design request for the client and add what they want, in their words, with the reference photos they sent.",
        screen: "AiMoodboardScreen",
      },
      {
        title: "References on the moodboard",
        body: "The client’s own references sit on the moodboard. Generate the moodboard analysis and Limespun reads them for style, placement and palette.",
        screen: "AiMoodboardScreen",
      },
      {
        title: "A brief the artist edits",
        body: "The draft lists Placement, Size, Style and a Suggested palette. The artist rewrites what’s wrong and saves it, and earlier directions stay on the request to compare.",
        screen: "AiMoodboardScreen",
      },
    ],
    miniFeatures: [
      { title: "Placement and size", body: "Choose where it goes, from forearm to full back, and how big it is." },
      { title: "Style", body: "Blackwork, Japanese, Neo Traditional, Geometric, Lettering and more, so the brief speaks the artist’s language." },
      { title: "Suggested palette", body: "Colors drawn from the current moodboard, as swatches the artist can keep or ignore." },
      { title: "Earlier directions", body: "Every earlier draft stays on the request, so you can go back to the one the client preferred." },
      { title: "Approve or reject", body: "Mark each draft approved or rejected, and rate it." },
      { title: "Client on file", body: "Link the request to a client, so the brief sits with their record." },
    ],
    worksWith: [
      { slug: "projects", line: "The Moodboard tab on a project keeps the references beside its sessions." },
      { slug: "clients", line: "Linked to the client, the brief is there when you open their record before the consult." },
    ],
    related: ["projects", "messages", "clients", "portfolio"],
    segments: ["solo-artists", "small-studios"],
    faqs: [
      {
        q: "Does the AI draw the tattoo?",
        a: "No. Limespun never generates tattoo art. It reads the client’s references and drafts a written brief. The design is the artist’s work, start to finish.",
      },
      {
        q: "Who sees the brief?",
        a: "Your studio. The moodboard and brief are working notes for the artist. Nothing is published or sent to the client unless you send it yourself.",
      },
      {
        q: "Is it on the Solo plan?",
        a: `Yes. AI design briefs are on every plan, ${planName("solo")} included. AI drafts for replies, aftercare and consult summaries are a separate ${planName("pro")} feature.`,
      },
    ],
    seo: {
      title: "AI tattoo design briefs, not AI art",
      description: "AI turns a client’s references into a written brief: placement, size, style and palette for the artist to edit. It never draws the tattoo. On every plan.",
    },
  },

  payments: {
    name: "Payments & payouts",
    navLabel: "Payments & payouts",
    card: "Card payments and artist splits.",
    eyebrow: "Payments & payouts",
    h1: "Card payments in, artist splits out.",
    italicWord: "splits",
    sub: `Take deposits and full payments by card, with a receipt and refund on every payment. From ${planName("studio")}, each artist’s commission or booth rent is worked out per session. On ${planName("pro")}, payroll and 1099s too.`,
    plan: {
      min: "solo",
      note: `Deposits and card payments on every plan. Commission and booth-rent splits from ${planName("studio")}; payroll and 1099s on ${planName("pro")}.`,
    },
    moments: [
      {
        title: "Deposit or full payment",
        body: "Take a deposit to hold the chair, or the full price at the end of the session. Every payment has its receipt, its history and a refund button.",
        screen: "PaymentsScreen tab=transactions",
      },
      {
        title: "Commissions owed, on Today",
        body: "Set each artist’s commission rate, or a flat fee per service. What’s owed builds up session by session and waits on Today for approval.",
        screen: "PaymentsScreen tab=commissions",
      },
      {
        title: "Payroll and 1099s",
        body: `On ${planName("pro")}, a payroll run totals commission, tips and what the studio keeps for each artist. Artist summaries and 1099 forms sit alongside every run.`,
        screen: "PaymentsScreen tab=payroll",
      },
    ],
    miniFeatures: [
      { title: "Transactions, Commissions, Payroll, Disputes", body: "Four tabs. Filter transactions to succeeded today, refunds, pending deposits or failed." },
      { title: "Tip pool", body: "Turn on a tip pool to share tips across the team. Tips are 100% the team’s." },
      { title: "Processing fees", body: "Choose whether the studio absorbs card processing fees." },
      { title: "Sales tax", body: "Add your tax registrations by country and state." },
      { title: "Disputes", body: "Open disputes show the amount at risk and the date to respond by. Evidence goes to the payment processor." },
      { title: "Artists see their own", body: "Artists see their own commissions, what they’re owed and what’s been paid to them, not the studio’s books." },
    ],
    worksWith: [
      { slug: "appointments", line: "Deposits taken at booking arrive here as transactions, ready to apply or refund." },
      { slug: "team", line: "Commission rates and guest splits are set per artist and applied to every session they finish." },
    ],
    related: ["appointments", "team", "analytics", "projects"],
    segments: ["small-studios", "multi-chair"],
    tool: "payout-calculator",
    faqs: [
      {
        q: "Does Limespun take a cut of payments?",
        a: "No. Plans are a flat monthly price with no Limespun fee on bookings, deposits or payments. Card payments carry the payment provider’s standard processing fee.",
      },
      {
        q: "How are artist splits worked out?",
        a: `From ${planName("studio")} up, each artist gets a commission rate or a flat fee, per service if you like, or pays booth rent. Guest artists get their own split on ${planName("pro")}.`,
      },
      {
        q: "Does it run payroll?",
        a: `On ${planName("pro")} and ${planName("enterprise")}. A payroll run totals commission, tips and what the studio keeps, with artist summaries and 1099s. On ${planName("studio")}, the Commissions tab shows what each artist is owed.`,
      },
    ],
    seo: {
      title: "Tattoo studio payments and artist payouts",
      description: `Card deposits and payments with no Limespun fee. Commission and booth-rent splits from ${planName("studio")}, payroll and 1099s on ${planName("pro")}. Built for tattoo studios.`,
    },
  },

  team: {
    name: "Team & guest artists",
    navLabel: "Team & guest artists",
    card: "Residents, front desk and guests on one roster.",
    eyebrow: "Team & guest artists",
    h1: "Residents, front desk, guests, one roster.",
    italicWord: "guests",
    sub: "Invite artists and front desk staff, give each a role, and run guest spots with their own dates, split and booking page visibility. Everyone works in the view built for their job.",
    plan: {
      min: "studio",
      note: `${cap("Artists", "studio")} artists on ${planName("studio")}. Guest-artist seats and roles & permissions on ${planName("pro")}, with ${lower(cap("Artists", "pro"))} artists.`,
    },
    moments: [
      {
        title: "Invite an artist",
        body: "Send an invite, pick the role and set how they’re paid. They show under Pending invites until they accept, then get their own column on the calendar.",
        screen: "TeamScreen view=roster",
      },
      {
        title: "A guest spot with an end date",
        body: "Add a guest with start and end dates, a split and whether clients can book them online. Their split and their access end with the spot.",
        screen: "GuestArtistsScreen",
      },
      {
        title: "The desk sees the desk",
        body: `Front desk takes bookings and marks deposits paid at the counter without seeing payroll. On ${planName("pro")}, the permissions matrix sets exactly what each role can do.`,
        screen: "TeamScreen view=permissions",
      },
    ],
    miniFeatures: [
      { title: "Five roles", body: "Owner, Admin, Artist, Front desk and Guest, each with its own view of the app." },
      { title: "Residents, Guests, Pending invites", body: "Filter the roster by who works here, who’s visiting and who hasn’t accepted yet." },
      { title: "Schedules and time off", body: "Set each artist’s working hours and approve time off. Both show on the calendar." },
      { title: "Guest access", body: "Choose whether a guest can view client history, see other bookings or message clients." },
      { title: "Booking page visibility", body: "Show a guest on your booking page, or keep them bookable by staff only." },
      { title: "Permissions matrix", body: `On ${planName("pro")}, tick what each role can do: view all bookings or only their own, export client data, see commission rates, manage billing.` },
    ],
    worksWith: [
      { slug: "payments", line: "Each artist’s commission or guest split feeds the Commissions and Payroll tabs." },
      { slug: "calendar", line: "Every artist gets a column on the calendar, shaped by their hours and time off." },
    ],
    related: ["payments", "calendar", "analytics", "messages"],
    segments: ["multi-chair", "small-studios"],
    tool: "payout-calculator",
    faqs: [
      {
        q: "How many artists can each plan have?",
        a: `${planName("solo")} is for ${cap("Artists", "solo")} artist. ${planName("studio")} takes ${lower(cap("Artists", "studio"))}, ${planName("pro")} ${lower(cap("Artists", "pro"))} and ${planName("enterprise")} ${lower(cap("Artists", "enterprise"))}. Guest-artist seats are unlimited on ${planName("pro")} and ${planName("enterprise")}.`,
      },
      {
        q: "Can guest artists take bookings online?",
        a: "Yes, if you choose. Each guest can be visible on your booking page or bookable by staff only, and you decide whether they can see client history or message clients.",
      },
      {
        q: "What can the front desk do?",
        a: "Take bookings, check clients in, send forms and mark deposits paid at the counter. Payroll, commission rates and billing stay with the owner and admins.",
      },
    ],
    seo: {
      title: "Tattoo studio team and guest artists",
      description: `Residents, front desk and guest artists on one roster, with roles, schedules, time off and guest spots that end on their last day. ${planName("studio")} and ${planName("pro")} plans.`,
    },
  },

  inventory: {
    name: "Inventory",
    navLabel: "Inventory",
    card: "Ink, needles and EU REACH.",
    eyebrow: "Inventory",
    h1: "Every bottle, batch and REACH record.",
    italicWord: "REACH",
    sub: "Track ink, needles and supplies with batch numbers and suppliers. Stock drops as sessions complete, low items become a draft purchase order, and the consent form’s ink disclosure reads the same registry.",
    plan: { min: "solo", note: "Inventory and EU REACH ink tracking on every plan." },
    moments: [
      {
        title: "Register the ink",
        body: "Add each ink with brand, color, product code, batch number and whether it’s REACH compliant. Needles, aftercare and supplies go in the same list.",
        screen: "InventoryScreen tab=items",
      },
      {
        title: "Stock drops as sessions finish",
        body: "Stock is logged as Used in session when a booking completes. When an item falls below par, Reorder creates a draft purchase order for its supplier.",
        screen: "InventoryScreen tab=movements",
      },
      {
        title: "Disclosure pulls the batch",
        body: "The consent kiosk’s ink disclosure step lists inks from your registry, so the client sees what’s going into their skin.",
        screen: "ConsentSignPhone",
      },
    ],
    miniFeatures: [
      { title: "Items, Movements, Purchase orders, Suppliers", body: "Four tabs, each with its own filters. Movements export as a CSV." },
      { title: "REACH-registered count", body: "The Inventory screen counts REACH-registered inks beside items tracked, low or out, and stock value." },
      { title: "Par levels", body: "Set a par level per item. Anything under it shows as low." },
      { title: "Stocktake", body: "Count the shelf and correct the numbers in one pass." },
      { title: "Every movement logged", body: "Received PO, Used in session, Waste, Return and Stocktake, each with who and when." },
      { title: "Categories", body: "Ink, Needles, Supplies, Aftercare, Equipment and Apparel." },
    ],
    worksWith: [
      { slug: "forms", line: "The ink disclosure on the consent form reads from the same registry." },
      { slug: "analytics", line: "The inventory report shows stock value by category and units used." },
    ],
    related: ["forms", "analytics", "payments", "calendar"],
    segments: ["solo-artists", "small-studios"],
    faqs: [
      {
        q: "Is REACH tracking on the Solo plan?",
        a: `Yes. EU REACH ink tracking is on every plan, ${planName("solo")} included. It’s a legal duty for studios in the EU, so it isn’t sold as an upgrade.`,
      },
      {
        q: "Can I track needles and aftercare too?",
        a: "Yes. Ink, needles, supplies, aftercare, equipment and apparel all go in the same inventory, with par levels, suppliers and purchase orders.",
      },
      {
        q: "What does REACH-registered mean here?",
        a: "The ink is in your ink registry marked REACH compliant, with its brand, product code and batch. Limespun records what you enter; it doesn’t test or certify inks.",
      },
    ],
    seo: {
      title: "Tattoo ink inventory with EU REACH tracking",
      description: "Track tattoo ink, needles and supplies with batch numbers, par levels and purchase orders. EU REACH ink tracking is included on every plan, Solo too.",
    },
  },

  analytics: {
    name: "Reports",
    navLabel: "Reports",
    card: "Revenue, rebookings and busy days.",
    eyebrow: "Reports",
    h1: "Know which days fill and who comes back.",
    italicWord: "fill",
    sub: "Revenue by artist and month, how many clients come back, who no-shows and how full the book is. Pick 7, 30 or 90 days and export any report as a CSV.",
    plan: { min: "solo", note: `Reports on every plan. Reports across locations on ${planName("pro")}.` },
    moments: [
      {
        title: "Revenue by artist and month",
        body: "The revenue report shows the trend daily or weekly, split by artist and by service, with tips and deposits collected alongside.",
        screen: "AnalyticsScreen tab=revenue",
      },
      {
        title: "Who comes back, who doesn’t show",
        body: "The clients report tracks new against returning clients and the rebook rate. The artist leaderboard lists sessions, revenue, no-shows and tips for residents and guests.",
        screen: "AnalyticsScreen tab=artists",
      },
      {
        title: "How full the book is",
        body: "The bookings report shows the status mix, the no-show rate, the fill rate and your busiest days of the week.",
        screen: "AnalyticsScreen tab=bookings",
      },
    ],
    miniFeatures: [
      { title: "7, 30 or 90 days", body: "Pick a range and compare it with the period before." },
      { title: "Acquisition source", body: "Where new clients came from." },
      { title: "Artist leaderboard", body: "Sessions, revenue, no-shows and tips per artist, residents and guests side by side. Open an artist for the detail." },
      { title: "Inventory report", body: "Stock value by category, units used and what’s running low." },
      { title: "Export CSV", body: "Download any report as a CSV for your accountant." },
      { title: "Across locations", body: `On ${planName("pro")}, filter by location or see every shop together.` },
    ],
    worksWith: [
      { slug: "payments", line: "Revenue, tips and deposits come from Payments, so the report and the payouts agree." },
      { slug: "calendar", line: "Fill rate and busiest days are read from the bookings on the calendar." },
    ],
    related: ["payments", "calendar", "marketing", "team"],
    segments: ["multi-chair", "multi-location"],
    faqs: [
      {
        q: "Can I see numbers for each artist?",
        a: "Yes. The artist leaderboard shows sessions, revenue, no-shows and tips per artist, with residents and guests marked. Open an artist for their detail.",
      },
      {
        q: "Can I export reports?",
        a: "Yes. Each report downloads as a CSV.",
      },
      {
        q: "Do reports cover several locations?",
        a: `On ${planName("pro")} and ${planName("enterprise")}, filter reports by location or see every shop together. ${planName("solo")} and ${planName("studio")} have one location.`,
      },
    ],
    seo: {
      title: "Tattoo studio reports: revenue and rebooks",
      description: "Tattoo studio reports: revenue by artist, rebook rate, no-shows, fill rate and busiest days over 7, 30 or 90 days, with CSV export. On every plan.",
    },
  },

  marketing: {
    name: "Marketing",
    navLabel: "Marketing",
    card: "Campaigns, waitlist and referrals.",
    eyebrow: "Marketing",
    h1: "Fill quiet weeks from your own list.",
    italicWord: "own",
    sub: "Send campaigns by text or email to segments of your own clients, fill cancellations from the waitlist, and reward clients who send a friend. It all runs on the list you already have.",
    plan: {
      min: "solo",
      note: `Campaigns, segments, waitlist and referrals on every plan. Advanced marketing, including bulk messages from the inbox, starts on ${planName("studio")}.`,
    },
    moments: [
      {
        title: "A campaign to your own clients",
        body: "Pick a segment, write the message once and send it by text or email, now or on a schedule. Test-send it to yourself first.",
        screen: "MarketingScreen tab=campaigns",
      },
      {
        title: "Bring back quiet clients",
        body: "Start from a ready segment like Inactive 90 days, New (last 30 days) or Top spenders, or build your own from filters.",
        screen: "MarketingScreen tab=audience",
      },
      {
        title: "Waitlist and referrals",
        body: "When a booking cancels with enough notice, the next person on the waitlist gets an offer. Referral codes reward the client who sent a friend once that friend’s booking completes.",
        screen: "MarketingScreen tab=waitlist",
      },
    ],
    miniFeatures: [
      { title: "Audience, Campaigns, Waitlist, Referral program", body: "Four tabs working from the same client list." },
      { title: "Waitlist statuses", body: "Active, Offered, Booked, Expired and Cancelled, so you can see who took the slot." },
      { title: "Auto-promote on cancellation", body: "Choose how soon after a cancellation the offer goes out, and only for slots cancelled far enough ahead." },
      { title: "Referral rewards", body: "Reward the referrer with credit, a percentage or a free session, and give their friend a discount." },
      { title: "List hygiene", body: "Unsubscribes are honored, and a hygiene check finds contacts to review and remove." },
      { title: "Monthly texts", body: "Campaign texts count toward your plan’s monthly texts. When those run out, campaigns pause; client replies and reminders still send." },
    ],
    worksWith: [
      { slug: "messages", line: "A client who replies to a campaign text lands in Messages, in their own thread." },
      { slug: "clients", line: "Segments are built from client records: last visit, spend and upcoming bookings." },
    ],
    related: ["messages", "clients", "analytics", "portfolio"],
    segments: ["solo-artists", "small-studios"],
    faqs: [
      {
        q: "Is there a points or rewards scheme for regulars?",
        a: "No. There’s no points scheme. Limespun has a Referral program, which rewards clients who bring a friend, and a waitlist that fills cancellations.",
      },
      {
        q: "Do campaign texts use my monthly texts?",
        a: `Yes. They count toward your plan’s texts: ${TEXTS_BY_PLAN}. At the limit campaigns pause, but replies and reminders keep sending.`,
      },
      {
        q: "Can I reach clients who haven’t been back?",
        a: "Yes. The Inactive 90 days segment lists clients who haven’t visited in three months. Send them a campaign by text or email.",
      },
    ],
    seo: {
      title: "Tattoo studio marketing, waitlist and referrals",
      description: `Text and email campaigns to your own clients, a waitlist that fills cancellations and a referral program. On every Limespun plan from ${SOLO} a month.`,
    },
  },
};

export const featureHref = (slug: FeatureSlug): string => `/product/${slug}`;

export const FEATURES: Feature[] = FEATURE_SLUGS.map((slug) => ({ slug, href: featureHref(slug), ...CONTENT[slug] }));

export function isFeatureSlug(value: string): value is FeatureSlug {
  return (FEATURE_SLUGS as readonly string[]).includes(value);
}

export function getFeature(slug: FeatureSlug): Feature;
export function getFeature(slug: string): Feature | undefined;
export function getFeature(slug: string): Feature | undefined {
  return isFeatureSlug(slug) ? { slug, href: featureHref(slug), ...CONTENT[slug] } : undefined;
}

// ─── Groups ──────────────────────────────────────────────────────────────────

export interface FeatureGroup {
  id: "get-booked" | "tattoo-work" | "run-the-shop";
  title: string;
  features: FeatureSlug[];
}

/**
 * The nav’s three Product columns (src/components/layout/nav.tsx), in the same order.
 * The nav lists 12 pages; Marketing isn’t in the menu, so it closes "Get booked" here
 * for /product and the footer.
 */
export const FEATURE_GROUPS: FeatureGroup[] = [
  { id: "get-booked", title: "Get booked", features: ["calendar", "appointments", "messages", "clients", "marketing"] },
  { id: "tattoo-work", title: "Do the tattoo work", features: ["forms", "projects", "portfolio", "ai-design"] },
  { id: "run-the-shop", title: "Run the shop", features: ["payments", "team", "inventory", "analytics"] },
];
