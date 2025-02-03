<template>
  <MainPage>
    <template #heading>Note</template>
    <MilkdownProvider>
      <Milkdown v-model="md" />
    </MilkdownProvider>
  </MainPage>
</template>

<script setup lang="ts">
import Milkdown from "~/components/MilkdownEditor.vue"
import { MilkdownProvider } from "@milkdown/vue"
import { watchDebounced } from "@vueuse/core"

const md = ref(`# Milkdown Vue Crepe

> You're scared of a world where you're needed.

This is a demo for using Crepe with **Vue**.`)

watchDebounced(md, () => saveFile(md.value), { debounce: 500, maxWait: 5000 })

const saveFile = (markdownText: string) => {
  const blob = new Blob([markdownText], { type: "text/markdown" })

  const formData = new FormData()
  formData.append("file", blob, "example.md") // The file to upload
  formData.append("filename", "example.md") // The filename to use when saving

  fetch("/api/save", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("File uploaded successfully:", data)
    })
    .catch((error) => {
      console.error("Error uploading file:", error)
    })
}
</script>
