import { writeFile, stat } from "node:fs/promises"
import { readMultipartFormData } from "h3"

import { defineEventHandlerWithNotebookAndNote } from "~/server/wrappers/note"

export default defineEventHandlerWithNotebookAndNote(
  async (event, cleanNotebook, cleanNote, fullPath) => {
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
        note: cleanNote,
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
  }
)
