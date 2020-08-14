import promisifyAptFunction from './apt/promisify-apt-function.mjs'
import childProcess from 'child_process'

const getUser = async () =>
  (await promisifyAptFunction(() => childProcess.spawn('id', ['-un']))()).stdout
    .join('\n')
    .trim()

const TARGET_USER =
  process.env.TARGET_USER || process.env.USER || (await getUser())

export const sudoOptions = {
  cachePassword: true,
  spawnOptions: {
    env: {
      ...process.env,
      TARGET_USER,
    },
    // disable output to user's tty
  },
}
