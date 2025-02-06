import { defineStore } from 'pinia'
import type { Note, Notebook } from '~/types/notebook'
import type { Result } from '~/types/result'
import type { FetchError } from 'ofetch'

export const useNotebookStore = defineStore('notebook', () => {
  const {
    data: notebooks,
    refresh,
    status,
    error
  } = useFetch<Notebook[]>('/api/notebooks', {
    immediate: true,
    lazy: false
  })

  const currentNotebook: Ref<string | null> = ref(null)

  const currentNotes: Ref<Note[] | null> = ref(null)
  const currentNotesError: Ref<string | null> = ref(null)

  const addNotebook = async (name: string): Promise<Result<Notebook>> => {
    try {
      const resp = await $fetch<Notebook>(`/api/${name}`, {
        method: 'POST'
      })
      notebooks.value?.push(resp)
      return {
        success: true,
        data: resp
      }
    } catch (error) {
      return { success: false, message: (error as FetchError).data.message }
    }
  }

  const toggleNotebook = (notebook: string) => {
    if (currentNotebook.value === notebook) {
      currentNotebook.value = null
    } else {
      currentNotebook.value = notebook
      getNotes()
    }
  }

  const getNotes = async () => {
    if (!currentNotebook.value) return

    const resp = await getNotebookNotes(currentNotebook.value)

    if (resp.success) {
      currentNotes.value = resp.data
      currentNotesError.value = null
    } else {
      currentNotesError.value = resp.message
    }
  }

  const getNotebookNotes = async (notebook: string): Promise<Result<Note[]>> => {
    try {
      const resp = await $fetch<Note[]>(`/api/${notebook}/notes`)
      return { success: true, data: resp }
    } catch (error) {
      return { success: false, message: (error as FetchError).data.message }
    }
  }

  const addNote = async (notebook: string, note: string): Promise<Result<Note>> => {
    try {
      const resp = await $fetch<Note>(`/api/${notebook}/${note}`, {
        method: 'POST'
      })
      if (currentNotebook.value === notebook) currentNotes.value?.push(resp)
      return {
        success: true,
        data: resp
      }
    } catch (error) {
      return { success: false, message: (error as FetchError).data.message }
    }
  }

  return {
    notebooks,
    refresh,
    addNotebook,
    addNote,
    status,
    error,
    toggleNotebook,
    getNotebookNotes,
    currentNotebook,
    currentNotes
  }
})
