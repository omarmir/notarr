<template>
  <ul>
    <li
      v-for="notebook in notebooks"
      :key="notebook.name"
      class="flex cursor-pointer select-none flex-row items-center rounded-xl px-4 py-3">
      <NuxtLink
        :to="`/notebooks/${notebook.name}`"
        href=""
        class="text-muted flex flex-grow flex-row items-center gap-2 overflow-x-clip text-base font-medium text-gray-400 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 1024 1024">
          <path
            fill="currentColor"
            d="M192 128v768h640V128zm-32-64h704a32 32 0 0 1 32 32v832a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32" />
          <path
            fill="currentColor"
            d="M672 128h64v768h-64zM96 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32m0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32m0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32m0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32" />
        </svg>
        <div class="w-[230px] truncate text-sm lg:w-[270px]">
          {{ notebook.name }}
        </div>
      </NuxtLink>
    </li>
  </ul>
</template>
<script lang="ts" setup>
import type { Notebook } from '~/types/notebook'

const { data: notebooks, execute } = useFetch<Notebook[]>('/api/notebooks', {
  immediate: false,
  lazy: true
})

await execute()
</script>
