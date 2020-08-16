import { purge } from '../../lib/apt/index.mjs'
import installAptPackages from '../../lib/install-apt-packages.mjs'
import mustBeRoot from '../../lib/utils/must-be-root.mjs'
import installTabbed from './install-tabbed.mjs'

export default mustBeRoot(import.meta.url, async () => {
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
})
