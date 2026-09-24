export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  highlights: string[];
  modules: string[];
  type: "release" | "fix" | "improvement";
}

/**
 * Written in studio language. Every highlight describes something the app does
 * today (checked against the InkOS code); plan limits follow src/lib/data/plans.ts.
 */
export const changelogEntries: ChangelogEntry[] = [
  {
    version: "v1.13.0",
    date: "2026-04-23",
    title: "Messages: every client thread in one inbox",
    highlights: [
      "SMS and email in one inbox, threaded per client",
      "The client's record open beside the thread",
      "Send a consent form or request a deposit from the conversation",
      "Internal notes kept apart from what the client sees",
      "Auto-replies for new inquiries, missed calls and paid deposits",
      "Instagram and WhatsApp come next; see the roadmap",
    ],
    modules: ["Messages"],
    type: "release",
  },
  {
    version: "v1.12.5",
    date: "2026-04-23",
    title: "Calendar: booking details, a now line and a booking-page QR code",
    highlights: [
      "Tap a booking to see its details without leaving the calendar",
      "A now line on the day view, so the current time is always clear",
      "A QR code for your booking page, ready to print for the front desk",
      "Book the next session straight onto the client's project",
    ],
    modules: ["Calendar"],
    type: "improvement",
  },
  {
    version: "v1.12.0",
    date: "2026-04-19",
    title: "Every artist on one calendar",
    highlights: [
      "A day view with a column for each artist",
      "Drag a booking to a new time or artist; clashes are checked before it moves",
      "Rescheduling asks before it messages the client",
      "Allergy flags on the booking itself",
      "Open any booking from the keyboard",
    ],
    modules: ["Calendar"],
    type: "release",
  },
  {
    version: "v1.11.2",
    date: "2026-04-15",
    title: "Design moodboards",
    highlights: [
      "Collect references on a moodboard for each design",
      "Keep placement, size and style notes with the project",
      "The artist edits the brief; the AI never draws the tattoo",
      "On every plan, Solo included",
    ],
    modules: ["AI design"],
    type: "release",
  },
  {
    version: "v1.10.0",
    date: "2026-04-09",
    title: "Inventory and EU REACH ink tracking",
    highlights: [
      "Ink and supplies tracked item by item, with suppliers and reorder levels",
      "Purchase orders for restocking",
      "An Ink registry in Settings: brand, color, product code, batch number and REACH status",
      "A REACH-registered count and filter on Inventory",
    ],
    modules: ["Inventory"],
    type: "release",
  },
  {
    version: "v1.9.4",
    date: "2026-04-02",
    title: "Forms: kiosk mode and a REACH ink disclosure",
    highlights: [
      "Kiosk mode, so clients sign consent on the studio tablet",
      "A REACH ink disclosure section for consent forms",
      "Signed copies can't be edited and are stored as PDFs",
    ],
    modules: ["Forms"],
    type: "release",
  },
  {
    version: "v1.9.0",
    date: "2026-03-26",
    title: "Payments and artist splits",
    highlights: [
      "Deposits and card payments taken in Limespun, with no Limespun fee on either",
      "Commission and booth-rent splits worked out per artist (Studio and up)",
      "Payroll and 1099s (Pro and up)",
    ],
    modules: ["Payments"],
    type: "release",
  },
  {
    version: "v1.8.0",
    date: "2026-03-19",
    title: "Multi-session projects",
    highlights: [
      "A sleeve or back piece is one project, not a string of bookings",
      "One deposit pool across sessions: paid in, applied, available and refundable",
      "Reference, stencil, fresh and healed photos on the project",
      "Project status from planning through healing to complete",
    ],
    modules: ["Projects"],
    type: "release",
  },
];
