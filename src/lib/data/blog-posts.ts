import type { ArticleBlock } from "@/components/templates/article-page";

/**
 * Blog posts as data, rendered by src/app/blog/[slug] on the ArticlePage template.
 *
 * Rules every post follows (audited 2026-09-24):
 * - US English, US dollars.
 * - Product claims match the app (InkOS) and src/lib/data/plans.ts. Nothing about an API,
 *   an enforced cancellation window or AI-drafted briefs.
 * - No quotes, people, studios or statistics we can’t point to. Worked examples use the
 *   canonical Sample studio (src/components/mockups/sample-data.ts) and say so; any other
 *   example is labeled as one.
 * - Competitor facts only from src/lib/data/competitors.ts, and a post that cites a check
 *   is never dated before that check.
 * - Dates are real. Every post was rewritten from scratch on September 24, 2026 and is dated
 *   that day: the older dates predated the site and the features the posts describe (Projects,
 *   April 20; the photo slots, July 12; the four plans, July 22, 2026; see changelog.ts). A post
 *   is never dated before a feature, plan or check it cites. Set `updatedAt` on a later
 *   substantive edit, so the Article JSON-LD's dateModified stays true.
 * - Sample studio examples read as sample data, in the present tense and without calendar
 *   dates: its "today" is Thursday, October 8, 2026, after every post's date, so a post never
 *   says what happened on a Sample studio day. (The mockups show their own sample dates.)
 *
 * Text is plain. `[label](/path)` inside a paragraph, list item or callout becomes a link.
 */

/** A small table inside a post (worked examples). Cells are plain text. */
export interface PostTable {
  type: "table";
  /** What the table shows, for screen readers and as the caption. */
  caption: string;
  head: string[];
  rows: string[][];
  /** A totals row, set apart. */
  foot?: string[];
  /** Columns that hold money: right-aligned, tabular figures. */
  figureColumns?: number[];
}

/** Quotes and code blocks are left out on purpose: no invented quotes, no developer boxes. */
export type PostBlock = Exclude<ArticleBlock, { type: "quote" | "code" }> | PostTable;

export type PostCategory = "operations" | "money" | "compliance" | "craft";

export const categoryLabels: Record<PostCategory, string> = {
  operations: "Studio operations",
  money: "Deposits & pay",
  compliance: "Compliance",
  craft: "Craft",
};

/** The product screen a post is about: its figure, and the cover when it’s the latest post. */
export type PostScreen = "today" | "deposit-pool" | "inventory" | "guest-artists" | "commissions" | "photo-timeline";

export interface BlogPost {
  slug: string;
  /** The page H1. */
  title: string;
  /** One word of the title set in the ember italic. */
  italicWord: string;
  /** Short label for the breadcrumb. */
  crumb: string;
  /** <title> before " | Limespun": 49 characters at most. */
  seoTitle: string;
  /** Meta description and the dek under the title: 120–160 characters. */
  description: string;
  /** One line for the cards on /blog. */
  summary: string;
  /** ISO date. */
  publishedAt: string;
  /** ISO date of the last substantive edit, when there was one. */
  updatedAt?: string;
  category: PostCategory;
  screen: PostScreen;
  /** Caption under the post’s product screen. */
  screenCaption: string;
  /** The one product page this post is about. */
  feature: { title: string; body: string; href: string };
  /** Closing band: headline with one italic word, and the contextual second link. */
  inkBand: { headline: string; italicWord: string; secondary: { label: string; href: string } };
  blocks: PostBlock[];
}

const posts: BlogPost[] = [
  {
    slug: "deposit-pools-vs-per-booking-deposits",
    // Pool last: at 320 the h1 then ends on "deposit pools", never on one word
    title: "Per-booking deposits vs deposit pools",
    italicWord: "pools",
    crumb: "Deposit pools",
    seoTitle: "Deposit pools vs per-booking deposits",
    description:
      "Why a multi-session tattoo should hold one deposit on the project instead of one per booking, worked through on a sleeve, and what happens if a client stops.",
    summary: "One deposit on the project instead of one per booking, worked through on a sleeve.",
    // The comparison below cites a check of competitors’ public pages made on September 22.
    publishedAt: "2026-09-24",
    category: "money",
    screen: "deposit-pool",
    screenCaption: "Asha M.’s koi sleeve in the Sample studio: one deposit pool across five sessions.",
    feature: {
      title: "Projects",
      body: "A sleeve is one project: its sessions, photos and one deposit pool.",
      href: "/product/projects",
    },
    inkBand: {
      headline: "One deposit for the whole piece.",
      italicWord: "piece",
      secondary: { label: "Deposit calculator", href: "/tools/deposit-calculator" },
    },
    blocks: [
      {
        type: "p",
        text: "Most booking software ties a deposit to one appointment. That works for a single-session piece. It gets messy on a sleeve, where the client thinks of the work as one piece and your records hold a separate deposit for every booking.",
      },
      { type: "h2", text: "Five bookings, five deposits" },
      {
        type: "p",
        text: "Take a five-session sleeve with a $100 deposit on each booking. Five deposits arrive at five different times, some by card and some by bank transfer, and each one belongs to its own appointment. Then the artist is out sick for session 3.",
      },
      {
        type: "table",
        caption: "An example sleeve with a deposit on every booking (not a real client)",
        head: ["Booking", "Deposit", "What happened"],
        rows: [
          ["Session 1", "$100, card", "Applied at checkout"],
          ["Session 2", "$100, transfer", "Applied at checkout"],
          ["Session 3", "$100, card", "Artist out sick, rebooked"],
          ["Session 4", "$100, card", "Taken again for the new date?"],
          ["Session 5", "None yet", "Not booked"],
        ],
      },
      {
        type: "p",
        text: "By session 4 the client asks how much they’ve paid so far, and the answer is spread across a card processor, a bank statement and whatever note was made when session 3 moved. Nobody did anything wrong. The records are shaped differently from the work.",
      },
      { type: "h2", text: "One pool for the whole piece" },
      {
        type: "p",
        text: "A deposit pool sits on the project, not on a booking. The client pays into it, and each session draws from it. Move a session and the money stays where it is. It’s applied when a session is completed, or when you apply it by hand, and until then it’s simply available.",
      },
      {
        type: "p",
        text: "Here is the Sample studio’s koi sleeve for Asha M., five sessions with Dev:",
      },
      {
        type: "table",
        caption: "Asha M.’s deposit pool in the Sample studio (sample data)",
        head: ["Entry", "What for", "Amount"],
        rows: [
          ["Paid in", "Deposit for the sleeve", "+$300"],
          ["Applied", "Session 3, at checkout", "−$60"],
        ],
        foot: ["Available", "Sessions 4 and 5", "$240"],
        figureColumns: [2],
      },
      {
        type: "p",
        text: "The project shows four figures: Paid in, Applied, Available and Refundable. Asha’s reads $300 paid in, $60 applied and $240 available. When she asks what she’s paid, that’s the answer, on one screen, and her own project page shows her the same Applied and Available figures.",
      },
      {
        type: "callout",
        label: "In Limespun",
        tone: "note",
        text: "Deposit pools come with [Projects](/product/projects), on every plan from Solo. Single-session bookings keep their own [per-booking deposit](/product/appointments).",
      },
      { type: "h2", text: "How other booking tools handle it" },
      {
        type: "p",
        text: "We read what other booking tools publish about this on September 22, 2026. Mangomint describes collecting a card on file, and DaySmart Body Art describes online deposits on all its plans. Neither describes a deposit that follows a piece across sessions. TattooGenda, which is also built for tattoo, does: it applies a project deposit to any appointment in the project.",
      },
      {
        type: "p",
        text: "The full side-by-side, with sources, is on [the compare pages](/compare).",
      },
      { type: "h2", text: "When a client stops halfway" },
      {
        type: "p",
        text: "The case every studio worries about is the client who stops halfway through. With a deposit per booking, you end up working out which deposits were used. With a pool, the project already shows what’s been applied and what’s still available, so the conversation starts from the same numbers. Whether you keep the rest or refund it is your decision, and your written policy is what you point to.",
      },
      { type: "h2", text: "When a deposit per booking is fine" },
      {
        type: "p",
        text: "If most of your work is single-session (walk-ins, flash, small pieces), a deposit per booking is simpler and you don’t need a pool. The pool earns its place on anything longer than two sessions, where a deposit would otherwise be split, carried forward or taken twice.",
      },
      {
        type: "p",
        text: "To try it, create an account and set up your next multi-session piece as a project. If you’re switching tools, we move the deposits you already hold over for you.",
      },
    ],
  },
  {
    slug: "the-90-second-morning-triage",
    title: "The 90-second morning triage",
    italicWord: "triage",
    crumb: "Morning triage",
    seoTitle: "The 90-second morning triage for tattoo studios",
    description:
      "What a tattoo studio needs to know before the first client walks in, and how the Today screen puts deposits, consent forms and allergies on one page.",
    summary: "What to check before the first client walks in, and where Today puts it.",
    publishedAt: "2026-09-24",
    category: "operations",
    screen: "today",
    screenCaption: "Today in the Sample studio, as Dev, the owner, sees it.",
    feature: {
      title: "Product",
      body: "Today, Needs attention, Messages and the screens behind them.",
      href: "/product",
    },
    inkBand: {
      headline: "Open the shop at a glance.",
      italicWord: "glance",
      secondary: { label: "See the product", href: "/product" },
    },
    blocks: [
      {
        type: "p",
        text: "Most studios open the same way: coffee, then four tabs. The booking app, the group chat, the card reader’s dashboard and the spreadsheet with the deposits on it. Somewhere in there is the 10:00 client who texted at 11 last night to move, and a consent form nobody sent. It’s easy for the first half hour to go before anyone sets up a station.",
      },
      {
        type: "p",
        text: "A morning check should take about as long as the kettle. That needs one screen, and a short list of questions it has to answer.",
      },
      { type: "h2", text: "Four things to know before opening" },
      {
        type: "ol",
        items: [
          "Who is in the chair today, with which artist, and when.",
          "Which deposits are still unpaid, and whose booking they hold.",
          "Which clients haven’t signed their consent form yet.",
          "Anything about a client that changes the session, like an allergy.",
        ],
      },
      {
        type: "p",
        text: "Everything else (next month’s gaps, last week’s revenue, the stock order) can wait until the first session has started.",
      },
      { type: "h2", text: "The Today screen" },
      {
        type: "p",
        text: "Today in Limespun answers those four in order. Here is a Thursday in the Sample studio:",
      },
      {
        type: "table",
        caption: "A Thursday’s bookings in the Sample studio (sample data)",
        head: ["Time", "Artist", "Client", "What to know"],
        rows: [
          ["10:00", "Dev", "Asha M.", "Koi sleeve, session 4 of 5; $240 in the deposit pool"],
          ["11:00", "Mara", "Jo K.", "Consult; $100 deposit paid"],
          ["12:00", "Rio", "Walk-ins", "Guest day, 3 slots"],
          ["1:00", "Mara", "Priya S.", "Consent form not signed yet"],
          ["1:30", "Dev", "Elena R.", "Red ink allergy; no red today"],
          ["4:30", "Mara", "Sam T.", "Touch-up; consent signed"],
        ],
      },
      {
        type: "p",
        text: "Above the list is a strip of numbers: revenue expected today, bookings, deposits pending and, from the Studio plan, commissions owed. Below it are the lists that need a hand: deposits still pending, consent forms still out, low stock and the waitlist.",
      },
      { type: "h2", text: "The allergy note, where you’ll see it" },
      {
        type: "p",
        text: "Allergy near-misses tend to happen when a note lives in one place and the session happens somewhere else. In Limespun you note an allergy once, on the client record. It shows on every booking for that client and across the top of Today on the day they’re in. In the Sample studio, on a day Elena R. is booked, her red ink allergy is the first thing on Today, above the numbers.",
      },
      {
        type: "callout",
        tone: "note",
        text: "Note it once on the [client record](/product/clients). There’s no copying it into each appointment.",
      },
      { type: "h2", text: "What each person sees" },
      {
        type: "p",
        text: "Owners and admins get the whole studio. An artist’s Today shows their own sessions, their own payout and their own projects, so they aren’t reading everyone’s day to find theirs. The front desk gets the schedule, deposits, consent forms and stock, without the commission figures.",
      },
      { type: "h2", text: "Making it a habit" },
      {
        type: "p",
        text: "The morning check is only quick if what goes in is clean: consent forms sent before the day, deposits requested when the booking is made rather than chased later, and allergies written down the first time a client mentions one. That’s a studio habit as much as a software setting. Limespun makes it easier, but someone still has to decide it matters.",
      },
      {
        type: "p",
        text: "Today is on every plan. There’s no free trial; you get a 30-day money-back guarantee, and we move your existing clients and bookings over for you.",
      },
    ],
  },
  {
    slug: "eu-reach-2022-what-tattoo-studios-need-to-know",
    title: "EU REACH: the records a tattoo studio keeps",
    italicWord: "records",
    crumb: "EU REACH",
    seoTitle: "EU REACH for tattoo studios: what to keep",
    description:
      "A plain checklist for the EU REACH restriction on tattoo inks: ingredient lists, safety data sheets, batch records and reactions, and what Limespun keeps.",
    summary: "Ingredient lists, safety data sheets, batch records and reactions, in plain terms.",
    publishedAt: "2026-09-24",
    category: "compliance",
    screen: "inventory",
    screenCaption: "Inventory in the Sample studio, with the REACH-registered count beside stock.",
    feature: {
      title: "Inventory",
      body: "Every bottle, batch and REACH record, with low stock flagged on Today.",
      href: "/product/inventory",
    },
    inkBand: {
      headline: "Add your inks to the registry.",
      italicWord: "registry",
      secondary: { label: "EU REACH hub", href: "/reach-compliance" },
    },
    blocks: [
      {
        type: "p",
        text: "The EU REACH restriction on tattoo inks and permanent makeup (Annex XVII, entry 75) has applied since January 4, 2022. It limits a long list of substances in the ink itself, so most of the work sits with manufacturers. The studio’s part is the records: knowing what’s in each ink you use, which batch went into which client, and being able to show both.",
      },
      {
        type: "p",
        text: "This is a practical checklist, not legal advice. Your national authority’s guidance is the last word for your country.",
      },
      { type: "h2", text: "Know what is in every color" },
      {
        type: "p",
        text: "Compliant inks carry an ingredient list on the label. Ask your supplier for the full list for every color, including each pigment’s Color Index (CI) number.",
      },
      {
        type: "ul",
        items: [
          "Get the full ingredient list from your supplier, not only the safety data sheet.",
          "Check it against the restricted substances in Annex XVII, entry 75.",
          "Set aside any ink where the supplier can’t confirm restricted amines, PAHs or heavy metals are under the limits.",
          "Don’t assume a brand is still compliant because it was in 2022. Formulas change, and labels can lag behind.",
        ],
      },
      {
        type: "p",
        text: "If a supplier can’t tell you what’s in a color, stop using it, however long you’ve had it.",
      },
      { type: "h2", text: "Safety data sheets: where to look" },
      {
        type: "p",
        text: "A safety data sheet (SDS) has 16 sections. For tattoo ink, three matter most: section 3 (composition: the ingredients and their identifiers), section 11 (toxicological information) and section 15 (regulatory information, where REACH is referenced).",
      },
      {
        type: "p",
        text: "Keep them where you can find one in a minute, not in a folder under the counter.",
      },
      { type: "h2", text: "Batch records" },
      {
        type: "p",
        text: "A batch record means knowing which batch of which ink went into which client. It sounds like admin until a supplier recalls a batch. With a record, you can find the clients who had ink from that batch and contact them. Without one, you can’t.",
      },
      {
        type: "p",
        text: "In Limespun, each ink in the Ink registry (in Settings) has its brand, color, product code, batch number and REACH status. Your consent form carries a REACH ink disclosure in your own wording, which the client acknowledges before signing. After the session, the artist adds the brand, color and batch of each ink to the signed form, so the record stays with that session.",
      },
      {
        type: "callout",
        label: "What Limespun doesn’t do",
        tone: "note",
        text: "It doesn’t watch for recalls. Keep your supplier’s notices and check them against the batch numbers in your registry.",
      },
      { type: "h2", text: "Log reactions, even small ones" },
      {
        type: "p",
        text: "Report serious reactions to your supplier and, where your country runs one, to the national reporting scheme. For your own records, set the bar lower: note anything the client mentions, even redness that settles by itself.",
      },
      {
        type: "ul",
        items: [
          "The date the client told you",
          "The ink and batch used in the session",
          "Where on the body",
          "What happened, in the client’s own words",
          "How it resolved, or who you referred them to",
          "Whether you told the ink supplier",
        ],
      },
      {
        type: "p",
        text: "In Limespun, note it on the client’s record. An allergy noted there shows on every booking after that, which is how Elena R.’s red ink allergy reaches Dev before her next session in the Sample studio.",
      },
      { type: "h2", text: "Ready for an inspection" },
      {
        type: "p",
        text: "Enforcement differs from country to country. Being ready doesn’t mean perfect paperwork. It means you can quickly produce three things: the safety data sheet for an ink you’re using, the ink and batch behind a given session, and the disclosure the client acknowledged before it.",
      },
      {
        type: "callout",
        label: "In Limespun",
        tone: "ember",
        text: "EU REACH ink tracking is on every plan, Solo included: the Ink registry in Settings, a REACH-registered count on [Inventory](/product/inventory) and the REACH ink disclosure on your [consent forms](/product/forms).",
      },
      {
        type: "p",
        text: "Create an account and add your inks in Settings, or send us your ink list and we’ll bring it over when we move your studio.",
      },
    ],
  },
  {
    slug: "guest-residency-bookings-that-actually-work",
    title: "Guest spots without the spreadsheet",
    italicWord: "spreadsheet",
    crumb: "Guest spots",
    seoTitle: "Guest artist spots without the spreadsheet",
    description:
      "How to host a guest artist without a spreadsheet: set the dates and the split once, show them on your booking page, and settle up when the guest spot ends.",
    summary: "Dates, split and booking page set once; access ends with the guest spot.",
    publishedAt: "2026-09-24",
    category: "operations",
    screen: "guest-artists",
    screenCaption: "Rio’s guest spot in the Sample studio: a week, split 70/30.",
    feature: {
      title: "Team & guest artists",
      body: "Residents, front desk and guests on one roster.",
      href: "/product/team",
    },
    inkBand: {
      headline: "Host the guest, not the admin.",
      italicWord: "guest",
      secondary: { label: "See pricing", href: "/pricing" },
    },
    blocks: [
      {
        type: "p",
        text: "Hosting a guest artist usually comes with a round of setup: add them somewhere, give their clients a way to book, watch the calendar so nothing double-books, work out the split at the end, then remember to take their access away. Do that for every guest spot and it adds up.",
      },
      { type: "h2", text: "Set it up once" },
      {
        type: "p",
        text: "In Limespun a guest spot has its own dates and its own split. You set it up in three steps:",
      },
      {
        type: "ol",
        items: [
          "Add the guest and their dates. In the Sample studio, Rio is in for a week, Friday to Friday.",
          "Set the split. It starts at 70/30 to the artist; change it to what you agreed.",
          "Choose what they can see, and whether they show on your booking page.",
        ],
      },
      {
        type: "p",
        text: "When the dates end, their access ends with them. There’s nothing to remember to switch off.",
      },
      { type: "h2", text: "One calendar, the same clash checks" },
      {
        type: "p",
        text: "A guest’s bookings sit on the same calendar as everyone else’s, with the same clash checks, and Today shows who is guesting that week. Nobody has to ask when Rio’s in.",
      },
      { type: "h2", text: "Settling up" },
      {
        type: "p",
        text: "The split is worked out on each session the guest finishes, so at the end you can see what they took and what they’re owed without rebuilding it from a spreadsheet. Say Rio takes $1,300 in a payout week in the Sample studio: at 70/30, $910 is Rio’s and $390 stays with the studio.",
      },
      { type: "h2", text: "Before the guest arrives" },
      {
        type: "ul",
        items: [
          "Agree the split, and who takes the deposits, before you announce the dates.",
          "Decide which consent form their clients sign, and where the signed copies are kept.",
          "Share your aftercare instructions, so clients hear one version.",
          "Tell your regulars the dates, so the guest’s books fill from your list as well as theirs.",
        ],
      },
      {
        type: "callout",
        label: "Plan",
        tone: "note",
        text: "Guest artists are on Pro and Multi-Location, with unlimited guest-artist seats. [Compare the plans](/pricing).",
      },
      {
        type: "p",
        text: "If you host guests more than a couple of times a year, the setup you skip adds up. Create an account and set up your next guest spot.",
      },
    ],
  },
  {
    slug: "commission-splits-the-friday-afternoon-fix",
    title: "Commission splits: the Friday afternoon fix",
    italicWord: "Friday",
    crumb: "Commission splits",
    seoTitle: "Commission splits for tattoo studios",
    description:
      "How to stop working out artist pay by spreadsheet on Friday: a split for each artist, booth rent for renters, and commissions worked out as sessions are paid.",
    summary: "A rate for each artist, booth rent for renters, and pay worked out as sessions are paid.",
    publishedAt: "2026-09-24",
    category: "money",
    screen: "commissions",
    screenCaption: "The Commissions tab in Payments for the Sample studio.",
    feature: {
      title: "Payments & payouts",
      body: "Card payments in, artist splits out, payroll and 1099s on Pro.",
      href: "/product/payments",
    },
    inkBand: {
      headline: "Payday, already worked out.",
      italicWord: "worked",
      secondary: { label: "Payout calculator", href: "/tools/payout-calculator" },
    },
    blocks: [
      {
        type: "p",
        text: "In a lot of studios, Friday at 4:45 is when the owner turns accountant: pull the week’s sessions, apply each artist’s rate, take off booth rent, and send the transfers before everyone leaves. With a few artists on different arrangements it can take a couple of hours, and one wrong rate means a correction and an awkward conversation.",
      },
      { type: "h2", text: "What the spreadsheet costs" },
      {
        type: "p",
        text: "If Friday pay takes you two hours and your time is worth $50 an hour, that’s $100 a week, or $5,200 over a year. The bigger cost is mistakes. Every manual sum is a chance to use last month’s rate, miss a session or count a deposit twice, and pay is the one number every artist checks.",
      },
      { type: "h2", text: "A rate for each artist" },
      {
        type: "p",
        text: "In Limespun each artist has their own arrangement: a commission split for residents, or weekly booth rent for renters. There’s no single studio-wide rate that quietly applies to everyone, so a senior artist on a negotiated split keeps it.",
      },
      {
        type: "p",
        text: "As sessions are paid, each artist’s share is worked out, and the total owed shows as Commissions owed on Today. Here is one payout week in the Sample studio:",
      },
      {
        type: "table",
        caption: "Artist pay for one week in the Sample studio (sample data)",
        head: ["Artist", "Arrangement", "Took", "Owed"],
        rows: [
          ["Dev", "60% commission", "$3,420", "$2,052"],
          ["Mara", "Booth rent, $250 a week", "$2,910", "$2,660"],
          ["Rio", "Guest, 70/30", "$1,300", "$910"],
        ],
        foot: ["Week", "", "$7,630", "$5,622"],
        figureColumns: [2, 3],
      },
      {
        type: "p",
        text: "Mara rents her booth, so nothing is split: her $250 rent comes off what she took, and the rest is hers.",
      },
      { type: "h2", text: "Agree the terms in writing" },
      {
        type: "p",
        text: "Software can only apply the arrangement you agreed. Before an artist’s first week, write down:",
      },
      {
        type: "ul",
        items: [
          "The split or the rent, and what would change it.",
          "Whether the split is worked out before or after card fees.",
          "How tips are paid out.",
          "Who pays for needles, ink and other supplies.",
          "What happens to a deposit a client forfeits.",
        ],
      },
      {
        type: "p",
        text: "Then set the same numbers on each artist in Limespun, so what it works out is what you agreed.",
      },
      { type: "h2", text: "What artists see" },
      {
        type: "p",
        text: "Artists see their own payout on their Today screen as the week goes, instead of finding out on Friday. Fewer questions for the owner, fewer surprises for the artist.",
      },
      { type: "h2", text: "Friday, after" },
      {
        type: "p",
        text: "With splits worked out as sessions are paid, Friday becomes a check rather than a calculation. The breakdown for any artist is on the Commissions tab in Payments.",
      },
      {
        type: "callout",
        label: "Plans",
        tone: "ember",
        text: "Commission and booth-rent splits are on Studio and up. Payroll and 1099s are on Pro.",
      },
      {
        type: "p",
        text: "Try the numbers for your own team in the [payout calculator](/tools/payout-calculator), then create an account when you’re ready.",
      },
    ],
  },
  {
    slug: "the-photo-timeline-as-a-portfolio",
    title: "The photo timeline: before, fresh, healed",
    italicWord: "healed",
    crumb: "Photo timeline",
    seoTitle: "The tattoo photo timeline: before, fresh, healed",
    description:
      "Why the healed photo is the one your portfolio needs, and how a project’s photo timeline files every shot from the stencil to the final healed photo, in order.",
    summary: "Before, stencil, fresh and healed shots, filed on the project in order.",
    publishedAt: "2026-09-24",
    category: "craft",
    screen: "photo-timeline",
    screenCaption: "The photo timeline on Asha M.’s koi sleeve in the Sample studio, with session 3’s healed photo past due. Tiles stand in for photos.",
    feature: {
      title: "Portfolio & flash",
      body: "Show the healed work you choose, and sell your flash.",
      href: "/product/portfolio",
    },
    inkBand: {
      headline: "Get the healed shot, every time.",
      italicWord: "healed",
      secondary: { label: "See pricing", href: "/pricing" },
    },
    blocks: [
      {
        type: "p",
        text: "You finish a piece and take the fresh photo. The client heals, loves it and never sends you the healed shot. So the portfolio fills with fresh work: shiny, a little swollen, and not what the tattoo will look like in a year. The healed photo is the one that shows your work, and the one most often missing.",
      },
      { type: "h2", text: "Five kinds of photo, in order" },
      {
        type: "p",
        text: "Every project in Limespun has a photo timeline, filed by slot instead of left in a camera roll:",
      },
      {
        type: "ul",
        items: [
          "Before: the client’s references, and the skin before you start.",
          "Stencil: the agreed design, one per project.",
          "Fresh, for each session: taken before you wrap.",
          "Healed, for each session: due 14 days after it.",
          "Final healed: the portfolio shot, once the whole piece has settled.",
        ],
      },
      { type: "h2", text: "Fresh photos tell the story" },
      {
        type: "p",
        text: "Fresh photos go on the session they came from. Across a five-session sleeve, that’s the piece building up in order, which is useful to you and to the next client deciding whether to commit to something big.",
      },
      { type: "h2", text: "The healed photo at two weeks" },
      {
        type: "p",
        text: "A photo around two weeks after a session shows how the ink is settling: patchy healing, ink loss in one spot, a line that needs a touch-up. In Limespun each session’s healed photo is due 14 days after the session, so the timeline shows which ones are still missing and you know whom to ask. On Asha M.’s koi sleeve in the Sample studio, session 2’s healed photo is in, and it’s the one Dev added to his portfolio. Session 3’s is past due, so the timeline flags it, and her next session is the moment to ask for it.",
      },
      {
        type: "callout",
        tone: "note",
        text: "Healed photos help later, too. If a client reports a reaction, a dated photo shows how the tattoo looked at two weeks.",
      },
      { type: "h2", text: "You choose what goes public" },
      {
        type: "p",
        text: "Photos on a project stay on the project. Nothing goes into your public [portfolio](/product/portfolio) unless you add it, and you choose which healed shots make it.",
      },
      {
        type: "p",
        text: "Because every photo is filed by project, session and slot, a healed forearm piece from a year ago is still on its project, not somewhere in your phone.",
      },
      {
        type: "callout",
        label: "Plan",
        tone: "note",
        text: "The photo timeline comes with [Projects](/product/projects), on every plan from Solo.",
      },
      {
        type: "p",
        text: "The best portfolio is your healed work. The timeline turns getting it into a habit instead of luck.",
      },
    ],
  },
];

/* ─── Queries ─────────────────────────────────────────────────────────────── */

/** Every post, newest first; posts from the same day keep their order above (the sort is stable). */
export const blogPosts: BlogPost[] = [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

/** Up to `n` other posts: the same category first, then the newest. */
export function relatedPosts(post: BlogPost, n = 3): BlogPost[] {
  const others = blogPosts.filter((p) => p.slug !== post.slug);
  const same = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...same, ...rest].slice(0, n);
}

/** Categories that have posts, in label order, with their counts. */
export function postCategories(): { key: PostCategory; label: string; count: number }[] {
  return (Object.keys(categoryLabels) as PostCategory[])
    .map((key) => ({ key, label: categoryLabels[key], count: blogPosts.filter((p) => p.category === key).length }))
    .filter((c) => c.count > 0);
}

/* ─── Formatting ──────────────────────────────────────────────────────────── */

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Paragraph text with the link markup reduced to its label. */
export function plainText(text: string): string {
  return text.replace(LINK, "$1");
}

function blockWords(b: PostBlock): number {
  const count = (s: string) => plainText(s).split(/\s+/).filter(Boolean).length;
  switch (b.type) {
    case "ul":
    case "ol":
      return b.items.reduce((n, it) => n + count(it), 0);
    case "table":
      return [...b.head, ...b.rows.flat(), ...(b.foot ?? [])].reduce((n, c) => n + count(c), 0);
    default:
      return count(b.text);
  }
}

/** Minutes to read at 220 words a minute, from the post’s own text, rounded up. */
export function readMinutes(post: BlogPost): number {
  const words = post.blocks.reduce((n, b) => n + blockWords(b), 0);
  return Math.max(1, Math.ceil(words / 220));
}

/** "2026-09-22" → "September 22, 2026" (long) or "Sep 22, 2026" (short). */
export function formatPostDate(iso: string, style: "long" | "short" = "long"): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: style,
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** A title for display: never breaks at a hyphen ("per-" / "booking"), via a word joiner. */
export function keepHyphens(text: string): string {
  return text.replace(/-/g, "-\u2060");
}

/** Joins the last two words, so a paragraph never ends on a word alone. */
export function noWidow(text: string): string {
  return text.replace(/\s+(\S+)\s*$/, "\u00a0$1");
}
