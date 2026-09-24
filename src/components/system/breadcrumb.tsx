import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/lib/brand";
import { cn } from "./cn";

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Trail above a page title, plus its BreadcrumbList JSON-LD. The last crumb is the current
 * page (no href). Turn `jsonLd` off only where the page already renders its own list.
 */
export function Breadcrumb({
  crumbs,
  jsonLd = true,
  align = "left",
  className,
}: {
  crumbs: Crumb[];
  jsonLd?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <>
      {jsonLd && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: crumbs.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: c.label,
              ...(c.href ? { item: c.href === "/" ? SITE_URL : `${SITE_URL}${c.href}` } : {}),
            })),
          }}
        />
      )}
      <nav aria-label="Breadcrumb" className={className}>
        <ol className={cn("flex flex-wrap items-center gap-1.5 text-[14px] text-mute", align === "center" && "justify-center")}>
          {crumbs.map((c, i) => (
            <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
              {c.href ? (
                <Link
                  href={c.href}
                  className="relative rounded-sm before:absolute before:-inset-x-1 before:-inset-y-3 before:content-[''] hover:text-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite"
                >
                  {c.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-graphite">
                  {c.label}
                </span>
              )}
              {i < crumbs.length - 1 && <ChevronRight size={14} aria-hidden="true" />}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
