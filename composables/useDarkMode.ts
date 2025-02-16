const lsIsDark: boolean = (localStorage.getItem('isDark') ?? 'false') === 'true' //its stored as a string must compare as string.

export function useDarkMode() {
  const isDarkModeEnabled: Ref<boolean> = ref(lsIsDark)

  const toggleDarkMode = () => {
    isDarkModeEnabled.value = !isDarkModeEnabled.value
    localStorage.setItem('isDark', isDarkModeEnabled.value.toString())

    document.documentElement.classList.toggle('dark')
  }

  const setInitialDarkMode = () => {
    if (lsIsDark && !document.documentElement.classList.contains('dark')) document.documentElement.classList.add('dark')
  }

  return {
    toggleDarkMode,
    isDarkModeEnabled,
    setInitialDarkMode
  }
}
