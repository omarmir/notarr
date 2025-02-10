<template>
  <CommonBaseCard>
    <!-- card header -->
    <div class="flex min-h-[70px] flex-wrap items-stretch justify-between bg-transparent px-9 pb-0 pt-5">
      <h3 class="text-dark m-2 ml-0 flex flex-col items-start justify-center">
        <span class="mr-3 text-lg font-medium">Notebooks</span>
        <span class="font-base mt-1 text-sm text-gray-400">All notebooks</span>
      </h3>
      <div class="min-w-xs relative my-2 flex w-1/3 min-w-72 flex-wrap items-center">
        <div class="relative my-2 flex w-full flex-wrap items-center">
          <NotebookNewNotebook @error="notebookAddedError"></NotebookNewNotebook>
        </div>
      </div>
    </div>
    <!-- end card header -->
    <!-- card body  -->
    <CommonDangerAlert v-if="error">
      {{ error }}
    </CommonDangerAlert>
    <div class="block flex-auto px-9 py-8 pt-6">
      <div class="overflow-x-auto">
        <table class="text-dark my-0 w-full border-neutral-200 align-middle">
          <thead class="align-bottom">
            <tr class="text-secondary-dark text-[0.95rem]">
              <th class="pb-3 text-start text-xs font-medium uppercase text-gray-400">Notebook</th>
              <th class="hidden pb-3 text-center text-xs font-medium uppercase text-gray-400 lg:table-cell">Created</th>
              <th class="hidden pb-3 text-center text-xs font-medium uppercase text-gray-400 lg:table-cell">Updated</th>
              <th class="pb-3 text-center text-xs font-medium uppercase text-gray-400">Notes</th>
              <th class="pb-3 text-center text-xs font-medium uppercase text-gray-400"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="store.status === 'pending'" class="animate-pulse">
              <td>
                <div class="mb-2.5 h-2 w-4/5 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              </td>
              <td class="hidden lg:table-cell">
                <div class="mb-2.5 h-2 w-2/5 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              </td>
              <td class="hidden lg:table-cell">
                <div class="mb-2.5 h-2 w-2/5 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              </td>
              <td>
                <div class="mb-2.5 h-2 w-2/5 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              </td>
              <td>
                <div class="mb-2.5 h-2 w-2/5 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              </td>
            </tr>
            <tr
              v-for="notebook in store.notebooks"
              :key="notebook.name"
              class="border-b border-neutral-200 last:border-b-0">
              <td class="flex flex-col">
                <NotebookRenameNotebook :notebook="notebook.name" @toggle="toggleNotes"></NotebookRenameNotebook>
                <NoteNotebookNotes
                  v-if="notebook.name === openNotebookNotes?.notebook"
                  class="ml-6"
                  :on-background="true"
                  :notebook="notebook.name"
                  :notes="openNotebookNotes?.notes"
                  @added="addedNote"></NoteNotebookNotes>
              </td>
              <td class="hidden lg:table-cell">
                <div class="text-sm font-medium">
                  <CommonDateDisplay :date="notebook.createdAt"></CommonDateDisplay>
                </div>
              </td>
              <td class="hidden py-3 lg:table-cell">
                <div class="text-sm font-medium">
                  <CommonDateDisplay :date="notebook.updatedAt"></CommonDateDisplay>
                </div>
              </td>
              <td class="table-cell py-3">
                <div class="flex w-full justify-center">
                  <div
                    class="flex size-6 flex-row items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-900">
                    <span>{{ notebook.fileCount }}</span>
                  </div>
                </div>
              </td>
              <td><NotebookDelete :notebook="notebook.name"></NotebookDelete></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </CommonBaseCard>
</template>
<script lang="ts" setup>
import { useNotebookStore } from '~/stores/notebooks'
import type { Note } from '~/types/notebook'

const store = useNotebookStore()

const error: Ref<string | null> = ref(null)
const openError: Ref<{ notebook: string; error: string } | null> = ref(null)
const openNotebookNotes: Ref<{ notebook: string; notes: Note[] } | null> = ref(null)

const notebookAddedError = (addError: string) => (error.value = addError)

const toggleNotes = async (notebook: string) => {
  if (openNotebookNotes.value?.notebook === notebook) {
    openNotebookNotes.value = null
    return
  }
  const resp = await store.getNotebookNotes(notebook)

  if (resp.success) {
    openNotebookNotes.value = { notebook, notes: resp.data }
  } else {
    openError.value = { notebook, error: resp.message }
  }
}

const addedNote = (newNote: Note) => {
  if (openNotebookNotes.value?.notebook === newNote.notebook) {
    openNotebookNotes.value?.notes.push(newNote)
  }
}
</script>
