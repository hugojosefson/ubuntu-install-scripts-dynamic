import installScripts from '../install-scripts/index.mjs'
import installAptPackages from './install-apt-packages.mjs'

/**
 * Installs one or several apt packages or software packages, returning a
 * promise for when they have been installed.
 *
 * @param name String with name of a package to install, or Array of them.
 *
 * @returns {Promise} Promise for array of result objects, or rejected with single result object.
 */
const install = name => {
  if (Array.isArray(name)) {
    const names = name
    return Promise.all(names.map(install))
  } else {
    const [scriptName, subFunctionName, ...extraArgs] = name.split(':')
    const script = installScripts[scriptName]
    if (script) {
      if (subFunctionName) {
        return script[subFunctionName](extraArgs)
      } else {
        console.log('Installing script', scriptName)
        return script()
      }
    } else {
      return installAptPackages(name)
    }
  }
}

export default install
