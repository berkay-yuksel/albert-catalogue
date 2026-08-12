import CategoryTabs from '@/components/CategoryTabs/CategoryTabs';
import ProductCard from '@/components/ProductCard/ProductCard';
import styles from './page.module.css';
import { PRODUCTS } from '@/lib/data';

export default function Home() {
  return (
    <>
      <CategoryTabs />
      
      <div className={styles.layout}>
        <aside className={styles.sidebarPlaceholder}>
          Filtreler Gelecek
        </aside>

        <main className={styles.main}>
          <div className={styles.gridView}>
            {PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}