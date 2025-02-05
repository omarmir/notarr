import type { EventHandlerRequest, H3Event } from 'h3'
import { access, constants } from 'node:fs/promises'
import { join, resolve } from 'node:path'

type EventHandlerWithNotebook<T extends EventHandlerRequest, D> = (
  event: H3Event<T>,
  cleanNotebook: string,
  targetFolder: string
) => Promise<D>

export function defineEventHandlerWithNotebook<T extends EventHandlerRequest, D>(
  handler: EventHandlerWithNotebook<T, D>
) {
  return defineEventHandler(async (event) => {
    const basePath = join(process.cwd(), 'notes')
    const notebook = event.context.params?.notebook

    if (!notebook) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Missing notebook'
      })
    }

    // Decode URL components first
    const decodedNotebook = decodeURIComponent(notebook)

    // Then sanitize (preserve spaces)
    const cleanNotebook = decodedNotebook.replace(/[\\/:*?"<>|.]/g, '')

    // Construct paths
    const targetFolder = resolve(join(basePath, cleanNotebook))

    // Security checks
    if (!targetFolder.startsWith(resolve(basePath))) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Invalid notebook path'
      })
    }
    try {
      // Check if notebook exists
      await access(targetFolder, constants.R_OK | constants.W_OK) // Make sure its readable and writable
    } catch {
      throw createError({
        statusCode: 404,
        statusMessage: 'Not Found',
        message: `Notebook "${cleanNotebook}" does not exist`
      })
    }

    return await handler(event, cleanNotebook, targetFolder)
  })
}
