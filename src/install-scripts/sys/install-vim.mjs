import installAptPackages from '../../lib/install-apt-packages.mjs'
import ensureLineInFile from '../../lib/utils/ensure-line-in-file.mjs'
import mustBeRoot from '../../lib/utils/must-be-root.mjs'

export default mustBeRoot(import.meta.url, () =>
  Promise.all([
    installAptPackages('vim'),
    ensureLineInFile('/etc/environment', 'EDITOR=vim'),
  ])
)
