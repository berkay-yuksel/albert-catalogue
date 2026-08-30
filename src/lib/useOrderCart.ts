"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { usePricingSettings } from "@/lib/PricingSettingsContext";
import { computeChainPrice } from "@/lib/pricingFormula";

export interface CartLine {
  productId: number;
  qty: number;
  /** Selected karat for this line, e.g. "14K". Only meaningful for products
   *  with `pricesByKarat` (currently: Chain); ignored otherwise. */
  karat: string;
  /** Optional "Add Filter" add-on (Tobacco Pipe only) - adds
   *  PIPE_FILTER_ADDON_PRICE per unit when true. */
  addFilter?: boolean;
}

export const DEFAULT_KARAT = "14K";
/** Flat add-on price per unit when a pipe's "Add Filter" option is checked. */
export const PIPE_FILTER_ADDON_PRICE = 30;

/** Cart lines are keyed by product+karat together, so the same product can
 *  appear as more than one line (e.g. 2x at 14K and 3x at 18K). */
function lineKey(productId: number, karat: string): string {
  return `${productId}:${karat}`;
}

export interface OrderCartApi {
  /** lineKey(productId, karat) -> line */
  items: Record<string, CartLine>;
  /** Keys in the order they should be displayed. Stable across karat changes
   *  (changing a line's karat updates it in place rather than moving it to
   *  the end), so the order list doesn't visually reshuffle as you edit it. */
  order: string[];
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
  /** Changes a line's karat, keeping its position in the list. If a line
   *  already exists at the target karat for the same product, the two merge
   *  (quantities add together, staying at that other line's position). */
  setKarat: (key: string, karat: string) => void;
  /** Toggles the "Add Filter" add-on for a line (Tobacco Pipe only). */
  setAddFilter: (key: string, addFilter: boolean) => void;
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
  const [order, setOrder] = useState<string[]>([]);
  const { settings } = usePricingSettings();

  const itemCount = useMemo(
    () => Object.values(items).reduce((sum, line) => sum + line.qty, 0),
    [items]
  );

  function linePrice(product: Product, line: CartLine): number {
    // Chain prices are always live-computed from the current (possibly
    // admin-edited) settings, not the static baseline on the product object.
    const base = product.category === "Chain"
      ? computeChainPrice(product.weight, line.karat, settings)
      : product.price;
    const addon = product.category === "Tobacco Pipe" && line.addFilter ? PIPE_FILTER_ADDON_PRICE : 0;
    return base + addon;
  }

  function add(productId: number, karat: string = DEFAULT_KARAT) {
    const key = lineKey(productId, karat);
    setItems((prev) => ({
      ...prev,
      [key]: { productId, karat, qty: (prev[key]?.qty ?? 0) + 1, addFilter: prev[key]?.addFilter ?? false },
    }));
    setOrder((prev) => (prev.includes(key) ? prev : [...prev, key]));
  }

  function addQty(productId: number, qty: number, karat: string = DEFAULT_KARAT) {
    if (qty <= 0) return;
    const key = lineKey(productId, karat);
    setItems((prev) => ({
      ...prev,
      [key]: { productId, karat, qty: (prev[key]?.qty ?? 0) + qty, addFilter: prev[key]?.addFilter ?? false },
    }));
    setOrder((prev) => (prev.includes(key) ? prev : [...prev, key]));
  }

  function remove(key: string) {
    setItems((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setOrder((prev) => prev.filter((k) => k !== key));
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
    setOrder((prev) => {
      const line = items[key];
      const wouldRemove = line && line.qty + delta <= 0;
      return wouldRemove ? prev.filter((k) => k !== key) : prev;
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
    if (qty <= 0) setOrder((prev) => prev.filter((k) => k !== key));
  }

  function setKarat(key: string, karat: string) {
    const line = items[key];
    if (!line || line.karat === karat) return;
    const newKey = lineKey(line.productId, karat);
    const mergingIntoExisting = !!items[newKey];

    setItems((prev) => {
      const copy = { ...prev };
      delete copy[key];
      // Merge into an existing line at the target karat, if there is one.
      copy[newKey] = {
        productId: line.productId, karat, qty: (copy[newKey]?.qty ?? 0) + line.qty,
        addFilter: copy[newKey]?.addFilter ?? line.addFilter,
      };
      return copy;
    });

    setOrder((prev) => {
      if (mergingIntoExisting) {
        // The target line already has its own spot in the order - just drop this one.
        return prev.filter((k) => k !== key);
      }
      // No existing line at the target karat: relabel this slot in place, so
      // the row doesn't jump to the end of the list.
      return prev.map((k) => (k === key ? newKey : k));
    });
  }

  function setAddFilter(key: string, addFilter: boolean) {
    setItems((prev) => {
      const line = prev[key];
      if (!line) return prev;
      return { ...prev, [key]: { ...line, addFilter } };
    });
  }

  function clear() {
    setItems({});
    setOrder([]);
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
    items, order, itemCount, totalWeight, totalPrice, linePrice,
    add, addQty, remove, changeQty, setQty, setKarat, setAddFilter, clear,
  };
}
