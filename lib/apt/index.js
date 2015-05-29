'use strict';

var promisifyAptFunction = require('./promisify-apt-function');
var sequencify = require('./sequencify');

var aptGetInstall = require('./apt-get')('install');
var aptGetUpdate = require('./apt-get')('update');

/**
 * Apt functions, which return a promise of {code, stdout, stderr}.
 *
 * Same status object is resolved or rejected, depending on how execution went.
 *
 * @type {{install: function, update: function}}
 */
module.exports = {
    install: sequencify(promisifyAptFunction(aptGetInstall, {})), // install(packages)
    update: sequencify(promisifyAptFunction(aptGetUpdate, {}))    // update()
};
