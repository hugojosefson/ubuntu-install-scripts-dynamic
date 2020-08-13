import exec from 'faithful-exec'
import inPath from 'inpath'

import scriptName from '../../../lib/utils/script-name.mjs'
import command from './command.mjs'
import scopes from './scopes.mjs'

const SCRIPT_NAME = scriptName(import.meta.url)
const inPathSync = inPath.sync

export default () => {
  if (inPathSync('gsettings')) {
    return exec(command(scopes)).then(() => SCRIPT_NAME)
  } else {
    return Promise.resolve(SCRIPT_NAME)
  }
}
