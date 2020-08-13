import installAptPackages from './install-apt-packages.mjs'

/**
 * Installs one or several apt packages or software packages, returning a
 * promise for when they have been installed.
 *
 * @param names Names of a packages to install.
 *
 * @returns {Promise} Promise resolving to array of result objects, or rejected with single result object.
 */
export default (...names) => Promise.all(names.flat().map(installOne))

/**
 * TODO: install('all') should call install('sys/all'), then install('user/all') if they are available.
 * TODO: sys/* should always be wrapped with mustBeRoot
 * @param scriptName
 * @returns {PromiseLike<any> | Promise<any>}
 */
const getInstallFunction = scriptName =>
  import(`../install-scripts/${scriptName}.mjs`).then(
    mod => mod.default,
    () =>
      import(`../install-scripts/install-${scriptName}.mjs`).then(
        mod => mod.default,
        () =>
          import(`../install-scripts/${scriptName}/index.mjs`).then(
            mod => mod.default,
            () =>
              import(`../install-scripts/install-${scriptName}/index.mjs`).then(
                mod => mod.default,
                () => undefined
              )
          )
      )
  )

const installOne = async scriptName => {
  const mod = await Promise.resolve(getInstallFunction(scriptName))
  if (typeof mod === 'function') {
    const fn = mod
    return fn()
  }
  return installAptPackages(scriptName)
}
