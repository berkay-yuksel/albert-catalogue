https://albert-catalogue.vercel.app/

# Albert Catalog — Next.js Dönüşümü

## Şu ana kadar tamamlanan: Adım 1 — Proje iskeleti + Veri Katmanı

- `lib/types.ts` — Product, FacetConfig vb. tip tanımları
- `lib/constants.ts` — orijinal HTML'deki tüm sabit diziler (KARATS, COLORS, CHAIN_STYLES...)
- `lib/products.ts` — ürün üretim mantığı, fiyat hesaplama, kategori bazlı facet config'leri

Bu üç dosya, orijinal `<script>` içindeki DATA / PRICING / PER-CATEGORY FILTER CONFIG
bölümlerinin birebir TypeScript karşılığıdır. Mantıkta hiçbir değişiklik yapılmadı,
sadece `var`/`const` global'ler modül exportlarına dönüştürüldü.

## Sıradaki adımlar

**Adım 2 — UI Component'leri**
- `components/TopBar.tsx`, `CategoryTabs.tsx`, `Sidebar.tsx` (facet UI)
- `components/ProductGrid.tsx`, `ProductCard.tsx`, `ProductListTable.tsx`
- `components/ProductModal.tsx`, `OrderPanel.tsx`
- `lib/svg.ts` — swatchSVG üretim fonksiyonu (React'e uyarlanmış hali)

**Adım 3 — Stil taşıma**
- Mevcut `<style>` bloğu → `app/globals.css` (class isimleri korunacak, sıfır CSS yeniden yazımı)

**Adım 4 — Client state**
- search / filtre / sıralama / grid-list toggle → React Context + useState/useReducer
- Sipariş sepeti → Context, sayfa yenilendiğinde kaybolmaması için opsiyonel olarak
  Next.js'te cookie/DB tabanlı kalıcılık (localStorage artifact'larda çalışmıyor
  ama gerçek bir Next.js projesinde sorun değil)

**Adım 5 — Database bağlama**
- Prisma + PostgreSQL (veya geliştirme için SQLite) kurulumu
- `Product` tablosu, mevcut `PRODUCTS` dizisi seed script'i ile DB'ye yüklenir
- `lib/products.ts`'teki statik array yerine `app/page.tsx` içinde
  `await prisma.product.findMany()` server component sorgusu
- Sipariş listesi de DB'ye taşınabilir (Order / OrderItem tabloları) —
  şu anki mailto ile gönderim yerine gerçek bir sipariş kaydı oluşturulur

## Kurulum (bu iskeleti indirdikten sonra)

```bash
npm install
npm run dev
```

Şu an sadece veri katmanı olduğu için `app/page.tsx` henüz yok — Adım 2'de eklenecek.