import sudoOptions from '../apt/sudo-options.mjs'
import promisifyAptFunction from '../apt/promisify-apt-function.mjs'
import sudo from 'sudo'

export default scriptName =>
  promisifyAptFunction(() =>
    sudo(
      ['--preserve-env'].concat([
        './find-node-or-install/node',
        './index.mjs',
        scriptName,
      ]),
      sudoOptions
    )
  )().then(() => scriptName)
