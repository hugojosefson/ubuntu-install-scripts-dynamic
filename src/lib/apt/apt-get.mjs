import childProcess from 'child_process'
import inPath from 'inpath'
import isRoot from 'is-root'
import sudo from 'sudo'
import sudoOptions from './sudo-options.mjs'

const aptGetBin = inPath.sync('apt-get')

const aptGet = command => packages =>
  childProcess.spawn(
    aptGetBin,
    [command, '-y'].concat(packages),
    sudoOptions.spawnOptions
  )

const sudoAptGet = command => packages =>
  sudo(['apt-get', command, '-y'].concat(packages), sudoOptions)

export default isRoot() ? aptGet : sudoAptGet
