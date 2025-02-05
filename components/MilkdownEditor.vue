<template>
  <Milkdown />
</template>

<script setup lang="ts">
import { Milkdown, useEditor } from '@milkdown/vue'
import { Crepe } from '@milkdown/crepe'
import { listener, listenerCtx } from '@milkdown/kit/plugin/listener'
import { upload } from '@milkdown/kit/plugin/upload'
import { imageBlockConfig } from '@milkdown/kit/component/image-block'
import '@milkdown/crepe/theme/common/style.css'
import '@milkdown/crepe/theme/nord.css'

const model = defineModel<string>({ required: true })

const toBase64 = (file: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

useEditor((root) => {
  const crepe = new Crepe({
    root,
    defaultValue: model.value
  })

  crepe.editor
    .config((ctx) => {
      const listener = ctx.get(listenerCtx)
      listener.markdownUpdated((_ctx, markdown, prevMarkdown) => {
        if (markdown !== prevMarkdown) {
          model.value = markdown
        }
      })

      ctx.update(imageBlockConfig.key, (defaultConfig) => ({
        ...defaultConfig,
        onUpload: async (file) => await toBase64(file)
      }))
    })
    .use(listener)
    .use(upload)
  return crepe
})
</script>
