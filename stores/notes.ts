import { defineStore } from 'pinia'
import type { DeleteNote, Note, RenameNote, RenameNotebook } from '~/types/notebook'
import type { Result } from '~/types/result'
import type { FetchError } from 'ofetch'

export const useNoteStore = defineStore('note', () => {
  const currentNotes: Ref<Note[] | null> = ref(null)

  const getNotebookNotes = async (notebook: string, setAsCurrent?: boolean): Promise<Result<Note[]>> => {
    try {
      const resp = await $fetch<Note[]>(`/api/${notebook}/notes`)
      if (setAsCurrent) {
        currentNotes.value = resp
      }
      return { success: true, data: resp }
    } catch (error) {
      if (setAsCurrent) {
        currentNotes.value = null
      }
      return { success: false, message: (error as FetchError).data.message }
    }
  }

  const addNote = async (notebook: string, note: string, currentNotebook: string | null): Promise<Result<Note>> => {
    try {
      const resp = await $fetch<Note>(`/api/${notebook}/${note}`, {
        method: 'POST'
      })
      if (currentNotebook === notebook) currentNotes.value?.push(resp)
      return {
        success: true,
        data: resp
      }
    } catch (error) {
      return { success: false, message: (error as FetchError).data.message }
    }
  }

  const deleteNote = async (
    notebook: string,
    note: string,
    currentNotebook: string | null
  ): Promise<Result<DeleteNote>> => {
    try {
      const resp = await $fetch<DeleteNote>(`/api/${notebook}/${note}`, {
        method: 'DELETE'
      })
      if (currentNotebook === notebook && currentNotes.value && currentNotes.value.length > 0)
        currentNotes.value = currentNotes.value.filter((item) => item.name !== note && item.notebook !== notebook)
      return {
        success: true,
        data: resp
      }
    } catch (error) {
      return { success: false, message: (error as FetchError).data.message }
    }
  }

  const renameNote = async (notebook: string, note: string, newName: string): Promise<Result<RenameNotebook>> => {
    try {
      const rename = await $fetch<RenameNote>(`/api/${notebook}/${note}`, {
        body: { newName },
        method: 'PUT'
      })
      return {
        success: true,
        data: rename
      }
    } catch (e) {
      const err = e as FetchError
      return {
        success: false,
        message: err.data?.message ?? err
      }
    }
  }

  return {
    addNote,
    getNotebookNotes,
    currentNotes,
    deleteNote,
    renameNote
  }
})
