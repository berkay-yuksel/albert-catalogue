/* ============================================================
   TOBACCO PIPE CATALOG DATA
   Real product data provided by the client (8 handmade pipes).
   Photos live in /public/pipeimages/ (filenames come straight from
   this data - see PipeItem.image / zoomImage).

   Corrected version: every filter field is single-valued (a pipe has
   exactly one material, one shape, one carving style, one theme, etc.)
   ============================================================ */

export interface PipeItem {
  name: string;
  image: string;
  zoomImage: string;
  material: string;
  shape: string;
  carvingStyle: string;
  theme: string;
  stemColor: string;
  finish: string;
  handmade: boolean;
}

export const PIPE_ITEMS: PipeItem[] = [
  {
    name: "Teardrop Lattice Meerschaum Pipe",
    image: "pipe1a.png", zoomImage: "pipe1b.png",
    material: "Meerschaum", shape: "Bent", carvingStyle: "Lattice", theme: "Geometric",
    stemColor: "Amber Tortoise", finish: "Lattice", handmade: true,
  },
  {
    name: "Twin Ram Hand-Carved Meerschaum Pipe",
    image: "pipe2a.png", zoomImage: "pipe2b.png",
    material: "Meerschaum", shape: "Figural", carvingStyle: "Figural", theme: "Twin Ram",
    stemColor: "Amber Tortoise", finish: "Hand-Carved", handmade: true,
  },
  {
    name: "Lady in Rose Hat Hand-Carved Meerschaum Pipe",
    image: "pipe3a.png", zoomImage: "pipe3b.png",
    material: "Meerschaum", shape: "Figural", carvingStyle: "Figural", theme: "Lady",
    stemColor: "Amber Tortoise", finish: "Hand-Carved", handmade: true,
  },
  {
    name: "Carved Leaf Wooden Tobacco Pipe",
    image: "pipe4a.png", zoomImage: "pipe4b.png",
    material: "Wood", shape: "Bent", carvingStyle: "Botanical", theme: "Leaf",
    stemColor: "Black", finish: "Carved", handmade: true,
  },
  {
    name: "Draped Lady Hand-Carved Meerschaum Pipe",
    image: "pipe5a.png", zoomImage: "pipe5b.png",
    material: "Meerschaum", shape: "Figural", carvingStyle: "Figural", theme: "Lady",
    stemColor: "Black", finish: "Hand-Carved", handmade: true,
  },
  {
    name: "Lattice Panel Hand-Carved Meerschaum Pipe",
    image: "pipe6a.png", zoomImage: "pipe6b.png",
    material: "Meerschaum", shape: "Panel", carvingStyle: "Lattice", theme: "Geometric",
    stemColor: "Dark Tortoise", finish: "Lattice", handmade: true,
  },
  {
    name: "Skull Hand-Carved Meerschaum Pipe",
    image: "pipe7a.png", zoomImage: "pipe7b.png",
    material: "Meerschaum", shape: "Figural", carvingStyle: "Figural", theme: "Skull",
    stemColor: "Dark Tortoise", finish: "Hand-Carved", handmade: true,
  },
  {
    name: "Floral Scroll Hand-Carved Meerschaum Pipe",
    image: "pipe8a.png", zoomImage: "pipe8b.png",
    material: "Meerschaum", shape: "Bent", carvingStyle: "Ornamental", theme: "Floral Scroll",
    stemColor: "Black", finish: "Hand-Carved", handmade: true,
  },
];

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
export const PIPE_STEM_COLORS = uniqueValues(PIPE_ITEMS.map((i) => i.stemColor));
export const PIPE_FINISHES = uniqueValues(PIPE_ITEMS.map((i) => i.finish));
