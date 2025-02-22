import type { ReadStream } from 'node:fs'
import { createReadStream, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineEventHandlerWithNotebookAndNote } from '~/server/wrappers/note'
import mime from 'mime'

export default defineEventHandlerWithNotebookAndNote(
  async (event, _cleanNotebook, cleanNote, _fullPath, notebookPath): Promise<ReadStream> => {
    const file = event.context.params?.file

    if (!file) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'No file specified'
      })
    }
    // Construct the path to your file. Adjust the base folder as needed.
    const filePath = resolve(notebookPath, cleanNote, 'attachment', decodeURIComponent(file))

    // Check if the file exists
    if (!existsSync(filePath)) {
      throw createError({
        statusCode: 404,
        statusMessage: 'File not found'
      })
    }

    const mimeType = mime.getType(filePath) || 'application/octet-stream'

    setHeaders(event, {
      'Content-Type': mimeType,
      'Content-Disposition': `attachment; filename="${cleanNote}"`,
      'Cache-Control': 'no-cache'
    })

    // Stream the file back as the response
    return createReadStream(filePath)
  }
)
