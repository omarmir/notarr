import { readdir, stat } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import type { Note } from '~/types/notebook'

export default defineEventHandler(async (event): Promise<Note[]> => {
  const basePath = join(process.cwd(), 'notes')
  const query = getQuery<{ display: number }>(event)

  try {
    // Get all notebooks (folders)
    const notebooks = await readdir(basePath, { withFileTypes: true }).then((entries) =>
      entries.filter((d) => d.isDirectory()).map((d) => d.name)
    )

    // Collect notes from all notebooks
    const allNotes = await Promise.all(
      notebooks.map(async (notebook) => {
        const notebookPath = resolve(join(basePath, notebook))

        try {
          const files = await readdir(notebookPath, { withFileTypes: true })
          const notes = await Promise.all(
            files.map(async (dirent) => {
              if (!dirent.isFile() || !dirent.name.endsWith('.md')) return null

              const filePath = join(notebookPath, dirent.name)
              try {
                const stats = await stat(filePath)
                return {
                  name: dirent.name.replace(/\.md$/, ''),
                  notebook,
                  createdAt: stats.birthtime.toISOString(),
                  updatedAt: stats.mtime.toISOString(),
                  size: stats.size
                } satisfies Note
              } catch (error) {
                console.error(`Error processing ${filePath}:`, error)
                return null
              }
            })
          )
          return notes.filter((note) => note !== null)
        } catch (error) {
          console.error(`Error reading notebook ${notebook}:`, error)
          return []
        }
      })
    )

    // Flatten and sort notes
    return allNotes
      .flat()
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, query.display ?? allNotes.length)
  } catch (error) {
    console.error('Error reading base directory:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to retrieve notes'
    })
  }
})
