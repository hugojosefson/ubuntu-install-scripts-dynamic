import installAptPackages from '../lib/install-apt-packages.js'
import ensureLineInFile from '../lib/utils/ensure-line-in-file.js'
import homeFile from '../lib/utils/home-file.js'

export default () =>
  installAptPackages('vim').then(result =>
    ensureLineInFile(homeFile('.bashrc'), 'export EDITOR=vim').then(
      () => result
    )
  )
