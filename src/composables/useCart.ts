import { ref, computed, watch } from 'vue'
import type { Product } from '../data/products'

export interface CartItem {
  product: Product
  quantity: number
}

const CART_STORAGE_KEY = 'seryozhkin_dom_cart'

const cartItems = ref<CartItem[]>([])

function loadCart() {
  const stored = localStorage.getItem(CART_STORAGE_KEY)
  if (stored) {
    try {
      cartItems.value = JSON.parse(stored)
    } catch (e) {
      console.error('Failed to load cart:', e)
      cartItems.value = []
    }
  }
}

function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems.value))
}

loadCart()

watch(cartItems, saveCart, { deep: true })

export function useCart() {
  const addToCart = (product: Product, quantity: number = 1) => {
    const existingItem = cartItems.value.find(item => item.product.id === product.id)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cartItems.value.push({ product, quantity })
    }
  }

  const removeFromCart = (productId: number) => {
    const index = cartItems.value.findIndex(item => item.product.id === productId)
    if (index > -1) {
      cartItems.value.splice(index, 1)
    }
  }

  const updateQuantity = (productId: number, quantity: number) => {
    const item = cartItems.value.find(item => item.product.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
      }
    }
  }

  const clearCart = () => {
    cartItems.value = []
  }

  const cartTotal = computed(() => {
    return cartItems.value.reduce((total, item) => {
      return total + (item.product.price * item.quantity)
    }, 0)
  })

  const cartCount = computed(() => {
    return cartItems.value.reduce((count, item) => count + item.quantity, 0)
  })

  const isInCart = (productId: number) => {
    return cartItems.value.some(item => item.product.id === productId)
  }

  return {
    cartItems: computed(() => cartItems.value),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    isInCart
  }
}
