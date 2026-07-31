import { Ratelimit } from '@upstash/ratelimit';
import { redis } from './client';

// Rate limit global (theo IP) cho public endpoints: 100 request / 1 phút
export const globalRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1 m'),
  analytics: true,
  prefix: '@upstash/ratelimit/global'
});

// Rate limit AI (theo Tenant): 20 request / 1 phút
export const aiRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, '1 m'),
  analytics: true,
  prefix: '@upstash/ratelimit/ai'
});
