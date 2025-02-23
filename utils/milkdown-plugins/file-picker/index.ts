import { $inputRule, $node, $remark } from '@milkdown/kit/utils'
import { InputRule } from '@milkdown/prose/inputrules'
import directive from 'remark-directive'

const remarkPluginId = 'file-picker'
export const filePickerremarkDirective = $remark(remarkPluginId, () => directive)

export const filePickerNode = $node('file', () => ({
  group: 'block',
  // inline: true,
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
        onclick: `window.open('${href}', '_blank')`
      },
      title
    ]
  },
  parseMarkdown: {
    match: (node) => {
      console.log(node)
      return node.type === 'leafDirective' && node.name === 'file'
    },
    runner: (state, node, type) => {
      const attrs = node.attributes as { href: string; title: string }
      state.addNode(type, { href: attrs.href, title: attrs.title })
    }
  },
  toMarkdown: {
    match: (node) => node.type.name === 'file',
    runner: (state, node) => {
      state.addNode('leafDirective', undefined, undefined, {
        name: 'file',
        attributes: { href: node.attrs.href, title: node.attrs.title }
      })
    }
  }
}))

export const filePickerRule = $inputRule(
  (ctx) =>
    new InputRule(/::file\{href="(?<href>[^"]+)?"? title="(?<title>[^"]+)?"?\}/, (state, match, start, end) => {
      const [href = '', title = ''] = match
      const { tr } = state

      if (href) {
        tr.replaceWith(start - 1, end, filePickerNode.type(ctx).create({ href, title }))
      }

      return tr
    })
)
