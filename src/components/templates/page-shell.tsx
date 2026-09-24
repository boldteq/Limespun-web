import React from "react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";

/**
 * Nav, skip link, <main id="main"> and footer: the frame every inner page sits in.
 * `jsonLd` takes page-level structured data (breadcrumbs and FAQs render their own).
 */
export function PageShell({
  jsonLd,
  children,
}: {
  jsonLd?: Record<string, unknown>[];
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-canvas text-graphite">
      <a
        href="#main"
        className="sr-only z-[1000] items-center rounded-full bg-graphite text-[15px] font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:inline-flex focus:min-h-11 focus:px-[18px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite"
      >
        Skip to content
      </a>
      {jsonLd?.map((data, i) => <JsonLd key={i} data={data} />)}
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
