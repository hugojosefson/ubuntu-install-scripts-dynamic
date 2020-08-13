import { sudoOptions } from '../apt/apt-get.mjs'
import promisifyAptFunction from '../apt/promisify-apt-function.mjs'
import sudo from 'sudo'

export default async scriptName => {
  await promisifyAptFunction(() =>
    sudo(['--preserve-env', './index.mjs', scriptName], sudoOptions)
  )()
  return scriptName
}
