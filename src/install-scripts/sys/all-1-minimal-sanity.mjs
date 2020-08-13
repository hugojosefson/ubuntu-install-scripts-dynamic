import installAptPackages from '../../lib/install-apt-packages.mjs'
import updatePackages from './update-packages.mjs'
import installTmuxinatorByobuBashAliases from './install-tmuxinator-byobu-bash_aliases.mjs'
import installVim from './install-vim.mjs'

export default async () => {
  const updatePackagesPromise = updatePackages()
  await updatePackagesPromise

  return Promise.all([
    updatePackagesPromise,
    installAptPackages([
      'aptitude',
      'flip',
      'jq',
      'ncdu',
      'network-manager-openvpn-gnome',
      'solaar',
      'ssh',
      'tree',
    ]),
    installTmuxinatorByobuBashAliases(),
    installVim(),
  ])
}
