<template>
  <article class="card card-hover overflow-hidden">
    <div class="relative">
      <RouterLink :to="`/product/${product.id}`" class="block">
        <img
          :src="product.images?.[0] || '/vite.svg'"
          :alt="product.title"
          class="h-64 w-full object-cover sm:h-72"
        />
      </RouterLink>
      <span v-if="!product.inStock" class="badge absolute left-4 top-4">Нет в наличии</span>
    </div>

    <div class="p-6 space-y-4">
      <div class="space-y-2">
        <p class="tag">{{ product.category }}</p>
        <RouterLink :to="`/product/${product.id}`">
          <h3 class="text-lg sm:text-xl font-semibold leading-snug">
            {{ product.title }}
          </h3>
        </RouterLink>
        <p class="text-sm" :style="{ color: 'var(--muted)' }">
          {{ product.description.slice(0, 90) }}...
        </p>
      </div>

      <div class="flex items-center justify-between">
        <span class="text-xl font-semibold" :style="{ color: 'var(--accent)' }">
          {{ formatPrice(product.price) }}
        </span>
        <button
          class="btn btn-primary"
          :disabled="!product.inStock"
          @click="handleAddToCart"
        >
          {{ isInCart(product.id) ? 'В корзине' : 'Купить' }}
        </button>
      </div>

      <RouterLink class="btn btn-secondary w-full" :to="`/product/${product.id}`">Подробнее</RouterLink>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Product } from '../data/products'
import { useCart } from '../composables/useCart'

const props = defineProps<{ product: Product }>()
const { addToCart, isInCart } = useCart()

const formatPrice = (price: number) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(price)

const handleAddToCart = () => {
  if (props.product.inStock) {
    addToCart(props.product)
  }
}
</script>