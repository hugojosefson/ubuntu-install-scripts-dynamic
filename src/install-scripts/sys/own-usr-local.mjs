import { default as run, getTargetUser } from '../../lib/run.mjs'
import mustBeRoot from '../../lib/utils/must-be-root.mjs'

export default mustBeRoot(import.meta.url, () =>
  run(`chown -R "${getTargetUser()}" /usr/local`)
)
