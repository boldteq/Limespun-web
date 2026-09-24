/**
 * Facts shared by the five legal pages. Each one is checked against the app (InkOS repo);
 * change it here, not in a page, so the documents never disagree.
 *
 * Sub-processors: the providers the production app is wired to and requires or sends
 * through (InkOS lib/env.ts assertProductionEnv, lib/dodo, lib/email/resend.ts,
 * lib/sms/twilio.ts, lib/rate-limit.ts, lib/ai/* via @anthropic-ai/sdk). Sentry is wired
 * but SENTRY_DSN is unset in production (InkOS docs/ops/check-2026-09-22); add it here
 * the day it is switched on. Optional integrations a studio switches on itself are not
 * listed until the founder confirms them.
 */

/** Every legal page carries this date. Bump it with any change to the documents. */
export const LEGAL_EFFECTIVE_DATE = "2026-09-23";

/** Supabase project on AWS us-west-2 (InkOS docs/ops/SCHEMA-BASELINE.md); app on Railway. */
export const DATA_LOCATION =
  "Your studio's database and files are hosted by our infrastructure providers in the United States (AWS us-west-2, Oregon); the app runs on Railway.";

export const SUB_PROCESSORS: [string, string][] = [
  ["Supabase", "Database, file storage and sign-in"],
  ["Railway", "Application hosting"],
  ["Upstash", "Rate limiting"],
  ["Resend", "Email"],
  ["Dodo Payments", "Subscription billing and card payments"],
  ["Twilio", "Text messages (SMS)"],
  ["Anthropic", "AI features: drafted replies, consult summaries and aftercare notes"],
];

export const SUB_PROCESSOR_TABLE = {
  head: ["Provider", "What it does for Limespun"] as [string, string],
  rows: SUB_PROCESSORS,
};

export const TRANSFERS =
  "When personal data from the UK or the European Economic Area is transferred to the United States or another country outside those regions, we rely on the European Commission's Standard Contractual Clauses and the UK International Data Transfer Addendum.";
