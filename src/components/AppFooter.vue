<template>
  <footer class="mt-16 border-t" :style="{ borderColor: 'var(--border)' }">
    <div class="container section">
      <div class="grid gap-10 md:grid-cols-4">
        <div class="space-y-3">
          <p class="text-xl font-semibold">Серёжкин дом</p>
          <p class="section-subtitle">
            Авторские деревянные часы, созданные с уважением к традиции и вниманием к деталям.
          </p>
        </div>

        <div class="space-y-3">
          <p class="text-sm font-semibold uppercase tracking-wide">Каталог</p>
          <nav class="flex flex-col gap-2">
            <RouterLink to="/catalog" class="nav-link">Все товары</RouterLink>
            <RouterLink to="/catalog?category=Традиционные" class="nav-link">Традиционные</RouterLink>
            <RouterLink to="/catalog?category=Природа" class="nav-link">Природа</RouterLink>
            <RouterLink to="/catalog?category=Детские" class="nav-link">Детские</RouterLink>
          </nav>
        </div>

        <div class="space-y-3">
          <p class="text-sm font-semibold uppercase tracking-wide">Информация</p>
          <nav class="flex flex-col gap-2">
            <RouterLink to="/about" class="nav-link">О бренде</RouterLink>
            <RouterLink to="/delivery" class="nav-link">Оплата и доставка</RouterLink>
            <RouterLink to="/warranty" class="nav-link">Гарантия</RouterLink>
          </nav>
        </div>

        <div class="space-y-3">
          <p class="text-sm font-semibold uppercase tracking-wide">Контакты</p>
          <div class="space-y-2 text-sm" :style="{ color: 'var(--muted)' }">
            <p>Москва, ул. Петровка, 12</p>
            <p>+7 (999) 123-45-67</p>
            <p>hello@seryozhkin-dom.ru</p>
          </div>
        </div>
      </div>

      <div class="mt-10 flex flex-col gap-3 border-t pt-6 text-sm" :style="{ borderColor: 'var(--border)', color: 'var(--muted)' }">
        <p>© 2026 Серёжкин дом. Все права защищены.</p>
        <p>Сделано вручную, проверено временем.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>