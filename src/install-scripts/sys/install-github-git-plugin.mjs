import path from 'path'
import download from '../../lib/download.mjs'
import githubReleaseUrl from '../../lib/github-release-url.mjs'
import installAptPackages from '../../lib/install-apt-packages.mjs'
import run from '../../lib/run.mjs'
import mustBeRoot from '../../lib/utils/must-be-root.mjs'

export default mustBeRoot(import.meta.url, async () => {
  const gitPromise = installAptPackages('git')
  const bashCompletionPromise = installAptPackages('bash-completion')

  const urlPromise = githubReleaseUrl('github/hub', 'tgz')
  const url = await urlPromise

  const downloadFilePromise = download(url)
  const filename = await downloadFilePromise

  const unpackPromise = run(`tar xzf "${filename}"`, {
    cwd: path.dirname(filename),
  })

  await unpackPromise
  await bashCompletionPromise
  const movePromise = run(
    `file=hub*/etc/hub.bash_completion.sh && chown root:root \${file} && chmod u=rw,go=r \${file} && mv \${file} /etc/bash_completion.d/`,
    {
      cwd: path.dirname(filename),
    }
  )

  return Promise.all([
    gitPromise,
    bashCompletionPromise,
    downloadFilePromise,
    unpackPromise,
    movePromise,
    bashCompletionPromise,
  ])
})
