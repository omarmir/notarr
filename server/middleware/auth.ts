import jwt from 'jsonwebtoken'

const envSecretKey = process.env.SECRET_KEY

const SECRET_KEY = envSecretKey ?? 'TEST'

export default defineEventHandler((event) => {
  const authHeader = getHeader(event, 'authorization')
  if (!authHeader) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Secret key not provided'
    })
  }

  try {
    const token = authHeader.split(' ')[1] // Expecting "Bearer <token>"
    jwt.verify(token, SECRET_KEY)
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
