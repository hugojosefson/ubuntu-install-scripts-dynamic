/**
 * All apt commands share the same sequence.
 * @type {Promise<void>}
 */
let globalAptInProgress = Promise.resolve()

/**
 * Wraps function, so any calls to it are performed in sequence.
 * @param fn function
 * @returns {Function} FIFO'ed promise returning function
 */
export default fn => (...args) => {
  const goAhead = () => {
    globalAptInProgress = Promise.resolve(fn(...args))
    return globalAptInProgress
  }
  return globalAptInProgress.then(goAhead, goAhead)
}
