/* ============================================================
   FINE JEWELRY PRODUCT TAXONOMY
   Sourced from the client-provided product list spreadsheet
   ("Tüm Ürünler.xlsx", sheet "ABD TÜm Lİste (eng)"). Each entry is a
   distinct jewelry product type sold under the Fine Jewelry tab —
   used to generate one demo Product per row in data/products.ts.

   Two-level category structure:
   - subCategory: the sheet's original, specific category (51 values,
     e.g. "Men's Bracelets", "Diamond Jewelry Sets").
   - category (parent): a broader grouping of those 51 values into 13
     buckets (e.g. "Bracelets", "Diamonds & Gemstones") so the filter
     sidebar isn't overwhelming. See SUB_CATEGORY_TO_PARENT below.

   popularity is the star rating from the sheet's "ABD" (US market
   demand) column, counted 1–5.
   ============================================================ */

export interface FineJewelryItem {
  subCategory: string;
  name: string;
  description: string;
  difficulty: string;
  /** US market demand rating, 1–5 (from the source sheet's star rating). */
  popularity: number;
}

export const FINE_JEWELRY_ITEMS: FineJewelryItem[] = [
  { subCategory: "Bracelets", name: "Bangles / Cuff Bracelets", description: "Rigid or semi-rigid gold bracelets", difficulty: "Moderate", popularity: 5 },
  { subCategory: "Bracelets", name: "Cuff Bracelets", description: "Wide, bold cuff bracelets", difficulty: "Moderate", popularity: 5 },
  { subCategory: "Bracelets", name: "Chain Bracelets", description: "Gold chain bracelets in various link styles", difficulty: "Easy", popularity: 5 },
  { subCategory: "Bracelets", name: "Gourmet Bracelets", description: "Modern gourmet-link bracelets", difficulty: "Easy", popularity: 5 },
  { subCategory: "Bracelets", name: "Fusion Gourmet Bracelets", description: "Gourmet bracelets combining multiple techniques", difficulty: "Moderately Difficult", popularity: 5 },
  { subCategory: "Bracelets", name: "Tennis Bracelets", description: "Bracelets featuring a continuous row of gemstones", difficulty: "Difficult", popularity: 5 },
  { subCategory: "Necklaces", name: "Chain Necklaces", description: "Gold chain necklaces for everyday wear", difficulty: "Easy", popularity: 5 },
  { subCategory: "Necklaces", name: "Gourmet Chain Necklaces", description: "Bold gourmet-link necklaces", difficulty: "Easy", popularity: 5 },
  { subCategory: "Necklaces", name: "Fusion Gourmet Necklaces", description: "Modern fusion gourmet necklaces", difficulty: "Moderately Difficult", popularity: 5 },
  { subCategory: "Necklaces", name: "Pendant Necklaces", description: "Necklaces featuring decorative pendants", difficulty: "Easy", popularity: 5 },
  { subCategory: "Necklaces", name: "Charm Necklaces", description: "Personalized charm necklaces", difficulty: "Easy", popularity: 5 },
  { subCategory: "Necklaces", name: "Layered Necklaces", description: "Layered necklaces designed for stacking", difficulty: "Easy", popularity: 5 },
  { subCategory: "Necklaces", name: "Tennis Necklaces", description: "Necklaces featuring a continuous row of gemstones", difficulty: "Difficult", popularity: 5 },
  { subCategory: "Earrings", name: "Earrings", description: "Earrings for everyday and special occasions", difficulty: "Easy", popularity: 5 },
  { subCategory: "Earrings", name: "Hoop Earrings", description: "Classic and modern hoop earrings", difficulty: "Easy", popularity: 5 },
  { subCategory: "Earrings", name: "Huggie Earrings", description: "Small earrings designed to hug the ear", difficulty: "Easy", popularity: 5 },
  { subCategory: "Earrings", name: "Stud Earrings", description: "Simple gemstone stud earrings", difficulty: "Easy", popularity: 5 },
  { subCategory: "Earrings", name: "Drop Earrings", description: "Decorative drop earrings", difficulty: "Moderate", popularity: 5 },
  { subCategory: "Earrings", name: "Dangle Earrings", description: "Long, freely moving dangle earrings", difficulty: "Moderate", popularity: 4 },
  { subCategory: "Earrings", name: "Fusion Earrings", description: "Earrings combining multiple techniques", difficulty: "Moderately Difficult", popularity: 5 },
  { subCategory: "Diamond", name: "Diamond Earrings", description: "Diamond earrings", difficulty: "Difficult", popularity: 5 },
  { subCategory: "Gemstones", name: "Gemstone Earrings", description: "Earrings featuring natural gemstones", difficulty: "Difficult", popularity: 4 },
  { subCategory: "Rings", name: "Rings", description: "Gold rings for everyday and special wear", difficulty: "Easy", popularity: 5 },
  { subCategory: "Rings", name: "Fusion Rings", description: "Rings combining multiple techniques", difficulty: "Moderately Difficult", popularity: 5 },
  { subCategory: "Rings", name: "Stackable Rings", description: "Stackable rings designed to be worn together", difficulty: "Easy", popularity: 5 },
  { subCategory: "Rings", name: "Statement Rings", description: "Bold statement rings", difficulty: "Moderate", popularity: 4 },
  { subCategory: "Rings", name: "Fashion Rings", description: "Fashion-forward everyday rings", difficulty: "Easy", popularity: 4 },
  { subCategory: "Rings", name: "Signet Rings", description: "Classic customizable signet rings", difficulty: "Moderate", popularity: 5 },
  { subCategory: "Rings", name: "Solitaire Rings", description: "Solitaire rings with a single center stone", difficulty: "Difficult", popularity: 5 },
  { subCategory: "Rings", name: "Halo Rings", description: "Rings with stones surrounding a center stone", difficulty: "Difficult", popularity: 5 },
  { subCategory: "Rings", name: "Toi et Moi Rings", description: "Rings featuring two prominent stones", difficulty: "Difficult", popularity: 4 },
  { subCategory: "Engagement", name: "Engagement Rings", description: "Rings for engagements and proposals", difficulty: "Difficult", popularity: 5 },
  { subCategory: "Wedding", name: "Wedding Bands", description: "Wedding bands", difficulty: "Easy", popularity: 5 },
  { subCategory: "Rings", name: "Baguette Rings", description: "Baguette-cut gemstone rings", difficulty: "Difficult", popularity: 5 },
  { subCategory: "Rings", name: "Three-Stone Rings", description: "Three-stone rings", difficulty: "Difficult", popularity: 4 },
  { subCategory: "Rings", name: "Eternity Rings", description: "Eternity rings with stones around the band", difficulty: "Difficult", popularity: 4 },
  { subCategory: "Rings", name: "Cocktail Rings", description: "Bold gemstone cocktail rings", difficulty: "Difficult", popularity: 4 },
  { subCategory: "Baguette", name: "Baguette Jewelry", description: "Jewelry featuring baguette-cut stones", difficulty: "Difficult", popularity: 5 },
  { subCategory: "Personalized Jewelry", name: "Initial / Letter Jewelry", description: "Personalized initial and letter jewelry", difficulty: "Easy", popularity: 5 },
  { subCategory: "Personalized Jewelry", name: "Initial Necklaces", description: "Personalized initial necklaces", difficulty: "Easy", popularity: 5 },
  { subCategory: "Personalized Jewelry", name: "Initial Pendants", description: "Letter-shaped pendants", difficulty: "Easy", popularity: 5 },
  { subCategory: "Personalized Jewelry", name: "Initial Bracelets", description: "Personalized initial bracelets", difficulty: "Easy", popularity: 5 },
  { subCategory: "Personalized Jewelry", name: "Personalized Jewelry", description: "Jewelry personalized with names, dates or initials", difficulty: "Moderately Difficult", popularity: 5 },
  { subCategory: "Charm Jewelry", name: "Charm Jewelry", description: "Charm jewelry with symbols and figures", difficulty: "Easy", popularity: 5 },
  { subCategory: "Gemstones", name: "Natural Gemstone Jewelry", description: "Jewelry featuring natural gemstones", difficulty: "Difficult", popularity: 5 },
  { subCategory: "Gemstones", name: "Colored Gemstone Jewelry", description: "Jewelry featuring colorful gemstones", difficulty: "Difficult", popularity: 4 },
  { subCategory: "Precious Gemstones", name: "Precious Gemstone Jewelry", description: "Fine jewelry featuring precious gemstones", difficulty: "Very Difficult", popularity: 4 },
  { subCategory: "Semi-Precious Gemstones", name: "Semi-Precious Gemstone Jewelry", description: "Jewelry featuring semi-precious gemstones", difficulty: "Moderate", popularity: 4 },
  { subCategory: "Gemstones", name: "Natural Sapphire Jewelry", description: "Jewelry featuring natural sapphires", difficulty: "Very Difficult", popularity: 4 },
  { subCategory: "Gemstones", name: "Natural Ruby Jewelry", description: "Jewelry featuring natural rubies", difficulty: "Very Difficult", popularity: 4 },
  { subCategory: "Gemstones", name: "Natural Emerald Jewelry", description: "Jewelry featuring natural emeralds", difficulty: "Very Difficult", popularity: 4 },
  { subCategory: "Gemstones", name: "Natural Tourmaline Jewelry", description: "Jewelry featuring natural tourmaline", difficulty: "Difficult", popularity: 4 },
  { subCategory: "Gemstones", name: "Natural Aquamarine Jewelry", description: "Jewelry featuring natural aquamarine", difficulty: "Difficult", popularity: 4 },
  { subCategory: "Gemstones", name: "Natural Tanzanite Jewelry", description: "Jewelry featuring natural tanzanite", difficulty: "Very Difficult", popularity: 4 },
  { subCategory: "Gemstones", name: "Natural Opal Jewelry", description: "Jewelry featuring natural opals", difficulty: "Difficult", popularity: 4 },
  { subCategory: "Gemstones", name: "Natural Topaz Jewelry", description: "Jewelry featuring natural topaz", difficulty: "Moderate", popularity: 3 },
  { subCategory: "Gemstones", name: "Natural Amethyst Jewelry", description: "Jewelry featuring natural amethyst", difficulty: "Moderate", popularity: 4 },
  { subCategory: "Gemstones", name: "Natural Garnet Jewelry", description: "Jewelry featuring natural garnet", difficulty: "Moderate", popularity: 3 },
  { subCategory: "Gemstones", name: "Natural Turquoise Jewelry", description: "Jewelry featuring natural turquoise", difficulty: "Moderate", popularity: 4 },
  { subCategory: "Pearls", name: "Natural Pearl Jewelry", description: "Jewelry featuring natural or cultured pearls", difficulty: "Difficult", popularity: 5 },
  { subCategory: "Birthstone", name: "Birthstone Jewelry", description: "Personalized birthstone jewelry", difficulty: "Moderate", popularity: 5 },
  { subCategory: "Birthstone", name: "Birthstone Rings", description: "Birthstone rings", difficulty: "Moderate", popularity: 5 },
  { subCategory: "Birthstone", name: "Birthstone Necklaces", description: "Birthstone necklaces", difficulty: "Moderate", popularity: 5 },
  { subCategory: "Birthstone", name: "Birthstone Earrings", description: "Birthstone earrings", difficulty: "Moderate", popularity: 4 },
  { subCategory: "Diamond", name: "Diamond Jewelry", description: "Fine jewelry featuring diamonds", difficulty: "Difficult", popularity: 5 },
  { subCategory: "Diamond", name: "Natural Diamond Jewelry", description: "Fine jewelry featuring natural diamonds", difficulty: "Very Difficult", popularity: 5 },
  { subCategory: "Diamond", name: "Lab-Grown Diamond Jewelry", description: "Jewelry featuring lab-grown diamonds", difficulty: "Difficult", popularity: 5 },
  { subCategory: "Diamond", name: "Diamond Rings", description: "Diamond rings", difficulty: "Difficult", popularity: 5 },
  { subCategory: "Diamond", name: "Diamond Pendants", description: "Diamond pendants", difficulty: "Difficult", popularity: 5 },
  { subCategory: "Diamond", name: "Diamond Bracelets", description: "Diamond bracelets", difficulty: "Difficult", popularity: 5 },
  { subCategory: "Diamond", name: "Diamond Necklaces", description: "Diamond necklaces", difficulty: "Difficult", popularity: 5 },
  { subCategory: "Diamond", name: "Diamond Hoop Earrings", description: "Diamond hoop earrings", difficulty: "Difficult", popularity: 5 },
  { subCategory: "Diamond", name: "Diamond Stud Earrings", description: "Classic diamond stud earrings", difficulty: "Moderately Difficult", popularity: 5 },
  { subCategory: "Pearls", name: "Pearl Jewelry", description: "Jewelry featuring pearls", difficulty: "Moderate", popularity: 5 },
  { subCategory: "Pearls", name: "Akoya Pearl Jewelry", description: "Jewelry featuring Akoya pearls", difficulty: "Difficult", popularity: 4 },
  { subCategory: "Pearls", name: "South Sea Pearl Jewelry", description: "Jewelry featuring South Sea pearls", difficulty: "Very Difficult", popularity: 4 },
  { subCategory: "Pearls", name: "Tahitian Pearl Jewelry", description: "Jewelry featuring Tahitian pearls", difficulty: "Difficult", popularity: 4 },
  { subCategory: "Pearls", name: "Freshwater Pearl Jewelry", description: "Jewelry featuring freshwater pearls", difficulty: "Moderate", popularity: 4 },
  { subCategory: "Mesh & Woven", name: "Mesh / Woven Jewelry", description: "Woven and mesh-style jewelry", difficulty: "Difficult", popularity: 5 },
  { subCategory: "Mesh & Woven", name: "Woven Gold Bracelets", description: "Woven gold bracelets", difficulty: "Difficult", popularity: 5 },
  { subCategory: "Mesh & Woven", name: "Woven Gold Necklaces", description: "Woven gold necklaces", difficulty: "Difficult", popularity: 5 },
  { subCategory: "Bottega Style", name: "Bottega-Style Jewelry", description: "Bold woven modern jewelry", difficulty: "Difficult", popularity: 5 },
  { subCategory: "Statement Jewelry", name: "Chunky Gold Jewelry", description: "Bold chunky gold jewelry", difficulty: "Moderate", popularity: 5 },
  { subCategory: "Designer Jewelry", name: "Sculptural Gold Jewelry", description: "Sculptural, organic and architectural jewelry", difficulty: "Very Difficult", popularity: 4 },
  { subCategory: "Stone Setting", name: "Bezel-Set Jewelry", description: "Jewelry featuring bezel-set gemstones", difficulty: "Difficult", popularity: 5 },
  { subCategory: "Vintage Jewelry", name: "Vintage-Inspired Jewelry", description: "Jewelry inspired by vintage styles", difficulty: "Difficult", popularity: 4 },
  { subCategory: "Antique-Inspired Jewelry", name: "Antique-Inspired Jewelry", description: "Jewelry inspired by antique designs", difficulty: "Difficult", popularity: 4 },
  { subCategory: "Designer Jewelry", name: "Asymmetrical Jewelry", description: "Modern asymmetrical jewelry", difficulty: "Difficult", popularity: 4 },
  { subCategory: "Layering Jewelry", name: "Layering Jewelry", description: "Jewelry designed for layering and stacking", difficulty: "Easy", popularity: 5 },
  { subCategory: "Men's Jewelry", name: "Men's Jewelry", description: "Gold and fine jewelry for men", difficulty: "Moderate", popularity: 5 },
  { subCategory: "Men's Bracelets", name: "Men's Chain Bracelets", description: "Men's gold chain bracelets", difficulty: "Easy", popularity: 5 },
  { subCategory: "Men's Necklaces", name: "Men's Chain Necklaces", description: "Men's gold chain necklaces", difficulty: "Easy", popularity: 5 },
  { subCategory: "Men's Rings", name: "Men's Rings", description: "Men's rings", difficulty: "Moderate", popularity: 5 },
  { subCategory: "Men's Rings", name: "Men's Signet Rings", description: "Personalized men's signet rings", difficulty: "Moderate", popularity: 5 },
  { subCategory: "Men's Chains", name: "Men's Gourmet Chains", description: "Bold men's gourmet chains", difficulty: "Easy", popularity: 5 },
  { subCategory: "Children's Jewelry", name: "Children's Jewelry", description: "Jewelry designed for children", difficulty: "Easy", popularity: 3 },
  { subCategory: "Children's Jewelry", name: "Children's Bracelets", description: "Children's bracelets", difficulty: "Easy", popularity: 3 },
  { subCategory: "Children's Jewelry", name: "Children's ID Bracelets", description: "Personalized children's ID bracelets", difficulty: "Moderate", popularity: 3 },
  { subCategory: "Children's Jewelry", name: "Children's Necklaces", description: "Children's necklaces", difficulty: "Easy", popularity: 3 },
  { subCategory: "Pendants", name: "Pendants", description: "Standalone pendants", difficulty: "Easy", popularity: 5 },
  { subCategory: "Pendants", name: "Gemstone Pendants", description: "Natural gemstone pendants", difficulty: "Difficult", popularity: 5 },
  { subCategory: "Pendants", name: "Religious / Symbol Pendants", description: "Religious and symbolic pendants", difficulty: "Easy", popularity: 4 },
  { subCategory: "Symbol Jewelry", name: "Cross Jewelry", description: "Jewelry featuring cross motifs", difficulty: "Easy", popularity: 4 },
  { subCategory: "Symbol Jewelry", name: "Evil Eye Jewelry", description: "Jewelry featuring evil-eye motifs", difficulty: "Easy", popularity: 4 },
  { subCategory: "Turkish-Inspired Jewelry", name: "Turkish-Inspired Jewelry", description: "Jewelry inspired by Turkish culture", difficulty: "Moderate", popularity: 4 },
  { subCategory: "Coin Jewelry", name: "Coin Jewelry", description: "Coin-inspired jewelry", difficulty: "Moderate", popularity: 4 },
  { subCategory: "Coin Jewelry", name: "Antique Coin Jewelry", description: "Antique-inspired coin jewelry", difficulty: "Difficult", popularity: 4 },
  { subCategory: "Coin Jewelry", name: "Medallion Jewelry", description: "Medallion jewelry", difficulty: "Moderate", popularity: 4 },
  { subCategory: "Coin Jewelry", name: "Turkish Coin Jewelry", description: "Jewelry inspired by Turkish gold coins", difficulty: "Moderate", popularity: 4 },
  { subCategory: "Jewelry Sets", name: "Gold Jewelry Sets", description: "Coordinated gold jewelry sets", difficulty: "Moderate", popularity: 4 },
  { subCategory: "Jewelry Sets", name: "Necklace & Earring Sets", description: "Coordinated necklace and earring sets", difficulty: "Moderate", popularity: 5 },
  { subCategory: "Jewelry Sets", name: "Bracelet & Ring Sets", description: "Coordinated bracelet and ring sets", difficulty: "Moderate", popularity: 4 },
  { subCategory: "Bridal Jewelry", name: "Bridal Jewelry Sets", description: "Coordinated bridal jewelry sets", difficulty: "Difficult", popularity: 4 },
  { subCategory: "Gemstone Jewelry Sets", name: "Gemstone Jewelry Sets", description: "Jewelry sets featuring natural gemstones", difficulty: "Difficult", popularity: 4 },
  { subCategory: "Diamond Jewelry Sets", name: "Diamond Jewelry Sets", description: "Coordinated diamond jewelry sets", difficulty: "Very Difficult", popularity: 4 },
  { subCategory: "Chains", name: "Gold Chains", description: "Gold chains in various link styles and weights", difficulty: "Easy", popularity: 5 },
  { subCategory: "Chains", name: "Gourmet Chains", description: "Gold gourmet chains", difficulty: "Easy", popularity: 5 },
  { subCategory: "Chains", name: "Cuban Link Chains", description: "Bold Cuban link chains", difficulty: "Moderate", popularity: 5 },
  { subCategory: "Chains", name: "Rope Chains", description: "Twisted rope-style chains", difficulty: "Easy", popularity: 4 },
  { subCategory: "Chains", name: "Box Chains", description: "Structured box chains", difficulty: "Easy", popularity: 4 },
  { subCategory: "Chains", name: "Figaro Chains", description: "Chains with alternating short and long links", difficulty: "Easy", popularity: 4 },
  { subCategory: "Chains", name: "Paperclip Chains", description: "Elongated paperclip-style chains", difficulty: "Easy", popularity: 5 },
  { subCategory: "Chains", name: "Snake Chains", description: "Smooth flexible snake chains", difficulty: "Easy", popularity: 4 },
  { subCategory: "Chains", name: "Franco Chains", description: "Dense V-link Franco chains", difficulty: "Moderate", popularity: 4 },
  { subCategory: "Tennis Jewelry", name: "Tennis Jewelry", description: "Jewelry featuring continuous rows of gemstones", difficulty: "Difficult", popularity: 5 },
  { subCategory: "Bridal Jewelry", name: "Bridal Jewelry", description: "Fine jewelry for bridal styling", difficulty: "Difficult", popularity: 4 },
  { subCategory: "Engagement Jewelry", name: "Engagement Jewelry", description: "Jewelry for engagements and proposals", difficulty: "Difficult", popularity: 5 },
  { subCategory: "Wedding Jewelry", name: "Wedding Jewelry", description: "Jewelry for weddings and special occasions", difficulty: "Difficult", popularity: 4 },
  { subCategory: "Fine Jewelry", name: "Fine Jewelry", description: "High-quality fine jewelry using precious metals and gemstones", difficulty: "Very Difficult", popularity: 5 },
  { subCategory: "Anklets", name: "Anklets", description: "Gold anklets", difficulty: "Easy", popularity: 4 },
  { subCategory: "Brooches & Pins", name: "Brooches / Pins", description: "Decorative jewelry worn on clothing", difficulty: "Moderate", popularity: 3 },
  { subCategory: "Men's Accessories", name: "Cufflinks", description: "Men's cufflink accessories", difficulty: "Moderate", popularity: 4 },
  { subCategory: "Men's Accessories", name: "Tie Pins", description: "Decorative tie pins", difficulty: "Easy", popularity: 3 },
  { subCategory: "Earrings", name: "Ear Cuffs", description: "Ear jewelry that does not require a piercing", difficulty: "Easy", popularity: 5 },
  { subCategory: "Body Jewelry", name: "Piercing Jewelry", description: "Jewelry designed for various piercings", difficulty: "Moderate", popularity: 4 },
  { subCategory: "Bridal Accessories", name: "Bridal Hair Jewelry", description: "Jewelry designed for bridal hairstyles", difficulty: "Difficult", popularity: 4 },
  { subCategory: "Jewelry Findings", name: "Chain Extenders", description: "Components used to adjust chain length", difficulty: "Very Easy", popularity: 2 },
  { subCategory: "Jewelry Findings", name: "Jewelry Findings", description: "Clasps, rings and jewelry-making components", difficulty: "Easy", popularity: 3 },
  { subCategory: "Jewelry Components", name: "Jewelry Components", description: "Components used in jewelry production", difficulty: "Easy", popularity: 3 },
  { subCategory: "Semi-Finished Jewelry", name: "Semi-Finished Jewelry", description: "Jewelry requiring final assembly or finishing", difficulty: "Moderate", popularity: 4 },
  { subCategory: "Jewelry Findings", name: "Gold Findings", description: "Gold components used in jewelry manufacturing", difficulty: "Easy", popularity: 3 },
  { subCategory: "Custom Jewelry", name: "Custom Jewelry", description: "Custom-designed and made-to-order jewelry", difficulty: "Very Difficult", popularity: 5 },
];

/** The 51 specific sub-categories, as given in the source sheet. */
export const FINE_JEWELRY_SUB_CATEGORIES: string[] = [
  "Anklets", "Antique-Inspired Jewelry", "Baguette", "Birthstone", "Body Jewelry", "Bottega Style", "Bracelets", "Bridal Accessories", "Bridal Jewelry", "Brooches & Pins", "Chains", "Charm Jewelry", "Children's Jewelry", "Coin Jewelry", "Custom Jewelry", "Designer Jewelry", "Diamond", "Diamond Jewelry Sets", "Earrings", "Engagement", "Engagement Jewelry", "Fine Jewelry", "Gemstone Jewelry Sets", "Gemstones", "Jewelry Components", "Jewelry Findings", "Jewelry Sets", "Layering Jewelry", "Men's Accessories", "Men's Bracelets", "Men's Chains", "Men's Jewelry", "Men's Necklaces", "Men's Rings", "Mesh & Woven", "Necklaces", "Pearls", "Pendants", "Personalized Jewelry", "Precious Gemstones", "Rings", "Semi-Finished Jewelry", "Semi-Precious Gemstones", "Statement Jewelry", "Stone Setting", "Symbol Jewelry", "Tennis Jewelry", "Turkish-Inspired Jewelry", "Vintage Jewelry", "Wedding", "Wedding Jewelry",
];

/** Maps each of the 51 sub-categories to one of 13 broader parent categories. */
export const SUB_CATEGORY_TO_PARENT: Record<string, string> = {
  "Anklets": "Specialty & Body",
  "Antique-Inspired Jewelry": "Style & Heritage",
  "Baguette": "Diamonds & Gemstones",
  "Birthstone": "Diamonds & Gemstones",
  "Body Jewelry": "Specialty & Body",
  "Bottega Style": "Style & Heritage",
  "Bracelets": "Bracelets",
  "Bridal Accessories": "Rings & Bridal",
  "Bridal Jewelry": "Rings & Bridal",
  "Brooches & Pins": "Specialty & Body",
  "Chains": "Chains",
  "Charm Jewelry": "Charms & Sets",
  "Children's Jewelry": "Specialty & Body",
  "Coin Jewelry": "Specialty & Body",
  "Custom Jewelry": "Custom & Components",
  "Designer Jewelry": "Style & Heritage",
  "Diamond": "Diamonds & Gemstones",
  "Diamond Jewelry Sets": "Diamonds & Gemstones",
  "Earrings": "Earrings",
  "Engagement": "Rings & Bridal",
  "Engagement Jewelry": "Rings & Bridal",
  "Fine Jewelry": "Fine Jewelry (General)",
  "Gemstone Jewelry Sets": "Diamonds & Gemstones",
  "Gemstones": "Diamonds & Gemstones",
  "Jewelry Components": "Custom & Components",
  "Jewelry Findings": "Custom & Components",
  "Jewelry Sets": "Charms & Sets",
  "Layering Jewelry": "Necklaces & Pendants",
  "Men's Accessories": "Men's Jewelry",
  "Men's Bracelets": "Bracelets",
  "Men's Chains": "Chains",
  "Men's Jewelry": "Men's Jewelry",
  "Men's Necklaces": "Necklaces & Pendants",
  "Men's Rings": "Rings & Bridal",
  "Mesh & Woven": "Style & Heritage",
  "Necklaces": "Necklaces & Pendants",
  "Pearls": "Pearls",
  "Pendants": "Necklaces & Pendants",
  "Personalized Jewelry": "Charms & Sets",
  "Precious Gemstones": "Diamonds & Gemstones",
  "Rings": "Rings & Bridal",
  "Semi-Finished Jewelry": "Custom & Components",
  "Semi-Precious Gemstones": "Diamonds & Gemstones",
  "Statement Jewelry": "Charms & Sets",
  "Stone Setting": "Custom & Components",
  "Symbol Jewelry": "Charms & Sets",
  "Tennis Jewelry": "Diamonds & Gemstones",
  "Turkish-Inspired Jewelry": "Style & Heritage",
  "Vintage Jewelry": "Style & Heritage",
  "Wedding": "Rings & Bridal",
  "Wedding Jewelry": "Rings & Bridal",
};

/** The 13 broader parent categories shown as the primary "Category" filter. */
export const FINE_JEWELRY_PARENT_CATEGORIES: string[] = [
  "Bracelets", "Chains", "Charms & Sets", "Custom & Components", "Diamonds & Gemstones", "Earrings", "Fine Jewelry (General)", "Men's Jewelry", "Necklaces & Pendants", "Pearls", "Rings & Bridal", "Specialty & Body", "Style & Heritage",
];

/** One shared illustration per parent category (in /public/catimages) — every
 *  product under a given parent category shows this same image, since Fine
 *  Jewelry items don't have individual product photos. */
export const FINE_JEWELRY_CATEGORY_IMAGES: Record<string, string> = {
  "Bracelets": "bracelets.png",
  "Chains": "chains.png",
  "Charms & Sets": "charms.png",
  "Custom & Components": "customs.png",
  "Diamonds & Gemstones": "gems.png",
  "Earrings": "earrings.png",
  "Fine Jewelry (General)": "fines.png",
  "Men's Jewelry": "mens.png",
  "Necklaces & Pendants": "necklaces.png",
  "Pearls": "pearls.png",
  "Rings & Bridal": "bridals.png",
  "Specialty & Body": "specials.png",
  "Style & Heritage": "heritages.png",
};

export const DIFFICULTY_LEVELS: string[] = [
  "Very Easy", "Easy", "Moderate", "Moderately Difficult", "Difficult", "Very Difficult",
];

/** Difficulty -> tier number. Harder craftsmanship = higher tier. */
export const TIER_BY_DIFFICULTY: Record<string, number> = {
  "Very Easy": 1,
  "Easy": 2,
  "Moderate": 3,
  "Moderately Difficult": 4,
  "Difficult": 5,
  "Very Difficult": 6,
};

/** Tier number -> gaming-style letter grade. Harder craftsmanship = higher letter. */
export const TIER_LETTER: Record<number, string> = {
  1: "F",
  2: "D",
  3: "C",
  4: "B",
  5: "A",
  6: "S",
};

/** e.g. "S Tier" for tier 6. Used for both display and the checkbox filter. */
export function tierLabel(tier: number): string {
  return `${TIER_LETTER[tier] ?? "?"} Tier`;
}

/** Letter tiers in best-to-worst order, for the filter list and any fixed ordering. */
export const TIER_LABELS: string[] = [6, 5, 4, 3, 2, 1].map(tierLabel);

