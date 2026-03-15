import type { Product } from '../types/catalog'

export interface ProductTechnicalSpec {
  label: string
  value: string
}

const featuredProductSpecs: ProductTechnicalSpec[] = [
  { label: 'Материал корпуса', value: 'Дерево' },
  { label: 'Длина', value: '24 см' },
  { label: 'Ширина', value: '4 см' },
  { label: 'Высота', value: '26 см' },
  { label: 'Вес', value: '0,41 кг' },
  { label: 'Тип механизма', value: 'кварцевый' },
  { label: 'Тип индикации', value: 'арабские цифры' },
  { label: 'Тип питания', value: 'от батареек' },
  { label: 'Тип крепления', value: 'пластиковый подвес' },
  { label: 'Особенность изделия', value: 'с маятником' },
  { label: 'Размер в упаковке', value: '27 × 7 × 29 см' },
  { label: 'Упаковка', value: 'картонная коробка' },
  { label: 'Страна производства', value: 'Россия' },
]

export const getProductTechnicalSpecs = (product: Product | null | undefined) => {
  if (!product?.model_of_week) {
    return []
  }

  return featuredProductSpecs
}
