import { $ctx } from '@milkdown/utils'
import { html } from 'atomico'

export interface FilePickerConfig {
  imageIcon: () => ReturnType<typeof html>
  uploadButton: () => ReturnType<typeof html>
  confirmButton: () => ReturnType<typeof html>
  uploadPlaceholderText: string
  onUpload: (file: File) => Promise<string>
  proxyDomURL?: (url: string) => Promise<string> | string
}

export const defaultFilePickerConfig: FilePickerConfig = {
  imageIcon: () => '🌌',
  uploadButton: () => html`
    Upload
  `,
  confirmButton: () => html`
    ⏎
  `,
  uploadPlaceholderText: '/Paste',
  onUpload: (file) => Promise.resolve(URL.createObjectURL(file))
}

export const filePickerConfig = $ctx(defaultFilePickerConfig, 'filePickerConfigCtx')
