import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LimespunMark } from "@/components/brand/limespun-mark";

interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

const columns: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "Calendar", href: "/product/calendar" },
      { label: "Projects", href: "/product/projects" },
      { label: "Clients", href: "/product/clients" },
      { label: "Consent forms", href: "/product/forms" },
      { label: "Payments", href: "/product/payments" },
      { label: "Inventory", href: "/product/inventory" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "For studios",
    links: [
      { label: "Solo artists", href: "/for/solo-artists" },
      { label: "Small studios", href: "/for/small-studios" },
      { label: "Multi-chair shops", href: "/for/multi-chair" },
      { label: "Multi-location", href: "/for/multi-location" },
      { label: "Switching tools", href: "/migrate" },
      { label: "EU REACH", href: "/reach-compliance" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Changelog", href: "/changelog" },
      { label: "Roadmap", href: "/roadmap" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const legal = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Security", href: "/legal/security" },
  { label: "GDPR", href: "/legal/gdpr" },
  { label: "Cookies", href: "/legal/cookies" },
];

export function Footer() {
  return (
    <footer className="border-t border-hair bg-white">
      <div className="mx-auto max-w-[1200px] px-5 pt-16 pb-10 sm:px-8">
        <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Limespun home">
          <LimespunMark size={30} />
          <span className="text-[22px] font-semibold tracking-[-0.02em] text-graphite">Limespun</span>
        </Link>

        <div className="mt-6 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.heading}>
                <h2 className="text-[14px] font-medium text-mute">{col.heading}</h2>
                <ul className="mt-4 flex flex-col">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="inline-flex min-h-10 items-center text-[16px] text-graphite transition-colors hover:text-ember-deep"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="flex flex-col gap-5 lg:order-first lg:pr-8">
            <p className="max-w-[320px] text-[17px] leading-[1.55] text-mute">
              Bookings, deposits, consent forms and artist payouts for tattoo studios.
            </p>
            <Link
              href="/migrate"
              className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-canvas px-5 text-[15px] font-semibold text-graphite ring-1 ring-hair transition-colors hover:bg-canvas-deep"
            >
              Switching tools? We move you <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-hair pt-8 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[14px] text-graphite-soft transition-colors hover:text-graphite">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-[14px] text-mute">© {new Date().getFullYear()} Limespun · Built by Boldteq</p>
        </div>
      </div>
    </footer>
  );
}
