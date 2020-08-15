import run from '../../lib/run.mjs'

export default () =>
  run(
    `cd ~ && (rmdir Desktop 2>/dev/null || rm Desktop 2>/dev/null || true) && ln -s . Desktop`
  )
