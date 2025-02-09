<template>
  <form class="w-full grow" @submit.prevent="addNotebook">
    <label for="search" class="sr-only mb-2 text-sm font-medium text-gray-900">Note</label>
    <div class="relative mr-4 max-w-lg">
      <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-5 text-gray-400" viewBox="0 0 24 24">
          <path fill="currentColor" d="M4 22V2h10l6 6v14zm9-13V4H6v16h12V9zM6 4v5zv16z" />
        </svg>
      </div>
      <input
        id="name"
        v-model="newNote"
        :class="{ 'border-gray-300 text-gray-900': onBackground, 'border-gray-700 text-gray-400': !onBackground }"
        type="text"
        name="name"
        class="my-2 block w-full rounded-md border bg-transparent p-2 pe-16 ps-10 text-sm focus:outline-0 focus:ring-1"
        placeholder="Note"
        required />
      <button
        type="submit"
        class="absolute bottom-1.5 end-2.5 rounded-md bg-[#306cfe] px-4 py-1 text-xs font-medium text-white hover:bg-[#314cfe] focus:outline-none focus:ring-4 focus:ring-neutral-300">
        Add
      </button>
    </div>
    <DangerAlert v-if="error" class="mr-4">{{ error }}</DangerAlert>
  </form>
</template>
<script lang="ts" setup>
import { useNotebookStore } from '~/stores/notebooks'
import type { Note } from '~/types/notebook'
const { notebook, onBackground = false } = defineProps<{ notebook: string; onBackground?: boolean }>()
const store = useNotebookStore()

const newNote: Ref<string | null> = ref('')
const error: Ref<string | null> = ref(null)
const emit = defineEmits<{
  (e: 'added', payload: Note): void
}>()
const addNotebook = async () => {
  if (!newNote.value) {
    error.value = 'Name is required.'
    return
  }

  const resp = await store.addNote(notebook, newNote.value)

  if (resp.success) {
    newNote.value = null
    error.value = null
    emit('added', resp.data)
  } else {
    error.value = resp.message
  }
}
</script>
