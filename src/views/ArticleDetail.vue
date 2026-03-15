<template>
  <div v-if="isLoading" class="section">
    <div class="container text-center">
      <h1 class="section-title">Загрузка статьи...</h1>
    </div>
  </div>

  <div v-else-if="article" class="section">
    <div class="container max-w-4xl space-y-8">
      <nav class="text-sm flex items-center gap-2" :style="{ color: 'var(--muted)' }">
        <RouterLink to="/" class="link">Главная</RouterLink>
        <span>/</span>
        <RouterLink to="/articles" class="link">Статьи</RouterLink>
        <span>/</span>
        <span>{{ article.title }}</span>
      </nav>

      <article class="card p-6 md:p-8 space-y-6">
        <header class="space-y-3">
          <p class="text-xs uppercase tracking-wide" :style="{ color: 'var(--muted)' }">{{ formatDate(article.created_at) }}</p>
          <h1 class="section-title">{{ article.title }}</h1>
          <p v-if="article.excerpt" class="section-subtitle">{{ article.excerpt }}</p>
        </header>

        <img
          v-if="article.image_url"
          :src="article.image_url"
          :alt="article.title"
          class="w-full rounded-2xl border object-cover max-h-[420px]"
          :style="{ borderColor: 'var(--border)' }"
        />

        <div class="prose max-w-none whitespace-pre-line text-base leading-relaxed" :style="{ color: 'var(--text)' }">
          {{ article.content }}
        </div>
      </article>
    </div>
  </div>

  <div v-else class="section">
    <div class="container text-center">
      <h1 class="section-title">Статья не найдена</h1>
      <p class="section-subtitle mt-3">{{ errorMessage || 'Попробуйте открыть другую статью.' }}</p>
      <RouterLink to="/articles" class="btn btn-primary mt-6">К списку статей</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { Article } from '../types/article'
import { api } from '../services/api'
import { brandName } from '../utils/brand'
import { applySeo, defaultSeoDescription } from '../utils/seo'

const route = useRoute()
const article = ref<Article | null>(null)
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)

const loadArticle = async () => {
  const slug = String(route.params.slug || '')
  if (!slug) {
    article.value = null
    return
  }

  isLoading.value = true
  errorMessage.value = null

  try {
    const loaded = await api.getArticleBySlug(slug)
    article.value = loaded
    if (loaded) {
      applySeo({
        title: `${loaded.title} - ${brandName}`,
        description: loaded.excerpt || loaded.content || defaultSeoDescription,
        image: loaded.image_url || '/icon-512.png',
      })
    }
  } catch {
    article.value = null
    errorMessage.value = 'Статья не найдена.'
    applySeo({
      title: `Статья не найдена - ${brandName}`,
      description: defaultSeoDescription,
    })
  } finally {
    isLoading.value = false
  }
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('ru-RU', { dateStyle: 'long' }).format(new Date(value))

watch(() => route.params.slug, () => {
  void loadArticle()
}, { immediate: true })
</script>
