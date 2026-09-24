"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "./cn";

export interface StoryStep {
  title: string;
  body: React.ReactNode;
}

/**
 * A walk through the product in order. From lg the frame sticks beside the steps and swaps
 * as each step crosses the middle of the screen (the step gets data-active and an ember rule;
 * text keeps full contrast, nothing is dimmed). Below lg every
 * step shows its own frame under its copy, so nothing depends on scroll position. Frames are
 * decorative product screens; reduced motion swaps them without the fade (globals.css).
 */
export function ScrollStory({
  steps,
  frames,
  className,
}: {
  steps: StoryStep[];
  frames: React.ReactNode[];
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = Number((entry.target as HTMLElement).dataset.step);
          if (Number.isFinite(i)) setActive(i);
        }
      },
      // A line across the middle of the viewport: whichever step sits on it is the active one.
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    for (const el of stepRefs.current) if (el) io.observe(el);
    return () => io.disconnect();
  }, [steps.length]);

  return (
    <div className={cn("lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16", className)}>
      <ol className="flex flex-col gap-14 lg:gap-0">
        {steps.map((s, i) => (
          <li
            key={s.title}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            data-step={i}
            data-active={i === active ? "" : undefined}
            className="group min-w-0 transition-colors duration-300 lg:flex lg:min-h-[60vh] lg:flex-col lg:justify-center lg:border-l-2 lg:border-hair-strong lg:pl-8 lg:data-[active]:border-ember"
          >
            <p className="text-label text-ember-deep uppercase transition-colors duration-300 lg:text-mute lg:group-data-[active]:text-ember-deep">
              <span className="sr-only">Step </span>
              {i + 1} of {steps.length}
            </p>
            <h3 className="mt-3 text-title-md text-balance text-graphite">{s.title}</h3>
            <div className="mt-3 max-w-[460px] text-[17px] leading-[1.6] text-pretty text-graphite-soft">{s.body}</div>
            {frames[i] !== undefined && (
              <div aria-hidden="true" className="mt-7 min-w-0 lg:hidden">
                {frames[i]}
              </div>
            )}
          </li>
        ))}
      </ol>
      <div aria-hidden="true" className="hidden min-w-0 lg:block">
        <div className="sticky top-28 grid">
          {frames.map((f, i) => (
            <div
              key={i}
              data-active={i === active ? "" : undefined}
              className="ls-story-frame min-w-0 [grid-area:1/1]"
            >
              {f}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
