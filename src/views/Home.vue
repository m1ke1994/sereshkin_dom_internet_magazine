<template>
  <div>
    <section class="section">
      <div class="container grid gap-10 lg:grid-cols-2 items-center">
        <div class="space-y-6">
          <span class="badge">Eco-Hour</span>
          <h1 class="text-4xl md:text-6xl font-semibold leading-tight">
            {{ brandName }} — настенные часы и часы под заказ
          </h1>
          <p class="section-subtitle">
            Магазин настенных часов из дерева и мастерская индивидуальных проектов. Подберем готовую модель или изготовим часы по вашему макету с доставкой по Москве и России.
          </p>
          <div class="flex flex-wrap gap-3">
            <RouterLink to="/catalog" class="btn btn-primary">Смотреть каталог</RouterLink>
            <RouterLink to="/contacts" class="btn btn-secondary">Заказать консультацию</RouterLink>
          </div>
          <div class="grid gap-4 sm:grid-cols-3">
            <div class="card p-4 text-sm">Индивидуальный дизайн</div>
            <div class="card p-4 text-sm">Розница и опт</div>
            <div class="card p-4 text-sm">Доставка по Москве и России</div>
          </div>
        </div>
        <div class="card p-6">
          <div class="product-image-wrap">
            <img
              :src="heroImage"
              :alt="heroProduct?.title || 'Eco-Hour'"
              class="product-image"
            />
          </div>
          <div class="mt-6 grid gap-3">
            <p class="text-sm" :style="{ color: 'var(--muted)' }">Модель недели</p>
            <h2 class="text-2xl font-semibold">{{ heroProduct?.title || 'Модель недели' }}</h2>
            <p class="section-subtitle">{{ heroProduct?.short_description || heroProduct?.description || 'Актуальная подборка на этой неделе.' }}</p>
            <RouterLink v-if="heroProduct" :to="`/product/${heroProduct.slug}`" class="btn btn-primary">
              Смотреть модель
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 class="section-title">Основные модели</h2>
            <p class="section-subtitle">Настенные часы для дома, офиса и коммерческих пространств.</p>
          </div>
          <RouterLink to="/catalog?type=main" class="btn btn-secondary">Открыть раздел</RouterLink>
        </div>

        <div v-if="isLoading" class="mt-8 card p-8 text-center">Загрузка товаров...</div>
        <div v-else-if="mainProducts.length" class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ProductCard v-for="product in mainProducts" :key="product.id" :product="product" />
        </div>
        <div v-else class="mt-8 card p-8 text-center">Основные модели пока не добавлены.</div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 class="section-title">Эксклюзив</h2>
            <p class="section-subtitle">Интерьерные модели с выразительным дизайном и декоративным характером.</p>
          </div>
          <RouterLink to="/catalog?type=exclusive" class="btn btn-secondary">Открыть раздел</RouterLink>
        </div>

        <div v-if="errorMessage" class="mt-8 card p-8 text-center">{{ errorMessage }}</div>
        <div v-else-if="exclusiveProducts.length" class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ProductCard v-for="product in exclusiveProducts" :key="product.id" :product="product" />
        </div>
        <div v-else class="mt-8 card p-8 text-center">Эксклюзивные модели пока не добавлены.</div>
      </div>
    </section>

    <section class="section">
      <div class="container grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div class="card p-6 space-y-4">
          <h2 class="section-title">Настенные часы под заказ с индивидуальным дизайном</h2>
          <p class="section-subtitle">
            Мы предлагаем максимально широкие возможности для создания настенных часов: конструкции любой формы, размера и цвета; из любого деревянного материала. Все изделия разрабатываются по индивидуальному проекту, но также возможно применение стандартных решений или использование макета заказчика.
          </p>
          <p class="section-subtitle">
            Изготовление часов происходит на собственном оборудовании, каждый этап работы контролируется специалистами, что позволяет добиваться высокого качества, точности и аккуратного исполнения.
          </p>
          <p class="section-subtitle">
            Вы можете быть уверены, что заказ будет выполнен качественно, быстро и точно в срок. На итоговую стоимость влияют сложность макета, размер партии, материалы и механизм.
          </p>
          <div class="flex flex-wrap gap-3">
            <RouterLink to="/contacts" class="btn btn-primary">Оставить заявку</RouterLink>
            <RouterLink to="/about" class="btn btn-secondary">Подробнее</RouterLink>
          </div>
        </div>

        <div class="grid gap-4">
          <div class="card p-6 space-y-3">
            <h3 class="text-lg font-semibold">Как заказать настенные часы?</h3>
            <p class="section-subtitle">
              Если вам нужна оригинальная форма, другой размер или расчет стоимости, свяжитесь с нами удобным способом или оставьте заявку через форму обратной связи.
            </p>
            <RouterLink to="/contacts" class="btn btn-secondary">Связаться с нами</RouterLink>
          </div>
          <div class="card p-6 space-y-3">
            <h3 class="text-lg font-semibold">Доставка и формат продаж</h3>
            <p class="section-subtitle">
              Работаем с розничными и оптовыми заказами, без минимальной суммы для частных клиентов. Организуем надежную упаковку и доставку по Москве и России.
            </p>
          </div>
          <div class="card p-6 space-y-3">
            <h3 class="text-lg font-semibold">Сроки</h3>
            <p class="section-subtitle">
              Стандартный заказ занимает 3–5 рабочих дней. Крупные партии и срочные проекты обсуждаются индивидуально.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section pt-0">
      <div class="container">
        <div class="max-w-3xl">
          <h2 class="section-title">Наши преимущества</h2>
          <p class="section-subtitle">
            Eco-Hour сочетает готовый каталог, индивидуальное производство и понятный путь оформления заказа.
          </p>
        </div>

        <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <div class="card p-5 text-sm">Бесплатная консультация и обратная связь по заявке с сайта.</div>
          <div class="card p-5 text-sm">Помощь с техническим макетом и сопровождение проекта.</div>
          <div class="card p-5 text-sm">Широкий выбор материалов в зависимости от модели и задачи.</div>
          <div class="card p-5 text-sm">Качественные механизмы и надежные комплектующие.</div>
          <div class="card p-5 text-sm">Соблюдение сроков и внимательное отношение к деталям заказа.</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { useCatalogData } from '../composables/useCatalogData'
import { brandName } from '../utils/brand'
import { getProductImage } from '../utils/productImage'

const { products, isLoading, errorMessage, loadCatalog } = useCatalogData()

onMounted(() => {
  void loadCatalog()
})

const heroProduct = computed(() =>
  products.value.find(item => item.model_of_week && item.in_stock) ||
  products.value.find(item => item.in_stock) ||
  products.value[0] ||
  null
)
const heroImage = computed(() => getProductImage(heroProduct.value))

const mainProducts = computed(() =>
  products.value
    .filter(item => item.product_type === 'main' && item.in_stock)
    .slice(0, 4)
)

const exclusiveProducts = computed(() =>
  products.value
    .filter(item => item.product_type === 'exclusive' && item.in_stock)
    .slice(0, 4)
)
</script>
