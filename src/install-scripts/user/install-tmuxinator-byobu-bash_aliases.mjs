import installAptPackages from '../../lib/install-apt-packages.mjs'
import { purge } from '../../lib/apt/index.mjs'
import installTabbed from './install-tabbed.mjs'

export default async () => {
  const tabbedPromise = installTabbed()

  const installPromise = installAptPackages([
    'byobu',
    'tmux',
    'tmuxinator',
    'alacritty',
    'xsel',
  ])

  await installPromise
  const purgePromise = purge(['screen'])

  return Promise.all([installPromise, purgePromise, tabbedPromise])
}
