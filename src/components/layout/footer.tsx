import React from "react";
import Link from "next/link";
import { ChevronDown, Download, KeyRound, Lock, Mail, ShieldCheck } from "lucide-react";
import { LimespunMark } from "@/components/brand/limespun-mark";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { CONTACT_EMAIL, SOCIAL } from "@/lib/brand";
import { ASK_AI_LINKS, FOOTER_GROUPS, LEGAL_LINKS, type LinkGroup } from "@/lib/site-links";
import { SystemStatus } from "@/components/layout/system-status";
// The system's cn (knows the text-* size tokens); imported by path because error.tsx renders this footer on the client.
import { cn } from "@/components/system/cn";

/** Keyboard focus ring used across the site: graphite, never the browser's blue. */
const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm7 0h3.8v1.5h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1v5.46h-4v-4.84c0-1.16-.02-2.64-1.61-2.64-1.61 0-1.86 1.26-1.86 2.56v4.92H10v-11Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="currentColor">
      <path d="M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.96-1.97C18.84 4 12 4 12 4s-6.84 0-8.58.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.96 1.97C5.16 20 12 20 12 20s6.84 0 8.58-.45a2.78 2.78 0 0 0 1.96-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "Instagram", href: SOCIAL.instagram, icon: <InstagramIcon /> },
  { label: "LinkedIn", href: SOCIAL.linkedin, icon: <LinkedInIcon /> },
  { label: "X", href: SOCIAL.x, icon: <XIcon /> },
  { label: "YouTube", href: SOCIAL.youtube, icon: <YouTubeIcon /> },
];

/** Verified against the app: HTTPS+HSTS and provider encryption, per-studio row-level security, TOTP 2FA (offered, not enforced), CSV/data/PDF export. */
const SECURITY_FACTS = [
  { icon: Lock, text: "Encrypted in transit and at rest" },
  { icon: ShieldCheck, text: "Each studio's data kept separate" },
  { icon: KeyRound, text: "Optional two-factor sign-in on every plan" },
  { icon: Download, text: "Export clients and signed forms any time" },
];

/** Every footer link is a 44px target, text left-aligned so the columns read as lists. */
const LINK = cn(
  "inline-flex min-h-11 min-w-11 items-center rounded-md text-[15px] text-graphite transition-colors hover:text-ember-deep",
  FOCUS,
);

const isExternal = (href: string) => href.startsWith("http");

function FooterLink({ href, children, className }: { href: string; children: React.ReactNode; className: string }) {
  return isExternal(href) ? (
    <a href={href} className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function LinkList({ group, className }: { group: LinkGroup; className?: string }) {
  return (
    <ul className={className}>
      {group.links.map((l) => (
        <li key={`${group.heading}-${l.href}`} className="min-w-0">
          <FooterLink href={l.href} className={LINK}>
            {l.label}
          </FooterLink>
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="border-t border-hair">
        <div className="mx-auto max-w-[1280px] px-5 pt-9 pb-6 sm:px-8 sm:pt-14 sm:pb-10">
          {/* Brand + newsletter */}
          <div className="flex flex-col gap-8 border-b border-hair pb-8 sm:gap-10 sm:pb-12 lg:flex-row lg:items-stretch lg:justify-between">
            <div className="max-w-[420px]">
              <Link
                href="/"
                className={cn("-my-[5px] inline-flex min-h-11 items-center gap-2.5 rounded-lg", FOCUS)}
                aria-label="Limespun home"
              >
                <LimespunMark size={34} />
                <span className="text-[25px] leading-none font-bold tracking-[-0.03em] text-graphite">Limespun</span>
              </Link>
              <p className="mt-4 text-[15px] leading-[1.55] text-pretty text-graphite-soft sm:mt-5 sm:text-[17px]">
                Studio software built only for tattoo: bookings, deposits, consent forms and artist payouts. Flat
                monthly price, no cut of your bookings.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2 sm:mt-6">
                {SOCIAL_LINKS.map((sl) => (
                  <a
                    key={sl.label}
                    href={sl.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Limespun on ${sl.label}`}
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-full text-graphite ring-1 ring-hair transition-colors hover:bg-canvas hover:text-ember-deep",
                      FOCUS,
                    )}
                  >
                    {sl.icon}
                  </a>
                ))}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[14px] font-medium text-graphite ring-1 ring-hair transition-colors hover:bg-canvas sm:ml-1",
                    FOCUS,
                  )}
                >
                  <Mail size={15} strokeWidth={2} aria-hidden="true" /> {CONTACT_EMAIL}
                </a>
              </div>
            </div>
            <NewsletterForm />
          </div>

          <nav aria-label="Footer">
            {/* Phones: each column folds into a disclosure; opening one closes the others */}
            <div className="sm:hidden">
              {FOOTER_GROUPS.map((group) => (
                <details key={group.heading} name="footer-links" className="group border-b border-hair">
                  <summary
                    className={cn(
                      "flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 rounded-md text-[15px] font-semibold text-graphite [&::-webkit-details-marker]:hidden",
                      FOCUS,
                    )}
                  >
                    {group.heading}
                    <ChevronDown
                      size={18}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="shrink-0 text-mute transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                    />
                  </summary>
                  <LinkList group={group} className="grid grid-cols-2 gap-x-4 pb-3" />
                </details>
              ))}
            </div>

            {/* sm and up: every column open */}
            <div className="hidden gap-x-6 gap-y-10 pt-12 sm:grid sm:grid-cols-3 lg:grid-cols-6">
              {FOOTER_GROUPS.map((group) => (
                <div key={group.heading}>
                  <h2 className="text-[13px] font-semibold tracking-[0.06em] text-mute uppercase">{group.heading}</h2>
                  <LinkList group={group} className="mt-3 flex flex-col" />
                </div>
              ))}
            </div>
          </nav>

          {/* Security facts — each one verified against the app — plus live status */}
          <div className="mt-8 rounded-[20px] bg-canvas px-5 py-4 sm:mt-12 sm:px-8 sm:py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-4">
              <Link
                href="/legal/security"
                className={cn(
                  "inline-flex min-h-11 items-center gap-2.5 self-start rounded-md text-[15px] font-semibold text-graphite hover:text-ember-deep",
                  FOCUS,
                )}
              >
                <ShieldCheck size={18} strokeWidth={2} className="shrink-0 text-paid" aria-hidden="true" />
                <span>
                  How we protect your studio&apos;s data <span aria-hidden="true">→</span>
                </span>
              </Link>
              <SystemStatus />
            </div>
            <ul className="mt-2 grid gap-x-6 gap-y-2.5 border-t border-hair pt-3.5 sm:mt-4 sm:grid-cols-2 sm:gap-y-3 sm:pt-5 lg:grid-cols-4">
              {SECURITY_FACTS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-2.5 text-[14px] leading-snug text-balance text-graphite-soft">
                  <Icon size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-graphite" aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 border-t border-hair pt-1 text-[14px] sm:mt-5 sm:pt-3">
              <span className="text-mute">
                Ask AI<span className="max-sm:sr-only"> about Limespun</span>:
              </span>
              {ASK_AI_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex min-h-11 min-w-11 items-center rounded-sm font-medium text-graphite underline decoration-hair-strong underline-offset-4 hover:decoration-ember",
                    FOCUS,
                  )}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className="mt-6 flex flex-col gap-1 border-t border-hair pt-3 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-6">
            <ul className="flex flex-wrap gap-x-5 sm:gap-x-6">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={cn(
                      "inline-flex min-h-11 min-w-11 items-center rounded-sm text-[14px] text-graphite-soft transition-colors hover:text-graphite",
                      FOCUS,
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-[14px] text-mute">© {new Date().getFullYear()} Limespun · Built by Boldteq</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
