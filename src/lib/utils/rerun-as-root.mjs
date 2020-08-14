import promisifyAptFunction from '../apt/promisify-apt-function.mjs'
import sudo from 'sudo'
import { sudoOptions } from '../sudo-options.mjs'
import argv from './argv.mjs'

export default async scriptName => {
  await promisifyAptFunction(() =>
    sudo(
      [
        '--preserve-env',
        './src/lib/find-node-or-install/node',
        '--trace-warnings',
        '--unhandled-rejections=strict',
        './index.mjs',
        ...(argv.verbose ? ['--verbose'] : []),
        scriptName,
      ],
      sudoOptions
    )
  )()
  return scriptName
}
