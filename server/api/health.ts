import SECRET_KEY from '~/server/key'
import { envNotesPath } from '~/server/folder'

export default defineEventHandler(async (_event) => {
  const warnings = []

  if (SECRET_KEY === 'nanote') warnings.push('Secret key should be changed from the default.')
  if (!envNotesPath)
    if (!envNotesPath) warnings.push('Storage location is not set, this could result in loss of notes.')

  return {
    status: 'OK',
    message: 'Service is running',
    warnings
  }
})
