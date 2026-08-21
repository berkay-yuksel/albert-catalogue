"use client";

import { useMemo, useState } from "react";
import type { Category, FacetSelections, Ranges, SortValue, ViewMode } from "@/lib/types";
import type { Product } from "@/lib/types";
import { CATEGORIES, CATEGORY_FACETS, FINE_JEWELRY_CATEGORY } from "@/data/facets";
import { sortOptionsForCategory } from "@/data/sortOptions";
import { applyFilters, buildChips, buildEmptyFacetState, sortProducts, type Chip } from "@/lib/filtering";

import { Topbar } from "./Topbar";
import { CatalogControls } from "./CatalogControls";
import { CategoryTabs } from "./CategoryTabs";
import { Sidebar } from "./Sidebar";
import { ProductCard } from "./ProductCard";
import { ProductRow } from "./ProductRow";
import { FineJewelryTable } from "./FineJewelryTable";
import { ActiveChips } from "./ActiveChips";
import { EmptyState } from "./EmptyState";
import { ProductModal } from "./ProductModal";
import { OrderFab, OrderPanel } from "./OrderPanel";
import { useOrderCart } from "@/lib/useOrderCart";

const DEFAULT_CATEGORY: Category = CATEGORIES[0];

/** Gold Chains default-sorts by thickness (High → Low); everything else defaults to name. */
function defaultSortFor(category: Category): SortValue {
  return category === "Chain" ? "width-desc" : "name-asc";
}

export function CatalogClient({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>(DEFAULT_CATEGORY);
  const [sort, setSort] = useState<SortValue>(() => defaultSortFor(DEFAULT_CATEGORY));
  // Default to grid view — list is opt-in via the view toggle.
  const [view, setView] = useState<ViewMode>("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderPanelOpen, setOrderPanelOpen] = useState(false);
  const [addPulse, setAddPulse] = useState(0);
  const cart = useOrderCart();

  const isFineJewelry = activeCategory === FINE_JEWELRY_CATEGORY;
  // Fine Jewelry only ever shows as a list, regardless of the last-selected view.
  const effectiveView: ViewMode = isFineJewelry ? "list" : view;
  const sortOptions = useMemo(() => sortOptionsForCategory(activeCategory), [activeCategory]);

  function handleAdd(productId: number, qty: number = 1) {
    cart.addQty(productId, qty);
    setAddPulse((n) => n + 1);
  }

  const [{ facetSelections, ranges }, setFacetState] = useState<{
    facetSelections: FacetSelections;
    ranges: Ranges;
  }>(() => buildEmptyFacetState(CATEGORY_FACETS[DEFAULT_CATEGORY]));

  function selectCategory(c: Category) {
    setActiveCategory(c);
    setSearch("");
    setFacetState(buildEmptyFacetState(CATEGORY_FACETS[c]));
    if (c === FINE_JEWELRY_CATEGORY) setView("list");
    setSort(defaultSortFor(c));
  }

  function toggleFacetValue(key: string, value: string, checked: boolean) {
    setFacetState((prev) => {
      const nextSet = new Set(prev.facetSelections[key] ?? []);
      if (checked) nextSet.add(value);
      else nextSet.delete(value);
      return { ...prev, facetSelections: { ...prev.facetSelections, [key]: nextSet } };
    });
  }

  function setRangeEdge(key: string, edge: "min" | "max", value: number | null) {
    setFacetState((prev) => ({
      ...prev,
      ranges: { ...prev.ranges, [key]: { ...(prev.ranges[key] ?? { min: null, max: null }), [edge]: value } },
    }));
  }

  function clearAll() {
    setSearch("");
    setFacetState(buildEmptyFacetState(CATEGORY_FACETS[activeCategory]));
  }

  function removeChip(chip: Chip) {
    if (chip.type === "search") {
      setSearch("");
    } else if (chip.type === "range") {
      setFacetState((prev) => ({ ...prev, ranges: { ...prev.ranges, [chip.key]: { min: null, max: null } } }));
    } else {
      toggleFacetValue(chip.key, chip.value, false);
    }
  }

  function handleHeaderClick(key: string) {
    const [curKey, curDir] = sort.split("-");
    const dir = curKey === key && curDir === "asc" ? "desc" : "asc";
    setSort(`${key}-${dir}` as SortValue);
  }

  function sortArrow(key: string) {
    if (!sort.startsWith(key + "-")) return null;
    return <span className="arrow">{sort.endsWith("asc") ? "▲" : "▼"}</span>;
  }

  const filtered = useMemo(
    () => applyFilters(products, { activeCategory, search, facetSelections, ranges }),
    [products, activeCategory, search, facetSelections, ranges]
  );
  const sorted = useMemo(() => sortProducts(filtered, sort), [filtered, sort]);
  const chips = useMemo(() => buildChips({ search, facetSelections, ranges }), [search, facetSelections, ranges]);

  return (
    <>
      <div className="sticky-header">
        <Topbar />
        <CategoryTabs activeCategory={activeCategory} onSelect={selectCategory} />
      </div>

      <div className="layout">
        <Sidebar
          activeCategory={activeCategory}
          facetSelections={facetSelections}
          ranges={ranges}
          onToggleValue={toggleFacetValue}
          onRangeChange={setRangeEdge}
          onClear={clearAll}
          open={mobileFiltersOpen}
          onCloseMobile={() => setMobileFiltersOpen(false)}
        />

        <main className="main">
          <CatalogControls
            search={search}
            onSearchChange={setSearch}
            sort={sort}
            onSortChange={setSort}
            sortOptions={sortOptions}
            view={effectiveView}
            onViewChange={setView}
            showViewToggle={!isFineJewelry}
          />

          <div className="results-bar">
            <div className="results-count-group">
              <button className="filter-drawer-btn" onClick={() => setMobileFiltersOpen(true)}>
                ☰ Filters
              </button>
              <div className="results-count">
                <b>{sorted.length}</b>
                <span className="results-count-label">products listed</span>
              </div>
            </div>
            <ActiveChips chips={chips} onRemove={removeChip} />
          </div>

          {sorted.length === 0 ? (
            <EmptyState onClear={clearAll} />
          ) : isFineJewelry ? (
            <FineJewelryTable products={sorted} onAdd={handleAdd} />
          ) : effectiveView === "grid" ? (
            <div className="grid-view">
              {sorted.map((p) => (
                <ProductCard product={p} key={p.id} onOpen={setSelectedProduct} onAdd={handleAdd} />
              ))}
            </div>
          ) : (
            <div className="list-view active">
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th className="sortable" onClick={() => handleHeaderClick("name")}>
                        Product Name {sortArrow("name")}
                      </th>
                      <th className="sortable" onClick={() => handleHeaderClick("chainType")}>
                        Category {sortArrow("chainType")}
                      </th>
                      <th className="sortable" onClick={() => handleHeaderClick("sku")}>
                        Product Code {sortArrow("sku")}
                      </th>
                      <th className="sortable" onClick={() => handleHeaderClick("width")}>
                        Thickness {sortArrow("width")}
                      </th>
                      <th>Length</th>
                      <th className="sortable" onClick={() => handleHeaderClick("weight")}>
                        Weight {sortArrow("weight")}
                      </th>
                      <th className="sortable" onClick={() => handleHeaderClick("price")}>
                        Price {sortArrow("price")}
                      </th>
                      <th>Stock</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {sorted.map((p) => (
                      <ProductRow product={p} key={p.id} onOpen={setSelectedProduct} onAdd={handleAdd} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      <OrderFab cart={cart} onOpen={() => setOrderPanelOpen(true)} pulseTrigger={addPulse} />
      <OrderPanel
        cart={cart}
        products={products}
        open={orderPanelOpen}
        onClose={() => setOrderPanelOpen(false)}
      />

      {selectedProduct && (
        <ProductModal
          key={selectedProduct.id}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToOrder={handleAdd}
        />
      )}
    </>
  );
}
