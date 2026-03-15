const PLACEHOLDER_BRANDS = new Set([
  '',
  'ваш бренд',
  'наш бренд',
  'e-clock',
  'e clock',
  'your brand',
  'brand',
  'company name',
])

export const normalizeBrandName = (value: string | undefined | null) => {
  const normalized = (value || '').trim()
  if (PLACEHOLDER_BRANDS.has(normalized.toLowerCase())) {
    return 'Eco-Hour'
  }
  return normalized || 'Eco-Hour'
}

export const brandName = normalizeBrandName(import.meta.env.VITE_BRAND_NAME)
