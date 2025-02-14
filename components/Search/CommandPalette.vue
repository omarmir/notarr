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
        <span class="absolute top-1/2 ml-4 -translate-y-1/2 leading-none">
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
          v-model="searchStr"
          name="search"
          class="w-full rounded-sm border border-accent py-2 pe-10 ps-10 text-sm focus-visible:outline-none" />
        <button class="absolute right-8 top-1/2 -translate-y-1/2 leading-none" @click="clearSearch()">
          <svg xmlns="http://www.w3.org/2000/svg" class="size-4 text-gray-600" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z" />
          </svg>
        </button>
      </div>
    </div>
  </CommonBaseDialog>
</template>
<script lang="ts" setup>
const isShown = defineModel<boolean>({ required: true })
const searchInput = useTemplateRef('searchInput')
const searchStr: Ref<string | null> = ref(null)
const clearSearch = () => {
  searchStr.value = null
  searchInput.value?.focus()
}

watch(isShown, async () => {
  await nextTick()
  searchInput.value?.focus()
})
</script>
