<template>
  <article class="card card-hover overflow-hidden h-full flex flex-col">
    <div class="relative">
      <RouterLink :to="`/product/${product.slug}`" class="block">
        <div class="product-image-wrap">
          <img
            :src="imageUrl"
            :alt="product.title"
            class="product-image"
          />
        </div>
      </RouterLink>
      <span v-if="!product.in_stock" class="badge absolute left-4 top-4">Нет в наличии</span>
    </div>

    <div class="p-6 space-y-4 flex flex-col h-full">
      <div class="space-y-2 flex-1">
        <p class="tag">{{ product.category_name }}</p>
        <RouterLink :to="`/product/${product.slug}`">
          <h3 class="text-lg sm:text-xl font-semibold leading-snug">
            {{ product.title }}
          </h3>
        </RouterLink>
        <p class="text-sm" :style="{ color: 'var(--muted)' }">
          {{ shortDescription }}
        </p>
      </div>

      <div class="mt-auto space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-xl font-semibold" :style="{ color: 'var(--accent)' }">
            {{ formatPrice(product.price) }}
          </span>
          <button
            class="btn btn-primary"
            :disabled="!product.in_stock"
            @click="handleAddToCart"
          >
            {{ isInCart(product.id) ? 'В корзине' : 'Купить' }}
          </button>
        </div>

        <RouterLink class="btn btn-secondary w-full" :to="`/product/${product.slug}`">Подробнее</RouterLink>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCart } from '../composables/useCart'
import type { Product } from '../types/catalog'
import { getProductImage } from '../utils/productImage'

const props = defineProps<{ product: Product }>()
const { addToCart, isInCart } = useCart()

const shortDescription = computed(() => {
  const value = props.product.short_description || props.product.description || ''
  if (value.length <= 90) return value
  return `${value.slice(0, 90)}...`
})

const imageUrl = computed(() => getProductImage(props.product))

const formatPrice = (price: number) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(price)

const handleAddToCart = () => {
  if (props.product.in_stock) {
    addToCart(props.product)
  }
}
</script>

