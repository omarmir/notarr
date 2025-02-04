<template>
  <ul>
    <li
      v-for="notebook in notebooks"
      :key="notebook.name"
      class="select-none flex flex-row items-center px-4 py-3 cursor-pointer rounded-xl">
      <NuxtLink
        :to="`/notebooks/${notebook.name}`"
        href=""
        class="flex items-center overflow-x-clip flex-grow text-base font-medium dark:text-neutral-400/75 text-gray-400 text-muted hover:text-white flex-row gap-2">
        <Avatar
          :size="15"
          variant="bauhaus"
          :name="notebook.name"
          class="size-6 shrink-0" />
        <div class="truncate lg:w-[270px] w-[230px] text-sm">
          {{ notebook.name }}
        </div>
      </NuxtLink>
    </li>
  </ul>
</template>
<script lang="ts" setup>
import type { Notebook } from "~/types/notebook"
import Avatar from "vue-boring-avatars"

const { data: notebooks, execute } = useFetch<Notebook[]>("/api/notebooks", {
  immediate: false,
  lazy: true,
})

await execute()
</script>
