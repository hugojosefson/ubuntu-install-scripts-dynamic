import mustBeRoot from '../../lib/utils/must-be-root.mjs'
import { run, getTargetUser } from '../../lib/run.mjs'

export default mustBeRoot(import.meta.url, () =>
  run({ command: `chown -R "${getTargetUser()}" /usr/local` })
)
