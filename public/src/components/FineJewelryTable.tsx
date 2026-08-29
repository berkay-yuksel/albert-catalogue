import type { Product } from "@/lib/types";
import { FineJewelryRow } from "./FineJewelryRow";

export function FineJewelryTable({
  products,
  onAdd,
}: {
  products: Product[];
  onAdd: (productId: number, qty: number) => void;
}) {
  return (
    <div className="list-view active">
      <div className="table-wrap">
        <table className="fine-jewelry-table">
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Sub Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <FineJewelryRow product={p} key={p.id} onAdd={onAdd} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
