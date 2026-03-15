import { brandName } from './brand'

export const defaultSeoTitle = `${brandName} - интернет-магазин настенных часов`
export const defaultSeoDescription =
  `${brandName} — магазин настенных часов и часов под заказ. ` +
  'Изготовление часов с индивидуальным дизайном, доставка по Москве и России.'

const trimDescription = (value: string) => {
  const normalized = value.replace(/\s+/g, ' ').trim()
  if (normalized.length <= 180) {
    return normalized
  }
  return `${normalized.slice(0, 177).trim()}...`
}

const ensureMeta = (attribute: 'name' | 'property', key: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  return element
}

export const applySeo = (options?: { title?: string; description?: string; image?: string }) => {
  if (typeof document === 'undefined') {
    return
  }

  const title = options?.title || defaultSeoTitle
  const description = trimDescription(options?.description || defaultSeoDescription)
  const image = options?.image || '/icon-512.png'

  document.title = title
  ensureMeta('name', 'description').setAttribute('content', description)
  ensureMeta('name', 'application-name').setAttribute('content', brandName)
  ensureMeta('name', 'apple-mobile-web-app-title').setAttribute('content', brandName)
  ensureMeta('property', 'og:site_name').setAttribute('content', brandName)
  ensureMeta('property', 'og:title').setAttribute('content', title)
  ensureMeta('property', 'og:description').setAttribute('content', description)
  ensureMeta('property', 'og:image').setAttribute('content', image)
  ensureMeta('property', 'og:image:alt').setAttribute('content', brandName)
  ensureMeta('name', 'twitter:title').setAttribute('content', title)
  ensureMeta('name', 'twitter:description').setAttribute('content', description)
  ensureMeta('name', 'twitter:image').setAttribute('content', image)

  if (typeof window !== 'undefined') {
    ensureMeta('property', 'og:url').setAttribute('content', window.location.href)
  }
}
