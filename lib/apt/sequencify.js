let inProgress = Promise.resolve()

/**
 * Wraps promise returning function, so any calls to it are performed in sequence.
 * @param fn promise returning function
 * @returns {Function} FIFO'ed promise returning function
 */
export default fn => (...args) => {
  const goAhead = () => {
    inProgress = fn(...args)
    return inProgress
  }
  return inProgress.then(goAhead, goAhead)
}
