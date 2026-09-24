"use client";

import { useEffect, useRef } from "react";

/**
 * Marks the "On this page" link for the section being read with aria-current="location".
 * Renders an empty hidden span inside the TOC and works on its parent, so the TOC itself
 * stays a server component; without scripts the list is plain links.
 */
export function TocSpy({ ids }: { ids: string[] }) {
  const ref = useRef<HTMLSpanElement>(null);
  const key = ids.join("|");

  useEffect(() => {
    const root = ref.current?.parentElement;
    if (!root) return;
    const links = Array.from(root.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
    const targets = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    let current = "";
    let frame = 0;
    const apply = (id: string) => {
      if (id === current) return;
      current = id;
      for (const a of links) {
        if (id && a.getAttribute("href") === `#${id}`) a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
      }
    };
    // The section whose heading last crossed the upper third of the viewport is the one being read
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let active = "";
      for (const t of targets) {
        if (t.getBoundingClientRect().top <= line) active = t.id;
        else break;
      }
      apply(active);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [key]);

  return <span ref={ref} hidden />;
}
