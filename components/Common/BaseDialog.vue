<template>
  <div
    v-if="open"
    class="fixed left-0 top-0 z-50 flex h-[100%] w-[100%] animate-overlayShow flex-row items-center justify-center bg-gray-950/50"></div>
  <div v-if="open" class="fixed left-0 top-0 z-50 flex h-[100%] w-[100%] flex-row items-center justify-center">
    <dialog
      ref="delete-wrapper"
      aria-describedby="desc"
      aria-labelledby="title"
      :aria-hidden="!open"
      :open="open"
      :title
      class="z-[100] max-h-[85vh] w-[100%] animate-popIn rounded-[6px] bg-white p-[25px] shadow-md focus:outline-none md:max-w-[70%] lg:w-[30vw]">
      <div class="flex flex-col gap-4">
        <h2 id="title" class="text-md font-medium text-accent" :class="{ 'text-red-600': theme === 'danger' }">
          {{ title }}
        </h2>
        <p id="desc" class="text-sm font-normal">{{ desc }}</p>
        <slot></slot>
      </div>
    </dialog>
  </div>
</template>
<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import type { Theme } from '~/types/ui'
const open = defineModel<boolean>({ required: true })
const { title, desc, theme = 'primary' } = defineProps<{ title: string; desc: string; theme?: Theme }>()

const renameWrapper = useTemplateRef('delete-wrapper')

onClickOutside(renameWrapper, () => {
  open.value = false
})
</script>
