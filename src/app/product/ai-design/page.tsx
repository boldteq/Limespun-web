"use client";

import React from "react";
import {
  Sparkles,
  ImageIcon,
  FileText,
  RefreshCw,
  Heart,
  Star,
  LayoutGrid,
  MapPin,
} from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { BRAND } from "@/lib/brand";
import { AiMoodboardScreen } from "@/components/mockups";
import { ProductHero } from "@/components/product/product-hero";
import { ProductPillars } from "@/components/product/product-pillars";
import type { Pillar } from "@/components/product/product-pillars";
import { ProductAnatomy } from "@/components/product/product-anatomy";
import type { AnatomyCallout } from "@/components/product/product-anatomy";
import { ProductItemTypes } from "@/components/product/product-item-types";
import type { ItemType } from "@/components/product/product-item-types";
import { ProductDayInLife } from "@/components/product/product-day-in-life";
import { ProductRelated } from "@/components/product/product-related";
import type { RelatedModule } from "@/components/product/product-related";
import { ProductCTA } from "@/components/product/product-cta";
import { MONEY_BACK_DAYS } from "@/lib/data/plans";

// ── Pillars ───────────────────────────────────────────────────────────────────

const pillars: Pillar[] = [
  {
    icon: FileText,
    accent: BRAND.rust,
    eyebrow: "The brief",
    title: "From a client's paragraph to a clear brief.",
    desc: "Put the client's idea in the brief, with the style, placement and size. The artist edits every word; nothing is final until they say so.",
    bullets: [
      "Style, placement and size fields",
      "Every field editable",
      "Saved as a draft",
      "Linked to the client",
    ],
  },
  {
    icon: Sparkles,
    accent: BRAND.amber,
    eyebrow: "The moodboard",
    title: "A moodboard to talk through.",
    desc: "AI Studio drafts a moodboard concept from the brief: a palette and a mood to start the consult from. Regenerate it for a fresh direction.",
    bullets: [
      "Palette drawn from the brief",
      "Regenerate a fresh direction",
      "Past moodboards in one gallery",
      "On every plan, Solo included",
    ],
  },
  {
    icon: Heart,
    accent: BRAND.sage,
    eyebrow: "Never the art",
    title: "It never draws the tattoo.",
    desc: "No generated tattoo designs, no copies of anyone's style. The moodboard is a conversation tool; the design is the artist's.",
    bullets: [
      "No generated tattoo art",
      "A starting point for the consult",
      "The artist edits the brief",
      "Consult summaries on Pro",
    ],
  },
];

// ── Anatomy callouts ──────────────────────────────────────────────────────────

const callouts: AnatomyCallout[] = [
  {
    n: 1,
    title: "The brief",
    desc: "Type the client's idea in their words. Style, placement and size sit alongside it.",
    position: { top: "15%", left: "30%" },
  },
  {
    n: 2,
    title: "Palette",
    desc: "A palette drawn from the brief, shown on the moodboard.",
    position: { top: "32%", left: "55%" },
  },
  {
    n: 3,
    title: "Moodboard",
    desc: "The generated moodboard concept, beside the brief. Regenerate for another direction.",
    position: { top: "52%", left: "22%" },
  },
  {
    n: 4,
    title: "Placement & size",
    desc: "Where it goes and roughly how big, picked from a list.",
    position: { top: "68%", left: "60%" },
  },
  {
    n: 5,
    title: "Save",
    desc: "Save the brief as a draft and pick it up again at the consult.",
    position: { top: "84%", left: "38%" },
  },
];

// ── Item types ────────────────────────────────────────────────────────────────

const itemTypes: ItemType[] = [
  {
    icon: FileText,
    accent: BRAND.rust,
    severity: "In",
    title: "The idea",
    desc: "The client's description, in their words.",
    example: "Koi sleeve, water flowing downward",
  },
  {
    icon: Star,
    accent: BRAND.amber,
    severity: "In",
    title: "Style",
    desc: "The style the client is after, and any accents.",
    example: "Neo-traditional · fine-line accents",
  },
  {
    icon: MapPin,
    accent: BRAND.sage,
    severity: "In",
    title: "Placement & size",
    desc: "Where it goes and roughly how big.",
    example: "Outer forearm · medium",
  },
  {
    icon: ImageIcon,
    accent: BRAND.rust,
    severity: "Out",
    title: "Palette",
    desc: "A palette drawn from the brief, on the moodboard.",
    example: "Warm, restrained palette",
  },
  {
    icon: Sparkles,
    accent: BRAND.amber,
    severity: "Out",
    title: "Moodboard",
    desc: "A concept to start the consult from. Regenerate for a fresh direction.",
    example: "Saved to the moodboard gallery",
  },
  {
    icon: RefreshCw,
    accent: BRAND.sage,
    severity: "Out",
    title: "Draft brief",
    desc: "Saved as a draft; edit it any time before the consult.",
    example: "Draft · fine-line florals",
  },
];

// ── Related ───────────────────────────────────────────────────────────────────

const related: RelatedModule[] = [
  {
    icon: ImageIcon,
    label: "Clients",
    desc: "Client profiles, intake forms, and tattoo history in one place.",
    href: "/product/clients",
  },
  {
    icon: LayoutGrid,
    label: "Projects",
    desc: "Multi-session work, notes and photos, per project.",
    href: "/product/projects",
  },
  {
    icon: FileText,
    label: "Forms",
    desc: "Consent and medical history, before the session.",
    href: "/product/forms",
  },
  {
    icon: Star,
    label: "Portfolio",
    desc: "Healed work and flash, curated by you.",
    href: "/product/portfolio",
  },
];

// ── Day in Life paragraphs ────────────────────────────────────────────────────

const dayInLifeParagraphs: React.ReactNode[] = [
  <>
    Jo K. has a consult with Mara on Thursday. On Wednesday night Mara puts Jo&apos;s
    message into the brief, in Jo&apos;s own words:{" "}
    <em>fine-line florals, wrapping the forearm, soft and light</em>. Then she sets the
    style, placement and size.
  </>,
  <>
    <strong>AI Studio drafts a moodboard.</strong> A palette and a mood to start from. Mara
    regenerates once for a lighter direction and saves the brief as a draft.
  </>,
  <>
    Thursday at 11:00 the consult starts from the moodboard, not a blank page.{" "}
    <strong>The drawing is still Mara&apos;s.</strong>
  </>,
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AIDesignPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: BRAND.bone,
        overflow: "hidden",
      } as React.CSSProperties}
    >
      <Nav />
      <main>
        <ProductHero
          feature="AI Studio"
          headline="AI for the prep. Never the work."
          italicWord="Never the work"
          subhead="Write the client's idea as a brief, set the style, placement and size, and AI Studio drafts a moodboard to talk through. It never draws the tattoo. The artist does."
          dashboard={<AiMoodboardScreen />}
        />

        <ProductPillars
          eyebrow="Core tools"
          heading="Three parts, one prep flow."
          intro="The brief, the moodboard, and a hard line: AI Studio does the prep. The artist does the design."
          pillars={pillars}
        />

        <ProductAnatomy
          eyebrow="Inside AI Studio"
          heading="Everything in one canvas."
          intro="Brief on one side, moodboard on the other. No tab-switching."
          dashboard={<AiMoodboardScreen />}
          callouts={callouts}
        />

        <ProductItemTypes
          eyebrow="Brief library"
          heading="What goes in, what comes back."
          italicWord="comes back"
          intro="Every brief has the same parts, and the artist can edit all of them."
          items={itemTypes}
          columns={3}
        />

        <ProductDayInLife
          eyebrow="A day in the life"
          heading="A consult, prepped the night before."
          italicWord="prepped"
          intro="A fine-line florals consult on Thursday, and a brief written on Wednesday night."
          paragraphs={dayInLifeParagraphs}
          quote="The AI handles the prep. The design is still the artist's."
          takeawayLabel="The point"
        />

        <ProductRelated
          eyebrow="Works best with"
          heading="The full studio, connected."
          modules={related}
        />

        <ProductCTA
          headline="Prep without the blank page."
          italicWord="blank page"
          subhead={`AI moodboards and briefs are on every plan, Solo included. ${MONEY_BACK_DAYS}-day money-back guarantee.`}
        />
      </main>
      <Footer />
    </div>
  );
}
