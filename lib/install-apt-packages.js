'use strict';

var Promise = require('bluebird');
var debounce = require('debounce');
var _ = require('lodash');

var defer = require('./utils/defer');
var installedPackages = require('./utils/installed-packages');
var apt = require('./apt');

var waiting = [];
var installed = {};

var currentBatch;
var installPending = debounce(function () {
    if (currentBatch) {
        currentBatch.then(installPending);
    } else {
        if (waiting.length) {
            currentBatch = new Promise(function (resolve, reject) {
                var aptPromise = apt.install(waiting);
                waiting.forEach(function (name) {
                    aptPromise.then(installed[name].resolve, installed[name].reject);
                });
                aptPromise.then(resolve, reject);
                waiting = [];
            });

            currentBatch.then(function () {
                currentBatch = null;
                installPending();
            });
        }
    }
}, 0);

/**
 * Installs one or several apt packages, returning a promise for when they have been installed.
 *
 * @param name String with name of a package to install, or Array of them.
 *
 * @returns {Promise} Promise for array of result objects, or rejected with single result object.
 */
function installAptPackages(name) {
    if (Array.isArray(name)) {
        var names = name;
        return Promise.all(names.map(installAptPackages));
    } else {
        console.log('installAptPackages', name);
        if (installed[name]) {
            return installed[name].promise;
        } else {
            return new Promise((resolve, reject) => {
                installedPackages.then(packages => {
                    if (packages[name]) {
                        resolve(name);
                    } else {
                        installed[name] = defer();
                        waiting.push(name);
                        installPending();
                        installed[name].promise.then(resolve, reject);
                    }
                }, reject);
            });
        }
    }
}

module.exports = installAptPackages;
