<template>
  <nav class="flex mt-4 justify-between mx-10 lg:mx-5" navbar-scroll="true">
    <!--Search-->
    <div
      class="relative flex w-full lg:w-1/2 items-center lg:ml-4 sm:mr-0 mr-2">
      <span
        class="absolute ml-4 leading-none -translate-y-1/2 top-1/2 text-muted">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
        </svg>
      </span>
      <input
        class="block w-full py-3 pl-12 pr-4 text-base font-medium leading-normal bg-white border border-solid outline-none appearance-none placeholder:text-secondary-dark peer text-stone-500 border-stone-200 bg-clip-padding rounded-2xl"
        placeholder="Search..."
        type="text" />
    </div>
    <!--Search end-->
    <div class="relative lg:hidden flex items-center sm:ml-2 ml-auto">
      <!--Sidebar button-->
      <a
        href="javascript:void(0)"
        class="flex items-center justify-center w-12 h-12 text-base font-medium leading-normal text-center align-middle transition-colors duration-150 ease-in-out bg-transparent border border-solid shadow-none cursor-pointer rounded-2xl text-stone-500 border-stone-200 hover:text-primary active:text-primary focus:text-primary"
        @click="toggleSideMenu()">
        <!-- onclick="(function(){document.querySelector('.group\\/sidebar').classList.toggle('-translate-x-full');})();"> -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
        </svg>
      </a>
      <!--Sidebar button end-->
    </div>
  </nav>
</template>
<script lang="ts" setup>
const { toggleSideMenu } = useSidebar()
</script>
