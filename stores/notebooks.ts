import { defineStore } from 'pinia'
import type { Notebook } from '~/types/notebook'
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

  const addNotebook = async (name: string): Promise<Result<Notebook>> => {
    try {
      const resp = await $fetch<Notebook>('/api/notebooks', {
        method: 'POST',
        body: { name }
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

  return { notebooks, refresh, addNotebook, status, error }
})
