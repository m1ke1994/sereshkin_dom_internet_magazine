<template>
  <div v-if="product" class="section">
    <div class="container">
      <nav class="text-sm flex items-center gap-2" :style="{ color: 'var(--muted)' }">
        <RouterLink to="/" class="link">Главная</RouterLink>
        <span>/</span>
        <RouterLink to="/catalog" class="link">Каталог</RouterLink>
        <span>/</span>
        <span>{{ product.title }}</span>
      </nav>

      <div class="mt-8 grid gap-10 lg:grid-cols-2">
        <div class="card p-6">
          <div class="aspect-square rounded-2xl bg-neutral-100 flex items-center justify-center">
            <img :src="product.images[0]" :alt="product.title" class="h-32 w-32 opacity-70" />
          </div>
        </div>

        <div class="space-y-6">
          <div>
            <h1 class="text-3xl md:text-4xl font-semibold">{{ product.title }}</h1>
            <p class="section-subtitle mt-2">{{ product.category }} · {{ product.manufacturer }}</p>
          </div>

          <div class="flex items-center gap-3">
            <span class="text-3xl font-semibold" :style="{ color: 'var(--accent)' }">{{ formatPrice(product.price) }}</span>
            <span class="badge" v-if="product.inStock">В наличии</span>
            <span class="tag" v-else>Нет в наличии</span>
          </div>

          <p class="section-subtitle">{{ product.description }}</p>

          <div class="card p-5 space-y-3">
            <h2 class="text-lg font-semibold">Характеристики</h2>
            <div v-for="(value, key) in product.specs" :key="key" class="flex justify-between text-sm">
              <span :style="{ color: 'var(--muted)' }">{{ key }}</span>
              <span class="font-medium">{{ value }}</span>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-4">
            <div class="flex items-center gap-2">
              <button class="btn btn-secondary" type="button" @click="quantity > 1 && quantity--" :disabled="quantity <= 1">-</button>
              <input v-model.number="quantity" type="number" min="1" class="input w-20 text-center" />
              <button class="btn btn-secondary" type="button" @click="quantity++">+</button>
            </div>
            <button class="btn btn-primary" type="button" @click="handleAddToCart" :disabled="!product.inStock">
              {{ isInCart(product.id) ? 'В корзине' : 'В корзину' }}
            </button>
            <RouterLink to="/catalog" class="btn btn-ghost">Назад к каталогу</RouterLink>
          </div>

          <div v-if="isInCart(product.id)" class="text-sm">
            <RouterLink to="/cart" class="link">Перейти в корзину →</RouterLink>
          </div>
        </div>
      </div>

      <div class="mt-16">
        <div class="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 class="section-title">Похожие товары</h2>
            <p class="section-subtitle">Ещё несколько моделей в том же настроении.</p>
          </div>
          <RouterLink to="/catalog" class="btn btn-secondary">Все товары</RouterLink>
        </div>
        <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ProductCard v-for="item in relatedProducts" :key="item.id" :product="item" />
        </div>
      </div>
    </div>
  </div>

  <div v-else class="section">
    <div class="container text-center">
      <h1 class="section-title">Товар не найден</h1>
      <p class="section-subtitle mt-3">Попробуйте вернуться в каталог.</p>
      <RouterLink to="/catalog" class="btn btn-primary mt-6">В каталог</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { products } from '../data/products'
import { useCart } from '../composables/useCart'
import ProductCard from '../components/ProductCard.vue'

const route = useRoute()
const { addToCart, isInCart } = useCart()
const quantity = ref(1)

const product = computed(() => {
  const id = Number(route.params.id)
  return products.find(p => p.id === id)
})

const relatedProducts = computed(() => {
  if (!product.value) return []
  return products.filter(p => p.category === product.value?.category && p.id !== product.value?.id).slice(0, 4)
})

const formatPrice = (price: number) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(price)

const handleAddToCart = () => {
  if (product.value) addToCart(product.value, quantity.value)
}
</script>