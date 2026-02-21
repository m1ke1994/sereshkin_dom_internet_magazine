import { computed, ref } from "vue"
import { api } from "../services/api"
import type { Category, Product } from "../types/catalog"

const productsState = ref<Product[]>([])
const categoriesState = ref<Category[]>([])
const catalogLoaded = ref(false)
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)

export function useCatalogData() {
  const loadCatalog = async () => {
    if (catalogLoaded.value || isLoading.value) {
      return
    }

    isLoading.value = true
    errorMessage.value = null

    try {
      const [products, categories] = await Promise.all([api.getProducts(), api.getCategories()])
      productsState.value = products
      categoriesState.value = categories
      catalogLoaded.value = true
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : "Не удалось загрузить каталог."
    } finally {
      isLoading.value = false
    }
  }

  const getProductBySlug = async (slug: string) => {
    if (!slug) {
      return null
    }

    const fromList = productsState.value.find((item) => item.slug === slug)
    if (fromList) {
      return fromList
    }

    try {
      return await api.getProductBySlug(slug)
    } catch {
      return null
    }
  }

  return {
    products: computed(() => productsState.value),
    categories: computed(() => categoriesState.value),
    isLoading: computed(() => isLoading.value),
    errorMessage: computed(() => errorMessage.value),
    loadCatalog,
    getProductBySlug,
  }
}
