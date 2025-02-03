import type { EventHandlerRequest, H3Event } from "h3"
import { access, constants } from "node:fs/promises"
import { join, resolve } from "node:path"

type EventHandlerWithNotebookAndNote<T extends EventHandlerRequest, D> = (
  event: H3Event<T>,
  cleanNotebook: string,
  cleanNote: string,
  fullPath: string
) => Promise<D>

export function defineEventHandlerWithNotebookAndNote<
  T extends EventHandlerRequest,
  D,
>(
  handler: EventHandlerWithNotebookAndNote<T, D>,
  options?: { noteCheck: boolean }
) {
  return defineEventHandler(async (event) => {
    const basePath = join(process.cwd(), "notes")
    const { notebook, note } = event.context.params || {}

    if (!notebook || !note) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Missing notebook or note name",
      })
    }

    // Decode URL components first
    const decodedNotebook = decodeURIComponent(notebook)
    const decodedNote = decodeURIComponent(note)

    // Then sanitize (preserve spaces)
    const cleanNotebook = decodedNotebook.replace(/[\\/:*?"<>|.]/g, "")
    const cleanNote = decodedNote.replace(/[\\/:*?"<>|]/g, "")

    // Construct paths
    const targetFolder = resolve(join(basePath, cleanNotebook))
    const filename = `${cleanNote}.md`
    const fullPath = join(targetFolder, filename)

    // Security checks
    if (!targetFolder.startsWith(resolve(basePath))) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Invalid notebook path",
      })
    }

    try {
      // Verify notebook and note exist and is read/write allowed
      await access(targetFolder, constants.R_OK | constants.W_OK)
      if (options?.noteCheck)
        await access(fullPath, constants.R_OK | constants.W_OK)
    } catch (error) {
      const err = error as NodeJS.ErrnoException
      const message =
        err.code === "ENOENT"
          ? err.path === targetFolder
            ? `Notebook "${cleanNotebook}" does not exist`
            : `Note "${cleanNote}" does not exist`
          : "Access error"

      throw createError({
        statusCode: 404,
        statusMessage: "Not Found",
        message,
      })
    }

    return await handler(event, cleanNotebook, cleanNote, fullPath)
  })
}
