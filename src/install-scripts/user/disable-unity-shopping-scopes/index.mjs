import exec from 'faithful-exec'
import inPath from 'inpath'

import scriptName from '../../../lib/utils/script-name.mjs'
import command from './command.mjs'
import scopes from './scopes.mjs'

const SCRIPT_NAME = scriptName(import.meta.url)
const inPathSync = inPath.sync

export default async () => {
  console.log(`${SCRIPT_NAME}: Start.`)
  if (inPathSync('gsettings')) {
    console.log(`${SCRIPT_NAME}: Running gsettings.`, scopes)
    return exec(command(scopes)).then(() => SCRIPT_NAME)
  } else {
    console.log(`${SCRIPT_NAME}: Never mind, we don't have gsettings.`)
    return Promise.resolve(SCRIPT_NAME)
  }
}
