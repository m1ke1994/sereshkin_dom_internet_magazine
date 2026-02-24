import type { Product } from "../types/catalog"

const FALLBACK_IMAGE = "/placeholder-watch.svg"

const isLocalHost = (hostname: string) => hostname === "localhost" || hostname === "127.0.0.1"

const normalizeImageUrl = (rawUrl: string | null | undefined) => {
  if (!rawUrl) {
    return null
  }

  if (typeof window === "undefined") {
    return rawUrl
  }

  try {
    const parsed = new URL(rawUrl, window.location.origin)
    const isLocalWithoutPort =
      isLocalHost(parsed.hostname) &&
      !parsed.port &&
      window.location.port !== "" &&
      window.location.port !== "80"

    if (isLocalWithoutPort) {
      const normalized = `${window.location.protocol}//${window.location.host}${parsed.pathname}${parsed.search}${parsed.hash}`
      if (import.meta.env.DEV) {
        console.log("[image-debug] normalized image URL without port", { from: rawUrl, to: normalized })
      }
      return normalized
    }

    return parsed.toString()
  } catch {
    return rawUrl
  }
}

export const getProductImage = (product: Product | null | undefined) => {
  if (!product) return FALLBACK_IMAGE

  const galleryImage = product.gallery?.find((item) => item.image_url || item.image)
  const candidate = product.image_url || product.image || galleryImage?.image_url || galleryImage?.image || null
  const resolved = normalizeImageUrl(candidate)

  if (!resolved) {
    if (import.meta.env.DEV) {
      console.log("[image-debug] product has no image", {
        id: product.id,
        slug: product.slug,
        title: product.title,
      })
    }
    return FALLBACK_IMAGE
  }

  return resolved
}
