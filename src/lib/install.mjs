import installAptPackages from './install-apt-packages.mjs'
import ensureEndsWith from './utils/ensure-ends-with.mjs'
import sequencify from './apt/sequencify.mjs'

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
 * TODO: sys/* should always be wrapped with mustBeRoot
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
      console.log(1, { dir, scriptName })
      if (dir) return undefined
      console.log(2, { scriptName })

      const sysPromise = getInstallFunction(`sys/${scriptName}`)
      console.log(2.1, { scriptName, sysPromise })
      const userPromise = getInstallFunction(`user/${scriptName}`)
      console.log(2.2, { scriptName, userPromise })
      const settled = await Promise.allSettled([sysPromise, userPromise])
      console.log(3, { scriptName, settled })

      const modules = settled
        .filter(({ status }) => status === 'fulfilled')
        .filter(({ value }) => typeof value === 'function')
        .map(({ value }) => value)
      console.log(4, { scriptName, modules })

      if (modules.length === 0) return undefined
      console.log(5, { scriptName })

      // first run sys, then user
      const seq = sequencify()
      console.log(6, { scriptName, seq })
      const reduction = modules.reduce(
        (acc, curr) => a => acc(a).then(() => seq(curr)()),
        a => Promise.resolve(a)
      )
      console.log(7, { scriptName, reduction })
      const awaitedReduction = await reduction
      console.log(8, { scriptName, awaitedReduction })
      return awaitedReduction
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
  const mod = await Promise.resolve(getInstallFunction(scriptName))
  if (typeof mod === 'function') {
    return mod()
  }
  return installAptPackages(scriptName)
}
