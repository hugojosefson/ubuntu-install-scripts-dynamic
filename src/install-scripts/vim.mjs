import installAptPackages from '../lib/install-apt-packages.mjs'
import ensureLineInFile from '../lib/utils/ensure-line-in-file.mjs'
import homeFile from '../lib/utils/home-file.mjs'

export default async () => {
  const [result] = await Promise.all([
    installAptPackages('vim'),
    ensureLineInFile(homeFile('.bashrc'), 'export EDITOR=vim'),
  ])
  return result
}
