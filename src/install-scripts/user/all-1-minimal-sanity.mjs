import addHomeBinToPath from './add-home-bin-to-path.mjs'
import homeIsDesktop from './home-is-desktop.mjs'
import installTmuxinatorByobuBashAliases from './install-tmuxinator-byobu-bash_aliases.mjs'
import saveBashHistory from './save-bash-history.mjs'
import tmpIsDownloads from './tmp-is-downloads.mjs'

export default async () =>
  Promise.all([
    installTmuxinatorByobuBashAliases(),
    addHomeBinToPath(),
    saveBashHistory(),
    homeIsDesktop(),
    tmpIsDownloads(),
  ])
