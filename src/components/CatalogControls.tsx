"use client";

import type { SortValue, ViewMode } from "@/lib/types";
import { SORT_OPTIONS } from "@/data/sortOptions";

export function CatalogControls({
  search,
  onSearchChange,
  sort,
  onSortChange,
  view,
  onViewChange,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  sort: SortValue;
  onSortChange: (v: SortValue) => void;
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
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
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="view-toggle">
          <button className={view === "grid" ? "active" : ""} onClick={() => onViewChange("grid")}>
            ▦ Grid
          </button>
          <button className={view === "list" ? "active" : ""} onClick={() => onViewChange("list")}>
            ☰ List
          </button>
        </div>
      </div>
    </div>
  );
}
