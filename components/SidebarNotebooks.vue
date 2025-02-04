<template>
  <ul>
    <li
      v-for="notebook in notebooks"
      :key="notebook.name"
      class="select-none flex flex-row items-center px-4 py-3 cursor-pointer rounded-xl">
      <NuxtLink
        :to="`/notebooks/${notebook.name}`"
        href=""
        class="flex items-center overflow-x-clip flex-grow text-base font-medium text-gray-400 text-muted hover:text-white flex-row gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-5"
          viewBox="0 0 1024 1024">
          <path
            fill="currentColor"
            d="M192 128v768h640V128zm-32-64h704a32 32 0 0 1 32 32v832a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32" />
          <path
            fill="currentColor"
            d="M672 128h64v768h-64zM96 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32m0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32m0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32m0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32" />
        </svg>
        <div class="truncate lg:w-[270px] w-[230px] text-sm">
          {{ notebook.name }}
        </div>
      </NuxtLink>
    </li>
  </ul>
</template>
<script lang="ts" setup>
import type { Notebook } from "~/types/notebook"

const { data: notebooks, execute } = useFetch<Notebook[]>("/api/notebooks", {
  immediate: false,
  lazy: true,
})

await execute()
</script>
