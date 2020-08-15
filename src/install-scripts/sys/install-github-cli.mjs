import githubReleaseUrl from '../../lib/github-release-url.mjs'
import { installDebUrls } from '../../lib/install-apt-packages.mjs'

export default async () => installDebUrls(await githubReleaseUrl('cli/cli'))
