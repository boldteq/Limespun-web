"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BRAND, FONT } from "@/lib/brand";

interface PageBreadcrumbsProps {
  labelMap?: Record<string, string>;
}

function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

interface Crumb {
  label: string;
  href: string;
}

export function PageBreadcrumbs({ labelMap }: PageBreadcrumbsProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const crumbs: Crumb[] = [{ label: "Home", href: "/" }];
  let cumulative = "";
  for (const segment of segments) {
    cumulative += `/${segment}`;
    crumbs.push({
      label: labelMap?.[segment] ?? slugToTitle(segment),
      href: cumulative,
    });
  }

  return (
    <div
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "14px 32px",
        display: "flex",
        alignItems: "center",
        gap: 6,
      } as React.CSSProperties}
    >
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <React.Fragment key={crumb.href}>
            {i > 0 && (
              <ChevronRight size={12} color={BRAND.stoneLight} strokeWidth={2} />
            )}
            {isLast ? (
              <span
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 12,
                  color: BRAND.stoneDark,
                } as React.CSSProperties}
              >
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 12,
                  color: BRAND.stone,
                  textDecoration: "none",
                } as React.CSSProperties}
              >
                {crumb.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
