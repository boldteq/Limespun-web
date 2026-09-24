"use client";

import React, { useActionState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { subscribeToNewsletter, type NewsletterState } from "@/app/actions/newsletter";

const initialState: NewsletterState = { status: "idle" };

/**
 * Mirrors the brand column beside it: text group on top, the field and its one-line note at the
 * bottom, stretched so both columns start and end on the same lines.
 */
export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribeToNewsletter, initialState);

  const intro = (
    <div>
      <p className="text-[12px] leading-none font-semibold tracking-[0.08em] text-ember-deep uppercase">
        Studio notes · free, monthly
      </p>
      <p className="mt-3 text-[17px] leading-snug font-semibold text-graphite">
        <label htmlFor="newsletter-email">Fewer no-shows, fuller books.</label>
      </p>
      <p id="newsletter-hint" className="mt-2 text-[15px] leading-[1.55] text-graphite-soft">
        One email a month: deposit wording, consent templates and real pricing and split numbers.
      </p>
    </div>
  );

  if (state.status === "success") {
    return (
      <div className="flex w-full max-w-[420px] flex-col justify-between gap-5">
        {intro}
        <p role="status" className="flex min-h-11 items-center gap-2.5 text-[15px] text-graphite">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-paid-soft text-paid">
            <Check size={14} strokeWidth={2.8} aria-hidden="true" />
          </span>
          <span>
            <span className="font-semibold">You&apos;re in.</span> The first issue lands next month.
          </span>
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="flex w-full max-w-[420px] flex-col justify-between gap-5">
      {intro}
      <div>
        <div className="flex h-11 items-center rounded-full bg-canvas pl-5 ring-1 ring-hair transition-shadow focus-within:ring-2 focus-within:ring-graphite/30">
          <input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Your studio email"
            aria-describedby={state.status === "error" ? "newsletter-error" : "newsletter-hint"}
            aria-invalid={state.status === "error"}
            className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-graphite placeholder:text-mute focus:outline-none"
          />
          {/* Honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          <button
            type="submit"
            disabled={pending}
            aria-label="Subscribe to Studio notes"
            className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ember disabled:opacity-60"
          >
            {/* 44px tap target; the visible circle stays 36px so the pill keeps its shape */}
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ember-soft text-ember-deep transition-colors group-hover:bg-ember group-hover:text-white">
              {pending ? (
                <Loader2 size={16} strokeWidth={2.4} className="animate-spin" aria-hidden="true" />
              ) : (
                <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
              )}
            </span>
          </button>
        </div>
        {/* One line under the field; the error takes the same slot, so nothing shifts */}
        {state.status === "error" ? (
          <p id="newsletter-error" role="alert" className="mt-2 text-[12px] leading-4 text-flag">
            {state.message}
          </p>
        ) : (
          <p className="mt-2 text-[12px] leading-4 text-mute">Free. No spam. Unsubscribe in one click.</p>
        )}
      </div>
    </form>
  );
}
