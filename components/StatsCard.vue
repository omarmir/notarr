<template>
  <div class="w-full max-w-full px-3 mb-6 xl:w-4/12 sm:flex-none xl:mb-0">
    <div
      class="relative flex flex-col min-w-0 break-words bg-zinc-200/50 border-0 bg-clip-border rounded-2xl mb-5">
      <!-- card header -->
      <div
        class="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
        <div
          class="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/normal text-dark">
          <!--begin::Amount-->
          <span
            class="text-dark text-5xl/none font-semibold mr-2 tracking-[-0.115rem]">
            11
          </span>
          <!--end::Amount-->
          <!--begin::Subtitle-->
          <span class="pt-1 font-medium text-dark text-lg/normal">
            Notes Completed
          </span>
          <!--end::Subtitle-->
        </div>
      </div>
      <!-- card body  -->
      <div class="flex items-end flex-auto py-8 pt-0 px-9">
        <!--begin::Progress-->
        <div class="flex flex-col items-center w-full mt-3">
          <div
            class="flex justify-between w-full mt-auto mb-2 font-semibold text-dark text-lg/normal">
            <span class="mr-4 text-dark">15 Pending</span>
            <span>85%</span>
          </div>
          <div class="mx-3 rounded-2xl h-[8px] w-full bg-white">
            <div class="rounded-2xl bg-gray-800 w-[85%] h-[8px]"></div>
          </div>
        </div>
        <!--end::Progress-->
      </div>
      <!-- end card body  -->
    </div>
    <!-- end card body  -->
  </div>
</template>
