<template>
  <footer class="mt-16 border-t" :style="{ borderColor: 'var(--border)' }">
    <div class="container section">
      <div class="grid gap-10 md:grid-cols-4">
        <div class="space-y-3">
          <div class="inline-flex items-center gap-3">
            <Logo />
            <div>
              <p class="text-xl font-semibold">{{ brandName }}</p>
              <p class="text-sm" :style="{ color: 'var(--muted)' }">Настенные часы и часы под заказ</p>
            </div>
          </div>
          <p class="section-subtitle">
            Настенные часы из дерева, индивидуальный дизайн и удобный путь заказа через каталог и форму обратной связи.
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
            <RouterLink to="/about" class="nav-link">О компании</RouterLink>
            <RouterLink to="/delivery" class="nav-link">Доставка</RouterLink>
            <RouterLink to="/warranty" class="nav-link">Обмен и возврат</RouterLink>
          </nav>
        </div>

        <div class="space-y-3">
          <p class="text-sm font-semibold uppercase tracking-wide">Связь</p>
          <div class="space-y-2 text-sm" :style="{ color: 'var(--muted)' }">
            <p>Для консультации и расчета заказа используйте форму обратной связи на сайте.</p>
            <p>Работаем с розничными и оптовыми заказами, доставляем по Москве и России.</p>
          </div>
          <RouterLink to="/contacts" class="btn btn-secondary">Связаться с нами</RouterLink>
        </div>
      </div>

      <div class="mt-10 flex flex-col gap-3 border-t pt-6 text-sm" :style="{ borderColor: 'var(--border)', color: 'var(--muted)' }">
        <p>© 2026 {{ brandName }}. Настенные часы, часы под заказ и декоративные модели для интерьера.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { brandName } from '../utils/brand'
import Logo from './Logo.vue'
</script>
