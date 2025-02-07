<template>
  <div class="relative mr-2 flex w-full items-center sm:mr-0 lg:w-1/2">
    <span class="absolute top-1/2 ml-4 -translate-y-1/2 leading-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-4">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
      </svg>
    </span>
    <input
      class="peer block w-full appearance-none rounded-md border border-solid border-stone-200 bg-gray-50 bg-clip-padding py-1 pl-12 pr-4 text-xs font-medium leading-normal text-stone-500 outline-none"
      placeholder="Search..."
      type="text" />
  </div>
</template>
