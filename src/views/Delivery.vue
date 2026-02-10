<template>
  <div class="section">
    <div class="container space-y-10">
      <div>
        <h1 class="section-title">Оплата и доставка</h1>
        <p class="section-subtitle">Прозрачные условия и аккуратная логистика.</p>
      </div>

      <div class="grid gap-6 md:grid-cols-3">
        <div class="card card-hover p-6">
          <h3 class="text-lg font-semibold">Доставка по России</h3>
          <p class="section-subtitle">Срок 2–5 дней, бережная упаковка, отслеживание посылки.</p>
        </div>
        <div class="card card-hover p-6">
          <h3 class="text-lg font-semibold">Самовывоз</h3>
          <p class="section-subtitle">Москва, ул. Петровка 12. Подготовим заказ за 2 часа.</p>
        </div>
        <div class="card card-hover p-6">
          <h3 class="text-lg font-semibold">Оплата</h3>
          <p class="section-subtitle">Карты, переводы, выставление счёта для организаций.</p>
        </div>
      </div>

      <div class="card p-6 space-y-3">
        <h2 class="text-xl font-semibold">Условия</h2>
        <ul class="space-y-2 text-sm" :style="{ color: 'var(--muted)' }">
          <li>Доставка бесплатна при заказе от 15 000 ₽.</li>
          <li>Время сборки заказа — до 24 часов.</li>
          <li>Тщательно проверяем изделия перед отправкой.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>