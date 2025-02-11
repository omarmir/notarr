import jwt from 'jsonwebtoken'

const envSecretKey = process.env.SECRET_KEY

const SECRET_KEY = envSecretKey ?? 'TEST'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { key } = body

  // Example user authentication (replace with DB lookup)
  if (key !== SECRET_KEY) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Secret key does not match.'
    })
  }

  // Create JWT token
  const token = jwt.sign({ app: 'notarr' }, SECRET_KEY, { expiresIn: '7d' })

  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 3600 * 24 * 7, // 7 days
    path: '/'
  })

  return { token }
})
