<template>
  <div>
    <NoteNewNote :notebook :on-background @added="(note: Note) => emit('added', note)"></NoteNewNote>
    <ul v-if="notes">
      <li v-for="note in notes" :key="note.name" class="my-4">
        <NuxtLink
          :to="`/${note.notebook}/${note.name}`"
          :class="{
            'text-gray-900 hover:text-gray-500': onBackground,
            'text-gray-400 hover:text-white': !onBackground
          }"
          class="flex flex-col gap-1">
          <div class="flex flex-row items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M4 22V2h10l6 6v14zm9-13V4H6v16h12V9zM6 4v5zv16z" />
            </svg>
            <span class="text-sm">{{ note.name }}</span>
          </div>
          <div class="ml-7 text-xs">
            Created: {{ new Date(note.createdAt).toLocaleDateString('en-CA') }} @
            {{ new Date(note.createdAt).toLocaleTimeString() }}
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import type { Note } from '~/types/notebook'
const emit = defineEmits<{
  (e: 'added', payload: Note): void
}>()
const {
  notes,
  notebook,
  onBackground = false
} = defineProps<{ notes: Note[] | null; notebook: string; onBackground?: boolean }>()
</script>
