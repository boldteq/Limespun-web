import type React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Container, Display, Eyebrow, Lead, Section, StripedFrame, Title, cn } from "@/components/system";
import {
  AiMoodboardScreen,
  AnalyticsScreen,
  AppointmentsScreen,
  BookingFlowPhone,
  BriefingPhone,
  CalendarScreen,
  ClientFileScreen,
  ClientPortalPhone,
  ConsentSignPhone,
  FlashEventsScreen,
  FormsScreen,
  GuestArtistsScreen,
  InventoryScreen,
  LocationsScreen,
  MarketingScreen,
  MessagesScreen,
  NeedsAttentionScreen,
  PaymentsScreen,
  PortfolioScreen,
  ProjectsScreen,
  TeamScreen,
  TodayScreen,
} from "@/components/mockups";

/* Dev-only review sheet for the mockup library: every screen in every state, each in the
   striped frame the site uses. Never indexed, 404 in production, kept out of the sitemap. */
export const metadata: Metadata = {
  title: "Mockup gallery | Limespun",
  robots: { index: false, follow: false },
};

interface GalleryItem {
  name: string;
  /** The JSX that renders it, so a reviewer can copy the exact state. */
  code: string;
  node: React.ReactNode;
}

interface GalleryGroup {
  id: string;
  title: string;
  screens: GalleryItem[];
  phones?: GalleryItem[];
}

const GROUPS: GalleryGroup[] = [
  {
    id: "daily-queue",
    title: "Daily queue",
    screens: [
      { name: "Today", code: "<TodayScreen />", node: <TodayScreen /> },
      { name: "Needs attention", code: "<NeedsAttentionScreen />", node: <NeedsAttentionScreen /> },
      { name: "Messages", code: "<MessagesScreen />", node: <MessagesScreen /> },
      { name: "Calendar · day", code: '<CalendarScreen view="day" />', node: <CalendarScreen view="day" /> },
      { name: "Calendar · week", code: '<CalendarScreen view="week" />', node: <CalendarScreen view="week" /> },
      { name: "Calendar · agenda", code: '<CalendarScreen view="agenda" />', node: <CalendarScreen view="agenda" /> },
      { name: "Appointments · today", code: '<AppointmentsScreen tab="today" />', node: <AppointmentsScreen tab="today" /> },
      {
        name: "Appointments · needs action",
        code: '<AppointmentsScreen tab="needs-action" />',
        node: <AppointmentsScreen tab="needs-action" />,
      },
      {
        name: "Appointments · this week",
        code: '<AppointmentsScreen tab="this-week" />',
        node: <AppointmentsScreen tab="this-week" />,
      },
      {
        name: "Appointments · pending",
        code: '<AppointmentsScreen tab="pending" />',
        node: <AppointmentsScreen tab="pending" />,
      },
      {
        name: "Appointments · completed",
        code: '<AppointmentsScreen tab="completed" />',
        node: <AppointmentsScreen tab="completed" />,
      },
    ],
  },
  {
    id: "clients-forms",
    title: "Clients and forms",
    screens: [
      { name: "Client file · overview", code: '<ClientFileScreen tab="overview" />', node: <ClientFileScreen tab="overview" /> },
      { name: "Client file · sessions", code: '<ClientFileScreen tab="sessions" />', node: <ClientFileScreen tab="sessions" /> },
      { name: "Client file · gallery", code: '<ClientFileScreen tab="gallery" />', node: <ClientFileScreen tab="gallery" /> },
      { name: "Client file · notes", code: '<ClientFileScreen tab="notes" />', node: <ClientFileScreen tab="notes" /> },
      { name: "Client file · comms", code: '<ClientFileScreen tab="comms" />', node: <ClientFileScreen tab="comms" /> },
      { name: "Client file · consent", code: '<ClientFileScreen tab="consent" />', node: <ClientFileScreen tab="consent" /> },
      {
        name: "Client file · financial",
        code: '<ClientFileScreen tab="financial" />',
        node: <ClientFileScreen tab="financial" />,
      },
      { name: "Forms · templates", code: '<FormsScreen tab="templates" />', node: <FormsScreen tab="templates" /> },
      { name: "Forms · submissions", code: '<FormsScreen tab="submissions" />', node: <FormsScreen tab="submissions" /> },
      { name: "Forms · kiosk", code: '<FormsScreen tab="kiosk" />', node: <FormsScreen tab="kiosk" /> },
    ],
    phones: [
      { name: "Booking · artist", code: "<BookingFlowPhone step={1} />", node: <BookingFlowPhone step={1} /> },
      { name: "Booking · time", code: "<BookingFlowPhone step={2} />", node: <BookingFlowPhone step={2} /> },
      { name: "Booking · details", code: "<BookingFlowPhone step={3} />", node: <BookingFlowPhone step={3} /> },
      { name: "Booking · intake", code: "<BookingFlowPhone step={4} />", node: <BookingFlowPhone step={4} /> },
      { name: "Consent · form", code: '<ConsentSignPhone state="form" />', node: <ConsentSignPhone state="form" /> },
      { name: "Consent · done", code: '<ConsentSignPhone state="done" />', node: <ConsentSignPhone state="done" /> },
      { name: "Artist briefing", code: "<BriefingPhone />", node: <BriefingPhone /> },
      {
        name: "Client portal · projects",
        code: '<ClientPortalPhone view="projects" />',
        node: <ClientPortalPhone view="projects" />,
      },
      {
        name: "Client portal · project",
        code: '<ClientPortalPhone view="project" />',
        node: <ClientPortalPhone view="project" />,
      },
    ],
  },
  {
    id: "work",
    title: "Projects, portfolio and AI",
    screens: [
      { name: "Projects · gallery", code: '<ProjectsScreen view="gallery" />', node: <ProjectsScreen view="gallery" /> },
      { name: "Projects · board", code: '<ProjectsScreen view="board" />', node: <ProjectsScreen view="board" /> },
      { name: "Projects · detail", code: '<ProjectsScreen view="detail" />', node: <ProjectsScreen view="detail" /> },
      {
        name: "Portfolio",
        code: '<PortfolioScreen library="portfolio" />',
        node: <PortfolioScreen library="portfolio" />,
      },
      { name: "Flash", code: '<PortfolioScreen library="flash" />', node: <PortfolioScreen library="flash" /> },
      { name: "Flash events", code: "<FlashEventsScreen />", node: <FlashEventsScreen /> },
      { name: "AI moodboard", code: "<AiMoodboardScreen />", node: <AiMoodboardScreen /> },
    ],
  },
  {
    id: "money-team",
    title: "Money, team and locations",
    screens: [
      {
        name: "Payments · transactions",
        code: '<PaymentsScreen tab="transactions" />',
        node: <PaymentsScreen tab="transactions" />,
      },
      {
        name: "Payments · commissions",
        code: '<PaymentsScreen tab="commissions" />',
        node: <PaymentsScreen tab="commissions" />,
      },
      { name: "Payments · payroll", code: '<PaymentsScreen tab="payroll" />', node: <PaymentsScreen tab="payroll" /> },
      { name: "Payments · disputes", code: '<PaymentsScreen tab="disputes" />', node: <PaymentsScreen tab="disputes" /> },
      { name: "Team · roster", code: '<TeamScreen view="roster" />', node: <TeamScreen view="roster" /> },
      { name: "Team · permissions", code: '<TeamScreen view="permissions" />', node: <TeamScreen view="permissions" /> },
      { name: "Guest artists", code: "<GuestArtistsScreen />", node: <GuestArtistsScreen /> },
      { name: "Locations", code: "<LocationsScreen />", node: <LocationsScreen /> },
    ],
  },
  {
    id: "operations-insights",
    title: "Inventory, reports and marketing",
    screens: [
      { name: "Inventory · items", code: '<InventoryScreen tab="items" />', node: <InventoryScreen tab="items" /> },
      {
        name: "Inventory · movements",
        code: '<InventoryScreen tab="movements" />',
        node: <InventoryScreen tab="movements" />,
      },
      {
        name: "Inventory · purchase orders",
        code: '<InventoryScreen tab="purchase-orders" />',
        node: <InventoryScreen tab="purchase-orders" />,
      },
      { name: "Analytics · revenue", code: '<AnalyticsScreen tab="revenue" />', node: <AnalyticsScreen tab="revenue" /> },
      { name: "Analytics · artists", code: '<AnalyticsScreen tab="artists" />', node: <AnalyticsScreen tab="artists" /> },
      { name: "Analytics · clients", code: '<AnalyticsScreen tab="clients" />', node: <AnalyticsScreen tab="clients" /> },
      { name: "Analytics · bookings", code: '<AnalyticsScreen tab="bookings" />', node: <AnalyticsScreen tab="bookings" /> },
      { name: "Marketing · audience", code: '<MarketingScreen tab="audience" />', node: <MarketingScreen tab="audience" /> },
      {
        name: "Marketing · campaigns",
        code: '<MarketingScreen tab="campaigns" />',
        node: <MarketingScreen tab="campaigns" />,
      },
      { name: "Marketing · waitlist", code: '<MarketingScreen tab="waitlist" />', node: <MarketingScreen tab="waitlist" /> },
      { name: "Marketing · referral", code: '<MarketingScreen tab="referral" />', node: <MarketingScreen tab="referral" /> },
    ],
  },
];

const TOTAL = GROUPS.reduce((n, g) => n + g.screens.length + (g.phones?.length ?? 0), 0);

function ItemHead({ item, stacked = false }: { item: GalleryItem; stacked?: boolean }) {
  return (
    <div
      className={cn(
        "mb-3 flex gap-x-4 gap-y-1",
        stacked ? "flex-col" : "flex-wrap items-baseline justify-between",
      )}
    >
      <Title as="h3" size="sm">
        {item.name}
      </Title>
      <code className="text-ui-sm text-mute">{item.code}</code>
    </div>
  );
}

export default function MockupsGallery() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div className="min-h-screen bg-canvas text-graphite">
      <Nav />
      <main id="main">
        <section className="bg-canvas pt-10 pb-12 sm:pt-16">
          <Container>
            <Eyebrow dot>Dev only · not indexed</Eyebrow>
            <Display as="h1" size={2} className="mt-5">
              Mockup gallery
            </Display>
            <Lead className="mt-5 max-w-[640px]">
              {TOTAL} states from the mockup library, each in the striped frame the pages use. Sample studio, Thursday,
              Oct 8, 2026.
            </Lead>
            <nav aria-label="Gallery groups" className="mt-8 flex flex-wrap gap-2">
              {GROUPS.map((g) => (
                <a
                  key={g.id}
                  href={`#${g.id}`}
                  className="inline-flex min-h-11 items-center rounded-full bg-white px-4 text-ui font-medium text-graphite ring-1 ring-hair transition-colors hover:ring-hair-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
                >
                  {g.title}
                </a>
              ))}
            </nav>
          </Container>
        </section>

        {GROUPS.map((g, i) => (
          <Section key={g.id} id={g.id} labelledBy={`${g.id}-title`} tone={i % 2 === 0 ? "white" : "canvas"}>
            <Container>
              <Display id={`${g.id}-title`} as="h2">
                {g.title}
              </Display>

              <div className="mt-block-gap grid gap-14">
                {g.screens.map((item) => (
                  <div key={item.code}>
                    <ItemHead item={item} />
                    <StripedFrame inset="md">{item.node}</StripedFrame>
                  </div>
                ))}
              </div>

              {g.phones && (
                <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                  {g.phones.map((item) => (
                    <div key={item.code} className="min-w-0">
                      <ItemHead item={item} stacked />
                      <StripedFrame inset="sm" className="flex justify-center">
                        {item.node}
                      </StripedFrame>
                    </div>
                  ))}
                </div>
              )}
            </Container>
          </Section>
        ))}
      </main>
      <Footer />
    </div>
  );
}
