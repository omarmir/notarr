<script setup lang="ts">
import { Milkdown, useEditor } from "@milkdown/vue"
import { Crepe } from "@milkdown/crepe"

const markdown = `# Milkdown Vue Crepe

> You're scared of a world where you're needed.

This is a demo for using Crepe with **Vue**.`

useEditor((root) => {
  const crepe = new Crepe({
    root,
    defaultValue: markdown,
  })
  return crepe
})
</script>

<template>
  <Milkdown />
</template>
