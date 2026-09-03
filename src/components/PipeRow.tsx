"use client";

import type { Product } from "@/lib/types";
import { fmtPrice } from "@/data/products";
import { ProductImage } from "./ProductImage";

export function PipeRow({
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
      <td className="mono">{product.sku ?? "N/A"}</td>
      <td>{product.material ?? "N/A"}</td>
      <td>{product.pipeShape ?? "N/A"}</td>
      <td>{product.theme ?? "N/A"}</td>
      <td>{product.stemColor ?? "N/A"}</td>
      <td>{product.handmade ?? "N/A"}</td>
      <td>{product.boxIncluded ?? "N/A"}</td>
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
