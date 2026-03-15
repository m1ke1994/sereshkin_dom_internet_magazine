<template>
  <div class="section">
    <div class="container space-y-10">
      <div>
        <h1 class="section-title">Контакты</h1>
        <p class="section-subtitle">Оставьте заявку через форму обратной связи, и мы свяжемся с вами для консультации или оформления заказа.</p>
      </div>

      <div class="grid gap-6 md:grid-cols-3">
        <div class="card p-6">
          <h3 class="text-lg font-semibold">Форма обратной связи</h3>
          <p class="section-subtitle">Используйте существующую форму сайта, чтобы отправить вопрос, заявку или запрос на расчет стоимости.</p>
        </div>
        <div class="card p-6">
          <h3 class="text-lg font-semibold">Индивидуальный проект</h3>
          <p class="section-subtitle">Мы поможем с дизайном и изготовлением настенных часов по индивидуальному проекту.</p>
        </div>
        <div class="card p-6">
          <h3 class="text-lg font-semibold">Доставка и сроки</h3>
          <p class="section-subtitle">Организуем надежную упаковку и доставку по Москве и России.</p>
        </div>
      </div>

      <form class="card p-6" novalidate @submit.prevent="submitContactRequest">
        <h2 class="text-xl font-semibold">Оставить заявку</h2>

        <div v-if="alert.message" class="mt-4 rounded-xl px-4 py-3 text-sm" :class="alertClass">
          {{ alert.message }}
        </div>

        <div class="mt-4 grid gap-4 md:grid-cols-2">
          <input v-model="form.name" class="input" type="text" placeholder="Имя" minlength="2" required />
          <input v-model="form.phone" class="input" type="tel" placeholder="Телефон" minlength="6" required />
          <input v-model="form.email" class="input md:col-span-2" type="email" placeholder="Email (необязательно)" />
          <textarea v-model="form.message" class="textarea md:col-span-2" rows="4" placeholder="Ваш вопрос" minlength="5" required></textarea>
        </div>
        <button class="btn btn-primary mt-4" type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Отправка...' : 'Оставить заявку' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { api } from '../services/api'

const form = reactive({
  name: '',
  phone: '',
  email: '',
  message: '',
})

const isSubmitting = ref(false)
const alert = reactive<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' })

const alertClass = computed(() => {
  if (alert.type === 'success') {
    return 'border border-emerald-200 bg-emerald-50 text-emerald-800'
  }
  return 'border border-red-200 bg-red-50 text-red-800'
})

const validateForm = () => {
  if (form.name.trim().length < 2) return 'Имя должно содержать минимум 2 символа.'
  if (form.phone.trim().length < 6) return 'Телефон должен содержать минимум 6 символов.'
  if (form.email.trim().length > 0) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(form.email.trim())) return 'Укажите корректный email.'
  }
  if (form.message.trim().length < 5) return 'Сообщение должно содержать минимум 5 символов.'
  return null
}

const resetForm = () => {
  form.name = ''
  form.phone = ''
  form.email = ''
  form.message = ''
}

const submitContactRequest = async () => {
  alert.type = null
  alert.message = ''

  const validationError = validateForm()
  if (validationError) {
    alert.type = 'error'
    alert.message = validationError
    return
  }

  isSubmitting.value = true
  try {
    await api.createContactRequest({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      message: form.message.trim(),
    })

    resetForm()
    alert.type = 'success'
    alert.message = 'Заявка на связь отправлена. Мы свяжемся с вами в ближайшее время.'
  } catch {
    alert.type = 'error'
    alert.message = 'Не удалось отправить заявку. Попробуйте еще раз.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
