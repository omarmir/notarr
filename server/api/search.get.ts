import { readdir } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { platform } from 'node:os'
import { execSync } from 'node:child_process'
import escape from 'shell-escape'

interface SearchResult {
  notebook: string
  note: string | null
  matchType: 'folder' | 'note' | 'content'
  snippet: string
  score: number
}

const CONTEXT_CHARS = 50
const MAX_RESULTS = 100

export default defineEventHandler(async (event): Promise<SearchResult[]> => {
  const basePath = join(process.cwd(), 'notes')
  const fullPath = resolve(basePath)
  const { q: rawQuery } = getQuery(event)

  if (!rawQuery || typeof rawQuery !== 'string') {
    throw createError({ statusCode: 400, message: 'Missing query' })
  }

  const results: SearchResult[] = []
  const query = escape([rawQuery.replace(/[^\w\- ]/g, '')])
  const osPlatform = platform()

  // 1. Search folder names
  const folders = await readdir(fullPath, { withFileTypes: true })
  for (const folder of folders.filter((d) => d.isDirectory())) {
    if (folder.name.toLowerCase().includes(rawQuery.toLowerCase())) {
      results.push({
        notebook: folder.name,
        note: null,
        matchType: 'folder',
        snippet: `Folder name contains "${rawQuery}"`,
        score: 1
      })
    }
  }

  // 2. Search note names across all notebooks
  for (const folder of folders.filter((d) => d.isDirectory())) {
    const notes = await readdir(join(fullPath, folder.name), { withFileTypes: true })
    for (const note of notes.filter((f) => f.isFile() && f.name.endsWith('.md'))) {
      const noteName = note.name.replace(/\.md$/, '')
      if (noteName.toLowerCase().includes(rawQuery.toLowerCase())) {
        results.push({
          notebook: folder.name,
          note: noteName,
          matchType: 'note',
          snippet: `Note name contains "${rawQuery}"`,
          score: 2
        })
      }
    }
  }

  // 3. Optimized content search
  try {
    let command: string
    const searchPath = escape([fullPath])

    if (osPlatform === 'linux') {
      command = `grep -r -i -m1 -P -oH ".{0,${CONTEXT_CHARS}}${query}.{0,${CONTEXT_CHARS}}" --include="*.md" ${searchPath} || true`
    } else if (osPlatform === 'darwin') {
      command = `grep -r -i -m1 -E -oH ".{0,${CONTEXT_CHARS}}${query}.{0,${CONTEXT_CHARS}}" --include="*.md" ${searchPath} || true`
    } else {
      // Windows fallback using PowerShell (slower but works)
      const escapedQuery = rawQuery.replace(/"/g, '""')
      command =
        `Get-ChildItem -Path ${searchPath} -Recurse -Filter *.md | ` +
        `Select-String -Pattern "${escapedQuery}" -CaseSensitive:$false | ` +
        `Select-Object -First ${MAX_RESULTS} | ` +
        `% { $_.Line }`
    }

    const output = execSync(command, {
      encoding: 'utf-8',
      maxBuffer: 1024 * 1024 * 10 // 10MB buffer
    })

    // Parse results
    const contentResults = output
      .split('\n')
      .filter((line) => line.trim())
      .map((line) => {
        // Linux/macOS format: /path/notebook/note.md:...match...
        const [path, ...rest] = line.split(':')
        const snippet = rest.join(':')
        const relativePath = path.replace(fullPath, '').split('/').filter(Boolean)

        return {
          notebook: relativePath[0],
          note: relativePath[1]?.replace(/\.md$/, ''),
          snippet: snippet.trim().slice(0, CONTEXT_CHARS * 2),
          score: 3,
          matchType: 'content'
        } satisfies SearchResult
      })

    results.push(...contentResults.filter((r) => r.notebook))
  } catch (error) {
    console.log(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: error,
      message: 'Unable to search. Check console for details.'
    })
  }

  // Deduplicate and sort
  return Array.from(new Set(results.map((r) => JSON.stringify(r))))
    .map((r) => JSON.parse(r) as SearchResult)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_RESULTS)
})
