<template>
  <div class="section">
    <div class="container">
      <div class="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <h1 class="section-title">Каталог</h1>
          <p class="section-subtitle">Подберите настенные часы для интерьера, подарка или индивидуального проекта.</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="tag">Найдено: {{ filteredProducts.length }}</span>
        </div>
      </div>

      <div class="mt-10 grid gap-8 lg:grid-cols-[300px_1fr]">
        <aside class="space-y-6">
          <div class="card p-6 space-y-5">
            <h2 class="text-lg font-semibold">Фильтры</h2>
            <div class="space-y-2">
              <label class="text-sm font-medium">Поиск по названию модели</label>
              <input v-model="searchQuery" type="text" placeholder="Название модели" class="input" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">Категория</label>
              <select v-model="selectedCategory" class="select">
                <option value="">Все категории</option>
                <option v-for="category in categories" :key="category.id" :value="category.slug">{{ category.name }}</option>
              </select>
            </div>
            <label class="flex items-center gap-2 text-sm">
              <input v-model="inStockOnly" type="checkbox" class="h-4 w-4 accent-emerald-700" />
              Только в наличии
            </label>
            <button class="btn btn-secondary w-full" @click="resetFilters">Сбросить фильтры</button>
          </div>
        </aside>

        <main class="space-y-6">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <p class="section-subtitle">Модели для дома, офиса и декоративных интерьерных решений</p>
            <select v-model="sortBy" class="select max-w-[220px]">
              <option value="default">По умолчанию</option>
              <option value="price-asc">Цена: по возрастанию</option>
              <option value="price-desc">Цена: по убыванию</option>
              <option value="name-asc">Название: А-Я</option>
              <option value="name-desc">Название: Я-А</option>
            </select>
          </div>

          <div v-if="isLoading" class="card p-8 text-center">Загрузка каталога...</div>
          <div v-else-if="errorMessage" class="card p-8 text-center">{{ errorMessage }}</div>
          <div v-else-if="filteredProducts.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
          </div>

          <div v-else class="card p-8 text-center">
            <p class="text-lg">Товары не найдены. Измените параметры фильтра.</p>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { useCatalogData } from '../composables/useCatalogData'

const route = useRoute()
const router = useRouter()

const { products, categories, isLoading, errorMessage, loadCatalog } = useCatalogData()

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedType = ref('')
const inStockOnly = ref(false)
const sortBy = ref('default')

onMounted(() => {
  if (typeof route.query.category === 'string') {
    selectedCategory.value = route.query.category
  }
  if (typeof route.query.type === 'string') {
    selectedType.value = route.query.type
  }
  void loadCatalog()
})

watch(() => route.query.category, (value) => {
  selectedCategory.value = typeof value === 'string' ? value : ''
})

watch(() => route.query.type, (value) => {
  selectedType.value = typeof value === 'string' ? value : ''
})

const filteredProducts = computed(() => {
  let result = [...products.value]

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(item => item.title.toLowerCase().includes(query))
  }

  if (selectedCategory.value) {
    result = result.filter(item => item.category_slug === selectedCategory.value)
  }

  if (selectedType.value === 'main' || selectedType.value === 'exclusive') {
    result = result.filter(item => item.product_type === selectedType.value)
  }

  if (inStockOnly.value) {
    result = result.filter(item => item.in_stock)
  }

  switch (sortBy.value) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'name-asc':
      result.sort((a, b) => a.title.localeCompare(b.title, 'ru'))
      break
    case 'name-desc':
      result.sort((a, b) => b.title.localeCompare(a.title, 'ru'))
      break
  }

  return result
})

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedType.value = ''
  inStockOnly.value = false
  sortBy.value = 'default'
  void router.push({ query: {} })
}
</script>
