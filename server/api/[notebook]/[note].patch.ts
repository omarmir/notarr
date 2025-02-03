import { writeFile, access, constants, stat } from "node:fs/promises"
import { join, resolve } from "node:path"
import { readMultipartFormData } from "h3"
import { NoteResponse } from "~/types/notebook"

export default defineEventHandler(async (event): Promise<NoteResponse> => {
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

  // Security check
  if (!targetFolder.startsWith(resolve(basePath))) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid notebook path",
    })
  }

  try {
    // Verify notebook exists
    await access(targetFolder, constants.F_OK)
    // Verify note exists
    await access(fullPath, constants.F_OK)
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

  // Parse form data
  const formData = await readMultipartFormData(event)
  if (!formData) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Missing form data",
    })
  }

  // Find file in form data
  const fileEntry = formData.find((entry) => entry.name === "file")
  if (!fileEntry?.data) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "No file uploaded",
    })
  }

  try {
    // Get original stats first to preserve creation date
    const originalStats = await stat(fullPath)

    // Overwrite file content
    await writeFile(fullPath, fileEntry.data)

    // Get new stats after update
    const newStats = await stat(fullPath)

    return {
      notebook: cleanNotebook,
      note: filename,
      path: fullPath,
      createdAt: originalStats.birthtime.toISOString(),
      updatedAt: newStats.mtime.toISOString(),
      size: newStats.size,
      originalFilename: fileEntry.filename || "unknown",
    }
  } catch (error) {
    console.error("Error updating note:", error)
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Failed to update note",
    })
  }
})
