"use client";

import { PRODUCTS } from "@/data/products";
import { CATEGORIES, CAT_LABELS } from "@/data/facets";
import type { Category } from "@/lib/types";

export function CategoryTabs({
  activeCategory,
  onSelect,
}: {
  activeCategory: Category;
  onSelect: (c: Category) => void;
}) {
  const counts = Object.fromEntries(
    CATEGORIES.map((c) => [c, PRODUCTS.filter((p) => p.category === c).length])
  ) as Record<Category, number>;

  return (
    <nav className="cat-tabs">
      {CATEGORIES.map((c) => (
        <button
          key={c}
          className={`cat-tab ${activeCategory === c ? "active" : ""}`}
          onClick={() => onSelect(c)}
        >
          <span>{CAT_LABELS[c]}</span>
          <span className="n">{counts[c]}</span>
        </button>
      ))}
    </nav>
  );
}
