import rawProducts from './products.json'

interface RawProduct {
  name: string
  code: string
  category: string
  price: number
  old_price: number | null
  manufacturer: string
  dimensions: string
  mechanism: string
  sound: string
  night_mode: string
  description: string
  image: string
}

export interface Product {
  id: number
  title: string
  price: number
  oldPrice?: number | null
  category: string
  manufacturer: string
  inStock: boolean
  description: string
  specs: Record<string, string>
  images: string[]
}

const imageOverrides: Record<string, string> = {
  'thumb_mekhanicheskie-napolnye-chasy-tomas-stern-1062ng-001.jpg': 'mekhanicheskie-napolnye-chasy-tomas-stern-1062ng-001.jpg',
  'thumb_mekhanicheskie-napolnye-chasy-tomas-stern-1069NS_001.jpg': 'mekhanicheskie-napolnye-chasy-tomas-stern-1069NS_001.jpg',
  'thumb_mekhanicheskie-napolnye-chasy-tomas-stern-1065WS_001.jpg': 'mekhanicheskie-napolnye-chasy-tomas-stern-1065WS_001.jpg',
  'thumb_mekhanicheskie-napolnye-chasy-tomas-stern-1065ns_001.jpg': 'mekhanicheskie-napolnye-chasy-tomas-stern-1065ns_001.jpg',
  'thumb_mekhanicheskie-napolnye-chasy-tomas-stern-1051ng240625140157-001.jpg': 'mekhanicheskie-napolnye-chasy-tomas-stern-1051ng240625140157-001.jpg',
  'thumb_mekhanicheskie-napolnye-chasy-tomas-stern-1052ns_001.jpg': 'test2.jpg',
  'thumb_mekhanicheskie-napolnye-chasy-tomas-stern-1054ng-001.jpg': 'test2.jpg',
  'thumb_mekhanicheskie-napolnye-chasy-tomas-stern-1059ng_001.jpg': 'test2.jpg',
  'thumb_mekhanicheskie-napolnye-chasy-tomas-stern-1051NG-0271-001.jpg': 'test2.jpg',
  'thumb_mekhanicheskie-napolnye-chasy-tomas-stern-1068BS-001.jpg': 'test2.jpg',
}

const resolveImage = (image: string) => {
  if (!image) return '/vite.svg'
  const fileName = imageOverrides[image] ?? image
  return `/image/${fileName}`
}

export const products: Product[] = (rawProducts as RawProduct[]).map((item, index) => ({
  id: index + 1,
  title: item.name,
  price: item.price,
  oldPrice: item.old_price,
  category: item.category,
  manufacturer: item.manufacturer,
  inStock: true,
  description: item.description,
  specs: {
    'Код': item.code,
    'Размер': item.dimensions,
    'Механизм': item.mechanism,
    'Звук': item.sound,
    'Ночной режим': item.night_mode,
  },
  images: [resolveImage(item.image)],
}))

const getIsoWeek = (date: Date) => {
  const temp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const day = temp.getUTCDay() || 7
  temp.setUTCDate(temp.getUTCDate() + 4 - day)
  const yearStart = new Date(Date.UTC(temp.getUTCFullYear(), 0, 1))
  const weekNo = Math.ceil((((temp.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
  return { week: weekNo, year: temp.getUTCFullYear() }
}

export const getWeeklyProduct = (date: Date = new Date()) => {
  if (!products.length) return undefined
  const { week, year } = getIsoWeek(date)
  const seed = year * 100 + week
  const index = ((seed % products.length) + products.length) % products.length
  return products[index]
}
