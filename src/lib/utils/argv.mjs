import minimist from 'minimist'

const argv = minimist(process.argv.slice(2), { boolean: true })

export default argv
export const names = argv._
