import debounce from 'debounce'

import defer from './utils/defer.mjs'
import installedPackages from './utils/installed-packages.mjs'
import apt from './apt/index.mjs'

let waiting = []
const installed = {}

let currentBatch
const installPending = debounce(() => {
  if (currentBatch) {
    currentBatch.then(installPending)
  } else {
    if (waiting.length) {
      currentBatch = new Promise((resolve, reject) => {
        const aptPromise = apt.install(waiting)
        waiting.forEach(name =>
          aptPromise.then(installed[name].resolve, installed[name].reject)
        )
        aptPromise.then(resolve, reject)
        waiting = []
      })

      currentBatch.then(() => {
        currentBatch = null
        installPending()
      })
    }
  }
}, 0)

/**
 * Installs one or several apt packages, returning a promise for when they have been installed.
 *
 * @param name String with name of a package to install, or Array of them.
 *
 * @returns {Promise} Promise for array of result objects, or rejected with single result object.
 */
const installAptPackages = name => {
  if (Array.isArray(name)) {
    const names = name
    return Promise.all(names.map(installAptPackages))
  } else {
    if (installed[name]) {
      return installed[name].promise
    } else {
      return new Promise((resolve, reject) => {
        installedPackages.then(packages => {
          if (packages[name]) {
            console.log('Already installed Ubuntu package', name)
            resolve(name)
          } else {
            console.log('Installing Ubuntu package', name)
            installed[name] = defer()
            waiting.push(name)
            installPending()
            installed[name].promise.then(resolve, reject)
          }
        }, reject)
      })
    }
  }
}

export default installAptPackages
