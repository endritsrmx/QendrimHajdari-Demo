import { describe, expect, it } from 'vitest';
import { createRateLimiter } from '@/lib/rate-limit';

describe('createRateLimiter', () => {
  it('allows up to the limit within the window, then blocks', () => {
    const check = createRateLimiter({ limit: 3, windowMs: 1000 });
    expect([1, 2, 3].map(() => check('ip', 0).ok)).toEqual([true, true, true]);
    expect(check('ip', 10).ok).toBe(false);
    expect(check('other', 10).ok).toBe(true);
  });

  it('resets after the window', () => {
    const check = createRateLimiter({ limit: 1, windowMs: 1000 });
    expect(check('ip', 0).ok).toBe(true);
    expect(check('ip', 500).ok).toBe(false);
    expect(check('ip', 1001).ok).toBe(true);
  });
});
