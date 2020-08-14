import scriptName from '../../lib/utils/script-name.mjs'

const SCRIPT_NAME = scriptName(import.meta.url)

export default async () => {
  console.log(`${SCRIPT_NAME}: Start.`)
  console.log(`${SCRIPT_NAME}: Sleeping 5...`)
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log(`${SCRIPT_NAME}: Sleeping 4...`)
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log(`${SCRIPT_NAME}: Sleeping 3...`)
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log(`${SCRIPT_NAME}: Sleeping 2...`)
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log(`${SCRIPT_NAME}: Sleeping 1...`)
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log(`${SCRIPT_NAME}: Done.`)
}
