import childProcess from 'child_process'
import promisifyAptFunction from './apt/promisify-apt-function.mjs'
import { sudoOptions } from './sudo-options.mjs'

export const getTargetUser = () => sudoOptions.spawnOptions.env.TARGET_USER

export default async (command, options = {}) =>
  (
    await promisifyAptFunction(() =>
      childProcess.spawn('/bin/sh', ['-c', command], {
        ...sudoOptions.spawnOptions,
        ...options,
      })
    )()
  ).stdout
    .join('\n')
    .trim()
