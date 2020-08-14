/**
 * Wraps an apt function, so it returns a promise of {code, stdout, stderr}.
 *
 * Same status object is resolved or rejected, depending on how execution went.
 *
 * @param fn a function from /src/lib/apt/index.mjs
 * @returns {Function} the same fn, but returns a promise for {code, stdout, stderr}
 */
export default fn => (...args) =>
  new Promise((resolve, reject) => {
    const proc = fn(...args)
    const stdout = []
    const stderr = []

    proc.stdout.on('data', data => stdout.push(...`${data}`.trim().split('\n')))
    proc.stderr.on('data', data => stderr.push(...`${data}`.trim().split('\n')))

    proc.on('close', code => {
      const result = {
        code,
        stdout,
        stderr,
      }
      if (code === 0) {
        resolve(result)
      } else {
        reject(result)
      }
    })
  })
