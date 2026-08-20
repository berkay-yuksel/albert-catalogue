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

/** Chain also sorts by Thickness/Weight, since the client sheet gives a real per-SKU gauge/weight. */
const CHAIN_SORT_OPTIONS: SortOption[] = [
  { value: "width-asc", label: "Thickness (Low → High)" },
  { value: "width-desc", label: "Thickness (High → Low)" },
  { value: "weight-asc", label: "Weight (Low → High)" },
  { value: "weight-desc", label: "Weight (High → Low)" },
];

export function sortOptionsForCategory(category: Category): SortOption[] {
  if (category === "Chain") return [...SORT_OPTIONS, ...CHAIN_SORT_OPTIONS];
  return SORT_OPTIONS;
}
