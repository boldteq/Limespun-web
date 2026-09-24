"use client";

import React from "react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { ProductHero } from "@/components/product/product-hero";
import { ProductPillars } from "@/components/product/product-pillars";
import { ProductAnatomy } from "@/components/product/product-anatomy";
import { ProductItemTypes } from "@/components/product/product-item-types";
import { ProductDayInLife } from "@/components/product/product-day-in-life";
import { ProductRelated } from "@/components/product/product-related";
import { ProductCTA } from "@/components/product/product-cta";
import { MONEY_BACK_DAYS } from "@/lib/data/plans";
import { ProjectsScreen } from "@/components/mockups";
import { BRAND } from "@/lib/brand";
import {
  LayoutGrid, DollarSign, ImageIcon, Calendar, FileText,
  AlertCircle, MessageSquare, Users, CreditCard,
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
          subhead="Multi-session work has a deposit pool, a photo timeline, a consent history, and an artist's running notes. Limespun treats it that way from the first commit, linking every session, every photo and every dollar to the same project."
          dashboard={<ProjectsScreen />}
        />

        <ProductPillars
          eyebrow="The premise"
          heading="One sleeve. Four visits. One record."
          italicWord="One record"
          intro="Booking software sees five separate appointments. Limespun sees one project. The deposit pool, photo stages, consent forms, and artist notes all live on the project — not scattered across individual bookings."
          pillars={[
            {
              icon: LayoutGrid, accent: BRAND.rust,
              eyebrow: "Multi-session grouping",
              title: "A sleeve is one project, four visits.",
              desc: "Every session links back to the project. Open any visit and the full history — photos, deposits, artist notes — is right there. Bookings stop being orphans.",
              bullets: ["Project sessions linked across dates", "Photo timeline (before → reference → fresh → healed)", "Consent history per project", "Artist notes inherit across sessions"],
            },
            {
              icon: DollarSign, accent: BRAND.amber,
              eyebrow: "Pooled deposits",
              title: "$60 covers session 3. The rest carries.",
              desc: "A single deposit pool lives on the project and shows Paid in, Applied, Available and Refundable. Each session draws from it, and anything unused can be refunded.",
              bullets: ["Pool balance shown on every session card", "Applied session by session", "Paid in, Applied, Available, Refundable", "Refund what's left unused"],
            },
            {
              icon: ImageIcon, accent: BRAND.sage,
              eyebrow: "Photo timeline",
              title: "Before, reference, fresh, healed.",
              desc: "Photos logged on the project as the work goes: before, reference, fresh after each session, then healed. Add the healed photo and mark the project Complete.",
              bullets: ["Before, reference, fresh, healed", "Per-session photo gallery", "Healing, then Complete", "You pick what goes in the portfolio"],
            },
          ]}
        />

        <ProductAnatomy
          eyebrow="Anatomy"
          heading="Everything a sleeve needs. In one place."
          italicWord="In one place"
          intro="No more chasing deposits across booking receipts, photos across DMs, and notes across sticky notes. The project record is the single source of truth for the work — from the first reference image to the final healed photo."
          dashboard={<ProjectsScreen view="detail" />}
          callouts={[
            { n: 1, title: "Project header", desc: "Sleeve name + session counter + active artist anchor.", position: { top: '15%', left: '40%' } },
            { n: 2, title: "Deposit pool", desc: "Live balance against the project, not the appointment.", position: { top: '32%', left: '34%' } },
            { n: 3, title: "Session cards", desc: "Each visit listed with date, duration, photos, deposit applied.", position: { top: '50%', left: '40%' } },
            { n: 4, title: "Photo timeline strip", desc: "Before, reference, fresh and healed photos, in order. Pick any for the portfolio.", position: { top: '60%', left: '60%' } },
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
            { icon: Calendar, accent: BRAND.rust, duration: "per session", title: "Sessions", desc: "Booking sessions tied to the project. Reschedule any visit and the project link stays intact.", example: '"Asha M. · Koi sleeve · session 5 of 5 · Sat Nov 7"' },
            { icon: DollarSign, accent: BRAND.amber, duration: "ongoing", title: "Deposit pool", desc: "A single pool against the project. Each session draws from it, and anything unused can be refunded.", example: '"$300 paid in · $60 applied · $240 held"' },
            { icon: ImageIcon, accent: BRAND.sage, duration: "every session", title: "Photo timeline", desc: "Before, reference, fresh and healed photos, logged as the work progresses.", example: '"Before · Reference · Fresh · Healed"' },
            { icon: FileText, accent: BRAND.danger, duration: "per project", title: "Consent history", desc: "Every signed consent stored as a PDF, reachable from any session on the project.", example: '"Consent PDF · signed before session 1"' },
            { icon: AlertCircle, accent: BRAND.danger, duration: "always on", title: "Allergy + medical", desc: "Pulled from the client record, surfaced on every session card. Artists never have to check twice.", example: '"Red ink allergy · flagged on every session"' },
            { icon: MessageSquare, accent: BRAND.stoneDark, duration: "inherited", title: "Artist notes", desc: "Running notes written after each session carry forward automatically. Client never sees them.", example: '"Session 3 · color, upper arm · healed well"' },
          ]}
        />

        <ProductDayInLife
          eyebrow="One sleeve, start to finish"
          heading="Session one to healed. One project, five sessions."
          italicWord="five sessions"
          intro="Asha M. books a koi sleeve. Five sessions, weeks apart, become one project in Limespun."
          paragraphs={[
            <React.Fragment key="p1">Before session 1: <strong>the references go in.</strong> Moodboard, line study, placement notes. Consent is signed on her phone, and she pays a $300 deposit into the project&apos;s pool.</React.Fragment>,
            <React.Fragment key="p2">Session 1: <strong>the first sitting.</strong> Fresh photos go on the project. The artist&apos;s notes go in (sits well, needs breaks on the inner arm) and show up again on session 2.</React.Fragment>,
            <React.Fragment key="p3">Session 3: <strong>$60 comes out of the pool.</strong> $240 stays held for sessions 4 and 5, and every session card shows the balance.</React.Fragment>,
            <React.Fragment key="p4">After session 5: <strong>the project moves to Healing.</strong> The healed photo goes on, the project is marked Complete, and the whole record stays on her client file. <em>You choose which photos go in the portfolio.</em></React.Fragment>,
          ]}
          quote="One project record replaces the per-client spreadsheets — every deposit, photo and note for the sleeve in one place."
          takeawayLabel="In short"
        />

        <ProductRelated
          eyebrow="One of fifteen"
          heading="Projects links every part of the studio together."
          italicWord="every part"
          modules={[
            { icon: Calendar, label: "Calendar", desc: "Sessions, guest spots, clash checks", href: "/product/calendar" },
            { icon: Users, label: "Clients", desc: "Full client records & history", href: "/product/clients" },
            { icon: FileText, label: "Forms", desc: "Consent, medical history, releases", href: "/product/forms" },
            { icon: CreditCard, label: "Payments", desc: "Deposit pools & payouts", href: "/product/payments" },
          ]}
        />

        <ProductCTA
          headline="Book a sleeve. Not a slot."
          italicWord="Not a slot"
          subhead={`${MONEY_BACK_DAYS}-day money-back guarantee. Build a real project from session one to healed — deposits, photos, consents, and artist notes included from day one.`}
        />
      </main>
      <Footer />
    </div>
  );
}
