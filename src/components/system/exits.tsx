import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PLANS, formatPrice } from "@/lib/data/plans";

const fromPrice = formatPrice(Math.min(...PLANS.map((p) => p.monthlyCents)));

const EXITS: { title: string; body: string; href: string }[] = [
  { title: "Product", body: "Bookings, deposits, consent forms, projects and artist payouts.", href: "/product" },
  { title: "Pricing", body: `Flat monthly plans from ${fromPrice}. No cut of bookings or deposits.`, href: "/pricing" },
  { title: "Contact", body: "Questions about switching, plans or your account.", href: "/contact" },
];

/** The three ways out of a dead end (404 and error pages), as rows like the FAQ list. */
export function Exits({ label = "Where to go next" }: { label?: string }) {
  return (
    <nav aria-label={label}>
      <ul className="border-t border-hair-strong">
        {EXITS.map((e) => (
          <li key={e.href} className="border-b border-hair-strong">
            <Link
              href={e.href}
              className="group flex min-h-20 items-center justify-between gap-6 py-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite"
            >
              <span className="min-w-0">
                <span className="block text-title-md text-graphite">{e.title}</span>
                <span className="mt-1 block text-[16px] leading-[1.55] text-pretty text-mute">{e.body}</span>
              </span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-graphite ring-1 ring-hair transition-[background-color,color] duration-200 group-hover:bg-graphite group-hover:text-white">
                <ArrowRight
                  size={17}
                  strokeWidth={2.2}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
