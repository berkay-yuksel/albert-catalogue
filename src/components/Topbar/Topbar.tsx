import styles from './Topbar.module.css';

export default function Topbar() {
  return (
    <div className={styles.topbar}>
      <div className={styles.brand}>
        <div className={styles.brandMark}></div>
        <div>
          <h1>Albert Export</h1>
          <span>B2B Wholesale Catalog · Chains · Jewelry · Pipes</span>
        </div>
      </div>
      
      <button className={styles.filterDrawerBtn} id="drawerBtn">
        ☰ Filters
      </button>
      
      <div className={styles.searchWrap}>
        <span className={styles.searchIcon}>🔍</span>
        <input 
          type="text" 
          placeholder="Search product name (e.g. Forzentina, Curb, Meerschaum)" 
        />
      </div>
      
      <div className={styles.topbarControls}>
        <select className={styles.sortSelect} defaultValue="name-asc">
          <option value="name-asc">Name (A–Z)</option>
          <option value="name-desc">Name (Z–A)</option>
          <option value="karat-desc">Karat (High → Low)</option>
          <option value="karat-asc">Karat (Low → High)</option>
          <option value="width-asc">Thickness (Low → High)</option>
          <option value="width-desc">Thickness (High → Low)</option>
          <option value="weight-asc">Weight (Low → High)</option>
          <option value="weight-desc">Weight (High → Low)</option>
          <option value="stock-asc">Stock Status</option>
          <option value="price-asc">Price (Low → High)</option>
          <option value="price-desc">Price (High → Low)</option>
        </select>
        
        <div className={styles.viewToggle}>
          <button className={styles.active}>▦ Grid</button>
          <button>☰ List</button>
        </div>
      </div>
    </div>
  );
}