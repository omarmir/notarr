<template>
  <div class="mb-6 w-full max-w-full px-3 sm:flex-none xl:mb-0 xl:w-8/12">
    <div class="relative mb-5 flex min-w-0 flex-col break-words rounded-xl bg-neutral-900 bg-clip-border">
      <!-- card body  -->
      <div class="block flex-auto px-9 py-8">
        <div class="relative z-20 m-0">
          <div class="relative z-20 w-3/4 text-3xl font-semibold text-white">Hello User Name!</div>
          <p class="mb-7 text-white">Lets start writing.</p>
          <div class="flex flex-col gap-2 sm:flex-row xl:gap-4">
            <a
              href="javascript:void(0)"
              class="inline-block shrink-0 cursor-pointer rounded-[.95rem] border-white bg-white px-5 py-3.5 text-center align-middle text-base font-medium leading-normal shadow-none transition-colors duration-150 ease-in-out [border:_0] hover:bg-white/90 focus:bg-white active:bg-white">
              Notebooks
            </a>
            <a
              href="javascript:void(0)"
              class="inline-block shrink-0 cursor-pointer rounded-[.95rem] bg-white/[.15] px-5 py-3.5 text-center align-middle text-base font-medium leading-normal text-white shadow-none transition-colors duration-150 ease-in-out [border:_0] hover:bg-white/25 focus:bg-white/25 active:bg-white/25">
              New Note
            </a>
          </div>
        </div>
        <img
          src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/bonus.png"
          class="absolute bottom-0 end-0 z-10 mr-3 h-[200px] opacity-40"
          alt="" />
      </div>
    </div>
  </div>
</template>
