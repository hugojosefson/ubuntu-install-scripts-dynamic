import installAptPackages from '../../lib/install-apt-packages.mjs'
import run from '../../lib/run.mjs'
import mustBeRoot from '../../lib/utils/must-be-root.mjs'

export default mustBeRoot(import.meta.url, async () => {
  const aptPromise = installAptPackages('curl', 'docker-compose')

  await aptPromise
  const dockerPromise = run(
    `curl -s https://get.docker.com/ | sed 's/\\\$ID/ubuntu/' | sh`
  )

  await dockerPromise
  const groupPromise = run('usermod -aG docker "${TARGET_USER}"')

  return Promise.all([aptPromise, dockerPromise, groupPromise])
})
