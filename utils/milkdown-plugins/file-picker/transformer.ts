import type { Node, RemarkPluginRaw } from '@milkdown/transformer'
import { $remark } from '@milkdown/utils'

export const regex = /::file\{href="(?<href>[^"]+)?"? title="(?<title>[^"]+)?"?\}/
export const shortRegex = /::file\s/
export const shortBlockRegex = /::fileBlock\s/

const isParent = (node: Node): node is Node & { children: Node[] } => !!(node as Node & { children: Node[] }).children
const isLiteral = (node: Node): node is Node & { value: string } => !!(node as Node & { value: string }).value

const flatMap = (ast: Node, fn: (node: Node, index: number, parent: Node | null) => Node[]) => {
  return transform(ast, 0, null)[0]

  function transform(node: Node, index: number, parent: Node | null) {
    if (isParent(node)) {
      const out = []
      for (let i = 0, n = node.children.length; i < n; i++) {
        const nthChild = node.children[i]
        if (nthChild) {
          const xs = transform(nthChild, i, node)
          if (xs) {
            for (let j = 0, m = xs.length; j < m; j++) {
              const item = xs[j]
              if (item) out.push(item)
            }
          }
        }
      }
      node.children = out
    }

    return fn(node, index, parent)
  }
}

export const filePickerPlugin: RemarkPluginRaw<{ href: string; title: string }> = () => {
  function transformer(tree: Node) {
    flatMap(tree, (node) => {
      if (!isLiteral(node)) return [node]

      // Should not convert code block
      if (node.type === 'code' || node.type === 'leafDirective') return [node]

      const value = node.value
      const output: Array<Node & { value: string; attributes?: { href: string; title: string } }> = []
      let match
      let str = value
      while ((match = regex.exec(str))) {
        const { index } = match
        const fileMatch = match[0]
        if (fileMatch) {
          if (index > 0) output.push({ ...node, value: str.slice(0, index) })

          const { href, title } = match.groups as { href: string; title: string }
          output.push({
            ...node,
            value: fileMatch,
            attributes: {
              href: href ?? '',
              title: title ?? ''
            },
            type: 'file'
          })
          str = str.slice(index + fileMatch.length)
        }
        // Update lastIndex to avoid infinite loop
        regex.lastIndex = 0
      }
      if (str.length) output.push({ ...node, value: str })
      return output
    })
  }
  return transformer
}

export const filePickerRemarkPlugin = $remark(
  'filePickerRemarkPlugin',
  () => filePickerPlugin as RemarkPluginRaw<{ href: string; title: string }>
)
