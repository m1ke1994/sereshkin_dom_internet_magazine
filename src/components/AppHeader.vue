<template>
  <header class="site-header">
    <div class="container">
      <div class="flex items-center justify-between py-4">
        <RouterLink
          to="/"
          class="inline-flex items-center gap-3 text-xl md:text-2xl font-semibold tracking-tight"
          aria-label="Eco-Hour"
        >
          <Logo />
          <span>{{ brandName }}</span>
        </RouterLink>

        <nav class="hidden lg:flex items-center gap-6">
          <RouterLink to="/" class="nav-link" active-class="nav-link-active">Главная</RouterLink>
          <RouterLink to="/catalog" class="nav-link" active-class="nav-link-active">Каталог</RouterLink>
          <RouterLink to="/articles" class="nav-link" active-class="nav-link-active">Статьи</RouterLink>
          <RouterLink to="/about" class="nav-link" active-class="nav-link-active">О компании</RouterLink>
          <RouterLink to="/delivery" class="nav-link" active-class="nav-link-active">Доставка</RouterLink>
          <RouterLink to="/warranty" class="nav-link" active-class="nav-link-active">Обмен и возврат</RouterLink>
          <RouterLink to="/care" class="nav-link" active-class="nav-link-active">Уход</RouterLink>
          <RouterLink to="/contacts" class="nav-link" active-class="nav-link-active">Контакты</RouterLink>
        </nav>

        <div class="flex items-center gap-2">
          <ThemeToggle />
          <RouterLink to="/cart" class="btn btn-ghost relative" aria-label="Корзина">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 6h15l-2 9H8L6 6Z" />
              <path d="M6 6L4 3H2" />
              <circle cx="9" cy="20" r="1.6" />
              <circle cx="18" cy="20" r="1.6" />
            </svg>
            <span v-if="cartCount > 0" class="absolute -top-1 -right-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-emerald-600 px-1 text-[11px] font-semibold text-white">
              {{ cartCount }}
            </span>
          </RouterLink>
          <button class="btn btn-ghost lg:hidden" type="button" @click="mobileOpen = !mobileOpen" aria-label="Меню">
            <svg v-if="!mobileOpen" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      </div>

      <div v-if="mobileOpen" class="lg:hidden pb-4">
        <div class="card p-4 space-y-4">
          <RouterLink
            to="/"
            class="inline-flex items-center gap-3 text-lg font-semibold tracking-tight"
            aria-label="Eco-Hour"
            @click="closeMenu"
          >
            <Logo />
            <span>{{ brandName }}</span>
          </RouterLink>
          <nav class="flex flex-col gap-3">
            <RouterLink to="/" class="nav-link" @click="closeMenu">Главная</RouterLink>
            <RouterLink to="/catalog" class="nav-link" @click="closeMenu">Каталог</RouterLink>
            <RouterLink to="/articles" class="nav-link" @click="closeMenu">Статьи</RouterLink>
            <RouterLink to="/about" class="nav-link" @click="closeMenu">О компании</RouterLink>
            <RouterLink to="/delivery" class="nav-link" @click="closeMenu">Доставка</RouterLink>
            <RouterLink to="/warranty" class="nav-link" @click="closeMenu">Обмен и возврат</RouterLink>
            <RouterLink to="/care" class="nav-link" @click="closeMenu">Уход</RouterLink>
            <RouterLink to="/contacts" class="nav-link" @click="closeMenu">Контакты</RouterLink>
          </nav>
          <RouterLink to="/contacts" class="btn btn-secondary w-full" @click="closeMenu">Оставить заявку</RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCart } from '../composables/useCart'
import { brandName } from '../utils/brand'
import Logo from './Logo.vue'
import ThemeToggle from './ThemeToggle.vue'

const { cartCount } = useCart()
const mobileOpen = ref(false)

const closeMenu = () => {
  mobileOpen.value = false
}
</script>
