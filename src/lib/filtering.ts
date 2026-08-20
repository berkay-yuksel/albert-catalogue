import type {
  Product, FacetConfig, FacetSelections, Ranges, SortValue, Category,
} from "./types";

/** Builds an empty selection state (all unchecked / no range) for a given facet config. */
export function buildEmptyFacetState(config: FacetConfig[]): {
  facetSelections: FacetSelections;
  ranges: Ranges;
} {
  const facetSelections: FacetSelections = {};
  const ranges: Ranges = {};
  config.forEach((f) => {
    if (f.type === "checkbox") facetSelections[f.key] = new Set();
    else ranges[f.key] = { min: null, max: null };
  });
  return { facetSelections, ranges };
}

export function applyFilters(
  products: Product[],
  opts: {
    activeCategory: Category;
    search: string;
    facetSelections: FacetSelections;
    ranges: Ranges;
  }
): Product[] {
  const { activeCategory, search, facetSelections, ranges } = opts;
  return products.filter((p) => {
    if (p.category !== activeCategory) return false;

    if (search) {
      const s = search.toLowerCase();
      if (!(p.name.toLowerCase().includes(s) || p.category.toLowerCase().includes(s))) return false;
    }

    for (const key in facetSelections) {
      const set = facetSelections[key];
      if (!set || set.size === 0) continue;
      const v = p[key as keyof Product];
      if (typeof v !== "string" || !set.has(v)) return false;
    }

    for (const key in ranges) {
      const r = ranges[key];
      if (!r || (r.min === null && r.max === null)) continue;
      const raw = p[key as keyof Product];
      const v = typeof raw === "number" ? raw : 0;
      if (r.min !== null && v < r.min) return false;
      if (r.max !== null && v !== 0 && v > r.max) return false;
    }

    return true;
  });
}

export function sortProducts(list: Product[], sort: SortValue): Product[] {
  const [key, dir] = sort.split("-");
  const mul = dir === "asc" ? 1 : -1;
  return [...list].sort((a, b) => {
    switch (key) {
      case "name":
        return mul * a.name.localeCompare(b.name);
      case "price":
        return mul * (a.price - b.price);
      case "id":
        return mul * (a.id - b.id);
      case "width":
        return mul * (a.width - b.width);
      case "weight":
        return mul * (a.weight - b.weight);
      default:
        return 0;
    }
  });
}

export type Chip =
  | { type: "search"; label: string }
  | { type: "facet"; key: string; value: string; label: string }
  | { type: "range"; key: string; label: string };

export function buildChips(opts: {
  search: string;
  facetSelections: FacetSelections;
  ranges: Ranges;
}): Chip[] {
  const chips: Chip[] = [];
  for (const key in opts.facetSelections) {
    opts.facetSelections[key]?.forEach((v) => chips.push({ type: "facet", key, value: v, label: v }));
  }
  for (const key in opts.ranges) {
    const r = opts.ranges[key];
    if (r && (r.min !== null || r.max !== null)) {
      chips.push({ type: "range", key, label: `${r.min ?? "…"}–${r.max ?? "…"}` });
    }
  }
  if (opts.search) chips.push({ type: "search", label: `"${opts.search}"` });
  return chips;
}
