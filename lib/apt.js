'use strict';

var apt = require('node-apt-get');

var wrapApt = require('./wrap-apt');
var sequencify = require('./sequencify');

//apt.command = 'aptitude';
apt.spawnOptions = {}; // disable default stdout, stderr to console
apt.options['assume-yes'] = true;
apt.options['simulate'] = false;

module.exports = {
    install: sequencify(wrapApt(apt.install, apt, 'apt.install')), // install(packages)
    update: sequencify(wrapApt(apt.update, apt, 'apt.update'))     // update()
};
