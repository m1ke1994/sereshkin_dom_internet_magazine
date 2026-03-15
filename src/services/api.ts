import axios from "axios"
import type { Category, Product } from "../types/catalog"
import type { ContactRequestPayload, OrderPayload } from "../types/requests"

const rawApiUrl = (import.meta.env.VITE_API_URL || "/api").trim()
const CSRF_COOKIE_NAME = "csrftoken"

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

const http = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
})

interface ProductApiResponse extends Omit<Product, "price"> {
  price: string | number
}

export interface FooterContactResponse {
  phone: string
  email: string
  address: string
}

const EMPTY_FOOTER_CONTACT: FooterContactResponse = {
  phone: "",
  email: "",
  address: "",
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

const getCookie = (name: string) => {
  if (typeof document === "undefined") return undefined
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(";").shift()
  return undefined
}

let csrfRequest: Promise<void> | null = null

export const ensureCsrfCookie = async () => {
  if (typeof window === "undefined") return
  if (getCookie(CSRF_COOKIE_NAME)) return

  if (!csrfRequest) {
    csrfRequest = http
      .get("/csrf/")
      .then(() => undefined)
      .finally(() => {
        csrfRequest = null
      })
  }

  await csrfRequest
}

const getCsrfHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {}
  const csrfToken = getCookie(CSRF_COOKIE_NAME)
  if (csrfToken) {
    headers["X-CSRFToken"] = csrfToken
  }
  return headers
}

async function request<T>(path: string, init?: { method?: string; headers?: Record<string, string>; data?: unknown }): Promise<T> {
  try {
    const response = await http.request<T>({
      url: path,
      method: init?.method,
      headers: init?.headers,
      data: init?.data,
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data
      const detail = typeof responseData === "string" ? responseData : JSON.stringify(responseData || {})
      throw new Error(detail || error.message || "Request failed")
    }
    throw error
  }
}

const queryCache = new Map<string, Product[]>()
const productCache = new Map<string, Product>()
let categoryCache: Category[] | null = null
let footerContactCache: FooterContactResponse | null = null

const normalizeFooterContact = (value: Partial<FooterContactResponse> | null | undefined): FooterContactResponse => ({
  phone: typeof value?.phone === "string" ? value.phone.trim() : "",
  email: typeof value?.email === "string" ? value.email.trim() : "",
  address: typeof value?.address === "string" ? value.address.trim() : "",
})

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

  async getFooterContact() {
    if (footerContactCache) {
      return footerContactCache
    }

    try {
      const data = await request<Partial<FooterContactResponse>>("/footer/")
      footerContactCache = normalizeFooterContact(data)
      return footerContactCache
    } catch {
      return { ...EMPTY_FOOTER_CONTACT }
    }
  },

  async createContactRequest(payload: ContactRequestPayload) {
    await ensureCsrfCookie()
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...getCsrfHeaders(),
    }
    return await request("/contact/", {
      method: "POST",
      headers,
      data: payload,
    })
  },

  async createOrder(payload: OrderPayload) {
    await ensureCsrfCookie()
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...getCsrfHeaders(),
    }
    return await request("/orders/", {
      method: "POST",
      headers,
      data: payload,
    })
  },
}
