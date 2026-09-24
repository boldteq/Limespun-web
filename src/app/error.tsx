"use client";

import { useEffect } from "react";
import { RotateCw } from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Container, Display, Eyebrow, Lead, buttonClass } from "@/components/system";
import { Exits } from "@/components/system/exits";

export default function ErrorPage({
  error,
  reset,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  unstable_retry?: () => void;
}) {
  useEffect(() => {
    // Error boundaries surface the failure in the browser console for support and monitoring.
    console.error(error);
  }, [error]);

  // unstable_retry (Next 16.2) re-fetches the segment; reset only re-renders it.
  const retry = unstable_retry ?? reset;

  return (
    <div className="min-h-screen bg-canvas text-graphite">
      <title>Something went wrong | Limespun</title>
      <Nav />
      <main id="main">
        <section className="bg-canvas pt-10 pb-section-y sm:pt-16">
          <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <div>
              <Eyebrow dot>Error</Eyebrow>
              <Display as="h1" size={2} className="mt-5">
                Something went wrong on our side.
              </Display>
              <Lead className="mt-6 max-w-[480px]">
                This page didn’t load. Try it again, or pick up from one of these.
              </Lead>
              <button type="button" onClick={() => retry()} className={`${buttonClass("primary")} mt-9 cursor-pointer`}>
                <RotateCw size={16} strokeWidth={2.4} aria-hidden="true" />
                Retry
              </button>
              {error.digest && (
                <p className="mt-5 text-[13px] text-mute">
                  Reference <span className="font-mono text-graphite-soft">{error.digest}</span>
                </p>
              )}
            </div>
            <div className="lg:pt-2">
              <Exits />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
