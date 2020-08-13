import debounce from 'debounce'

import defer from './utils/defer.mjs'
import installedPackages from './utils/installed-packages.mjs'
import { install } from './apt/index.mjs'

let waiting = []
const installed = {}

let currentBatch
const installPending = debounce(() => {
  if (currentBatch) {
    currentBatch.then(installPending)
  } else {
    if (waiting.length) {
      currentBatch = new Promise((resolve, reject) => {
        const aptPromise = install(waiting)
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
 * @param packageNames names of packages to install
 *
 * @returns {Promise} Promise for array of result objects, or rejected with single result object.
 */
const installAptPackages = (...packageNames) =>
  Promise.all(packageNames.flat().map(installAptPackage))

const installAptPackage = name => {
  if (installed[name]) {
    return installed[name].promise
  } else {
    return new Promise((resolve, reject) => {
      installedPackages.then(packages => {
        if (packages[name]) {
          console.log('Already installed apt package', name)
          resolve(name)
        } else {
          console.log('Installing apt package', name)
          installed[name] = defer()
          waiting.push(name)
          installPending()
          installed[name].promise.then(resolve, reject)
        }
      }, reject)
    })
  }
}

export default installAptPackages
