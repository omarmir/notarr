import jwt from 'jsonwebtoken'
import { navigateTo } from 'nuxt/app'
import SECRET_KEY from '~/server/key'

export default defineEventHandler((event) => {
  console.log(event.path)

  if (event.path === '/login' || event.path === '/api/auth/login') return

  const cookie = getCookie(event, 'token')

  if (!cookie) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Secret key not provided'
    })
  }

  try {
    jwt.verify(cookie, SECRET_KEY)
    event.context.authenticated = true
    return navigateTo('/')
  } catch (err) {
    console.log(err)
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Unable to verify authentication.'
    })
  }
})
