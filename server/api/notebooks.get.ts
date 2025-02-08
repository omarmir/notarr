import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'
import type { Notebook } from '~/types/notebook'
import basePath from '~/server/folder'

// function waitforme(millisec: number) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve('')
//     }, millisec)
//   })
// }

export default defineEventHandler(async (_event): Promise<Notebook[]> => {
  // const basePath = join(process.cwd(), 'notes')
  //await waitforme(1000)

  try {
    const folderEntries = await readdir(basePath, { withFileTypes: true })
    const folders = folderEntries.filter((dirent) => dirent.isDirectory())

    const result = await Promise.all(
      folders.map(async (dirent): Promise<Notebook> => {
        const folderPath = join(basePath, dirent.name)
        const folderStats = await stat(folderPath)

        const createdAt = folderStats.birthtime.getTime() !== 0 ? folderStats.birthtime : folderStats.ctime

        let fileCount = 0
        let lastUpdated: Date | null = null

        try {
          const fileEntries = await readdir(folderPath, { withFileTypes: true })

          for (const fileEntry of fileEntries) {
            if (fileEntry.isFile()) {
              fileCount++
              const filePath = join(folderPath, fileEntry.name)
              const fileStats = await stat(filePath)

              const fileLatest = new Date(Math.max(fileStats.birthtime.getTime(), fileStats.mtime.getTime()))

              if (!lastUpdated || fileLatest > lastUpdated) {
                lastUpdated = fileLatest
              }
            }
          }
        } catch (error) {
          console.error(`Error processing folder ${folderPath}:`, error)
        }

        return {
          name: dirent.name,
          createdAt: createdAt.toISOString(),
          updatedAt: lastUpdated?.toISOString() || null,
          fileCount: fileCount
        }
      })
    )

    return result
  } catch (error) {
    console.error('Error reading directory:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Unable to read directory structure'
    })
  }
})
