import { fullUpgrade, haveUpdates, update } from '../../lib/apt/index.mjs'
import mustBeRoot from '../../lib/utils/must-be-root.mjs'

export default mustBeRoot(import.meta.url, async (force = false) => {
  if (force || (await haveUpdates())) {
    await update()
    await fullUpgrade()
  }
})
