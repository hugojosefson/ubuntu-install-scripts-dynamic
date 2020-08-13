#!/bin/sh
/* 2>/dev/null
export NODE_VERSION="$(cat "$(dirname "$0")/.nvmrc")"
PATH="$("$(dirname "$0")"/src/lib/find-node-or-install/find-node-or-install):$PATH"
exec node "$0" "$@"
*/

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
  console.log(
    'Usage: ' + process.argv[1] + ' <package-or-script> [<package-or-script>]*'
  )
}
