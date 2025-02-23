import { $view } from '@milkdown/utils'
import type { NodeViewConstructor } from '@milkdown/prose/view'
import { filePickerNode } from '.'
import { InlineImageElement, type InlineImageComponentProps } from './component'
import { defIfNotExists, withMeta } from './meta'
import { inlineImageConfig } from './config'
import type { Node } from '@milkdown/prose/model'

defIfNotExists('milkdown-image-inline', InlineImageElement)
export const inlineImageView = $view(filePickerNode, (ctx): NodeViewConstructor => {
  return (initialNode, view, getPos) => {
    const dom = document.createElement('milkdown-image-inline') as HTMLElement & InlineImageComponentProps
    const config = ctx.get(inlineImageConfig.key)
    const proxyDomURL = config.proxyDomURL
    const bindAttrs = (node: Node) => {
      if (!proxyDomURL) {
        dom.href = node.attrs.href
      } else {
        const proxiedURL = proxyDomURL(node.attrs.href)
        if (typeof proxiedURL === 'string') {
          dom.href = proxiedURL
        } else {
          proxiedURL.then((url) => {
            dom.href = url
          })
        }
      }
      dom.alt = node.attrs.alt
      dom.title = node.attrs.title
    }
    bindAttrs(initialNode)
    dom.selected = false
    dom.setAttr = (attr, value) => {
      const pos = getPos()
      if (pos == null) return

      view.dispatch(view.state.tr.setNodeAttribute(pos, attr, value))
    }
    dom.config = config
    return {
      dom,
      update: (updatedNode) => {
        if (updatedNode.type !== initialNode.type) return false

        bindAttrs(updatedNode)
        return true
      },
      stopEvent: (e) => {
        if (dom.selected && e.target instanceof HTMLInputElement) return true

        return false
      },
      selectNode: () => {
        dom.selected = true
      },
      deselectNode: () => {
        dom.selected = false
      },
      destroy: () => {
        dom.remove()
      }
    }
  }
})

withMeta(inlineImageView, {
  displayName: 'NodeView<image-inline>',
  group: 'ImageInline'
})
