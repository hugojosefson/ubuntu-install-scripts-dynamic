#!/bin/sh
/* 2>/dev/null
export NODE_VERSION="$(cat "$(dirname "$0")/.nvmrc")"
PATH="$("$(dirname "$0")"/src/lib/find-node-or-install/find-node-or-install):$PATH"
exec node "$0" "$@"
*/
import argv, { names } from './src/lib/utils/argv.mjs'
import install from './src/lib/install.mjs'

if (names.length) {
  install(names).then(
    results => {
      if (argv.verbose) {
        console.dir({ results })
      }
      console.log('Yay! Installed', names)
    },
    result => console.error('Failed to install', result)
  )
} else {
  console.error(
    'Usage: ' +
      process.argv[1] +
      '[--verbose] <package-or-script> [<package-or-script>]*'
  )
  process.exit(2)
}
