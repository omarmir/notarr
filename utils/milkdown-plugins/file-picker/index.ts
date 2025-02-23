import type { MilkdownPlugin } from '@milkdown/kit/ctx'
import { $inputRule, $node, $nodeAttr, $remark } from '@milkdown/kit/utils'
import { InputRule } from '@milkdown/prose/inputrules'
import directive from 'remark-directive'
import { filePickerRemarkPlugin, regex } from './transformer'
import { inlineImageConfig } from './config'
import { inlineImageView } from './view'

const remarkPluginId = 'file-picker'
export const filePickerremarkDirective = $remark(remarkPluginId, () => directive)

export const fileAttr = $nodeAttr('file', () => ({
  href: {},
  title: {}
}))

export const filePickerNode = $node('file', () => ({
  group: 'inline',
  inline: true,
  atom: true,
  isolating: true,
  marks: '',
  attrs: {
    href: { default: null },
    title: { default: null }
  },
  parseDOM: [
    {
      tag: 'a',
      getAttrs: (dom) => ({
        href: dom.getAttribute('href'),
        title: dom.getAttribute('title')
      })
    }
  ],
  toDOM: (node) => {
    const { href, title } = node.attrs
    return [
      'button',
      {
        type: 'button',
        'data-href': href,
        class: 'attachment-button flex flex-row',
        onclick: `window.open('${href}', '_blank')`
      },
      title
    ]
  },
  parseMarkdown: {
    match: ({ type }) => type === 'file',
    runner: (state, node, type) => {
      const attrs = node.attributes as { href: string; title: string }
      state.addNode(type, { href: attrs.href, title: attrs.title })
    }
  },
  toMarkdown: {
    match: (node) => node.type.name === 'file',
    runner: (state, node) => {
      const { href, title } = node.attrs
      state.addNode('text', undefined, `::file{href="${href}" title="${title}"}`)
    }
  }
}))

export const filePickerRule = $inputRule(
  (ctx) =>
    new InputRule(regex, (state, match, start, end) => {
      const [_full = '', href = '', title = ''] = match
      const { tr } = state

      if (href) {
        tr.replaceWith(start - 1, end, filePickerNode.type(ctx).create({ href, title }))
      }

      return tr
    })
)

export const filePicker: MilkdownPlugin[] = [
  fileAttr,
  filePickerremarkDirective,
  filePickerNode,
  filePickerRule,
  filePickerRemarkPlugin,
  inlineImageConfig,
  inlineImageView
].flat()
