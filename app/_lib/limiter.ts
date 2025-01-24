import {getIp} from "@/app/_lib/get-ip";
import {Redis} from 'ioredis'

const redis = new Redis()

export class RateLimitError extends Error {
  constructor() {
    super("Rate limit exceeded");
    this.name = "RateLimitError";
  }
}

const PRUNE_INTERVAL = 60 * 1000; // 1 minute

const trackers: Record<
  string,
  {
    count: number;
    expiresAt: number;
  }
> = {};

function pruneTrackers() {
  const now = Date.now();

  for (const key in trackers) {
    if (trackers[key].expiresAt < now) {
      delete trackers[key];
    }
  }
}

setInterval(pruneTrackers, PRUNE_INTERVAL);

export async function rateLimitByIp({
  key = "global",
  limit = 1,
  window = 10000,
}: {
  key?: string;
  limit?: number;
  window?: number;
}) {
  const ip = getIp();

  if (!ip) {
    throw new RateLimitError();
  }

  await rateLimitByKey({
    key: `${ip}-${key}`,
    limit,
    window,
  });
}

export async function rateLimitByKey({
  key = "global",
  limit = 1,
  window = 10000,
}: {
  key?: string;
  limit?: number;
  window?: number;
}) {
  const redisKey = `rate_limit:${key}`
  const pipeline = redis.pipeline()
  pipeline.incr(redisKey)
  pipeline.expire(redisKey, Date.now() + window)
  const results = await pipeline.exec()
  if (!results) return
  const count = results[0][1] as number;
  if (count > limit) {
    throw new RateLimitError();
  }
}
