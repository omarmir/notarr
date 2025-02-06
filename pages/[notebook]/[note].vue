<template>
  <div class="-mx-3 mb-5 flex flex-wrap">
    <div class="mb-6 w-full max-w-full px-3 sm:flex-none">
      <h1 class="text-xl font-semibold text-gray-900">{{ note }}</h1>
      <DangerAlert v-if="error">{{ error }}</DangerAlert>
      <MilkdownProvider>
        <Milkdown v-model="md" />
      </MilkdownProvider>
    </div>
  </div>
</template>
<script setup lang="ts">
import Milkdown from '~/components/MilkdownEditor.vue'
import { MilkdownProvider } from '@milkdown/vue'
import { watchDebounced } from '@vueuse/core'
import type { FetchError } from 'ofetch'
const route = useRoute()
const notebook = route.params.notebook
const note = route.params.note

const error: Ref<string | null> = ref(null)

const md: Ref<string> = ref('')

const fetchMarkdown = async () => {
  if (!note || !notebook) {
    error.value = 'Notebook or note not specified'
  }

  try {
    /**
     * Server route uses sendStream(), which sends data incrementally. To consume this properly in the client:
     * Native fetch gives direct access to the ReadableStream via response.body
     * $fetch/useFetch abstract the stream away, trying to parse the entire response at once (not ideal for chunks)
     */
    const response = await fetch(`/api/${notebook}/${note}/download`)

    if (!response.body) throw new Error('No response body')

    // Create a reader for the stream
    const reader = response.body.getReader()
    // Decode the Uint8Array chunks to text
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      // Append each chunk to the ref value
      md.value += decoder.decode(value)
    }
  } catch (err) {
    console.error('Download failed:', err)
    error.value = `Error fetching markdown: ${err}`
  }
}

// Call when needed (e.g., in onMounted or click handler)
await fetchMarkdown()

watchDebounced(md, () => saveFile(md.value), { debounce: 500, maxWait: 5000 })

const saveFile = async (markdownText: string) => {
  const blob = new Blob([markdownText], { type: 'text/markdown' })

  const formData = new FormData()
  formData.append('file', blob, 'example.md') // The file to upload
  formData.append('filename', 'example.md') // The filename to use when saving

  try {
    //@ts-expect-error For some reason I can't issue PATCH requests...
    await $fetch(`/api/${notebook}/${note}`, { method: 'PATCH', body: formData })
  } catch (err) {
    error.value = `Unable to save: ${(err as FetchError).data.message}`
  }
}
</script>
