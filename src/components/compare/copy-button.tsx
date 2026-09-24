"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/components/system";

/**
 * Copies one block of announcement text. It reads "Copy" and its accessible name says what it
 * copies ("Copy text message", via `what`); a polite live region announces the result, so it
 * works without seeing the icon swap.
 */
export function CopyButton({ text, what, className }: { text: string; what: string; className?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2400);
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={cn(
          "inline-flex min-h-11 min-w-[6.5rem] items-center justify-center gap-2 rounded-full px-4 text-[15px] font-semibold text-graphite ring-1 ring-graphite/70 transition-colors duration-200 hover:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite",
          className,
        )}
      >
        {state === "copied" ? (
          <Check size={16} strokeWidth={2.6} aria-hidden="true" className="text-ember" />
        ) : (
          <Copy size={16} strokeWidth={2.2} aria-hidden="true" />
        )}
        {state === "copied" ? (
          "Copied"
        ) : (
          <span>
            Copy<span className="sr-only"> {what}</span>
          </span>
        )}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {state === "copied" ? "Copied to the clipboard" : state === "failed" ? "Couldn't copy. Select the text instead." : ""}
      </span>
    </>
  );
}
