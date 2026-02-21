import type { Product } from "../types/catalog"

const FALLBACK_IMAGE = "/placeholder-watch.svg"

export const getProductImage = (product: Product | null | undefined) => {
  if (!product) return FALLBACK_IMAGE
  const galleryImage = product.gallery?.find((item) => item.image_url)?.image_url
  return product.image_url || galleryImage || FALLBACK_IMAGE
}
