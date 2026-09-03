import type { Product } from "@/lib/types";

export interface DetailField {
  key: keyof Product;
  label: string;
  unit?: string;
}

export const DETAIL_FIELDS: DetailField[] = [
  { key: "sku", label: "Product Code" },
  { key: "chainType", label: "Chain Type" },
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
  { key: "material", label: "Material" },
  { key: "pipeShape", label: "Bowl Shape" },
  { key: "carvingStyle", label: "Design Style" },
  { key: "theme", label: "Theme" },
  { key: "motif", label: "Motif" },
  { key: "pipeColor", label: "Color" },
  { key: "surface", label: "Surface" },
  { key: "detailLevel", label: "Detail Level" },
  { key: "stemColor", label: "Mouthpiece Color" },
  { key: "mouthpieceShape", label: "Mouthpiece Shape" },
  { key: "handmade", label: "Handmade" },
  { key: "boxIncluded", label: "Box Included" },
  { key: "width", label: "Thickness", unit: "mm" },
  { key: "length", label: "Length", unit: "cm" },
  { key: "weight", label: "Weight", unit: "g" },
];
