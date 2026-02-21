<template>
  <div class="section">
    <div class="container space-y-10">
      <div>
        <h1 class="section-title">Контакты</h1>
        <p class="section-subtitle">Мы на связи каждый день с 10:00 до 20:00.</p>
      </div>

      <div class="grid gap-6 md:grid-cols-3">
        <div class="card p-6">
          <h3 class="text-lg font-semibold">Адрес офиса</h3>
          <p class="section-subtitle">Москва, ул. Петровка, 12</p>
        </div>
        <div class="card p-6">
          <h3 class="text-lg font-semibold">Телефон</h3>
          <p class="section-subtitle">+7 (999) 123-45-67</p>
        </div>
        <div class="card p-6">
          <h3 class="text-lg font-semibold">Почта</h3>
          <p class="section-subtitle">hello@watch-store.example</p>
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
          {{ isSubmitting ? 'Отправка...' : 'Отправить' }}
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
