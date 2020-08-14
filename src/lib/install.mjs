import installAptPackages from './install-apt-packages.mjs'
import ensureEndsWith from './utils/ensure-ends-with.mjs'

/**
 * Installs one or several apt packages or software packages, returning a
 * promise for when they have been installed.
 *
 * @param names Names of a packages to install.
 *
 * @returns {Promise} Promise resolving to array of result objects, or rejected with single result object.
 */
export default (...names) => Promise.all(names.flat().map(installOne))

export const allButTheLast = array => array.slice(0, array.length - 1)
export const last = array => array[array.length - 1]

const interpretScriptName = scriptName => {
  const parts = scriptName.split('/')
  if (parts.length > 1) {
    const dirs = allButTheLast(parts)
    const dir = ensureEndsWith(dirs.join('/'), '/')
    const moduleName = last(parts)
    return [dir, moduleName]
  }

  return ['', scriptName]
}

/**
 * @param scriptName
 * @returns {PromiseLike<any> | Promise<any>}
 */
const getInstallFunction = scriptName => {
  const [dir, name] = interpretScriptName(scriptName)
  return findResolution(path => import(path))(
    `../install-scripts/${dir}${name}.mjs`,
    `../install-scripts/${dir}${name}/index.mjs`,
    `../install-scripts/${dir}install-${name}.mjs`,
    `../install-scripts/${dir}install-${name}/index.mjs`
  ).then(
    mod => mod.default,
    async () => {
      if (dir) return undefined

      // find named module(s)
      const sysPromise = getInstallFunction(`sys/${scriptName}`)
      const userPromise = getInstallFunction(`user/${scriptName}`)
      const settled = await Promise.allSettled([sysPromise, userPromise])
      const modules = settled
        .filter(({ status }) => status === 'fulfilled')
        .filter(({ value }) => typeof value === 'function')
        .map(({ value }) => value)

      if (modules.length === 0) return undefined

      // run modules in order; first sys, then user
      return async () =>
        modules.reduce(async (results, fn) => {
          const result = await fn()
          return [...(await results), result]
        }, [])
    }
  )
}

const findResolution = fn => {
  const tryArgument = (x, ...xs) =>
    xs.length === 0
      ? fn(x)
      : fn(x).catch(() => tryArgument(xs[0], ...xs.slice(1)))
  return tryArgument
}

const installOne = async scriptName => {
  try {
    const mod = await Promise.resolve(getInstallFunction(scriptName))
    if (typeof mod === 'function') {
      return mod()
    }
    return installAptPackages(scriptName)
  } catch (err) {
    return Promise.reject({ scriptName, err })
  }
}
