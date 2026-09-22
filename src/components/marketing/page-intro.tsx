import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Display } from "@/components/home/ui";

interface Crumb {
  label: string;
  href?: string;
}

/** Page opening for content pages: breadcrumb, serif headline, one-paragraph lead. */
export function PageIntro({
  crumbs,
  title,
  lead,
  children,
}: {
  crumbs: Crumb[];
  title: React.ReactNode;
  lead: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-canvas pt-10 pb-14 sm:pt-16 sm:pb-20">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-[14px] text-mute">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-1.5">
                {c.href ? (
                  <Link href={c.href} className="hover:text-graphite">
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
        <Display as="h1" className="mt-6 max-w-[900px] !text-[44px] sm:!text-[64px]">
          {title}
        </Display>
        <p className="mt-6 max-w-[640px] text-[18px] leading-[1.6] text-graphite-soft sm:text-[19px]">{lead}</p>
        {children}
      </div>
    </section>
  );
}
