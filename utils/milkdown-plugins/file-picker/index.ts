import type { MilkdownPlugin } from '@milkdown/kit/ctx'
import { $remark } from '@milkdown/kit/utils'
import directive from 'remark-directive'
import { filePickerRemarkPlugin } from './transformer'
import { filePickerConfig } from './component/config'
import { filePickerViewGenerator } from './component/view'

import { fileAttr, filePickerNode, filePickerNodeBlock, filePickerRule } from './schema'

export const filePickerremarkDirective = $remark('file-picker', () => directive)

export const filePicker: MilkdownPlugin[] = [
  fileAttr,
  filePickerremarkDirective,
  filePickerNode,
  filePickerRule,
  filePickerRemarkPlugin,
  filePickerConfig,
  filePickerViewGenerator(filePickerNode.node),
  filePickerViewGenerator(filePickerNodeBlock.node),
  filePickerNodeBlock
].flat()

// export const filePickerBlockremarkDirective = $remark('file-picker-block', () => directive)
// export const filePickerBlock: MilkdownPlugin[] = [filePickerNodeBlock, filePickerBlockremarkDirective].flat()
