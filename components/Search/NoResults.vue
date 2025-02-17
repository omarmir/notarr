<template>
  <div class="flex w-full flex-col items-center justify-center gap-6 p-8">
    <svg
      class="size-12 text-gray-600 dark:text-gray-200"
      viewBox="0 0 20 20"
      fill="none"
      fill-rule="evenodd"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round">
      <path
        d="M15.5 4.8c2 3 1.7 7-1 9.7h0l4.3 4.3-4.3-4.3a7.8 7.8 0 01-9.8 1m-2.2-2.2A7.8 7.8 0 0113.2 2.4M2 18L18 2"></path>
    </svg>
    <p class="dark:text-gray-200">
      Nothing found for
      <b>{{ search }}</b>
    </p>
  </div>
</template>
<script lang="ts" setup>
const { search } = defineProps<{ search: string | null }>()
</script>
