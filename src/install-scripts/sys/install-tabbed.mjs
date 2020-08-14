import mustBeRoot from '../../lib/utils/must-be-root.mjs'
import installAptPackages from '../../lib/install-apt-packages.mjs'

export default mustBeRoot(import.meta.url, () =>
  installAptPackages([
    'build-essential',
    'git',
    'libxft-dev',
    'alacritty',
    'coreutils',
    'procps',
    'xdotool',
  ])
)
