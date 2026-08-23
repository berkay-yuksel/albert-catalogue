"use client";

import type { Product } from "@/lib/types";
import { CAT_LABELS } from "@/data/facets";
import { fmtPrice } from "@/data/products";
import { ProductImage, variantCountFor } from "./ProductImage";

function specTags(p: Product): string[] {
  const tags: string[] = [];
  if (p.karat && p.karat !== "N/A") tags.push(p.karat);
  tags.push(p.weight + "g");
  if (p.color && p.color !== "N/A") tags.push(p.color);
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
  const hasSecondPhoto = variantCountFor(product) > 1;

  return (
    <div className="card" onClick={() => onOpen(product)}>
      <div className="card-media">
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
        <div className="card-img-stage">
          {/* Both photos stay mounted; hovering just crossfades between them
              via CSS opacity (no remount = no hard cut). */}
          <ProductImage product={product} variant={1} className="img-base" />
          {hasSecondPhoto && <ProductImage product={product} variant={2} className="img-hover" />}
        </div>
      </div>
      <div className="card-body">
        <div className="card-cat">{product.chainType ?? CAT_LABELS[product.category]}</div>
        <div className="card-name">{product.name}</div>
        <div className="card-specs">
          {specTags(product).map((t) => (
            <span className="spec-tag" key={t}>
              {t}
            </span>
          ))}
        </div>
        <div className="card-foot">
          <span className="card-price">{fmtPrice(product.price)}</span>
          <span className="weight-val">{product.weight}g</span>
        </div>
      </div>
    </div>
  );
}
