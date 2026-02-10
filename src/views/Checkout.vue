<template>
  <div class="section">
    <div class="container">
      <div class="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <h1 class="section-title">Оформление заказа</h1>
          <p class="section-subtitle">Заполните данные, и мы подготовим посылку.</p>
        </div>
      </div>

      <div class="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <form class="space-y-6">
          <div class="card p-6 space-y-4">
            <h2 class="text-lg font-semibold">Контактные данные</h2>
            <div class="grid gap-4 md:grid-cols-2">
              <input class="input" type="text" placeholder="Имя" />
              <input class="input" type="text" placeholder="Фамилия" />
              <input class="input" type="email" placeholder="Email" />
              <input class="input" type="tel" placeholder="Телефон" />
            </div>
          </div>

          <div class="card p-6 space-y-4">
            <h2 class="text-lg font-semibold">Доставка</h2>
            <div class="grid gap-4 md:grid-cols-2">
              <input class="input" type="text" placeholder="Город" />
              <input class="input" type="text" placeholder="Улица" />
              <input class="input" type="text" placeholder="Дом / Квартира" />
              <input class="input" type="text" placeholder="Индекс" />
            </div>
            <textarea class="textarea" rows="3" placeholder="Комментарий к доставке"></textarea>
          </div>

          <div class="card p-6 space-y-4">
            <h2 class="text-lg font-semibold">Оплата</h2>
            <div class="grid gap-4 md:grid-cols-2">
              <input class="input" type="text" placeholder="Номер карты" />
              <input class="input" type="text" placeholder="Имя на карте" />
              <input class="input" type="text" placeholder="MM/YY" />
              <input class="input" type="text" placeholder="CVC" />
            </div>
          </div>
        </form>

        <aside class="card p-6 h-fit">
          <h2 class="text-lg font-semibold">Ваш заказ</h2>
          <div class="mt-4 space-y-3 text-sm" :style="{ color: 'var(--muted)' }">
            <div class="flex justify-between">
              <span>Товары ({{ cartCount }})</span>
              <span>{{ formatPrice(cartTotal) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Доставка</span>
              <span>Рассчитаем при подтверждении</span>
            </div>
            <div class="flex justify-between text-lg font-semibold" :style="{ color: 'var(--text)' }">
              <span>Итого</span>
              <span>{{ formatPrice(cartTotal) }}</span>
            </div>
          </div>
          <button class="btn btn-primary w-full mt-6" type="button">Подтвердить заказ</button>
          <p class="mt-3 text-xs" :style="{ color: 'var(--muted)' }">Нажимая кнопку, вы соглашаетесь с условиями оферты.</p>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '../composables/useCart'

const { cartTotal, cartCount } = useCart()

const formatPrice = (price: number) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(price)
</script>