import { BRAND } from "@/lib/brand";

export interface CustomerStorySection {
  heading: string;
  body: string;
}

export interface CustomerStoryStat {
  l: string;
  v: string;
}

export interface CustomerStory {
  slug: string;
  name: string;
  role: string;
  city: string;
  chairs: string;
  size: "solo" | "small" | "multi-chair" | "chain";
  initials: string;
  gradient: string;
  shortQuote: string;
  stats: CustomerStoryStat[];
  intro: string;
  studioBackground: string;
  preInkos: CustomerStorySection;
  migration: CustomerStorySection;
  workflowToday: CustomerStorySection;
  fullQuote: string;
  metricsCallout: string;
  similarStudios: string[];
}

export const customerStories: CustomerStory[] = [
  {
    slug: "miles-verena",
    name: "Miles Verena",
    role: "Owner · Sable & Sparrow",
    city: "Brooklyn, NY",
    chairs: "4 chairs · 6 artists",
    size: "multi-chair",
    initials: "MV",
    gradient: `linear-gradient(135deg, ${BRAND.rust} 0%, ${BRAND.rustGlow} 50%, ${BRAND.amber} 100%)`,
    shortQuote:
      "We used to lose forty minutes every morning to app-switching. Now I open Today and the schedule's loaded before my coffee.",
    stats: [
      { l: "Time recovered", v: "12 hr / wk" },
      { l: "Booking lift", v: "+22%" },
      { l: "Migration", v: "9 days" },
    ],
    intro:
      "Miles Verena opened Sable & Sparrow in 2019 with two chairs and a clear plan: build the kind of Brooklyn studio he'd always wanted to walk into.",
    studioBackground:
      "Sable & Sparrow runs four chairs and six artists in Williamsburg. Resident-only — no walk-ins, no flash. Average session is three hours, average project runs eight to twelve weeks. Black & grey realism, fine line, and large-scale traditional. By 2025 the studio was booked sixteen weeks out and Miles was spending Saturday mornings reconciling DaySmart against three Notes apps.",
    preInkos: {
      heading: "The pain",
      body: "By early 2026, the morning routine was: open DaySmart, open Stripe, open Square, open Notes (allergy log), open Notes (consent log), open Mailchimp. Forty minutes before the first client. Half the team's commission splits arrived three days late. The Tuesday Tomas's red-ink reaction got logged in the wrong Notes app, the studio was one chair away from a serious incident.",
    },
    migration: {
      heading: "The move",
      body: "Nine days from discovery call to cutover. The InkOS migration team pulled DaySmart's API, mapped six years of bookings, clients, consent, and photos, then ran a parallel week. On day nine, Miles's old DaySmart subscription cancelled. The team didn't notice the switch until the Tuesday morning huddle three days later — they just opened Today and the schedule was there.",
    },
    workflowToday: {
      heading: "Now",
      body: "Mornings open at 9:04. Today loads in three seconds: today's revenue ($8,320), bookings on the deck (26), no-show risk (3), commissions owed ($4,280). Allergy banners pulse before the chair. Project Pulse shows the back pieces in motion. Miles closes the app before the coffee finishes. Saturdays are off.",
    },
    fullQuote:
      "We used to lose forty minutes every morning to app-switching. Now I open Today and the schedule's loaded before my coffee. The first time we caught a red-ink allergy from the kiosk update before the chair, I knew we'd never go back. InkOS isn't software for tattoo — it's the studio held in one place.",
    metricsCallout:
      "12 hours per week recovered. 22% booking lift over 90 days. Zero disputes since cutover.",
    similarStudios: ["marcus-lane", "rafael-moreno"],
  },
  {
    slug: "kaia-osei",
    name: "Kaia Osei",
    role: "Solo · Nine Lives Tattoo",
    city: "East London, UK",
    chairs: "1 chair · resident-only",
    size: "solo",
    initials: "KO",
    gradient: `linear-gradient(135deg, ${BRAND.amber} 0%, ${BRAND.rustGlow} 50%, ${BRAND.rust} 100%)`,
    shortQuote:
      "My whole week starts with a six-minute triage now. Inbox sorts the urgent stuff before I've even opened the shop.",
    stats: [
      { l: "Triage time", v: "6 min" },
      { l: "Disputes won", v: "4 of 4" },
      { l: "Migration", v: "1 day" },
    ],
    intro:
      "Kaia Osei built Nine Lives Tattoo as a one-person residency in Hackney Wick — intentionally small, relentlessly precise.",
    studioBackground:
      "Nine Lives runs out of a shared studio on a canal-side building in East London. One chair, appointment-only, no guest spots. Kaia works geometric and illustrative fine line exclusively, with projects running two to six months. By late 2025 she had a four-month waitlist and was managing deposits, consent, and aftercare follow-ups across five different apps on her phone.",
    preInkos: {
      heading: "The pain",
      body: "Deposit receipts in Stripe, consent forms emailed as PDFs, session notes in a physical book, booking requests via Instagram DMs, and a Google Sheet for allergies. Kaia spent more time on admin on Sunday evenings than she spent designing on Monday mornings. A client dispute in November 2025 — over a deposit refund she couldn't prove she'd issued — cost her four hours of stress and nearly cost her a five-year client.",
    },
    migration: {
      heading: "The move",
      body: "One day. Kaia's migration was a single afternoon: InkOS imported her Google Sheet, connected her Stripe account, and pulled the last 200 DM-sourced bookings into a structured client timeline. She set up her intake form at 2 pm. By 4 pm the first automated consent request had gone out. By 6 pm she had closed all five admin apps and hadn't reopened them.",
    },
    workflowToday: {
      heading: "Now",
      body: "Monday at 8:30 am: six-minute triage. Inbox shows three new enquiries, two consent forms pending, and one aftercare check due. She replies to enquiries with a single tap using her saved intake template. Deposits land instantly. When the November dispute came up in conversation with a different client, Kaia pulled the full paper trail in twenty seconds. The dispute never got to three messages.",
    },
    fullQuote:
      "My whole week starts with a six-minute triage now. Inbox sorts the urgent stuff before I've even opened the shop. The first time a dispute came up and I pulled the full timeline in twenty seconds — I realised I'd been flying blind for three years. Solo doesn't mean disorganised anymore.",
    metricsCallout:
      "Triage cut from 40 minutes to 6. Four deposit disputes resolved in favour, all with documented proof. Migration completed in a single afternoon.",
    similarStudios: ["asha-mehra", "jonah-park"],
  },
  {
    slug: "rafael-moreno",
    name: "Rafael Moreno",
    role: "Owner · Calle Negra",
    city: "Mexico City, MX",
    chairs: "9 artists · 2 floors",
    size: "chain",
    initials: "RM",
    gradient: `linear-gradient(135deg, ${BRAND.sage} 0%, ${BRAND.amber} 50%, ${BRAND.rustGlow} 100%)`,
    shortQuote:
      "InkOS shows me a body — what's been worked, what's healing, what's left. Booking a back piece across ten weeks takes twelve minutes now.",
    stats: [
      { l: "Active sleeves", v: "14" },
      { l: "Guest residencies", v: "6 in 2025" },
      { l: "Disputes", v: "$0" },
    ],
    intro:
      "Rafael Moreno opened Calle Negra in Colonia Roma in 2017 with a single principle: large-scale work done right, or not at all.",
    studioBackground:
      "Calle Negra occupies two floors of a converted 1930s commercial building on Álvaro Obregón. Nine resident artists, a guest suite that runs six rotations a year, and a client list that travels internationally for sleeves and large-scale back pieces. By 2025 the studio had fourteen active multi-session projects and Rafael was managing the sequencing — what heals before the next fill — on a whiteboard he photographed every Friday.",
    preInkos: {
      heading: "The pain",
      body: "Two floors means two realities. Upstairs had its own booking spreadsheet. Downstairs ran on a different Calendly account. Guest artists brought their own systems. Fourteen active projects meant fourteen manual progress trackers, each one a WhatsApp thread with a pinned photo. When guest artist Jana from Berlin landed a back-piece commission in week two of her residency, her session overlapped with an existing healed-section fill. Neither system talked to the other. The client sat in the chair for an hour before anyone caught the conflict.",
    },
    migration: {
      heading: "The move",
      body: "Eleven days, two floors migrated together. InkOS unified the dual Calendly feeds, imported the WhatsApp photo threads as project milestones, and mapped each of the fourteen back-piece projects to a body diagram. Rafael ran the first unified view on day eight — both floors, all artists, all active projects on one screen. On day eleven he photographed the whiteboard for the last time, then painted over it.",
    },
    workflowToday: {
      heading: "Now",
      body: "Project Pulse is Rafael's first screen of the day. Fourteen active projects, each showing healed percentage, next-session recommendation, and artist assigned. When Jana's residency renewal came in March 2026, Rafael opened her guest profile, confirmed the open dates, and had a booking page live in twelve minutes. The whiteboard is now a feature wall — a painting by one of the residents covers it.",
    },
    fullQuote:
      "InkOS shows me a body — what's been worked, what's healing, what's left. Booking a back piece across ten weeks takes twelve minutes now. Before, I was doing it on a whiteboard I photographed every Friday. We had fourteen active projects and I was one missed photo away from a client sitting in the wrong chair. Now I just open Project Pulse and the whole studio is in front of me.",
    metricsCallout:
      "14 active multi-session projects managed without a single scheduling conflict. 6 guest residencies run on one unified calendar. $0 in booking disputes across 2025.",
    similarStudios: ["miles-verena", "elena-ruiz"],
  },
  {
    slug: "asha-mehra",
    name: "Asha Mehra",
    role: "Solo · Pluma Studio",
    city: "Amsterdam, NL",
    chairs: "1 chair · by appointment",
    size: "solo",
    initials: "AM",
    gradient: `linear-gradient(135deg, ${BRAND.sage} 0%, ${BRAND.rustGlow} 100%)`,
    shortQuote:
      "REACH compliance was the unlock. Every bottle on a registry, every reaction logged. I sleep better.",
    stats: [
      { l: "Inks tracked", v: "84" },
      { l: "Compliance reports", v: "Auto" },
      { l: "Migration", v: "2 days" },
    ],
    intro:
      "Asha Mehra runs Pluma Studio out of a canal-house apartment in De Pijp — fine-line botanical work by appointment, one client per day.",
    studioBackground:
      "Pluma Studio is appointment-only, one chair, one artist. Asha works exclusively with clients who come for botanical and illustrative fine-line pieces, most running two to four sessions. In 2024, the EU's updated REACH restrictions on tattoo ink pigments tightened. Asha had 84 inks in active rotation. The compliance requirement — every pigment traceable, every client reaction logged and reportable — was arriving with no clear tooling for solo artists to meet it.",
    preInkos: {
      heading: "The pain",
      body: "REACH compliance for tattoo inks requires lot-number tracing, client skin-type documentation, and incident reporting to the Netherlands NVWA. Asha had been building a manual spreadsheet since the 2024 guidance dropped. Eighty-four inks, each with three to seven pigment components. She'd documented forty of them before realising the per-session cross-reference — which inks touched which client — wasn't being logged at all. One client reaction in December 2025 took her three hours to reconstruct the incident record.",
    },
    migration: {
      heading: "The move",
      body: "Two days. Day one: InkOS imported her spreadsheet and matched every ink to its supplier SDS sheet automatically. Day two: she worked through the forty unfinished inks using InkOS's guided pigment registration flow — an hour and forty minutes for all forty. By end of day two, every bottle had a lot number, a risk flag, and a REACH status. The incident report she'd spent three hours on in December now generates in forty seconds.",
    },
    workflowToday: {
      heading: "Now",
      body: "Every session starts with an intake update at the kiosk: skin type, prior reactions, ink sensitivities. Asha selects the inks for the session from a pre-filtered list — anything flagged as high-pigment-load for sensitive skin is amber. Post-session, InkOS auto-logs the inks used against the client record. If the NVWA ever asks, the incident report is a single export. Asha hasn't rebuilt a compliance record from scratch since February 2026.",
    },
    fullQuote:
      "REACH compliance was the unlock. Every bottle on a registry, every reaction logged. I sleep better. Before InkOS I was one audit away from not being able to answer a regulator's questions. Now I can pull any client's full ink exposure history in thirty seconds. That's what solo compliance looks like when the tool is actually built for it.",
    metricsCallout:
      "84 inks registered and REACH-compliant in two days. Incident reports now generate in 40 seconds. Zero compliance findings since February 2026.",
    similarStudios: ["kaia-osei", "jonah-park"],
  },
  {
    slug: "tomas-bel",
    name: "Tomas Bel",
    role: "Owner · Salt House Tattoo",
    city: "Reykjavik, IS",
    chairs: "3 chairs · rotating guests",
    size: "small",
    initials: "TB",
    gradient: `linear-gradient(135deg, ${BRAND.amber} 0%, ${BRAND.rust} 100%)`,
    shortQuote:
      "Guest residencies used to mean three spreadsheets. Now I drop them on the calendar and the booking page just works.",
    stats: [
      { l: "Residencies / yr", v: "11" },
      { l: "Setup time", v: "12 min" },
      { l: "Guest no-shows", v: "0" },
    ],
    intro:
      "Tomas Bel built Salt House Tattoo as the studio that international artists actually want to come to — three chairs on the edge of the North Atlantic, with a rotating guest programme that books out six months in advance.",
    studioBackground:
      "Salt House runs three resident chairs in central Reykjavik and manages eleven guest residencies a year. Artists come from Copenhagen, Berlin, Tokyo, and New York — typically two to four weeks, their own booking page, their own client list. By 2025 the guest programme was Salt House's primary growth engine, but each residency created a new administrative island: a separate Calendly, a separate Square account, a separate set of consent PDFs. Tomas was managing eleven islands.",
    preInkos: {
      heading: "The pain",
      body: "Every incoming guest artist required a manual setup: Tomas would create a Calendly event type, set up a Square item, prepare a PDF consent kit, and send six onboarding emails. Setup took three to four hours per guest. If the guest's flight changed, the Calendly availability had to be manually adjusted. Two guests in 2024 had overlapping availability windows that neither system had caught — Tomas had to call a resident artist and ask her to shift a session at 11 pm on a Tuesday.",
    },
    migration: {
      heading: "The move",
      body: "Salt House migrated on a Monday in January 2026. Tomas spent the afternoon with InkOS onboarding, imported his existing resident calendar, and built the first guest residency template — dates, deposit amount, consent kit, booking-page settings. End-to-end, twelve minutes. He tested it by setting up the February guest as a dry run. The booking page went live, the confirmation email went out, and Tomas went to dinner. No Tuesday-night calls.",
    },
    workflowToday: {
      heading: "Now",
      body: "When a guest enquires, Tomas opens Guest Residency, fills in name, dates, and style tags, and publishes. InkOS generates a unique booking page, links the consent kit, and sets the deposit threshold. The guest gets an onboarding email with everything they need. During the residency, their bookings flow into the main Salt House calendar — no separate system. Post-residency, InkOS archives their full client and booking history. Eleven residencies in 2025. Zero no-shows. Zero scheduling conflicts.",
    },
    fullQuote:
      "Guest residencies used to mean three spreadsheets. Now I drop them on the calendar and the booking page just works. Setup used to take four hours. Now it's twelve minutes and I'm done. The first time I set up a residency on my phone while standing in line at the airport, I understood what the tool was actually for.",
    metricsCallout:
      "11 guest residencies managed in 2025. Setup time cut from 4 hours to 12 minutes. Zero no-shows and zero scheduling conflicts across the full year.",
    similarStudios: ["lin-chen", "marcus-lane"],
  },
  {
    slug: "lin-chen",
    name: "Lin Chen",
    role: "Owner · Aoiro Atelier",
    city: "Tokyo, JP",
    chairs: "2 chairs · resident",
    size: "small",
    initials: "LC",
    gradient: `linear-gradient(135deg, ${BRAND.rust} 0%, ${BRAND.amber} 100%)`,
    shortQuote:
      "The AI brief generator changed how I prep. Reference, palette, line study — all in one tab.",
    stats: [
      { l: "Briefs / wk", v: "18" },
      { l: "Prep time saved", v: "9 hr / wk" },
      { l: "Migration", v: "3 days" },
    ],
    intro:
      "Lin Chen opened Aoiro Atelier in Shimokitazawa in 2021 with a focus so specific it needed a name: watercolour-adjacent fine line, Japanese botanical, and what she calls 'studied emptiness'.",
    studioBackground:
      "Aoiro runs two resident chairs in a second-floor studio above a record shop in Shimokitazawa. Both artists work exclusively on booked projects — no walk-ins, no flash, no conventions. The average brief takes ninety minutes to prepare: client reference, colour palette study, line-weight research, and a working sketch. Lin runs eighteen briefs a week. Before InkOS, each one was a two-tab Chrome session, a separate Figma file, and a folder of saved Pinterest references.",
    preInkos: {
      heading: "The pain",
      body: "Prep time was the studio's largest single cost: nine to eleven hours a week across both artists, spread across tools that didn't talk to each other. Briefs were built in Figma, references lived in Pinterest, palette notes were in a Notion page that nobody had reorganised since 2023. When a client came back for a second piece and mentioned 'that blue we used last time', Lin had a twenty-minute search across three apps before finding the hex code in a screenshot of a Pinterest board.",
    },
    migration: {
      heading: "The move",
      body: "Three days. InkOS's AI brief engine doesn't replace Lin's aesthetic judgment — it assembles the raw material. Day one: import. Day two: Lin ran the brief generator on three existing client files, compared the output to her manual briefs, and found it was matching her colour-palette logic at about 85%. Day three: she mapped her own taxonomy tags — 'studied emptiness', 'wash transition', 'negative space hold' — to the generator's prompts. From day four, briefs started as InkOS outputs and finished as Lin's work.",
    },
    workflowToday: {
      heading: "Now",
      body: "Brief generation starts with a client profile — past sessions, skin tone, stated reference images. InkOS produces a palette (six colours with ratios), a line-weight recommendation, and a reference cluster. Lin reviews in twelve minutes and marks up in InkOS's canvas. Total prep time per brief: twenty-two minutes average, down from forty-eight. Eighteen briefs a week at twenty-two minutes is six and a half hours. The nine hours she recovered went back to making work.",
    },
    fullQuote:
      "The AI brief generator changed how I prep. Reference, palette, line study — all in one tab. Before, a brief was three apps and forty-eight minutes. Now it's twelve minutes of review and ten minutes of my actual thinking. The first time I found a client's exact palette from two years ago in thirty seconds — that's when I stopped thinking of it as a tool and started thinking of it as part of the studio.",
    metricsCallout:
      "18 briefs per week, average prep time cut from 48 minutes to 22 minutes. 9 hours per week recovered for creative work. Migration completed in 3 days.",
    similarStudios: ["tomas-bel", "asha-mehra"],
  },
  {
    slug: "marcus-lane",
    name: "Marcus Lane",
    role: "Owner · Iron + Ash",
    city: "Austin, TX",
    chairs: "8 artists · 2 floors",
    size: "multi-chair",
    initials: "ML",
    gradient: `linear-gradient(135deg, ${BRAND.rust} 0%, ${BRAND.rustDeep} 50%, ${BRAND.amber} 100%)`,
    shortQuote:
      "Commission splits used to be Friday afternoon. Now they hit Stripe Connect on the invoice. We got our weekends back.",
    stats: [
      { l: "Artists paid", v: "8 / week" },
      { l: "Reconciliation time", v: "0 min" },
      { l: "Disputes", v: "0 in 2025" },
    ],
    intro:
      "Marcus Lane opened Iron + Ash on South Congress in 2018 with eight artists across two floors and a simple operating principle: pay fast, pay right, no drama.",
    studioBackground:
      "Iron + Ash runs eight resident artists on a commission-split model across two floors in Austin's South Congress district. Styles span American traditional, neo-traditional, and portraiture. Artists are independent contractors — each has their own split percentage, their own deposit structure, and their own preferred payout timing. By 2025 Marcus was running the reconciliation manually every Friday afternoon: eight Stripe exports, eight split calculations, eight bank transfers. Average time: three hours and twenty minutes.",
    preInkos: {
      heading: "The pain",
      body: "Friday reconciliation was the studio's most stressful ritual. Marcus would pull each artist's week from Stripe, subtract the house percentage, cross-reference against the paper tip log, and initiate a bank transfer. Eight artists meant eight chances to make an arithmetic error. In March 2025, an artist named Drea noticed a $140 discrepancy in her Q1 summary. The error was Marcus's — a transposed digit. It took ninety minutes to trace and cost him a difficult conversation and a trust repair he's still working on.",
    },
    migration: {
      heading: "The move",
      body: "Iron + Ash migrated over four days in September 2025. InkOS pulled every artist's existing Stripe account into Stripe Connect, mapped each split percentage, and ran a two-week parallel — InkOS calculated splits alongside Marcus's manual process. In week one, the two outputs matched to the dollar on seven of eight artists; the eighth had a tip-rounding discrepancy of $3.20. Marcus found it because InkOS flagged it. On day fifteen, Marcus cancelled his Friday calendar block.",
    },
    workflowToday: {
      heading: "Now",
      body: "Commissions calculate at session close and hit Stripe Connect automatically. Eight artists, no spreadsheet, no Friday block. Artists see their running totals in the InkOS app in real time. Marcus's Monday morning starts with a single commission dashboard: week total, per-artist breakdown, pending payouts. If a tip was split differently, InkOS flags it for review — not for Marcus to catch manually. The $140 incident hasn't repeated.",
    },
    fullQuote:
      "Commission splits used to be Friday afternoon. Now they hit Stripe Connect on the invoice. We got our weekends back. Before InkOS, Friday was three hours of mental overhead I couldn't avoid. The first time I walked out of the studio at 5 pm on a Friday without opening a spreadsheet, I called my wife and told her we had a different business now.",
    metricsCallout:
      "8 artists paid automatically every week. Friday reconciliation time cut from 3 hours 20 minutes to zero. Zero commission disputes across all of 2025.",
    similarStudios: ["miles-verena", "tomas-bel"],
  },
  {
    slug: "elena-ruiz",
    name: "Elena Ruiz",
    role: "Director · Cinco Manos Group",
    city: "Madrid, ES",
    chairs: "3 locations · 22 artists",
    size: "chain",
    initials: "ER",
    gradient: `linear-gradient(135deg, ${BRAND.amber} 0%, ${BRAND.sage} 100%)`,
    shortQuote:
      "Per-location P&L was the moment we knew. We can finally see which shop is healthy and which one needs help, in one dashboard.",
    stats: [
      { l: "Locations", v: "3" },
      { l: "Artists", v: "22" },
      { l: "Payroll runs", v: "Monthly · auto" },
    ],
    intro:
      "Elena Ruiz built Cinco Manos Group from a single Malasaña studio in 2016 into a three-location operation by 2024 — and discovered that each new location added a new administrative layer she hadn't planned for.",
    studioBackground:
      "Cinco Manos Group operates three studios in Madrid: Malasaña (original, 9 artists), Chueca (opened 2022, 7 artists), and Lavapiés (opened 2024, 6 artists). Twenty-two artists total, three distinct studio cultures, and one director trying to run financial oversight on three separate Booksy accounts, three Square terminals, and a consolidated spreadsheet she rebuilt from scratch every quarter.",
    preInkos: {
      heading: "The pain",
      body: "The quarterly consolidation was Elena's personal bottleneck. Three Booksy exports, three Square reconciliations, one Excel file that broke every time she changed the column order. By the time Lavapiés opened in 2024, she was spending one week per quarter on the consolidation alone — and the result was still a lagging indicator. She knew November's numbers in January. When Chueca had a slow October, she found out when the January rent was hard to cover.",
    },
    migration: {
      heading: "The move",
      body: "Cinco Manos migrated all three locations over three weeks in early 2025, one location per week. InkOS pulled each Booksy feed, consolidated the Square payment history, and built a unified artist directory across all three studios. By week three, Elena had a single Operations dashboard showing all three locations side by side. The quarterly consolidation she'd been building manually since 2022 now refreshed every morning.",
    },
    workflowToday: {
      heading: "Now",
      body: "Elena's Monday starts with a five-minute operations review: three location cards, each showing last-week revenue, artists active, no-show rate, and average session value. Malasaña is consistently the strongest on session value; Chueca leads on volume; Lavapiés is still building. The October slowdown at Chueca that she'd missed in 2024? In 2025 she saw it in week two of October, moved two guest artists into open slots, and the month recovered. Payroll runs automatically on the first of the month.",
    },
    fullQuote:
      "Per-location P&L was the moment we knew. We can finally see which shop is healthy and which one needs help, in one dashboard. Before, I found out November was bad in January. Now I know Tuesday is bad by Wednesday morning and I can do something about it. Three locations, twenty-two artists, one screen. That's what managing at scale actually looks like.",
    metricsCallout:
      "3 locations consolidated into a single real-time dashboard. Quarterly reconciliation time cut from one week to zero. Payroll for 22 artists automated monthly since March 2025.",
    similarStudios: ["rafael-moreno", "marcus-lane"],
  },
  {
    slug: "jonah-park",
    name: "Jonah Park",
    role: "Solo · Quiet Hand Studio",
    city: "Seoul, KR",
    chairs: "1 chair · single artist",
    size: "solo",
    initials: "JP",
    gradient: `linear-gradient(135deg, ${BRAND.sage} 0%, ${BRAND.amber} 50%, ${BRAND.rust} 100%)`,
    shortQuote:
      "I don't run a business, I make tattoos. InkOS understood that. Every screen does its job and stays out of the way.",
    stats: [
      { l: "Sessions / wk", v: "12" },
      { l: "Admin time", v: "<3 hr / wk" },
      { l: "Migration", v: "Same day" },
    ],
    intro:
      "Jonah Park opened Quiet Hand Studio in Yongsan-gu in 2020 with one intention: do the work he wanted to do, with as little friction as possible between the idea and the needle.",
    studioBackground:
      "Quiet Hand is a single-artist studio in Seoul operating by referral and Instagram. Jonah works twelve sessions a week — fine-line, delicate geometric, and occasional illustrative pieces — across a rotating client base that comes from Korea, Japan, and internationally. He keeps no walk-ins, no flash days, no events. In 2025 he was booking via Instagram DMs, taking deposits via KakaoPay, sending consent forms as email attachments, and logging aftercare in a physical notebook. Twelve sessions a week, forty-eight touchpoints managed by hand.",
    preInkos: {
      heading: "The pain",
      body: "The admin wasn't complicated — it was just everywhere. DMs for enquiries. KakaoPay for deposits. Email for consent. Notebook for aftercare. Instagram saved posts for reference. Five tools for five tasks that should be one tool for one task. The first time a client asked Jonah to reproduce a specific shade of grey from a piece he'd done eight months earlier, Jonah found the reference in a saved Instagram post, the ink name in a different notebook, and the exact mix ratio in a WhatsApp message he'd sent himself. He spent thirty minutes on it. The client waited.",
    },
    migration: {
      heading: "The move",
      body: "Same day. Jonah's migration was the simplest on record: no prior booking system to import, just a decision to start clean. He set up his intake form, connected his payment account, and uploaded his ink inventory in one afternoon. The first booking through InkOS came in that evening — a referral from an existing client, booked through the new client page Jonah had published four hours earlier. He replied with a single confirmation tap.",
    },
    workflowToday: {
      heading: "Now",
      body: "Twelve sessions a week, under three hours of admin. Enquiries come through the InkOS client page and auto-sort by session type. Deposits process automatically. Consent is sent the day before and signed digitally. Session notes — ink used, mix ratios, healed percentage — log in InkOS during the session on an iPad on the trolley. When the client from eight months ago came back in March 2026 asking about the grey, Jonah had the ink name, ratio, and the reference photo pulled in twelve seconds.",
    },
    fullQuote:
      "I don't run a business, I make tattoos. InkOS understood that. Every screen does its job and stays out of the way. Twelve sessions a week, under three hours of admin. The first time I pulled a grey mix from eight months ago in twelve seconds while the client was still describing it — that was the moment I stopped thinking about the software and started just using it.",
    metricsCallout:
      "12 sessions per week managed on under 3 hours of admin. Migration completed the same afternoon as signup. Full session history — inks, ratios, references — searchable in under 15 seconds.",
    similarStudios: ["kaia-osei", "asha-mehra"],
  },
];
