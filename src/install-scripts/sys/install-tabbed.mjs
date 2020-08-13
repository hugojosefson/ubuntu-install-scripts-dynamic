import childProcess from 'child_process'
import { sudoOptions } from '../../lib/apt/apt-get.mjs'
import promisifyAptFunction from '../../lib/apt/promisify-apt-function.mjs'
import mustBeRoot from '../../lib/utils/must-be-root.mjs'
import installAptPackages from '../../lib/install-apt-packages.mjs'

export default mustBeRoot(import.meta.url, async () => {
  const aptPromise = installAptPackages([
    'build-essential',
    'git',
    'libxft-dev',
    'alacritty',
    'coreutils',
    'procps',
    'xdotool',
  ])

  await aptPromise
  const cwd = (
    await promisifyAptFunction(() =>
      childProcess.spawn('mktemp', ['-d'], sudoOptions.spawnOptions)
    )()
  ).stdout.join('')

  // git clone https://github.com/hugojosefson/tabbed
  // cd tabbed
  // make
  // sudo make install
  //
  // mkdir -p ~/bin
  // cp extra-tools/* ~/bin/
})
