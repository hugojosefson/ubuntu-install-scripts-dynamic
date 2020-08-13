import isRoot from 'is-root'
import rerunAsRoot from './rerun-as-root.mjs'
import scriptName from './script-name.mjs'

export default (scriptUrl, fn) =>
  isRoot() ? fn : () => rerunAsRoot(scriptName(scriptUrl))
