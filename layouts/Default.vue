<template>
  <div>
    <SlidingSidebar></SlidingSidebar>
    <div
      id="panel"
      class="relative h-full max-h-screen rounded-xl transition-all duration-200 lg:ml-[300px]"
      :class="{ 'lg:ml-[600px]': store.currentNotebook }">
      <TopBar></TopBar>
      <div class="mx-auto w-full px-10 py-6">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const store = useNotebookStore()
</script>
