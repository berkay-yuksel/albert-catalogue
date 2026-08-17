import type { Product } from "@/lib/types";
import { CAT_LABELS } from "@/data/facets";

const ORDER_EMAIL = "info@albertexport.com";

export function buildOrderMailto(items: Record<number, number>, products: Product[]): string {
  const ids = Object.keys(items);
  const itemCount = Object.values(items).reduce((sum, qty) => sum + qty, 0);

  const lines = ids
    .map((idStr) => {
      const id = Number(idStr);
      const p = products.find((x) => x.id === id);
      return p ? `- ${p.name} (${CAT_LABELS[p.category]}) x${items[id]}` : "";
    })
    .filter(Boolean)
    .join("\n");

  const subject = encodeURIComponent(`Wholesale Order Request – ${itemCount} item(s)`);
  const body = encodeURIComponent(
    `Hello,\n\nI would like to place a wholesale order for the following items:\n\n${lines}\n\nDelivery Country:\nPreferred Karat/Color (if different per item):\n\nThank you.`
  );

  return `mailto:${ORDER_EMAIL}?subject=${subject}&body=${body}`;
}
