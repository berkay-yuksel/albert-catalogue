"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { ProductImage } from "./ProductImage";

export function FineJewelryRow({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (productId: number, qty: number) => void;
}) {
  const [amount, setAmount] = useState(1);

  return (
    <tr>
      <td>
        <div className="row-swatch">
          <ProductImage product={product} variant={1} />
        </div>
      </td>
      <td>
        <div className="row-name">{product.name}</div>
      </td>
      <td className="row-cat">{product.fineSubCategory ?? "N/A"}</td>
      <td className="row-desc">
        {product.description ?? "N/A"}
        {product.tierLabel && <span className="spec-tag row-difficulty">{product.tierLabel}</span>}
      </td>
      <td>
        <input
          type="number"
          className="qty-input"
          min={1}
          value={amount}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            setAmount(Number.isFinite(v) && v > 0 ? v : 1);
          }}
        />
      </td>
      <td>
        <button
          className="add-text-btn"
          onClick={() => onAdd(product.id, amount)}
        >
          Add
        </button>
      </td>
    </tr>
  );
}
