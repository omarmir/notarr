import { $inputRule, $nodeAttr, $nodeSchema } from '@milkdown/kit/utils'
import { InputRule } from '@milkdown/prose/inputrules'
import { regex } from './transformer'

export const fileAttr = $nodeAttr('file', () => ({
  href: {},
  title: {}
}))

export const filePickerNode = $nodeSchema('file', () => ({
  group: 'inline',
  inline: true,
  atom: true,
  isolating: true,
  marks: '',
  attrs: {
    href: { default: '' },
    title: { default: '' }
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
      'a',
      {
        type: 'button',
        title: title,
        download: true,
        href: href,
        contenteditable: false,
        class: 'attachment-button flex flex-row'
      },
      title ?? ''
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
