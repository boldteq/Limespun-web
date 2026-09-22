"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { STATUS_PAGE_URL } from "@/lib/brand";

type State = "checking" | "operational" | "degraded" | "unknown";

const COPY: Record<State, { label: string; dot: string }> = {
  checking: { label: "Checking system status", dot: "bg-hair-strong" },
  operational: { label: "All systems operational", dot: "bg-paid" },
  degraded: { label: "Some systems are having trouble", dot: "bg-ember" },
  unknown: { label: "System status", dot: "bg-hair-strong" },
};

/** Live status from the app's own health check (via /api/status). Never shows a green light it didn't receive. */
export function SystemStatus() {
  const [state, setState] = useState<State>("checking");

  useEffect(() => {
    const ctrl = new AbortController();
    fetch("/api/status", { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : { state: "unknown" }))
      .then((d: { state?: string }) => {
        setState(d.state === "operational" || d.state === "degraded" ? d.state : "unknown");
      })
      .catch(() => setState("unknown"));
    return () => ctrl.abort();
  }, []);

  const { label, dot } = COPY[state];
  const content = (
    <>
      <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
        {state === "operational" && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-paid opacity-40 motion-reduce:hidden" />
        )}
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${dot}`} />
      </span>
      <span>{label}</span>
      {STATUS_PAGE_URL && <ArrowUpRight size={14} aria-hidden="true" />}
    </>
  );

  return STATUS_PAGE_URL ? (
    <a
      href={STATUS_PAGE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-live="polite"
      className="inline-flex min-h-10 items-center gap-2 text-[14px] font-medium text-graphite hover:text-ember-deep"
    >
      {content}
    </a>
  ) : (
    <span aria-live="polite" className="inline-flex min-h-10 items-center gap-2 text-[14px] font-medium text-graphite">
      {content}
    </span>
  );
}
