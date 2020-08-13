import path from 'path'
import { fileURLToPath } from 'url'

const naïveScriptName = scriptPath =>
  path.basename(scriptPath, path.extname(scriptPath))

export default scriptUrl => {
  const scriptPath = fileURLToPath(scriptUrl)

  const scriptName = naïveScriptName(scriptPath)
  if (scriptName === 'index') {
    return path.basename(path.dirname(scriptPath))
  }

  return scriptName
}
