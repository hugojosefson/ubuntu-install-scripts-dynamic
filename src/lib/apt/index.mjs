import aptGet from './apt-get.mjs'
import promisifyAptFunction from './promisify-apt-function.mjs'
import sequencify from './sequencify.mjs'

const aptSequence = sequencify()

export const haveUpdates = () =>
  aptSequence(
    promisifyAptFunction(aptGet('upgrade', '-s', '-o', 'Debug::NoLocking=true'))
  )().then(({ stdout }) => !stdout.some(line => /^Inst/g.test(line)))

export const update = aptSequence(promisifyAptFunction(aptGet('update')))

export const fullUpgrade = aptSequence(
  promisifyAptFunction(aptGet('full-upgrade', '-y', '--purge', '--auto-remove'))
)

export const install = aptSequence(
  promisifyAptFunction(aptGet('install', '-y', '--purge', '--auto-remove'))
)

export const purge = aptSequence(
  promisifyAptFunction(aptGet('purge', '-y', '--auto-remove'))
)
