<template>
  <div>
    <aside
      id="sidenav-main"
      ref="sidebar"
      :class="{ '-translate-x-full': !isSidebarOpen }"
      class="fixed inset-y-0 left-0 z-40 m-0 flex w-[300px] shrink-0 flex-col overflow-y-auto bg-neutral-900 transition-all duration-300 ease-in-out lg:translate-x-0 [&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:bg-neutral-300 [&::-webkit-scrollbar]:w-1">
      <div class="h-svw">
        <!--logo start-->
        <NuxtLink to="/">
          <div class="flex h-[96px] shrink-0 items-center justify-start gap-4 px-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-10" viewBox="0 0 50 50">
              <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path
                  stroke="#306cfe"
                  d="M39.583 6.25H10.417c-1.15 0-2.084.933-2.084 2.083v33.334c0 1.15.933 2.083 2.084 2.083h29.166c1.15 0 2.084-.933 2.084-2.083V8.333c0-1.15-.933-2.083-2.084-2.083" />
                <path
                  stroke="#344054"
                  d="M10.417 6.25h6.25v37.5h-6.25a2.083 2.083 0 0 1-2.084-2.083V8.333a2.083 2.083 0 0 1 2.084-2.083" />
              </g>
            </svg>
            <h1 class="text-xl font-bold text-white">notarr</h1>
          </div>
        </NuxtLink>
        <!--logo end-->
        <div class="relative">
          <div class="flex w-full flex-col font-medium">
            <!-- menu item -->
            <div>
              <span class="flex cursor-pointer select-none items-center rounded-xl px-4 py-3">
                <NuxtLink
                  to="/"
                  class="flex flex-grow flex-row items-center gap-2 text-base font-medium text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M6 19h3v-6h6v6h3v-9l-6-4.5L6 10zm-2 2V9l8-6l8 6v12h-7v-6h-2v6zm8-8.75" />
                  </svg>
                  Home
                </NuxtLink>
              </span>
            </div>
            <!-- menu item -->
            <div>
              <span class="flex select-none items-center px-4 py-3 text-xs font-medium text-neutral-200">
                Notebooks
              </span>
              <SidebarNotebooks></SidebarNotebooks>
            </div>
          </div>
        </div>
      </div>
    </aside>
    <NotesSidebar v-if="store.currentNotebook" class="hidden lg:flex">
      <h2 class="text-lg font-bold text-white">{{ store.currentNotebook }}</h2>
      <h3 class="flex select-none items-center text-xs font-medium text-neutral-200">Notes</h3>
      <NotebookNotes :notes="store.currentNotes" :notebook="store.currentNotebook"></NotebookNotes>
    </NotesSidebar>
  </div>
</template>
<script lang="ts" setup>
import { NuxtLink } from '#components'
import { onClickOutside } from '@vueuse/core'
const { isSidebarOpen } = useSidebar()
const input = useTemplateRef('sidebar')
const store = useNotebookStore()

onClickOutside(input, () => (isSidebarOpen.value = false))
</script>
