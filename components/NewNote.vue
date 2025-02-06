<template>
  <form class="w-full grow" @submit.prevent="addNotebook">
    <label for="search" class="sr-only mb-2 text-sm font-medium text-gray-900">Note</label>
    <div class="relative mr-4">
      <input
        id="name"
        v-model="newNote"
        type="text"
        name="name"
        class="my-2 block w-full rounded-md border border-gray-700 bg-transparent p-2 pe-16 ps-2 text-sm text-gray-400 focus:border-blue-500 focus:ring-blue-500"
        placeholder="Note"
        required />
      <button
        type="submit"
        class="absolute bottom-1.5 end-2.5 rounded-md bg-neutral-200 px-4 py-1 text-xs font-medium text-gray-900 hover:bg-neutral-300 focus:outline-none focus:ring-4 focus:ring-neutral-300">
        Add
      </button>
    </div>
    <DangerAlert v-if="error" class="mr-4">{{ error }}</DangerAlert>
  </form>
</template>
<script lang="ts" setup>
import { useNotebookStore } from '~/stores/notebooks'

const store = useNotebookStore()

const newNote: Ref<string | null> = ref('')
const error: Ref<string | null> = ref(null)

const addNotebook = async () => {
  if (!store.currentNotebook) return
  if (!newNote.value) {
    error.value = 'Name is required'
    return
  }

  const resp = await store.addNote(store.currentNotebook, newNote.value)

  if (resp.success) {
    newNote.value = null
    error.value = null
  } else {
    error.value = resp.message
  }
}
</script>
