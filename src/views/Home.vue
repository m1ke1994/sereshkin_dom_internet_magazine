<template>
  <div>
    <section class="section">
      <div class="container grid gap-10 lg:grid-cols-2 items-center">
        <div class="space-y-6">
          <span class="badge">Коллекция 2026</span>
          <h1 class="text-4xl md:text-6xl font-semibold leading-tight">
            {{ brandName }} — интернет-магазин часов
          </h1>
          <p class="section-subtitle">
            Создано любящими руками.
          </p>
          <div class="flex flex-wrap gap-3">
            <RouterLink to="/catalog" class="btn btn-primary">Смотреть каталог</RouterLink>
            <RouterLink to="/about" class="btn btn-secondary">Ваш бренд</RouterLink>
          </div>
          <div class="grid gap-4 sm:grid-cols-3">
            <div class="card p-4 text-sm">Ручная работа мастеров</div>
            <div class="card p-4 text-sm">Натуральные материалы</div>
            <div class="card p-4 text-sm">Гарантия 2 года</div>
          </div>
        </div>
        <div class="card p-6">
          <div class="product-image-wrap">
            <img
              :src="heroImage"
              :alt="heroProduct?.title || 'Пример изделия'"
              class="product-image"
            />
          </div>
          <div class="mt-6 grid gap-3">
            <p class="text-sm" :style="{ color: 'var(--muted)' }">Выбор недели</p>
            <h2 class="text-2xl font-semibold">{{ heroProduct?.title || 'Модель недели' }}</h2>
            <p class="section-subtitle">{{ heroProduct?.short_description || heroProduct?.description || 'Актуальная подборка на этой неделе.' }}</p>
            <RouterLink v-if="heroProduct" :to="`/product/${heroProduct.slug}`" class="btn btn-primary">
              Смотреть модель
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 class="section-title">Основные модели</h2>
            <p class="section-subtitle">Коллекция базовых моделей для любого интерьера.</p>
          </div>
          <RouterLink to="/catalog?type=main" class="btn btn-secondary">Открыть раздел</RouterLink>
        </div>

        <div v-if="isLoading" class="mt-8 card p-8 text-center">Загрузка товаров...</div>
        <div v-else-if="mainProducts.length" class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ProductCard v-for="product in mainProducts" :key="product.id" :product="product" />
        </div>
        <div v-else class="mt-8 card p-8 text-center">Основные модели пока не добавлены.</div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 class="section-title">Эксклюзив</h2>
            <p class="section-subtitle">Лимитированные и уникальные модели часов.</p>
          </div>
          <RouterLink to="/catalog?type=exclusive" class="btn btn-secondary">Открыть раздел</RouterLink>
        </div>

        <div v-if="errorMessage" class="mt-8 card p-8 text-center">{{ errorMessage }}</div>
        <div v-else-if="exclusiveProducts.length" class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ProductCard v-for="product in exclusiveProducts" :key="product.id" :product="product" />
        </div>
        <div v-else class="mt-8 card p-8 text-center">Эксклюзивные модели пока не добавлены.</div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { useCatalogData } from '../composables/useCatalogData'
import { brandName } from '../utils/brand'
import { getProductImage } from '../utils/productImage'

const { products, isLoading, errorMessage, loadCatalog } = useCatalogData()

onMounted(() => {
  void loadCatalog()
})

const heroProduct = computed(() =>
  products.value.find(item => item.model_of_week && item.in_stock) ||
  products.value.find(item => item.in_stock) ||
  products.value[0] ||
  null
)
const heroImage = computed(() => getProductImage(heroProduct.value))

const mainProducts = computed(() =>
  products.value
    .filter(item => item.product_type === 'main' && item.in_stock)
    .slice(0, 4)
)

const exclusiveProducts = computed(() =>
  products.value
    .filter(item => item.product_type === 'exclusive' && item.in_stock)
    .slice(0, 4)
)
</script>

