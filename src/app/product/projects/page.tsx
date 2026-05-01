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
import { DashboardMockup } from "@/components/dashboard/dashboard-mockup";
import { BRAND } from "@/lib/brand";
import {
  LayoutGrid, DollarSign, ImageIcon, Calendar, FileText,
  AlertCircle, MessageSquare, Sparkles, Users, CreditCard,
} from "lucide-react";

export default function ProjectsPage() {
  return (
    <div style={{ minHeight: '100vh', background: BRAND.bone, overflow: 'hidden' } as React.CSSProperties}>
      <Nav />
      <main>
        <ProductHero
          feature="Projects"
          headline="A sleeve isn't a booking. It's a project."
          italicWord="a project"
          subhead="Multi-session work has a deposit pool, a photo timeline, a consent history, and an artist's running notes. InkOS treats it that way from the first commit — linking every session, every photo, every dollar to the same sleeve. No other studio software does this."
          dashboard={<DashboardMockup />}
        />

        <ProductPillars
          eyebrow="The premise"
          heading="One sleeve. Four visits. One record."
          italicWord="One record"
          intro="Booking software sees five separate appointments. InkOS sees one project. The deposit pool, photo stages, consent forms, and artist notes all live on the project — not scattered across individual bookings."
          pillars={[
            {
              icon: LayoutGrid, accent: BRAND.rust,
              eyebrow: "Multi-session grouping",
              title: "A sleeve is one project, four visits.",
              desc: "Every session links back to the project. Open any visit and the full history — photos, deposits, artist notes — is right there. Bookings stop being orphans.",
              bullets: ["Project sessions linked across dates", "Photo timeline (REF → FRESH → HEAL → HEALED)", "Consent history per project", "Artist notes inherit across sessions"],
            },
            {
              icon: DollarSign, accent: BRAND.amber,
              eyebrow: "Pooled deposits",
              title: "$200 covers S2. The rest carries.",
              desc: "A single deposit pool lives on the project. Each session draws from it. Refund session five and the pool re-balances automatically. Stripe Connect routes the artist's cut on every invoice.",
              bullets: ["Pool balance shown on every session card", "Per-session deposit apply", "Auto-rebalance on refund", "Stripe Connect routing on invoice"],
            },
            {
              icon: ImageIcon, accent: BRAND.sage,
              eyebrow: "Photo timeline",
              title: "Reference, fresh, healing, healed.",
              desc: "Four required stages, logged on the project as the work progresses. The healed photo is required to close. The full record feeds the studio portfolio automatically.",
              bullets: ["REF / FRESH / HEAL / HEALED stages", "Per-session photo gallery", "Healed photo required to close", "Studio portfolio auto-syncs"],
            },
          ]}
        />

        <ProductAnatomy
          eyebrow="Anatomy"
          heading="Everything a sleeve needs. In one place."
          italicWord="In one place"
          intro="No more chasing deposits across booking receipts, photos across DMs, and notes across sticky notes. The project record is the single source of truth for the work — from the first reference image to the final healed photo."
          dashboard={<DashboardMockup />}
          callouts={[
            { n: 1, title: "Project header", desc: "Sleeve name + session counter + active artist anchor.", position: { top: '15%', left: '40%' } },
            { n: 2, title: "Deposit pool", desc: "Live balance against the project, not the appointment.", position: { top: '32%', left: '34%' } },
            { n: 3, title: "Session cards", desc: "Each visit listed with date, duration, photos, deposit applied.", position: { top: '50%', left: '40%' } },
            { n: 4, title: "Photo timeline strip", desc: "Four-stage record: REF, FRESH, HEAL, HEALED. Studio gallery feeds from here.", position: { top: '60%', left: '60%' } },
            { n: 5, title: "Notes thread", desc: "Artist running notes inherit between sessions. Client never sees them.", position: { top: '72%', left: '38%' } },
          ]}
        />

        <ProductItemTypes
          eyebrow="Project anatomy"
          heading="What lives on the project."
          italicWord="lives on the project"
          intro="Every piece of information about a multi-session sleeve lives on the project record. Not in emails. Not in the booking notes. On the project — where it's accessible every time an artist opens a session."
          columns={3}
          items={[
            { icon: Calendar, accent: BRAND.rust, duration: "per session", title: "Sessions", desc: "Booking sessions tied to the project. Reschedule any visit and the project link stays intact.", example: '"Asha M. · Koi sleeve · S3 of 5 · May 21"' },
            { icon: DollarSign, accent: BRAND.amber, duration: "ongoing", title: "Deposit pool", desc: "A single pool against the project. Each session draws from it. Refunds re-balance automatically.", example: '"$420 of $600 banked · applied per session"' },
            { icon: ImageIcon, accent: BRAND.sage, duration: "4 stages", title: "Photo timeline", desc: "Reference, fresh, healing, healed — four required stages logged as the work progresses.", example: '"REF / FRESH / HEAL / HEALED"' },
            { icon: FileText, accent: BRAND.danger, duration: "per project", title: "Consent history", desc: "Every consent attached and hashed. Full audit trail. Accessible from any session on the project.", example: '"Consent PDF · hashed · attached Day 0"' },
            { icon: AlertCircle, accent: BRAND.danger, duration: "always on", title: "Allergy + medical", desc: "Pulled from the client record, surfaced on every session card. Artists never have to check twice.", example: '"Latex allergy · flagged on every session"' },
            { icon: MessageSquare, accent: BRAND.stoneDark, duration: "inherited", title: "Artist notes", desc: "Running notes written after each session carry forward automatically. Client never sees them.", example: '"Reacted well to red · slight wincing on outline"' },
          ]}
        />

        <ProductVsTable
          eyebrow="vs the rest"
          heading="Salon software treats every visit as a stranger."
          italicWord="every visit as a stranger"
          intro="DaySmart and Mangomint are built for salons — appointment-first, context-last. TattooGenda is tattoo-native but stops at the appointment. InkOS is the only one that carries the full project context across visits."
          competitors={['InkOS Projects', 'DaySmart', 'Mangomint', 'TattooGenda']}
          rows={[
            { feature: 'Multi-session project entity', values: [true, false, false, false] },
            { feature: 'Deposit pool across visits', values: [true, false, false, false] },
            { feature: 'Photo timeline (REF → HEALED)', values: [true, false, false, false] },
            { feature: 'Consent history per project', values: [true, false, false, false] },
            { feature: 'Artist notes inherit across sessions', values: [true, false, false, false] },
            { feature: 'Refund logic re-balances pool', values: [true, false, false, false] },
            { feature: 'Studio portfolio auto-sync', values: [true, false, false, false] },
          ]}
          caption="Sources: vendor product pages, public help docs, and pilot studio reports · 2026"
        />

        <ProductDayInLife
          eyebrow="Ten weeks of one sleeve"
          heading="Day 0 to Day 70. One project, five sessions."
          italicWord="five sessions"
          intro="Asha books a half-sleeve. The next ten weeks of her tattoo are now one project in InkOS."
          paragraphs={[
            <React.Fragment key="p1">Day 0: <strong>The reference photos go in.</strong> Mood board, line study, palette swatches. Consent form auto-attached to the project. Deposit pool created — $600, $420 banked at booking.</React.Fragment>,
            <React.Fragment key="p2">Session 1 (Day 0): <strong>The first three hours.</strong> Photos: REF and FRESH. The artist's notes go in: "Reacted well to red, slight wincing on outline" — those notes will surface on session 2 automatically.</React.Fragment>,
            <React.Fragment key="p3">Day 7: <strong>HEAL photo uploads from the client kiosk.</strong> Session 2 booked for Day 14. Pool re-applied: $120 of the $420 for S2.</React.Fragment>,
            <React.Fragment key="p4">Day 70: <strong>HEALED photo uploads. Project closes.</strong> The full record — bookings, deposits, consents, photos, notes — archives to her client record. <em>Portfolio auto-updates.</em></React.Fragment>,
          ]}
          quote="I used to keep four spreadsheets per client. Projects deleted all of them."
          person={{ name: "Miles Verena", role: "Owner · Sable & Sparrow · Brooklyn", gradient: "linear-gradient(135deg, #0F0F0F 0%, #4B4842 50%, #9A9792 100%)" }}
        />

        <ProductRelated
          eyebrow="One of fifteen"
          heading="Projects links every part of the studio together."
          italicWord="every part"
          modules={[
            { icon: Calendar, label: "Calendar", desc: "Sessions, residencies, healing blocks", href: "/product/calendar" },
            { icon: Users, label: "Clients", desc: "Full client records & history", href: "/product" },
            { icon: FileText, label: "Forms", desc: "Consents, deposits, intake", href: "/product" },
            { icon: CreditCard, label: "Payments", desc: "Deposit pools & payouts", href: "/product" },
          ]}
        />

        <ProductCTA
          headline="Book a sleeve. Not a slot."
          italicWord="Not a slot"
          subhead="14-day free trial. No credit card. Build a real project from session one to healed — deposits, photos, consents, and artist notes included from day one."
        />
      </main>
      <Footer />
    </div>
  );
}
