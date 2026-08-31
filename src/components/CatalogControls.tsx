"use client";

import type { SortValue, ViewMode } from "@/lib/types";
import type { SortOption } from "@/data/sortOptions";
import { KARAT_ORDER, karatLabel } from "@/lib/pricingFormula";

export function CatalogControls({
  search,
  onSearchChange,
  sort,
  onSortChange,
  sortOptions,
  view,
  onViewChange,
  showViewToggle = true,
  karat,
  onKaratChange,
  showKaratSelector = false,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  sort: SortValue;
  onSortChange: (v: SortValue) => void;
  sortOptions: SortOption[];
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
  /** Hidden for categories that only support one view (e.g. Fine Jewelry is list-only). */
  showViewToggle?: boolean;
  karat: string;
  onKaratChange: (v: string) => void;
  /** Only Chain has real per-karat pricing, so this is hidden everywhere else. */
  showKaratSelector?: boolean;
}) {
  return (
    <div className="content-controls">
      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search product name (e.g. Forzentina, Curb, Meerschaum)"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="topbar-controls">
        <select
          className="sort-select"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortValue)}
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {showKaratSelector && (
          <div className="karat-picker">
            <span className="karat-picker-label">Karat</span>
            <select
              className="karat-select"
              value={karat}
              onChange={(e) => onKaratChange(e.target.value)}
              aria-label="Karat"
            >
              {KARAT_ORDER.map((k) => (
                <option key={k} value={k}>
                  {karatLabel(k)}
                </option>
              ))}
            </select>
          </div>
        )}
        {showViewToggle && (
          <div className="view-toggle">
            <button className={view === "grid" ? "active" : ""} onClick={() => onViewChange("grid")}>
              ▦ Grid
            </button>
            <button className={view === "list" ? "active" : ""} onClick={() => onViewChange("list")}>
              ☰ List
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
