export interface Product {
  id: number;
  category: string;
  name: string;
  images?: string[];
  karat: string;
  color: string;
  mfg: string;
  finish?: string;
  clasp?: string;
  stone?: string;
  width: number;
  length: number;
  weight: number;
  stock: string;
  price?: number;
  setting?: string;
  size?: string;
  k8type?: string;
  market?: string;
  material?: string;
  shape?: string;
  filter?: string;
  bowl?: string;
  stem?: string;
  
}

export const KARATS = ['8K (333)', '10K', '14K', '18K', '22K', '24K'];
export const KARAT_RANK: Record<string, number> = { '8K (333)': 8, '10K': 10, '14K': 14, '18K': 18, '22K': 22, '24K': 24 };
export const COLORS = ['Yellow Gold', 'White Gold', 'Rose Gold', 'Bicolor', 'Tricolor'];
export const CHAIN_MFG = ['Hollow', 'Solid', 'Stamped'];
export const CHAIN_FINISH = ['Polished', 'Diamond-Cut', 'Satin/Matte', 'Textured', 'Brill'];
export const CLASPS = ['Lobster Claw', 'Spring Ring', 'Box Clasp with Safety'];
export const STOCK = ['In Stock', 'Made to Order'];

const CHAIN_STYLES = [
  'D/C Forzentina', 'Hollow Forzentina Brill', 'Canal-Cut Forzentina', 'Square Forzentina',
  'Snake Forzentina', 'D/C Cable', 'D/C Square Cable', 'D/C Box Chain',
  'Paperclip', 'D/C Hollow Paperclip', 'Paperclip Brill', 'Press Paperclip',
  'D/C Singapore', 'Sogliola Singapore', 'D/C Square Singapore', 'Hollow Sogliola Singapore',
  'D/C Curb', 'Hollow Cuban Curb', 'Hollow Convex Curb', 'Designed Curb',
  'D/C Figaro', 'Flat Figaro', 'Concave Figaro', 'Hollow Light Figaro',
  'Rolo Chain', 'Hollow Oval Rolo Chain', 'D/C Hollow Rolo Chain',
  'Ball Chain', 'Rambo Link Chain Brill', 'Oval Link Chain Brill',
  'Triple Wheat', 'Hollow Palm Chain', 'D/C 8 Sided Triple Wheat',
  'Popcorn Brill', 'Flat Popcorn', 'Mariner Brill', 'Flat Mariner',
  'Hollow Rope', 'Mirror Rope', 'Fox Tail', 'Serpentine',
  'Square Byzantine', 'Euro Byzantine', 'Hollow Square Byzantine', 'Grek Designed Euro Byzantine'
];
const CHAIN_WIDTHS = [0.8, 1.0, 1.2, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 6.0, 7.0, 8.0];
const CHAIN_LENGTHS = [40, 45, 50, 55, 60, 65, 70, 75];

const BRACELET_TYPES = ['Bangle', 'Cuff', 'Chain Bracelet', 'ID / Plaque Bracelet', 'Tennis Bracelet', 'Charm Bracelet'];
const BRACELET_LENGTHS = [16, 17, 18, 19, 20, 21];
const BRACELET_WIDTHS = [1.5, 2, 3, 4, 5, 6, 8];
const BRACELET_MFG = ['Hollow', 'Solid', 'Cast', 'Stamped'];
const STONE_TYPES = ['No Stone', 'Cubic Zirconia', 'Gemstones'];

const RING_TYPES = ['Wedding Band', 'Solitaire', 'Multi-Stone', "Signet / Men's Ring", 'Fashion / Statement Ring', 'Midi Ring'];
const RING_SIZES = ['EU 12 / US 6', 'EU 14 / US 7', 'EU 16 / US 8', 'EU 18 / US 9', 'EU 20 / US 10'];
const RING_SETTINGS = ['Prong', 'Bezel', 'Pave', 'Channel'];
const RING_MFG = ['Cast', 'Stamped', 'Handmade'];
const RING_FINISH = ['Polished', 'Matte', 'Diamond-Cut', 'Textured'];

const NECKLACE_TYPES = ['Pendant Necklace', 'Medallion', 'Letter / Initial', 'Symbol / Figure', 'Choker', 'Statement Necklace'];
const NECKLACE_LENGTHS = [40, 45, 50];
const NECKLACE_MFG = ['Hollow', 'Solid', 'Cast'];

const K8_TYPES = ['Chain', 'Bracelet', 'Ring', 'Necklace', 'Earrings', 'Pendant'];
const K8_MFG = ['Hollow', 'Solid', 'Stamped', 'Cast'];
const K8_MARKETS = ['Middle East', 'Eastern Europe', 'Central Asia', 'Latin America', 'USA'];

const PIPE_MATERIALS = ['Meerschaum', 'Briar Wood', 'Olive Wood', 'Morta (Bog Oak)', 'Corn Cob'];
const PIPE_SHAPES = ['Billiard', 'Bent', 'Apple', 'Dublin', 'Canadian', 'Bulldog', 'Poker'];
const PIPE_FILTER = ['9 mm', '6 mm', 'Non-Filtered'];
const PIPE_BOWL = ['Small', 'Medium', 'Large'];
const PIPE_STEM = ['Acrylic', 'Ebonite', 'Amber', 'Cumberland'];
const PIPE_FINISH = ['Smooth', 'Sandblasted', 'Rusticated'];

function pick(arr: string[] | number[], i: number): any {
  return arr[i % arr.length];
}

export const PRODUCTS: Product[] = [];
let uid = 1;

CHAIN_STYLES.forEach((style, i) => {
  PRODUCTS.push({
    id: uid++, category: 'Chain', name: style,
    karat: pick(KARATS, i), color: pick(COLORS, i + 2), mfg: pick(CHAIN_MFG, i),
    finish: pick(CHAIN_FINISH, i + 1), clasp: pick(CLASPS, i), stone: 'No Stone',
    width: pick(CHAIN_WIDTHS, i + 3), length: pick(CHAIN_LENGTHS, i),
    weight: +(3 + (i * 1.37 % 22)).toFixed(1), stock: pick(STOCK, i % 3 === 0 ? 1 : 0)
  });
});

BRACELET_TYPES.concat(['Beaded Bracelet', 'Gourmette Bracelet']).forEach((t, i) => {
  PRODUCTS.push({
    id: uid++, category: 'Bracelet', name: t + ' Bracelet',
    karat: pick(KARATS, i + 1), color: pick(COLORS, i), mfg: pick(BRACELET_MFG, i),
    finish: pick(CHAIN_FINISH, i + 2), clasp: pick(CLASPS, i + 1), stone: pick(STONE_TYPES, i),
    width: pick(BRACELET_WIDTHS, i + 1), length: pick(BRACELET_LENGTHS, i),
    weight: +(4 + (i * 2.1 % 18)).toFixed(1), stock: pick(STOCK, i % 2)
  });
});

RING_TYPES.concat(['Eternity Band']).forEach((t, i) => {
  PRODUCTS.push({
    id: uid++, category: 'Ring', name: t,
    karat: pick(KARATS, i + 2), color: pick(COLORS, i + 1), mfg: pick(RING_MFG, i),
    finish: pick(RING_FINISH, i), clasp: '—', stone: pick(STONE_TYPES, i + 1),
    setting: pick(RING_SETTINGS, i), size: pick(RING_SIZES, i),
    width: 0, length: 0, weight: +(1.5 + (i * 0.8 % 6)).toFixed(1), stock: pick(STOCK, i % 2)
  });
});

NECKLACE_TYPES.concat(['Layered Necklace']).forEach((t, i) => {
  PRODUCTS.push({
    id: uid++, category: 'Necklace', name: t,
    karat: pick(KARATS, i), color: pick(COLORS, i + 3), mfg: pick(NECKLACE_MFG, i),
    finish: pick(CHAIN_FINISH, i), clasp: pick(CLASPS, i), stone: pick(STONE_TYPES, i + 2),
    width: pick(CHAIN_WIDTHS, i + 2), length: pick(NECKLACE_LENGTHS, i),
    weight: +(2.5 + (i * 1.6 % 14)).toFixed(1), stock: pick(STOCK, i % 3 === 0 ? 1 : 0)
  });
});

K8_TYPES.forEach((t, i) => {
  PRODUCTS.push({
    id: uid++, category: '8K Gold Collection', name: '8K ' + t, k8type: t,
    karat: '8K (333)', color: pick(COLORS, i), mfg: pick(K8_MFG, i),
    finish: pick(CHAIN_FINISH, i + 1), clasp: (t === 'Chain' || t === 'Bracelet') ? pick(CLASPS, i) : '—',
    stone: pick(STONE_TYPES, i), market: pick(K8_MARKETS, i),
    width: pick(CHAIN_WIDTHS, i), length: pick(CHAIN_LENGTHS, i),
    weight: +(3 + (i * 1.9 % 12)).toFixed(1), stock: pick(STOCK, i % 2)
  });
});

const pipeCombos = [
  ['Meerschaum', 'Billiard'], ['Meerschaum', 'Bent'], ['Briar Wood', 'Apple'],
  ['Briar Wood', 'Dublin'], ['Olive Wood', 'Canadian'], ['Morta (Bog Oak)', 'Bulldog'],
  ['Corn Cob', 'Poker'], ['Briar Wood', 'Billiard']
];

pipeCombos.forEach(([mat, shape], i) => {
  PRODUCTS.push({
    id: uid++, category: 'Tobacco Pipe', name: mat + ' ' + shape + ' Pipe',
    material: mat, shape: shape, filter: pick(PIPE_FILTER, i), bowl: pick(PIPE_BOWL, i),
    stem: pick(PIPE_STEM, i), finish: pick(PIPE_FINISH, i),
    karat: '—', color: '—', mfg: '—', clasp: '—', stone: '—',
    width: 0, length: 0, weight: +(30 + (i * 11 % 40)).toFixed(0), stock: pick(STOCK, i % 2)
  });
});

const KARAT_PURITY: Record<string, number> = { '8K (333)': 0.333, '10K': 0.417, '14K': 0.585, '18K': 0.75, '22K': 0.916, '24K': 0.999 };
const GOLD_PRICE_PER_GRAM = 85; 

function computePrice(p: Product) {
  if (p.category === 'Tobacco Pipe') {
    return Math.round(35 + p.weight * 0.9);
  }
  const purity = KARAT_PURITY[p.karat] || 0.75;
  const raw = p.weight * purity * GOLD_PRICE_PER_GRAM * 1.18; 
  return Math.max(15, Math.round(raw));
}

PRODUCTS.forEach(p => { p.price = computePrice(p); });

export const CATEGORIES = ['Chain', 'Bracelet', 'Ring', 'Necklace', '8K Gold Collection', 'Tobacco Pipe'];
export const CAT_LABELS: Record<string, string> = {
  'Chain': 'Chains', 'Bracelet': 'Bracelets', 'Ring': 'Rings', 'Necklace': 'Necklaces',
  '8K Gold Collection': '8K Collection', 'Tobacco Pipe': 'Tobacco Pipes'
};