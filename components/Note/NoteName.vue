<template>
  <div class="flex flex-col">
    <div class="flex flex-row flex-wrap justify-between gap-2">
      <h1>
        <input
          v-model="note"
          class="bg-transparent text-xl font-semibold text-gray-900 focus:italic focus:outline-none dark:text-gray-200"
          aria-label="Rename name"
          aria-details="Allows you to rename the note" />
      </h1>
      <div class="flex flex-row gap-4">
        <CommonThemeButton
          v-if="isRenaming"
          :show-loading="true"
          :is-loading="actionPending"
          :disabled="savingState === 'pending'"
          @click="renameNote">
          Rename
        </CommonThemeButton>
        <CommonThemeButton theme="danger" @click="deleteDialog = true">Delete</CommonThemeButton>
      </div>
    </div>
    <CommonDangerAlert v-if="error" class="mb-4 w-full">{{ error }}</CommonDangerAlert>
    <CommonBaseDialog
      v-model="deleteDialog"
      theme="danger"
      title="Delete Note"
      desc="Are you sure you want to delete this note?">
      <div class="flex flex-row justify-end gap-4">
        <CommonThemeButton class="py-2" theme="danger" @click="deleteNote()">Delete</CommonThemeButton>
        <CommonThemeButton class="py-2" @click="deleteDialog = false">Cancel</CommonThemeButton>
      </div>
    </CommonBaseDialog>
  </div>
</template>
<script lang="ts" setup>
import type { SavingState } from '~/types/notebook'

const { name, notebook, savingState } = defineProps<{ name: string; savingState: SavingState; notebook: string }>()

const store = useNoteStore()
const notebookStore = useNotebookStore()

const note = ref(name)
// const router = useRouter()

const isRenaming = computed(() => name !== note.value)
const error: Ref<string | null> = ref(null)
const deleteError: Ref<string | null> = ref(null)
const actionPending = defineModel<boolean>({ required: true })
const deleteDialog = ref(false)

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
  const resp = await store.deleteNote(notebook, name, notebookStore.currentNotebook)
  if (resp.success) {
    deleteError.value = null
    navigateTo('/')
    deleteDialog.value = true
  } else {
    deleteError.value = resp.message
  }
  actionPending.value = true
}
</script>
