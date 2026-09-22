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

export const blogPosts: BlogPost[] = [
  {
    slug: "the-90-second-morning-triage",
    title: "The 90-second morning triage that runs a tattoo studio",
    excerpt:
      "How a tattoo studio can open the shop in 90 seconds — and why it so often takes forty minutes instead.",
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
        text: 'For a lot of studio owners, the morning goes like this: unlock the door, make coffee, open four browser tabs, check the booking spreadsheet, check the WhatsApp group, text the artist who has a 10am, discover the 10am messaged at 11pm to reschedule, panic. Forty minutes gone before anyone picks up a machine.',
      },
      {
        type: 'h3',
        text: 'The Today screen does one job',
      },
      {
        type: 'p',
        text: "The Today screen in Limespun is deliberately narrow. It shows today's confirmed appointments in time order, the artist assigned to each, the deposit status, and one line of project context — the body location and approximate size. That's it. No three-month calendar. No unread message count. Just today.",
      },
      {
        type: 'ul',
        items: [
          '09:00 — Kezia H. · Left forearm sleeve, session 3 of 6 · £150 deposit received',
          '11:30 — Marcus D. · Custom chest piece consult · No deposit yet — reminder sent',
          '14:00 — Priya S. · Touch-up, 30 min · Pre-paid in full',
          '16:30 — Walk-in block · Held for same-day bookings',
        ],
      },
      {
        type: 'h3',
        text: 'KPIs on the cover strip',
      },
      {
        type: 'p',
        text: "Above the appointment list, three numbers: today's projected revenue, the fill rate for this week, and the number of outstanding deposit requests. The idea is a four-second glance. If the fill rate is under 70% and it's Monday, that's the cue to push the waitlist. If outstanding deposits is above three, deal with those before anything else.",
      },
      {
        type: 'h3',
        text: 'The allergy banner',
      },
      {
        type: 'p',
        text: "Allergy near-misses tend to happen at moments of change: a client documents a nickel sensitivity on their intake form, the studio switches ink brands, and the note sits three taps deep in a tab nobody opens. That's why, in Limespun, any client with a documented allergy or skin sensitivity gets a persistent amber banner on their appointment tile — not a buried note in a tab. It's the first thing you see when you tap the booking.",
      },
      {
        type: 'callout',
        tone: 'amber',
        text: "Allergy banners pull directly from the client intake form. If the client updates their medical notes through the client portal, the banner updates before their next appointment. No manual sync.",
      },
      {
        type: 'h3',
        text: 'Schedule and project pulse in 30 seconds',
      },
      {
        type: 'p',
        text: "The Project Pulse widget sits below the day view. It shows any multi-session project where the next session is within 14 days and the reference image hasn't been approved yet, or the healed photo from the previous session is missing. This is the catch-all for the things that fall through the cracks in a busy studio.",
      },
      {
        type: 'h3',
        text: 'Building the habit',
      },
      {
        type: 'p',
        text: "The 90-second triage only works if the data going in is clean. That means client intake forms completed before arrival, deposits requested at booking (not chased later), and artists logging their healed photos. The discipline is a studio culture question as much as a software question. Limespun makes it easy — but someone still has to decide it matters.",
      },
      {
        type: 'callout',
        tone: 'rust',
        text: "The Today screen is available on every plan. The Project Pulse widget and allergy banner system are included in Studio and above.",
      },
      {
        type: 'p',
        text: "If you want to see what the morning triage looks like for a four-artist studio, the Limespun demo environment has a pre-loaded week with realistic data. Try it at app.limespun.com/signup — no credit card needed.",
      },
    ],
  },
  {
    slug: "deposit-pools-vs-per-booking-deposits",
    title: "Deposit pools vs per-booking deposits: a comparison",
    excerpt:
      "Why pooling deposits per project (not per session) eliminates Friday afternoon reconciling.",
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
        text: "Most booking software attaches a deposit to a session. You book three sessions for a sleeve, you collect three deposits. Straightforward on the way in, painful on the way out — because now you have three separate payment records to reconcile against one project that the client thinks of as a single piece of work.",
      },
      {
        type: 'h3',
        text: 'How per-session deposits create Friday problems',
      },
      {
        type: 'p',
        text: "Consider a realistic sleeve project: six sessions at £200 each, with a 25% deposit per session. That's six £50 deposits collected at six different points — some by card, some by bank transfer, possibly by two different artists if the project handed off mid-sleeve. By session four, the client is asking 'how much have I paid so far?' and you're opening Stripe, your bank statement, and a notes app to piece it together.",
      },
      {
        type: 'ul',
        items: [
          'Session 1 deposit: £50 via Stripe, 14 Jan',
          'Session 2 deposit: £50 via bank transfer, 28 Jan (client paid manually)',
          'Session 3 deposit: £50 via Stripe, 12 Feb',
          'Session 4: artist was sick, rescheduled — was this deposit carried forward or re-charged?',
          'Session 5 deposit: £50 via Stripe, 3 Mar',
          'Session 6: not booked yet',
        ],
      },
      {
        type: 'p',
        text: 'Total held: somewhere between £200 and £250. Time to figure it out: 20 minutes on a Friday afternoon when you should be wrapping for the weekend.',
      },
      {
        type: 'h3',
        text: 'The deposit pool model',
      },
      {
        type: 'p',
        text: "A deposit pool attaches to the project, not the session. When a client books a sleeve with Limespun, you set a project deposit — say £150, which represents roughly one session's value. That amount is held against the entire project. Each session then draws down from the pool as work is completed and invoiced. If the client reschedules session 4, the deposit doesn't move. It stays in the pool until the project closes.",
      },
      {
        type: 'code',
        lang: 'text',
        text: `Project: Left arm sleeve — Kezia H.
Project deposit: £150 (held)
─────────────────────────────────────
Session 1  14 Jan  £200  invoiced  £150 deposit applied  balance £50 paid
Session 2  28 Jan  £200  invoiced  no deposit left        £200 paid in full
Session 3  12 Feb  £200  invoiced  no deposit left        £200 paid in full
Session 4  —       rescheduled    no change to deposit pool
─────────────────────────────────────
Deposit remaining in pool: £0
Total received to date: £550`,
      },
      {
        type: 'h3',
        text: 'How Limespun compares to Mangomint and DaySmart',
      },
      {
        type: 'p',
        text: "Mangomint handles deposits per appointment — standard for salons, but tattoo studios work in projects that span months. DaySmart has a client balance feature, but it's manual: you top it up, you draw it down, you reconcile it yourself. Limespun's deposit pool is automatic. When you mark a session as complete and issue the session invoice, the system checks the project pool first, applies whatever is available, and generates a balance-due amount for the remainder.",
      },
      {
        type: 'quote',
        text: "We went from spending 45 minutes every Friday on deposit reconciliation to zero. The pool just closes itself when the project invoices clear.",
        attribution: "Studio owner, Leeds",
      },
      {
        type: 'h3',
        text: 'Partial refunds and cancellations',
      },
      {
        type: 'p',
        text: "The edge case every studio worries about: client cancels mid-project. With per-session deposits, you have a dispute over which sessions were 'used' and which deposits should be returned. With a pool, the rules are set at the project level — you define your cancellation policy once (e.g., pool is non-refundable after session 1 has been completed), and the system flags the refundable amount automatically.",
      },
      {
        type: 'callout',
        tone: 'sage',
        text: "Deposit pools are available on every plan, alongside per-session deposits for studios that prefer that model.",
      },
      {
        type: 'p',
        text: "The deposit pool model won't fit every studio — if you do mostly single-session walk-ins, per-booking deposits are simpler. But if you run projects longer than two sessions, the reconciliation time savings alone justify switching. See how it works in Limespun at app.limespun.com/signup.",
      },
    ],
  },
  {
    slug: "eu-reach-2022-what-tattoo-studios-need-to-know",
    title: "EU REACH 2022: what tattoo studios need to know",
    excerpt:
      "The complete compliance checklist. CI numbers, MSDS, batch tracking, reaction logging — what's required and what's optional.",
    publishedAt: "2026-04-01",
    readTime: "12 min",
    author: { name: "The Limespun team", role: "Limespun" },
    category: "compliance",
    gradient: `linear-gradient(135deg, ${BRAND.sage} 0%, ${BRAND.amber} 100%)`,
    content: [
      {
        type: 'h2',
        text: 'What changed in January 2022 — and why the enforcement wave is still coming.',
      },
      {
        type: 'p',
        text: "The EU REACH Annex XVII restriction on tattoo inks came into force on 4 January 2022. A year later, the UK followed with its own aligned restriction under UK REACH. The rules ban or restrict hundreds of substances in inks used for permanent makeup and tattooing — and the paperwork burden on studios is real, even if you're not the one formulating the ink.",
      },
      {
        type: 'h3',
        text: 'The CI number requirement',
      },
      {
        type: 'p',
        text: "Every pigment in a compliant tattoo ink must be identified by its Colour Index (CI) number on the label and in the Safety Data Sheet. CI numbers follow the format CI 77891 (titanium dioxide white) or CI 74160 (phthalocyanine blue). If your ink supplier cannot provide a full CI listing for every pigment in a colour, that ink does not meet the restriction — regardless of how long you've used it.",
      },
      {
        type: 'ul',
        items: [
          'Request a full CI breakdown from your supplier — not just the SDS, but the formulation disclosure',
          'Cross-reference against the restricted substances list in Annex XVII Entry 75',
          'Flag any ink where the supplier cannot confirm the absence of restricted amines, PAHs, or heavy metals above the concentration limits',
          'Do not assume a brand is compliant because it was compliant before January 2022 — reformulations happen and relabelling lags',
        ],
      },
      {
        type: 'h3',
        text: 'MSDS — what the sheet must contain',
      },
      {
        type: 'p',
        text: "A compliant Safety Data Sheet (or SDS under GHS) for a tattoo ink must include a 16-section structure, with section 3 listing all ingredients above 0.1% concentration with their CI or CAS numbers, section 11 covering toxicological information specific to dermal exposure, and section 15 explicitly referencing REACH compliance and any Article 33 disclosure obligations for SVHCs.",
      },
      {
        type: 'callout',
        tone: 'sage',
        text: "Store SDS documents digitally, not in a folder under the counter. Limespun attaches SDS files to product records — when you log a batch, the SDS is already linked. If an inspector asks, you can pull it up in 20 seconds.",
      },
      {
        type: 'h3',
        text: 'Batch tracking in practice',
      },
      {
        type: 'p',
        text: "Batch tracking means recording the batch number from the ink bottle used in each tattoo session. This sounds like administrative overhead until a supplier issues a batch recall — which does happen in the EU market. With a batch log, you can identify which clients received ink from the recalled batch and contact them. Without it, you're hoping nothing goes wrong.",
      },
      {
        type: 'p',
        text: "In Limespun, batch tracking is done at the session level. When you start a session, you log the inks used and their batch numbers. The system cross-references those batches against any supplier recall notices you've imported. If there's a match, the affected client records are flagged automatically.",
      },
      {
        type: 'h3',
        text: 'Reaction logging',
      },
      {
        type: 'p',
        text: "Under REACH and the EU Medical Device Regulation cross-reference obligations, serious adverse reactions to tattoo inks should be reported. The threshold is 'serious' — prolonged swelling, granuloma formation, systemic reactions — but the bar for your own records should be lower. Log everything. A client who mentions unusual redness at week three is worth noting, even if it resolves.",
      },
      {
        type: 'ul',
        items: [
          'Date of reaction report',
          'Ink batch numbers used in the session',
          'Body location',
          "Description of reaction (client's own words)",
          'Resolution or referral to GP / dermatologist',
          'Whether the reaction was reported to the ink supplier',
        ],
      },
      {
        type: 'h3',
        text: 'UK REACH — same rules, different enforcement',
      },
      {
        type: 'p',
        text: "UK REACH mirrors the EU restriction but is enforced by the Health and Safety Executive rather than national market surveillance authorities. In practice, enforcement in both the EU and UK has been uneven — several member states have been slow to prosecute studios using non-compliant ink. Do not mistake slow enforcement for no enforcement. The liability is yours when a client has a reaction and asks what was in the ink.",
      },
      {
        type: 'h3',
        text: 'Inspector-ready in practice',
      },
      {
        type: 'p',
        text: "Being inspector-ready doesn't mean having perfect paperwork — it means being able to produce the right document for any question in under a minute. The three documents inspectors most commonly request: the SDS for an ink currently in use, the batch log for a specific date's session, and evidence of allergen disclosure in client intake. If you can pull all three in under three minutes, you're in good shape.",
      },
      {
        type: 'callout',
        tone: 'rust',
        text: "Limespun compliance features — SDS library, batch tracking, reaction log, and client allergen record — are available on every plan. The compliance dashboard gives you a one-screen view of any gaps: inks without SDS on file, sessions with missing batch numbers, and clients with undisclosed allergy status.",
      },
      {
        type: 'p',
        text: "The compliance module is the least glamorous part of Limespun and the one that matters most when things go wrong. Get started at app.limespun.com/signup and import your existing ink inventory in under 10 minutes.",
      },
    ],
  },
  {
    slug: "guest-residency-bookings-that-actually-work",
    title: "Guest residency bookings that actually work",
    excerpt:
      "How to run a guest residency on a 12-minute setup — and zero spreadsheets.",
    publishedAt: "2026-03-25",
    readTime: "5 min",
    author: { name: "The Limespun team", role: "Limespun" },
    category: "ops",
    gradient: `linear-gradient(135deg, ${BRAND.amber} 0%, ${BRAND.rust} 100%)`,
    content: [
      {
        type: 'h2',
        text: 'A busy guest calendar used to mean a round of setup hell for every residency.',
      },
      {
        type: 'p',
        text: "Studios that host guest artists regularly know the manual routine: create a temporary booking link, email it to the guest, monitor their calendar so double-bookings didn't happen, chase the deposit split at the end of the week, then archive everything. Multiply that by ten or more residencies a year and it's a part-time job.",
      },
      {
        type: 'h3',
        text: 'The 12-minute setup',
      },
      {
        type: 'p',
        text: "In Limespun, a guest residency is a first-class object. You create a residency record, set the dates, assign a station, and define the terms — how many days, what the studio's commission rate is, whether the guest brings their own products or uses house stock. The system generates a guest booking page with a slug in the format yourstudio.limespun.com/guest/[artist-handle]. That page is the only thing you send to the guest artist.",
      },
      {
        type: 'ul',
        items: [
          'Set residency dates and station — 2 minutes',
          'Configure commission split (default 60/40 or custom) — 1 minute',
          'Add guest artist profile and send them the slug — 3 minutes',
          'Set booking window: how far in advance clients can book — 1 minute',
          'Review and publish — 5 minutes',
        ],
      },
      {
        type: 'h3',
        text: 'Time-boxing and buffer management',
      },
      {
        type: 'p',
        text: "Guest artists are prolific bookers — which is great for revenue and occasionally terrible for the studio's master schedule. Limespun's residency booking page respects two hard limits: the end date of the residency (no bookings beyond it, ever), and the daily capacity limit you set. If Mara is doing a four-day residency and you've set a max of three bookings per day, the system closes the fourth slot automatically, regardless of what the guest artist does in their own calendar app.",
      },
      {
        type: 'h3',
        text: 'The email approval flow',
      },
      {
        type: 'p',
        text: "For high-volume or well-known guest artists, you can switch on the optional approval step: new booking requests go into a pending queue rather than auto-confirming. The guest artist gets an email with the client's brief and can approve or decline from their phone without logging in. Approved bookings auto-confirm to the client, declined bookings trigger a polite waiting-list message.",
      },
      {
        type: 'p',
        text: "This matters for guest artists who have a specific style or body-of-work niche — they don't want to arrive for a four-day residency and find three walk-in flash requests when they came to do large-scale Japanese work. The approval step puts that curation back in their hands.",
      },
      {
        type: 'h3',
        text: 'Commission settlement at close',
      },
      {
        type: 'p',
        text: "At the end of the residency, Limespun generates a settlement summary: total revenue taken, studio commission, guest artist net, any product charges if they used house stock. One PDF, one bank transfer. No spreadsheet, no arguments about which session counts which way.",
      },
      {
        type: 'callout',
        tone: 'amber',
        text: "Guest residency management is available on the Pro plan and up, with unlimited guest-artist seats.",
      },
      {
        type: 'p',
        text: "If you're running more than four guest residencies a year and still managing them manually, the time cost is measurable. The residency module is live on Pro — get started at app.limespun.com/signup and set up your next one in 12 minutes.",
      },
    ],
  },
  {
    slug: "commission-splits-the-friday-afternoon-fix",
    title: "Commission splits: the Friday afternoon fix",
    excerpt:
      "Why eight artists getting paid by spreadsheet at 5pm Friday is the most expensive bug in your studio.",
    publishedAt: "2026-03-18",
    readTime: "7 min",
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
        text: "Picture a studio with eight resident artists on varying commission structures — some on 50/50, two senior artists on 60/40, one on a flat weekly rate plus 40%. Run payroll by spreadsheet and Friday afternoon becomes the most stressful two hours of the week: manually pulling session data, applying the right rate for each artist, subtracting product charges, and sending eight individual bank transfers before people leave for the weekend.",
      },
      {
        type: 'h3',
        text: 'The real cost of manual commission',
      },
      {
        type: 'p',
        text: "Two hours of owner time, every week. At a conservative £50/hour opportunity cost, that's £100/week — £5,200/year. Then add the errors. One wrong rate applied to one payout means a correction, an awkward conversation, and a dent in trust with an artist you want to keep.",
      },
      {
        type: 'ul',
        items: [
          '£5,200/year in owner time, at two hours a week and £50/hour',
          'Every manual calculation is a chance to apply the wrong rate',
          'Every correction costs time — and a conversation nobody enjoys',
          'Payroll disputes are a real artist-retention risk',
        ],
      },
      {
        type: 'h3',
        text: 'How Stripe Connect routing works in Limespun',
      },
      {
        type: 'p',
        text: "Limespun uses Stripe Connect to route payments at source. When a client pays for a session, the payment is split before it settles: the studio's commission goes to the studio Stripe account, the artist's share goes to their connected Stripe account. There is no 'collect everything then pay out' step. The money moves correctly the moment the transaction completes.",
      },
      {
        type: 'code',
        lang: 'text',
        text: `Session: chest piece, £320
Artist: Juno Park · 60/40 split
Product charge: £18 (house ink)
─────────────────────────────────
Studio receives:  £128 (40%) + £18 product = £146
Juno receives:    £192 (60%)
Stripe fee:       £7.94 (deducted from studio share)
─────────────────────────────────
Settlement: instant on payment completion`,
      },
      {
        type: 'h3',
        text: 'Per-artist commission profiles',
      },
      {
        type: 'p',
        text: "Each artist in Limespun has a commission profile: a default split, an optional product charge method (flat fee, percentage of session, or none), and a settlement schedule (instant, weekly, or monthly). Senior artists who have negotiated a custom rate have their own profile — no global setting that accidentally applies the wrong rate.",
      },
      {
        type: 'p',
        text: "Because splits are calculated per transaction, artists can see their earnings as the week goes, instead of waiting until Friday to find out what they made. Fewer questions for the owner, fewer surprises for the artist.",
      },
      {
        type: 'h3',
        text: 'Product charges and house stock',
      },
      {
        type: 'p',
        text: "If your studio supplies ink, gloves, and consumables and deducts a product charge from artist payouts, Limespun handles this as a line item in the commission calculation rather than a separate manual deduction. Set a flat session charge (e.g., £15 per session for consumables) or a percentage of session revenue. The deduction is visible to the artist on their payout summary.",
      },
      {
        type: 'h3',
        text: 'What Friday looks like now',
      },
      {
        type: 'p',
        text: "With routing at source, Friday at 4:45pm becomes a glance at the weekly payout summary to confirm nothing looks anomalous. The payments have already been routing all week, and the breakdown for any artist is two taps away if you want it.",
      },
      {
        type: 'callout',
        tone: 'rust',
        text: "Stripe Connect commission routing requires artists to complete a Stripe onboarding — typically a 5-minute process. Limespun sends the onboarding invitation automatically when you add an artist. Artists can complete it before their first session.",
      },
      {
        type: 'p',
        text: "Commission automation is available on the Studio plan and up. If you have more than three resident artists, the time saved is likely to outweigh the plan cost. Get started at app.limespun.com/signup.",
      },
    ],
  },
  {
    slug: "the-photo-timeline-as-a-portfolio",
    title: "The photo timeline as a portfolio: REF / FRESH / HEAL / HEALED",
    excerpt:
      "The four-stage record that turns ten weeks of one sleeve into the most useful Instagram you've ever posted.",
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
        text: "Every tattoo artist knows the problem. You do exceptional work. The fresh photo looks good. The client goes home, heals, falls in love with the piece — and never sends you a healed photo. Your portfolio is full of fresh work that doesn't represent how your tattoos actually look. The four-stage timeline in Limespun is designed to close that gap.",
      },
      {
        type: 'h3',
        text: 'REF — the reference record',
      },
      {
        type: 'p',
        text: "The REF stage is where the client's reference images and design brief live. When you log a new project, you attach the reference images the client brought in — inspiration photos, placement sketches, style references. This stage is visible to the artist and the client, but never public. It's the agreement about what the work should be.",
      },
      {
        type: 'h3',
        text: 'FRESH — right off the machine',
      },
      {
        type: 'p',
        text: "FRESH photos are taken at the end of each session before wrapping. Limespun's mobile app has a guided photo mode: it prompts the artist to take one wide shot and one close shot, applies consistent lighting metadata, and tags the image to the session. If the project runs across six sessions, you end up with 12 fresh photos showing the build-up of a complex piece.",
      },
      {
        type: 'h3',
        text: 'HEAL — the two-week window',
      },
      {
        type: 'p',
        text: "The HEAL stage is the most commonly skipped and the most diagnostically valuable. Photos taken at two to three weeks post-session show how the ink is settling — you can see if there's uneven healing, ink loss in specific areas, or a detail that needs a touch-up. Limespun sends the client an automated photo request at day 14: 'Your session is healing — can you send us a progress photo?'",
      },
      {
        type: 'callout',
        tone: 'sage',
        text: "HEAL-stage photos also serve a compliance function. If a client later reports an adverse reaction, the HEAL photo provides evidence of the tattoo's condition at two weeks — useful context for any investigation.",
      },
      {
        type: 'h3',
        text: 'HEALED — the portfolio shot',
      },
      {
        type: 'p',
        text: "The HEALED stage is triggered at eight to twelve weeks post-final-session. Another automated client request goes out, this time explicitly framed as a portfolio photo request: 'Your sleeve is fully healed — we'd love a photo for our gallery.' If the client consents, the healed photo flows automatically to the studio gallery in Limespun and — if you've connected your Instagram — can be queued for posting with one tap.",
      },
      {
        type: 'h3',
        text: 'Per-stage tagging and gallery management',
      },
      {
        type: 'p',
        text: "Every photo in Limespun is tagged with its stage, the session date, the body location, the style category, and the artist. When you're building an Instagram post or updating your website gallery, you can filter by stage (HEALED only), style (Japanese, fine-line, neo-traditional), and artist. No more digging through your camera roll for that one healed forearm piece from last October.",
      },
      {
        type: 'ul',
        items: [
          'Filter gallery by stage, style, body location, or artist',
          'One-tap Instagram queue from approved healed photos',
          'Client consent tracked per photo — no accidental public posts',
          'HEAL-stage photos flagged for artist review if unusual healing patterns are noted in the client notes',
        ],
      },
      {
        type: 'callout',
        tone: 'amber',
        text: "The photo timeline is available on all Limespun plans. The automated client photo requests and Instagram queue integration are Studio plan features.",
      },
      {
        type: 'p',
        text: "The best portfolio you can build is your actual healed work. The photo timeline makes that systematic rather than accidental. See it in the demo at app.limespun.com/signup.",
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
