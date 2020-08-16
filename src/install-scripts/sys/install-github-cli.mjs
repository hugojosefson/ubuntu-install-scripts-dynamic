import githubReleaseUrl from '../../lib/github-release-url.mjs'
import { installDebUrls } from '../../lib/install-apt-packages.mjs'
import mustBeRoot from '../../lib/utils/must-be-root.mjs'

export default mustBeRoot(import.meta.url, async () =>
  installDebUrls(await githubReleaseUrl('cli/cli'))
)
