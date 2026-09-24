import React from "react";
import { PageIntro as SystemPageIntro, type PageIntroProps } from "@/components/system/page-intro";

/**
 * Legacy entry point for the system PageIntro (same props: crumbs, title, lead, children, plus
 * everything v2 adds). Breadcrumb JSON-LD stays off by default here because /compare/[slug]
 * already renders its own BreadcrumbList; pages moving to "@/components/system" get it on.
 */
export function PageIntro({ breadcrumbJsonLd = false, ...props }: PageIntroProps) {
  return <SystemPageIntro breadcrumbJsonLd={breadcrumbJsonLd} {...props} />;
}
