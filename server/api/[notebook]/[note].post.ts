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
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found",
      message: `Notebook "${cleanNotebook}" does not exist`,
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
  if (!fileEntry || !fileEntry.data) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "No file uploaded",
    })
  }

  try {
    // Write file to filesystem
    await writeFile(fullPath, fileEntry.data)
    const stats = await stat(fullPath)

    return {
      notebook: cleanNotebook,
      note: filename,
      path: fullPath,
      createdAt: stats.birthtime.toISOString(),
      updatedAt: stats.mtime.toISOString(),
      size: stats.size,
      originalFilename: fileEntry.filename || "unknown",
    }
  } catch (error) {
    console.error("Error creating note:", error)
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Failed to create note",
    })
  }
})
