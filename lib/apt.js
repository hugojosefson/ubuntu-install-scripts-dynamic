'use strict';

var Promise = require('es6-promise').Promise;
var apt = require('node-apt-get');

var sequencify = require('./sequencify');

//apt.command = 'aptitude';
apt.spawnOptions = {}; // disable default stdout, stderr to console
apt.options['assume-yes'] = true;
apt.options['simulate'] = false;

function install(names) {
    console.log('apt.install()', names);
    return new Promise(function (resolve, reject) {
        var proc = apt.install(names);
        proc.stdout.on('data', function (data) {
            console.log('apt.install(): stdout: ' + data);
        });
        proc.stderr.on('data', function (data) {
            console.log('apt.install(): stderr: ' + data);
        });
        proc.on('close', function (code) {
            console.log('apt.install(): code', code);
            if (code === 0) {
                resolve(names);
            } else {
                reject('apt.install(): Failed to install: ' + names);
            }
        });
    });
}


module.exports = {
    install: sequencify(install)
};
