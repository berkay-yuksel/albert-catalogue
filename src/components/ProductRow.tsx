"use client";

import type { Product } from "@/lib/types";
import { CAT_LABELS } from "@/data/facets";
import { fmtPrice } from "@/data/products";
import { ProductImage } from "./ProductImage";

export function ProductRow({
  product,
  onOpen,
  onAdd,
}: {
  product: Product;
  onOpen: (product: Product) => void;
  onAdd: (productId: number) => void;
}) {
  return (
    <tr onClick={() => onOpen(product)}>
      <td>
        <div className="row-swatch">
          <ProductImage product={product} variant={1} />
        </div>
      </td>
      <td>
        <div className="row-name">{product.name}</div>
      </td>
      <td className="row-cat">{product.chainType ?? product.material ?? CAT_LABELS[product.category]}</td>
      <td className="mono">{product.sku ?? "N/A"}</td>
      <td className="mono">{product.karat && product.karat !== "N/A" ? product.karat : "N/A"}</td>
      <td className="mono">{product.width ? product.width + " mm" : "N/A"}</td>
      <td className="mono">{product.length ? product.length + " cm" : "N/A"}</td>
      <td className="mono">{product.weight} g</td>
      <td className="mono">{fmtPrice(product.price)}</td>
      <td>
        <button
          className="order-btn-plus"
          title="Add to order"
          aria-label="Add to order"
          onClick={(e) => {
            e.stopPropagation();
            onAdd(product.id);
          }}
        >
          +
        </button>
      </td>
    </tr>
  );
}
