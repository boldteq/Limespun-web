import React from "react";
import { Breadcrumb, type Crumb } from "./breadcrumb";
import { Button } from "./button";
import { cn } from "./cn";
import { Container } from "./section";
import { Display, Eyebrow } from "./type";

export interface PageIntroProps {
  crumbs?: Crumb[];
  /** A string renders as an Eyebrow; pass a node (e.g. <PlanChip />) for anything else. */
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  /** One word of a string title set in the ember italic. */
  italicWord?: string;
  lead: React.ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** The screen this page is about, full width under the copy. */
  visual?: React.ReactNode;
  align?: "left" | "center";
  /** BreadcrumbList JSON-LD for the crumbs. Off only where the page renders its own. */
  breadcrumbJsonLd?: boolean;
  children?: React.ReactNode;
}

/** Page opening for every inner page: breadcrumb, eyebrow, serif h1, lead, the CTA pair, then the product. */
export function PageIntro({
  crumbs,
  eyebrow,
  title,
  italicWord,
  lead,
  primary,
  secondary,
  visual,
  align = "left",
  breadcrumbJsonLd = true,
  children,
}: PageIntroProps) {
  const centered = align === "center";
  const hasCrumbs = Boolean(crumbs && crumbs.length > 0);
  return (
    <section className="bg-canvas pt-10 pb-14 sm:pt-16 sm:pb-20">
      <Container>
        <div className={cn(centered && "mx-auto flex max-w-[920px] flex-col items-center text-center")}>
          {crumbs && hasCrumbs && <Breadcrumb crumbs={crumbs} jsonLd={breadcrumbJsonLd} align={align} />}
          {eyebrow && (
            <div className={cn(hasCrumbs && "mt-8")}>
              {typeof eyebrow === "string" ? <Eyebrow dot>{eyebrow}</Eyebrow> : eyebrow}
            </div>
          )}
          <Display
            as="h1"
            size={2}
            italicWord={italicWord}
            className={cn("max-w-[900px]", (hasCrumbs || eyebrow) && (eyebrow ? "mt-5" : "mt-6"))}
          >
            {title}
          </Display>
          <p className="mt-6 max-w-[640px] text-lead text-graphite-soft">{lead}</p>
          {(primary || secondary) && (
            <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              {primary && (
                <Button href={primary.href} arrow>
                  {primary.label}
                </Button>
              )}
              {secondary && (
                <Button href={secondary.href} variant="secondary">
                  {secondary.label}
                </Button>
              )}
            </div>
          )}
          {children}
        </div>
        {visual && <div className="mt-14 min-w-0 lg:mt-16">{visual}</div>}
      </Container>
    </section>
  );
}
