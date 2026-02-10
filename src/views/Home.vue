<template>
  <div>
    <section class="section">
      <div class="container grid gap-10 lg:grid-cols-2 items-center">
        <div class="space-y-6">
          <span class="badge">Коллекция 2026</span>
          <h1 class="text-4xl md:text-6xl font-semibold leading-tight">
            Серёжкин дом — галерея авторских деревянных часов
          </h1>
          <p class="section-subtitle">
            Тёплый свет дерева, точность механизма и современная эстетика для вашего дома.
          </p>
          <div class="flex flex-wrap gap-3">
            <RouterLink to="/catalog" class="btn btn-primary">Смотреть каталог</RouterLink>
            <RouterLink to="/about" class="btn btn-secondary">О бренде</RouterLink>
          </div>
          <div class="grid gap-4 sm:grid-cols-3">
            <div class="card p-4 text-sm">Ручная работа мастеров</div>
            <div class="card p-4 text-sm">Натуральное дерево</div>
            <div class="card p-4 text-sm">Гарантия 2 года</div>
          </div>
        </div>
        <div class="card p-6">
          <div class="aspect-[4/3] rounded-2xl bg-neutral-100 flex items-center justify-center">
            <img src="/vite.svg" alt="Пример изделия" class="h-24 w-24 opacity-70" />
          </div>
          <div class="mt-6 grid gap-3">
            <p class="text-sm" :style="{ color: 'var(--muted)' }">Выбор недели</p>
            <h2 class="text-2xl font-semibold">Берёзовая роща</h2>
            <p class="section-subtitle">Сдержанный орнамент и тёплый тон дуба.</p>
            <RouterLink to="/product/5" class="btn btn-primary">Смотреть модель</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 class="section-title">Преимущества</h2>
            <p class="section-subtitle">Три причины выбрать Серёжкин дом.</p>
          </div>
        </div>
        <div class="mt-8 grid gap-6 md:grid-cols-3">
          <div class="card card-hover p-6">
            <h3 class="text-xl font-semibold">Точная механика</h3>
            <p class="section-subtitle">Бесшумные кварцевые механизмы и проверенная сборка.</p>
          </div>
          <div class="card card-hover p-6">
            <h3 class="text-xl font-semibold">Индивидуальность</h3>
            <p class="section-subtitle">Каждая модель выпускается ограниченной серией.</p>
          </div>
          <div class="card card-hover p-6">
            <h3 class="text-xl font-semibold">Экологичность</h3>
            <p class="section-subtitle">Натуральные масла, бережная обработка и упаковка.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 class="section-title">Популярные модели</h2>
            <p class="section-subtitle">Лидеры продаж и любимцы клиентов.</p>
          </div>
          <RouterLink to="/catalog" class="btn btn-secondary">Все товары</RouterLink>
        </div>
        <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard.vue'

const featuredProducts = computed(() => products.filter(p => p.inStock).slice(0, 4))
</script>