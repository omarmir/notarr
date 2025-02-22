import { $ctx } from '@milkdown/utils'
import { html } from 'atomico'
import { withMeta } from './extra'

export interface InlineFileConfig {
  fileIcon: () => ReturnType<typeof html>
  uploadButton: () => ReturnType<typeof html>
  confirmButton: () => ReturnType<typeof html>
  uploadPlaceholderText: string
  onUpload: (file: File) => Promise<string>
  proxyDomURL?: (url: string) => Promise<string> | string
}

export const defaultInlineFileConfig: InlineFileConfig = {
  fileIcon: () => '🌌',
  uploadButton: () => html`
    Upload
  `,
  confirmButton: () => html`
    ⏎
  `,
  uploadPlaceholderText: '/Paste',
  onUpload: (file) => Promise.resolve(URL.createObjectURL(file))
}

export const inlineFileConfig = $ctx(defaultInlineFileConfig, 'inlineFileConfigCtx')

withMeta(inlineFileConfig, {
  displayName: 'Config<file-inline>',
  group: 'FileInline'
})
