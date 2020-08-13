import exec from 'faithful-exec'
import _ from 'lodash'

/**
 * Returns a Promise for an object where keys are currently installed Ubuntu
 * packages, and values are true.
 */
export default exec("dpkg -l|awk '/^ii/{print $2}'").then(result =>
  _.fromPairs(
    result.stdout
      .trim()
      .split('\n')
      .map(name => [name, true])
  )
)
