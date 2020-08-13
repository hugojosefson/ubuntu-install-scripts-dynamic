import promisifyAptFunction from './promisify-apt-function.mjs'
import sequencify from './sequencify.mjs'
import aptGet from './apt-get.mjs'

const aptGetInstall = aptGet('install')
const aptGetUpdate = aptGet('update')

/**
 * Apt functions, which return a promise of {code, stdout, stderr}.
 *
 * Same status object is resolved or rejected, depending on how execution went.
 *
 * @type {{install: function, update: function}}
 */
export default {
  install: sequencify(promisifyAptFunction(aptGetInstall, {})), // install(packages)
  update: sequencify(promisifyAptFunction(aptGetUpdate, {})), // update()
}
