import { haveUpdates, update, fullUpgrade } from '../../lib/apt/index.mjs'

export default async (force = false) => {
  if (force || (await haveUpdates())) {
    await update()
    await fullUpgrade()
  }
}
