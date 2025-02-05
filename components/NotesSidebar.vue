<template>
  <aside
    id="sidenav-main"
    ref="sidebar"
    class="fixed inset-y-0 z-40 m-0 flex w-[300px] shrink-0 flex-col overflow-y-auto border-r border-r-neutral-200 bg-neutral-900 transition-all duration-300 ease-in-out lg:ml-[300px] lg:translate-x-0 [&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:bg-neutral-300 [&::-webkit-scrollbar]:w-1">
    <div class="h-svw bg-cyan-300/5">
      <div class="mt-28 pl-7">
        <h2 class="text-lg font-bold text-white">{{ store.currentNotebook }}</h2>
        <h3 class="flex select-none items-center text-xs font-medium text-neutral-200">Notes</h3>
        <NewNote></NewNote>
        <NotebookNotes></NotebookNotes>
      </div>
    </div>
  </aside>
</template>
<script lang="ts" setup>
import { useNotebookStore } from '~/stores/notebooks'

const store = useNotebookStore()
</script>
