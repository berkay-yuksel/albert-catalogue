/* ============================================================
   TOBACCO PIPE CATALOG DATA
   Real product data provided by the client (39 handmade pipes total).
   Photos live in /public/pipeimages/ (filenames come straight from
   this data - see PipeItem.image / zoomImage).

   Naming convention: product code (sku) and image filenames both use the
   "ACPIPE##" pattern (AC = Albert C.), e.g. sku "ACPIPE09" -> photos
   "ACPIPE09a.png" (main) / "ACPIPE09b.png" (zoom). This REPLACES the older
   "pipe1a.png" style filenames - if photos were already uploaded under the
   old names, they need to be renamed to match (see public/pipeimages/README.txt).

   Schema notes:
   - "theme" is the BROAD category (Animal, Human, Nature, Skull, Botanical,
     Geometric, Classic, Minimal). "motif" is the SPECIFIC subject depicted
     (e.g. "Elephant", "Bearded Man", "Twin Ram").
   - "surface" is multi-value (a pipe can be both "Carved" and "Textured").
   - "color" is the pipe's own body color (White/Beige/Cream/etc), separate
     from "stemColor" (the mouthpiece color).
   - "handmade" is "Yes"/"No" (string, not boolean) so it plugs into the
     generic checkbox facet system like every other filter.
   ============================================================ */

export interface PipeItem {
  name: string;
  sku: string;
  image: string;
  zoomImage: string;
  material: string;
  shape: string;
  carvingStyle: string;
  theme: string;
  motif: string;
  color: string;
  surface: string[];
  detailLevel: string;
  stemColor: string;
  mouthpieceShape: string;
  finish: string;
  handmade: string;
  /** "Included" or "Not Included". No per-item data was given for this, so
   *  every current item defaults to "Included" (standard for boxed
   *  meerschaum pipes) - update per-item if any should actually differ. */
  boxIncluded: string;
}

export const PIPE_ITEMS: PipeItem[] = [
  {
    name: "Teardrop Lattice Meerschaum Pipe", sku: "ACPIPE01",
    image: "pipe1a.png", zoomImage: "pipe1b.png",
    material: "Meerschaum", shape: "Bent", carvingStyle: "Lattice", theme: "Geometric", motif: "Teardrop Pattern",
    color: "White", surface: ["Lattice"], detailLevel: "High",
    stemColor: "Amber Tortoise", mouthpieceShape: "Curved", finish: "Lattice",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Twin Ram Hand-Carved Meerschaum Pipe", sku: "ACPIPE02",
    image: "pipe2a.png", zoomImage: "pipe2b.png",
    material: "Meerschaum", shape: "Figural", carvingStyle: "Figural", theme: "Animal", motif: "Twin Ram",
    color: "White", surface: ["Carved"], detailLevel: "High",
    stemColor: "Amber Tortoise", mouthpieceShape: "Curved", finish: "Hand-Carved",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Lady in Rose Hat Hand-Carved Meerschaum Pipe", sku: "ACPIPE03",
    image: "pipe3a.png", zoomImage: "pipe3b.png",
    material: "Meerschaum", shape: "Figural", carvingStyle: "Figural", theme: "Human", motif: "Lady in Rose Hat",
    color: "White", surface: ["Carved"], detailLevel: "High",
    stemColor: "Amber Tortoise", mouthpieceShape: "Curved", finish: "Hand-Carved",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Carved Leaf Wooden Tobacco Pipe", sku: "ACPIPE04",
    image: "pipe4a.png", zoomImage: "pipe4b.png",
    material: "Wood", shape: "Bent", carvingStyle: "Botanical", theme: "Nature", motif: "Leaf",
    color: "Brown", surface: ["Carved"], detailLevel: "High",
    stemColor: "Black", mouthpieceShape: "Curved", finish: "Carved",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Draped Lady Hand-Carved Meerschaum Pipe", sku: "ACPIPE05",
    image: "pipe5a.png", zoomImage: "pipe5b.png",
    material: "Meerschaum", shape: "Figural", carvingStyle: "Figural", theme: "Human", motif: "Draped Lady",
    color: "White", surface: ["Carved"], detailLevel: "High",
    stemColor: "Black", mouthpieceShape: "Curved", finish: "Hand-Carved",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Lattice Panel Hand-Carved Meerschaum Pipe", sku: "ACPIPE06",
    image: "pipe6a.png", zoomImage: "pipe6b.png",
    material: "Meerschaum", shape: "Panel", carvingStyle: "Lattice", theme: "Geometric", motif: "Abstract Lattice",
    color: "White", surface: ["Lattice"], detailLevel: "High",
    stemColor: "Dark Tortoise", mouthpieceShape: "Curved", finish: "Lattice",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Skull Hand-Carved Meerschaum Pipe", sku: "ACPIPE07",
    image: "pipe7a.png", zoomImage: "pipe7b.png",
    material: "Meerschaum", shape: "Figural", carvingStyle: "Figural", theme: "Skull", motif: "Skull",
    color: "White", surface: ["Carved"], detailLevel: "High",
    stemColor: "Dark Tortoise", mouthpieceShape: "Curved", finish: "Hand-Carved",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Floral Scroll Hand-Carved Meerschaum Pipe", sku: "ACPIPE08",
    image: "pipe8a.png", zoomImage: "pipe8b.png",
    material: "Meerschaum", shape: "Bent", carvingStyle: "Ornamental", theme: "Botanical", motif: "Floral Scroll",
    color: "White", surface: ["Carved"], detailLevel: "High",
    stemColor: "Black", mouthpieceShape: "Curved", finish: "Hand-Carved",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Elephant Figural Meerschaum Pipe", sku: "ACPIPE09",
    image: "pipe9a.png", zoomImage: "pipe9b.png",
    material: "Meerschaum", shape: "Figural", carvingStyle: "Figural", theme: "Animal", motif: "Elephant",
    color: "White", surface: ["Carved", "Textured", "Dotted"], detailLevel: "High",
    stemColor: "Amber Brown", mouthpieceShape: "Curved", finish: "Textured",
    handmade: "Yes", boxIncluded: "Included",
  },

  {
    name: "Leaf Feather Ornamental Meerschaum Pipe", sku: "ACPIPE11",
    image: "pipe11a.png", zoomImage: "pipe11b.png",
    material: "Meerschaum", shape: "Rounded", carvingStyle: "Ornamental", theme: "Nature", motif: "Leaf Feather",
    color: "White", surface: ["Smooth", "Relief"], detailLevel: "Medium",
    stemColor: "Amber Orange", mouthpieceShape: "Curved", finish: "Textured",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Fantasy Skull Figural Meerschaum Pipe", sku: "ACPIPE12",
    image: "pipe12a.png", zoomImage: "pipe12b.png",
    material: "Meerschaum", shape: "Figural", carvingStyle: "Figural", theme: "Skull", motif: "Fantasy Skull",
    color: "Beige", surface: ["Carved", "Granular", "Textured"], detailLevel: "High",
    stemColor: "Amber Brown", mouthpieceShape: "Curved", finish: "Carved",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Skull Figural Meerschaum Pipe", sku: "ACPIPE13",
    image: "pipe13a.png", zoomImage: "pipe13b.png",
    material: "Meerschaum", shape: "Figural", carvingStyle: "Figural", theme: "Skull", motif: "Skull",
    color: "White", surface: ["Carved", "Relief"], detailLevel: "High",
    stemColor: "Amber Brown", mouthpieceShape: "Curved", finish: "Smooth",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Bearded Man Figural Meerschaum Pipe", sku: "ACPIPE14",
    image: "pipe14a.png", zoomImage: "pipe14b.png",
    material: "Meerschaum", shape: "Figural", carvingStyle: "Figural", theme: "Human", motif: "Bearded Man",
    color: "White", surface: ["Carved", "Relief"], detailLevel: "High",
    stemColor: "Amber Brown", mouthpieceShape: "Curved", finish: "Smooth",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Lion Figural Meerschaum Pipe", sku: "ACPIPE15",
    image: "pipe15a.png", zoomImage: "pipe15b.png",
    material: "Meerschaum", shape: "Figural", carvingStyle: "Figural", theme: "Animal", motif: "Lion",
    color: "Beige", surface: ["Carved", "Fur Texture"], detailLevel: "High",
    stemColor: "Black", mouthpieceShape: "Curved", finish: "Carved",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Buffalo Figural Meerschaum Pipe", sku: "ACPIPE16",
    image: "pipe16a.png", zoomImage: "pipe16b.png",
    material: "Meerschaum", shape: "Figural", carvingStyle: "Figural", theme: "Animal", motif: "Buffalo",
    color: "Cream", surface: ["Carved", "Fur Texture"], detailLevel: "High",
    stemColor: "Black", mouthpieceShape: "Curved", finish: "Textured",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Elephant Figural Meerschaum Pipe", sku: "ACPIPE17",
    image: "pipe17a.png", zoomImage: "pipe17b.png",
    material: "Meerschaum", shape: "Figural", carvingStyle: "Figural", theme: "Animal", motif: "Elephant",
    color: "Beige", surface: ["Carved", "Textured"], detailLevel: "High",
    stemColor: "Amber Orange", mouthpieceShape: "Slightly Curved", finish: "Carved",
    handmade: "Yes", boxIncluded: "Included",
  },

  {
    name: "Bearded Man Figural Meerschaum Pipe", sku: "ACPIPE19",
    image: "pipe19a.png", zoomImage: "pipe19b.png",
    material: "Meerschaum", shape: "Figural", carvingStyle: "Figural", theme: "Human", motif: "Bearded Man",
    color: "White", surface: ["Carved", "Hair Texture", "Relief"], detailLevel: "High",
    stemColor: "Dark Amber", mouthpieceShape: "Curved", finish: "Smooth",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Stylized Skull Figural Meerschaum Pipe", sku: "ACPIPE20",
    image: "pipe20a.png", zoomImage: "pipe20b.png",
    material: "Meerschaum", shape: "Figural", carvingStyle: "Figural", theme: "Skull", motif: "Stylized Skull",
    color: "White", surface: ["Smooth", "Carved"], detailLevel: "Medium",
    stemColor: "Amber Brown", mouthpieceShape: "Curved", finish: "Smooth",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Flower Ornamental Meerschaum Pipe", sku: "ACPIPE21",
    image: "pipe21a.png", zoomImage: "pipe21b.png",
    material: "Meerschaum", shape: "Rounded", carvingStyle: "Ornamental", theme: "Botanical", motif: "Flower",
    color: "White", surface: ["Carved", "Relief", "Floral"], detailLevel: "High",
    stemColor: "Black", mouthpieceShape: "Curved", finish: "Carved",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Leaf Feather Ornamental Meerschaum Pipe", sku: "ACPIPE22",
    image: "pipe22a.png", zoomImage: "pipe22b.png",
    material: "Meerschaum", shape: "Rounded", carvingStyle: "Ornamental", theme: "Nature", motif: "Leaf Feather",
    color: "White", surface: ["Smooth", "Relief"], detailLevel: "Medium",
    stemColor: "Amber Orange", mouthpieceShape: "Curved", finish: "Textured",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Plain Geometric Meerschaum Pipe", sku: "ACPIPE23",
    image: "pipe23a.png", zoomImage: "pipe23b.png",
    material: "Meerschaum", shape: "Angular", carvingStyle: "Geometric", theme: "Minimal", motif: "Plain",
    color: "White", surface: ["Smooth"], detailLevel: "Minimal",
    stemColor: "Black", mouthpieceShape: "Curved", finish: "Smooth",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Plain Classic Meerschaum Pipe", sku: "ACPIPE24",
    image: "pipe24a.png", zoomImage: "pipe24b.png",
    material: "Meerschaum", shape: "Cylindrical", carvingStyle: "Classic", theme: "Classic", motif: "Plain",
    color: "White", surface: ["Pebbled", "Textured"], detailLevel: "Medium",
    stemColor: "Black Amber", mouthpieceShape: "Curved", finish: "Textured",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Crater Textured Meerschaum Pipe", sku: "ACPIPE25",
    image: "pipe25a.png", zoomImage: "pipe25b.png",
    material: "Meerschaum", shape: "Oval", carvingStyle: "Textured", theme: "Geometric", motif: "Crater",
    color: "White", surface: ["Cratered", "Dimpled", "Textured"], detailLevel: "High",
    stemColor: "Dark Amber", mouthpieceShape: "Slightly Curved", finish: "Textured",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Dots Textured Meerschaum Pipe", sku: "ACPIPE26",
    image: "pipe26a.png", zoomImage: "pipe26b.png",
    material: "Meerschaum", shape: "Barrel", carvingStyle: "Textured", theme: "Geometric", motif: "Dots",
    color: "White", surface: ["Dotted", "Dimpled"], detailLevel: "Medium",
    stemColor: "Dark Amber", mouthpieceShape: "Slightly Curved", finish: "Smooth",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Rings Textured Meerschaum Pipe", sku: "ACPIPE27",
    image: "pipe27a.png", zoomImage: "pipe27b.png",
    material: "Meerschaum", shape: "Cylindrical", carvingStyle: "Textured", theme: "Geometric", motif: "Rings",
    color: "Beige", surface: ["Ring Pattern", "Dimpled", "Carved"], detailLevel: "High",
    stemColor: "Black", mouthpieceShape: "Curved", finish: "Textured",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Plain Classic Meerschaum Pipe", sku: "ACPIPE28",
    image: "pipe28a.png", zoomImage: "pipe28b.png",
    material: "Meerschaum", shape: "Cylindrical", carvingStyle: "Classic", theme: "Minimal", motif: "Plain",
    color: "White", surface: ["Pebbled", "Textured"], detailLevel: "Minimal",
    stemColor: "Amber Orange", mouthpieceShape: "Straight", finish: "Textured",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Plain Classic Meerschaum Pipe", sku: "ACPIPE29",
    image: "pipe29a.png", zoomImage: "pipe29b.png",
    material: "Meerschaum", shape: "Rounded", carvingStyle: "Classic", theme: "Minimal", motif: "Plain",
    color: "White", surface: ["Smooth"], detailLevel: "Minimal",
    stemColor: "Amber Brown", mouthpieceShape: "Curved", finish: "Smooth",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Grid Textured Meerschaum Pipe", sku: "ACPIPE30",
    image: "pipe30a.png", zoomImage: "pipe30b.png",
    material: "Meerschaum", shape: "Cylindrical", carvingStyle: "Textured", theme: "Geometric", motif: "Grid",
    color: "White", surface: ["Grid Texture", "Crosshatch", "Textured"], detailLevel: "Medium",
    stemColor: "Amber Black", mouthpieceShape: "Curved", finish: "Textured",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Circles Modern Meerschaum Pipe", sku: "ACPIPE31",
    image: "pipe31a.png", zoomImage: "pipe31b.png",
    material: "Meerschaum", shape: "Conical", carvingStyle: "Modern", theme: "Geometric", motif: "Circles",
    color: "White", surface: ["Dimpled", "Textured"], detailLevel: "Medium",
    stemColor: "Amber Black", mouthpieceShape: "Curved", finish: "Textured",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Oval Rings Textured Meerschaum Pipe", sku: "ACPIPE32",
    image: "pipe32a.png", zoomImage: "pipe32b.png",
    material: "Meerschaum", shape: "Rounded", carvingStyle: "Textured", theme: "Geometric", motif: "Oval Rings",
    color: "White", surface: ["Cratered", "Ring Pattern", "Dimpled"], detailLevel: "High",
    stemColor: "Amber Orange", mouthpieceShape: "Curved", finish: "Textured",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Human Face Figural Meerschaum Pipe", sku: "ACPIPE33",
    image: "pipe33a.png", zoomImage: "pipe33b.png",
    material: "Meerschaum", shape: "Figural", carvingStyle: "Figural", theme: "Human", motif: "Human Face",
    color: "White", surface: ["Carved", "Relief", "Hair Texture"], detailLevel: "High",
    stemColor: "Black", mouthpieceShape: "Curved", finish: "Textured",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Dots Textured Meerschaum Pipe", sku: "ACPIPE34",
    image: "pipe34a.png", zoomImage: "pipe34b.png",
    material: "Meerschaum", shape: "Barrel", carvingStyle: "Textured", theme: "Geometric", motif: "Dots",
    color: "White", surface: ["Dotted", "Dimpled"], detailLevel: "Medium",
    stemColor: "Amber Brown", mouthpieceShape: "Curved", finish: "Smooth",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Fantasy Skull Figural Meerschaum Pipe", sku: "ACPIPE35",
    image: "pipe35a.png", zoomImage: "pipe35b.png",
    material: "Meerschaum", shape: "Figural", carvingStyle: "Figural", theme: "Skull", motif: "Fantasy Skull",
    color: "Beige", surface: ["Carved", "Granular", "Textured"], detailLevel: "High",
    stemColor: "Amber Brown", mouthpieceShape: "Curved", finish: "Carved",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Human Face Figural Meerschaum Pipe", sku: "ACPIPE36",
    image: "pipe36a.png", zoomImage: "pipe36b.png",
    material: "Meerschaum", shape: "Figural", carvingStyle: "Figural", theme: "Human", motif: "Human Face",
    color: "White", surface: ["Carved", "Relief", "Hair Texture"], detailLevel: "High",
    stemColor: "Amber Brown", mouthpieceShape: "Curved", finish: "Textured",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Elephant Figural Meerschaum Pipe", sku: "ACPIPE37",
    image: "pipe37a.png", zoomImage: "pipe37b.png",
    material: "Meerschaum", shape: "Figural", carvingStyle: "Figural", theme: "Animal", motif: "Elephant",
    color: "White", surface: ["Carved", "Textured", "Dotted"], detailLevel: "High",
    stemColor: "Amber Brown", mouthpieceShape: "Curved", finish: "Textured",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Dots Minimal Meerschaum Pipe", sku: "ACPIPE38",
    image: "pipe38a.png", zoomImage: "pipe38b.png",
    material: "Meerschaum", shape: "Cylindrical", carvingStyle: "Minimal", theme: "Geometric", motif: "Dots",
    color: "White", surface: ["Dotted", "Dimpled"], detailLevel: "Minimal",
    stemColor: "Amber Brown", mouthpieceShape: "Straight", finish: "Smooth",
    handmade: "Yes", boxIncluded: "Included",
  },
  {
    name: "Leaf Feather Ornamental Meerschaum Pipe", sku: "ACPIPE39",
    image: "pipe39a.png", zoomImage: "pipe39b.png",
    material: "Meerschaum", shape: "Rounded", carvingStyle: "Ornamental", theme: "Nature", motif: "Leaf Feather",
    color: "White", surface: ["Smooth", "Relief"], detailLevel: "Medium",
    stemColor: "Amber Orange", mouthpieceShape: "Curved", finish: "Textured",
    handmade: "Yes", boxIncluded: "Included",
  },];

/* ============================================================
   FACET VALUE LISTS
   Derived directly from PIPE_ITEMS (no separate master list was given
   this time) so the filter options always exactly match what's in
   the catalog - add a new pipe above and its values show up here too.
   ============================================================ */
function uniqueValues(values: string[]): string[] {
  return Array.from(new Set(values));
}

export const PIPE_MATERIALS = uniqueValues(PIPE_ITEMS.map((i) => i.material));
export const PIPE_SHAPES = uniqueValues(PIPE_ITEMS.map((i) => i.shape));
export const PIPE_CARVING_STYLES = uniqueValues(PIPE_ITEMS.map((i) => i.carvingStyle));
export const PIPE_THEMES = uniqueValues(PIPE_ITEMS.map((i) => i.theme));
export const PIPE_MOTIFS = uniqueValues(PIPE_ITEMS.map((i) => i.motif));
export const PIPE_COLORS = uniqueValues(PIPE_ITEMS.map((i) => i.color));
export const PIPE_SURFACES = uniqueValues(PIPE_ITEMS.flatMap((i) => i.surface));
export const PIPE_DETAIL_LEVELS = uniqueValues(PIPE_ITEMS.map((i) => i.detailLevel));
export const PIPE_STEM_COLORS = uniqueValues(PIPE_ITEMS.map((i) => i.stemColor));
export const PIPE_MOUTHPIECE_SHAPES = uniqueValues(PIPE_ITEMS.map((i) => i.mouthpieceShape));
export const PIPE_FINISHES = uniqueValues(PIPE_ITEMS.map((i) => i.finish));
export const PIPE_HANDMADE_OPTIONS = ["Yes", "No"];
export const PIPE_BOX_OPTIONS = ["Included", "Not Included"];
