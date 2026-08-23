import type { Category, FacetConfig } from "@/lib/types";
import {
  KARATS, COLORS, CHAIN_FINISH, CLASPS, STONE_TYPES,
  BRACELET_MFG, RING_MFG, RING_FINISH, RING_SETTINGS, RING_SIZES,
  NECKLACE_MFG,
  PIPE_MATERIALS, PIPE_SHAPES, PIPE_FILTER, PIPE_BOWL, PIPE_STEM, PIPE_FINISH,
} from "./options";
import { TIER_LABELS } from "./fineJewelryData";
import { CHAIN_TYPES } from "./chainData";

/** Categories shown in the navigation tabs. Bracelet/Ring/Necklace still exist
 *  as data (used by CATEGORY_FACETS etc.) but are intentionally left out of
 *  the nav per current site scope. */
export const CATEGORIES: Category[] = ["Chain", "Tobacco Pipe", "8K Gold Collection"];

export const CAT_LABELS: Record<Category, string> = {
  "Chain": "Gold Chains",
  "Bracelet": "Bracelets",
  "Ring": "Rings",
  "Necklace": "Necklaces",
  "8K Gold Collection": "Fine Jewelry (Special Order)",
  "Tobacco Pipe": "Tobacco Pipes",
};

/** Shorter labels for tight spaces (e.g. the sidebar's "Filters" subtitle). */
export const CAT_LABELS_SHORT: Record<Category, string> = {
  ...CAT_LABELS,
  "8K Gold Collection": "Fine Jewelry (SO)",
};

/** The category that gets the simplified, list-only "Fine Jewelry" table. */
export const FINE_JEWELRY_CATEGORY: Category = "8K Gold Collection";

/* ============================================================
   PER-CATEGORY FILTER CONFIG
   ============================================================ */
export const CATEGORY_FACETS: Record<Category, FacetConfig[]> = {
  // Chain: real catalog data (330 SKUs) — see data/chainData.ts. "Type" is
  // the primary filter; Workmanship Difficulty was dropped per current site
  // scope. Karat is demo-assigned (not in the client sheet) purely to give
  // buyers a familiar gold-purity filter.
  "Chain": [
    { key: "chainType", type: "checkbox", label: "Type", values: [...CHAIN_TYPES] },
    { key: "karat", type: "checkbox", label: "Karat", values: [...KARATS] },
    { key: "width", type: "range", label: "Chain Thickness (mm)" },
    { key: "weight", type: "range", label: "Weight (g)" },
  ],
  "Bracelet": [
    { key: "karat", type: "checkbox", label: "Karat", values: [...KARATS] },
    { key: "color", type: "checkbox", label: "Gold Color", values: [...COLORS] },
    { key: "mfg", type: "checkbox", label: "Manufacturing Type", values: [...BRACELET_MFG] },
    { key: "finish", type: "checkbox", label: "Finish / Coating", values: [...CHAIN_FINISH] },
    { key: "clasp", type: "checkbox", label: "Clasp Type", values: [...CLASPS] },
    { key: "stone", type: "checkbox", label: "Stone Type", values: [...STONE_TYPES] },
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
    { key: "weight", type: "range", label: "Weight (g)" },
  ],
  "Necklace": [
    { key: "karat", type: "checkbox", label: "Karat", values: [...KARATS] },
    { key: "color", type: "checkbox", label: "Gold Color", values: [...COLORS] },
    { key: "mfg", type: "checkbox", label: "Manufacturing Type", values: [...NECKLACE_MFG] },
    { key: "finish", type: "checkbox", label: "Finish / Coating", values: [...CHAIN_FINISH] },
    { key: "clasp", type: "checkbox", label: "Clasp Type", values: [...CLASPS] },
    { key: "stone", type: "checkbox", label: "Stone Type", values: [...STONE_TYPES] },
    { key: "length", type: "range", label: "Chain Length (cm)" },
    { key: "weight", type: "range", label: "Weight (g)" },
  ],
  // Fine Jewelry filters: Category/Sub Category are rendered as a nested
  // tree directly in Sidebar.tsx (not through this generic config) so sub-
  // categories can expand out from under their parent category. Only Tier
  // goes through the normal facet renderer.
  "8K Gold Collection": [
    { key: "tierLabel", type: "checkbox", label: "Craftsmanship Tier", values: [...TIER_LABELS] },
  ],
  "Tobacco Pipe": [
    { key: "material", type: "checkbox", label: "Material", values: [...PIPE_MATERIALS] },
    { key: "shape", type: "checkbox", label: "Shape / Model", values: [...PIPE_SHAPES] },
    { key: "filter", type: "checkbox", label: "Filter Size", values: [...PIPE_FILTER] },
    { key: "bowl", type: "checkbox", label: "Bowl Size", values: [...PIPE_BOWL] },
    { key: "stem", type: "checkbox", label: "Stem Material", values: [...PIPE_STEM] },
    { key: "finish", type: "checkbox", label: "Exterior Finish", values: [...PIPE_FINISH] },
    { key: "weight", type: "range", label: "Weight (g)" },
  ],
};
