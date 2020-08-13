import { update, fullUpgrade, install } from '../lib/apt/index.mjs'
export default async () => {
  await update()
}
