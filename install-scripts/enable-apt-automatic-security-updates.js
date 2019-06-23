import _SCRIPT_NAME from '../lib/utils/script-name'

import replaceInFile from '../lib/utils/replace-in-file'
import isRoot from 'is-root'
import rerunAsRoot from '../lib/utils/rerun-as-root'

const SCRIPT_NAME = _SCRIPT_NAME(__filename)

const enableAptAutomaticSecurityUpdates = () => replaceInFile(
  '/etc/apt/apt.conf.d/10periodic',
  [
    'APT::Periodic::Download-Upgradeable-Packages "0"',
    'APT::Periodic::Download-Upgradeable-Packages "1"'
  ],
  [
    'APT::Periodic::Unattended-Upgrade "0"',
    'APT::Periodic::Unattended-Upgrade "1"'
  ]
).then(() => SCRIPT_NAME)

export default isRoot() ? enableAptAutomaticSecurityUpdates : rerunAsRoot.bind({}, SCRIPT_NAME)
