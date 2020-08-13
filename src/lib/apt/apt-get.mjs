import childProcess from 'child_process'
import inPath from 'inpath'
import isRoot from 'is-root'
import sudo from 'sudo'

export const sudoOptions = {
  cachePassword: true,
  spawnOptions: {}, // disable output to user's tty
}
const aptGetBin = inPath.sync('apt-get')

const aptGet = (command, ...args) => packages =>
  childProcess.spawn(
    aptGetBin,
    [command, ...args, ...packages],
    sudoOptions.spawnOptions
  )

const sudoAptGet = (command, ...args) => packages =>
  sudo(['apt-get', command, ...args, ...packages], sudoOptions)

export default isRoot() ? aptGet : sudoAptGet
