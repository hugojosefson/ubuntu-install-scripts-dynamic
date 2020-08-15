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
    const stdoutChunks = []
    const stderrChunks = []

    proc.stdout.on('data', data => stdoutChunks.push(`${data}`))
    proc.stderr.on('data', data => stderrChunks.push(`${data}`))

    proc.on('close', code => {
      const result = {
        code,
        stdout: stdoutChunks.join('').split('\n'),
        stderr: stderrChunks.join('').split('\n'),
      }
      if (code === 0) {
        resolve(result)
      } else {
        reject(result)
      }
    })
  })
