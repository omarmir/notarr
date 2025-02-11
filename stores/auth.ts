import { defineStore } from 'pinia'
import type { FetchError } from 'ofetch'
import type { Result } from '~/types/result'

export const useAuthStore = defineStore('auth', () => {
  const isLoggingIn: Ref<boolean> = ref(false)
  const error: Ref<string | null> = ref(null)

  const verify = async () => {
    const isLoggedId = localStorage.getItem('isLoggedIn') === 'true'
    if (!isLoggedId) return false
    try {
      const verify = await $fetch<Result<boolean>>('/api/auth/verify')
      localStorage.setItem('isLoggedIn', verify.success.toString())
      return verify.success
    } catch (err) {
      console.log(err)
      error.value = (err as FetchError).data.message
      return false
    }
  }

  const login = async (secretKey: string | null) => {
    if (!secretKey) {
      error.value = 'Secret key is required'
      return
    }
    isLoggingIn.value = true
    try {
      await $fetch(`/api/auth/login`, {
        method: 'POST',
        body: { key: secretKey }
      })
      localStorage.setItem('isLoggedIn', 'true')
      navigateTo('/')
    } catch (err) {
      console.log(err)
      error.value = (err as FetchError).data.message
    } finally {
      isLoggingIn.value = false
    }
  }

  const logout = async () => {
    await $fetch('/api/auth/logout')
    localStorage.setItem('isLoggedIn', 'false')
    navigateTo('/login')
  }

  return {
    isLoggingIn,
    error,
    login,
    logout,
    verify
  }
})
