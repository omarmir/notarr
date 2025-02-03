<template>
  <div class="w-full max-w-full px-3 mb-6 xl:w-8/12 sm:flex-none xl:mb-0">
    <div
      class="relative flex flex-col break-words min-w-0 bg-clip-border rounded-xl bg-neutral-900 mb-5">
      <!-- card body  -->
      <div class="flex-auto block py-8 px-9">
        <div class="m-0 z-20 relative">
          <div class="relative z-20 text-3xl font-semibold text-white w-3/4">
            Hello User Name!
          </div>
          <p class="mb-7 text-white">Lets start writing.</p>
          <div class="flex flex-col gap-2 xl:gap-4 sm:flex-row">
            <a
              href="javascript:void(0)"
              class="shrink-0 inline-block text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-[.95rem] transition-colors duration-150 ease-in-out text-dark bg-white border-white shadow-none [border:_0] px-5 py-3.5 hover:bg-white/90 active:bg-white focus:bg-white">
              Notebooks
            </a>
            <a
              href="javascript:void(0)"
              class="inline-block shrink-0 text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-[.95rem] transition-colors duration-150 ease-in-out text-white bg-white/[.15] shadow-none [border:_0] px-5 py-3.5 hover:bg-white/25 active:bg-white/25 focus:bg-white/25">
              New Note
            </a>
          </div>
        </div>
        <img
          src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/bonus.png"
          class="bottom-0 absolute mr-3 end-0 h-[200px] opacity-40 z-10"
          alt="" />
      </div>
    </div>
  </div>
</template>
