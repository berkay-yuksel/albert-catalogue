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

  /** Real catalog product code ("Katalog Ürün Kodu"), e.g. "0001-FOR-20" — currently only Chain items have this. */
  sku?: string;
  /** Chain style family (e.g. "Classic Chains", "Hollow Chains") — Chain-only, sourced from the client sheet. */
  chainType?: string;
  /** The sheet's own web reference code ("WEB Sayfası Katalog Ürün Kodu"), e.g. "AF Chain 1" — Chain-only. */
  webCode?: string;

  /** e.g. "chain1", "bracelet3" — used to build image file names. */
  imgSlug: string;

  /** Short descriptive blurb — currently only populated for Fine Jewelry (8K) items. */
  description?: string;

  // Ring-only
  setting?: string;
  size?: string;

  // Fine Jewelry (8K Gold Collection)-only — sourced from the client product list
  /** Broad parent grouping (e.g. "Bracelets", "Diamonds & Gemstones") — 13 values, used as the primary filter. */
  fineCategory?: string;
  /** Specific sub-category from the source sheet (e.g. "Men's Bracelets") — 51 values, secondary filter. */
  fineSubCategory?: string;
  difficulty?: string;
  /** Craftsmanship tier derived from difficulty: 1 (Very Easy) – 6 (Very Difficult). Higher = harder. */
  tier?: number;
  /** US market demand rating, 1–5. */
  popularity?: number;

  // Tobacco Pipe-only
  material?: string;
  shape?: string;
  filter?: string;
  bowl?: string;
  stem?: string;
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

export type SortKey = "name" | "price" | "id" | "width" | "weight";
export type SortDir = "asc" | "desc";
/** Combined sort value as used by the <select>, e.g. "name-asc". */
export type SortValue = `${SortKey}-${SortDir}`;

export type ViewMode = "grid" | "list";
