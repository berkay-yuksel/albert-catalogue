import type { Product } from "@/lib/types";
import {
  KARATS, COLORS, CHAIN_MFG, CHAIN_FINISH, CLASPS, STOCK,
  CHAIN_WIDTHS, CHAIN_LENGTHS,
  BRACELET_TYPES, BRACELET_LENGTHS, BRACELET_WIDTHS, BRACELET_MFG, STONE_TYPES,
  RING_TYPES, RING_SIZES, RING_SETTINGS, RING_MFG, RING_FINISH,
  NECKLACE_TYPES, NECKLACE_LENGTHS, NECKLACE_MFG,
  K8_MFG,
  pick,
} from "./options";
import { FINE_JEWELRY_ITEMS, SUB_CATEGORY_TO_PARENT, TIER_BY_DIFFICULTY, tierLabel } from "./fineJewelryData";
import { CHAIN_ITEMS } from "./chainData";
import { PIPE_ITEMS } from "./pipeData";

/* ============================================================
   DEMO PRODUCT GENERATION
   Every category's attribute values are deterministically spread across
   its items using pick(), so the output is stable across builds/reloads.
   ============================================================ */
function buildProducts(): Product[] {
  const products: Product[] = [];
  let uid = 1;

  // Chain: real catalog data (330 SKUs) - see data/chainData.ts. Name, chain
  // type, workmanship difficulty, catalog code, thickness, and weight all
  // come straight from the client sheet. Karat is fixed at 14K across the
  // board (the sheet doesn't specify per-SKU karat, and 14K is the standard
  // wholesale reference purity used for pricing, see computePrice below).
  // Color/Clasp/Stone stay "N/A" since there's no real data for those either.
  CHAIN_ITEMS.forEach((item) => {
    products.push({
      id: uid++, category: "Chain", name: item.name,
      chainType: item.chainType, difficulty: item.difficulty, sku: item.sku, webCode: item.webCode,
      karat: "14K", color: "N/A", mfg: "N/A", finish: "N/A", clasp: "N/A", stone: "N/A",
      width: item.thickness, length: 50,
      weight: item.weight, stock: "In Stock",
      price: 0, imgSlug: "",
    });
  });

  [...BRACELET_TYPES, "Beaded Bracelet", "Gourmette Bracelet"].forEach((t, i) => {
    products.push({
      id: uid++, category: "Bracelet", name: t + " Bracelet",
      karat: pick(KARATS, i + 1), color: pick(COLORS, i), mfg: pick(BRACELET_MFG, i),
      finish: pick(CHAIN_FINISH, i + 2), clasp: pick(CLASPS, i + 1), stone: pick(STONE_TYPES, i),
      width: pick(BRACELET_WIDTHS, i + 1), length: pick(BRACELET_LENGTHS, i),
      weight: +(4 + ((i * 2.1) % 18)).toFixed(1), stock: pick(STOCK, i % 2),
      price: 0, imgSlug: "",
    });
  });

  [...RING_TYPES, "Eternity Band"].forEach((t, i) => {
    products.push({
      id: uid++, category: "Ring", name: t,
      karat: pick(KARATS, i + 2), color: pick(COLORS, i + 1), mfg: pick(RING_MFG, i),
      finish: pick(RING_FINISH, i), clasp: "N/A", stone: pick(STONE_TYPES, i + 1),
      setting: pick(RING_SETTINGS, i), size: pick(RING_SIZES, i),
      width: 0, length: 0, weight: +(1.5 + ((i * 0.8) % 6)).toFixed(1), stock: pick(STOCK, i % 2),
      price: 0, imgSlug: "",
    });
  });

  [...NECKLACE_TYPES, "Layered Necklace"].forEach((t, i) => {
    products.push({
      id: uid++, category: "Necklace", name: t,
      karat: pick(KARATS, i), color: pick(COLORS, i + 3), mfg: pick(NECKLACE_MFG, i),
      finish: pick(CHAIN_FINISH, i), clasp: pick(CLASPS, i), stone: pick(STONE_TYPES, i + 2),
      width: pick(CHAIN_WIDTHS, i + 2), length: pick(NECKLACE_LENGTHS, i),
      weight: +(2.5 + ((i * 1.6) % 14)).toFixed(1), stock: pick(STOCK, i % 3 === 0 ? 1 : 0),
      price: 0, imgSlug: "",
    });
  });

  FINE_JEWELRY_ITEMS.forEach((item, i) => {
    const color = pick(COLORS, i);
    const finish = pick(CHAIN_FINISH, i + 1);
    const tier = TIER_BY_DIFFICULTY[item.difficulty];
    products.push({
      id: uid++, category: "8K Gold Collection", name: item.name,
      fineCategory: SUB_CATEGORY_TO_PARENT[item.subCategory] ?? item.subCategory,
      fineSubCategory: item.subCategory,
      difficulty: item.difficulty, tier, tierLabel: tierLabel(tier), popularity: item.popularity,
      karat: "8K (333)", color, mfg: pick(K8_MFG, i),
      finish, clasp: "N/A",
      stone: pick(STONE_TYPES, i),
      width: pick(CHAIN_WIDTHS, i), length: pick(CHAIN_LENGTHS, i),
      weight: +(2 + ((i * 1.7) % 16)).toFixed(1), stock: pick(STOCK, i % 2),
      price: 0, imgSlug: "",
      description: item.description,
    });
  });

  // Tobacco Pipe: real catalog data (8 handmade pipes) - see data/pipeData.ts.
  // Weight isn't in the client data, so it's a reasonable placeholder based on
  // typical meerschaum/wood pipe weights (30-70g) until real figures are given.
  PIPE_ITEMS.forEach((item, i) => {
    products.push({
      id: uid++, category: "Tobacco Pipe", name: item.name,
      pipeImage: item.image, pipeZoomImage: item.zoomImage,
      material: item.material, pipeShape: item.shape, carvingStyle: item.carvingStyle,
      theme: item.theme, stemColor: item.stemColor, finish: item.finish, handmade: item.handmade,
      karat: "N/A", color: "N/A", mfg: "N/A", clasp: "N/A", stone: "N/A",
      width: 0, length: 0, weight: +(30 + ((i * 11) % 40)).toFixed(0), stock: "In Stock",
      price: 0, imgSlug: "",
    });
  });

  return products;
}

/* ============================================================
   PRICING (USD)
   ============================================================
   Chain pricing is grounded in actual 14K gold wholesale market research
   (see chain-wholesale-pricing-methodology.md for full sourcing):

   - 14K melt value: $85.00/g. Multiple independent live-pricing sources
     (goldpricez.com, goldzenn.com, meltvalue.com, mygoldcalc.com) put 14K
     gold (58.3% pure) between $82-86.60/g as of Aug 2026; $85/g is the
     midpoint reference rate used here.
   - Manufacturer/wholesale markup over melt: industry sources (Apples of
     Gold, YINCITY Gold, Ott Family Jewelry) consistently describe direct
     manufacturer/wholesale markups in the 25-55% range over melt, well
     below the 100-200%+ markups seen at retail. The gap scales with labor
     complexity, so each chain's Workmanship Difficulty tier (from the
     client sheet) maps to a markup within that band: machine-made
     "Low" difficulty chains sit near the low end, hand-assembled
     "Very High" (Bismark/King/Boutique) pieces near the high end, since
     they require far more labor per gram of gold used.
   ============================================================ */
const GOLD_14K_MELT_PER_GRAM = 85; // USD/g, 14K (58.3% pure) - see methodology doc for sources

/** Wholesale markup over 14K melt value, by workmanship difficulty tier. */
const CHAIN_MARKUP_BY_DIFFICULTY: Record<string, number> = {
  "Low (Machine / Standard)": 1.28,
  "Medium (No Appliqué / Custom Shaving)": 1.35,
  "High (Hollow / Woven)": 1.45,
  "Very High (Bismark / King / Boutique)": 1.55,
};
const DEFAULT_CHAIN_MARKUP = 1.35; // fallback if a difficulty label isn't in the table above

const KARAT_PURITY: Record<string, number> = {
  "8K (333)": 0.333, "10K": 0.417, "14K": 0.585, "18K": 0.75, "22K": 0.916, "24K": 0.999,
};
const GOLD_PRICE_PER_GRAM = 85; // USD - used only for the hidden demo categories (Bracelet/Ring/Necklace)

function computePrice(p: Product): number {
  if (p.category === "Tobacco Pipe") {
    return Math.round(35 + p.weight * 0.9);
  }
  // Fine Jewelry (8K Gold Collection) is priced on request, not listed - see OrderPanel's
  // "Contact for Pricing" handling for carts made up entirely of these items.
  if (p.category === "8K Gold Collection") {
    return 0;
  }
  if (p.category === "Chain") {
    const markup = CHAIN_MARKUP_BY_DIFFICULTY[p.difficulty ?? ""] ?? DEFAULT_CHAIN_MARKUP;
    return Math.max(15, Math.round(p.weight * GOLD_14K_MELT_PER_GRAM * markup));
  }
  const purity = KARAT_PURITY[p.karat] || 0.75;
  const raw = p.weight * purity * GOLD_PRICE_PER_GRAM * 1.18; // + workmanship markup
  return Math.max(15, Math.round(raw));
}

export function fmtPrice(v: number): string {
  return "$" + v.toLocaleString("en-US");
}

/* ============================================================
   IMAGE SLUGS
   Human-friendly per-category id used for image file naming, e.g.
   chain1, chain2, bracelet1, ring1 ... -> images/chain1a.jpg etc.
   (see /public/images/README + product-image-list.csv)
   ============================================================ */
const CATEGORY_IMG_SLUGS: Record<string, string> = {
  "Chain": "chain",
  "Bracelet": "bracelet",
  "Ring": "ring",
  "Necklace": "necklace",
  "8K Gold Collection": "8k",
  "Tobacco Pipe": "pipe",
};

function assignImageSlugs(products: Product[]): void {
  const counters: Record<string, number> = {};
  products.forEach((p) => {
    const slug = CATEGORY_IMG_SLUGS[p.category] ?? p.category.toLowerCase().replace(/[^a-z0-9]+/g, "");
    counters[slug] = (counters[slug] ?? 0) + 1;
    p.imgSlug = slug + counters[slug];
  });
}

const products = buildProducts();
products.forEach((p) => { p.price = computePrice(p); });
assignImageSlugs(products);

/** The full demo product catalog, generated once at module load. */
export const PRODUCTS: Product[] = products;
