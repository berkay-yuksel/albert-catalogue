"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { CAT_LABELS } from "@/data/facets";
import { fmtPrice } from "@/data/products";
import { ProductImage } from "./ProductImage";

const VARIANTS: (1 | 2 | 3)[] = [1, 2, 3];

function specTags(p: Product): string[] {
  const tags: string[] = [];
  if (p.karat && p.karat !== "—") tags.push(p.karat);
  if (p.color && p.color !== "—") tags.push(p.color);
  if (p.width) tags.push(p.width + "mm");
  if (p.length) tags.push(p.length + "cm");
  if (p.size) tags.push(p.size);
  if (p.material) tags.push(p.material);
  return tags.slice(0, 4);
}

export function ProductCard({
  product,
  onOpen,
  onAdd,
}: {
  product: Product;
  onOpen: (product: Product) => void;
  onAdd: (productId: number) => void;
}) {
  const inStock = product.stock === "In Stock";
  const [imgIdx, setImgIdx] = useState(0);

  function step(dir: number, e: React.MouseEvent) {
    e.stopPropagation();
    setImgIdx((i) => (i + dir + VARIANTS.length) % VARIANTS.length);
  }

  return (
    <div className="card" onClick={() => onOpen(product)}>
      <div className="card-media">
        <span className={`stock-badge ${inStock ? "instock" : "order"}`}>
          {inStock ? "In Stock" : "Made to Order"}
        </span>
        <button
          className="card-add-btn"
          title="Add to order"
          aria-label="Add to order"
          onClick={(e) => {
            e.stopPropagation();
            onAdd(product.id);
          }}
        >
          +
        </button>
        <button className="card-nav prev" onClick={(e) => step(-1, e)} aria-label="Previous image">
          ‹
        </button>
        <button className="card-nav next" onClick={(e) => step(1, e)} aria-label="Next image">
          ›
        </button>
        <div className="card-img-stage">
          <ProductImage product={product} variant={VARIANTS[imgIdx]} key={VARIANTS[imgIdx]} />
        </div>
        <div className="card-dots">
          {VARIANTS.map((v, i) => (
            <span key={v} className={`dot ${i === imgIdx ? "active" : ""}`} />
          ))}
        </div>
      </div>
      <div className="card-body">
        <div className="card-cat">{CAT_LABELS[product.category]}</div>
        <div className="card-name">{product.name}</div>
        <div className="card-price">{fmtPrice(product.price)}</div>
        <div className="card-specs">
          {specTags(product).map((t) => (
            <span className="spec-tag" key={t}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
