<template>
  <ul class="list-style-none">
    <li v-if="store.status === 'pending'" class="animate-pulse cursor-pointer select-none rounded-xl px-4 py-3">
      <div class="mb-2.5 h-2 w-4/5 rounded-full bg-gray-400/30"></div>
    </li>
    <li
      v-for="notebook in store.notebooks"
      :key="notebook.name"
      :class="{ 'bg-cyan-300/5': notebook.name === store.currentNotebook }"
      class="items-center px-4 py-3">
      <button
        type="button"
        class="text-muted flex flex-grow flex-row items-center gap-2 overflow-x-clip text-left text-base font-medium text-gray-400 hover:text-white"
        @click="store.toggleNotebook(notebook.name)">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 1024 1024">
          <path
            fill="currentColor"
            d="M192 128v768h640V128zm-32-64h704a32 32 0 0 1 32 32v832a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32" />
          <path
            fill="currentColor"
            d="M672 128h64v768h-64zM96 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32m0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32m0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32m0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32" />
        </svg>
        <div class="w-[230px] truncate text-sm lg:w-[220px]">
          {{ notebook.name }}
        </div>
      </button>
      <div class="lg:hidden">
        <Suspense>
          <NotebookNotes v-if="notebook.name === store.currentNotebook" class="pl-7"></NotebookNotes>
        </Suspense>
      </div>
    </li>
  </ul>
</template>
<script lang="ts" setup>
import { useNotebookStore } from '~/stores/notebooks'

const store = useNotebookStore()
</script>
