/* ============================================================
   OPTION LISTS
   Ported 1:1 from the original static catalog (albert.html).
   These drive both the demo product generation in products.ts
   and the facet filter values in facets.ts.
   ============================================================ */

export const KARATS = ["8K (333)", "10K", "14K", "18K", "22K", "24K"] as const;

export const KARAT_RANK: Record<string, number> = {
  "8K (333)": 8,
  "10K": 10,
  "14K": 14,
  "18K": 18,
  "22K": 22,
  "24K": 24,
};

export const COLORS = ["Yellow Gold", "White Gold", "Rose Gold", "Bicolor", "Tricolor"] as const;
export const CHAIN_MFG = ["Hollow", "Solid", "Stamped"] as const;
export const CHAIN_FINISH = ["Polished", "Diamond-Cut", "Satin/Matte", "Textured", "Brill"] as const;
export const CLASPS = ["Lobster Claw", "Spring Ring", "Box Clasp with Safety"] as const;
export const STOCK = ["In Stock", "Made to Order"] as const;

export const CHAIN_STYLES = [
  "D/C Forzentina", "Hollow Forzentina Brill", "Canal-Cut Forzentina", "Square Forzentina",
  "Snake Forzentina", "D/C Cable", "D/C Square Cable", "D/C Box Chain",
  "Paperclip", "D/C Hollow Paperclip", "Paperclip Brill", "Press Paperclip",
  "D/C Singapore", "Sogliola Singapore", "D/C Square Singapore", "Hollow Sogliola Singapore",
  "D/C Curb", "Hollow Cuban Curb", "Hollow Convex Curb", "Designed Curb",
  "D/C Figaro", "Flat Figaro", "Concave Figaro", "Hollow Light Figaro",
  "Rolo Chain", "Hollow Oval Rolo Chain", "D/C Hollow Rolo Chain",
  "Ball Chain", "Rambo Link Chain Brill", "Oval Link Chain Brill",
  "Triple Wheat", "Hollow Palm Chain", "D/C 8 Sided Triple Wheat",
  "Popcorn Brill", "Flat Popcorn", "Mariner Brill", "Flat Mariner",
  "Hollow Rope", "Mirror Rope", "Fox Tail", "Serpentine",
  "Square Byzantine", "Euro Byzantine", "Hollow Square Byzantine", "Grek Designed Euro Byzantine",
] as const;

export const CHAIN_WIDTHS = [0.8, 1.0, 1.2, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 6.0, 7.0, 8.0];
export const CHAIN_LENGTHS = [40, 45, 50, 55, 60, 65, 70, 75];

export const BRACELET_TYPES = [
  "Bangle", "Cuff", "Chain Bracelet", "ID / Plaque Bracelet", "Tennis Bracelet", "Charm Bracelet",
] as const;
export const BRACELET_LENGTHS = [16, 17, 18, 19, 20, 21];
export const BRACELET_WIDTHS = [1.5, 2, 3, 4, 5, 6, 8];
export const BRACELET_MFG = ["Hollow", "Solid", "Cast", "Stamped"] as const;
export const STONE_TYPES = ["No Stone", "Cubic Zirconia", "Gemstones"] as const;

export const RING_TYPES = [
  "Wedding Band", "Solitaire", "Multi-Stone", "Signet / Men's Ring", "Fashion / Statement Ring", "Midi Ring",
] as const;
export const RING_SIZES = ["EU 12 / US 6", "EU 14 / US 7", "EU 16 / US 8", "EU 18 / US 9", "EU 20 / US 10"] as const;
export const RING_SETTINGS = ["Prong", "Bezel", "Pave", "Channel"] as const;
export const RING_MFG = ["Cast", "Stamped", "Handmade"] as const;
export const RING_FINISH = ["Polished", "Matte", "Diamond-Cut", "Textured"] as const;

export const NECKLACE_TYPES = [
  "Pendant Necklace", "Medallion", "Letter / Initial", "Symbol / Figure", "Choker", "Statement Necklace",
] as const;
export const NECKLACE_LENGTHS = [40, 45, 50];
export const NECKLACE_MFG = ["Hollow", "Solid", "Cast"] as const;

export const K8_TYPES = ["Chain", "Bracelet", "Ring", "Necklace", "Earrings", "Pendant"] as const;
export const K8_MFG = ["Hollow", "Solid", "Stamped", "Cast"] as const;
export const K8_MARKETS = ["Middle East", "Eastern Europe", "Central Asia", "Latin America", "USA"] as const;


/** Deterministic round-robin picker - same helper the original catalog used
 *  to spread demo attribute values across generated products. */
export function pick<T>(arr: readonly T[], i: number): T {
  return arr[i % arr.length];
}
