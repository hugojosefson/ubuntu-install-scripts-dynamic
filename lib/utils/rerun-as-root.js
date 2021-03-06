import sudoOptions from '../apt/sudo-options'
import promisifyAptFunction from '../apt/promisify-apt-function'
import sudo from 'sudo'

export default scriptName =>
  promisifyAptFunction(
    () => sudo(
      ['--preserve-env'].concat([
        './find-node-or-install/node',
        '--experimental-modules',
        '--es-module-specifier-resolution=node',
        './index.js',
        scriptName
      ]),
      sudoOptions
    )
  )().then(() => scriptName)
