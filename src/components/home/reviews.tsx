"use client";

import React, { useState } from "react";
import { Play } from "lucide-react";
import { SHOW_SAMPLE_REVIEWS, sampleTestimonials, testimonials, type Testimonial } from "@/lib/data/testimonials";
import { Display, StripedFrame } from "./ui";

function initials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function ReviewCard({ t, sample }: { t: Testimonial; sample: boolean }) {
  const [playing, setPlaying] = useState(false);
  const canPlay = Boolean(t.videoSrc);

  return (
    <figure className="flex w-[82%] shrink-0 snap-start flex-col rounded-[24px] bg-white p-3 ring-1 ring-hair sm:w-[46%] lg:w-auto">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-graphite">
        {playing && t.videoSrc ? (
          <video
            src={t.videoSrc}
            poster={t.poster}
            controls
            autoPlay
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full object-cover"
          >
            {t.captionsSrc && <track kind="captions" src={t.captionsSrc} srcLang="en" label="English" default />}
          </video>
        ) : (
          <>
            {t.poster ? (
              // eslint-disable-next-line @next/next/no-img-element -- plain poster frame; next/image adds nothing for a static still here
              <img src={t.poster} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            ) : (
              <div className="absolute inset-0">
                <StripedFrame className="h-full rounded-none">
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 font-serif text-[32px] text-graphite">
                      {initials(t.name)}
                    </span>
                  </span>
                </StripedFrame>
              </div>
            )}
            <button
              type="button"
              onClick={() => canPlay && setPlaying(true)}
              disabled={!canPlay}
              aria-label={canPlay ? `Play ${t.name}'s review` : `${t.name}'s video review (not available yet)`}
              className="group absolute inset-0 flex items-end justify-between p-4 text-left focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white enabled:cursor-pointer disabled:cursor-default"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-graphite shadow-[var(--shadow-lift)] transition-transform duration-200 group-hover:scale-105">
                <Play size={20} strokeWidth={2.2} className="translate-x-[1px] fill-current" aria-hidden="true" />
              </span>
              {t.duration && (
                <span className="rounded-full bg-graphite/80 px-2.5 py-1 text-[12px] font-semibold text-white tabular-nums">
                  {t.duration}
                </span>
              )}
            </button>
            {sample && (
              <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] text-ember-deep uppercase">
                Sample
              </span>
            )}
          </>
        )}
      </div>

      <figcaption className="flex flex-1 flex-col px-3 pt-5 pb-3">
        <blockquote className="font-serif text-[22px] leading-[1.3] text-graphite">&ldquo;{t.quote}&rdquo;</blockquote>
        <div className="mt-auto pt-5">
          <p className="text-[15px] font-semibold text-graphite">{t.name}</p>
          <p className="text-[14px] text-mute">
            {t.role} · {t.studio}, {t.city}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

/** Video reviews. Renders nothing until there are real reviews (samples only in local preview). */
export function Reviews() {
  const sample = testimonials.length === 0;
  const items = sample ? (SHOW_SAMPLE_REVIEWS ? sampleTestimonials : []) : testimonials;
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="reviews-heading" className="bg-canvas-deep py-24 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
          <Display>
            <span id="reviews-heading">Heard at the front desk</span>
          </Display>
          <p className="max-w-[420px] text-[18px] leading-[1.6] text-mute lg:justify-self-end">
            Tattoo artists and studio owners on running their shop with Limespun, in their own words.
          </p>
        </div>

        <div className="-mx-5 mt-14 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0 lg:pb-0">
          {items.map((t) => (
            <ReviewCard key={t.id} t={t} sample={sample} />
          ))}
        </div>
      </div>
    </section>
  );
}
