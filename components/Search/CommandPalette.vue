<template>
  <CommonBaseDialog
    v-model="isShown"
    :is-command="true"
    :hide-title-desc="true"
    position="top"
    theme="primary"
    title="Command prompt"
    desc="Quick shortcuts and search">
    <div class="flex flex-col gap-4">
      <label for="command" class="hidden">Search</label>
      <div class="flex w-full">
        <span class="absolute ml-3 mt-5 -translate-y-1/2 leading-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5 text-accent">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
          </svg>
        </span>
        <input
          id="search"
          ref="searchInput"
          v-model="search"
          placeholder="Search content"
          name="search"
          class="w-full rounded-sm border border-accent py-2 pe-10 ps-10 text-sm focus-visible:outline-none" />
        <button class="absolute right-8 mt-5 -translate-y-1/2 leading-none" @click="clearSearch()">
          <svg xmlns="http://www.w3.org/2000/svg" class="size-4 text-gray-600" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z" />
          </svg>
        </button>
      </div>
    </div>
    <div v-if="!results || results?.length === 0" class="flex w-full flex-row items-center justify-center gap-6 p-8">
      <svg
        class="size-12 text-gray-600"
        viewBox="0 0 20 20"
        fill="none"
        fill-rule="evenodd"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round">
        <path
          d="M15.5 4.8c2 3 1.7 7-1 9.7h0l4.3 4.3-4.3-4.3a7.8 7.8 0 01-9.8 1m-2.2-2.2A7.8 7.8 0 0113.2 2.4M2 18L18 2"></path>
      </svg>
      <p>
        Nothing found for
        <b>{{ search }}</b>
      </p>
    </div>
    <div v-else>
      <ul>
        <li v-for="(result, index) in results" :key="index">
          <button
            class="flex w-full cursor-pointer flex-row gap-2 px-4 py-2 text-left text-xs text-gray-900 hover:bg-accent hover:text-white focus-visible:bg-accent focus-visible:text-white focus-visible:outline-none"
            @click="navigate(result)">
            <svg
              v-if="result.matchType === 'folder'"
              xmlns="http://www.w3.org/2000/svg"
              class="size-4 shrink-0"
              viewBox="0 0 1024 1024">
              <path
                fill="currentColor"
                d="M192 128v768h640V128zm-32-64h704a32 32 0 0 1 32 32v832a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32" />
              <path
                fill="currentColor"
                d="M672 128h64v768h-64zM96 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32m0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32m0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32m0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32" />
            </svg>
            <svg
              v-else-if="result.matchType === 'note'"
              xmlns="http://www.w3.org/2000/svg"
              class="size-4 shrink-0"
              viewBox="0 0 24 24">
              <path fill="currentColor" d="M4 22V2h10l6 6v14zm9-13V4H6v16h12V9zM6 4v5zv16z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="size-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M5 3c-1.11 0-2 .89-2 2v14c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 2h14v14H5zm2 2v2h10V7zm0 4v2h10v-2zm0 4v2h7v-2z" />
            </svg>
            <div v-if="result.matchType === 'content'" class="flex flex-col gap-1">
              <span>{{ result.notebook }} / {{ result.note }}</span>
              <span class="italic">{{ stripMD(result.snippet) }}</span>
            </div>
            <div v-if="result.matchType === 'note'" class="flex flex-col gap-1">
              <span>{{ result.notebook }} / {{ result.note }}</span>
              <span class="italic">{{ result.snippet }}</span>
            </div>
            <div v-if="result.matchType === 'folder'" class="flex flex-col gap-1">
              <span>{{ result.notebook }}</span>
              <span class="italic">{{ result.snippet }}</span>
            </div>
          </button>
        </li>
      </ul>
    </div>
  </CommonBaseDialog>
</template>
<script lang="ts" setup>
import { useSearch } from '~/composables/useSearch'
import type { SearchResult } from '~/types/notebook'
const router = useRouter()
const isShown = defineModel<boolean>({ required: true })
const searchInput = useTemplateRef('searchInput')
const { search, clearSearch, results, status, stripMD } = useSearch()

watch(isShown, async () => {
  await nextTick()
  searchInput.value?.focus()
})

const navigate = (result: SearchResult) => {
  const route = result.matchType === 'folder' ? `/${result.notebook}` : `/${result.notebook}/${result.note}`
  search.value = null
  router.push(route)
}
</script>
