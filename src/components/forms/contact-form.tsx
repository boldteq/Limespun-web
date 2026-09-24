"use client";

import React, { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Field, Input, Textarea, Title, buttonClass, cn } from "@/components/system";
import { submitContact, type ContactFormState } from "@/app/contact/actions";
import { CONTACT_TOPICS, topicFromParam, type ContactTopic } from "@/app/contact/topics";

const initialState: ContactFormState = { status: "idle" };

const CARD = "rounded-card bg-white p-5 ring-1 ring-hair shadow-[var(--shadow-lift)] sm:p-8 lg:p-10";
const MESSAGE_MAX = 2000;

const inlineLink =
  "font-medium text-graphite underline decoration-hair-strong underline-offset-4 hover:decoration-ember focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite";

/**
 * The topic as a row of pills (native radios, so it posts and works before JS). The chosen
 * pill fills graphite with a tick; the keyboard ring sits on the pill, not the hidden radio.
 * A radiogroup rather than a fieldset: it is the group role that can carry aria-invalid.
 */
function TopicChips({
  defaultTopic,
  error,
  onPick,
}: {
  defaultTopic?: string;
  error?: string;
  onPick: (t: ContactTopic) => void;
}) {
  const errorId = error ? "contact-topic-error" : undefined;
  return (
    <div>
      <p id="contact-topic-label" className="text-[14px] font-semibold text-graphite">
        Topic
      </p>
      <div
        role="radiogroup"
        aria-labelledby="contact-topic-label"
        aria-describedby={errorId}
        aria-invalid={error ? true : undefined}
        aria-required="true"
        className="mt-3 flex flex-wrap gap-2"
      >
        {CONTACT_TOPICS.map((t) => (
          <label
            key={t.value}
            className={cn(
              "group relative inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full bg-white px-4 text-[15px] font-medium text-graphite-soft ring-1 ring-hair transition-[background-color,color,box-shadow] duration-200 select-none hover:ring-graphite/40",
              "has-[:checked]:bg-graphite has-[:checked]:text-white has-[:checked]:ring-graphite",
              "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-graphite",
              error && "ring-flag/50",
            )}
          >
            <input
              type="radio"
              name="topic"
              value={t.value}
              defaultChecked={t.value === defaultTopic}
              onChange={() => onPick(t.value)}
              className="sr-only"
            />
            <Check
              size={15}
              strokeWidth={2.6}
              aria-hidden="true"
              className="-ml-0.5 hidden shrink-0 group-has-[:checked]:block"
            />
            {t.label}
          </label>
        ))}
      </div>
      {error && (
        <p id={errorId} className="mt-2 text-[13px] font-medium text-flag">
          {error}
        </p>
      )}
    </div>
  );
}

function SentCard({ email, onAgain }: { email?: string; onAgain: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.focus();
  }, []);
  return (
    <div className={CARD} role="status">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-paid-soft text-paid">
        <Check size={20} strokeWidth={2.6} aria-hidden="true" />
      </span>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-5 text-title-md text-graphite focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-graphite"
      >
        Message sent
      </h2>
      <p className="mt-2 max-w-[460px] text-[16px] leading-[1.6] text-pretty text-graphite-soft">
        {email ? (
          <>
            We&apos;ll reply to <span className="font-semibold break-all text-graphite">{email}</span> within one
            business day.
          </>
        ) : (
          "We'll reply within one business day."
        )}
      </p>
      <button type="button" onClick={onAgain} className={cn(buttonClass("secondary"), "mt-7 w-full sm:w-auto")}>
        Send another message
      </button>
    </div>
  );
}

/** Name, email, topic chips and message on the system fields, posting to the contact server action. */
export function ContactForm({ initialTopic }: { initialTopic?: ContactTopic }) {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);
  // A sent message shows the card until "Send another message" hides that state.
  const [dismissed, setDismissed] = useState<ContactFormState | null>(null);
  const [round, setRound] = useState(0);
  const [topic, setTopic] = useState<string | undefined>(initialTopic);
  const formRef = useRef<HTMLFormElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);

  const sent = state.status === "success" && state !== dismissed;
  const failed = state.status === "error" && state !== dismissed;
  const errors = failed ? (state.errors ?? {}) : {};
  const values = failed ? state.values : undefined;
  const defaultTopic = values?.topic || initialTopic;

  // After a failed send, focus the first field to fix (or the message when no field is at fault).
  useEffect(() => {
    if (state.status !== "error") return;
    const firstInvalid = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
    // The topic group itself can't take focus; its chosen (or first) radio can.
    const target =
      firstInvalid?.getAttribute("role") === "radiogroup"
        ? (firstInvalid.querySelector<HTMLElement>("input:checked") ?? firstInvalid.querySelector<HTMLElement>("input"))
        : firstInvalid;
    (target ?? alertRef.current)?.focus();
  }, [state]);

  if (sent) {
    return (
      <SentCard
        email={state.email}
        onAgain={() => {
          setDismissed(state);
          setTopic(initialTopic);
          setRound((r) => r + 1);
        }}
      />
    );
  }

  const placeholder =
    CONTACT_TOPICS.find((t) => t.value === topic)?.placeholder ?? "Tell us what you need, in a line or two.";

  return (
    <div className={CARD}>
      <Title as="h2" size="md" id="contact-form-heading">
        Send a message
      </Title>
      <p className="mt-1.5 text-[15px] leading-[1.55] text-mute">It goes to the same inbox as email.</p>

      {failed && state.message && (
        <div
          ref={alertRef}
          role="alert"
          tabIndex={-1}
          className="mt-6 rounded-[12px] bg-flag-soft px-4 py-3 text-[14px] leading-[1.5] font-medium text-app-danger focus:outline-none"
        >
          {state.message}
        </div>
      )}

      <form
        key={round}
        ref={formRef}
        action={formAction}
        noValidate
        aria-labelledby="contact-form-heading"
        className="mt-6 flex flex-col gap-6 sm:mt-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Your name" htmlFor="contact-name" error={errors.name}>
            <Input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={100}
              defaultValue={values?.name}
            />
          </Field>
          <Field label="Email" htmlFor="contact-email" error={errors.email}>
            <Input
              id="contact-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              spellCheck={false}
              required
              maxLength={254}
              defaultValue={values?.email}
            />
          </Field>
        </div>

        <TopicChips defaultTopic={defaultTopic} error={errors.topic} onPick={setTopic} />

        <Field label="Message" htmlFor="contact-message" error={errors.message}>
          <Textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            maxLength={MESSAGE_MAX}
            placeholder={placeholder}
            defaultValue={values?.message}
          />
        </Field>

        {/* Honeypot: people never see it; a filled one is dropped by the action */}
        <div aria-hidden="true" className="hidden">
          <label htmlFor="contact-website">Website</label>
          <input id="contact-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <button
            type="submit"
            disabled={isPending}
            className={cn("group", buttonClass("primary"), "w-full shrink-0 disabled:cursor-wait disabled:opacity-70 sm:w-auto")}
          >
            {isPending ? (
              <>
                <Loader2 size={16} strokeWidth={2.4} aria-hidden="true" className="animate-spin" />
                Sending
              </>
            ) : (
              <>
                Send message
                <ArrowRight
                  size={16}
                  strokeWidth={2.4}
                  aria-hidden="true"
                  className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </>
            )}
          </button>
          <p className="text-[14px] leading-[1.5] text-pretty text-mute">
            We reply within one business day and use your details only to answer you.{" "}
            <Link href="/legal/privacy" className={inlineLink}>
              Privacy Policy
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

/** The form with `?topic=` preselected (the switching hub links to `/contact?topic=switching`). */
export function ContactFormFromUrl() {
  const params = useSearchParams();
  const topic = topicFromParam(params.get("topic"));
  return <ContactForm key={topic ?? "none"} initialTopic={topic} />;
}
