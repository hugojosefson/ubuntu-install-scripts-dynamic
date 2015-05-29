'use strict';

var apt = require('node-apt-get');

var promisifyAptFunction = require('./promisify-apt-function');
var sequencify = require('./sequencify');

//apt.command = 'aptitude';
apt.spawnOptions = {}; // disable default stdout, stderr to console
apt.options['assume-yes'] = true;
apt.options['simulate'] = false;

/**
 * Apt functions, which return a promise of {code, stdout, stderr}.
 *
 * Same status object is resolved or rejected, depending on how execution went.
 *
 * @type {{install: function, update: function}}
 */
module.exports = {
    install: sequencify(promisifyAptFunction(apt.install, apt, 'apt.install')), // install(packages)
    update: sequencify(promisifyAptFunction(apt.update, apt, 'apt.update'))     // update()
};
