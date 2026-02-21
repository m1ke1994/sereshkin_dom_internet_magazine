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
        <form class="space-y-6" novalidate @submit.prevent="submitOrder">
          <div v-if="alert.message" class="rounded-xl px-4 py-3 text-sm" :class="alertClass">
            {{ alert.message }}
          </div>

          <div class="card p-6 space-y-4">
            <h2 class="text-lg font-semibold">Контактные данные</h2>
            <div class="grid gap-4 md:grid-cols-2">
              <input v-model="form.name" class="input" type="text" placeholder="Имя" minlength="2" required />
              <input v-model="form.surname" class="input" type="text" placeholder="Фамилия" minlength="2" required />
              <input v-model="form.email" class="input" type="email" placeholder="Email (необязательно)" />
              <input v-model="form.phone" class="input" type="tel" placeholder="Телефон" minlength="6" required />
            </div>
          </div>

          <div class="card p-6 space-y-4">
            <h2 class="text-lg font-semibold">Доставка</h2>
            <div class="grid gap-4 md:grid-cols-2">
              <input v-model="form.city" class="input" type="text" placeholder="Город" minlength="2" required />
              <input v-model="form.street" class="input" type="text" placeholder="Улица" minlength="2" required />
              <input v-model="form.home" class="input" type="text" placeholder="Дом / Квартира" minlength="1" required />
              <input v-model="form.zip" class="input" type="text" placeholder="Индекс" pattern="^[0-9]{6}$" required />
            </div>
            <textarea v-model="form.comment" class="textarea" rows="3" placeholder="Комментарий к доставке" maxlength="400"></textarea>
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
          <button class="btn btn-primary w-full mt-6" type="button" :disabled="isSubmitting" @click="submitOrder">
            {{ isSubmitting ? 'Отправка...' : 'Подтвердить заказ' }}
          </button>
          <p class="mt-3 text-xs" :style="{ color: 'var(--muted)' }">Нажимая кнопку, вы соглашаетесь с условиями оферты.</p>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { api } from '../services/api'
import { useCart } from '../composables/useCart'

const { cartItems, cartTotal, cartCount, clearCart } = useCart()

const form = reactive({
  name: '',
  surname: '',
  email: '',
  phone: '',
  city: '',
  street: '',
  home: '',
  zip: '',
  comment: '',
})

const isSubmitting = ref(false)
const alert = reactive<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' })

const alertClass = computed(() => {
  if (alert.type === 'success') {
    return 'border border-emerald-200 bg-emerald-50 text-emerald-800'
  }
  return 'border border-red-200 bg-red-50 text-red-800'
})

const formatPrice = (price: number) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(price)

const validateForm = () => {
  if (!cartItems.value.length) return 'Корзина пуста. Добавьте товар перед оформлением.'
  if (form.name.trim().length < 2) return 'Имя должно содержать минимум 2 символа.'
  if (form.surname.trim().length < 2) return 'Фамилия должна содержать минимум 2 символа.'
  if (form.phone.trim().length < 6) return 'Телефон должен содержать минимум 6 символов.'

  if (form.email.trim().length > 0) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(form.email.trim())) return 'Укажите корректный email.'
  }

  if (form.city.trim().length < 2 || form.street.trim().length < 2 || form.home.trim().length < 1) {
    return 'Заполните адрес доставки.'
  }

  if (!/^[0-9]{6}$/.test(form.zip.trim())) return 'Индекс должен состоять из 6 цифр.'

  return null
}

const buildAddress = () => `${form.city.trim()}, ${form.street.trim()}, ${form.home.trim()}, ${form.zip.trim()}`

const resetForm = () => {
  form.name = ''
  form.surname = ''
  form.email = ''
  form.phone = ''
  form.city = ''
  form.street = ''
  form.home = ''
  form.zip = ''
  form.comment = ''
}

const submitOrder = async () => {
  alert.type = null
  alert.message = ''

  const validationError = validateForm()
  if (validationError) {
    alert.type = 'error'
    alert.message = validationError
    return
  }

  isSubmitting.value = true

  const customerName = `${form.name.trim()} ${form.surname.trim()}`.trim()

  try {
    await api.createOrder({
      name: customerName,
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      address: buildAddress(),
      comment: form.comment.trim() || undefined,
      items: cartItems.value.map((item) => ({
        id: item.product.id,
        title: item.product.title,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total_price: Number(cartTotal.value.toFixed(2)),
    })

    clearCart()
    resetForm()

    alert.type = 'success'
    alert.message = 'Заявка успешно отправлена'
  } catch {
    alert.type = 'error'
    alert.message = 'Не удалось отправить заявку. Попробуйте еще раз.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
