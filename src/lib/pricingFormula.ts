/* ============================================================
   GOLD CHAIN PRICING FORMULA
   Ürün Gram × (İşçilik Milyem + Toptan Satış Karı Milyem + Karat Milyem) / 1000 × Gram Altın Fiyatı

   - Ürün Gram (weight): real data, from data/chainData.ts.
   - Karat Milyem: a fixed, standard karat→fineness reference table (not a
     business decision, so it's NOT admin-editable - see KARAT_MILYEM below).
   - İşçilik Milyem, Toptan Satış Karı Milyem, Gram Altın Fiyatı: business
     inputs, editable from /admin and shared across every visitor via
     Redis - see chainPricingStore.ts (server) and
     PricingSettingsContext.tsx (client) for how these get read/saved.
   ============================================================ */

export interface ChainPricingSettings {
  /** İşçilik Milyem - workmanship cost, expressed as an addition to the karat's milyem. */
  workmanshipMilyem: number;
  /** Toptan Satış Karı Milyem - wholesale profit margin, same per-mille units. */
  wholesaleProfitMilyem: number;
  /** Gram Altın Fiyatı - price per gram of pure (24K/has) gold, in USD. */
  goldPricePerGram: number;
}

export const DEFAULT_PRICING_SETTINGS: ChainPricingSettings = {
  workmanshipMilyem: 150,
  wholesaleProfitMilyem: 15,
  goldPricePerGram: 145,
};

/** Standard karat -> milyem (per-mille fineness) reference table. This is a
 *  fixed conversion (not a business decision), so it's pulled from our own
 *  data rather than being admin-editable. */
export const KARAT_MILYEM: Record<string, number> = {
  "8K (333)": 333,
  "10K": 417,
  "14K": 585,
  "18K": 750,
  "22K": 916,
  "24K": 1000,
};

export const KARAT_ORDER = ["8K (333)", "10K", "14K", "18K", "22K", "24K"];

/** Display label for a karat value - strips the "(333)" purity note, e.g.
 *  "8K (333)" -> "8K". The full value with "(333)" is still what's used as
 *  the actual data key (pricesByKarat, KARAT_MILYEM), this is presentation-only. */
export function karatLabel(karat: string): string {
  return karat.replace(/\s*\(.*?\)\s*/, "");
}

/** Ürün Gram × (İşçilik Milyem + Toptan Satış Karı Milyem + Karat Milyem) / 1000 × Gram Altın Fiyatı */
export function computeChainPrice(weightGrams: number, karat: string, settings: ChainPricingSettings): number {
  const karatMilyem = KARAT_MILYEM[karat] ?? KARAT_MILYEM["14K"];
  const totalMilyem = settings.workmanshipMilyem + settings.wholesaleProfitMilyem + karatMilyem;
  const raw = weightGrams * (totalMilyem / 1000) * settings.goldPricePerGram;
  return Math.round(raw * 100) / 100;
}

export function computeChainPricesByKarat(weightGrams: number, settings: ChainPricingSettings): Record<string, number> {
  const result: Record<string, number> = {};
  for (const karat of KARAT_ORDER) result[karat] = computeChainPrice(weightGrams, karat, settings);
  return result;
}
