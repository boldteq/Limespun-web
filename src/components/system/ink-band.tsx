import React from "react";
import { LimespunMark } from "@/components/brand/limespun-mark";
import { ACCOUNT } from "@/lib/brand";
import { MONEY_BACK_DAYS } from "@/lib/data/plans";
import { Button } from "./button";
import { Container } from "./section";
import { Display } from "./type";

interface Action {
  label: string;
  href: string;
}

/**
 * The signature closer on every page: ink surface with three ember glows, the mark, a serif
 * headline with one italic ember word, one line of reassurance, then Create account and a
 * contextual second link. Pass secondary={null} to show the primary alone.
 */
export function InkBand({
  eyebrow,
  headline = "Run the shop in one place.",
  italicWord = "place",
  sub = `Create your account in minutes. We move your data over for you. ${MONEY_BACK_DAYS}-day money-back guarantee.`,
  primary = { label: ACCOUNT.signUpLabel, href: ACCOUNT.signUpHref },
  secondary = { label: "See pricing", href: "/pricing" },
  mark = true,
}: {
  eyebrow?: string;
  headline?: string;
  italicWord?: string;
  sub?: React.ReactNode;
  primary?: Action;
  secondary?: Action | null;
  mark?: boolean;
}) {
  return (
    <section aria-labelledby="ink-band-heading" className="ink-glow relative overflow-hidden py-section-y text-center">
      <Container width="narrow" className="flex flex-col items-center">
        {(mark || eyebrow) && (
          <div className="mb-8 flex flex-col items-center gap-4">
            {mark && <LimespunMark size={56} />}
            {eyebrow && (
              <p className="rounded-full bg-ink-pill px-4 py-1.5 text-[13px] font-medium tracking-[0.02em] text-ink-muted">
                {eyebrow}
              </p>
            )}
          </div>
        )}
        <Display id="ink-band-heading" size={2} italicWord={italicWord} className="max-w-[760px] text-ink-text">
          {headline}
        </Display>
        <p className="mt-5 max-w-[520px] text-[17px] leading-[1.6] text-pretty text-ink-muted sm:text-[18px]">{sub}</p>
        <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
          <Button href={primary.href} tone="ink" arrow>
            {primary.label}
          </Button>
          {secondary && (
            <Button href={secondary.href} variant="secondary" tone="ink">
              {secondary.label}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
