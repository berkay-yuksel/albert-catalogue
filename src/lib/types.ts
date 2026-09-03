export type Category =
  | "Chain"
  | "Bracelet"
  | "Ring"
  | "Necklace"
  | "8K Gold Collection"
  | "Tobacco Pipe";

export type StockStatus = "In Stock" | "Made to Order";

/**
 * A single catalog product.
 *
 * Most fields are shared across categories (karat, color, weight, price...).
 * A handful of fields only make sense for specific categories (e.g. `setting`
 * and `size` only apply to rings, `material`/`shape` only to tobacco pipes).
 * Those are optional here rather than split into per-category types, mirroring
 * how the original catalog treated a single flat product record.
 */
export interface Product {
  id: number;
  category: Category;
  name: string;

  karat: string;
  color: string;
  mfg: string;
  finish: string;
  clasp: string;
  stone: string;

  width: number;
  length: number;
  weight: number;
  stock: StockStatus;
  price: number;

  /** Real catalog product code (e.g. "AFC1") - Chain-only. This is what's shown/searched as the product code. */
  sku?: string;
  /** Chain style family (e.g. "Classic Chains", "Hollow Chains") - Chain-only, sourced from the client sheet. */
  chainType?: string;
  /** Image file reference code (e.g. "0001-FOR-20") - Chain-only. Used ONLY to build photo filenames;
   *  NOT the same as `sku` (the client sheet keeps these as two separate codes per item). */
  imageCode?: string;
  /** Real wholesale price for every karat (8K-24K) - Chain-only, sourced directly from the client sheet.
   *  `price`/`karat` reflect the 14K figure (the catalog's default reference karat); the buyer can pick a
   *  different karat per line item in the order cart, see useOrderCart's `setKarat`. */
  pricesByKarat?: Record<string, number>;

  /** e.g. "chain1", "bracelet3" - used to build image file names. */
  imgSlug: string;

  /** Short descriptive blurb - currently only populated for Fine Jewelry (8K) items. */
  description?: string;

  // Ring-only
  setting?: string;
  size?: string;

  // Fine Jewelry (8K Gold Collection)-only - sourced from the client product list
  /** Broad parent grouping (e.g. "Bracelets", "Diamonds & Gemstones") - 13 values, used as the primary filter. */
  fineCategory?: string;
  /** Specific sub-category from the source sheet (e.g. "Men's Bracelets") - 51 values, secondary filter. */
  fineSubCategory?: string;
  difficulty?: string;
  /** US market demand rating, 1–5. */
  popularity?: number;

  // Tobacco Pipe-only - real catalog data, see data/pipeData.ts
  material?: string;
  pipeShape?: string;
  carvingStyle?: string;
  /** Broad category (Animal, Human, Nature, Skull, Botanical, Geometric, Classic, Minimal). */
  theme?: string;
  /** Specific subject depicted, e.g. "Elephant", "Bearded Man" - more granular than `theme`. */
  motif?: string;
  /** The pipe's own body color (White/Beige/Cream/etc) - distinct from `stemColor` (the mouthpiece). */
  pipeColor?: string;
  /** Multi-value surface texture descriptors, e.g. ["Carved", "Textured"]. */
  surface?: string[];
  /** Minimal / Medium / High - how intricate the carving is. */
  detailLevel?: string;
  stemColor?: string;
  mouthpieceShape?: string;
  /** "Yes" or "No" - kept as a string (not boolean) so it plugs into the generic checkbox facet system. */
  handmade?: string;
  /** "Included" or "Not Included" - kept as a string (not boolean) so it plugs into the generic checkbox facet system like other filters. */
  boxIncluded?: string;
  /** Exact photo filenames from the client data, served from /pipeimages/. */
  pipeImage?: string;
  pipeZoomImage?: string;
}

export type FacetType = "checkbox" | "range";

export interface FacetConfig {
  key: keyof Product;
  type: FacetType;
  label: string;
  /** Only present for type: "checkbox" facets. */
  values?: string[];
  /** If true, this facet section starts collapsed in the sidebar. */
  defaultCollapsed?: boolean;
}

/* ============================================================
   Filter/sort state shapes shared between the catalog client
   component and its child components (Sidebar, Topbar, etc.)
   ============================================================ */
export interface NumericRange {
  min: number | null;
  max: number | null;
}

/** facet key -> set of selected checkbox values */
export type FacetSelections = Record<string, Set<string>>;
/** facet key -> selected numeric range */
export type Ranges = Record<string, NumericRange>;

export type SortKey = "name" | "price" | "id" | "width" | "weight" | "sku" | "chainType" | "karat";
export type SortDir = "asc" | "desc";
/** Combined sort value as used by the <select>, e.g. "name-asc". */
export type SortValue = `${SortKey}-${SortDir}`;

export type ViewMode = "grid" | "list";
