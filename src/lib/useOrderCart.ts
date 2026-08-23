"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";

export interface OrderCartApi {
  /** productId -> quantity */
  items: Record<number, number>;
  itemCount: number;
  totalWeight: (products: Product[]) => number;
  totalPrice: (products: Product[]) => number;
  add: (productId: number) => void;
  /** Adds a specific quantity at once (e.g. from a manual "amount" field). */
  addQty: (productId: number, qty: number) => void;
  remove: (productId: number) => void;
  changeQty: (productId: number, delta: number) => void;
  /** Sets an exact quantity (e.g. from a manual text input). Values <= 0 remove the item. */
  setQty: (productId: number, qty: number) => void;
  clear: () => void;
}

/**
 * In-memory order cart. This is intentionally the only place that knows
 * how cart state is stored - later, when we wire up a database, this hook
 * is what gets replaced (e.g. with one backed by an API call), and every
 * component that uses `useOrderCart()` keeps working unchanged.
 */
export function useOrderCart(): OrderCartApi {
  const [items, setItems] = useState<Record<number, number>>({});

  const itemCount = useMemo(
    () => Object.values(items).reduce((sum, qty) => sum + qty, 0),
    [items]
  );

  function add(productId: number) {
    setItems((prev) => ({ ...prev, [productId]: (prev[productId] ?? 0) + 1 }));
  }

  function addQty(productId: number, qty: number) {
    if (qty <= 0) return;
    setItems((prev) => ({ ...prev, [productId]: (prev[productId] ?? 0) + qty }));
  }

  function remove(productId: number) {
    setItems((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  }

  function changeQty(productId: number, delta: number) {
    setItems((prev) => {
      const next = (prev[productId] ?? 0) + delta;
      const copy = { ...prev };
      if (next <= 0) delete copy[productId];
      else copy[productId] = next;
      return copy;
    });
  }

  function setQty(productId: number, qty: number) {
    setItems((prev) => {
      const copy = { ...prev };
      if (qty <= 0) delete copy[productId];
      else copy[productId] = qty;
      return copy;
    });
  }

  function clear() {
    setItems({});
  }

  function totalWeight(products: Product[]): number {
    return Object.entries(items).reduce((sum, [id, qty]) => {
      const p = products.find((x) => x.id === Number(id));
      return sum + (p ? p.weight * qty : 0);
    }, 0);
  }

  function totalPrice(products: Product[]): number {
    return Object.entries(items).reduce((sum, [id, qty]) => {
      const p = products.find((x) => x.id === Number(id));
      return sum + (p ? p.price * qty : 0);
    }, 0);
  }

  return { items, itemCount, totalWeight, totalPrice, add, addQty, remove, changeQty, setQty, clear };
}
