import run from '../../lib/run.mjs'
import ownUsrLocal from '../sys/own-usr-local.mjs'

export default async () => {
  const usrLocalPromise = ownUsrLocal()

  const tmp = await run('mktemp -d')
  await run('git clone https://github.com/hugojosefson/tabbed', { cwd: tmp })

  const cwd = `${tmp}/tabbed`
  const extraToolsPromise = usrLocalPromise.then(() =>
    run('cp extra-tools/* /usr/local/bin/', { cwd })
  )
  const makePromise = usrLocalPromise.then(() => run('make install', { cwd }))
  await extraToolsPromise
  await makePromise
  return Promise.all([extraToolsPromise, makePromise])
}
