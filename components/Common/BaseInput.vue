<template>
  <input
    v-model="model"
    type="text"
    class="block w-full rounded-md border border-gray-300 bg-gray-50 p-2 pe-16 ps-10 text-sm text-gray-900 focus:outline-0 focus:ring-1 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200" />
</template>
<script lang="ts" setup>
const model = defineModel<string | null>({ required: true })
</script>
