import exec from 'faithful-exec'
import _ from 'lodash'

/**
 * Promise for an object where keys are currently installed apt
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
