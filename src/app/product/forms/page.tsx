import React from "react";
import { ArrowUpRight, Ban, CalendarDays, Download, FileSignature, MessageSquare, Send } from "lucide-react";
import { cn } from "@/components/system";
import { FeaturePage } from "@/components/templates/feature-page";
import {
  AppAvatar,
  AppButton,
  AppFrame,
  AppLabel,
  AppStatus,
  ConsentSignPhone,
  ELENA_ALLERGY,
  FormsScreen,
  SUBMISSIONS,
  THREADS,
  TODAY_SESSIONS,
} from "@/components/mockups";
import { getFeature } from "@/lib/data/features";
import { pageMetadata } from "@/lib/seo";

const feature = getFeature("forms");

export const metadata = pageMetadata({
  title: feature.seo.title,
  description: feature.seo.description,
  path: "/product/forms",
});

const ELENA_SESSION = TODAY_SESSIONS.find((s) => s.id === "elena-s2");
const ELENA_SUBMISSION = SUBMISSIONS.find((s) => s.client === ELENA_ALLERGY.client);
const ELENA_REPLY = THREADS.find((t) => t.client === ELENA_ALLERGY.client);
/** "Back piece, session 2" */
const ELENA_PIECE = ELENA_SESSION ? `${ELENA_SESSION.piece}, session ${ELENA_SESSION.session?.n}` : "Back piece, session 2";

/** The app's outbound bubble: 8% rust into white. The thread canvas is 3%. */
const OUTBOUND = "bg-[color-mix(in_oklch,var(--color-app-active-fg)_8%,white)]";
const CANVAS = "bg-[color-mix(in_oklch,var(--color-app-active-fg)_3%,white)]";

/* ─── Moment 1: sent Wednesday from Messages, signed on her phone today ──────
   Elena R.'s client record logs the text ("Your consent form for Thursday.
   Takes two minutes.", Wed, Oct 7); she signed at 9:42 on her phone and
   texted back at 9:43. The thread sits beside the phone where there's room. */
function ElenaThread({ className }: { className?: string }) {
  return (
    <AppFrame active="messages" sidebar={false} title="Messages" className={cn("shadow-none", className)}>
      <div className="flex items-center gap-2.5 border-b border-app-border px-3.5 py-2.5">
        <AppAvatar initials="ER" size="md" />
        <div className="min-w-0">
          <p className="truncate text-ui font-semibold text-app-text">{ELENA_ALLERGY.client}</p>
          <p className="truncate text-ui-xs text-app-mute">SMS · {ELENA_PIECE}</p>
        </div>
      </div>
      <div className={cn("flex flex-col gap-3 px-3.5 py-4", CANVAS)}>
        <div className="flex flex-col items-end gap-1">
          <div className={cn("max-w-[92%] rounded-[14px] rounded-br-[4px] px-3 py-2 text-ui leading-snug text-app-text", OUTBOUND)}>
            <p>Your consent form for Thursday. Takes two minutes.</p>
            <span className="mt-2 flex items-center gap-2 rounded-app bg-app-surface px-2.5 py-2 ring-1 ring-app-border">
              <FileSignature size={14} strokeWidth={1.9} className="shrink-0 text-app-active-fg" />
              <span className="min-w-0">
                <span className="block truncate text-ui-xs font-semibold text-app-text">{ELENA_SUBMISSION?.form ?? "Tattoo consent — general"}</span>
                <span className="block truncate text-[10px] text-app-mute">Consent form · Sample studio</span>
              </span>
            </span>
          </div>
          <span className="inline-flex items-center gap-1 px-1 text-[10px] text-app-mute">
            Wed, Oct 7 · <MessageSquare size={10} strokeWidth={2} /> SMS
          </span>
        </div>
        <div className="flex flex-col items-start gap-1">
          <div className="max-w-[92%] rounded-[14px] rounded-bl-[4px] bg-app-surface px-3 py-2 text-ui leading-snug text-app-text shadow-[0_1px_2px_rgba(28,25,23,0.07)]">
            <p>{ELENA_REPLY?.preview ?? "Signed the form. No red, noted."}</p>
          </div>
          <span className="px-1 text-[10px] text-app-mute tabular-nums">Today, {ELENA_REPLY?.time ?? "9:43"} · SMS</span>
        </div>
      </div>
    </AppFrame>
  );
}

function SentThenSigned() {
  return (
    <div className="flex items-center justify-center gap-6 @xl:gap-8">
      <ElenaThread className="hidden w-[260px] shrink-0 @lg:flex" />
      <ConsentSignPhone className="shrink-0" />
    </div>
  );
}

/* ─── Moment 3: the signed submission, as the Submissions tab opens it ───────
   forms/_proto/sheets.tsx SubmissionDetail: Linked (client, booking), Signed
   answers, Audit trail, then Resend copy · PDF · Void. */
function SheetSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <AppLabel className="tracking-[0.08em]">{title}</AppLabel>
      {children}
    </div>
  );
}

function SignedSubmission() {
  return (
    <AppFrame active="forms" sidebar={false} title="Submissions" className="mx-auto max-w-[460px] shadow-none">
      <div className="flex items-center gap-2.5 border-b border-app-border px-4 py-3">
        <AppAvatar initials="ER" size="md" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-ui font-semibold text-app-text">{ELENA_ALLERGY.client}</p>
          <p className="truncate text-ui-xs text-app-mute">{ELENA_SUBMISSION?.form ?? "Tattoo consent — general"}</p>
        </div>
        <AppStatus tone="success" dot>
          Signed
        </AppStatus>
      </div>

      <div className="flex flex-col gap-4 px-4 py-4">
        <SheetSection title="Linked">
          <div className="overflow-hidden rounded-app ring-1 ring-app-border">
            <span className="flex items-center gap-2.5 border-b border-app-border px-3 py-2">
              <AppAvatar initials="ER" size="sm" />
              <span className="min-w-0 flex-1 truncate text-ui-sm text-app-text">{ELENA_ALLERGY.client}</span>
              <ArrowUpRight size={14} strokeWidth={1.9} className="shrink-0 text-app-mute" />
            </span>
            <span className="flex items-center gap-2.5 px-3 py-2">
              <CalendarDays size={15} strokeWidth={1.8} className="shrink-0 text-app-mute" />
              <span className="min-w-0 flex-1 truncate text-ui-sm text-app-text">
                {ELENA_PIECE} · Thu, Oct 8, {ELENA_SESSION?.start ?? "1:30"}
              </span>
              <ArrowUpRight size={14} strokeWidth={1.9} className="shrink-0 text-app-mute" />
            </span>
          </div>
        </SheetSection>

        <SheetSection title="Signed answers">
          <div>
            <p className="text-ui-xs text-app-mute">Allergies (incl. latex, pigment, prior ink reactions)</p>
            <p className="text-ui-sm font-medium text-app-text">Red ink. I reacted after session 1 in August.</p>
          </div>
        </SheetSection>

        <SheetSection title="Audit trail">
          <div className="flex flex-col">
            {[
              { ev: "Created", t: "Wed, Oct 7" },
              { ev: "Signed", t: `Today, ${ELENA_SUBMISSION?.when.replace("Today, ", "") ?? "9:42"}` },
            ].map((row, i, all) => (
              <span key={row.ev} className="flex items-center gap-2.5 py-1">
                <span className={cn("h-2 w-2 shrink-0 rounded-full", i === all.length - 1 ? "bg-app-active-fg" : "bg-app-border")} />
                <span className="flex-1 text-ui-sm font-medium text-app-text">{row.ev}</span>
                <span className="text-ui-xs text-app-mute tabular-nums">{row.t}</span>
              </span>
            ))}
          </div>
        </SheetSection>
      </div>

      <div className="flex items-center gap-2 border-t border-app-border px-4 py-3">
        {/* Icon-only in a narrow frame, so Void keeps its place at the right. */}
        <AppButton icon={Send} className="h-7 w-7 px-0 text-ui-xs @sm:w-auto @sm:px-2.5">
          <span className="hidden @sm:inline">Resend copy</span>
        </AppButton>
        <AppButton icon={Download} className="h-7 px-2.5 text-ui-xs">
          PDF
        </AppButton>
        <span className="ml-auto inline-flex h-7 items-center gap-1.5 px-1.5 text-ui-xs font-semibold text-app-active-fg">
          <Ban size={13} strokeWidth={2} />
          Void
        </span>
      </div>
    </AppFrame>
  );
}

export default function FormsPage() {
  return (
    <FeaturePage
      feature={feature}
      headings={{
        moments: "Sent, signed and filed",
        details: "What else it does",
        worksWith: "Joined to client records and inventory",
        worksWithLead: "A signed form files on the client's record and the booking it covers, so nobody hunts through a folder on the day.",
      }}
      visuals={{
        hero: <FormsScreen tab="templates" />,
        heroCrop: true,
        moments: [<SentThenSigned key="sent" />, <FormsScreen key="kiosk" tab="kiosk" />, <SignedSubmission key="signed" />],
        detailLabels: [
          { label: "Templates", tone: "quiet" },
          { label: "New template", tone: "quiet" },
          { label: "Signed", tone: "success" },
          { label: "Minor / guardian", tone: "quiet" },
          { label: "Consent not signed", tone: "warning" },
          { label: "Void", tone: "danger" },
        ],
      }}
      planRows={[
        { label: "Six starter templates and a form builder", from: "solo" },
        { label: "Signed on the client's phone or the kiosk", from: "solo" },
        { label: "Signed PDFs on the client record", from: "solo" },
        { label: "EU REACH ink tracking", from: "solo" },
      ]}
      inkBand={{ headline: "Start the day with the forms signed.", italicWord: "signed" }}
    />
  );
}
