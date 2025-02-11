<template>
  <CommonBaseCard class="p-8">
    <form class="flex flex-col gap-2" @submit.prevent="login()">
      <div class="mb-4 flex shrink-0 items-center justify-start gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-10" viewBox="0 0 50 50">
          <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <path
              stroke="#306cfe"
              d="M39.583 6.25H10.417c-1.15 0-2.084.933-2.084 2.083v33.334c0 1.15.933 2.083 2.084 2.083h29.166c1.15 0 2.084-.933 2.084-2.083V8.333c0-1.15-.933-2.083-2.084-2.083" />
            <path
              stroke="#344054"
              d="M10.417 6.25h6.25v37.5h-6.25a2.083 2.083 0 0 1-2.084-2.083V8.333a2.083 2.083 0 0 1 2.084-2.083" />
          </g>
        </svg>
        <h1 class="text-xl font-bold text-gray-900">notarr</h1>
      </div>
      <label class="text-sm font-medium">Secret Key</label>
      <div class="relative">
        <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 50 50">
            <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path
                stroke="#344054"
                d="M25 35.417v-2.084m3.125-3.125a3.125 3.125 0 1 1-6.25 0a3.125 3.125 0 0 1 6.25 0" />
              <path
                stroke="#306cfe"
                d="M39.583 41.667V20.833c0-1.15-.932-2.083-2.083-2.083h-25c-1.15 0-2.083.933-2.083 2.083v20.834c0 1.15.932 2.083 2.083 2.083h25c1.15 0 2.083-.933 2.083-2.083m-6.25-22.917v-4.167a8.333 8.333 0 1 0-16.666 0v4.167" />
            </g>
          </svg>
        </div>
        <input
          id="secret-key"
          v-model="secretKey"
          type="text"
          name="secret-key"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pe-16 ps-10 text-sm text-gray-900 focus:outline-0 focus:ring-1"
          placeholder="Secret Key"
          required />
      </div>
      <CommonThemeButton type="submit" class="flex self-end py-2">Login</CommonThemeButton>
    </form>
  </CommonBaseCard>
</template>
<script lang="ts" setup>
import type { FetchError } from 'ofetch'

definePageMeta({
  layout: 'auth'
})

const secretKey: Ref<string | null> = ref(null)
const isLoggingIn: Ref<boolean> = ref(false)
const error: Ref<string | null> = ref(null)

const login = async () => {
  isLoggingIn.value = true
  try {
    await $fetch(`/api/auth/login`, {
      method: 'POST',
      body: { key: secretKey.value }
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
</script>
