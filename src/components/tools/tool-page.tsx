import React from "react";
import {
  Container,
  FeatureRow,
  InkBand,
  PageIntro,
  RelatedGrid,
  Section,
  cn,
  type RelatedItem,
} from "@/components/system";
import { PageShell } from "@/components/templates/page-shell";
import { ProductStage, type TemplateInkBand } from "@/components/templates/parts";
import { getFeature, type FeatureSlug } from "@/lib/data/features";
import { PLANS, formatPrice } from "@/lib/data/plans";
import { TOOLS_INDEX } from "@/lib/site-links";

type ToolSlug = (typeof TOOLS_INDEX)[number]["slug"];

/**
 * Hides everything but the form when the consent page prints: the nav, skip link and footer
 * are PageShell's direct children beside <main>; the page's own bands carry print:hidden.
 * Rendered only on pages that pass `printable`.
 */
const PRINT_CSS = "@media print{div:has(>#main)>:not(#main){display:none!important}#main{padding:0!important}}";

/**
 * The free-tool page: breadcrumb intro → the tool on white → "Use it in the app" (the
 * matching feature's screen and what Limespun does for you) → the related mesh (the other
 * tools, the feature, pricing) → the closing band.
 */
export function ToolPage({
  slug,
  eyebrow,
  title,
  italicWord,
  lead,
  feature,
  inApp,
  inkBand,
  printable = false,
  children,
}: {
  slug: ToolSlug;
  eyebrow: string;
  title: string;
  italicWord: string;
  lead: React.ReactNode;
  /** The feature this tool does for you inside Limespun. */
  feature: FeatureSlug;
  inApp: {
    title: string;
    body: React.ReactNode;
    bullets: string[];
    /** Button to the feature page, e.g. "How deposits work". */
    action: string;
    visual: React.ReactNode;
  };
  inkBand: TemplateInkBand;
  /** Print the tool alone (the consent template). */
  printable?: boolean;
  children: React.ReactNode;
}) {
  const tool = TOOLS_INDEX.find((t) => t.slug === slug) ?? TOOLS_INDEX[0];
  const f = getFeature(feature);
  const hidePrint = printable ? "print:hidden" : undefined;

  const related: RelatedItem[] = [
    ...TOOLS_INDEX.filter((t) => t.slug !== slug).map((t) => ({
      eyebrow: "Free tool",
      title: t.short,
      body: t.blurb,
      href: `/tools/${t.slug}`,
    })),
    { eyebrow: "Feature", title: f.navLabel, body: f.card, href: f.href },
    {
      eyebrow: "Plans",
      title: "Pricing",
      body: `Flat monthly plans from ${formatPrice(PLANS[0].monthlyCents)}. No cut of bookings.`,
      href: "/pricing",
    },
  ];

  return (
    <PageShell>
      {printable && <style href="tool-print" precedence="default">{PRINT_CSS}</style>}
      <div className={hidePrint}>
        <PageIntro
          crumbs={[{ label: "Home", href: "/" }, { label: "Free tools", href: "/tools" }, { label: tool.short }]}
          eyebrow={eyebrow}
          title={title}
          italicWord={italicWord}
          lead={lead}
        />
      </div>

      <section
        aria-label={tool.name}
        className={cn("border-t border-hair bg-white py-section-y-tight", printable && "print:border-0 print:py-0")}
      >
        <Container className={cn(printable && "print:max-w-none print:px-0")}>{children}</Container>
      </section>

      <div className={hidePrint}>
        <Section tone="canvas" labelledBy="in-app-heading">
          <Container>
            <FeatureRow
              eyebrow="Use it in the app"
              title={<span id="in-app-heading">{inApp.title}</span>}
              titleAs="h2"
              body={inApp.body}
              bullets={inApp.bullets}
              action={{ label: inApp.action, href: f.href }}
              visual={<ProductStage visual={inApp.visual} />}
            />
          </Container>
        </Section>

        <RelatedGrid heading="Related" items={related} tone="white" />

        <InkBand {...inkBand} />
      </div>
    </PageShell>
  );
}
