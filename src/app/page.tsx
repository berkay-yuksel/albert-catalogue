import { PRODUCTS } from "@/data/products";
import { CatalogClient } from "@/components/CatalogClient";

export default function Home() {
  return <CatalogClient products={PRODUCTS} />;
}
