import { stat } from 'node:fs/promises'

import { defineEventHandlerWithNotebookAndNote } from '~/server/wrappers/note'

export default defineEventHandlerWithNotebookAndNote(async (_event, cleanNotebook, cleanNote, fullPath) => {
  try {
    // Read file contents and stats
    const stats = await stat(fullPath)
    return {
      name: cleanNote,
      notebook: cleanNotebook,
      createdAt: stats.birthtime.toISOString(),
      updatedAt: stats.mtime.toISOString(),
      size: stats.size // Optional: Remove if not needed
    }
  } catch (error) {
    console.error('Error reading note:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to retrieve note'
    })
  }
})
