import minimist from 'minimist'
import install from './src/lib/install.mjs'

const argv = minimist(process.argv.slice(2))
const names = argv._
if (names.length) {
  install(names).then(
    results => {
      if (argv.verbose) {
        console.dir(results)
      }
      console.log('Yay! Installed', names)
    },
    result => console.error('Failed to install', result)
  )
} else {
  console.log('Usage: ' + process.argv[1] + ' <package-or-script>...')
}
