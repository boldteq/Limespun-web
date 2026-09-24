"use client";

import React, { useActionState, useId } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { subscribeToNewsletter, type NewsletterState } from "@/app/actions/newsletter";

const initialState: NewsletterState = { status: "idle" };

interface NewsletterFormProps {
  /** Small ember label above the title. */
  eyebrow?: string;
  /** The field's visible label. */
  title?: string;
  /** What subscribers get. Promise only what is sent: no dates, no numbers we don't have. */
  hint?: string;
}

/**
 * Mirrors the brand column beside it in the footer: text group on top, the field and its one-line
 * note at the bottom, stretched so both columns start and end on the same lines. Ids come from
 * useId, so a second form on the same page (e.g. /changelog) never clashes with the footer's.
 */
export function NewsletterForm({
  eyebrow = "Studio notes · free",
  title = "Fewer no-shows, fuller books.",
  hint = "At most one email a month: deposit wording, consent templates and payout math.",
}: NewsletterFormProps = {}) {
  const [state, formAction, pending] = useActionState(subscribeToNewsletter, initialState);
  const uid = useId();
  const emailId = `${uid}-email`;
  const hintId = `${uid}-hint`;
  const errorId = `${uid}-error`;

  const intro = (
    <div>
      <p className="text-[12px] leading-none font-semibold tracking-[0.08em] text-ember-deep uppercase">{eyebrow}</p>
      <p className="mt-3 text-[17px] leading-snug font-semibold text-graphite">
        <label htmlFor={emailId}>{title}</label>
      </p>
      <p id={hintId} className="mt-2 text-[15px] leading-[1.55] text-graphite-soft">
        {hint}
      </p>
    </div>
  );

  if (state.status === "success") {
    return (
      <div className="flex w-full max-w-[420px] flex-col justify-between gap-4 sm:gap-5">
        {intro}
        <p role="status" className="flex min-h-11 items-center gap-2.5 text-[15px] text-graphite">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-paid-soft text-paid">
            <Check size={14} strokeWidth={2.8} aria-hidden="true" />
          </span>
          <span>
            <span className="font-semibold">You&apos;re in.</span> Watch your inbox for the next issue.
          </span>
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="flex w-full max-w-[420px] flex-col justify-between gap-4 sm:gap-5">
      {intro}
      <div>
        <div className="flex h-11 items-center rounded-full bg-canvas pl-5 ring-1 ring-hair transition-shadow focus-within:ring-2 focus-within:ring-graphite/30">
          <input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Your studio email"
            aria-describedby={state.status === "error" ? errorId : hintId}
            aria-invalid={state.status === "error"}
            className="h-full min-w-0 flex-1 bg-transparent text-[16px] text-graphite placeholder:text-mute focus:outline-none sm:text-[15px]"
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
          <p id={errorId} role="alert" className="mt-2 text-[12px] leading-4 text-flag">
            {state.message}
          </p>
        ) : (
          <p className="mt-2 text-[12px] leading-4 text-mute">Free. No spam. Unsubscribe any time.</p>
        )}
      </div>
    </form>
  );
}
