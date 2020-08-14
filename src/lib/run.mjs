import promisifyAptFunction from './apt/promisify-apt-function.mjs'
import childProcess from 'child_process'
import { sudoOptions } from './sudo-options.mjs'

export const getTargetUser = () => sudoOptions.spawnOptions.env.TARGET_USER

export const run = async ({ command, options = {} }) =>
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
