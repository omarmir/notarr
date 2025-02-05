import { mkdir, access, constants } from 'node:fs/promises'
import { join } from 'node:path'
import type { Notebook } from '~/types/notebook'

export default defineEventHandler(async (event) => {
  const basePath = join(process.cwd(), 'notes')

  // Read and validate request body
  const body = await readBody(event)
  const folderName = body.name?.trim()

  if (!folderName) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Notebook name is required'
    })
  }

  // Prevent directory traversal and invalid names
  if (/[\\/:*?"<>|]/.test(folderName)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Invalid notebook name'
    })
  }

  const fullPath = join(basePath, folderName)

  try {
    // Check if folder already exists and read/write-able
    await access(fullPath, constants.R_OK | constants.W_OK)
    throw createError({
      statusCode: 409,
      statusMessage: 'Conflict',
      message: 'Notebook already exists'
    })
  } catch (error) {
    // Only proceed if error is "not found"
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw error
    }
  }

  try {
    // Create the directory
    await mkdir(fullPath)

    // Return the new notebook structure matching your type
    return {
      name: folderName,
      createdAt: new Date().toISOString(),
      updatedAt: null,
      fileCount: 0
    } satisfies Notebook
  } catch (error) {
    console.error('Error creating notebook:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to create notebook'
    })
  }
})
