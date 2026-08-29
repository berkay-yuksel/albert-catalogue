import type { CartLine } from "@/lib/useOrderCart";
import type { Product } from "@/lib/types";
import { CAT_LABELS } from "@/data/facets";
import { fmtPrice } from "@/data/products";

const ORDER_EMAIL = "info@albertexport.com";

type LinePriceFn = (product: Product, line: CartLine) => number;

function itemLines(items: Record<string, CartLine>, products: Product[], linePrice: LinePriceFn): string {
  return Object.values(items)
    .map((line) => {
      const p = products.find((x) => x.id === line.productId);
      if (!p) return "";
      const price = linePrice(p, line);
      const priceLabel = price > 0 ? fmtPrice(price * line.qty) : "price on request";
      const codeLabel = p.sku ? ` [${p.sku}]` : "";
      const karatLabel = p.pricesByKarat ? ` @ ${line.karat}` : "";
      return `- ${p.name}${codeLabel} (${CAT_LABELS[p.category]}) x${line.qty}${karatLabel}: ${priceLabel}`;
    })
    .filter(Boolean)
    .join("\n");
}

function totals(items: Record<string, CartLine>, products: Product[], linePrice: LinePriceFn) {
  const itemCount = Object.values(items).reduce((sum, line) => sum + line.qty, 0);
  const totalPrice = Object.values(items).reduce((sum, line) => {
    const p = products.find((x) => x.id === line.productId);
    return sum + (p ? linePrice(p, line) * line.qty : 0);
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
export function buildOrderText(
  items: Record<string, CartLine>,
  products: Product[],
  linePrice: LinePriceFn,
  extras?: OrderExtras
): string {
  const { itemCount, totalPrice } = totals(items, products, linePrice);
  const lines = itemLines(items, products, linePrice);
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
  ].join("\n");
}

/** mailto: link version, same content, URL-encoded with a subject line. */
export function buildOrderMailto(
  items: Record<string, CartLine>,
  products: Product[],
  linePrice: LinePriceFn,
  extras?: OrderExtras
): string {
  const { itemCount, totalPrice } = totals(items, products, linePrice);
  const lines = itemLines(items, products, linePrice);
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
    "",
    "Thank you.",
  ];
  const body = encodeURIComponent(bodyLines.join("\n"));

  return `mailto:${ORDER_EMAIL}?subject=${subject}&body=${body}`;
}
