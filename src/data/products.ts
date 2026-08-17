import type { Product } from "@/lib/types";
import {
  KARATS, COLORS, CHAIN_MFG, CHAIN_FINISH, CLASPS, STOCK,
  CHAIN_STYLES, CHAIN_WIDTHS, CHAIN_LENGTHS,
  BRACELET_TYPES, BRACELET_LENGTHS, BRACELET_WIDTHS, BRACELET_MFG, STONE_TYPES,
  RING_TYPES, RING_SIZES, RING_SETTINGS, RING_MFG, RING_FINISH,
  NECKLACE_TYPES, NECKLACE_LENGTHS, NECKLACE_MFG,
  K8_TYPES, K8_MFG, K8_MARKETS,
  PIPE_MATERIALS, PIPE_SHAPES, PIPE_FILTER, PIPE_BOWL, PIPE_STEM, PIPE_FINISH,
  pick,
} from "./options";

/* ============================================================
   DEMO PRODUCT GENERATION
   Ported 1:1 from the original catalog. Every category's attribute
   values are deterministically spread across its items using pick(),
   so the output is stable across builds/reloads.
   ============================================================ */
function buildProducts(): Product[] {
  const products: Product[] = [];
  let uid = 1;

  CHAIN_STYLES.forEach((style, i) => {
    products.push({
      id: uid++, category: "Chain", name: style,
      karat: pick(KARATS, i), color: pick(COLORS, i + 2), mfg: pick(CHAIN_MFG, i),
      finish: pick(CHAIN_FINISH, i + 1), clasp: pick(CLASPS, i), stone: "No Stone",
      width: pick(CHAIN_WIDTHS, i + 3), length: pick(CHAIN_LENGTHS, i),
      weight: +(3 + ((i * 1.37) % 22)).toFixed(1), stock: pick(STOCK, i % 3 === 0 ? 1 : 0),
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
      finish: pick(RING_FINISH, i), clasp: "—", stone: pick(STONE_TYPES, i + 1),
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

  K8_TYPES.forEach((t, i) => {
    products.push({
      id: uid++, category: "8K Gold Collection", name: "8K " + t, k8type: t,
      karat: "8K (333)", color: pick(COLORS, i), mfg: pick(K8_MFG, i),
      finish: pick(CHAIN_FINISH, i + 1), clasp: (t === "Chain" || t === "Bracelet") ? pick(CLASPS, i) : "—",
      stone: pick(STONE_TYPES, i), market: pick(K8_MARKETS, i),
      width: pick(CHAIN_WIDTHS, i), length: pick(CHAIN_LENGTHS, i),
      weight: +(3 + ((i * 1.9) % 12)).toFixed(1), stock: pick(STOCK, i % 2),
      price: 0, imgSlug: "",
    });
  });

  const pipeCombos: Array<[string, string]> = [
    ["Meerschaum", "Billiard"], ["Meerschaum", "Bent"], ["Briar Wood", "Apple"],
    ["Briar Wood", "Dublin"], ["Olive Wood", "Canadian"], ["Morta (Bog Oak)", "Bulldog"],
    ["Corn Cob", "Poker"], ["Briar Wood", "Billiard"],
  ];
  pipeCombos.forEach(([mat, shape], i) => {
    products.push({
      id: uid++, category: "Tobacco Pipe", name: mat + " " + shape + " Pipe",
      material: mat, shape: shape, filter: pick(PIPE_FILTER, i), bowl: pick(PIPE_BOWL, i),
      stem: pick(PIPE_STEM, i), finish: pick(PIPE_FINISH, i),
      karat: "—", color: "—", mfg: "—", clasp: "—", stone: "—",
      width: 0, length: 0, weight: +(30 + ((i * 11) % 40)).toFixed(0), stock: pick(STOCK, i % 2),
      price: 0, imgSlug: "",
    });
  });

  return products;
}

/* ============================================================
   PRICING (USD)
   ============================================================ */
const KARAT_PURITY: Record<string, number> = {
  "8K (333)": 0.333, "10K": 0.417, "14K": 0.585, "18K": 0.75, "22K": 0.916, "24K": 0.999,
};
const GOLD_PRICE_PER_GRAM = 85; // USD, spot approximation used for demo pricing

function computePrice(p: Product): number {
  if (p.category === "Tobacco Pipe") {
    return Math.round(35 + p.weight * 0.9);
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
