<template>
  <ul>
    <li v-for="note in store.currentNotes" :key="note.name" class="my-2">
      <NuxtLink
        :to="`/${store.currentNotebook}/${note.name}`"
        class="flex flex-row items-center gap-2 text-gray-400 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24">
          <path fill="currentColor" d="M4 22V2h10l6 6v14zm9-13V4H6v16h12V9zM6 4v5zv16z" />
        </svg>
        <span class="text-sm">{{ note.name }}</span>
      </NuxtLink>
    </li>
  </ul>
</template>
<script lang="ts" setup>
import { useNotebookStore } from '~/stores/notebooks'

const store = useNotebookStore()
</script>
