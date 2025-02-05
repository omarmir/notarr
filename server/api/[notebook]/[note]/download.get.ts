import { sendStream, setHeaders } from 'h3'
import { createReadStream } from 'node:fs'

import { defineEventHandlerWithNotebookAndNote } from '~/server/wrappers/note'

export default defineEventHandlerWithNotebookAndNote(async (event, cleanNotebook, cleanNote, fullPath) => {
  try {
    // Set appropriate headers
    setHeaders(event, {
      'Content-Type': 'text/markdown',
      'Content-Disposition': `attachment; filename="${cleanNote}"`,
      'Cache-Control': 'no-cache'
    })

    // Return file stream
    return sendStream(event, createReadStream(fullPath))
  } catch (error) {
    console.error('Error serving file:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to retrieve file'
    })
  }
})
