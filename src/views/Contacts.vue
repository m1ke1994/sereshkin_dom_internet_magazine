<template>
  <div class="section">
    <div class="container space-y-10">
      <div>
        <h1 class="section-title">Контакты</h1>
        <p class="section-subtitle">Мы на связи каждый день с 10:00 до 20:00.</p>
      </div>

      <div class="grid gap-6 md:grid-cols-3">
        <div class="card p-6">
          <h3 class="text-lg font-semibold">Шоу-рум</h3>
          <p class="section-subtitle">Москва, ул. Петровка, 12</p>
        </div>
        <div class="card p-6">
          <h3 class="text-lg font-semibold">Телефон</h3>
          <p class="section-subtitle">+7 (999) 123-45-67</p>
        </div>
        <div class="card p-6">
          <h3 class="text-lg font-semibold">Почта</h3>
          <p class="section-subtitle">hello@seryozhkin-dom.ru</p>
        </div>
      </div>

      <div class="card p-6">
        <h2 class="text-xl font-semibold">Оставить заявку</h2>
        <div class="mt-4 grid gap-4 md:grid-cols-2">
          <input class="input" type="text" placeholder="Имя" />
          <input class="input" type="email" placeholder="Email" />
          <textarea class="textarea md:col-span-2" rows="4" placeholder="Ваш вопрос"></textarea>
        </div>
        <button class="btn btn-primary mt-4" type="button">Отправить</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>