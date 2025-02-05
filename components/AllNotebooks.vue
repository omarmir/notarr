<template>
  <div
    class="bg-light/30 relative mb-5 flex min-w-0 flex-col break-words rounded-2xl border border-dashed border-stone-200 bg-clip-border">
    <!-- card header -->
    <div class="flex min-h-[70px] flex-wrap items-stretch justify-between bg-transparent px-9 pb-0 pt-5">
      <h3 class="text-dark m-2 ml-0 flex flex-col items-start justify-center">
        <span class="mr-3 text-lg font-medium">Notebooks</span>
        <span class="font-base mt-1 text-sm text-gray-400">All notebooks</span>
      </h3>
      <div class="min-w-xs relative my-2 flex w-1/3 flex-wrap items-center">
        <div class="relative my-2 flex w-full flex-wrap items-center">
          <NewNotebook @added="notebookAdded" @error="notebookAddedError"></NewNotebook>
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
              <th class="pb-3 text-start text-xs font-medium uppercase text-gray-400">Created</th>
              <th class="pb-3 text-start text-xs font-medium uppercase text-gray-400">Updated</th>
              <th class="pb-3 text-start text-xs font-medium uppercase text-gray-400"># of Notes</th>
              <th class="pb-3 text-start text-xs font-medium uppercase text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="notebook in notebooks"
              :key="notebook.name"
              class="border-b border-dashed border-neutral-200 last:border-b-0">
              <td>
                <div class="my-3 flex flex-row items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 1024 1024">
                    <path
                      fill="currentColor"
                      d="M192 128v768h640V128zm-32-64h704a32 32 0 0 1 32 32v832a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32" />
                    <path
                      fill="currentColor"
                      d="M672 128h64v768h-64zM96 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32m0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32m0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32m0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32" />
                  </svg>
                  <div class="flex flex-col justify-start">
                    <a
                      class="text-secondary-inverse hover:text-primary mb-1 text-sm font-semibold transition-colors duration-200 ease-in-out">
                      {{ notebook.name }}
                    </a>
                  </div>
                </div>
              </td>
              <td>
                <span class="text-light-inverse text-sm font-medium">
                  {{ notebook.createdAt }}
                </span>
              </td>
              <td class="py-3">
                <span class="text-light-inverse text-sm font-medium">
                  {{ notebook.updatedAt }}
                </span>
              </td>
              <td class="py-3">
                <div
                  class="text-light-inverse flex size-8 items-center justify-center rounded-full bg-emerald-600 text-center text-sm font-medium text-white">
                  <span>{{ notebook.fileCount }}</span>
                </div>
              </td>
              <td>
                <span class="text-light-inverse text-sm font-medium">
                  <button>New note</button>
                  <button>View notes</button>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Notebook } from '~/types/notebook'

const { data: notebooks, execute } = useFetch<Notebook[]>('/api/notebooks', {
  immediate: false,
  lazy: true
})

await execute()

const error = ref('')

const notebookAdded = (newBook: Notebook) => {
  notebooks.value?.push(newBook)
  error.value = ''
}
const notebookAddedError = (addError: string) => (error.value = addError)
</script>
