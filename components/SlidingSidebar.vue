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
            <svg xmlns="http://www.w3.org/2000/svg" class="size-10" viewBox="0 0 64 64">
              <path
                fill="#34484c"
                d="M6.199 57.475s1.827 7.029 13.264 5.23L21.413 58l-3.29-3.576l-9.107-3.004l-2.813 6.055" />
              <path
                fill="#F8B4B4"
                d="M42.636 44.301c0 2.492-1.28 3.144-4.513 4.51L10.51 60.475A4.513 4.513 0 0 1 6 55.963V17.166c0-2.492 1.464-3.322 4.511-4.512L38.123 1a4.51 4.51 0 0 1 4.513 4.514V44.31" />
              <path
                fill="#34484c"
                d="M8.507 59.997s10.351 2.966 10.956 2.71c.602-.254-.387-4.487-.387-4.487l-3.743-4.033l-3.484-.16l-.612.87z" />
              <path
                fill="#f4f5f5"
                d="m37.473 3.674l-30.63 12.87l1.435 8.247l4.562.457l15.216-2.451l9.462-4.957l6.962-9.537c-1.524-2.729-3.759-4.42-7.007-4.629" />
              <path
                fill="#34484c"
                d="M14.957 19.398c0-.72.13-1.3.375-1.793c-3.132-.292-6.093-1.198-8.253-3.143c-.716.66-1.07 1.478-1.07 2.698v38.798a4.513 4.513 0 0 0 4.515 4.511l4.455-1.88c-.01-.131-.022-.262-.022-.394z" />
              <path
                fill="#F98080"
                d="M52.382 48.124c0 2.492-1.28 3.146-4.511 4.511L19.459 62.707a4.514 4.514 0 0 1-4.517-4.511V19.398c0-2.492 1.467-3.32 4.517-4.512L47.86 4.816a4.51 4.51 0 0 1 4.512 4.511v38.797" />
              <path
                fill="#F8B4B4"
                d="M40.62 16.652a.61.61 0 0 1-.349.79l-15.11 5.823a.608.608 0 1 1-.439-1.138l15.113-5.822a.606.606 0 0 1 .786.349m-.001 2.783a.61.61 0 0 1-.349.79l-15.11 5.822a.608.608 0 1 1-.439-1.138l15.113-5.822a.61.61 0 0 1 .786.35m-5.136 4.849c.122.315.047.639-.168.72l-10.318 3.978c-.218.083-.49-.106-.61-.42c-.121-.315-.044-.637.17-.718l10.317-3.98c.216-.08.487.107.61.42" />
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
                  href=""
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
    <NotesSidebar v-if="store.currentNotebook" class="hidden lg:flex"></NotesSidebar>
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
