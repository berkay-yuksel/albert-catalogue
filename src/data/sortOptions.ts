import type { SortValue } from "@/lib/types";

export interface SortOption {
  value: SortValue;
  label: string;
}

/** Only general, always-applicable sort criteria — no category-specific fields. */
export const SORT_OPTIONS: SortOption[] = [
  { value: "name-asc", label: "Name (A–Z)" },
  { value: "name-desc", label: "Name (Z–A)" },
  { value: "price-asc", label: "Price (Low → High)" },
  { value: "price-desc", label: "Price (High → Low)" },
  { value: "id-desc", label: "Newest First" },
  { value: "id-asc", label: "Oldest First" },
];
