import type { Product } from "@/lib/types";

export interface DetailField {
  key: keyof Product;
  label: string;
  unit?: string;
}

export const DETAIL_FIELDS: DetailField[] = [
  { key: "karat", label: "Karat" },
  { key: "color", label: "Gold Color" },
  { key: "mfg", label: "Manufacturing Type" },
  { key: "finish", label: "Finish / Coating" },
  { key: "clasp", label: "Clasp Type" },
  { key: "stone", label: "Stone Type" },
  { key: "setting", label: "Stone Setting Type" },
  { key: "size", label: "Ring Size" },
  { key: "k8type", label: "Product Type" },
  { key: "market", label: "Target Export Market" },
  { key: "material", label: "Material" },
  { key: "shape", label: "Shape / Model" },
  { key: "filter", label: "Filter Size" },
  { key: "bowl", label: "Bowl Size" },
  { key: "stem", label: "Stem Material" },
  { key: "width", label: "Thickness", unit: "mm" },
  { key: "length", label: "Length", unit: "cm" },
  { key: "weight", label: "Weight", unit: "g" },
];
