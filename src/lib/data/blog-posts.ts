import { BRAND } from "@/lib/brand";

export type BlogContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'code'; lang?: string; text: string }
  | { type: 'callout'; tone: 'rust' | 'amber' | 'sage'; text: string };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  author: { name: string; role: string };
  category: "ops" | "compliance" | "craft" | "product";
  gradient: string;
  content: BlogContentBlock[];
}

/**
 * Posts describe only what the app does today and follow src/lib/data/plans.ts for plan limits.
 * Worked examples use the canonical Sample studio (Dev, Mara, Rio; Asha M., Jo K., Elena R., Sam T.).
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "the-90-second-morning-triage",
    title: "The 90-second morning triage that runs a tattoo studio",
    excerpt:
      "How a tattoo studio can open the shop in 90 seconds, and why it so often takes forty minutes instead.",
    publishedAt: "2026-04-15",
    readTime: "6 min",
    author: { name: "The Limespun team", role: "Limespun" },
    category: "ops",
    gradient: `linear-gradient(135deg, ${BRAND.rust} 0%, ${BRAND.amber} 100%)`,
    content: [
      {
        type: 'h2',
        text: 'Forty minutes to open a shop that fits in one screen.',
      },
      {
        type: 'p',
        text: 'For a lot of studio owners, the morning goes like this: open up, make coffee, open four browser tabs, check the booking spreadsheet, check the group chat, text the artist who has a 10am, discover the 10am messaged at 11pm to reschedule, panic. Forty minutes gone before anyone picks up a machine.',
      },
      {
        type: 'h3',
        text: 'The Today screen does one job',
      },
      {
        type: 'p',
        text: "The Today screen in Limespun is deliberately narrow. It shows today's appointments in time order, the artist on each, the deposit status, and a line of project context. No three-month calendar. Just today.",
      },
      {
        type: 'ul',
        items: [
          '10:00 · Dev · Asha M. · Koi sleeve, session 4 of 5 · $240 held in the deposit pool',
          '11:00 · Mara · Jo K. · Consult, fine-line florals · $100 deposit paid',
          '1:30 · Dev · Elena R. · Back piece, session 2 of 3 · red ink allergy flagged',
          '4:30 · Mara · Sam T. · Touch-up, forearm script · consent signed',
        ],
      },
      {
        type: 'h3',
        text: 'The numbers across the top',
      },
      {
        type: 'p',
        text: "Above the list sit the numbers that matter this morning: revenue, bookings, deposits pending and, on Studio and up, commissions owed. The idea is a four-second glance. If deposits pending is climbing, deal with those before anything else. If the week has gaps, that's the cue to work the waitlist.",
      },
      {
        type: 'h3',
        text: 'The allergy flag',
      },
      {
        type: 'p',
        text: "Allergy near-misses tend to happen at moments of change: a client mentions a red ink reaction on their intake form, the studio switches ink brands, and the note sits three taps deep in a tab nobody opens. That's why, in Limespun, a client with a noted allergy gets a flag on every booking, not a buried note in a tab. It's the first thing you see when you open the booking.",
      },
      {
        type: 'callout',
        tone: 'amber',
        text: "Note the allergy once on the client record and it shows on every booking after that. No copying it into each appointment.",
      },
      {
        type: 'h3',
        text: 'Project pulse in 30 seconds',
      },
      {
        type: 'p',
        text: "For the owner, the Project pulse panel on Today lists multi-session projects by status: planning, active, healing, on hold. It's the catch-all for the things that fall through the cracks in a busy studio: the sleeve waiting on its next session, the back piece that's healing and due a photo.",
      },
      {
        type: 'h3',
        text: 'Building the habit',
      },
      {
        type: 'p',
        text: "The 90-second triage only works if the data going in is clean. That means consent forms signed before arrival, deposits requested at booking (not chased later), and artists adding their healed photos. The discipline is a studio culture question as much as a software question. Limespun makes it easier, but someone still has to decide it matters.",
      },
      {
        type: 'callout',
        tone: 'rust',
        text: "Today, Project pulse and allergy flags are on every plan, Solo included. Commissions owed appears from Studio, where artist splits start.",
      },
      {
        type: 'p',
        text: "To set this up for your studio, create an account. There's no free trial; you get a 30-day money-back guarantee, and we move your existing clients and bookings over for you.",
      },
    ],
  },
  {
    slug: "deposit-pools-vs-per-booking-deposits",
    title: "Deposit pools vs per-booking deposits: a comparison",
    excerpt:
      "Why holding the deposit on the project (not the session) ends the Friday afternoon reconciling.",
    publishedAt: "2026-04-08",
    readTime: "8 min",
    author: { name: "The Limespun team", role: "Limespun" },
    category: "product",
    gradient: `linear-gradient(135deg, ${BRAND.amber} 0%, ${BRAND.sage} 100%)`,
    content: [
      {
        type: 'h2',
        text: "The reconciliation problem nobody talks about until it's 5pm on Friday.",
      },
      {
        type: 'p',
        text: "Most booking software attaches a deposit to a session. You book three sessions for a sleeve, you collect three deposits. Straightforward on the way in, painful on the way out, because now you have three separate payment records to reconcile against one project that the client thinks of as a single piece of work.",
      },
      {
        type: 'h3',
        text: 'How per-session deposits create Friday problems',
      },
      {
        type: 'p',
        text: "Consider a realistic sleeve project: six sessions at $200 each, with a 25% deposit per session. That's six $50 deposits collected at six different points: some by card, some by bank transfer, possibly by two different artists if the project changed hands mid-sleeve. By session four, the client is asking 'how much have I paid so far?' and you're opening your card processor, your bank statement and a notes app to piece it together.",
      },
      {
        type: 'ul',
        items: [
          'Session 1 deposit: $50 by card, Jan 14',
          'Session 2 deposit: $50 by bank transfer, Jan 28 (client paid manually)',
          'Session 3 deposit: $50 by card, Feb 12',
          'Session 4: artist was sick, rescheduled. Was this deposit carried forward or charged again?',
          'Session 5 deposit: $50 by card, Mar 3',
          'Session 6: not booked yet',
        ],
      },
      {
        type: 'p',
        text: 'Total held: somewhere between $200 and $250. Time to figure it out: 20 minutes on a Friday afternoon when you should be wrapping up for the weekend.',
      },
      {
        type: 'h3',
        text: 'The deposit pool model',
      },
      {
        type: 'p',
        text: "A deposit pool attaches to the project, not the session. When a client books a sleeve with Limespun, you take a project deposit, say $150, roughly one session's value. That amount is held against the whole project. Each session then draws from the pool as it's paid. If the client reschedules session 4, the deposit doesn't move. It stays in the pool until it's applied or refunded.",
      },
      {
        type: 'code',
        lang: 'text',
        text: `Project: Left arm sleeve
Deposit pool: $150 paid in
─────────────────────────────────────
Session 1  Jan 14  $200  $150 applied from pool   $50 paid
Session 2  Jan 28  $200  pool empty               $200 paid
Session 3  Feb 12  $200  pool empty               $200 paid
Session 4  —       rescheduled, pool unchanged
─────────────────────────────────────
Available in pool: $0
Total received to date: $600`,
      },
      {
        type: 'h3',
        text: 'How Limespun compares to Mangomint and DaySmart',
      },
      {
        type: 'p',
        text: "Mangomint publishes card-on-file collection and DaySmart Body Art publishes online deposits; neither describes a deposit that follows a multi-session piece (their public pages, checked September 22, 2026). Limespun's deposit pool does that for you: when a session is paid, the pool is checked first, whatever is available is applied, and the rest is the balance due. The project shows what's been paid in, applied, still available and refundable.",
      },
      {
        type: 'h3',
        text: 'Partial refunds and cancellations',
      },
      {
        type: 'p',
        text: "The edge case every studio worries about: the client cancels mid-project. With per-session deposits, you have a dispute over which sessions were 'used' and which deposits should be returned. With a pool, the project shows what's refundable at any point, and your booking policies set what you keep on a late cancel.",
      },
      {
        type: 'callout',
        tone: 'sage',
        text: "Deposit pools are on every plan, alongside per-session deposits for studios that prefer that model.",
      },
      {
        type: 'p',
        text: "The deposit pool model won't fit every studio. If you do mostly single-session walk-ins, per-booking deposits are simpler. But if you run projects longer than two sessions, the reconciliation time saved alone is worth the switch. Create an account to set up your first project; we move the deposits you're holding over for you.",
      },
    ],
  },
  {
    slug: "eu-reach-2022-what-tattoo-studios-need-to-know",
    title: "EU REACH 2022: what tattoo studios need to know",
    excerpt:
      "A plain checklist for the EU REACH restriction on tattoo inks: ingredient lists, safety data sheets, batch records and reactions, and what Limespun keeps for you.",
    publishedAt: "2026-04-01",
    readTime: "10 min",
    author: { name: "The Limespun team", role: "Limespun" },
    category: "compliance",
    gradient: `linear-gradient(135deg, ${BRAND.sage} 0%, ${BRAND.amber} 100%)`,
    content: [
      {
        type: 'h2',
        text: 'What changed in January 2022, and what it means at the station.',
      },
      {
        type: 'p',
        text: "The EU REACH restriction on tattoo inks (Annex XVII, entry 75) has been in force since January 4, 2022. It restricts a long list of substances in inks used for tattooing and permanent makeup, and the paperwork on the studio side is real, even if you're not the one formulating the ink.",
      },
      {
        type: 'h3',
        text: 'Know what is in every color',
      },
      {
        type: 'p',
        text: "Compliant inks carry an ingredient list on the label. Ask your supplier for the full ingredient list for every color, including each pigment's CI (Color Index) number. If a supplier can't tell you what's in a color, don't use it, however long you've used it.",
      },
      {
        type: 'ul',
        items: [
          'Request a full ingredient breakdown from your supplier, not just the safety data sheet',
          'Cross-reference it against the restricted substances list in Annex XVII, entry 75',
          'Flag any ink where the supplier cannot confirm the absence of restricted amines, PAHs or heavy metals above the concentration limits',
          "Don't assume a brand is compliant because it was compliant before January 2022; reformulations happen and relabeling lags",
        ],
      },
      {
        type: 'h3',
        text: 'Safety data sheets: what to check',
      },
      {
        type: 'p',
        text: "A safety data sheet (SDS) follows a 16-section format. For tattoo ink, look at section 3 (composition: the ingredients and their identifiers), section 11 (toxicological information) and section 15 (regulatory information, where REACH is referenced).",
      },
      {
        type: 'callout',
        tone: 'sage',
        text: "Keep safety data sheets where you can find them fast, not in a folder under the counter. In Limespun, the Ink registry in Settings holds each ink's brand, color, product code, batch number and REACH status, so the record is one screen away.",
      },
      {
        type: 'h3',
        text: 'Batch records in practice',
      },
      {
        type: 'p',
        text: "A batch record means knowing which batch of which ink went into each client. It sounds like administrative overhead until a supplier issues a batch recall. With a batch record, you can find the clients who received ink from that batch and contact them. Without it, you're hoping nothing goes wrong.",
      },
      {
        type: 'p',
        text: "In Limespun, each ink in the Ink registry carries its batch number, and the REACH ink disclosure section on the consent form puts the ink details in front of the client when they sign. Limespun doesn't match recalls for you: keep your supplier's notices and check them against the registry.",
      },
      {
        type: 'h3',
        text: 'Reaction logging',
      },
      {
        type: 'p',
        text: "Serious reactions to tattoo ink are worth reporting to your supplier and, where your country runs one, to the national reporting scheme. The bar for your own records should be lower. Log everything. A client who mentions unusual redness at week three is worth noting, even if it resolves.",
      },
      {
        type: 'ul',
        items: [
          'Date of the reaction report',
          'Ink and batch used in the session',
          'Body location',
          "Description of the reaction (the client's own words)",
          'Resolution, or referral to a doctor or dermatologist',
          'Whether the reaction was reported to the ink supplier',
        ],
      },
      {
        type: 'h3',
        text: 'Enforcement varies by country',
      },
      {
        type: 'p',
        text: "Enforcement across EU member states has been uneven. Don't mistake slow enforcement for no enforcement: the liability is yours when a client has a reaction and asks what was in the ink.",
      },
      {
        type: 'h3',
        text: 'Ready for an inspection',
      },
      {
        type: 'p',
        text: "Being ready for an inspection doesn't mean having perfect paperwork. It means being able to produce the right record quickly: the safety data sheet for an ink in use, which ink and batch went into a given session, and proof the client was told what was in it.",
      },
      {
        type: 'callout',
        tone: 'rust',
        text: "In Limespun, EU REACH ink tracking is on every plan, Solo included: the Ink registry in Settings, a REACH-registered count on Inventory and a REACH ink disclosure section for your consent form. Allergies noted on the client record show on every booking.",
      },
      {
        type: 'p',
        text: "The ink record is the least glamorous part of Limespun and the one that matters most when things go wrong. Create an account and register your inks in Settings, or send us your ink list and we'll move it over as part of migration.",
      },
    ],
  },
  {
    slug: "guest-residency-bookings-that-actually-work",
    title: "Guest residency bookings that actually work",
    excerpt:
      "How to run a guest spot without a spreadsheet: dates, a booking link and the split, set once.",
    publishedAt: "2026-03-25",
    readTime: "4 min",
    author: { name: "The Limespun team", role: "Limespun" },
    category: "ops",
    gradient: `linear-gradient(135deg, ${BRAND.amber} 0%, ${BRAND.rust} 100%)`,
    content: [
      {
        type: 'h2',
        text: 'A busy guest calendar used to mean a round of setup for every residency.',
      },
      {
        type: 'p',
        text: "Studios that host guest artists regularly know the manual routine: make a temporary booking link, email it to the guest, watch their calendar so nothing double-books, chase the split at the end of the week, then archive everything. Multiply that by ten or more guest spots a year and it's a part-time job.",
      },
      {
        type: 'h3',
        text: 'Set it up once',
      },
      {
        type: 'p',
        text: "In Limespun, a guest artist gets their own dates, booking link and split. Add the guest, set the dates of the guest spot and the split, and send them the link. Their access ends when the guest spot does.",
      },
      {
        type: 'ul',
        items: [
          'Add the guest artist to your team',
          'Set the dates of the guest spot',
          'Set the split, 70/30 for example',
          'Share their booking link',
        ],
      },
      {
        type: 'h3',
        text: 'One calendar, the same clash checks',
      },
      {
        type: 'p',
        text: "Guest artists are prolific bookers, which is great for revenue and occasionally hard on the studio's schedule. In Limespun, a guest's bookings sit on the same calendar as everyone else's, with the same clash checks, and the guest spot's dates are on the calendar for the whole team to see. When Rio's guest spot runs Oct 2–9, nobody has to ask when Rio's in.",
      },
      {
        type: 'h3',
        text: 'Settling up at the end',
      },
      {
        type: 'p',
        text: "The guest's split is worked out on each session they do, so at the end of the guest spot you can see what they took and what they're owed, without rebuilding it from a spreadsheet. Rio took $1,300 over the week; at 70/30, $910 is Rio's.",
      },
      {
        type: 'callout',
        tone: 'amber',
        text: "Guest artists are on the Pro plan and up, with unlimited guest-artist seats.",
      },
      {
        type: 'p',
        text: "If you host guests more than a few times a year, the time adds up. Guest artists are on Pro; create an account and set up your next guest spot.",
      },
    ],
  },
  {
    slug: "commission-splits-the-friday-afternoon-fix",
    title: "Commission splits: the Friday afternoon fix",
    excerpt:
      "Why paying eight artists by spreadsheet at 5pm on Friday is the most expensive bug in your studio.",
    publishedAt: "2026-03-18",
    readTime: "6 min",
    author: { name: "The Limespun team", role: "Limespun" },
    category: "ops",
    gradient: `linear-gradient(135deg, ${BRAND.rust} 0%, ${BRAND.rustDeep} 50%, ${BRAND.amber} 100%)`,
    content: [
      {
        type: 'h2',
        text: 'Every Friday at 4:45pm, the studio owner becomes a part-time accountant.',
      },
      {
        type: 'p',
        text: "Picture a studio with eight resident artists on different arrangements: some on 50/50, two senior artists on 60/40, one renting a booth by the week. Run pay by spreadsheet and Friday afternoon becomes the most stressful two hours of the week: pulling session data, applying the right rate for each artist, and sending eight bank transfers before people leave for the weekend.",
      },
      {
        type: 'h3',
        text: 'The real cost of manual commission',
      },
      {
        type: 'p',
        text: "Two hours of owner time, every week. At a conservative $50 an hour, that's $100 a week, or $5,200 a year. Then add the errors. One wrong rate applied to one payout means a correction, an awkward conversation and a dent in trust with an artist you want to keep.",
      },
      {
        type: 'ul',
        items: [
          '$5,200 a year in owner time, at two hours a week and $50 an hour',
          'Every manual calculation is a chance to apply the wrong rate',
          'Every correction costs time, and a conversation nobody enjoys',
          'Pay disputes are a real artist-retention risk',
        ],
      },
      {
        type: 'h3',
        text: 'How splits work in Limespun',
      },
      {
        type: 'p',
        text: "Each artist has their own arrangement: a commission split for residents, or weekly booth rent for renters. As sessions are paid, Limespun works out each artist's share, and Today shows the commissions owed. There's no rebuilding the week from bank statements on Friday.",
      },
      {
        type: 'code',
        lang: 'text',
        text: `Session: chest piece, $320
Artist: Dev · 60% commission
─────────────────────────────────
Dev's share:    $192 (60%)
Studio keeps:   $128 (40%)
─────────────────────────────────
Added to Commissions owed on Today`,
      },
      {
        type: 'h3',
        text: 'A rate for each artist',
      },
      {
        type: 'p',
        text: "Each artist in Limespun has their own split. A senior artist on a negotiated rate has their own number; there's no global setting that quietly applies the wrong rate to everyone.",
      },
      {
        type: 'p',
        text: "Artists see their own earnings and what they're owed on their Today screen as the week goes, instead of waiting until Friday to find out. Fewer questions for the owner, fewer surprises for the artist.",
      },
      {
        type: 'h3',
        text: 'Booth renters too',
      },
      {
        type: 'p',
        text: "Booth renters pay rent instead of a split. In the Sample studio, Mara took $2,910 this week; her $250 booth rent comes off, and $2,660 is what she's owed.",
      },
      {
        type: 'h3',
        text: 'What Friday looks like now',
      },
      {
        type: 'p',
        text: "With splits worked out as sessions are paid, Friday at 4:45pm becomes a glance at who's owed what. The breakdown for any artist is on the Commissions tab in Payments.",
      },
      {
        type: 'callout',
        tone: 'rust',
        text: "Payroll and 1099s are on Pro: at year end, each artist's totals are ready for their 1099.",
      },
      {
        type: 'p',
        text: "Commission and booth-rent splits are on Studio and up; payroll and 1099s are on Pro. If you have more than a couple of resident artists, the time saved is likely to outweigh the plan cost.",
      },
    ],
  },
  {
    slug: "the-photo-timeline-as-a-portfolio",
    title: "The photo timeline as a portfolio: reference, fresh, healed",
    excerpt:
      "The photo record that turns ten weeks of one sleeve into the most useful post you've ever made.",
    publishedAt: "2026-03-11",
    readTime: "4 min",
    author: { name: "The Limespun team", role: "Limespun" },
    category: "craft",
    gradient: `linear-gradient(135deg, ${BRAND.sage} 0%, ${BRAND.rustGlow} 100%)`,
    content: [
      {
        type: 'h2',
        text: 'The healed photo is the only photo that matters. Most studios never get it.',
      },
      {
        type: 'p',
        text: "Every tattoo artist knows the problem. You do exceptional work. The fresh photo looks good. The client goes home, heals, falls in love with the piece, and never sends you a healed photo. Your portfolio is full of fresh work that doesn't show how your tattoos actually look. The photo timeline on every Limespun project is built to close that gap.",
      },
      {
        type: 'h3',
        text: 'References',
      },
      {
        type: 'p',
        text: "References are where the client's inspiration photos, placement sketches and style references live, on the project. They stay private: nothing on a project is public unless you put it in your portfolio. The stencil gets its own slot too, so the agreed design sits next to the references.",
      },
      {
        type: 'h3',
        text: 'Fresh: right off the machine',
      },
      {
        type: 'p',
        text: "Fresh photos go on the session they came from, taken at the end of each session before wrapping. Across a six-session sleeve, that's the build-up of a complex piece, in order.",
      },
      {
        type: 'h3',
        text: 'Healed: the two-week check',
      },
      {
        type: 'p',
        text: "The healed photo is the most often skipped and the most useful. Photos taken two to three weeks after a session show how the ink is settling: uneven healing, ink loss in one area, or a detail that needs a touch-up. In Limespun, each session's healed photo is due 14 days after the session, so the timeline shows which ones are still missing.",
      },
      {
        type: 'callout',
        tone: 'sage',
        text: "Healed photos also help if a client later reports a reaction: they show the tattoo's condition at two weeks, which is useful context for anyone looking into it.",
      },
      {
        type: 'h3',
        text: 'Final healed: the portfolio shot',
      },
      {
        type: 'p',
        text: "The final healed photo is the one for your portfolio. In Limespun you choose which healed photos go into your portfolio; nothing is published automatically.",
      },
      {
        type: 'h3',
        text: 'Finding the photo later',
      },
      {
        type: 'p',
        text: "Photos on a project are filed by session and slot, so the healed forearm piece from last October is on its project, not somewhere in your camera roll.",
      },
      {
        type: 'ul',
        items: [
          'Photos filed by project, session and slot',
          'Healed photos due 14 days after each session',
          'You choose what goes into your portfolio',
        ],
      },
      {
        type: 'callout',
        tone: 'amber',
        text: "The photo timeline is on every Limespun plan, Solo included, on every project.",
      },
      {
        type: 'p',
        text: "The best portfolio you can build is your actual healed work. The photo timeline makes that systematic rather than accidental.",
      },
    ],
  },
];

export const categoryLabels: Record<BlogPost["category"], string> = {
  ops: "Studio operations",
  compliance: "Compliance",
  craft: "Craft",
  product: "Product",
};
