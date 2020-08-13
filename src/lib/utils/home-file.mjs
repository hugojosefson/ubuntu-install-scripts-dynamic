import path from 'path'

export default (filename) => path.resolve(process.env.HOME, filename)
