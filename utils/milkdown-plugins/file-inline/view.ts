import { $view } from '@milkdown/utils'
import type { NodeViewConstructor } from '@milkdown/prose/view'
import type { Node } from '@milkdown/prose/model'
import type { InlineFileComponentProps } from './component'
import { InlineFileElement } from './component'
import { inlineFileConfig } from './config'
import { defIfNotExists, withMeta } from './extra'
import { fileSchema } from './schema'

defIfNotExists('milkdown-file-inline', InlineFileElement)
export const inlineFileView = $view(fileSchema.node, (ctx): NodeViewConstructor => {
  return (initialNode, view, getPos) => {
    const dom = document.createElement('milkdown-file-inline') as HTMLElement & InlineFileComponentProps
    const config = ctx.get(inlineFileConfig.key)
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

withMeta(inlineFileView, {
  displayName: 'NodeView<file-inline>',
  group: 'FileInline'
})
