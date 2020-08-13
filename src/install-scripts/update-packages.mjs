import { update, fullUpgrade, install } from '../lib/apt/index.mjs'
export default async (force = false) => {
  await update()
}
