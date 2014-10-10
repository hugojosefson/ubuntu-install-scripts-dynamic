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
            var lines = ('' + data).split('\n');
            lines.forEach(function (line) {
                console.log('apt.install: stdout:', line);
            });
            stdoutArray.push(lines);
        });
        proc.stderr.on('data', function (data) {
            var lines = ('' + data).split('\n');
            lines.forEach(function (line) {
                console.log('apt.install: stderr:', line);
            });
            stderrArray.push(lines);
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

function update() {
    return new Promise(function (resolve, reject) {
        var proc = apt.update();
        var stdoutArray = [];
        var stderrArray = [];
        proc.stdout.on('data', function (data) {
            var lines = ('' + data).split('\n');
            lines.forEach(function (line) {
                console.log('apt.update: stdout:', line);
            });
            stdoutArray.push(lines);
        });
        proc.stderr.on('data', function (data) {
            var lines = ('' + data).split('\n');
            lines.forEach(function (line) {
                console.log('apt.update: stderr:', line);
            });
            stderrArray.push(lines);
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
    install: sequencify(install),
    update: sequencify(update)
};
