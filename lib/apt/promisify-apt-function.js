'use strict';

var Promise = require('bluebird');

/**
 * Wraps an apt function, so it returns a promise of {code, stdout, stderr}.
 *
 * Same status object is resolved or rejected, depending on how execution went.
 *
 * @param fn a function on the apt object
 * @param context the apt object
 * @returns {Function} the same fn, but returns a promise for {code, stdout, stderr}
 */
function promisifyAptFunction(fn, context) {
    return function () {
        var args = arguments;
        return new Promise(function (resolve, reject) {
            var proc = fn.apply(context, args);
            var stdoutArray = [];
            var stderrArray = [];
            proc.stdout.on('data', function (data) {
                var lines = ('' + data).split('\n');
                stdoutArray.push(lines);
            });
            proc.stderr.on('data', function (data) {
                var lines = ('' + data).split('\n');
                stderrArray.push(lines);
            });
            proc.on('close', function (code) {
                var result = {
                    code: code,
                    stdout: stdoutArray.join('\n'),
                    stderr: stderrArray.join('\n')
                };
                if (code === 0) {
                    resolve(result);
                } else {
                    reject(result);
                }
            });
        });

    };
}

module.exports = promisifyAptFunction;
