"use client";

import { useState } from "react";
import type { Category, FacetConfig, FacetSelections, Product, Ranges } from "@/lib/types";
import { PRODUCTS } from "@/data/products";
import { CATEGORY_FACETS, CAT_LABELS } from "@/data/facets";

function valueCounts(products: Product[], key: keyof Product, values: string[]) {
  const counts = Object.fromEntries(values.map((v) => [v, 0])) as Record<string, number>;
  products.forEach((p) => {
    const v = p[key];
    if (typeof v === "string" && v in counts) counts[v]++;
  });
  return counts;
}

export function Sidebar({
  activeCategory,
  facetSelections,
  ranges,
  onToggleValue,
  onRangeChange,
  onClear,
  open,
  onCloseMobile,
}: {
  activeCategory: Category;
  facetSelections: FacetSelections;
  ranges: Ranges;
  onToggleValue: (key: string, value: string, checked: boolean) => void;
  onRangeChange: (key: string, edge: "min" | "max", value: number | null) => void;
  onClear: () => void;
  /** Mobile drawer open state (desktop always shows the sidebar). */
  open: boolean;
  onCloseMobile: () => void;
}) {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const config: FacetConfig[] = CATEGORY_FACETS[activeCategory];
  const scoped = PRODUCTS.filter((p) => p.category === activeCategory);

  function toggleCollapsed(key: string) {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <>
      <div className={`overlay ${open ? "open" : ""}`} onClick={onCloseMobile} />
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-head">
          <div>
            <h2>Filters</h2>
            <span className="sub">{CAT_LABELS[activeCategory]}</span>
          </div>
          <button className="clear-btn" onClick={onClear}>
            Clear
          </button>
        </div>
        <div>
          {config.length === 0 ? (
            <p className="no-filters">No filters available for this category.</p>
          ) : (
            config.map((f) => {
              const isCollapsed = collapsed.has(f.key);
              if (f.type === "checkbox" && f.values) {
                const counts = valueCounts(scoped, f.key, f.values);
                const selected = facetSelections[f.key];
                return (
                  <div className={`facet ${isCollapsed ? "collapsed" : ""}`} key={f.key}>
                    <div className="facet-title" onClick={() => toggleCollapsed(f.key)}>
                      <span>{f.label}</span>
                      <span className="chevron">▾</span>
                    </div>
                    <div className="facet-body">
                      {f.values.map((v) => (
                        <label className="facet-option" key={v}>
                          <input
                            type="checkbox"
                            checked={selected?.has(v) ?? false}
                            onChange={(e) => onToggleValue(f.key, v, e.target.checked)}
                          />
                          <span>{v}</span>
                          <span className="count">{counts[v]}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              }
              const r = ranges[f.key] ?? { min: null, max: null };
              return (
                <div className={`facet ${isCollapsed ? "collapsed" : ""}`} key={f.key}>
                  <div className="facet-title" onClick={() => toggleCollapsed(f.key)}>
                    <span>{f.label}</span>
                    <span className="chevron">▾</span>
                  </div>
                  <div className="facet-body">
                    <div className="range-row">
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Min"
                        value={r.min ?? ""}
                        onChange={(e) =>
                          onRangeChange(f.key, "min", e.target.value === "" ? null : parseFloat(e.target.value))
                        }
                      />
                      <span>–</span>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Max"
                        value={r.max ?? ""}
                        onChange={(e) =>
                          onRangeChange(f.key, "max", e.target.value === "" ? null : parseFloat(e.target.value))
                        }
                      />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </aside>
    </>
  );
}
