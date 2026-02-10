<template>
  <div class="section">
    <div class="container space-y-10">
      <div>
        <h1 class="section-title">Гарантия</h1>
        <p class="section-subtitle">Мы уверены в качестве, поэтому даём расширенную поддержку.</p>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="card p-6">
          <h3 class="text-lg font-semibold">Гарантия 24 месяца</h3>
          <p class="section-subtitle">Бесплатное обслуживание механизма и корпуса.</p>
        </div>
        <div class="card p-6">
          <h3 class="text-lg font-semibold">Возврат 14 дней</h3>
          <p class="section-subtitle">Если изделие не подошло, мы поможем с обменом.</p>
        </div>
      </div>

      <div class="card p-6 space-y-3">
        <h2 class="text-xl font-semibold">Условия обслуживания</h2>
        <ul class="space-y-2 text-sm" :style="{ color: 'var(--muted)' }">
          <li>Гарантия распространяется на заводские дефекты.</li>
          <li>Сохраните чек и фирменную упаковку.</li>
          <li>Сервисный центр в Москве и удалённая поддержка.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>