<template>
  <div class="section">
    <div class="container">
      <div class="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <h1 class="section-title">Каталог</h1>
          <p class="section-subtitle">Подберите модель по настроению и интерьеру.</p>
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
              <label class="text-sm font-medium">Поиск</label>
              <input v-model="searchQuery" type="text" placeholder="Название модели" class="input" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">Категория</label>
              <select v-model="selectedCategory" class="select">
                <option value="">Все категории</option>
                <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">Производитель</label>
              <select v-model="selectedManufacturer" class="select">
                <option value="">Все производители</option>
                <option v-for="manufacturer in manufacturers" :key="manufacturer" :value="manufacturer">{{ manufacturer }}</option>
              </select>
            </div>
            <div class="space-y-3">
              <label class="text-sm font-medium">Цена</label>
              <div class="grid grid-cols-2 gap-3">
                <input v-model.number="priceRange.min" type="number" placeholder="От" class="input" />
                <input v-model.number="priceRange.max" type="number" placeholder="До" class="input" />
              </div>
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
            <p class="section-subtitle">Подборка для вашего пространства</p>
            <select v-model="sortBy" class="select max-w-[220px]">
              <option value="default">По умолчанию</option>
              <option value="price-asc">Цена: по возрастанию</option>
              <option value="price-desc">Цена: по убыванию</option>
              <option value="name-asc">Название: А-Я</option>
              <option value="name-desc">Название: Я-А</option>
            </select>
          </div>

          <div v-if="filteredProducts.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard.vue'

const route = useRoute()
const router = useRouter()

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedManufacturer = ref('')
const priceBounds = computed(() => {
  if (!products.length) return { min: 0, max: 0 }
  const prices = products.map(p => p.price)
  return { min: Math.min(...prices), max: Math.max(...prices) }
})
const priceRange = ref({ min: priceBounds.value.min, max: priceBounds.value.max })
const inStockOnly = ref(false)
const sortBy = ref('default')

const categories = computed(() => Array.from(new Set(products.map(p => p.category))))
const manufacturers = computed(() => Array.from(new Set(products.map(p => p.manufacturer))))

const filteredProducts = computed(() => {
  let result = [...products]

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(p =>
      [
        p.title,
        p.description,
        p.manufacturer,
        p.category,
      ].some(value => value.toLowerCase().includes(query))
    )
  }

  if (selectedCategory.value) {
    result = result.filter(p => p.category === selectedCategory.value)
  }

  if (selectedManufacturer.value) {
    result = result.filter(p => p.manufacturer === selectedManufacturer.value)
  }

  if (priceRange.value.min > 0) {
    result = result.filter(p => p.price >= priceRange.value.min)
  }

  if (priceRange.value.max > 0) {
    result = result.filter(p => p.price <= priceRange.value.max)
  }

  if (inStockOnly.value) {
    result = result.filter(p => p.inStock)
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
  selectedManufacturer.value = ''
  priceRange.value = { min: priceBounds.value.min, max: priceBounds.value.max }
  inStockOnly.value = false
  sortBy.value = 'default'
  router.push({ query: {} })
}

onMounted(() => {
  if (route.query.category) {
    selectedCategory.value = route.query.category as string
  }
})
</script>
