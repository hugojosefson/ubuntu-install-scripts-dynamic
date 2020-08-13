import isRoot from 'is-root'
import rerunAsRoot from './rerun-as-root.mjs'

export default (fn, scriptName) =>
  isRoot() ? fn : rerunAsRoot.bind({}, scriptName)
