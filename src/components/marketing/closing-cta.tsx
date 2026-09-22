import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ACCOUNT, CTA } from "@/lib/brand";

/** One clear next step at the end of a content page. */
export function ClosingCta({
  title = "Ready to run the shop in one place?",
  body = "Bookings, deposits, consent forms and artist payouts. No per-booking fees.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-canvas px-5 py-16 sm:px-8">
      <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-6 rounded-[24px] bg-canvas-deep px-7 py-9 sm:px-10 lg:flex-row lg:items-center">
        <div>
          <h2 className="font-serif text-[34px] leading-[1.1] text-graphite sm:text-[40px]">{title}</h2>
          <p className="mt-2 max-w-[560px] text-[16px] text-mute">{body}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={ACCOUNT.signUpHref}
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-graphite px-6 text-[16px] font-semibold text-white transition-colors hover:bg-graphite-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite"
          >
            {ACCOUNT.signUpLabel} <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
          </a>
          <Link
            href={CTA.demoHref}
            className="inline-flex min-h-12 items-center text-[16px] font-semibold text-graphite underline decoration-ember decoration-2 underline-offset-[6px] hover:text-ember-deep"
          >
            {CTA.demoLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
