/**
 * Motion helpers shared by the system's client components (Reveal, Tabs, ScrollStory).
 * Durations and easing live in globals.css (--dur-*, --ease-out-quart); these mirror them for JS.
 */

/** Delay between items that reveal together, and how many items can stack that delay. */
export const REVEAL_STAGGER_MS = 60;
export const REVEAL_STAGGER_CAP = 5;

/** True when the visitor asked for reduced motion. Always false on the server. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** "smooth" unless reduced motion is on, for scrollIntoView / scrollTo calls. */
export function scrollBehavior(): ScrollBehavior {
  return prefersReducedMotion() ? "instant" : "smooth";
}
