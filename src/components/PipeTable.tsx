"use client";

import type { Product } from "@/lib/types";
import { PipeRow } from "./PipeRow";

export function PipeTable({
  products,
  onOpen,
  onAdd,
  onHeaderClick,
  sortArrow,
}: {
  products: Product[];
  onOpen: (product: Product) => void;
  onAdd: (productId: number) => void;
  onHeaderClick: (key: string) => void;
  sortArrow: (key: string) => React.ReactNode;
}) {
  return (
    <div className="list-view active">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th></th>
              <th className="sortable" onClick={() => onHeaderClick("name")}>
                Product Name {sortArrow("name")}
              </th>
              <th className="sortable" onClick={() => onHeaderClick("sku")}>
                Product Code {sortArrow("sku")}
              </th>
              <th>Material</th>
              <th>Shape</th>
              <th>Theme</th>
              <th>Stem Color</th>
              <th>Handmade</th>
              <th>Box Included</th>
              <th className="sortable" onClick={() => onHeaderClick("price")}>
                Price {sortArrow("price")}
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <PipeRow product={p} key={p.id} onOpen={onOpen} onAdd={onAdd} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
