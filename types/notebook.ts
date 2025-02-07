export type Notebook = {
  name: string
  createdAt: string
  updatedAt: string | null
  fileCount: number
}

export type Note = {
  name: string
  createdAt: string
  updatedAt: string | null
  notebook: string
  size?: number
}

export type NoteResponse = {
  notebook: string
  note: string
  path: string
  createdAt: string
  updatedAt: string
  size: number
  originalFilename: string
}

export type SavingState = 'pending' | 'success' | 'error'
