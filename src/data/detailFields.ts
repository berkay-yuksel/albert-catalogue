import type { Product } from "@/lib/types";

export interface DetailField {
  key: keyof Product;
  label: string;
  unit?: string;
}

export const DETAIL_FIELDS: DetailField[] = [
  { key: "sku", label: "Product Code" },
  { key: "webCode", label: "Web Catalog Code" },
  { key: "chainType", label: "Chain Type" },
  { key: "difficulty", label: "Workmanship Difficulty Level" },
  { key: "karat", label: "Karat" },
  { key: "color", label: "Gold Color" },
  { key: "mfg", label: "Manufacturing Type" },
  { key: "finish", label: "Finish / Coating" },
  { key: "clasp", label: "Clasp Type" },
  { key: "stone", label: "Stone Type" },
  { key: "setting", label: "Stone Setting Type" },
  { key: "size", label: "Ring Size" },
  { key: "fineCategory", label: "Category" },
  { key: "fineSubCategory", label: "Sub Category" },
  { key: "tierLabel", label: "Craftsmanship Tier" },
  { key: "material", label: "Material" },
  { key: "pipeShape", label: "Shape" },
  { key: "carvingStyle", label: "Carving Style" },
  { key: "theme", label: "Theme" },
  { key: "stemColor", label: "Stem Color" },
  { key: "handmade", label: "Handmade" },
  { key: "width", label: "Thickness", unit: "mm" },
  { key: "length", label: "Length", unit: "cm" },
  { key: "weight", label: "Weight", unit: "g" },
];
