"use client";

import React from "react";
import {
  Sparkles,
  ImageIcon,
  Zap,
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
import { DashboardMockup } from "@/components/dashboard/dashboard-mockup";
import { ProductHero } from "@/components/product/product-hero";
import { ProductPillars } from "@/components/product/product-pillars";
import type { Pillar } from "@/components/product/product-pillars";
import { ProductAnatomy } from "@/components/product/product-anatomy";
import type { AnatomyCallout } from "@/components/product/product-anatomy";
import { ProductItemTypes } from "@/components/product/product-item-types";
import type { ItemType } from "@/components/product/product-item-types";
import { ProductVsTable } from "@/components/product/product-vs-table";
import type { VsTableRow } from "@/components/product/product-vs-table";
import { ProductDayInLife } from "@/components/product/product-day-in-life";
import { ProductRelated } from "@/components/product/product-related";
import type { RelatedModule } from "@/components/product/product-related";
import { ProductCTA } from "@/components/product/product-cta";

// ── Pillars ───────────────────────────────────────────────────────────────────

const pillars: Pillar[] = [
  {
    icon: Sparkles,
    accent: BRAND.rust,
    eyebrow: "Brief generator",
    title: "From paragraph to brief in 12 seconds.",
    desc: "Client sends a paragraph. AI Studio returns a structured brief — palette, line weight, reference guidance, voice notes. The artist edits, not starts from zero.",
    bullets: [
      "Structured palette/line/reference",
      "Editable every field",
      "Saves to project",
      "Brand-voice trainable",
    ],
  },
  {
    icon: ImageIcon,
    accent: BRAND.amber,
    eyebrow: "Reference assist",
    title: "9-grid pulls by style, era, body part.",
    desc: "Surface references filtered to your portfolio first, then the wider library. Tag per project. Export to PDF in one click.",
    bullets: [
      "Filter your portfolio first",
      "Wider library second",
      "Tag per project",
      "Export 1-click PDF",
    ],
  },
  {
    icon: Zap,
    accent: BRAND.sage,
    eyebrow: "Style preview",
    title: "Client photo + your style = before-the-chair preview.",
    desc: "Upload a client photo. Generate a placement preview in your signature style. A conversation tool, not a final. Watermarked by default.",
    bullets: [
      "Watermarked by default",
      "Conversation tool only",
      "PNG + SVG paths",
      "Never trains on client data",
    ],
  },
];

// ── Anatomy callouts ──────────────────────────────────────────────────────────

const callouts: AnatomyCallout[] = [
  {
    n: 1,
    title: "Brief input",
    desc: "Paste or dictate any description. AI Studio parses intent, style cues, and body placement in one pass.",
    position: { top: "15%", left: "30%" },
  },
  {
    n: 2,
    title: "Palette swatches",
    desc: "Generated colour palette drawn from the brief. Each swatch is editable and exports as hex or Procreate palette.",
    position: { top: "32%", left: "55%" },
  },
  {
    n: 3,
    title: "Reference grid",
    desc: "9-grid of curated references filtered to your portfolio first, then the wider library. One tap to add to project.",
    position: { top: "52%", left: "22%" },
  },
  {
    n: 4,
    title: "Style preview canvas",
    desc: "Client photo overlaid with placement preview in your style. Watermarked. Never stored on model training servers.",
    position: { top: "68%", left: "60%" },
  },
  {
    n: 5,
    title: "Save to project button",
    desc: "Sends the complete brief, swatches, references, and preview to the linked project in one tap.",
    position: { top: "84%", left: "38%" },
  },
];

// ── Item types ────────────────────────────────────────────────────────────────

const itemTypes: ItemType[] = [
  {
    icon: Sparkles,
    accent: BRAND.rust,
    severity: "Pro plan",
    title: "Quick brief",
    desc: "Single-sentence intake converts to a full structured brief.",
    example: "Koi sleeve · traditional · cherry blossoms",
  },
  {
    icon: FileText,
    accent: BRAND.amber,
    duration: "~12s",
    title: "Detailed brief",
    desc: "Multi-field output: palette, line weight, reference guidance, notes.",
    example: "Generates in ~12 seconds from intake",
  },
  {
    icon: RefreshCw,
    accent: BRAND.sage,
    severity: "Pro plan",
    title: "Cover-up plan",
    desc: "Analyses existing ink, suggests opacity layers and overlay approach.",
    example: "Faded panther · blackwork overlay",
  },
  {
    icon: Heart,
    accent: BRAND.rust,
    duration: "~5s",
    title: "Healing simulation",
    desc: "Preview aged or healed colour shift based on style and pigment.",
    example: "Watercolour fade simulation · 12 months",
  },
  {
    icon: Star,
    accent: BRAND.amber,
    severity: "Pro plan",
    title: "Style match",
    desc: "Match a reference image to the nearest equivalent in your portfolio.",
    example: "American trad · bold line · 2 colour",
  },
  {
    icon: ImageIcon,
    accent: BRAND.sage,
    duration: "~8s",
    title: "Color palette",
    desc: "Extract a named palette from any reference or uploaded image.",
    example: "Japanese sumi palette · 6 tones",
  },
  {
    icon: LayoutGrid,
    accent: BRAND.rust,
    severity: "Pro plan",
    title: "Composition study",
    desc: "Break a complex piece into flow, balance, and negative-space notes.",
    example: "Back piece · spine-centred composition",
  },
  {
    icon: MapPin,
    accent: BRAND.amber,
    duration: "~5s",
    title: "Body placement",
    desc: "Suggest optimal placement zones by size, flow direction, and skin tone.",
    example: "Outer forearm · 6×4 · flow with muscle",
  },
];

// ── Vs table ──────────────────────────────────────────────────────────────────

const vsCompetitors = ["InkOS AI Studio", "Midjourney", "ChatGPT", "Procreate"];

const vsRows: VsTableRow[] = [
  { feature: "Booking pipeline integration", values: [true, false, false, false] },
  { feature: "Studio brand voice trainable", values: [true, false, false, false] },
  { feature: "Watermarked previews", values: [true, false, false, false] },
  { feature: "No client data training", values: [true, false, false, true] },
  { feature: "Tattoo-aware style models", values: [true, false, false, false] },
  { feature: "Brief structure auto-generated", values: [true, false, true, false] },
  { feature: "Reference grid w/ portfolio filter", values: [true, false, false, false] },
  { feature: "Style transfer for client preview", values: [true, false, false, false] },
];

// ── Related ───────────────────────────────────────────────────────────────────

const related: RelatedModule[] = [
  {
    icon: ImageIcon,
    label: "Clients",
    desc: "Client profiles, intake forms, and tattoo history in one place.",
    href: "/product",
  },
  {
    icon: LayoutGrid,
    label: "Projects",
    desc: "Organise designs, briefs, and references per booking.",
    href: "/product",
  },
  {
    icon: FileText,
    label: "Forms",
    desc: "Custom intake and consent forms that feed the brief generator.",
    href: "/product",
  },
  {
    icon: Star,
    label: "Portfolio",
    desc: "Your work as the first filter for every reference pull.",
    href: "/product",
  },
];

// ── Day in Life paragraphs ────────────────────────────────────────────────────

const dayInLifeParagraphs: React.ReactNode[] = [
  <>
    Lin Chen runs Aoiro Atelier in Tokyo. Sunday night, a client emails a paragraph:{" "}
    <em>geometric sleeve, negative space, sakura motif, cool greys and ink black</em>. No
    reference images. No placement notes. Just the idea.
  </>,
  <>
    Monday morning Lin opens AI Studio. The paragraph goes in.{" "}
    <strong>Brief generated in 12 seconds.</strong> Structured palette: four tones extracted.
    Reference grid: nine images filtered to her portfolio first, then the wider library. The
    client&apos;s placement note auto-tagged to the outer forearm.
  </>,
  <>
    By Tuesday&apos;s consultation Lin has a full prep deck: brief, palette, references,
    and a watermarked placement preview on a client photo. The conversation starts with{" "}
    <em>clarity</em> instead of a blank page.{" "}
    <strong>Prep that used to take 90 minutes now takes 9.</strong>
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
          subhead="Brief generator, reference assist, and style preview — AI handles the prep so artists walk into the chair with a stack instead of a blank page."
          dashboard={<DashboardMockup />}
        />

        <ProductPillars
          eyebrow="Core tools"
          heading="Three tools, one prep flow."
          intro="AI Studio handles the brief, the references, and the preview. The artist handles the needle."
          pillars={pillars}
        />

        <ProductAnatomy
          eyebrow="Inside AI Studio"
          heading="Everything in one canvas."
          intro="From intake to prep deck — brief, palette, references, and style preview live together. No tab-switching."
          dashboard={<DashboardMockup />}
          callouts={callouts}
        />

        <ProductItemTypes
          eyebrow="Brief library"
          heading="Eight prompt patterns, all yours."
          italicWord="all yours"
          intro="Every brief type an artist needs, structured and editable. Generate, refine, and save to the project."
          items={itemTypes}
          columns={4}
        />

        <ProductVsTable
          eyebrow="Why InkOS"
          heading="Built for ink, not images."
          intro="General-purpose AI tools don't know the difference between a reference and a consent form. InkOS does."
          competitors={vsCompetitors}
          rows={vsRows}
          caption="Comparison based on publicly available features as of 2025."
        />

        <ProductDayInLife
          eyebrow="A day in the life"
          heading="Lin's Monday morning."
          italicWord="Monday morning"
          intro="Aoiro Atelier, Tokyo. A Sunday night email turns into a full prep deck by Tuesday consultation."
          paragraphs={dayInLifeParagraphs}
          quote="The prep that used to take 90 minutes now takes 9. The work is still mine."
          person={{
            name: "Lin Chen",
            role: "Owner · Aoiro Atelier · Tokyo",
            gradient:
              "linear-gradient(135deg, #DC2626 0%, #F97316 50%, #FBBF24 100%)",
          }}
        />

        <ProductRelated
          eyebrow="Works best with"
          heading="The full studio, connected."
          modules={related}
        />

        <ProductCTA
          headline="Prep without the blank page."
          italicWord="blank page"
          subhead="14-day trial includes AI Studio on Pro. Generate your first brief in 12 seconds."
        />
      </main>
      <Footer />
    </div>
  );
}
