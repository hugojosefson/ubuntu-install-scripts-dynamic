import exec from 'faithful-exec'
import inPath from 'inpath'

import { fileURLToPath } from 'url'
import _SCRIPT_NAME from '../../lib/utils/script-name.mjs'
import command from './command.mjs'
import scopes from './scopes.mjs'

const __filename = fileURLToPath(import.meta.url)
const SCRIPT_NAME = _SCRIPT_NAME(__filename)
const inPathSync = inPath.sync

export default () => {
  if (inPathSync('gsettings')) {
    return exec(command(scopes)).then(() => SCRIPT_NAME)
  } else {
    return Promise.resolve(SCRIPT_NAME)
  }
}
