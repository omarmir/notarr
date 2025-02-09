<template>
  <div class="flex flex-row flex-wrap gap-4">
    <h1>
      <input
        v-model="note"
        class="bg-transparent pr-10 text-xl font-semibold text-gray-900 focus:italic focus:outline-none"
        aria-label="Rename name"
        aria-details="Allows you to rename the note" />
    </h1>
    <CommonButton
      v-if="isRenaming"
      :show-loading="true"
      :is-loading="renamePending"
      :disabled="savingState === 'pending'"
      @click="renameNote">
      Rename
    </CommonButton>
    <DangerAlert v-if="error" class="w-full">{{ error }}</DangerAlert>
  </div>
</template>
<script lang="ts" setup>
import type { RenameNote, SavingState } from '~/types/notebook'
import type { FetchError } from 'ofetch'

const { name, notebook, savingState } = defineProps<{ name: string; savingState: SavingState; notebook: string }>()
const note = ref(name)
// const router = useRouter()

const isRenaming = computed(() => name !== note.value)
const error: Ref<string | null> = ref(null)
const renamePending = defineModel<boolean>({ required: true })

const renameNote = async () => {
  try {
    renamePending.value = true
    const rename = await $fetch<RenameNote>(`/api/${notebook}/${name}`, {
      body: { newName: note.value },
      // @ts-expect-error Not sure exactly what is happening here but nuxt seems to complain about route methods even if they exist
      immediate: false,
      method: 'PUT',
      lazy: true,
      watch: false
    })
    navigateTo(`${rename.newName}`)
  } catch (e) {
    const err = e as FetchError
    error.value = err.data?.message ?? err
  } finally {
    renamePending.value = false
  }
}
</script>
