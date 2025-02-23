import type { Meta, MilkdownPlugin } from '@milkdown/ctx'

export function withMeta<T extends MilkdownPlugin>(plugin: T, meta: Partial<Meta> & Pick<Meta, 'displayName'>): T {
  Object.assign(plugin, {
    meta: {
      package: '@milkdown/components',
      ...meta
    }
  })

  return plugin
}

export function defIfNotExists(tagName: string, element: CustomElementConstructor) {
  const current = customElements.get(tagName)
  if (current == null) {
    customElements.define(tagName, element)
    return
  }

  if (current === element) return

  console.warn(`Custom element ${tagName} has been defined before.`)
}
