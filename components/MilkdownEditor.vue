<template>
  <Milkdown class="milkdown-editor" :class="{ focus: isFocus }" />
</template>

<script setup lang="ts">
import { Milkdown, useEditor } from '@milkdown/vue'
import { Crepe } from '@milkdown/crepe'
import { listener, listenerCtx } from '@milkdown/kit/plugin/listener'
import { upload, uploadConfig } from '@milkdown/kit/plugin/upload'
import { imageInlineComponent, inlineImageConfig } from '@milkdown/kit/component/image-inline'
import { imageBlockConfig } from '@milkdown/kit/component/image-block'
import { editorViewOptionsCtx, editorViewCtx } from '@milkdown/kit/core'
import { emoji } from '@milkdown/plugin-emoji'
import { createUploader, onUpload } from '~/utils/uploader'
import '@milkdown/crepe/theme/common/style.css'
import '@milkdown/crepe/theme/nord.css'
import '@milkdown/crepe/theme/nord-dark.css'

const model = defineModel<string>({ required: true })
const { disabled, isFocus, note, notebook } = defineProps<{
  disabled: boolean
  isFocus: boolean
  note: string
  notebook: string
}>()

const customUploader = createUploader(notebook, note)

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
        onUpload: async (file: File) => onUpload(file, notebook, note)
      }))

      ctx.update(inlineImageConfig.key, (prev) => ({
        ...prev,
        onUpload: async (file: File) => onUpload(file, notebook, note)
      }))

      ctx.update(uploadConfig.key, (prev) => ({
        ...prev,
        uploader: customUploader
      }))

      ctx.update(editorViewOptionsCtx, (prev) => ({
        ...prev,
        editable: () => !disabled
      }))
    })
    .use(listener)
    .use(upload)
    .use(emoji)
    .use(imageInlineComponent)
  return crepe
})
</script>
<style lang="postcss">
.milkdown-editor div.milkdown > div {
  @apply px-0 py-0 text-gray-900 dark:text-gray-200;
}

.milkdown-editor div.milkdown {
  @apply px-0 py-1;
}

.milkdown-editor.focus div.milkdown milkdown-block-handle {
  display: none;
}

.milkdown {
  --crepe-color-background: transparent;
}

.milkdown-editor div.milkdown .ProseMirror {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 10px 0px;
  }
}

.milkdown-editor .milkdown .ProseMirror p {
  padding: 0px;
}

milkdown-toolbar {
  z-index: 999;
}
</style>
