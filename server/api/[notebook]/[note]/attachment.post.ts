import { defineEventHandlerWithNotebookAndNote } from '~/server/wrappers/note'
import { nanoid } from 'nanoid'
import { writeFile, mkdir, constants } from 'node:fs/promises'
import path from 'node:path'
import { access, existsSync } from 'node:fs'
import { waitforme } from '~/server/utils'

export default defineEventHandlerWithNotebookAndNote(
  async (event, cleanNotebook, cleanNote, _fullPath, notebookPath): Promise<string> => {
    try {
      const formData = await readMultipartFormData(event)
      if (!formData) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Bad Request',
          message: 'Missing form data'
        })
      }

      await waitforme(5000)

      // Find file in form data
      const fileEntry = formData.find((entry) => entry.name === 'file')
      if (!fileEntry?.data) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Bad Request',
          message: 'No file uploaded'
        })
      }

      const attachBasePath = path.join(notebookPath, cleanNote, 'attachment')
      if (!existsSync(attachBasePath)) {
        await mkdir(attachBasePath, { recursive: true })
      }

      access(attachBasePath, constants.R_OK | constants.W_OK, (err) => {
        if (err) {
          console.log(err)
          throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: 'Attachment folder is not read/write accessible.'
          })
        }
      })

      const id = nanoid()
      const imageName = `${id}_${fileEntry.filename?.replace(/[\\/:*?"<>]/g, '')}`

      if (imageName.length > 255) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Bad Request',
          message: `Name will exceed allowed length of 255 characters.`
        })
      }

      const attachPath = path.join(attachBasePath, imageName)

      const isWindows = process.platform === 'win32'
      const maxPathLength = isWindows ? 259 : 4095 // Same limits as folder creation
      if (attachPath.length > maxPathLength) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Bad Request',
          message: 'Attachment file path is going to exceed maximum path length for your operating system.'
        })
      }

      await writeFile(attachPath, fileEntry.data)
      return `/api/${cleanNotebook}/${cleanNote}/attachment/${imageName}`
    } catch (error) {
      console.error('Error serving file:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        message: 'Failed to retrieve file'
      })
    }
  }
)
