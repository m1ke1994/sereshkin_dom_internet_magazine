<template>
  <div class="section">
    <div class="container">
      <div class="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <h1 class="section-title">Корзина</h1>
          <p class="section-subtitle">Проверьте выбранные позиции перед оформлением заказа.</p>
        </div>
      </div>

      <div v-if="cartItems.length" class="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div class="space-y-4">
          <div v-for="item in cartItems" :key="item.product.id" class="card p-6">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
              <RouterLink :to="`/product/${item.product.id}`" class="h-28 w-28 rounded-2xl bg-neutral-100 flex items-center justify-center">
                <img :src="item.product.images[0]" :alt="item.product.title" class="h-16 w-16 opacity-70" />
              </RouterLink>
              <div class="flex-1">
                <RouterLink :to="`/product/${item.product.id}`">
                  <h3 class="text-lg font-semibold">{{ item.product.title }}</h3>
                </RouterLink>
                <p class="section-subtitle">{{ item.product.category }}</p>
              </div>
              <div class="flex flex-wrap items-center gap-3">
                <div class="flex items-center gap-2">
                  <button class="btn btn-secondary" @click="updateQuantity(item.product.id, item.quantity - 1)">-</button>
                  <span class="min-w-[28px] text-center text-sm font-semibold">{{ item.quantity }}</span>
                  <button class="btn btn-secondary" @click="updateQuantity(item.product.id, item.quantity + 1)">+</button>
                </div>
                <div class="text-right">
                  <p class="text-lg font-semibold" :style="{ color: 'var(--accent)' }">{{ formatPrice(item.product.price * item.quantity) }}</p>
                  <p class="text-xs" :style="{ color: 'var(--muted)' }">{{ formatPrice(item.product.price) }} × {{ item.quantity }}</p>
                </div>
                <button class="btn btn-ghost" @click="removeFromCart(item.product.id)">Удалить</button>
              </div>
            </div>
          </div>
        </div>

        <aside class="card p-6 h-fit">
          <h2 class="text-xl font-semibold">Итого</h2>
          <div class="mt-4 space-y-3 text-sm" :style="{ color: 'var(--muted)' }">
            <div class="flex justify-between">
              <span>Товары ({{ cartCount }})</span>
              <span>{{ formatPrice(cartTotal) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Доставка</span>
              <span>Рассчитаем на этапе оплаты</span>
            </div>
            <div class="flex justify-between text-lg font-semibold" :style="{ color: 'var(--text)' }">
              <span>Итого</span>
              <span>{{ formatPrice(cartTotal) }}</span>
            </div>
          </div>
          <RouterLink to="/checkout" class="btn btn-primary w-full mt-6">Перейти к оплате</RouterLink>
          <RouterLink to="/catalog" class="btn btn-secondary w-full mt-3">Продолжить покупки</RouterLink>
        </aside>
      </div>

      <div v-else class="card p-10 mt-10 text-center">
        <h2 class="text-2xl font-semibold">Корзина пуста</h2>
        <p class="section-subtitle mt-2">Добавьте товары из каталога, чтобы оформить заказ.</p>
        <RouterLink to="/catalog" class="btn btn-primary mt-6">Перейти в каталог</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '../composables/useCart'

const { cartItems, cartTotal, cartCount, removeFromCart, updateQuantity } = useCart()

const formatPrice = (price: number) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(price)
</script>