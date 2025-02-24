import { $view, type $Node } from '@milkdown/utils'
import type { NodeViewConstructor } from '@milkdown/prose/view'
import type { Node } from '@milkdown/prose/model'
import { FilePickerElement, type FilePickerComponentProps } from './component'
import { filePickerConfig } from './config'
import { defIfNotExists } from './helpter'

defIfNotExists('milkdown-file-picker', FilePickerElement)

export const filePickerViewGenerator = (type: $Node) => {
  const filePickerView = $view(type, (ctx): NodeViewConstructor => {
    return (initialNode, view, getPos) => {
      const inline = type.schema.group === 'inline' ? true : false
      const dom = document.createElement('milkdown-file-picker') as HTMLElement & FilePickerComponentProps
      dom.dataset.inline = inline.toString()
      const config = ctx.get(filePickerConfig.key)
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

  return filePickerView
}
