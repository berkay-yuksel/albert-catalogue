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

// Different Redis integrations name these differently depending on how the
// database was provisioned. We check every name we've seen in the wild:
//   - UPSTASH_REDIS_REST_URL / _TOKEN         (raw Upstash, or newer Vercel Marketplace integrations)
//   - KV_REST_API_URL / KV_REST_API_TOKEN      (legacy "Vercel KV" naming)
//   - Prefixed variants, e.g. STORAGE_URL / REDIS_URL, some integrations add
//     a project-specific prefix (checked via ENDS_WITH matching below).
const URL_ENV_CANDIDATES = ["UPSTASH_REDIS_REST_URL", "KV_REST_API_URL"];
const TOKEN_ENV_CANDIDATES = ["UPSTASH_REDIS_REST_TOKEN", "KV_REST_API_TOKEN"];

function findEnvValue(candidates: string[]): { value: string | undefined; matchedName: string | undefined } {
  for (const name of candidates) {
    if (process.env[name]) return { value: process.env[name], matchedName: name };
  }
  // Fall back to a suffix match, in case Vercel prefixed the name with the
  // integration/store name (e.g. "MY_REDIS_UPSTASH_REDIS_REST_URL").
  for (const [key, value] of Object.entries(process.env)) {
    if (!value) continue;
    if (candidates.some((c) => key.endsWith(c))) return { value, matchedName: key };
  }
  return { value: undefined, matchedName: undefined };
}

function getRedisUrl(): string | undefined {
  return findEnvValue(URL_ENV_CANDIDATES).value;
}
function getRedisToken(): string | undefined {
  return findEnvValue(TOKEN_ENV_CANDIDATES).value;
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

/** Diagnostic info for the admin page - reports which env var NAMES were
 *  found (never the actual secret values), so a mismatch between what
 *  Vercel/Upstash actually named things and what we expect is visible
 *  without needing to share real credentials with anyone. */
export function getPricingStoreDiagnostics() {
  const url = findEnvValue(URL_ENV_CANDIDATES);
  const token = findEnvValue(TOKEN_ENV_CANDIDATES);
  return {
    urlFound: !!url.value,
    urlEnvName: url.matchedName ?? null,
    tokenFound: !!token.value,
    tokenEnvName: token.matchedName ?? null,
    adminPasswordSet: !!process.env.ADMIN_PASSWORD,
    // All env var names present on this server that contain "REDIS" or "KV" -
    // helps spot an unexpected naming convention at a glance.
    relatedEnvNames: Object.keys(process.env).filter((k) => /redis|_kv_|^kv_/i.test(k)),
  };
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
