const envSecretKey = process.env.SECRET_KEY

const SECRET_KEY = envSecretKey ?? 'notarr'

export default SECRET_KEY
