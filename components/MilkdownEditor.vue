<template>
  <Milkdown />
</template>

<script setup lang="ts">
import { Milkdown, useEditor } from "@milkdown/vue"
import { Crepe } from "@milkdown/crepe"
import { listener, listenerCtx } from "@milkdown/kit/plugin/listener"

const model = defineModel<string>({ required: true })

useEditor((root) => {
  const crepe = new Crepe({
    root,
    defaultValue: model.value,
  })

  crepe.editor.config((ctx) => {
    const listener = ctx.get(listenerCtx)

    listener.markdownUpdated((ctx, markdown, prevMarkdown) => {
      if (markdown !== prevMarkdown) {
        model.value = markdown
      }
    })
  })
  return crepe
})
</script>
