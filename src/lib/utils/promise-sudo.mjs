import sudo from 'sudo'

import promisifyAptFunction from '../apt/promisify-apt-function.mjs'

export default (args, sudoOptions) =>
  promisifyAptFunction(() => sudo(['--preserve-env', ...args], sudoOptions))()
