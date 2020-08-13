import installAptPackages from '../lib/install-apt-packages.mjs'
import ensureLineInFile from '../lib/utils/ensure-line-in-file.mjs'
import homeFile from '../lib/utils/home-file.mjs'

export default () =>
  installAptPackages('vim').then(result =>
    ensureLineInFile(homeFile('.bashrc'), 'export EDITOR=vim').then(
      () => result
    )
  )
