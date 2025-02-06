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
    try {
      const resp = await $fetch<Note[]>(`/api/${currentNotebook.value}/notes`)
      currentNotes.value = resp
    } catch (error) {
      console.log(error)
    }
  }

  const addNote = async (notebook: string, note: string) => {
    try {
      const resp = await $fetch<Note>(`/api/${notebook}/${note}`, {
        method: 'POST'
      })
      console.log(resp)
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
    currentNotebook,
    currentNotes
  }
})
