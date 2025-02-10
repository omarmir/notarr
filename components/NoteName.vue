<template>
  <div class="flex flex-col">
    <div class="flex flex-row flex-wrap justify-between gap-2">
      <h1>
        <input
          v-model="note"
          class="bg-transparent text-xl font-semibold text-gray-900 focus:italic focus:outline-none"
          aria-label="Rename name"
          aria-details="Allows you to rename the note" />
      </h1>
      <div class="flex flex-row gap-4">
        <CommonButton
          v-if="isRenaming"
          :show-loading="true"
          :is-loading="actionPending"
          :disabled="savingState === 'pending'"
          @click="renameNote">
          Rename
        </CommonButton>
        <button
          type="button"
          class="rounded-md bg-red-500 px-2 py-1 text-sm font-medium text-white hover:bg-red-600"
          @click="deleteNote()">
          Delete
        </button>
      </div>
    </div>
    <DangerAlert v-if="error" class="w-full">{{ error }}</DangerAlert>
  </div>
</template>
<script lang="ts" setup>
import type { SavingState } from '~/types/notebook'

const { name, notebook, savingState } = defineProps<{ name: string; savingState: SavingState; notebook: string }>()

const store = useNotebookStore()

const note = ref(name)
// const router = useRouter()

const isRenaming = computed(() => name !== note.value)
const error: Ref<string | null> = ref(null)
const actionPending = defineModel<boolean>({ required: true })

const renameNote = async () => {
  actionPending.value = true
  const resp = await store.renameNote(notebook, name, note.value)
  if (resp.success) {
    error.value = null
    navigateTo(resp.data.newName)
  } else {
    error.value = resp.message
  }
}

const deleteNote = async () => {
  actionPending.value = true
  const resp = await store.deleteNote(notebook, name)
  if (resp.success) {
    navigateTo('/')
  } else {
    error.value = null
    error.value = resp.message
  }
}
</script>
