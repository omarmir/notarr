import { expectDomTypeError } from '@milkdown/exception'
import { findSelectedNodeOfType } from '@milkdown/prose'
import { InputRule } from '@milkdown/prose/inputrules'
import { $command, $inputRule, $nodeAttr, $nodeSchema } from '@milkdown/utils'
import { withMeta } from './extra'

/// HTML attributes for file node.
export const fileAttr = $nodeAttr('file')

withMeta(fileAttr, {
  displayName: 'Attr<file>',
  group: 'File'
})

/// Schema for file node.
export const fileSchema = $nodeSchema('file', (ctx) => {
  return {
    inline: true,
    group: 'inline',
    selectable: true,
    draggable: true,
    marks: '',
    atom: true,
    defining: true,
    isolating: true,
    attrs: {
      href: { default: '' },
      alt: { default: '' },
      title: { default: '' }
    },
    parseDOM: [
      {
        tag: 'img[href]',
        getAttrs: (dom) => {
          if (!(dom instanceof HTMLElement)) throw expectDomTypeError(dom)

          return {
            href: dom.getAttribute('href') || '',
            alt: dom.getAttribute('alt') || '',
            title: dom.getAttribute('title') || dom.getAttribute('alt') || ''
          }
        }
      }
    ],
    toDOM: (node) => {
      return ['img', { ...ctx.get(fileAttr.key)(node), ...node.attrs }]
    },
    parseMarkdown: {
      match: ({ type }) => type === 'file',
      runner: (state, node, type) => {
        const url = node.url as string
        const alt = node.alt as string
        const title = node.title as string
        state.addNode(type, {
          href: url,
          alt,
          title
        })
      }
    },
    toMarkdown: {
      match: (node) => node.type.name === 'file',
      runner: (state, node) => {
        state.addNode('link', undefined, undefined, {
          title: node.attrs.title,
          url: node.attrs.href,
          alt: node.attrs.alt,
          label: node.attrs.alt,
          link: node.attrs.alt
        })
      }
    }
  }
})

withMeta(fileSchema.node, {
  displayName: 'NodeSchema<file>',
  group: 'File'
})

withMeta(fileSchema.ctx, {
  displayName: 'NodeSchemaCtx<file>',
  group: 'File'
})

/// @internal
export interface UpdateFileCommandPayload {
  href?: string
  title?: string
  alt?: string
}

/// This command will insert a file node.
/// You can pass a payload to set `href`, `alt` and `title` for the file node.
export const insertFileCommand = $command(
  'InsertFile',
  (ctx) =>
    (payload: UpdateFileCommandPayload = {}) =>
    (state, dispatch) => {
      if (!dispatch) return true

      const { href = '', alt = '', title = '' } = payload

      const node = fileSchema.type(ctx).create({ href, alt, title })
      if (!node) return true

      dispatch(state.tr.replaceSelectionWith(node).scrollIntoView())
      return true
    }
)

withMeta(insertFileCommand, {
  displayName: 'Command<insertFileCommand>',
  group: 'File'
})

/// This command will update the selected file node.
/// You can pass a payload to update `href`, `alt` and `title` for the file node.
export const updateFileCommand = $command(
  'UpdateFile',
  (ctx) =>
    (payload: UpdateFileCommandPayload = {}) =>
    (state, dispatch) => {
      const nodeWithPos = findSelectedNodeOfType(state.selection, fileSchema.type(ctx))
      if (!nodeWithPos) return false

      const { node, pos } = nodeWithPos

      const newAttrs = { ...node.attrs }
      const { href, alt, title } = payload
      if (href !== undefined) newAttrs.href = href
      if (alt !== undefined) newAttrs.alt = alt
      if (title !== undefined) newAttrs.title = title

      dispatch?.(state.tr.setNodeMarkup(pos, undefined, newAttrs).scrollIntoView())
      return true
    }
)

withMeta(updateFileCommand, {
  displayName: 'Command<updateFileCommand>',
  group: 'File'
})

/// This input rule will insert a file node.
/// You can input `![alt](href "title")` to insert a file node.
/// The `title` is optional.
export const insertFileInputRule = $inputRule(
  (ctx) =>
    new InputRule(
      // eslint-disable-next-line regexp/no-super-linear-backtracking
      /!\[(?<alt>.*?)\]\((?<filename>.*?)\s*(?="|\))"?(?<title>[^"]+)?"?\)/,
      (state, match, start, end) => {
        const [matched, alt, href = '', title] = match
        if (matched) return state.tr.replaceWith(start, end, fileSchema.type(ctx).create({ href, alt, title }))

        return null
      }
    )
)

withMeta(insertFileInputRule, {
  displayName: 'InputRule<insertFileInputRule>',
  group: 'File'
})
