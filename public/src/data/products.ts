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

  // Chain: real catalog data (330 SKUs) - see data/chainData.ts. Name, product
  // code, chain type, workmanship difficulty, image code, thickness, and
  // weight all come straight from the client sheet - as does the real
  // wholesale price for every karat (pricesByKarat). `price`/`karat` default
  // to the 14K figure since that's the catalog's default reference karat;
  // the buyer picks their actual karat per line item in the order cart.
  // Color/Clasp/Stone stay "N/A" since there's no real data for those either.
  CHAIN_ITEMS.forEach((item) => {
    products.push({
      id: uid++, category: "Chain", name: item.name,
      chainType: item.chainType, difficulty: item.difficulty, sku: item.productCode, imageCode: item.imageCode,
      pricesByKarat: item.prices,
      karat: "14K", color: "N/A", mfg: "N/A", finish: "N/A", clasp: "N/A", stone: "N/A",
      width: item.thickness, length: 50,
      weight: item.weight, stock: "In Stock",
      price: item.prices["14K"], imgSlug: "",
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
   Chain: REAL wholesale prices come straight from the client sheet
   (CHAIN_ITEMS[].prices, one figure per karat 8K-24K, already computed by
   the client from their own gold-rate + workmanship model - not derived by
   us). `computePrice` just reads the 14K figure as the default reference
   price; see useOrderCart's `setKarat` for how a buyer picks a different
   karat per order line, which prices that line from the same per-item map.

   The constants below (melt value, markup-by-difficulty) are kept only as
   a defensive fallback for the rare case a chain is missing its price map -
   currently every one of the 330 SKUs has real prices, so this path isn't
   normally used.
   ============================================================ */
const GOLD_14K_MELT_PER_GRAM = 85; // USD/g, 14K (58.3% pure) - fallback only, see above

/** Fallback wholesale markup over 14K melt value, by workmanship difficulty tier. */
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
    if (p.pricesByKarat?.["14K"] !== undefined) return p.pricesByKarat["14K"];
    // Fallback estimate, only reached if a chain is missing its real price map.
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
