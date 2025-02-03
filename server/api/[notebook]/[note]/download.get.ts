import { readFile, stat, access } from "node:fs/promises"
import { join, resolve } from "node:path"
import { sendStream, setHeaders } from "h3"
import { createReadStream } from "node:fs"

export default defineEventHandler(async (event) => {
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
    // Verify existence
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
    // Set appropriate headers
    setHeaders(event, {
      "Content-Type": "text/markdown",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-cache",
    })

    // Return file stream
    return sendStream(event, createReadStream(fullPath))
  } catch (error) {
    console.error("Error serving file:", error)
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Failed to retrieve file",
    })
  }
})
