"use client";

export function Topbar({ onOpenFilters }: { onOpenFilters: () => void }) {
  return (
    <div className="topbar">
      <div className="brand">
        <div className="brand-mark" />
        <div>
          <h1>Albert Family</h1>
          <span>B2B Wholesale Catalog · Chains · Jewelry · Pipes</span>
        </div>
      </div>
      <button className="filter-drawer-btn" onClick={onOpenFilters}>
        ☰ Filters
      </button>
    </div>
  );
}
