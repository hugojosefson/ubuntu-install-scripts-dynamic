import path from 'path'
import { fileURLToPath } from 'url'

export default scriptUrl => {
  const scriptPath = fileURLToPath(scriptUrl)
  const ext = path.extname(scriptPath)

  const parts = scriptPath.split('/')
  const last = path.basename(parts.pop(), ext)
  if (path.basename(last, ext) !== 'index') {
    parts.push(last)
  }

  const baseIndex = parts.indexOf('install-scripts')
  if (baseIndex === -1) {
    throw new Error(`Could not find 'install-scripts' in '${scriptPath}'`)
  }

  return parts.slice(baseIndex + 1).join('/')
}
