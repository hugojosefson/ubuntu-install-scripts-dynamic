import _SCRIPT_NAME from '../lib/utils/script-name'

import replaceInFile from '../lib/utils/replace-in-file'
import isRoot from 'is-root'
import rerunAsRoot from '../lib/utils/rerun-as-root'

const SCRIPT_NAME = _SCRIPT_NAME(__filename)

const enableAptCanonicalPartnersSources = () => replaceInFile(
  '/etc/apt/sources.list',
  [
    /# (deb.*?partner)/g,
    '$1'
  ]
).then(() => SCRIPT_NAME)

export default isRoot() ? enableAptCanonicalPartnersSources : rerunAsRoot.bind({}, SCRIPT_NAME)
