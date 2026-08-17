import type { Category, FacetConfig } from "@/lib/types";
import {
  KARATS, COLORS, CHAIN_MFG, CHAIN_FINISH, CLASPS, STOCK, STONE_TYPES,
  BRACELET_MFG, RING_MFG, RING_FINISH, RING_SETTINGS, RING_SIZES,
  NECKLACE_MFG, K8_TYPES, K8_MFG, K8_MARKETS,
  PIPE_MATERIALS, PIPE_SHAPES, PIPE_FILTER, PIPE_BOWL, PIPE_STEM, PIPE_FINISH,
} from "./options";

export const CATEGORIES: Category[] = [
  "Chain", "Bracelet", "Ring", "Necklace", "8K Gold Collection", "Tobacco Pipe",
];

export const CAT_LABELS: Record<Category, string> = {
  "Chain": "Chains",
  "Bracelet": "Bracelets",
  "Ring": "Rings",
  "Necklace": "Necklaces",
  "8K Gold Collection": "8K Collection",
  "Tobacco Pipe": "Tobacco Pipes",
};

/* ============================================================
   PER-CATEGORY FILTER CONFIG
   ============================================================ */
export const CATEGORY_FACETS: Record<Category, FacetConfig[]> = {
  "Chain": [
    { key: "karat", type: "checkbox", label: "Karat", values: [...KARATS] },
    { key: "color", type: "checkbox", label: "Gold Color", values: [...COLORS] },
    { key: "mfg", type: "checkbox", label: "Manufacturing Type", values: [...CHAIN_MFG] },
    { key: "finish", type: "checkbox", label: "Finish / Coating", values: [...CHAIN_FINISH] },
    { key: "clasp", type: "checkbox", label: "Clasp Type", values: [...CLASPS] },
    { key: "stock", type: "checkbox", label: "Stock Status", values: [...STOCK] },
    { key: "width", type: "range", label: "Thickness (mm)" },
    { key: "length", type: "range", label: "Length (cm)" },
    { key: "weight", type: "range", label: "Weight (g)" },
  ],
  "Bracelet": [
    { key: "karat", type: "checkbox", label: "Karat", values: [...KARATS] },
    { key: "color", type: "checkbox", label: "Gold Color", values: [...COLORS] },
    { key: "mfg", type: "checkbox", label: "Manufacturing Type", values: [...BRACELET_MFG] },
    { key: "finish", type: "checkbox", label: "Finish / Coating", values: [...CHAIN_FINISH] },
    { key: "clasp", type: "checkbox", label: "Clasp Type", values: [...CLASPS] },
    { key: "stone", type: "checkbox", label: "Stone Type", values: [...STONE_TYPES] },
    { key: "stock", type: "checkbox", label: "Stock Status", values: [...STOCK] },
    { key: "width", type: "range", label: "Thickness (mm)" },
    { key: "length", type: "range", label: "Length (cm)" },
    { key: "weight", type: "range", label: "Weight (g)" },
  ],
  "Ring": [
    { key: "karat", type: "checkbox", label: "Karat", values: [...KARATS] },
    { key: "color", type: "checkbox", label: "Gold Color", values: [...COLORS] },
    { key: "mfg", type: "checkbox", label: "Manufacturing Type", values: [...RING_MFG] },
    { key: "finish", type: "checkbox", label: "Finish / Coating", values: [...RING_FINISH] },
    { key: "stone", type: "checkbox", label: "Stone Type", values: [...STONE_TYPES] },
    { key: "setting", type: "checkbox", label: "Stone Setting Type", values: [...RING_SETTINGS] },
    { key: "size", type: "checkbox", label: "Ring Size", values: [...RING_SIZES] },
    { key: "stock", type: "checkbox", label: "Stock Status", values: [...STOCK] },
    { key: "weight", type: "range", label: "Weight (g)" },
  ],
  "Necklace": [
    { key: "karat", type: "checkbox", label: "Karat", values: [...KARATS] },
    { key: "color", type: "checkbox", label: "Gold Color", values: [...COLORS] },
    { key: "mfg", type: "checkbox", label: "Manufacturing Type", values: [...NECKLACE_MFG] },
    { key: "finish", type: "checkbox", label: "Finish / Coating", values: [...CHAIN_FINISH] },
    { key: "clasp", type: "checkbox", label: "Clasp Type", values: [...CLASPS] },
    { key: "stone", type: "checkbox", label: "Stone Type", values: [...STONE_TYPES] },
    { key: "stock", type: "checkbox", label: "Stock Status", values: [...STOCK] },
    { key: "length", type: "range", label: "Chain Length (cm)" },
    { key: "weight", type: "range", label: "Weight (g)" },
  ],
  "8K Gold Collection": [
    { key: "k8type", type: "checkbox", label: "Product Type", values: [...K8_TYPES] },
    { key: "color", type: "checkbox", label: "Gold Color", values: [...COLORS] },
    { key: "mfg", type: "checkbox", label: "Manufacturing Type", values: [...K8_MFG] },
    { key: "finish", type: "checkbox", label: "Finish / Coating", values: [...CHAIN_FINISH] },
    { key: "stone", type: "checkbox", label: "Stone Type", values: [...STONE_TYPES] },
    { key: "market", type: "checkbox", label: "Target Export Market", values: [...K8_MARKETS] },
    { key: "stock", type: "checkbox", label: "Stock Status", values: [...STOCK] },
    { key: "weight", type: "range", label: "Weight (g)" },
  ],
  "Tobacco Pipe": [
    { key: "material", type: "checkbox", label: "Material", values: [...PIPE_MATERIALS] },
    { key: "shape", type: "checkbox", label: "Shape / Model", values: [...PIPE_SHAPES] },
    { key: "filter", type: "checkbox", label: "Filter Size", values: [...PIPE_FILTER] },
    { key: "bowl", type: "checkbox", label: "Bowl Size", values: [...PIPE_BOWL] },
    { key: "stem", type: "checkbox", label: "Stem Material", values: [...PIPE_STEM] },
    { key: "finish", type: "checkbox", label: "Exterior Finish", values: [...PIPE_FINISH] },
    { key: "stock", type: "checkbox", label: "Stock Status", values: [...STOCK] },
    { key: "weight", type: "range", label: "Weight (g)" },
  ],
};
