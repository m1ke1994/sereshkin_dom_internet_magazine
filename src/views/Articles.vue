<template>
  <div class="section">
    <div class="container space-y-10">
      <div>
        <h1 class="section-title">Статьи</h1>
        <p class="section-subtitle">Полезные материалы о выборе, использовании и уходе за настенными часами.</p>
      </div>

      <div v-if="isLoading" class="card p-8 text-center">Загрузка статей...</div>
      <div v-else-if="errorMessage" class="card p-8 text-center">{{ errorMessage }}</div>
      <div v-else-if="articles.length" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article v-for="item in articles" :key="item.id" class="card card-hover p-6 flex flex-col gap-4">
          <img
            v-if="item.image_url"
            :src="item.image_url"
            :alt="item.title"
            class="h-44 w-full rounded-2xl object-cover border"
            :style="{ borderColor: 'var(--border)' }"
          />
          <div class="space-y-2 flex-1">
            <h2 class="text-xl font-semibold leading-snug">{{ item.title }}</h2>
            <p class="text-xs uppercase tracking-wide" :style="{ color: 'var(--muted)' }">{{ formatDate(item.created_at) }}</p>
            <p class="section-subtitle text-base">{{ item.excerpt || truncate(item.content, 160) }}</p>
          </div>
          <RouterLink class="btn btn-secondary w-full" :to="`/articles/${item.slug}`">Читать статью</RouterLink>
        </article>
      </div>
      <div v-else class="card p-8 text-center">Статьи пока не добавлены.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Article } from '../types/article'
import { api } from '../services/api'

const articles = ref<Article[]>([])
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)

const loadArticles = async () => {
  isLoading.value = true
  errorMessage.value = null
  try {
    articles.value = await api.getArticles()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Не удалось загрузить статьи.'
  } finally {
    isLoading.value = false
  }
}

const truncate = (value: string, maxLength: number) => {
  if (!value) return ''
  if (value.length <= maxLength) return value
  return `${value.slice(0, maxLength).trim()}...`
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('ru-RU', { dateStyle: 'medium' }).format(new Date(value))

onMounted(() => {
  void loadArticles()
})
</script>
