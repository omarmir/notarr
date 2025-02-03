<template>
  <h3 class="font-semibold mb-4 text-xl">Notebooks</h3>
  <div
    class="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 mb-5">
    <!-- card header -->
    <div
      class="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
      <h3 class="flex flex-col items-start justify-center m-2 ml-0 text-dark">
        <span class="mr-3 font-medium text-lg">Recent Notebooks</span>
        <span class="mt-1 font-base text-gray-400 text-sm">
          Check all courses available
        </span>
      </h3>
      <div class="relative flex flex-wrap items-center my-2">
        <!--Possible buttons-->
      </div>
    </div>
    <!-- end card header -->
    <!-- card body  -->
    <div class="flex-auto block py-8 pt-6 px-9">
      <div class="overflow-x-auto">
        <table class="w-full my-0 align-middle text-dark border-neutral-200">
          <thead class="align-bottom">
            <tr class="text-[0.95rem] text-secondary-dark">
              <th
                class="pb-3 text-start text-gray-400 uppercase text-xs font-medium">
                Notebook
              </th>
              <th
                class="pb-3 text-start text-gray-400 uppercase text-xs font-medium">
                Created
              </th>
              <th
                class="pb-3 text-start text-gray-400 uppercase text-xs font-medium">
                Updated
              </th>
              <th
                class="pb-3 text-start text-gray-400 uppercase text-xs font-medium">
                # of Notes
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-dashed last:border-b-0">
              <td>
                <div class="flex items-center">
                  <div class="relative inline-block shrink-0 rounded-2xl me-3">
                    <img
                      src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/img-49-new.jpg"
                      class="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl"
                      alt="" />
                  </div>
                  <div class="flex flex-col justify-start">
                    <a
                      class="mb-1 font-semibold transition-colors duration-200 ease-in-out text-secondary-inverse hover:text-primary text-sm">
                      Social Media API
                    </a>
                  </div>
                </div>
              </td>
              <td>
                <span class="font-medium text-light-inverse text-sm">
                  2023-08-23
                </span>
              </td>
              <td>
                <span class="font-medium text-light-inverse text-sm">
                  2023-08-23
                </span>
              </td>
              <td>
                <div
                  class="font-medium text-light-inverse text-sm text-white bg-emerald-600 size-8 text-center rounded-full flex items-center justify-center">
                  <span>5</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
