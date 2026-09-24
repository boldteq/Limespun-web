/**
 * Contact form topics. `value` is what the form posts and what `/contact?topic=` preselects
 * (the switching hub links to `?topic=switching`); `subject` tags the email to the inbox.
 * Kept out of actions.ts: a "use server" module may only export async functions.
 */
export const CONTACT_TOPICS = [
  {
    value: "sales",
    label: "Plans and pricing",
    subject: "Sales",
    placeholder: "How many artists and locations you have, and what you'd like to know about the plans.",
  },
  {
    value: "switching",
    label: "Switching from another tool",
    subject: "Switching",
    placeholder: "Which tool you use now, roughly how many clients you have, and when you'd like to move.",
  },
  {
    value: "support",
    label: "Help with my account",
    subject: "Support",
    placeholder: "What you were doing, what happened, and the studio name on your account.",
  },
  {
    value: "press",
    label: "Press",
    subject: "Press",
    placeholder: "Your publication, your deadline and what you'd like to know.",
  },
  {
    value: "feature-request",
    label: "An idea for the app",
    subject: "Idea",
    placeholder: "What you'd like the app to do, and how your studio handles it today.",
  },
  {
    value: "other",
    label: "Something else",
    subject: "Other",
    placeholder: "A line or two is plenty.",
  },
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number]["value"];

export const CONTACT_TOPIC_VALUES = CONTACT_TOPICS.map((t) => t.value) as [ContactTopic, ...ContactTopic[]];

/** Other words a link might use for a topic (old links, the roadmap, the retired demo page). */
const ALIASES: Record<string, ContactTopic> = {
  demo: "sales",
  pricing: "sales",
  plans: "sales",
  switch: "switching",
  migrate: "switching",
  migration: "switching",
  help: "support",
  idea: "feature-request",
  feature: "feature-request",
  feedback: "feature-request",
  roadmap: "feature-request",
  partnership: "other",
};

function isTopic(v: string): v is ContactTopic {
  return (CONTACT_TOPIC_VALUES as string[]).includes(v);
}

/** `?topic=` → a topic, or undefined for anything unknown (nothing is preselected). */
export function topicFromParam(raw: string | null | undefined): ContactTopic | undefined {
  const v = raw?.trim().toLowerCase();
  if (!v) return undefined;
  if (isTopic(v)) return v;
  return ALIASES[v];
}

export function topicSubject(v: ContactTopic): string {
  return CONTACT_TOPICS.find((t) => t.value === v)?.subject ?? "Other";
}
