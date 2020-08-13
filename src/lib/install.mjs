import installAptPackages from './install-apt-packages.mjs'

/**
 * Installs one or several apt packages or software packages, returning a
 * promise for when they have been installed.
 *
 * @param names Names of a packages to install.
 *
 * @returns {Promise} Promise resolving to array of result objects, or rejected with single result object.
 */
export default names => Promise.all(names.map(installOne))

const getInstallFunction = (scriptName, subFunctionName = 'default') =>
  import(`../install-scripts/${scriptName}.mjs`).then(
    mod => mod[subFunctionName],
    () =>
      import(`../install-scripts/${scriptName}/index.mjs`).then(
        mod => mod[subFunctionName],
        () => undefined
      )
  )

const installOne = async name => {
  const [scriptName, subFunctionName, ...extraArgs] = name.split(':')
  const mod = await Promise.resolve(
    getInstallFunction(scriptName, subFunctionName)
  )
  if (Array.isArray(mod)) {
    const names = mod.filter(a => typeof a === 'string')
    return Promise.all(names.map(installOne))
  }
  if (typeof mod === 'function') {
    const fn = mod
    return fn(...extraArgs)
  }
  return installAptPackages(name)
}
