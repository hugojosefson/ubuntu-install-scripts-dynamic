/**
 * Wraps an apt function, so it returns a promise of {code, stdout, stderr}.
 *
 * Same status object is resolved or rejected, depending on how execution went.
 *
 * @param fn a function on the apt object
 * @param context the apt object
 * @returns {Function} the same fn, but returns a promise for {code, stdout, stderr}
 */
export default (fn, context) => (...args) =>
  new Promise((resolve, reject) => {
    const proc = fn.apply(context, args)
    const stdoutArray = []
    const stderrArray = []

    proc.stdout.on('data', data => {
      const lines = ('' + data).split('\n')
      stdoutArray.push(lines)
    })

    proc.stderr.on('data', data => {
      const lines = ('' + data).split('\n')
      stderrArray.push(lines)
    })

    proc.on('close', code => {
      const result = {
        code: code,
        stdout: stdoutArray.join('\n'),
        stderr: stderrArray.join('\n'),
      }
      if (code === 0) {
        resolve(result)
      } else {
        reject(result)
      }
    })
  })
