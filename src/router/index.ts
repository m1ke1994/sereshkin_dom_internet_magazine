import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Catalog from '../views/Catalog.vue'
import Product from '../views/Product.vue'
import About from '../views/About.vue'
import Delivery from '../views/Delivery.vue'
import Warranty from '../views/Warranty.vue'
import Care from '../views/Care.vue'
import Articles from '../views/Articles.vue'
import ArticleDetail from '../views/ArticleDetail.vue'
import Contacts from '../views/Contacts.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'
import { brandName } from '../utils/brand'
import { applySeo, defaultSeoDescription } from '../utils/seo'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        seoTitle: `${brandName} - интернет-магазин настенных часов`,
        seoDescription: defaultSeoDescription,
      },
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: Catalog,
      meta: {
        seoTitle: `Каталог настенных часов - ${brandName}`,
        seoDescription: `${brandName} — каталог настенных часов из дерева, интерьерных моделей и часов под заказ.`,
      },
    },
    {
      path: '/product/:slug',
      name: 'product',
      component: Product,
      meta: {
        seoTitle: `Карточка товара - ${brandName}`,
        seoDescription: defaultSeoDescription,
      },
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        seoTitle: `Часы под заказ - ${brandName}`,
        seoDescription: `${brandName} — магазин настенных часов и мастерская индивидуальных проектов с собственным производством и контролем качества.`,
      },
    },
    {
      path: '/delivery',
      name: 'delivery',
      component: Delivery,
      meta: {
        seoTitle: `Доставка и сроки - ${brandName}`,
        seoDescription: `${brandName} работает с розничными и оптовыми заказами, обеспечивает надежную упаковку и доставку по Москве и России.`,
      },
    },
    {
      path: '/warranty',
      name: 'warranty',
      component: Warranty,
      meta: {
        seoTitle: `Обмен и возврат - ${brandName}`,
        seoDescription: `${brandName} — условия обмена и возврата товаров, приобретенных дистанционным способом.`,
      },
    },
    {
      path: '/care',
      name: 'care',
      component: Care,
      meta: {
        seoTitle: `Рекомендации по уходу - ${brandName}`,
        seoDescription: `${brandName} — рекомендации по уходу за настенными часами и правила аккуратной эксплуатации.`,
      },
    },
    {
      path: '/articles',
      name: 'articles',
      component: Articles,
      meta: {
        seoTitle: `Статьи - ${brandName}`,
        seoDescription: `${brandName} — статьи о выборе настенных часов, уходе и интерьерных решениях.`,
      },
    },
    {
      path: '/articles/:slug',
      name: 'article-detail',
      component: ArticleDetail,
      meta: {
        seoTitle: `Статья - ${brandName}`,
        seoDescription: `${brandName} — полезные материалы о настенных часах и уходе за ними.`,
      },
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts,
      meta: {
        seoTitle: `Контакты - ${brandName}`,
        seoDescription: `Оставьте заявку в ${brandName}, чтобы уточнить стоимость, сроки и параметры заказа на настенные часы.`,
      },
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
      meta: {
        seoTitle: `Корзина - ${brandName}`,
        seoDescription: `${brandName} — корзина с выбранными настенными часами и товарами для оформления заказа.`,
      },
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
      meta: {
        seoTitle: `Оформление заказа - ${brandName}`,
        seoDescription: `${brandName} — оформление заказа на настенные часы и индивидуальные проекты.`,
      },
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  applySeo({
    title: typeof to.meta.seoTitle === 'string' ? to.meta.seoTitle : undefined,
    description: typeof to.meta.seoDescription === 'string' ? to.meta.seoDescription : undefined,
  })
})

export default router
