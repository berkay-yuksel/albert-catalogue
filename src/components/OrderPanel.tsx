"use client";

import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/types";
import { CAT_LABELS } from "@/data/facets";
import { fmtPrice } from "@/data/products";
import { buildOrderMailto, buildOrderText } from "@/lib/mailto";
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

function OrderItemRow({
  id,
  qty,
  product,
  onChangeQty,
  onSetQty,
  onRemove,
}: {
  id: number;
  qty: number;
  product: Product | undefined;
  onChangeQty: (id: number, delta: number) => void;
  onSetQty: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
}) {
  // Local text state so the input doesn't snap back to the old value while
  // the person is still typing a multi-digit quantity. Follows external qty
  // changes (e.g. the +/- buttons) by adjusting during render rather than in
  // an effect — see https://react.dev/learn/you-might-not-need-an-effect
  const [prevQty, setPrevQty] = useState(qty);
  const [text, setText] = useState(String(qty));
  if (qty !== prevQty) {
    setPrevQty(qty);
    setText(String(qty));
  }

  function commit() {
    const parsed = parseInt(text, 10);
    const clamped = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
    setText(String(clamped));
    if (clamped !== qty) onSetQty(id, clamped);
  }

  return (
    <div className="order-item">
      <div className="order-item-swatch">{product && <ProductImage product={product} variant={1} />}</div>
      <div className="order-item-info">
        <div className="order-item-name">{product ? product.name : "Unknown item"}</div>
        <div className="order-item-cat">
          {product ? CAT_LABELS[product.category] : ""}
          {product?.sku && <span className="order-item-sku"> · {product.sku}</span>}
        </div>
        {product && (
          <div className="order-item-price">
            {product.price > 0 ? (
              <>
                {fmtPrice(product.price)} × {qty} = <b>{fmtPrice(product.price * qty)}</b>
              </>
            ) : (
              <span className="price-on-request">Price on request</span>
            )}
          </div>
        )}
        <div className="order-item-qty">
          <button onClick={() => onChangeQty(id, -1)} aria-label="Decrease quantity">
            −
          </button>
          <input
            type="number"
            min={1}
            className="order-qty-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") (e.target as HTMLInputElement).blur();
            }}
            aria-label="Quantity"
          />
          <button onClick={() => onChangeQty(id, 1)} aria-label="Increase quantity">
            +
          </button>
        </div>
      </div>
      <button className="order-item-remove" onClick={() => onRemove(id)} aria-label="Remove">
        ✕
      </button>
    </div>
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
  const [copied, setCopied] = useState(false);
  const ids = Object.keys(cart.items);
  const totalWeight = cart.totalWeight(products);
  const totalPrice = cart.totalPrice(products);
  const isFreeOrder = ids.length > 0 && totalPrice === 0;

  function sendOrder() {
    if (ids.length === 0) return;
    window.location.href = buildOrderMailto(cart.items, products);
  }

  async function copyOrder() {
    if (ids.length === 0) return;
    const text = buildOrderText(cart.items, products);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable/denied — fail silently, the person can still use "Send Order Request".
    }
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
              return (
                <OrderItemRow
                  key={id}
                  id={id}
                  qty={cart.items[id]}
                  product={p}
                  onChangeQty={cart.changeQty}
                  onSetQty={cart.setQty}
                  onRemove={cart.remove}
                />
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
          <div className="order-summary">
            <span>Total Price</span>
            <b>{isFreeOrder ? "Contact for Pricing" : fmtPrice(totalPrice)}</b>
          </div>
          {isFreeOrder && (
            <div className="order-contact-notice">
              These items don&apos;t have a listed price — please contact us directly for a quote.
            </div>
          )}
          <div className="order-panel-actions">
            <button className="btn-secondary" onClick={cart.clear}>
              Clear
            </button>
            <button className="btn-secondary" onClick={copyOrder}>
              {copied ? "Copied ✓" : "Copy Order"}
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
