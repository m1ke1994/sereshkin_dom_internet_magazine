<template>
  <div class="section">
    <div class="container space-y-10">
      <div>
        <h1 class="section-title">Ваш бренд</h1>
        <p class="section-subtitle">{{ brandName }} — мастерская с вниманием к деталям и качеству.</p>
      </div>

      <div class="card p-6 space-y-4">
        <p class="section-subtitle">
          Мы создаём интерьерные часы, которые сочетают современный стиль и надёжные механизмы.
          Каждая модель проходит контроль качества перед отправкой.
        </p>
        <div class="grid gap-4 md:grid-cols-3">
          <div class="card p-4">15 лет в ремесле</div>
          <div class="card p-4">Лимитированные коллекции</div>
          <div class="card p-4">Авторская отделка</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { brandName } from '../utils/brand'
</script>

