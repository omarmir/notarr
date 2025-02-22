import { $nodeSchema } from '@milkdown/utils'
import { expectDomTypeError } from '@milkdown/exception'

export const IMAGE_DATA_TYPE = 'image-block'

export const fileUploadSchema = $nodeSchema('image-block', () => {
  return {
    inline: true,
    group: 'block',
    selectable: true,
    draggable: true,
    isolating: true,
    marks: '',
    atom: true,
    priority: 100,
    attrs: {
      src: { default: '' },
      caption: { default: '' }
    },
    parseDOM: [
      {
        tag: `img[data-type="${IMAGE_DATA_TYPE}"]`,
        getAttrs: (dom) => {
          if (!(dom instanceof HTMLElement)) throw expectDomTypeError(dom)

          return {
            src: dom.getAttribute('src') || '',
            caption: dom.getAttribute('caption') || ''
          }
        }
      }
    ],
    toDOM: (node) => ['img', { 'data-type': IMAGE_DATA_TYPE, ...node.attrs }],
    parseMarkdown: {
      match: ({ type }) => type === 'image-block',
      runner: (state, node, type) => {
        const src = node.url as string
        const caption = node.title as string

        state.addNode(type, {
          src,
          caption
        })
      }
    },
    toMarkdown: {
      match: (node) => node.type.name === 'image-block',
      runner: (state, node) => {
        state.openNode('paragraph')
        state.addNode('image', undefined, undefined, {
          title: node.attrs.caption,
          url: node.attrs.src
        })
        state.closeNode()
      }
    }
  }
})
