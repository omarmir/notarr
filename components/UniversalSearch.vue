<template>
  <div class="relative w-full">
    <div class="relative z-30 mr-2 flex w-full items-center sm:mr-0 lg:w-1/2">
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
        class="peer block w-full appearance-none rounded-md border border-solid border-gray-200 bg-gray-50 bg-clip-padding py-2 pl-12 pr-4 text-xs font-medium leading-normal text-stone-500 outline-none"
        placeholder="Search..."
        type="text" />
    </div>
    <div id="suggestions" class="absolute left-0 top-full z-50 w-full rounded-md bg-gray-200 shadow-lg lg:w-1/2">
      <ul class="bg-gray-200">
        <li
          class="flex cursor-pointer flex-row gap-2 px-4 py-2 text-xs text-gray-900 hover:bg-gray-900 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="size-4 shrink-0" viewBox="0 0 1024 1024">
            <path
              fill="currentColor"
              d="M192 128v768h640V128zm-32-64h704a32 32 0 0 1 32 32v832a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32" />
            <path
              fill="currentColor"
              d="M672 128h64v768h-64zM96 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32m0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32m0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32m0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32" />
          </svg>
          <span>Google</span>
        </li>
        <li class="flex flex-row gap-2 px-4 py-2 text-xs text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" class="size-4 shrink-0" viewBox="0 0 24 24">
            <path fill="currentColor" d="M4 22V2h10l6 6v14zm9-13V4H6v16h12V9zM6 4v5zv16z" />
          </svg>
          <span>API Reference</span>
        </li>
        <li class="flex flex-row gap-2 px-4 py-2 text-xs text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" class="size-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M5 3c-1.11 0-2 .89-2 2v14c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 2h14v14H5zm2 2v2h10V7zm0 4v2h10v-2zm0 4v2h7v-2z" />
          </svg>
          <span class="italic">took a galley of type and scrambled it to make a type specimen book</span>
        </li>
      </ul>
    </div>
  </div>
</template>
