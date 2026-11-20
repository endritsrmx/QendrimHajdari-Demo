/**
 * Simple fixed-window rate limiter (in-memory).
 * Works per server instance. For multi-instance / serverless production deployments,
 * replace the store with a shared one (e.g. Upstash Redis) – see DEPLOYMENT.md.
 */
export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  resetAt: number;
}

export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return function check(key: string, now: number = Date.now()): RateLimitResult {
    // opportunistic cleanup
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
    }
    const entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      const resetAt = now + windowMs;
      hits.set(key, { count: 1, resetAt });
      return { ok: true, remaining: limit - 1, resetAt };
    }
    entry.count += 1;
    return { ok: entry.count <= limit, remaining: Math.max(0, limit - entry.count), resetAt: entry.resetAt };
  };
}
