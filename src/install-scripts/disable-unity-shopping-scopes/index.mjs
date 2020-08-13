import _SCRIPT_NAME from '../../lib/utils/script-name.js'

import inPath from 'inpath'
import exec from 'faithful-exec'
import scopes from './scopes.js'
import command from './command.js'

const SCRIPT_NAME = _SCRIPT_NAME(__filename)
const inPathSync = inPath.sync

export default () => {
  if (inPathSync('gsettings')) {
    return exec(command(scopes)).then(() => SCRIPT_NAME)
  } else {
    return Promise.resolve(SCRIPT_NAME)
  }
}
