"use client";

import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/types";
import { CAT_LABELS } from "@/data/facets";
import { buildOrderMailto } from "@/lib/mailto";
import type { OrderCartApi } from "@/lib/useOrderCart";
import { ProductImage } from "./ProductImage";

export function OrderFab({
  cart,
  onOpen,
  pulseTrigger,
}: {
  cart: OrderCartApi;
  onOpen: () => void;
  /** Bump this number (e.g. an incrementing counter) each time an item is added, to replay the pulse animation. */
  pulseTrigger: number;
}) {
  const [pulsing, setPulsing] = useState(false);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    setPulsing(true);
    const t = setTimeout(() => setPulsing(false), 500);
    return () => clearTimeout(t);
  }, [pulseTrigger]);

  return (
    <button className={`order-fab ${pulsing ? "pulse" : ""}`} onClick={onOpen}>
      Order List <span className="order-badge">{cart.itemCount}</span>
    </button>
  );
}

export function OrderPanel({
  cart,
  products,
  open,
  onClose,
}: {
  cart: OrderCartApi;
  products: Product[];
  open: boolean;
  onClose: () => void;
}) {
  const ids = Object.keys(cart.items);
  const totalWeight = cart.totalWeight(products);

  function sendOrder() {
    if (ids.length === 0) return;
    window.location.href = buildOrderMailto(cart.items, products);
  }

  return (
    <>
      <div className={`order-panel-overlay ${open ? "open" : ""}`} onClick={onClose} />
      <aside className={`order-panel ${open ? "open" : ""}`}>
        <div className="order-panel-head">
          <div>
            <h3>Order List</h3>
            <span>Items you plan to order</span>
          </div>
          <button className="order-panel-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="order-items">
          {ids.length === 0 ? (
            <div className="order-empty">
              Your order list is empty.
              <br />
              Click &quot;Order&quot; on any product to add it here.
            </div>
          ) : (
            ids.map((idStr) => {
              const id = Number(idStr);
              const p = products.find((x) => x.id === id);
              const qty = cart.items[id];
              return (
                <div className="order-item" key={id}>
                  <div className="order-item-swatch">{p && <ProductImage product={p} variant={1} />}</div>
                  <div className="order-item-info">
                    <div className="order-item-name">{p ? p.name : "Unknown item"}</div>
                    <div className="order-item-cat">{p ? CAT_LABELS[p.category] : ""}</div>
                    <div className="order-item-qty">
                      <button onClick={() => cart.changeQty(id, -1)}>−</button>
                      <span>{qty}</span>
                      <button onClick={() => cart.changeQty(id, 1)}>+</button>
                    </div>
                  </div>
                  <button className="order-item-remove" onClick={() => cart.remove(id)} aria-label="Remove">
                    ✕
                  </button>
                </div>
              );
            })
          )}
        </div>
        <div className="order-panel-foot">
          <div className="order-summary">
            <span>Items</span>
            <b>{cart.itemCount}</b>
          </div>
          <div className="order-summary">
            <span>Total Weight</span>
            <b>{totalWeight.toFixed(1)} g</b>
          </div>
          <div className="order-panel-actions">
            <button className="btn-secondary" onClick={cart.clear}>
              Clear
            </button>
            <button className="btn-primary" onClick={sendOrder}>
              Send Order Request
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
