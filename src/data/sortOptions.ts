import type { Category, SortValue } from "@/lib/types";

export interface SortOption {
  value: SortValue;
  label: string;
}

/** General, always-applicable sort criteria. */
export const SORT_OPTIONS: SortOption[] = [
  { value: "name-asc", label: "Name (A–Z)" },
  { value: "name-desc", label: "Name (Z–A)" },
  { value: "price-asc", label: "Price (Low → High)" },
  { value: "price-desc", label: "Price (High → Low)" },
  { value: "id-desc", label: "Newest First" },
  { value: "id-asc", label: "Oldest First" },
];

/** Chain also sorts by Thickness/Weight/Product Code, since the client sheet
 *  gives a real per-SKU gauge, weight, and catalog code. */
const CHAIN_SORT_OPTIONS: SortOption[] = [
  { value: "width-asc", label: "Thickness (Low → High)" },
  { value: "width-desc", label: "Thickness (High → Low)" },
  { value: "weight-asc", label: "Weight (Low → High)" },
  { value: "weight-desc", label: "Weight (High → Low)" },
  { value: "sku-asc", label: "Product Code (A → Z)" },
  { value: "sku-desc", label: "Product Code (Z → A)" },
];

/** Fine Jewelry also sorts by Tier (craftsmanship difficulty, S → F). */
const FINE_JEWELRY_SORT_OPTIONS: SortOption[] = [
  { value: "tier-desc", label: "Craftsmanship Tier (S → F)" },
  { value: "tier-asc", label: "Craftsmanship Tier (F → S)" },
];

export function sortOptionsForCategory(category: Category): SortOption[] {
  if (category === "Chain") return [...SORT_OPTIONS, ...CHAIN_SORT_OPTIONS];
  if (category === "8K Gold Collection") return [...SORT_OPTIONS, ...FINE_JEWELRY_SORT_OPTIONS];
  return SORT_OPTIONS;
}
