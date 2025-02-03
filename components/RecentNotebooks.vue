<template>
  <div
    class="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 mb-5">
    <!-- card header -->
    <div
      class="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
      <h3 class="flex flex-col items-start justify-center m-2 ml-0 text-dark">
        <span class="mr-3 font-medium text-lg">Recent Notes</span>
        <span class="mt-1 font-base text-gray-400 text-sm">
          Notes created or modified recently
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
                Note
              </th>
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
                Size
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="border-b border-neutral-200 border-dashed last:border-b-0"
              v-for="note in notes"
              :key="note.notebook + note.name">
              <td>
                <div class="flex items-center my-3 flex-row gap-2">
                  <Avatar
                    :size="30"
                    variant="beam"
                    :name="note.notebook + note.name" />
                  <div class="flex flex-col justify-start">
                    <a
                      class="mb-1 font-semibold transition-colors duration-200 ease-in-out text-secondary-inverse hover:text-primary text-sm">
                      {{ note.name }}
                    </a>
                  </div>
                </div>
              </td>
              <td>
                <span class="font-medium text-light-inverse text-sm">
                  {{ note.notebook }}
                </span>
              </td>
              <td>
                <span class="font-medium text-light-inverse text-sm">
                  {{ note.createdAt }}
                </span>
              </td>
              <td>
                <span class="font-medium text-light-inverse text-sm">
                  {{ note.updatedAt }}
                </span>
              </td>
              <td>
                <span class="font-medium text-light-inverse text-sm">
                  {{ note.size ? note.size / 1000 : 0 }}kb
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
import Avatar from "vue-boring-avatars"
const { display } = defineProps<{ display: number }>()

import type { Note } from "~/types/notebook"

const { data: notes, execute } = useFetch<Note[]>("/api/notes", {
  immediate: false,
  lazy: true,
  query: { display },
})

await execute()
</script>
