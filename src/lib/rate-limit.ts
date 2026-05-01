import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let _instance: Ratelimit | null = null;

function getLimiter(): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  if (!_instance) {
    _instance = new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(5, "1 m"),
      analytics: true,
      prefix: "inkos-marketing-form",
    });
  }
  return _instance;
}

export async function checkRateLimit(
  identifier: string,
): Promise<{ ok: boolean; remaining?: number }> {
  const limiter = getLimiter();
  if (!limiter) {
    // No Upstash configured — pass through (dev / local).
    return { ok: true };
  }
  const result = await limiter.limit(identifier);
  return { ok: result.success, remaining: result.remaining };
}
