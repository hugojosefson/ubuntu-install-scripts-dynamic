/**
 * Wraps function, so any calls to it are performed in sequence.
 * @param fn function
 * @returns {Function} FIFO'ed promise returning function
 */
export default () => {
  let globalAptInProgress = Promise.resolve()

  return fn => (...args) => {
    const goAhead = () => {
      globalAptInProgress = Promise.resolve(fn(...args))
      return globalAptInProgress
    }
    return globalAptInProgress.then(goAhead, goAhead)
  }
}
