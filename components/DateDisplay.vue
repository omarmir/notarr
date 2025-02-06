<template>
  <div v-if="dateObj" class="text-center">
    <div>{{ dateObj.toLocaleDateString('en-CA') }}</div>
    <div class="text-xs text-gray-500">{{ dateObj.toLocaleTimeString() }}</div>
  </div>
</template>
<script lang="ts" setup>
const { date } = defineProps<{ date: string | null }>()
const dateObj = date ? new Date(date) : null
</script>
