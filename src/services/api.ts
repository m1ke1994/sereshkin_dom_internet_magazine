import type { Category, Product } from "../types/catalog"
import type { ContactRequestPayload, OrderPayload } from "../types/requests"

const rawApiUrl = (import.meta.env.VITE_API_URL || "/api").trim()

const normalizeApiUrl = (value: string) => {
  const sanitized = value.replace(/\/+$/, "")

  if (typeof window === "undefined") {
    return sanitized
  }

  try {
    const parsed = new URL(sanitized, window.location.origin)
    const isLocalWithoutPort =
      (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") &&
      !parsed.port &&
      window.location.port !== "" &&
      window.location.port !== "80"

    if (isLocalWithoutPort) {
      return parsed.pathname.replace(/\/+$/, "") || "/api"
    }

    return parsed.toString().replace(/\/+$/, "")
  } catch {
    return sanitized
  }
}

const API_URL = normalizeApiUrl(rawApiUrl)

interface ProductApiResponse extends Omit<Product, "price"> {
  price: string | number
}

const toNumber = (value: string | number) => {
  const normalized = typeof value === "string" ? Number(value) : value
  return Number.isFinite(normalized) ? normalized : 0
}

const normalizeProduct = (product: ProductApiResponse): Product => ({
  ...product,
  price: toNumber(product.price),
  image: product.image || null,
  image_url: product.image_url || null,
  gallery: product.gallery || [],
})

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers || {}),
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || `HTTP ${response.status}`)
  }

  return (await response.json()) as T
}

const queryCache = new Map<string, Product[]>()
const productCache = new Map<string, Product>()
let categoryCache: Category[] | null = null

const buildProductsQuery = (params: { search?: string; category?: string; in_stock?: boolean }) => {
  const query = new URLSearchParams()
  if (params.search) query.set("search", params.search)
  if (params.category) query.set("category", params.category)
  if (typeof params.in_stock === "boolean") query.set("in_stock", String(params.in_stock))
  const value = query.toString()
  return value ? `?${value}` : ""
}

export const api = {
  async getProducts(params: { search?: string; category?: string; in_stock?: boolean } = {}) {
    const query = buildProductsQuery(params)
    if (queryCache.has(query)) {
      return queryCache.get(query) || []
    }

    const data = await request<ProductApiResponse[]>(`/products/${query}`)
    const products = data.map(normalizeProduct)
    queryCache.set(query, products)
    for (const item of products) {
      productCache.set(item.slug, item)
    }
    return products
  },

  async getProductBySlug(slug: string) {
    if (productCache.has(slug)) {
      return productCache.get(slug) || null
    }

    const data = await request<ProductApiResponse>(`/products/${slug}/`)
    const product = normalizeProduct(data)
    productCache.set(slug, product)
    return product
  },

  async getCategories() {
    if (categoryCache) {
      return categoryCache
    }
    categoryCache = await request<Category[]>("/categories/")
    return categoryCache
  },

  async createContactRequest(payload: ContactRequestPayload) {
    return await request("/contact/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
  },

  async createOrder(payload: OrderPayload) {
    return await request("/orders/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
  },
}
