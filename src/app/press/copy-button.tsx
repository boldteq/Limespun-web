"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/components/system/cn";

/**
 * Copies a block of text (the boilerplate) to the clipboard. The text itself stays on the
 * page, selectable, so a failed copy never hides it; the live region announces the result.
 */
export function CopyButton({ text, label, className }: { text: string; label: string; className?: string }) {
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
          "inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-[15px] font-semibold text-graphite ring-1 ring-hair-strong transition-colors duration-200 hover:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite",
          className,
        )}
      >
        {state === "copied" ? (
          <Check size={16} strokeWidth={2.4} className="text-ember" aria-hidden="true" />
        ) : (
          <Copy size={16} strokeWidth={2} aria-hidden="true" />
        )}
        {state === "copied" ? "Copied" : label}
      </button>
      <span role="status" className="sr-only">
        {state === "copied" ? "Copied to the clipboard." : state === "failed" ? "Couldn’t copy. Select the text instead." : ""}
      </span>
    </>
  );
}
