import sudo from 'sudo'

import promisifyAptFunction from '../apt/promisify-apt-function'

export default (args, sudoOptions) => promisifyAptFunction(
  () => sudo(
    ['--preserve-env'].concat(args),
    sudoOptions
  )
)()
