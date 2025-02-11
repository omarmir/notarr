import jwt from 'jsonwebtoken'
import SECRET_KEY from '~/server/key'

export default defineEventHandler((event) => {
  if (event.path === '/login' || event.path === '/api/auth/login') return

  const cookie = getCookie(event, 'token')

  if (!cookie) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Please login first'
    })
  }

  try {
    jwt.verify(cookie, SECRET_KEY)
    event.context.authenticated = true
  } catch (err) {
    console.log(err)
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Unable to verify authentication.'
    })
  }
})
