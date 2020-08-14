import { run } from '../../lib/run.mjs'

export default () =>
  run({
    command: `cd ~ && (rmdir Downloads 2>/dev/null || rm Downloads 2>/dev/null || true) && ln -s /tmp Downloads`,
  })
