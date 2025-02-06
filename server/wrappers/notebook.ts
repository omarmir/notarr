import type { EventHandlerRequest, H3Event } from 'h3'
import { access, constants } from 'node:fs/promises'
import { join, resolve } from 'node:path'

type EventHandlerWithNotebook<T extends EventHandlerRequest, D> = (
  event: H3Event<T>,
  cleanNotebook: string,
  fullPath: string,
  targetFolder: string
) => Promise<D>

export function defineEventHandlerWithNotebook<T extends EventHandlerRequest, D>(
  handler: EventHandlerWithNotebook<T, D>,
  options?: { notebookCheck: boolean }
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
    const fullPath = join(basePath, cleanNotebook)
    const targetFolder = resolve(fullPath)

    if (decodedNotebook.length > 255) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: `Name exceeds maximum allowed length of 255 characters.`
      })
    }

    // Check OS path length limitations
    const isWindows = process.platform === 'win32'
    const maxPathLength = isWindows ? 259 : 4095 // Windows MAX_PATH (260 incl. null) vs Linux/macOS PATH_MAX (4096)

    if (fullPath.length > maxPathLength) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: `Notebook name is too long. The full path exceeds the maximum allowed length of ${maxPathLength} characters.`
      })
    }

    // This is for a new notebook, we can bail early
    if (options?.notebookCheck === false) return await handler(event, cleanNotebook, fullPath, resolve(basePath))

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

    return await handler(event, cleanNotebook, fullPath, targetFolder)
  })
}
