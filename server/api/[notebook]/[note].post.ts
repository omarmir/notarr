import { writeFile, stat, access, constants } from 'node:fs/promises'
import { readMultipartFormData } from 'h3'
import { Buffer } from 'node:buffer'

import { defineEventHandlerWithNotebookAndNote } from '~/server/wrappers/note'
import type { Note } from '~/types/notebook'

export default defineEventHandlerWithNotebookAndNote(
  async (event, cleanNotebook, cleanNote, fullPath) => {
    let fileContent = Buffer.from('')
    // let originalFilename = `${cleanNote}.md`

    // Parse form data if available
    const formData = await readMultipartFormData(event)
    if (formData) {
      const fileEntry = formData.find((entry) => entry.name === 'file')
      if (fileEntry?.data) {
        // Convert to proper Buffer instance
        fileContent = Buffer.from(fileEntry.data)
        // originalFilename = fileEntry.filename || originalFilename
      }
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
      // Write file with either uploaded content or empty buffer
      await writeFile(fullPath, fileContent)
      const stats = await stat(fullPath)

      return {
        notebook: cleanNotebook,
        name: cleanNote,
        // path: fullPath,
        createdAt: stats.birthtime.toISOString(),
        updatedAt: stats.mtime.toISOString(),
        size: stats.size
        // originalFilename
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
