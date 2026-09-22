"use client";

import React from "react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { ProductHero } from "@/components/product/product-hero";
import { ProductPillars } from "@/components/product/product-pillars";
import { ProductAnatomy } from "@/components/product/product-anatomy";
import { ProductItemTypes } from "@/components/product/product-item-types";
import { ProductVsTable } from "@/components/product/product-vs-table";
import { ProductDayInLife } from "@/components/product/product-day-in-life";
import { ProductRelated } from "@/components/product/product-related";
import { ProductCTA } from "@/components/product/product-cta";
import { MONEY_BACK_DAYS } from "@/lib/data/plans";
import { CalendarMockup } from "@/components/product/mockups/calendar-mockup";
import { BRAND } from "@/lib/brand";
import {
  LayoutGrid, Plane, AlertCircle, Sparkles, MessageSquare, Repeat,
  Droplet, Heart, Pause, MoonStar, Clock, Users,
} from "lucide-react";

export default function CalendarPage() {
  return (
    <div style={{ minHeight: '100vh', background: BRAND.bone, overflow: 'hidden' } as React.CSSProperties}>
      <Nav />
      <main>
        <ProductHero
          feature="Calendar"
          headline="The week, as your studio actually runs it."
          italicWord="as your studio actually runs it"
          subhead="Most calendars schedule appointments. Limespun schedules tattoos. Multi-session sleeves carried across visits. Guest residencies on a time-boxed band. Allergies flagged before the chair. Sterilization buffers auto-applied. The schedule a tattoo studio actually runs on, not the one you bend to fit."
          dashboard={<CalendarMockup />}
        />

        <ProductPillars
          eyebrow="The premise"
          heading="A calendar that carries the context."
          italicWord="carries the context"
          intro="Salon software books an hour and walks away. A tattoo session is the third of five visits, shares a deposit pool, runs against an allergy chart, needs sterilization either side, and waits on a body zone to heal. Limespun knows all of that — every time you tap a slot."
          pillars={[
            {
              icon: LayoutGrid, accent: BRAND.onyx,
              eyebrow: "Sessions, not slots",
              title: "A sleeve is one project, four visits.",
              desc: "Open any session and the project history is right there — past visits, photos, deposits already paid, what's left to ink. Bookings stop being orphans.",
              bullets: ["Inline session counter (S2 of 5)", "Project deposit balance on the card", "Past-session photos one tap away", "Healing windows linked to body zones"],
            },
            {
              icon: Plane, accent: BRAND.rust,
              eyebrow: "The guest band",
              title: "Visiting artists, on a timeline of their own.",
              desc: "A horizontal residency band pinned to the dates a guest is in studio. Auto-expires when their tour ends. Their booking page goes dark on day one of the next residency.",
              bullets: ["Time-boxed residencies (1 day to 6 weeks)", "Auto-archive after departure date", "Per-guest booking page slug", "Email approval — no account needed"],
            },
            {
              icon: AlertCircle, accent: BRAND.danger,
              eyebrow: "Conflicts, before they happen",
              title: "The calendar refuses bad bookings.",
              desc: "Allergy clients flagged on the card. Sessions without deposits highlighted amber. Sterilization buffers refuse to overlap. Same-zone work blocked during healing windows.",
              bullets: ["Allergy & medical alerts on every card", "Deposit-required gating before lock", "Auto-applied sterilization buffer", "Healing-zone block on the body, not the clock"],
            },
          ]}
        />

        <ProductAnatomy
          eyebrow="Anatomy"
          heading="Density, with intent."
          italicWord="with intent"
          intro="A tattoo calendar carries more signals than a salon one. Limespun shows them all — without looking like a spreadsheet. Color, pattern, and pin position do the work that competing tools spread across menus and tooltips."
          dashboard={<CalendarMockup />}
          callouts={[
            { n: 1, title: "The view switcher", desc: "Day, Week, Month — same data, three magnifications. Day view shows chairs side-by-side; Week shows a single artist across days; Month is the long view.", position: { top: '13%', left: '70%' } },
            { n: 2, title: "The guest residency band", desc: "Pinned across the dates a visiting artist is in studio. Auto-darkens when their tour ends. The thing TattooGenda invented and salon software still can't replicate.", position: { top: '25%', left: '34%' } },
            { n: 3, title: "Chair columns", desc: "Each artist gets a column with their type (Resident / Guest) and color. Drag a session left to swap chairs — deposits and consents come along.", position: { top: '32%', left: '52%' } },
            { n: 4, title: "Session cards", desc: "Client name, project label, multi-session counter, and signal icons (allergy, deposit-pending, healing, in-progress). Tap to drill into the project.", position: { top: '50%', left: '24%' } },
            { n: 5, title: "Sterilization & healing blocks", desc: "Diagonal-pattern buffers between sessions. Mint-green healing zones blocked on the body, not just the clock. Both auto-applied — never forgotten.", position: { top: '52%', left: '50%' } },
          ]}
        />

        <ProductItemTypes
          eyebrow="The block library"
          heading="Time, the way tattoo measures it."
          italicWord="the way tattoo measures it"
          intro="A salon books appointments. A tattoo studio books eight different things. Each block type here behaves differently — different defaults, different visibility, different rules. You won't find half of these in any other booking software."
          columns={4}
          items={[
            { icon: Sparkles, accent: BRAND.onyx, duration: "2–8 hr", title: "Session", desc: "The actual tattoo work. Multi-session projects auto-link. Deposit balance and project history shown on the card.", example: '"Asha M. · Koi sleeve · S4 of 5 · 9–11 AM"' },
            { icon: MessageSquare, accent: BRAND.stoneDark, duration: "30–60 min", title: "Consultation", desc: "New clients, design discussions, quotes. Hollow card style — visually distinct from billable work.", example: '"Marcus L. · Consultation · 60 min"' },
            { icon: Repeat, accent: BRAND.stoneDark, duration: "30–90 min", title: "Touch-up", desc: "Post-healing fix-ups. Auto-tagged free or nominal based on your touch-up policy. Linked to the original session.", example: '"Jonah P. · Touch-up · Geometric forearm"' },
            { icon: Droplet, accent: BRAND.stoneLight, duration: "15–30 min", title: "Sterilization", desc: "Auto-applied between sessions. Diagonal-pattern fill so you never mistake it for free time. The duration matches your studio hygiene policy.", example: '"Buffer · 30 min · between Asha & Elena"' },
            { icon: Heart, accent: BRAND.success, duration: "1–6 weeks", title: "Healing block", desc: "Marks a body zone as recovering. Same artist can't book the same area until the window closes. Linked to the session that triggered it.", example: '"Yvette · Forearm zone — recovering until 2 May"' },
            { icon: Plane, accent: BRAND.rust, duration: "1 day – 6 weeks", title: "Guest residency", desc: "Time-boxed visit from a touring artist. Auto-archives after the departure date. Each guest gets their own public booking page.", example: '"Nina Yates · 22–29 April · Black & grey"' },
            { icon: Pause, accent: BRAND.stone, duration: "flexible", title: "Block-out", desc: "Personal time. Doctor visits, gym, kid pickup. Marked on the calendar but not visible on the public booking page.", example: '"Miles · Personal · 4–5 PM"' },
            { icon: MoonStar, accent: BRAND.onyx, duration: "full day", title: "Studio closed", desc: "Holidays, training days, conventions. Booking page goes dark for the whole studio or per-artist. Repeats supported.", example: '"Studio closed · 1 May · International Workers\' Day"' },
          ]}
        />

        <ProductVsTable
          eyebrow="vs the rest"
          heading="What every other calendar forgets to ask."
          italicWord="forgets to ask"
          intro="We benchmarked against the calendar best-of-breed: TattooGenda (tattoo-native, strong on guests), DaySmart Body Art (the incumbent), and Mangomint (modern salon software). Limespun is the only one that asks every question a tattoo artist actually asks before tapping confirm."
          competitors={['Limespun Calendar', 'TattooGenda', 'DaySmart', 'Mangomint']}
          rows={[
            { feature: 'Multi-chair day view (artist columns)', values: [true, true, true, true] },
            { feature: 'Multi-session project context inline', values: [true, false, false, false] },
            { feature: 'Time-boxed guest residency band', values: [true, true, false, false] },
            { feature: 'Allergy alerts on appointment cards', values: [true, false, false, false] },
            { feature: 'Auto-applied sterilization buffer', values: [true, false, false, false] },
            { feature: 'Healing-zone block (body, not clock)', values: [true, false, false, false] },
            { feature: 'Deposit-required gating before lock', values: [true, false, false, false] },
            { feature: 'Per-artist public booking page slug', values: [true, true, true, true] },
            { feature: 'Drag-to-reschedule with policy re-check', values: [true, false, false, false] },
          ]}
          caption="Sources: vendor product pages, public help docs, and pilot studio reports · 2026"
        />

        <ProductDayInLife
          eyebrow="Booking a back piece"
          heading="Tuesday, 3:47 PM. Three sessions, ten weeks, twelve minutes."
          italicWord="Three sessions, ten weeks, twelve minutes"
          intro="Rafael's phone rings at the studio in Mexico City. A walk-in lead wants a back piece — six hours per session, three sessions, healing in between. He opens Calendar."
          paragraphs={[
            <React.Fragment key="p1"><strong>He searches for six-hour gaps.</strong> The week of May 14 has one on Wednesday — but he&apos;s also got Asha&apos;s sleeve session that morning, and her allergy alert is still open. Cross-contamination risk. He swipes to May 21. Six hours open on Thursday. Clean.</React.Fragment>,
            <React.Fragment key="p2"><strong>He drops the appointment in.</strong> Calendar auto-applies a 30-minute sterilization buffer before and after. The back-zone healing block goes up for May 21 through June 25 — same artist can&apos;t book the same area until it closes. Calendar asks if the second session should be six weeks out. Yes. The third, eight more. Yes.</React.Fragment>,
            <React.Fragment key="p3"><strong>The proposal goes out as a single message.</strong> Three sessions across ten weeks, deposit per session, healing windows highlighted, design timeline included. The client says yes by 4:15. Each session lock-confirms only when the deposit posts.</React.Fragment>,
            <React.Fragment key="p4">Rafael&apos;s done planning a four-month project before the next client walks in. <em>Total time: twelve minutes. The old way: a full afternoon and three follow-up emails.</em></React.Fragment>,
          ]}
          quote="A calendar that knows what's healing books the next session around the body, not just the clock."
          takeawayLabel="Why it matters"
        />

        <ProductRelated
          eyebrow="One of fifteen"
          heading="Calendar is where the studio becomes a plan. What's next."
          italicWord="becomes a plan"
          modules={[
            { icon: Sparkles, label: "Today", desc: "Morning launchpad", href: "/product/today" },
            { icon: Clock, label: "Appointments", desc: "Booking & deposits", href: "/product" },
            { icon: LayoutGrid, label: "Projects", desc: "Multi-session sleeves", href: "/product/projects" },
            { icon: Users, label: "Team", desc: "Artists, guests, payroll", href: "/product" },
          ]}
        />

        <ProductCTA
          headline="Plan a sleeve. Not just a slot."
          italicWord="Not just a slot"
          subhead={`${MONEY_BACK_DAYS}-day money-back guarantee. Import your bookings from any other tool in a single CSV — we keep guest residencies, deposits, and consent files attached.`}
        />
      </main>
      <Footer />
    </div>
  );
}
