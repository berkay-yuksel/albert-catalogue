"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { CAT_LABELS } from "@/data/facets";
import { FINE_JEWELRY_CATEGORY_IMAGES } from "@/data/fineJewelryData";

/* ============================================================
   Naming convention (see /public/images/README.txt):

   Chain products use their `imageCode` (e.g. "0001-FOR-20", NOT the
   `sku`/product code like "AFC1" - the client sheet keeps these as two
   separate codes per item) as the filename, PNG format, only 2 photos:
     /images/{imageCode}.png        -> main / standard photo (required)
     /images/{imageCode}-zoom.png   -> zoom/detail photo (optional)
   e.g. /images/0001-FOR-20.png, /images/0001-FOR-20-zoom.png

   Tobacco Pipe products carry their exact photo filenames directly on the
   product (product.pipeImage / pipeZoomImage, from the client's pipe data),
   served from /public/pipeimages/.

   Fine Jewelry (8K Gold Collection) products don't have individual photos ,
   every product under a given parent category (product.fineCategory) shares
   one illustration from /public/catimages, see FINE_JEWELRY_CATEGORY_IMAGES.

   Every other category keeps the generic 3-photo scheme:
     /images/{imgSlug}a.jpg  -> main / standard photo (required)
     /images/{imgSlug}b.jpg  -> optional angle photo
     /images/{imgSlug}c.jpg  -> optional zoom/detail photo
   ============================================================ */
const IMAGE_BASE_PATH = "/images/";
const CATEGORY_IMAGE_BASE_PATH = "/catimages/";
const PIPE_IMAGE_BASE_PATH = "/pipeimages/";
const GENERIC_IMAGE_EXT = ".jpg";
const SKU_IMAGE_EXT = ".png";
const VARIANT_LETTERS = ["a", "b", "c"];

/** How many photo variants a product supports - used by the modal gallery. */
export function variantCountFor(product: Product): number {
  if (product.fineCategory) return 1; // shared category illustration, no zoom/angle
  if (product.pipeImage) return product.pipeZoomImage ? 2 : 1;
  return product.imageCode ? 2 : 3;
}

export function imagePath(product: Product, variant: 1 | 2 | 3): string {
  if (product.fineCategory) {
    const file = FINE_JEWELRY_CATEGORY_IMAGES[product.fineCategory];
    return `${CATEGORY_IMAGE_BASE_PATH}${file ?? "fines.png"}`;
  }
  if (product.pipeImage) {
    const file = variant >= 2 && product.pipeZoomImage ? product.pipeZoomImage : product.pipeImage;
    return `${PIPE_IMAGE_BASE_PATH}${file}`;
  }
  if (product.imageCode) {
    // Real catalog photos, named after the image code - no "angle" (variant 2 = zoom here).
    return variant >= 2
      ? `${IMAGE_BASE_PATH}${product.imageCode}-zoom${SKU_IMAGE_EXT}`
      : `${IMAGE_BASE_PATH}${product.imageCode}${SKU_IMAGE_EXT}`;
  }
  const letter = VARIANT_LETTERS[variant - 1] ?? "a";
  return `${IMAGE_BASE_PATH}${product.imgSlug}${letter}${GENERIC_IMAGE_EXT}`;
}

type Stage = "requested" | "main-fallback" | "placeholder";

export function ProductImage({
  product,
  variant = 1,
  className,
}: {
  product: Product;
  variant?: 1 | 2 | 3;
  className?: string;
}) {
  const [stage, setStage] = useState<Stage>("requested");

  if (stage === "placeholder") {
    return (
      <div className={`img-placeholder ${className ?? ""}`}>
        {CAT_LABELS[product.category]}
        <br />
        {product.name}
      </div>
    );
  }

  const src = stage === "main-fallback" ? imagePath(product, 1) : imagePath(product, variant);

  // Intentional plain <img> (not next/image): onError needs to chain through
  // the a/b/c photo fallback above, and photo dimensions aren't known ahead
  // of time since they're uploaded by the site owner.
  return (
    <img
      className={className}
      src={src}
      alt={product.name}
      loading="lazy"
      onError={() => {
        if (variant !== 1 && stage === "requested") {
          setStage("main-fallback");
        } else {
          setStage("placeholder");
        }
      }}
    />
  );
}
