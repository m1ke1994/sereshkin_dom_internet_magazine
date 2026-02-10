import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Catalog from '../views/Catalog.vue'
import Product from '../views/Product.vue'
import About from '../views/About.vue'
import Delivery from '../views/Delivery.vue'
import Warranty from '../views/Warranty.vue'
import Contacts from '../views/Contacts.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: Catalog
    },
    {
      path: '/product/:id',
      name: 'product',
      component: Product
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/delivery',
      name: 'delivery',
      component: Delivery
    },
    {
      path: '/warranty',
      name: 'warranty',
      component: Warranty
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
