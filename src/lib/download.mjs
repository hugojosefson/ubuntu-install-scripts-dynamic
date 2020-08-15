import path from 'path'
import installAptPackages from './install-apt-packages.mjs'
import run from './run.mjs'

export default async url => {
  await installAptPackages('curl')
  const tempDir = await run('mktemp -d')
  const filename = path.join(tempDir, path.basename(url))
  await run(`curl -sL "${url}" -o ${filename}`)
  return filename
}
