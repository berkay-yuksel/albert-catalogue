"use client";

import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/types";
import { CAT_LABELS, FINE_JEWELRY_CATEGORY } from "@/data/facets";
import { fmtPrice } from "@/data/products";
import { buildOrderMailto, buildOrderText } from "@/lib/mailto";
import type { OrderCartApi } from "@/lib/useOrderCart";

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
  // an effect, see https://react.dev/learn/you-might-not-need-an-effect
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
  const [notes, setNotes] = useState("");
  const [mailtoWarning, setMailtoWarning] = useState(false);
  const ids = Object.keys(cart.items);
  const totalWeight = cart.totalWeight(products);
  const totalPrice = cart.totalPrice(products);
  const isFreeOrder = ids.length > 0 && totalPrice === 0;
  const hasFineJewelryItem = ids.some((idStr) => {
    const p = products.find((x) => x.id === Number(idStr));
    return p?.category === FINE_JEWELRY_CATEGORY;
  });

  function clearAll() {
    cart.clear();
    setNotes("");
    setMailtoWarning(false);
  }

  // Most mail clients (Outlook desktop especially) silently truncate mailto:
  // links beyond ~2000 characters, and since our message is appended near
  // the end, it's the first thing to get cut off on large orders. Warn and
  // steer toward "Copy Order" (no length limit) instead of silently sending
  // an incomplete email.
  const MAILTO_SAFE_LENGTH = 1800;

  function sendOrder() {
    if (ids.length === 0) return;
    const mailto = buildOrderMailto(cart.items, products, { notes });
    if (mailto.length > MAILTO_SAFE_LENGTH) {
      setMailtoWarning(true);
      return;
    }
    setMailtoWarning(false);
    window.location.href = mailto;
  }

  async function copyOrder() {
    if (ids.length === 0) return;
    const text = buildOrderText(cart.items, products, { notes });
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setMailtoWarning(false);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable/denied, fail silently, the person can still use "Send Order Request".
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
        {/* Deliberately OUTSIDE the scrollable .order-items list, always
            visible near the bottom instead of requiring a scroll past the
            item rows to find it. */}
        {ids.length > 0 && (
          <div className="order-extras">
            <label className="order-extras-label" htmlFor="order-notes">
              Message / Special Instructions
            </label>
            <textarea
              id="order-notes"
              className="order-notes-input"
              placeholder="e.g. preferred karat, delivery timeline, custom requests..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        )}
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
              These items don&apos;t have a listed price. Please contact us directly for a quote.
            </div>
          )}
          {mailtoWarning && (
            <div className="order-contact-notice">
              This order is too large for email to include everything (some mail clients cut off
              long links). Please use <b>Copy Order</b> instead and paste it into your email.
            </div>
          )}
          {hasFineJewelryItem && (
            <div className="order-contact-notice">
              If you have reference images for these, please attach them manually to your email.
            </div>
          )}
          <div className="order-panel-actions">
            <button className="btn-secondary" onClick={clearAll}>
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
