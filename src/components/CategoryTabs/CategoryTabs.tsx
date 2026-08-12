import styles from './CategoryTabs.module.css';
import { CATEGORIES, CAT_LABELS, PRODUCTS } from '@/lib/data';

export default function CategoryTabs() {
  // Şimdilik URL veya State yönetimi kurmadığımız için 'All' sekmesini aktif varsayıyoruz
  const activeCategory = ''; 

  const getCount = (catName: string) => {
    return PRODUCTS.filter(p => p.category === catName).length;
  };

  return (
    <nav className={styles.catTabs}>
      <button className={`${styles.catTab} ${!activeCategory ? styles.active : ''}`}>
        <span>All</span>
        <span className={styles.n}>{PRODUCTS.length}</span>
      </button>
      
      {CATEGORIES.map(cat => (
        <button 
          key={cat} 
          className={`${styles.catTab} ${activeCategory === cat ? styles.active : ''}`}
        >
          <span>{CAT_LABELS[cat]}</span>
          <span className={styles.n}>{getCount(cat)}</span>
        </button>
      ))}
    </nav>
  );
}