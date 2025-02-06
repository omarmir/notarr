<template>
  <div
    class="bg-light/30 relative mb-5 flex min-w-0 flex-col break-words rounded-2xl border border-dashed border-stone-200 bg-clip-border">
    <!-- card header -->
    <div class="flex min-h-[70px] flex-wrap items-stretch justify-between bg-transparent px-9 pb-0 pt-5">
      <h3 class="text-dark m-2 ml-0 flex flex-col items-start justify-center">
        <span class="mr-3 text-lg font-medium">Notebooks</span>
        <span class="font-base mt-1 text-sm text-gray-400">All notebooks</span>
      </h3>
      <div class="min-w-xs relative my-2 flex w-1/3 min-w-72 flex-wrap items-center">
        <div class="relative my-2 flex w-full flex-wrap items-center">
          <NewNotebook @error="notebookAddedError"></NewNotebook>
        </div>
      </div>
    </div>
    <!-- end card header -->
    <!-- card body  -->
    <DangerAlert v-if="error">
      {{ error }}
    </DangerAlert>
    <div class="block flex-auto px-9 py-8 pt-6">
      <div class="overflow-x-auto">
        <table class="text-dark my-0 w-full border-neutral-200 align-middle">
          <thead class="align-bottom">
            <tr class="text-secondary-dark text-[0.95rem]">
              <th class="pb-3 text-start text-xs font-medium uppercase text-gray-400">Notebook</th>
              <th class="hidden pb-3 text-center text-xs font-medium uppercase text-gray-400 lg:table-cell">Created</th>
              <th class="hidden pb-3 text-center text-xs font-medium uppercase text-gray-400 lg:table-cell">Updated</th>
              <th class="pb-3 text-center text-xs font-medium uppercase text-gray-400"># of Notes</th>
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
            </tr>
            <tr
              v-for="notebook in store.notebooks"
              :key="notebook.name"
              class="border-b border-dashed border-neutral-200 last:border-b-0">
              <td class="flex flex-col">
                <button
                  class="mt-3 flex flex-row items-center gap-2 hover:text-gray-500"
                  @click="toggleNotes(notebook.name)">
                  <svg xmlns="http://www.w3.org/2000/svg" class="size-5 shrink-0" viewBox="0 0 1024 1024">
                    <path
                      fill="currentColor"
                      d="M192 128v768h640V128zm-32-64h704a32 32 0 0 1 32 32v832a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32" />
                    <path
                      fill="currentColor"
                      d="M672 128h64v768h-64zM96 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32m0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32m0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32m0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32" />
                  </svg>
                  <div class="flex flex-col justify-start text-sm font-semibold">
                    {{ notebook.name }}
                  </div>
                </button>
                <NotebookNotes
                  v-if="notebook.name === openNotebookNotes?.notebook"
                  class="ml-6"
                  :on-background="true"
                  :notebook="notebook.name"
                  :notes="openNotebookNotes?.notes"
                  @added="addedNote"></NotebookNotes>
              </td>
              <td class="hidden lg:table-cell">
                <div class="text-sm font-medium">
                  <DateDisplay :date="notebook.createdAt"></DateDisplay>
                </div>
              </td>
              <td class="hidden py-3 lg:table-cell">
                <div class="text-sm font-medium">
                  <DateDisplay :date="notebook.updatedAt"></DateDisplay>
                </div>
              </td>
              <td class="flex justify-center py-3">
                <div
                  class="flex size-8 items-center justify-center rounded-full bg-emerald-600 text-center text-sm font-medium text-white">
                  <span>{{ notebook.fileCount }}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
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
  console.log(newNote)
  openNotebookNotes.value?.notes.push(newNote)
}
</script>
