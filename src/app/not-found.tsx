import type { Metadata } from "next";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Container, Display, Eyebrow, Lead } from "@/components/system";
import { Exits } from "@/components/system/exits";

// Next adds the noindex robots tag to 404 responses itself.
export const metadata: Metadata = {
  title: "Page not found | Limespun",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-canvas text-graphite">
      <Nav />
      <main id="main">
        <section className="bg-canvas pt-10 pb-section-y sm:pt-16">
          <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <div>
              <Eyebrow dot>Error 404</Eyebrow>
              <Display as="h1" size={2} italicWord="here" className="mt-5">
                That page isn’t here.
              </Display>
              <Lead className="mt-6 max-w-[480px]">
                The link may be out of date, or the page has moved. One of these will get you where you were going.
              </Lead>
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
