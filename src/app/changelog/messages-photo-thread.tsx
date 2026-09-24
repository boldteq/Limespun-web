import type { ReactNode } from "react";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/components/system";
import { ARTISTS, ASHA_PROJECT, AppAvatar, AppFrame, PhotoTile } from "@/components/mockups";

/**
 * The Messages screen for the "photos, quiet hours and STOP replies" entry: Asha's SMS thread
 * the evening before session 4, where Dev sends the forearm stencil as a photo with a line of
 * text under it (the app's photo-and-text bubble, messages/_proto/thread-view: the photo spans
 * the bubble, the text sits beneath). The thread runs from the top, so the entry's crop always
 * shows the photo. Decorative, like every mockup: AppFrame is aria-hidden and carries the
 * Sample studio tag.
 */

const DEV = ARTISTS[ASHA_PROJECT.artist];

/** The app's outbound bubble (8% rust into white) on the thread canvas (3%), as in the Messages mockup. */
const OUTBOUND = "bg-[color-mix(in_oklch,var(--color-app-active-fg)_8%,white)]";
const CANVAS = "bg-[color-mix(in_oklch,var(--color-app-active-fg)_3%,white)]";

function Stamp({ children, mine }: { children: ReactNode; mine?: boolean }) {
  return <span className={cn("px-1 text-[10px] text-app-mute tabular-nums", mine && "text-right")}>{children}</span>;
}

export function MessagesPhotoThread() {
  return (
    <AppFrame active="messages">
      <div className="flex min-w-0 flex-col">
        <div className="flex h-14 shrink-0 items-center gap-2.5 border-b border-app-border px-4 @lg:px-5">
          <AppAvatar initials="AM" size="md" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-ui font-semibold text-app-text">Asha M.</p>
            <p className="truncate text-ui-xs text-app-mute">
              SMS · {ASHA_PROJECT.title} with {DEV.name}
            </p>
          </div>
          <MoreHorizontal size={16} strokeWidth={1.8} className="shrink-0 text-app-mute" />
        </div>

        <div className={cn("flex min-w-0 flex-col gap-3 px-4 pt-4 pb-6 @lg:px-6", CANVAS)}>
          {/* Dev's message: the stencil photo with the text under it, in one bubble */}
          <div className="flex flex-col items-end gap-1">
            <div className={cn("w-[216px] rounded-[14px] rounded-br-[4px] p-1.5 @md:w-[248px]", OUTBOUND)}>
              <PhotoTile label="St" caption="Stencil · forearm" aspect="landscape" className="rounded-[10px]" />
              <p className="px-1.5 pt-2 pb-1 text-ui leading-snug text-app-text">
                Here’s the stencil for tomorrow. We can move the koi up before we start.
              </p>
            </div>
            <Stamp mine>{DEV.name} · 6:20 PM · SMS</Stamp>
          </div>

          <div className="flex flex-col items-start gap-1">
            <div className="max-w-[84%] rounded-[14px] rounded-bl-[4px] bg-app-surface px-3 py-2 text-ui leading-snug text-app-text shadow-[0_1px_2px_rgba(28,25,23,0.07)]">
              <p>Love it, no changes. See you at 10!</p>
            </div>
            <Stamp>6:31 PM</Stamp>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}
