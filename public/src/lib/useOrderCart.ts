"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";

export interface CartLine {
  productId: number;
  qty: number;
  /** Selected karat for this line, e.g. "14K". Only meaningful for products
   *  with `pricesByKarat` (currently: Chain); ignored otherwise. */
  karat: string;
}

export const DEFAULT_KARAT = "14K";

/** Cart lines are keyed by product+karat together, so the same product can
 *  appear as more than one line (e.g. 2x at 14K and 3x at 18K). */
function lineKey(productId: number, karat: string): string {
  return `${productId}:${karat}`;
}

export interface OrderCartApi {
  /** lineKey(productId, karat) -> line */
  items: Record<string, CartLine>;
  itemCount: number;
  totalWeight: (products: Product[]) => number;
  totalPrice: (products: Product[]) => number;
  /** Resolves the correct per-line price for a cart item (its selected
   *  karat's price if the product has pricesByKarat, else the flat price). */
  linePrice: (product: Product, line: CartLine) => number;
  add: (productId: number, karat?: string) => void;
  /** Adds a specific quantity at once (e.g. from a manual "amount" field). */
  addQty: (productId: number, qty: number, karat?: string) => void;
  remove: (key: string) => void;
  changeQty: (key: string, delta: number) => void;
  /** Sets an exact quantity (e.g. from a manual text input). Values <= 0 remove the line. */
  setQty: (key: string, qty: number) => void;
  /** Changes a line's karat. If a line already exists at the target karat for
   *  the same product, the two merge (quantities add together) rather than
   *  leaving two separate lines at the same karat. */
  setKarat: (key: string, karat: string) => void;
  clear: () => void;
}

/**
 * In-memory order cart. This is intentionally the only place that knows
 * how cart state is stored - later, when we wire up a database, this hook
 * is what gets replaced (e.g. with one backed by an API call), and every
 * component that uses `useOrderCart()` keeps working unchanged.
 */
export function useOrderCart(): OrderCartApi {
  const [items, setItems] = useState<Record<string, CartLine>>({});

  const itemCount = useMemo(
    () => Object.values(items).reduce((sum, line) => sum + line.qty, 0),
    [items]
  );

  function linePrice(product: Product, line: CartLine): number {
    return product.pricesByKarat?.[line.karat] ?? product.price;
  }

  function add(productId: number, karat: string = DEFAULT_KARAT) {
    const key = lineKey(productId, karat);
    setItems((prev) => ({
      ...prev,
      [key]: { productId, karat, qty: (prev[key]?.qty ?? 0) + 1 },
    }));
  }

  function addQty(productId: number, qty: number, karat: string = DEFAULT_KARAT) {
    if (qty <= 0) return;
    const key = lineKey(productId, karat);
    setItems((prev) => ({
      ...prev,
      [key]: { productId, karat, qty: (prev[key]?.qty ?? 0) + qty },
    }));
  }

  function remove(key: string) {
    setItems((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function changeQty(key: string, delta: number) {
    setItems((prev) => {
      const line = prev[key];
      if (!line) return prev;
      const nextQty = line.qty + delta;
      const copy = { ...prev };
      if (nextQty <= 0) delete copy[key];
      else copy[key] = { ...line, qty: nextQty };
      return copy;
    });
  }

  function setQty(key: string, qty: number) {
    setItems((prev) => {
      const line = prev[key];
      if (!line) return prev;
      const copy = { ...prev };
      if (qty <= 0) delete copy[key];
      else copy[key] = { ...line, qty };
      return copy;
    });
  }

  function setKarat(key: string, karat: string) {
    setItems((prev) => {
      const line = prev[key];
      if (!line || line.karat === karat) return prev;
      const newKey = lineKey(line.productId, karat);
      const copy = { ...prev };
      delete copy[key];
      // Merge into an existing line at the target karat, if there is one.
      copy[newKey] = { productId: line.productId, karat, qty: (copy[newKey]?.qty ?? 0) + line.qty };
      return copy;
    });
  }

  function clear() {
    setItems({});
  }

  function totalWeight(products: Product[]): number {
    return Object.values(items).reduce((sum, line) => {
      const p = products.find((x) => x.id === line.productId);
      return sum + (p ? p.weight * line.qty : 0);
    }, 0);
  }

  function totalPrice(products: Product[]): number {
    return Object.values(items).reduce((sum, line) => {
      const p = products.find((x) => x.id === line.productId);
      return sum + (p ? linePrice(p, line) * line.qty : 0);
    }, 0);
  }

  return {
    items, itemCount, totalWeight, totalPrice, linePrice,
    add, addQty, remove, changeQty, setQty, setKarat, clear,
  };
}
