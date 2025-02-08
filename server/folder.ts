import { join } from 'node:path'
import { existsSync } from 'node:fs'

console.log('Directory:', process.env.NOTES_PATH)

// Define the default path (e.g., a "notes" folder in your project directory)
const defaultPath = join(process.cwd(), 'notes')

// Get the environment variable value (if any)
const envNotesPath = process.env.NOTES_PATH

// Use the env variable if it's provided and the directory exists,
// otherwise fall back to the default path.
const basePath = envNotesPath && existsSync(envNotesPath) ? envNotesPath : defaultPath

export default basePath
