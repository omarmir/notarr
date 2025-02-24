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
import { filePicker } from '~/utils/milkdown-plugins/file-picker'
// import { filePickerComponent } from '~/utils/milkdown-plugins/file-picker/component'

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
            onRun: (_ctx) => {
              // const view = ctx.get(editorViewCtx)
              // const { dispatch, state } = view
              // const command = clearContentAndAddBlockType(fileSchema.type(ctx))
              // command(state, dispatch)
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
    .use(imageInlineComponent)
    .use(filePicker)
  return crepe
})
</script>
<style lang="postcss">
.milkdown-editor.focus div.milkdown milkdown-block-handle {
  display: none;
}

milkdown-toolbar,
milkdown-link-preview {
  z-index: 999 !important;
}

.milkdown-editor {
  .milkdown {
    @apply px-0 py-1;
    --crepe-color-background: transparent;
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 10px 0px;
    }

    .ProseMirror {
      p {
        @apply p-0 align-middle;
      }
    }

    > div {
      @apply px-0 py-0 text-gray-900 dark:text-gray-200;
    }

    .image-inline {
      @apply inline-block;
    }

    img.emoji {
      @apply mr-0.5 inline h-5;
    }

    a.attachment-button {
      @apply inline-flex flex-row items-center rounded-md bg-slate-600 px-2 py-0.5 text-sm text-white no-underline hover:bg-accent-hover;
    }
    milkdown-file-picker {
      @apply inline align-middle;
      .file-input {
        @apply inline cursor-pointer items-center rounded-md border border-gray-300 bg-gray-50 text-sm text-gray-900 file:cursor-pointer file:rounded-l-md file:border-none file:bg-accent file:py-0.5 file:text-white file:hover:bg-accent-hover focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400;
      }
      .uploading-icon {
        @apply inline size-5;
      }
      div.empty-file {
        @apply inline-flex flex-row items-center gap-1;
      }
      div.file-icon {
        @apply inline !size-5;
      }
    }
  }
}
</style>
