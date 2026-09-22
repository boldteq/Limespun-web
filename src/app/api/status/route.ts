import { NextResponse } from "next/server";
import { APP_URL } from "@/lib/brand";

export const revalidate = 60;

export type SystemState = "operational" | "degraded" | "unknown";

/** Asks the product app for its health (server, database and Redis) and reports it as-is. Cached for 60 seconds. */
export async function GET() {
  const checkedAt = new Date().toISOString();
  try {
    const res = await fetch(`${APP_URL}/api/health/deps`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(4000),
      headers: { accept: "application/json" },
    });
    if (!res.ok) {
      return NextResponse.json({ state: "degraded" satisfies SystemState, checkedAt });
    }
    const body: unknown = await res.json();
    const healthy =
      typeof body === "object" && body !== null && "status" in body && (body as { status: unknown }).status === "healthy";
    return NextResponse.json({ state: (healthy ? "operational" : "degraded") satisfies SystemState, checkedAt });
  } catch {
    // Can't reach the app from here: say we don't know rather than claim an outage or an all-clear.
    return NextResponse.json({ state: "unknown" satisfies SystemState, checkedAt });
  }
}
