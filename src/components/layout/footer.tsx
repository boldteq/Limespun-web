import React from "react";
import Link from "next/link";
import { Download, KeyRound, Lock, Mail, ShieldCheck } from "lucide-react";
import { LimespunMark } from "@/components/brand/limespun-mark";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { CONTACT_EMAIL, SOCIAL } from "@/lib/brand";
import { ASK_AI_LINKS, FOOTER_GROUPS, LEGAL_LINKS } from "@/lib/site-links";
import { SystemStatus } from "@/components/layout/system-status";

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
  { icon: KeyRound, text: "Two-factor sign-in available on every account" },
  { icon: Download, text: "Export your clients and signed forms any time" },
];

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

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="border-t border-hair">
        <div className="mx-auto max-w-[1280px] px-5 pt-14 pb-10 sm:px-8">
          {/* Brand + newsletter */}
          <div className="flex flex-col gap-10 border-b border-hair pb-12 lg:flex-row lg:items-stretch lg:justify-between">
            <div className="max-w-[420px]">
              <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Limespun home">
                <LimespunMark size={34} />
                <span className="text-[25px] leading-none font-bold tracking-[-0.03em] text-graphite">Limespun</span>
              </Link>
              <p className="mt-5 text-[17px] leading-[1.55] text-graphite-soft">
                Software for tattoo studios: bookings, deposits, consent forms and artist payouts. Built with tattoo
                artists, for the studios they run.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                {SOCIAL_LINKS.map((sl) => (
                  <a
                    key={sl.label}
                    href={sl.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Limespun on ${sl.label}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full text-graphite ring-1 ring-hair transition-colors hover:bg-canvas hover:text-ember-deep"
                  >
                    {sl.icon}
                  </a>
                ))}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="ml-1 inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[14px] font-medium text-graphite ring-1 ring-hair transition-colors hover:bg-canvas"
                >
                  <Mail size={15} strokeWidth={2} aria-hidden="true" /> {CONTACT_EMAIL}
                </a>
              </div>
            </div>
            <NewsletterForm />
          </div>

          {/* Link columns */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 pt-12 sm:grid-cols-3 lg:grid-cols-6">
            {FOOTER_GROUPS.map((group) => (
              <div key={group.heading}>
                <h2 className="text-[13px] font-semibold tracking-[0.06em] text-mute uppercase">{group.heading}</h2>
                <ul className="mt-4 flex flex-col">
                  {group.links.map((l) => (
                    <li key={`${group.heading}-${l.href}`}>
                      <FooterLink
                        href={l.href}
                        className="inline-flex min-h-10 items-center text-[15px] text-graphite transition-colors hover:text-ember-deep"
                      >
                        {l.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Security facts — each one verified against the app — plus live status */}
          <div className="mt-12 rounded-[20px] bg-canvas px-6 py-6 sm:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <Link
                href="/legal/security"
                className="inline-flex items-center gap-2.5 text-[15px] font-semibold text-graphite hover:text-ember-deep"
              >
                <ShieldCheck size={18} strokeWidth={2} className="shrink-0 text-paid" aria-hidden="true" />
                How we protect your studio&apos;s data <span aria-hidden="true">→</span>
              </Link>
              <SystemStatus />
            </div>
            <ul className="mt-5 grid gap-x-6 gap-y-3 border-t border-hair pt-5 sm:grid-cols-2 lg:grid-cols-4">
              {SECURITY_FACTS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-2.5 text-[14px] leading-snug text-graphite-soft">
                  <Icon size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-graphite" aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-hair pt-4 text-[14px]">
              <span className="text-mute">Ask AI about Limespun:</span>
              {ASK_AI_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-graphite underline decoration-hair-strong underline-offset-4 hover:decoration-ember"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className="mt-10 flex flex-col gap-4 border-t border-hair pt-8 sm:flex-row sm:items-center sm:justify-between">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {LEGAL_LINKS.map((l) => (
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
      </div>
    </footer>
  );
}
