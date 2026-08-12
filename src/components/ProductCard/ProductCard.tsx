import styles from "./ProductCard.module.css";
import { Product, CAT_LABELS } from "@/lib/data";


interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const stockClass =
    product.stock === "In Stock" ? styles.instock : styles.order;
 const formattedPrice = `$${product.price?.toLocaleString("en-US")}`;

  const specTags = [];
  if (product.karat && product.karat !== "—") specTags.push(product.karat);
  if (product.color && product.color !== "—") specTags.push(product.color);
  if (product.width) specTags.push(`${product.width}mm`);
  if (product.length) specTags.push(`${product.length}cm`);
  if (product.size) specTags.push(product.size);
  if (product.material) specTags.push(product.material);

  return (
    <div className={styles.card}>
      <div className={styles.cardMedia}>
        <span className={`${styles.stockBadge} ${stockClass}`}>
          {product.stock === "In Stock" ? "In Stock" : "Made to Order"}
        </span>
        <button className={styles.cardAddBtn} title="Add to order">
          +
        </button>

        {/* SVG yerine gerçek resim */}
        <img
          src={product.images?.[0] || "/images/placeholder.jpg"}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardCat}>{CAT_LABELS[product.category]}</div>
        <div className={styles.cardName}>{product.name}</div>
        <div className={styles.cardPrice}>{formattedPrice}</div>
        <div className={styles.cardSpecs}>
          {specTags.slice(0, 4).map((tag, index) => (
            <span key={index} className={styles.specTag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
