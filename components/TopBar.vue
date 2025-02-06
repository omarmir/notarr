<template>
  <nav class="mt-4 flex justify-between lg:mx-5" navbar-scroll="true">
    <!--Search-->
    <div class="relative mr-2 flex w-full items-center sm:mr-0 lg:ml-4 lg:w-1/2">
      <span class="absolute top-1/2 ml-4 -translate-y-1/2 leading-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
        </svg>
      </span>
      <input
        class="peer block w-full appearance-none rounded-2xl border border-solid border-stone-200 bg-gray-50 bg-clip-padding py-3 pl-12 pr-4 text-base font-medium leading-normal text-stone-500 outline-none"
        placeholder="Search..."
        type="text" />
    </div>
    <!--Search end-->
    <div class="relative ml-auto flex items-center sm:ml-2 lg:hidden">
      <!--Sidebar button-->
      <a
        href="javascript:void(0)"
        class="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl border border-solid border-stone-200 bg-transparent text-center align-middle text-base font-medium leading-normal text-stone-500 shadow-none transition-colors duration-150 ease-in-out"
        @click="toggleSideMenu()">
        <!-- onclick="(function(){document.querySelector('.group\\/sidebar').classList.toggle('-translate-x-full');})();"> -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
        </svg>
      </a>
      <!--Sidebar button end-->
    </div>
  </nav>
</template>
<script lang="ts" setup>
const { toggleSideMenu } = useSidebar()
</script>
