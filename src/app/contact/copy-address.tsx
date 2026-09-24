"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/components/system";

/**
 * Copies a mailbox for people whose computer has no mail app behind mailto links.
 * The result is announced in the button's own live region.
 */
export function CopyAddress({ address, className }: { address: string; className?: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function copy() {
    try {
      await navigator.clipboard.writeText(address);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2400);
  }

  const label = status === "copied" ? "Copied" : status === "failed" ? "Copy failed" : "Copy";

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={status === "idle" ? `Copy ${address}` : undefined}
      className={cn(
        "inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full px-4 text-[14px] font-semibold text-graphite ring-1 ring-hair transition-[background-color,box-shadow] duration-200 hover:bg-canvas hover:ring-hair-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite",
        className,
      )}
    >
      {status === "copied" ? (
        <Check size={15} strokeWidth={2.6} aria-hidden="true" className="text-paid" />
      ) : (
        <Copy size={15} strokeWidth={2.2} aria-hidden="true" />
      )}
      <span aria-live="polite">{label}</span>
    </button>
  );
}
