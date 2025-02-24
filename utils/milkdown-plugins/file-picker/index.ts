import type { MilkdownPlugin } from '@milkdown/kit/ctx'
import { $remark } from '@milkdown/kit/utils'
import directive from 'remark-directive'
import { filePickerRemarkPlugin } from './transformer'
import { filePickerConfig } from './component/config'
import { filePickerView } from './component/view'
import { fileAttr, filePickerNode, filePickerNodeBlock, filePickerRule } from './schema'

const remarkPluginId = 'file-picker'
export const filePickerremarkDirective = $remark(remarkPluginId, () => directive)

export const filePicker: MilkdownPlugin[] = [
  fileAttr,
  filePickerremarkDirective,
  filePickerNode,
  filePickerNodeBlock,
  filePickerRule,
  filePickerRemarkPlugin,
  filePickerConfig,
  filePickerView
].flat()
