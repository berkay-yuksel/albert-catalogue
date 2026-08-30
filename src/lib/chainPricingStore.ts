import "server-only";
import { Redis } from "@upstash/redis";
import { type ChainPricingSettings, DEFAULT_PRICING_SETTINGS } from "@/lib/pricingFormula";

/* ============================================================
   CHAIN PRICING SETTINGS - SHARED STORAGE (Upstash Redis)
   ============================================================
   This is the server-side counterpart to PricingSettingsContext.tsx (which
   used to read/write localStorage - per-browser only). Now the three admin
   inputs live in Redis instead, so every visitor sees the same values.

   Requires two environment variables (from an Upstash Redis database,
   whether provisioned via the Vercel Marketplace or upstash.com directly):
     UPSTASH_REDIS_REST_URL
     UPSTASH_REDIS_REST_TOKEN
   (Falls back to KV_REST_API_URL / KV_REST_API_TOKEN too, in case a Vercel
   integration set those names instead.)

   If neither is configured (e.g. local dev without a database yet), reads
   fall back to DEFAULT_PRICING_SETTINGS and writes are rejected with a
   clear error via the API route rather than silently failing.
   ============================================================ */

export interface StoredPricingSettings extends ChainPricingSettings {
  /** ISO timestamp of the last save, for display in the admin panel. */
  updatedAt: string;
}

const REDIS_KEY = "chain-pricing-settings";

function getRedisUrl(): string | undefined {
  return process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
}
function getRedisToken(): string | undefined {
  return process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
}

function getRedisClient(): Redis | null {
  const url = getRedisUrl();
  const token = getRedisToken();
  if (!url || !token) return null;
  return new Redis({ url, token });
}

/** Whether Redis env vars are present at all - used by the API route and
 *  admin page to show a setup notice instead of a confusing save failure. */
export function isPricingStoreConfigured(): boolean {
  return !!getRedisUrl() && !!getRedisToken();
}

/** Reads the current settings. Falls back to defaults if Redis isn't
 *  configured yet or the key has never been set - never throws, so pages
 *  that just need to display prices always get *something* usable. */
export async function getChainPricingSettings(): Promise<StoredPricingSettings> {
  const redis = getRedisClient();
  if (!redis) return { ...DEFAULT_PRICING_SETTINGS, updatedAt: "default" };
  try {
    const stored = await redis.get<StoredPricingSettings>(REDIS_KEY);
    return stored ?? { ...DEFAULT_PRICING_SETTINGS, updatedAt: "default" };
  } catch {
    // Network/config hiccup - degrade gracefully to defaults rather than break the whole catalog.
    return { ...DEFAULT_PRICING_SETTINGS, updatedAt: "default" };
  }
}

/** Writes new settings, visible to every visitor on their next request.
 *  Throws if Redis isn't configured - callers (the API route) should
 *  surface this clearly rather than pretend the save worked. */
export async function setChainPricingSettings(settings: ChainPricingSettings): Promise<StoredPricingSettings> {
  const redis = getRedisClient();
  if (!redis) {
    throw new Error(
      "Redis isn't configured (missing UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN)."
    );
  }
  const withTimestamp: StoredPricingSettings = { ...settings, updatedAt: new Date().toISOString() };
  await redis.set(REDIS_KEY, withTimestamp);
  return withTimestamp;
}
