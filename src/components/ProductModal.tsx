"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import { CAT_LABELS } from "@/data/facets";
import { DETAIL_FIELDS } from "@/data/detailFields";
import { ProductImage } from "./ProductImage";

const GALLERY: { variant: 1 | 2 | 3; label: string }[] = [
  { variant: 1, label: "Standard View" },
  { variant: 2, label: "Angle View" },
  { variant: 3, label: "Zoom Detail" },
];

export function ProductModal({
  product,
  onClose,
  onAddToOrder,
}: {
  product: Product;
  onClose: () => void;
  onAddToOrder: (productId: number) => void;
}) {
  const [imgIndex, setImgIndex] = useState(0);

  const specs = DETAIL_FIELDS.filter(
    (f) => product[f.key] !== undefined && product[f.key] !== "—" && product[f.key] !== 0 && product[f.key] !== ""
  );

  function step(dir: number) {
    setImgIndex((i) => (i + dir + GALLERY.length) % GALLERY.length);
  }

  // Keyboard shortcuts: Escape closes the modal, ←/→ step through photos.
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <div className="modal-media">
        
          <span className="img-label">{GALLERY[imgIndex].label}</span>
          <button className="img-nav prev" onClick={() => step(-1)} aria-label="Previous image">
            ‹
          </button>
          <button className="img-nav next" onClick={() => step(1)} aria-label="Next image">
            ›
          </button>
          <div className="modal-img-stage">
            <ProductImage product={product} variant={GALLERY[imgIndex].variant} />
          </div>
          <div className="img-dots">
            {GALLERY.map((g, i) => (
              <span
                key={g.variant}
                className={`dot ${i === imgIndex ? "active" : ""}`}
                onClick={() => setImgIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="modal-body">
          <div className="modal-cat">{CAT_LABELS[product.category]}</div>
          <div className="modal-title">{product.name}</div>
          <span className={`stock-dot modal-stock ${product.stock === "In Stock" ? "instock" : "order"}`}>
            {product.stock === "In Stock" ? "In Stock" : "Made to Order"}
          </span>
          <div className="modal-specs">
            {specs.map((f) => (
              <div className="spec-row" key={f.key}>
                <span className="k">{f.label}</span>
                <span className="v">
                  {product[f.key]}
                  {f.unit ? ` ${f.unit}` : ""}
                </span>
              </div>
            ))}
          </div>
          <div className="modal-actions">
            <button className="btn-primary" onClick={() => onAddToOrder(product.id)}>
              Order
            </button>
            <button className="btn-secondary" onClick={onClose}>
              Back to Catalog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
