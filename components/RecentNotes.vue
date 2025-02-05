<template>
  <div
    class="bg-light/30 relative mb-5 flex min-w-0 flex-col break-words rounded-2xl border border-dashed border-stone-200 bg-clip-border">
    <!-- card header -->
    <div class="flex min-h-[70px] flex-wrap items-stretch justify-between bg-transparent px-9 pb-0 pt-5">
      <h3 class="text-dark m-2 ml-0 flex flex-col items-start justify-center">
        <span class="mr-3 text-lg font-medium">Recent Notes</span>
        <span class="font-base mt-1 text-sm text-gray-400">Notes created or modified recently</span>
      </h3>
      <div class="relative my-2 flex flex-wrap items-center">
        <!--Possible buttons-->
      </div>
    </div>
    <!-- end card header -->
    <!-- card body  -->
    <div class="block flex-auto px-9 py-8 pt-6">
      <div class="overflow-x-auto">
        <table class="text-dark my-0 w-full border-neutral-200 align-middle">
          <thead class="align-bottom">
            <tr class="text-secondary-dark text-[0.95rem]">
              <th class="pb-3 text-start text-xs font-medium uppercase text-gray-400">Note</th>
              <th class="pb-3 text-start text-xs font-medium uppercase text-gray-400">Notebook</th>
              <th class="pb-3 text-start text-xs font-medium uppercase text-gray-400">Created</th>
              <th class="pb-3 text-start text-xs font-medium uppercase text-gray-400">Updated</th>
              <th class="pb-3 text-start text-xs font-medium uppercase text-gray-400">Size</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="note in notes"
              :key="note.notebook + note.name"
              class="border-b border-dashed border-neutral-200 last:border-b-0">
              <td>
                <div class="my-3 flex flex-row items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M4 22V2h10l6 6v14zm9-13V4H6v16h12V9zM6 4v5zv16z" />
                  </svg>
                  <div class="flex flex-col justify-start">
                    <a
                      class="text-secondary-inverse hover:text-primary mb-1 text-sm font-semibold transition-colors duration-200 ease-in-out">
                      {{ note.name }}
                    </a>
                  </div>
                </div>
              </td>
              <td>
                <span class="text-light-inverse text-sm font-medium">
                  {{ note.notebook }}
                </span>
              </td>
              <td>
                <span class="text-light-inverse text-sm font-medium">
                  {{ note.createdAt }}
                </span>
              </td>
              <td>
                <span class="text-light-inverse text-sm font-medium">
                  {{ note.updatedAt }}
                </span>
              </td>
              <td>
                <span class="text-light-inverse text-sm font-medium">{{ note.size ? note.size / 1000 : 0 }}kb</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Note } from '~/types/notebook'

const { display } = defineProps<{ display: number }>()

const { data: notes, execute } = useFetch<Note[]>('/api/notes', {
  immediate: false,
  lazy: true,
  query: { display }
})

await execute()
</script>
