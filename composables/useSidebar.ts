import { ref } from 'vue'
import type { Ref } from 'vue'

const isSideMenuOpen: Ref<boolean> = ref(false)

export function useSidebar() {
  const toggleSideMenu = () => {
    isSideMenuOpen.value = !isSideMenuOpen.value
  }

  const outsideClick = () => {
    if (isSideMenuOpen.value) {
      isSideMenuOpen.value = false
      isSidebarOpen.value = isSideMenuOpen.value
    }
  }

  const isSidebarOpen: Ref<boolean> = isSideMenuOpen

  return {
    toggleSideMenu,
    isSidebarOpen,
    outsideClick
  }
}
