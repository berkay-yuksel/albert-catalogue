"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { CAT_LABELS } from "@/data/facets";

/* ============================================================
   Naming convention (see /public/images/README.txt):
     /images/{imgSlug}a.jpg  -> main / standard photo (required)
     /images/{imgSlug}b.jpg  -> optional angle photo
     /images/{imgSlug}c.jpg  -> optional zoom/detail photo
   e.g. the first chain product -> /images/chain1a.jpg, chain1b.jpg, chain1c.jpg
   ============================================================ */
const IMAGE_BASE_PATH = "/images/";
const IMAGE_EXT = ".jpg";
const VARIANT_LETTERS = ["a", "b", "c"];

export function imagePath(product: Product, variant: 1 | 2 | 3): string {
  const letter = VARIANT_LETTERS[variant - 1] ?? "a";
  return `${IMAGE_BASE_PATH}${product.imgSlug}${letter}${IMAGE_EXT}`;
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
      <div className="img-placeholder">
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
