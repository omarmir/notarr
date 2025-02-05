<template>
  <div class="mb-6 w-full max-w-full px-3 sm:flex-none xl:mb-0 xl:w-4/12">
    <div class="relative mb-5 flex min-w-0 flex-col break-words rounded-2xl border-0 bg-zinc-200/50 bg-clip-border">
      <!-- card header -->
      <div class="flex min-h-[70px] flex-wrap items-stretch justify-between bg-transparent px-9 pb-0 pt-5">
        <div class="m-2 ml-0 flex flex-col items-start justify-center text-xl/normal font-medium">
          <!--begin::Amount-->
          <span class="mr-2 text-5xl/none font-semibold tracking-[-0.115rem]">11</span>
          <!--end::Amount-->
          <!--begin::Subtitle-->
          <span class="pt-1 text-lg/normal font-medium">Notes Completed</span>
          <!--end::Subtitle-->
        </div>
      </div>
      <!-- card body  -->
      <div class="flex flex-auto items-end px-9 py-8 pt-0">
        <!--begin::Progress-->
        <div class="mt-3 flex w-full flex-col items-center">
          <div class="mb-2 mt-auto flex w-full justify-between text-lg/normal font-semibold">
            <span class="mr-4">15 Pending</span>
            <span>85%</span>
          </div>
          <div class="mx-3 h-[8px] w-full rounded-2xl bg-white">
            <div class="h-[8px] w-[85%] rounded-2xl bg-gray-800"></div>
          </div>
        </div>
        <!--end::Progress-->
      </div>
      <!-- end card body  -->
    </div>
    <!-- end card body  -->
  </div>
</template>
