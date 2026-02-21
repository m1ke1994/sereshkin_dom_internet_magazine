<template>
  <div v-if="isLoading" class="section">
    <div class="container text-center">
      <h1 class="section-title">Загрузка товара...</h1>
    </div>
  </div>

  <div v-else-if="product" class="section">
    <div class="container">
      <nav class="text-sm flex items-center gap-2" :style="{ color: 'var(--muted)' }">
        <RouterLink to="/" class="link">Главная</RouterLink>
        <span>/</span>
        <RouterLink to="/catalog" class="link">Каталог</RouterLink>
        <span>/</span>
        <span>{{ product.title }}</span>
      </nav>

      <div class="mt-8 grid gap-10 lg:grid-cols-2">
        <div class="card p-6 space-y-4">
          <div class="product-image-wrap">
            <img :src="selectedImage" :alt="product.title" class="product-image" />
          </div>
          <div v-if="galleryImages.length > 1" class="grid grid-cols-4 gap-3">
            <button
              v-for="(image, index) in galleryImages"
              :key="image + index"
              class="rounded-xl border p-1"
              :style="{
                borderColor: selectedImage === image ? 'var(--accent)' : 'var(--border)',
                background: 'var(--card)'
              }"
              @click="selectedImage = image"
            >
              <img :src="image" :alt="`Галерея ${product.title}`" class="h-20 w-full rounded-lg object-cover" />
            </button>
          </div>
        </div>

        <div class="space-y-6">
          <div>
            <h1 class="text-3xl md:text-4xl font-semibold">{{ product.title }}</h1>
            <p class="section-subtitle mt-2">{{ product.category_name }} · {{ typeLabel }}</p>
          </div>

          <div class="flex items-center gap-3">
            <span class="text-3xl font-semibold" :style="{ color: 'var(--accent)' }">{{ formatPrice(product.price) }}</span>
            <span class="badge" v-if="product.in_stock">В наличии</span>
            <span class="tag" v-else>Нет в наличии</span>
          </div>

          <p class="section-subtitle">{{ product.short_description || product.description }}</p>

          <div class="card p-5 space-y-3">
            <h2 class="text-lg font-semibold">Описание</h2>
            <p class="text-sm" :style="{ color: 'var(--muted)' }">{{ product.description || 'Описание будет добавлено позже.' }}</p>
            <div class="flex justify-between text-sm border-t pt-3" :style="{ borderColor: 'var(--border)' }">
              <span :style="{ color: 'var(--muted)' }">Slug</span>
              <span class="font-medium">{{ product.slug }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span :style="{ color: 'var(--muted)' }">Создан</span>
              <span class="font-medium">{{ formatDate(product.created_at) }}</span>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-4">
            <div class="flex items-center gap-2">
              <button class="btn btn-secondary" type="button" @click="quantity > 1 && quantity--" :disabled="quantity <= 1">-</button>
              <input v-model.number="quantity" type="number" min="1" class="input w-20 text-center" />
              <button class="btn btn-secondary" type="button" @click="quantity++">+</button>
            </div>
            <button class="btn btn-primary" type="button" @click="handleAddToCart" :disabled="!product.in_stock">
              {{ isInCart(product.id) ? 'В корзине' : 'В корзину' }}
            </button>
            <RouterLink to="/catalog" class="btn btn-ghost">Назад к каталогу</RouterLink>
          </div>

          <div v-if="isInCart(product.id)" class="text-sm">
            <RouterLink to="/cart" class="link">Перейти в корзину ></RouterLink>
          </div>
        </div>
      </div>

      <div class="mt-16">
        <div class="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 class="section-title">Похожие товары</h2>
            <p class="section-subtitle">Ещё несколько моделей в той же категории.</p>
          </div>
          <RouterLink to="/catalog" class="btn btn-secondary">Все товары</RouterLink>
        </div>
        <div v-if="relatedProducts.length" class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ProductCard v-for="item in relatedProducts" :key="item.id" :product="item" />
        </div>
      </div>
    </div>
  </div>

  <div v-else class="section">
    <div class="container text-center">
      <h1 class="section-title">Товар не найден</h1>
      <p class="section-subtitle mt-3">{{ errorMessage || 'Попробуйте вернуться в каталог.' }}</p>
      <RouterLink to="/catalog" class="btn btn-primary mt-6">В каталог</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCart } from '../composables/useCart'
import { useCatalogData } from '../composables/useCatalogData'
import ProductCard from '../components/ProductCard.vue'
import { getProductImage } from '../utils/productImage'

const route = useRoute()
const { addToCart, isInCart } = useCart()
const { products, getProductBySlug, loadCatalog } = useCatalogData()
const quantity = ref(1)
const product = ref<Awaited<ReturnType<typeof getProductBySlug>>>(null)
const selectedImage = ref('')
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)

const loadProduct = async () => {
  const slug = String(route.params.slug || '')
  if (!slug) {
    product.value = null
    return
  }

  isLoading.value = true
  errorMessage.value = null
  await loadCatalog()

  const loadedProduct = await getProductBySlug(slug)
  if (!loadedProduct) {
    errorMessage.value = 'Товар не найден в базе данных.'
  }

  product.value = loadedProduct
  selectedImage.value = getProductImage(loadedProduct)
  isLoading.value = false
}

watch(() => route.params.slug, () => {
  void loadProduct()
}, { immediate: true })

const galleryImages = computed(() => {
  if (!product.value) return []

  const items = [product.value.image_url, ...product.value.gallery.map(item => item.image_url)]
  return Array.from(new Set(items.filter((item): item is string => Boolean(item))))
})

const relatedProducts = computed(() => {
  if (!product.value) return []
  return products.value
    .filter(item => item.category === product.value?.category && item.id !== product.value.id)
    .slice(0, 4)
})

const typeLabel = computed(() => {
  if (!product.value) return ''
  return product.value.product_type === 'exclusive' ? 'Эксклюзив' : 'Основная модель'
})

const formatPrice = (price: number) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(price)

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('ru-RU', { dateStyle: 'medium' }).format(new Date(value))

const handleAddToCart = () => {
  if (product.value) addToCart(product.value, quantity.value)
}
</script>

