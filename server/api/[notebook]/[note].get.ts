import { readFile, stat, access } from "node:fs/promises"
import { join, resolve } from "node:path"
import { Note } from "~/types/notebook"

export default defineEventHandler(async (event): Promise<Note> => {
  const basePath = join(process.cwd(), "notes")
  const { notebook, note } = event.context.params || {}

  // Validate parameters
  if (!notebook || !note) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Missing notebook or note name",
    })
  }

  // Sanitize inputs
  const cleanNotebook = notebook.replace(/[\\/:*?"<>|.]/g, "")
  const cleanNote = note.replace(/[\\/:*?"<>|]/g, "")

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
    // Verify notebook and note exist
    await access(targetFolder)
    await access(fullPath)
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

  try {
    // Read file contents and stats
    const stats = await stat(fullPath)

    return {
      name: cleanNote,
      notebook: cleanNotebook,
      createdAt: stats.birthtime.toISOString(),
      updatedAt: stats.mtime.toISOString(),
      size: stats.size, // Optional: Remove if not needed
    }
  } catch (error) {
    console.error("Error reading note:", error)
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Failed to retrieve note",
    })
  }
})
