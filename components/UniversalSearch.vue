<template>
  <div class="relative w-full">
    <div class="relative z-30 mr-2 flex w-full items-center sm:mr-0 lg:w-1/2">
      <span class="absolute top-1/2 ml-4 -translate-y-1/2 leading-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-4">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
        </svg>
      </span>
      <input
        v-model="search"
        :class="isSearching ? 'rounded-t-md' : 'rounded-md'"
        class="peer block w-full appearance-none border border-solid border-gray-200 bg-gray-50 bg-clip-padding py-3 pe-20 pl-12 text-base font-medium leading-normal text-stone-500 outline-none"
        placeholder="Search..."
        type="text" />
      <CommonBaseButton class="py-2.5" @click="clearSearch">Clear</CommonBaseButton>
    </div>
    <div
      v-show="isSearching"
      id="suggestions"
      class="absolute left-0 top-full z-50 w-full animate-slideDownAndFade rounded-b-md bg-gray-200 pt-1 shadow-lg lg:w-1/2">
      <ul class="bg-gray-200">
        <li
          v-if="status === 'pending'"
          class="flex w-full cursor-pointer flex-row gap-2 px-4 py-2 text-left text-xs text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path stroke-dasharray="16" stroke-dashoffset="16" d="M12 3c4.97 0 9 4.03 9 9">
                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="16;0" />
                <animateTransform
                  attributeName="transform"
                  dur="1.5s"
                  repeatCount="indefinite"
                  type="rotate"
                  values="0 12 12;360 12 12" />
              </path>
              <path
                stroke-dasharray="64"
                stroke-dashoffset="64"
                stroke-opacity="0.3"
                d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z">
                <animate fill="freeze" attributeName="stroke-dashoffset" dur="1.2s" values="64;0" />
              </path>
            </g>
          </svg>
          <span>Loading...</span>
        </li>
        <li
          v-else-if="status === 'error'"
          class="flex w-full cursor-pointer flex-row gap-2 bg-red-200 px-4 py-2 text-left text-xs text-gray-900">
          <span>Error! {{ error?.data.message }}</span>
        </li>
        <li
          v-if="status === 'success' && results?.length === 0"
          class="flex w-full cursor-pointer flex-row gap-2 px-4 py-2 text-left text-xs text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-4">
            <path
              fill="currentColor"
              d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m2.59 6L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41z" />
          </svg>
          <span>No results</span>
        </li>
        <li v-for="(result, index) in results" :key="index">
          <button
            class="flex w-full cursor-pointer flex-row gap-2 px-4 py-2 text-left text-xs text-gray-900 hover:bg-gray-900 hover:text-white"
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
  </div>
</template>
<script lang="ts" setup>
import { useDebounce } from '@vueuse/core'
import type { SearchResult } from '~/types/notebook'
const search: Ref<string | null> = ref(null)

const debounced = useDebounce(search, 300)
const router = useRouter()

const isSearching: Ref<boolean> = ref(false)

const {
  data: results,
  error,
  status,
  refresh,
  clear
} = useFetch('/api/search', {
  immediate: false,
  lazy: true,
  query: { q: debounced },
  watch: false
})

watch(debounced, () => {
  if (debounced.value && debounced.value?.length > 0) {
    isSearching.value = true
    refresh()
  } else {
    isSearching.value = false
    clear()
  }
})

const clearSearch = () => {
  isSearching.value = false
  search.value = null
  clear()
}

const navigate = (result: SearchResult) => {
  const route = result.matchType === 'folder' ? `/${result.notebook}` : `/${result.notebook}/${result.note}`
  search.value = null
  isSearching.value = false
  router.push(route)
}

const stripMD = (markdown: string): string => {
  return (
    markdown
      // Decode HTML entities (e.g., &#x20; -> space)
      .replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => String.fromCharCode(Number.parseInt(hex, 16)))
      .replace(/&nbsp;/g, ' ') // Handle non-breaking spaces separately
      // Remove HTML tags
      .replace(/<[^>]+(>|$)/g, '')
      // Remove headings
      .replace(/^#{1,6}\s*/gm, '')
      // Remove bold & italic (**, __, *, _)
      .replace(/(\*\*|__)(.*?)\1/g, '$2')
      .replace(/(\*|_)(.*?)\1/g, '$2')
      // Remove inline code (`code`)
      .replace(/`([^`]+)`/g, '$1')
      // Remove code blocks (triple backticks)
      .replace(/```[\s\S]*?```/g, '')
      // Remove blockquotes
      .replace(/^>\s?/gm, '')
      // Remove strikethroughs
      .replace(/~~(.*?)~~/g, '$1')
      // Remove links but keep text [text](url)
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Remove images ![alt](url)
      .replace(/!\[.*?\]\(.*?\)/g, '')
      // Remove unordered lists (-, *, +)
      .replace(/^\s*[-*+]\s+/gm, '')
      // Remove ordered lists (numbers)
      .replace(/^\s*\d+\.\s+/gm, '')
      // Remove horizontal rules (---, ***)
      .replace(/^\s*(-{3,}|\*{3,})\s*$/gm, '')
      // Remove extra whitespace
      .replace(/\s+/g, ' ')
      .trim()
  )
}
</script>
