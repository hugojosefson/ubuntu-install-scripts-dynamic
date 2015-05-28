'use strict';

var Promise = require('bluebird');

function wrapApt(fn, context, logPrefix) {
    return function () {
        var args = arguments;
        return new Promise(function (resolve, reject) {
            var proc = fn.apply(context, args);
            var stdoutArray = [];
            var stderrArray = [];
            proc.stdout.on('data', function (data) {
                var lines = ('' + data).split('\n');
                lines.forEach(function (line) {
                    console.log(logPrefix + ': stdout:', line);
                });
                stdoutArray.push(lines);
            });
            proc.stderr.on('data', function (data) {
                var lines = ('' + data).split('\n');
                lines.forEach(function (line) {
                    console.log(logPrefix + ': stderr:', line);
                });
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

module.exports = wrapApt;
