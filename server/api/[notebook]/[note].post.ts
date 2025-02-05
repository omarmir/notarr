import { writeFile, stat, access, constants } from 'node:fs/promises'
import { readMultipartFormData } from 'h3'

import { defineEventHandlerWithNotebookAndNote } from '~/server/wrappers/note'

export default defineEventHandlerWithNotebookAndNote(
  async (event, cleanNotebook, cleanNote, fullPath) => {
    // Parse form data
    const formData = await readMultipartFormData(event)
    if (!formData) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Missing form data'
      })
    }

    // Find file in form data
    const fileEntry = formData.find((entry) => entry.name === 'file')
    if (!fileEntry || !fileEntry.data) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'No file uploaded'
      })
    }

    try {
      await access(fullPath, constants.F_OK)
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'File already exists'
      })
    } catch (err) {
      // If access fails, file does not exist -> Proceed
      if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err // Rethrow unexpected errors
    }

    try {
      // Write file to filesystem
      await writeFile(fullPath, fileEntry.data)
      const stats = await stat(fullPath)

      return {
        notebook: cleanNotebook,
        note: cleanNote,
        path: fullPath,
        createdAt: stats.birthtime.toISOString(),
        updatedAt: stats.mtime.toISOString(),
        size: stats.size,
        originalFilename: fileEntry.filename || 'unknown'
      }
    } catch (error) {
      console.error('Error creating note:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        message: 'Failed to create note'
      })
    }
  },
  {
    noteCheck: false
  }
)
