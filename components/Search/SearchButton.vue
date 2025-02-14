<template>
  <button
    type="button"
    class="rounded-md bg-neutral-800 px-2 py-1 hover:outline hover:outline-1 hover:outline-accent focus-visible:outline-none"
    aria-label="Search"
    @click="$emit('click')">
    <div class="flex w-full flex-row items-center gap-2 rounded-md py-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-4 text-gray-400">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
      </svg>
      <span class="text-sm text-gray-400">Search</span>
      <kbd class="rounded-md border border-gray-500 bg-gray-600 px-2 py-1 text-xs font-semibold text-gray-100">
        Ctrl+K
      </kbd>
    </div>
  </button>
</template>
<script lang="ts" setup>
defineEmits(['click'])
</script>
