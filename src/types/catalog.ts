export type ProductType = "main" | "exclusive"

export interface Category {
  id: number
  name: string
  slug: string
}

export interface ProductGalleryItem {
  id: number
  image: string
  image_url: string | null
  sort_order: number
}

export interface Product {
  id: number
  title: string
  slug: string
  short_description: string
  description: string
  price: number
  category: number
  category_name: string
  category_slug: string
  product_type: ProductType
  in_stock: boolean
  model_of_week: boolean
  image: string | null
  image_url: string | null
  gallery: ProductGalleryItem[]
  created_at: string
  updated_at: string
}
