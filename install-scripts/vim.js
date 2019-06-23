import installAptPackages from '../lib/install-apt-packages'
import ensureLineInFile from '../lib/utils/ensure-line-in-file'
import homeFile from '../lib/utils/home-file'

export default () => installAptPackages('vim')
  .then(
    result => ensureLineInFile(
      homeFile('.bashrc'),
      'export EDITOR=vim'
    ).then(() => result)
  )
