<template>
  <footer class="mt-16 border-t" :style="{ borderColor: 'var(--border)' }">
    <div class="container section">
      <div class="grid gap-10 md:grid-cols-4">
        <div class="space-y-3">
          <p class="text-xl font-semibold">{{ brandName }}</p>
          <p class="section-subtitle">
            Создано любящими руками.
          </p>
        </div>

        <div class="space-y-3">
          <p class="text-sm font-semibold uppercase tracking-wide">Каталог</p>
          <nav class="flex flex-col gap-2">
            <RouterLink to="/catalog" class="nav-link">Все товары</RouterLink>
            <RouterLink to="/catalog?type=main" class="nav-link">Основные модели</RouterLink>
            <RouterLink to="/catalog?type=exclusive" class="nav-link">Эксклюзив</RouterLink>
          </nav>
        </div>

        <div class="space-y-3">
          <p class="text-sm font-semibold uppercase tracking-wide">Информация</p>
          <nav class="flex flex-col gap-2">
            <RouterLink to="/about" class="nav-link">Ваш бренд</RouterLink>
            <RouterLink to="/delivery" class="nav-link">Оплата и доставка</RouterLink>
            <RouterLink to="/warranty" class="nav-link">Гарантия</RouterLink>
          </nav>
        </div>

        <div class="space-y-3">
          <p class="text-sm font-semibold uppercase tracking-wide">Контакты</p>
          <div class="space-y-2 text-sm" :style="{ color: 'var(--muted)' }">
            <p>Москва, ул. Петровка, 12</p>
            <p>+7 (999) 123-45-67</p>
            <p>hello@watch-store.example</p>
          </div>
        </div>
      </div>

      <div class="mt-10 flex flex-col gap-3 border-t pt-6 text-sm" :style="{ borderColor: 'var(--border)', color: 'var(--muted)' }">
        <p>© 2026 {{ brandName }}. Все права защищены.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { brandName } from '../utils/brand'
</script>

