"use client";

import type { Product } from "@/lib/types";
import { CAT_LABELS } from "@/data/facets";
import { fmtPrice } from "@/data/products";
import { useChainPrices } from "@/lib/PricingSettingsContext";
import { karatLabel as formatKaratLabel } from "@/lib/pricingFormula";
import { ProductImage, variantCountFor } from "./ProductImage";

function specTags(p: Product, displayKarat?: string): string[] {
  const tags: string[] = [];
  const karatLabel = p.pricesByKarat && displayKarat ? displayKarat : p.karat;
  if (karatLabel && karatLabel !== "N/A") tags.push(formatKaratLabel(karatLabel));
  tags.push(p.weight + "g");
  if (p.color && p.color !== "N/A") tags.push(p.color);
  if (p.width) tags.push(p.width + "mm");
  if (p.length) tags.push(p.length + "cm");
  if (p.size) tags.push(p.size);
  if (p.material) tags.push(p.material);
  if (p.motif) tags.push(p.motif);
  if (p.pipeColor) tags.push(p.pipeColor);
  if (p.finish && p.finish !== "N/A") tags.push(p.finish);
  if (p.stemColor) tags.push(p.stemColor);
  return tags.slice(0, 4);
}

export function ProductCard({
  product,
  onOpen,
  onAdd,
  displayKarat,
}: {
  product: Product;
  onOpen: (product: Product) => void;
  onAdd: (productId: number) => void;
  /** Which karat's price to show (Chain only - other categories ignore this). */
  displayKarat?: string;
}) {
  const hasSecondPhoto = variantCountFor(product) > 1;
  const livePrices = useChainPrices(product);
  const price = (displayKarat ? livePrices?.[displayKarat] : undefined) ?? product.price;

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
        <div className="card-cat">{product.chainType ?? product.material ?? CAT_LABELS[product.category]}</div>
        <div className="card-name">{product.name}</div>
        {product.category !== "Tobacco Pipe" && (
          <div className="card-specs">
            {specTags(product, displayKarat).map((t) => (
              <span className="spec-tag" key={t}>
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="card-foot">
          <span className="card-price">{fmtPrice(price)}</span>
          {product.category !== "Tobacco Pipe" && <span className="weight-val">{product.weight}g</span>}
        </div>
      </div>
    </div>
  );
}
