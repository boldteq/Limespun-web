/**
 * Facts shared by the five legal pages. Each one is checked against the app (InkOS repo);
 * change it here, not in a page, so the documents never disagree.
 *
 * Sub-processors: the providers the production app is wired to and requires or sends
 * through (InkOS lib/env.ts assertProductionEnv, lib/dodo, lib/email/resend.ts,
 * lib/sms/twilio.ts, lib/rate-limit.ts, lib/ai/* via @anthropic-ai/sdk). Sentry is wired
 * but SENTRY_DSN is unset in production (InkOS docs/ops/check-2026-09-22 F11, reconfirmed
 * check-2026-09-23), so it is not listed; add it here the day it is switched on. Optional integrations a studio switches on itself are not
 * listed until the founder confirms them.
 */

/** Every legal page carries this date. Bump it with any change to the documents. */
export const LEGAL_EFFECTIVE_DATE = "2026-09-24";

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
  // AI features are sold on Pro (plans.ts PLAN_MATRIX, InkOS FEATURE_MIN_PLAN ai_assist) and flash
  // tagging runs on upload (InkOS lib/ai/flash-vision.ts). ANTHROPIC_API_KEY is optional in InkOS
  // lib/env.ts, but InkOS docs/ops/YASH-QUEUE.md R8 (Railway list-variables on the live InkOS
  // service, 2026-09-17) names it among the variables production carries, so the row stays.
  // Waiting on Yash: confirm the key is still set and record the Anthropic DPA date in InkOS
  // docs/legal/subprocessors.md. If AI is switched off in production, delete this one row:
  // /legal/privacy, /legal/gdpr and /legal/security all read SUB_PROCESSORS.
  ["Anthropic", "AI features: suggested replies, aftercare and consult summaries, and flash image tagging"],
];

export const SUB_PROCESSOR_TABLE = {
  head: ["Provider", "What it does for Limespun"] as [string, string],
  rows: SUB_PROCESSORS,
};

export const TRANSFERS =
  "When personal data from the UK or the European Economic Area is transferred to the United States or another country outside those regions, we rely on the European Commission's Standard Contractual Clauses and the UK International Data Transfer Addendum.";
