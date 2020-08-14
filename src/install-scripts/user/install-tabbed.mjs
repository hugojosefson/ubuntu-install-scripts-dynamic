import { run } from '../../lib/run.mjs'
import ownUsrLocal from '../sys/own-usr-local.mjs'

export default async () => {
  const usrLocalPromise = ownUsrLocal()

  const tmp = await run({ command: 'mktemp -d' })
  await run({
    options: { cwd: tmp },
    command: 'git clone https://github.com/hugojosefson/tabbed',
  })

  const cwd = `${tmp}/tabbed`
  const extraToolsPromise = usrLocalPromise.then(() =>
    run({
      options: { cwd },
      command: 'cp extra-tools/* /usr/local/bin/',
    })
  )
  const makePromise = usrLocalPromise.then(() =>
    run({ options: { cwd }, command: 'make install' })
  )
  await extraToolsPromise
  await makePromise
  return Promise.all([extraToolsPromise, makePromise])
}
