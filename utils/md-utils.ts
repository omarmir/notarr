import type { Attrs, NodeType } from '@milkdown/kit/prose/model'
import type { Command, Transaction } from '@milkdown/kit/prose/state'

const addBlockType = (tr: Transaction, nodeType: NodeType, attrs: Attrs | null = null) => {
  const node = nodeType.createAndFill(attrs)
  if (!node) return null

  return tr.replaceSelectionWith(node)
}

const clearRange = (tr: Transaction) => {
  const { $from, $to } = tr.selection
  const { pos: from } = $from
  const { pos: to } = $to
  tr = tr.deleteRange(from - $from.node().content.size, to)
  return tr
}

export const clearContentAndAddBlockType = (nodeType: NodeType, attrs: Attrs | null = null): Command => {
  return (state, dispatch) => {
    const tr = addBlockType(clearRange(state.tr), nodeType, attrs)
    if (!tr) return false

    if (dispatch) dispatch(tr.scrollIntoView())

    return true
  }
}
