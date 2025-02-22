import type { MilkdownPlugin } from '@milkdown/kit/ctx'
import { inlineFileConfig } from './config'
import { inlineFileView } from './view'

export * from './config'
export * from './view'

export const fileInlineComponent: MilkdownPlugin[] = [inlineFileConfig, inlineFileView]
