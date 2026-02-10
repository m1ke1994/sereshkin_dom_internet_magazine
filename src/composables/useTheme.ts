import { ref, watch, onMounted } from 'vue'

const THEME_STORAGE_KEY = 'seryozhkin_dom_theme'

const isDark = ref(false)

export function useTheme() {
  const loadTheme = () => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    isDark.value = stored === 'dark'
    updateHtmlClass()
  }

  const updateHtmlClass = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    localStorage.setItem(THEME_STORAGE_KEY, isDark.value ? 'dark' : 'light')
    updateHtmlClass()
  }

  onMounted(() => {
    loadTheme()
  })

  watch(isDark, () => {
    updateHtmlClass()
  })

  return {
    isDark,
    toggleTheme,
    loadTheme
  }
}
