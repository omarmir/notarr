import { readdir, stat, access } from "node:fs/promises"
import { join, resolve } from "node:path"
import { Note } from "~/types/notebook"

export default defineEventHandler(async (event): Promise<Note[]> => {
  const basePath = join(process.cwd(), "notes")
  const notebook = event.context.params?.notebook

  if (!notebook) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Missing notebook name",
    })
  }

  // Sanitize notebook name
  const cleanNotebook = notebook.replace(/[\\/:*?"<>|.]/g, "")
  const targetFolder = resolve(join(basePath, cleanNotebook))

  // Security check
  if (!targetFolder.startsWith(resolve(basePath))) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid notebook path",
    })
  }

  try {
    // Check if notebook exists
    await access(targetFolder)
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found",
      message: `Notebook "${cleanNotebook}" does not exist`,
    })
  }

  try {
    // Read directory contents
    const files = await readdir(targetFolder, { withFileTypes: true })

    // Process files concurrently
    const notes = await Promise.all(
      files.map(async (dirent) => {
        if (!dirent.isFile() || !dirent.name.endsWith(".md")) return null

        const filePath = join(targetFolder, dirent.name)
        const stats = await stat(filePath)

        return {
          name: dirent.name.replace(/\.md$/, ""),
          notebook: cleanNotebook,
          createdAt: stats.birthtime.toISOString(),
          updatedAt: stats.mtime.toISOString(),
        } satisfies Note
      })
    )

    const filteredNotes = notes.filter((note) => note !== null)
    return filteredNotes.sort(
      (a, b) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
    )
  } catch (error) {
    console.error("Error reading notebook:", error)
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Failed to retrieve notes",
    })
  }
})
