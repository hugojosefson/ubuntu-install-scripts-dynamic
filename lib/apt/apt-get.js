'use strict';

var spawn = require('child_process').spawn;
var inpathSync = require('inpath').sync;
var aptGetBin = inpathSync('apt-get');

var isRoot = require('is-root')();
var sudo = require('sudo');

var sudoOptions = require('./sudo-options');

function aptGet(command) {
    return (packages) => spawn(aptGetBin, [command, '-y'].concat(packages), sudoOptions.spawnOptions);
}

function sudoAptGet(command) {
    return (packages) => sudo(['apt-get', command, '-y'].concat(packages), sudoOptions);
}

module.exports = isRoot ? aptGet : sudoAptGet;
