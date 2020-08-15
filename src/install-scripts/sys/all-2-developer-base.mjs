import installAptPackages from '../../lib/install-apt-packages.mjs'
import installDocker from './install-docker.mjs'
import installGithubCli from './install-github-cli.mjs'
import installGithubGitPlugin from './install-github-git-plugin.mjs'
import installIsolateInDocker from './install-isolate-in-docker.mjs'
import installVirtManager from './install-virt-manager.mjs'

export default async () => {
  return Promise.all([
    installAptPackages([
      'git',
      'git-revise',
      'gitk',
      'meld',
      'moreutils',
      'tig',
    ]),
    installGithubCli(),
    installGithubGitPlugin(),
    installDocker(),
    installIsolateInDocker(),
    installVirtManager(),
  ])
}
