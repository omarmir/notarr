<template>
  <Milkdown class="milkdown-editor" />
</template>

<script setup lang="ts">
import { Milkdown, useEditor } from '@milkdown/vue'
import { Crepe } from '@milkdown/crepe'
import { listener, listenerCtx } from '@milkdown/kit/plugin/listener'
import { upload } from '@milkdown/kit/plugin/upload'
import { imageBlockConfig } from '@milkdown/kit/component/image-block'
import { editorViewOptionsCtx, editorViewCtx } from '@milkdown/kit/core'
import { emoji } from '@milkdown/plugin-emoji'
import '@milkdown/crepe/theme/common/style.css'
import '@milkdown/crepe/theme/nord.css'

const model = defineModel<string>({ required: true })
const { disabled } = defineProps<{ disabled: boolean }>()

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

      listener.mounted((ctx) => {
        if (model.value.length === 0) ctx.get(editorViewCtx).focus()
      })

      ctx.update(imageBlockConfig.key, (defaultConfig) => ({
        ...defaultConfig,
        onUpload: async (file) => await toBase64(file)
      }))

      ctx.update(editorViewOptionsCtx, (prev) => ({
        ...prev,
        editable: () => !disabled
      }))
    })
    .use(listener)
    .use(upload)
    .use(emoji)
  return crepe
})
</script>
<style>
.milkdown-editor div.milkdown > div {
  @apply px-0 py-0;
}

.milkdown-editor div.milkdown {
  @apply px-0 py-1;
}

.milkdown {
  --crepe-color-background: #f3f4f6;
}

.milkdown milkdown-code-block .cm-content {
  @apply bg-gray-800;
}

.milkdown milkdown-code-block {
  background: transparent;
}

.milkdown milkdown-code-block .cm-gutters {
  @apply bg-gray-950 text-slate-400;
}
</style>
