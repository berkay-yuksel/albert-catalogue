import type { Product } from "@/lib/types";
import { CAT_LABELS } from "@/data/facets";
import { fmtPrice } from "@/data/products";

const ORDER_EMAIL = "info@albertexport.com";

function itemLines(items: Record<number, number>, products: Product[]): string {
  return Object.keys(items)
    .map((idStr) => {
      const id = Number(idStr);
      const p = products.find((x) => x.id === id);
      if (!p) return "";
      const qty = items[id];
      const priceLabel = p.price > 0 ? fmtPrice(p.price * qty) : "price on request";
      const codeLabel = p.sku ? ` [${p.sku}]` : "";
      return `- ${p.name}${codeLabel} (${CAT_LABELS[p.category]}) x${qty}: ${priceLabel}`;
    })
    .filter(Boolean)
    .join("\n");
}

function totals(items: Record<number, number>, products: Product[]) {
  const itemCount = Object.values(items).reduce((sum, qty) => sum + qty, 0);
  const totalPrice = Object.entries(items).reduce((sum, [id, qty]) => {
    const p = products.find((x) => x.id === Number(id));
    return sum + (p ? p.price * qty : 0);
  }, 0);
  return { itemCount, totalPrice };
}

export interface OrderExtras {
  /** Free-text message/instructions the buyer typed in the order panel. */
  notes?: string;
}

function extrasLines(extras?: OrderExtras): string[] {
  const lines: string[] = [];
  if (extras?.notes?.trim()) {
    lines.push("", "Message:", extras.notes.trim());
  }
  return lines;
}

/** Plain-text order summary, used for the "Copy Order" clipboard action. */
export function buildOrderText(items: Record<number, number>, products: Product[], extras?: OrderExtras): string {
  const { itemCount, totalPrice } = totals(items, products);
  const lines = itemLines(items, products);
  const isFreeOrder = itemCount > 0 && totalPrice === 0;
  return [
    `Wholesale Order Request – ${itemCount} item(s)`,
    "",
    lines,
    "",
    `Total: ${isFreeOrder ? "Contact for Pricing" : fmtPrice(totalPrice)}`,
    ...(isFreeOrder ? ["", "Note: these items don't have a listed price. Please contact us directly for a quote."] : []),
    ...extrasLines(extras),
    "",
    "Delivery Country:",
    "Preferred Karat/Color (if different per item):",
  ].join("\n");
}

/** mailto: link version, same content, URL-encoded with a subject line. */
export function buildOrderMailto(items: Record<number, number>, products: Product[], extras?: OrderExtras): string {
  const { itemCount, totalPrice } = totals(items, products);
  const lines = itemLines(items, products);
  const isFreeOrder = itemCount > 0 && totalPrice === 0;
  const totalLine = isFreeOrder
    ? "Total: Contact for Pricing (these items don't have a listed price)"
    : `Total: ${fmtPrice(totalPrice)}`;

  const subject = encodeURIComponent(`Wholesale Order Request – ${itemCount} item(s)`);
  const bodyLines = [
    "Hello,",
    "",
    "I would like to place a wholesale order for the following items:",
    "",
    lines,
    "",
    totalLine,
    ...extrasLines(extras),
    "",
    "Delivery Country:",
    "Preferred Karat/Color (if different per item):",
    "",
    "Thank you.",
  ];
  const body = encodeURIComponent(bodyLines.join("\n"));

  return `mailto:${ORDER_EMAIL}?subject=${subject}&body=${body}`;
}
