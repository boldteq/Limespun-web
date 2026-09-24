import { Children, Fragment, isValidElement, type ReactNode } from "react";
import type React from "react";
import { Menu, PanelLeft } from "lucide-react";
import { SampleTag } from "@/components/system";
import { cn } from "@/components/system/cn";
import { AppSidebar, appNavLabel, type AppLens, type AppNavItem } from "./app-sidebar";
import { TODAY_DATE_LINE } from "./sample-data";

/** Top-level action nodes, unwrapping one fragment, so each can be placed on its own. */
function actionNodes(actions: ReactNode): ReactNode[] {
  const nodes = Children.toArray(actions);
  const only = nodes[0];
  if (nodes.length === 1 && isValidElement<{ children?: ReactNode }>(only) && only.type === Fragment) {
    return Children.toArray(only.props.children);
  }
  return nodes;
}

/**
 * Top-bar actions, rightmost (the primary) first in the DOM and laid out right to
 * left in a one-line wrapping box: an action that doesn't fit drops to a hidden
 * second line, whole, so a narrow top bar keeps the primary and never cuts a button.
 */
function TopBarActions({ actions }: { actions: ReactNode }) {
  return (
    <div className="hidden h-8 min-w-0 flex-row-reverse flex-wrap content-start overflow-hidden @2xl/frame:flex">
      <div className="h-8 w-0 shrink-0" />
      {actionNodes(actions)
        .reverse()
        .map((node, i) => (
          <span key={isValidElement(node) && node.key !== null ? node.key : i} className="mr-2 flex shrink-0 first-of-type:mr-0">
            {node}
          </span>
        ))}
    </div>
  );
}

/**
 * A Limespun app window: sand sidebar, top bar with the page title and the
 * "Sample studio" tag, then the screen. Decorative (aria-hidden): screens inside
 * use no headings, links or buttons, only text, so the page's outline and tab
 * order never see them.
 *
 * The body is an inline-size container, so screens lay out with @container
 * variants (@md:, @2xl: …) against the frame's width rather than the viewport.
 */
export function AppFrame({
  active,
  lens = "studio",
  title,
  greeting,
  meta,
  actions,
  sidebar = true,
  className,
  bodyClassName,
  children,
}: {
  active: AppNavItem;
  lens?: AppLens;
  /** Top-bar title. Defaults to the active row's label in this lens. */
  title?: string;
  /** Serif page greeting under the top bar, e.g. "Good morning, Dev". */
  greeting?: string;
  /** Line under the greeting (defaults to today's date), or beside the title when there's no greeting. */
  meta?: React.ReactNode;
  /** AppButtons: beside the greeting, or in the top bar when there's no greeting. */
  actions?: React.ReactNode;
  sidebar?: boolean;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
}) {
  const pageTitle = title ?? appNavLabel(active, lens);
  const metaLine = meta ?? (greeting ? TODAY_DATE_LINE : undefined);
  const barActions = !greeting && Boolean(actions);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex w-full max-w-full min-w-0 overflow-hidden rounded-window bg-app-surface text-left text-app-text shadow-lift ring-1 ring-graphite/5",
        sidebar && "sm:min-h-[420px]",
        className,
      )}
    >
      {sidebar && <AppSidebar active={active} lens={lens} />}
      <div className="@container/frame flex min-w-0 flex-1 flex-col">
        {/* The title never gives way while the meta line or an action can: from @sm it holds its
            width. Below @sm the divider goes; below 19rem (phones under ~375) the menu icon goes, the
            title steps to 12px and the bar and tag tighten, so "Roles & permissions" still fits. */}
        <div className="flex h-12 shrink-0 items-center gap-2.5 border-b border-app-border px-3 @max-[19rem]/frame:gap-2 @sm/frame:gap-3 @sm/frame:px-4 @lg/frame:px-5">
          <Menu size={16} strokeWidth={1.8} className="shrink-0 text-app-mute sm:hidden @max-[19rem]/frame:hidden" />
          <PanelLeft size={16} strokeWidth={1.8} className="hidden shrink-0 text-app-mute sm:block" />
          <span className="hidden h-4 w-px shrink-0 bg-app-border @sm/frame:block" />
          <span
            data-frame-title
            className="min-w-0 shrink-0 truncate text-ui font-semibold text-app-text @max-sm/frame:shrink @max-[19rem]/frame:text-ui-sm"
          >
            {pageTitle}
          </span>
          {!greeting && metaLine && (
            <span className="hidden min-w-0 truncate text-ui-sm text-app-mute @xl/frame:inline">{metaLine}</span>
          )}
          {/* Shrinkable only while the actions show, so the tag itself never gets squeezed. */}
          <div className={cn("ml-auto flex items-center gap-2", barActions ? "min-w-0 shrink-0 @2xl/frame:shrink" : "shrink-0")}>
            {barActions && <TopBarActions actions={actions} />}
            <SampleTag className="@max-[19rem]/frame:px-1.5 @max-[19rem]/frame:tracking-normal" />
          </div>
        </div>

        {greeting && (
          <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-3 px-4 pt-5 pb-4 @lg/frame:px-6 @lg/frame:pt-6">
            <div className="min-w-0">
              <p className="font-serif text-[26px] leading-[1.1] tracking-[-0.01em] text-app-text">{greeting}</p>
              {metaLine && <p className="mt-1 text-ui-sm text-app-mute">{metaLine}</p>}
            </div>
            {actions && <div className="hidden flex-wrap items-center gap-2 @xl/frame:flex">{actions}</div>}
          </div>
        )}

        <div className={cn("@container min-w-0 flex-1", bodyClassName)}>{children}</div>
      </div>
    </div>
  );
}
