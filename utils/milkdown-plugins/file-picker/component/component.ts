import { c, html, useRef, useState } from 'atomico'
import type { Component } from 'atomico'
import { customAlphabet } from 'nanoid'
import clsx from 'clsx'
import type { FilePickerConfig } from './config'

export * from './config'

export interface Attrs {
  href: string
  title: string
}

export type FilePickerComponentProps = Attrs & {
  setAttr: <T extends keyof Attrs>(attr: T, value: Attrs[T]) => void
  selected: boolean
  config: FilePickerConfig
}

const nanoid = customAlphabet('abcdefg', 8)

export const filePickerComponent: Component<FilePickerComponentProps> = ({
  href = '',
  selected = false,
  title,
  setAttr,
  config
}) => {
  const linkInput = useRef<HTMLInputElement>()
  const [uuid] = useState(nanoid())
  const [focusLinkInput, setFocusLinkInput] = useState(false)
  const [hidePlaceholder, setHidePlaceholder] = useState(href.length !== 0)
  const [currentLink, setCurrentLink] = useState(href)

  const onEditLink = (e: InputEvent) => {
    const target = e.target as HTMLInputElement
    const value = target.value
    setHidePlaceholder(value.length !== 0)
    setCurrentLink(value)
  }

  const onUpload = async (e: InputEvent) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (!file) return

    const url = await config?.onUpload(file)
    if (!url) return

    setAttr?.('href', url)
    setAttr?.('title', file.name)
    setHidePlaceholder(true)
  }

  const onConfirmLinkInput = () => {
    setAttr?.('href', linkInput.current?.value ?? '')
  }

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') onConfirmLinkInput()
  }

  const preventDrag = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const onClickUploader = (e: PointerEvent) => {
    e.stopPropagation()
    e.preventDefault()
  }

  return html`
    <host class=${clsx(selected && 'selected', !href && 'empty')}>
      ${!href
        ? html`
            <div class="empty-image-inline">
              <div class="image-icon">${config?.imageIcon()}</div>
              <div class=${clsx('link-importer', focusLinkInput && 'focus')}>
                <input
                  draggable="true"
                  ref=${linkInput}
                  ondragstart=${preventDrag}
                  class="link-input-area"
                  value=${currentLink}
                  oninput=${onEditLink}
                  onkeydown=${onKeydown}
                  onfocus=${() => setFocusLinkInput(true)}
                  onblur=${() => setFocusLinkInput(false)} />
                <div class=${clsx('placeholder', hidePlaceholder && 'hidden')}>
                  <input class="hidden" id=${uuid} type="file" accept="image/*" onchange=${onUpload} />
                  <label onpointerdown=${onClickUploader} class="uploader" for=${uuid}>${config?.uploadButton()}</label>
                  <span class="text" onclick=${() => linkInput.current?.focus()}>${config?.uploadPlaceholderText}</span>
                </div>
              </div>
              <div class=${clsx('confirm', currentLink.length === 0 && 'hidden')} onclick=${() => onConfirmLinkInput()}>
                ${config?.confirmButton()}
              </div>
            </div>
          `
        : html`
            <a
              type="button"
              title="Download ${title}"
              href="${href}"
              download
              class="attachment-button flex flex-row"
              contenteditable="false">
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
