'use strict';

var exec = require('faithful-exec');
var _ = require('lodash');

/**
 * Returns a Promise for an object where keys are currently installed Ubuntu
 * packages, and values are true.
 */
module.exports = exec("dpkg -l|awk '/^ii/{print $2}'")
    .then(result => _.object(result.stdout.trim().split('\n').map(name => [name, true])));
