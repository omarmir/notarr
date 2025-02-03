<template>
  <div
    class="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 mb-5">
    <!-- card header -->
    <div
      class="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
      <h3 class="flex flex-col items-start justify-center m-2 ml-0 text-dark">
        <span class="mr-3 font-medium text-lg">Notebooks</span>
        <span class="mt-1 font-base text-gray-400 text-sm">
          All notebooks
        </span>
      </h3>
      <div class="relative flex flex-wrap items-center my-2">
        <div class="relative flex flex-wrap items-center my-2">
          <a
            href="javascript:void(0)"
            class="inline-block text-sm font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-150 ease-in-out shadow-none border-0 py-2 px-5">
            Add new notebook
          </a>
        </div>
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
              <th
                class="pb-3 text-start text-gray-400 uppercase text-xs font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="notebook in notebooks"
              :key="notebook.name"
              class="border-b border-neutral-200 border-dashed last:border-b-0">
              <td>
                <div class="flex items-center my-3 flex-row gap-2">
                  <Avatar :size="30" variant="bauhaus" :name="notebook.name" />
                  <div class="flex flex-col justify-start">
                    <a
                      class="mb-1 font-semibold transition-colors duration-200 ease-in-out text-secondary-inverse hover:text-primary text-sm">
                      {{ notebook.name }}
                    </a>
                  </div>
                </div>
              </td>
              <td>
                <span class="font-medium text-light-inverse text-sm">
                  {{ notebook.createdAt }}
                </span>
              </td>
              <td class="py-3">
                <span class="font-medium text-light-inverse text-sm">
                  {{ notebook.updatedAt }}
                </span>
              </td>
              <td class="py-3">
                <div
                  class="font-medium text-light-inverse text-sm text-white bg-emerald-600 size-8 text-center rounded-full flex items-center justify-center">
                  <span>{{ notebook.fileCount }}</span>
                </div>
              </td>
              <td>
                <span class="font-medium text-light-inverse text-sm">
                  <button>New note</button>
                  <button>View notes</button>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Notebook } from "~/types/notebook"
import Avatar from "vue-boring-avatars"

const { data: notebooks, execute } = useFetch<Notebook[]>("/api/notebooks", {
  immediate: false,
  lazy: true,
})

await execute()
</script>
