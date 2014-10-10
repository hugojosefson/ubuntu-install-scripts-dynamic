'use strict';

var Promise = require('es6-promise').Promise;
var apt = require('node-apt-get');

var sequencify = require('./sequencify');

//apt.command = 'aptitude';
apt.spawnOptions = {}; // disable default stdout, stderr to console
apt.options['assume-yes'] = true;
apt.options['simulate'] = false;

function install(names) {
    return new Promise(function (resolve, reject) {
        var proc = apt.install(names);
        var stdoutArray = [];
        var stderrArray = [];
        proc.stdout.on('data', function (data) {
            stdoutArray.push(('' + data).split('\n'));
        });
        proc.stderr.on('data', function (data) {
            stderrArray.push(('' + data).split('\n'));
        });
        proc.on('close', function (code) {
            var result = {
                code: code,
                packages: names,
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
}


module.exports = {
    install: sequencify(install)
};
