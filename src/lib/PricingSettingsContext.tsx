"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  type ChainPricingSettings,
  DEFAULT_PRICING_SETTINGS,
  computeChainPricesByKarat,
} from "./pricingFormula";

interface SaveResult {
  ok: boolean;
  error?: string;
}

interface PricingSettingsContextValue {
  settings: ChainPricingSettings;
  /** Saves new settings for everyone (requires the admin password). Returns
   *  whether it worked, with an error message if not (e.g. wrong password,
   *  or Redis isn't configured yet). */
  saveSettings: (s: ChainPricingSettings, password: string) => Promise<SaveResult>;
  /** True once the current settings have been fetched from the server -
   *  avoids a brief flash of the hardcoded defaults before the real shared
   *  values load in. */
  ready: boolean;
  /** False if the server has no Redis database connected yet - the admin
   *  page uses this to show a setup notice instead of a confusing error
   *  only after someone tries to save. */
  storeConfigured: boolean;
}

const PricingSettingsContext = createContext<PricingSettingsContextValue | null>(null);

export function PricingSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettingsState] = useState<ChainPricingSettings>(DEFAULT_PRICING_SETTINGS);
  const [ready, setReady] = useState(false);
  const [storeConfigured, setStoreConfigured] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/pricing-settings")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data?.settings) setSettingsState(data.settings);
        setStoreConfigured(!!data?.storeConfigured);
        setReady(true);
      })
      .catch(() => {
        if (cancelled) return;
        // Network hiccup - keep showing defaults rather than block the whole catalog.
        setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function saveSettings(s: ChainPricingSettings, password: string): Promise<SaveResult> {
    try {
      const res = await fetch("/api/pricing-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...s, password }),
      });
      const data = await res.json();
      if (!res.ok) return { ok: false, error: data?.error ?? "Save failed." };
      setSettingsState(data.settings);
      return { ok: true };
    } catch {
      return { ok: false, error: "Network error - couldn't reach the server." };
    }
  }

  const value = useMemo(
    () => ({ settings, saveSettings, ready, storeConfigured }),
    [settings, ready, storeConfigured]
  );

  return <PricingSettingsContext.Provider value={value}>{children}</PricingSettingsContext.Provider>;
}

export function usePricingSettings(): PricingSettingsContextValue {
  const ctx = useContext(PricingSettingsContext);
  if (!ctx) {
    // Fallback for anything rendered outside the provider - shouldn't normally happen
    // since the provider wraps the whole app in layout.tsx.
    return {
      settings: DEFAULT_PRICING_SETTINGS,
      saveSettings: async () => ({ ok: false, error: "Not connected to the pricing provider." }),
      ready: true,
      storeConfigured: true,
    };
  }
  return ctx;
}

/** Live per-karat prices for a Chain product, recomputed automatically
 *  whenever the shared admin settings change. Returns undefined for
 *  anything that isn't a Chain (nothing else uses this formula). */
export function useChainPrices(product: { category: string; weight: number }): Record<string, number> | undefined {
  const { settings } = usePricingSettings();
  return useMemo(() => {
    if (product.category !== "Chain") return undefined;
    return computeChainPricesByKarat(product.weight, settings);
  }, [product.category, product.weight, settings]);
}
