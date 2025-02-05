<template>
  <form @submit.prevent="addNotebook" class="w-full grow">
    <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only"
      >Search</label
    >
    <div class="relative">
      <div
        class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4 text-gray-500"
          viewBox="0 0 1024 1024">
          <path
            fill="currentColor"
            d="M192 128v768h640V128zm-32-64h704a32 32 0 0 1 32 32v832a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32" />
          <path
            fill="currentColor"
            d="M672 128h64v768h-64zM96 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32m0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32m0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32m0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32" />
        </svg>
      </div>
      <input
        type="text"
        id="name"
        v-model="newBook"
        name="name"
        class="block w-full p-2 ps-10 pe-16 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Notebook name"
        required />
      <button
        type="submit"
        class="text-gray-900 absolute end-2.5 bottom-1.5 bg-neutral-200 hover:bg-neutral-300 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg text-xs px-4 py-1">
        Add
      </button>
    </div>
  </form>
</template>
<script lang="ts" setup>
import type { Notebook } from "~/types/notebook"
import { FetchError } from "ofetch"

const emit = defineEmits<{
  (e: "added", payload: Notebook): void
  (e: "error", payload: string): void
}>()

const newBook = ref("")

const addNotebook = async (e: any) => {
  try {
    const name = newBook.value
    const resp = await $fetch<Notebook>("/api/notebooks", {
      method: "POST",
      body: { name },
    })
    emit("added", resp)
    newBook.value = ""
  } catch (error) {
    emit("error", (error as FetchError).data.message)
  }
}
</script>
