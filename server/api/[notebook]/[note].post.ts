import { writeFile, stat, access, constants } from 'node:fs/promises'
import { readMultipartFormData } from 'h3'
import { Buffer } from 'node:buffer'

import { defineEventHandlerWithNotebookAndNote } from '~/server/wrappers/note'
import type { Note } from '~/types/notebook'

export default defineEventHandlerWithNotebookAndNote(
  async (event, cleanNotebook, cleanNote, fullPath) => {
    let fileContent = Buffer.from('')

    // Parse form data if available
    const formData = await readMultipartFormData(event)
    if (formData) {
      const fileEntry = formData.find((entry) => entry.name === 'file')
      if (fileEntry?.data) {
        fileContent = Buffer.from(fileEntry.data)
      }
    }

    // Add OS path length validation
    const isWindows = process.platform === 'win32'
    const maxPathLength = isWindows ? 259 : 4095 // Same limits as folder creation

    if (fullPath.length > maxPathLength) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: `Path exceeds maximum allowed length of ${maxPathLength} characters.`
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
      if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err
    }

    try {
      await writeFile(fullPath, fileContent)
      const stats = await stat(fullPath)

      return {
        notebook: cleanNotebook,
        name: cleanNote,
        createdAt: stats.birthtime.toISOString(),
        updatedAt: stats.mtime.toISOString(),
        size: stats.size
      } satisfies Note
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
