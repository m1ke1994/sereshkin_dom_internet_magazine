export interface Article {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  image: string | null
  image_url: string | null
  created_at: string
  updated_at: string
}
