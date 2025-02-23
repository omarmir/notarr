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
// import { clearContentAndAddBlockType } from '~/utils/md-utils'
// import { fileUploadSchema } from '~/utils/file-schema'
import { fileSchema } from '~/utils/milkdown-plugins/file-inline/schema'
import { filePicker } from '~/utils/milkdown-plugins/file-picker'

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
    defaultValue: model.value,
    features: {
      [Crepe.Feature.Latex]: true
    },
    featureConfigs: {
      'block-edit': {
        buildMenu: (builder) => {
          const advanced = builder.getGroup('advanced')
          advanced.addItem('file', {
            label: 'File',
            icon: '',
            onRun: (ctx) => {
              const view = ctx.get(editorViewCtx)
              const { dispatch, state } = view

              const command = clearContentAndAddBlockType(fileSchema.type(ctx))
              command(state, dispatch)
            }
          })
        }
      }
    }
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
    .use(fileSchema)
    .use(imageInlineComponent)
    .use(filePicker)
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

milkdown-toolbar,
milkdown-link-preview {
  z-index: 999 !important;
}

.milkdown-editor .milkdown .image-inline {
  @apply inline-block;
}

.milkdown-editor .milkdown img.emoji {
  @apply mr-0.5 inline h-5;
}

.milkdown-editor .milkdown button.attachment-button {
  @apply inline-block rounded-sm bg-accent px-2 py-0 text-white hover:bg-accent-hover;
  position: relative;
  padding-left: 32px; /* Adjust the padding to make space for the icon */
}

.milkdown-editor .milkdown button.attachment-button::before {
  content: '';
  display: inline-block;
  vertical-align: middle;
  margin-right: 4px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="white" d="m8 9l4-4H9V1H7v4H4zm3.636-1.636l-1.121 1.121L14.579 10L8 12.453L1.421 10l4.064-1.515l-1.121-1.121L0 9v4l8 3l8-3V9z"/></svg>');
  width: 16px;
  height: 16px;
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
