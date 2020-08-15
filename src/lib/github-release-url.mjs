import installAptPackages from './install-apt-packages.mjs'
import run from './run.mjs'

export default async (
  repo,
  test = url => /linux/.test(url) && /amd64/.test(url) && /\.deb$/.test(url)
) => {
  await installAptPackages('curl')
  return JSON.parse(
    await run(`curl -sL "https://api.github.com/repos/${repo}/releases/latest"`)
  )
    .assets.map(({ browser_download_url }) => browser_download_url)
    .find(url => test(url))
}
