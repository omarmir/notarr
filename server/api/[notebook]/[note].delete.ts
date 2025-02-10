import { unlink } from 'node:fs/promises'

import { defineEventHandlerWithNotebookAndNote } from '~/server/wrappers/note'
import type { DeleteNote } from '~/types/notebook'

export default defineEventHandlerWithNotebookAndNote(async (_event, cleanNotebook, cleanNote, fullPath) => {
  try {
    // Read file contents and stats
    await unlink(fullPath)

    return {
      notebook: cleanNotebook,
      name: cleanNote,
      deleted: true,
      timestamp: new Date().toISOString()
    } satisfies DeleteNote
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      throw createError({
        statusCode: 404,
        statusMessage: 'Not Found',
        message: 'Note or notebook does not exist'
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to delete note'
    })
  }
})
