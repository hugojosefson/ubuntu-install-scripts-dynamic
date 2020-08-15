import debounce from 'debounce'
import { install } from './apt/index.mjs'
import download from './download.mjs'
import run from './run.mjs'

import defer from './utils/defer.mjs'
import installedPackages from './utils/installed-packages.mjs'

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
export default (...packageNames) =>
  Promise.all(packageNames.flat().map(installAptPackage))

const installAptPackage = name => {
  if (installed[name]) {
    return installed[name].promise
  } else {
    return new Promise((resolve, reject) => {
      installedPackages.then(packages => {
        if (packages[name]) {
          // already installed apt package
          resolve(name)
        } else {
          // install apt package
          installed[name] = defer()
          waiting.push(name)
          installPending()
          installed[name].promise.then(resolve, reject)
        }
      }, reject)
    })
  }
}

export const installDebUrls = (...urls) => Promise.all(urls.map(installDebUrl))

const installDebFile = async debFilename =>
  installAptPackage('gdebi').then(() =>
    run(`gdebi --non-interactive "${debFilename}"`)
  )
const installDebUrl = url => download(url).then(installDebFile)
