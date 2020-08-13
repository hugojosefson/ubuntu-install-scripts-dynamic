import aptGet from './apt-get.mjs'
import promisifyAptFunction from './promisify-apt-function.mjs'
import sequencify from './sequencify.mjs'

const aptSequence = sequencify()

export const update = aptSequence(promisifyAptFunction(aptGet('update'), {}))
export const fullUpgrade = aptSequence(
  promisifyAptFunction(
    aptGet('full-upgrade', '-y', '--purge', '--auto-remove'),
    {}
  )
)
export const install = aptSequence(
  promisifyAptFunction(aptGet('install', '-y', '--purge', '--auto-remove'), {})
)
