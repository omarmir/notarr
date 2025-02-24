import { c, html, useRef, useState } from 'atomico'
import type { Component } from 'atomico'
import clsx from 'clsx'
import type { FilePickerConfig } from './config'
import { waitforme } from '~/server/utils'
import { getIcon } from 'material-file-icons'

export * from './config'

export interface Attrs {
  href: string
  title: string
}

const getHTMLIcon = (title: string | undefined) => {
  const icon = getIcon(title ?? '').svg
  return html`
    <span innerHTML=${icon}></span>
  `
}

export type FilePickerComponentProps = Attrs & {
  setAttr: <T extends keyof Attrs>(attr: T, value: Attrs[T]) => void
  selected: boolean
  config: FilePickerConfig
}

export const filePickerComponent: Component<FilePickerComponentProps> = ({
  href = '',
  selected = false,
  title,
  setAttr,
  config
}) => {
  const linkInput = useRef<HTMLInputElement>()
  const [uploading, setUploading] = useState(false)
  const [focusLinkInput, setFocusLinkInput] = useState(false)

  const onUpload = async (e: InputEvent) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (!file) return
    setUploading(true)
    await waitforme(2000)
    const url = await config?.onUpload(file)
    setUploading(false)
    if (!url) return
    setAttr?.('href', url)
    setAttr?.('title', file.name)
  }

  const preventDrag = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return html`
    <host class=${clsx(selected && 'selected', !href && 'empty')}>
      ${!href
        ? html`
            <div class="empty-file">
              <input
                ref=${linkInput}
                ondragstart=${preventDrag}
                onfocus=${() => setFocusLinkInput(true)}
                onchange=${onUpload}
                onclick=${() => linkInput.current?.focus()}
                class="file-input ${clsx('link-importer', focusLinkInput && 'focus')}"
                type="file" />
              ${uploading
                ? html`
                    <div class="uploading-icon">${config?.uploadingHTML()}</div>
                  `
                : ''}
            </div>
          `
        : html`
            <a
              type="button"
              title="Download ${title}"
              href="${href}"
              download
              class="attachment-button"
              contenteditable="false">
              <div class="file-icon">${getHTMLIcon(title)}</div>
              ${title}
            </a>
          `}
    </host>
  `
}

filePickerComponent.props = {
  href: String,
  title: String,
  selected: Boolean,
  setAttr: Function,
  config: Object
}

export const FilePickerElement = c(filePickerComponent)
